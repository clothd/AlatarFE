import { useEffect, useState, useCallback } from "react";
import { useFetcher, useLoaderData, Form as RemixForm } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  Link,
  InlineStack,
  TextField,
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import { json } from "@remix-run/node";
import { fetchAlatarGraphQL } from "../lib/alatar-api.server.js";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  let alatarUserData = null;
  let alatarAuthError = null;

  try {
    const alatarMeQuery = `
      query GetAlatarMe {
        me {
          id
          email
          linked_accounts {
            id
            account_name
            account_type
          }
        }
      }
    `;
    const alatarResponse = await fetchAlatarGraphQL(request, alatarMeQuery);
    alatarUserData = alatarResponse?.me;
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
    console.error("Error fetching Alatar user data in loader:", error.message);
    alatarAuthError = error.message;
  }
  
  return json({
    alatarUser: alatarUserData,
    alatarAuthError: alatarAuthError,
  });
};

export const action = async ({ request }) => {
  await authenticate.admin(request);

  const formData = await request.formData();
  const prompt = formData.get("prompt");
  const linkedAccountId = formData.get("linkedAccountId");

  if (!prompt || typeof prompt !== 'string' || prompt.trim() === "") {
    return json({ errors: [{ message: "Message prompt cannot be empty." }], submittedRequest: null }, { status: 400 });
  }
  if (!linkedAccountId || typeof linkedAccountId !== 'string') {
    return json({ errors: [{ message: "Linked Account ID is required." }], submittedRequest: null }, { status: 400 });
  }

  const submitQuery = `
    mutation SubmitAnalysis($prompt: String!, $linkedAccountId: ID!) {
      submitAnalysisRequest(input: { prompt: $prompt, linkedAccountId: $linkedAccountId }) {
        analysisRequest {
          id
          prompt
          status
          result {
            summary
          }
          createdAt
          updatedAt
          errorMessage
        }
        userErrors {
          message
          field
        }
      }
    }
  `;

  try {
    const alatarResponse = await fetchAlatarGraphQL(request, submitQuery, {
      prompt: prompt,
      linkedAccountId: linkedAccountId,
    });

    if (alatarResponse?.submitAnalysisRequest?.userErrors?.length) {
      return json({ errors: alatarResponse.submitAnalysisRequest.userErrors, submittedRequest: null }, { status: 400 });
    }
    
    const submittedRequest = alatarResponse?.submitAnalysisRequest?.analysisRequest;
    if (!submittedRequest) {
        return json({ errors: [{message: "Failed to get analysis request data from Alatar."}], submittedRequest: null}, {status: 500});
    }

    return json({
      submittedRequest: submittedRequest,
      errors: null,
    });
  } catch (error) {
    console.error("Error submitting analysis request to Alatar:", error);
    let errorMessage = "Failed to submit request to Alatar.";
    if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    }
    return json({ errors: [{ message: errorMessage }], submittedRequest: null }, { status: 500 });
  }
};

export default function Index() {
  const { alatarUser, alatarAuthError } = useLoaderData();
  const fetcher = useFetcher();
  const shopify = useAppBridge();

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const isChatLoading = fetcher.state === "submitting" || fetcher.state === "loading";

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.errors) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: `error-${Date.now()}`,
            sender: "ai",
            text: `Error: ${fetcher.data.errors.map(e => e.message).join(", ")}`,
            status: "FAILED",
          },
        ]);
      } else if (fetcher.data.submittedRequest) {
        const requestData = fetcher.data.submittedRequest;
        setMessages((prevMessages) => {
          const aiMessage = {
            id: requestData.id || `ai-${Date.now()}`,
            sender: "ai",
            text: requestData.result?.summary || requestData.errorMessage || (requestData.status !== 'COMPLETED' && requestData.status !== 'FAILED' ? `Processing... (Status: ${requestData.status})` : "No summary available."),
            status: requestData.status,
          };
          return [...prevMessages, aiMessage];
        });
      }
    }
  }, [fetcher.data]);
  
  const handleInputChange = useCallback(setInputValue, []);

  const handleSendMessage = useCallback(() => {
    if (!inputValue.trim()) return;
    if (!alatarUser?.linked_accounts?.[0]?.id) {
      setMessages((prev) => [...prev, {id: `error-${Date.now()}`, sender: 'ai', text: 'Error: Alatar User or Linked Account ID is not available. Cannot send message.', status: 'FAILED'}]);
      return;
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: inputValue,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const formData = new FormData();
    formData.append("prompt", inputValue);
    formData.append("linkedAccountId", alatarUser.linked_accounts[0].id);
    
    fetcher.submit(formData, { method: "POST" });
    
    setInputValue("");
  }, [inputValue, fetcher, alatarUser]);

  return (
    <Page>
      <TitleBar title="Alatar Chat">
      </TitleBar>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                Alatar Connection Status
              </Text>
              {alatarAuthError && (
                <Box borderColor="borderCritical" borderWidth="100" padding="200" background="bgSurfaceCritical">
                  <Text as="p" variant="bodyMd" tone="critical">
                    Error connecting to Alatar: {alatarAuthError}
                  </Text>
                  <Box paddingBlockStart="200">
                    <Button url="/connect-alatar" variant="primary">
                       Connect/Reconnect Alatar
                    </Button>
                  </Box>
                </Box>
              )}
              {alatarUser && (
                <BlockStack gap="200">
                  <Text as="p" variant="bodyMd" tone="success">
                    Successfully connected to Alatar.
                  </Text>
                  <Text as="h3" variant="headingSm">Your Alatar User Info:</Text>
                  <Box padding="200" background="bgSurfaceHover" borderRadius="100">
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                      <code>{JSON.stringify({email: alatarUser.email, id: alatarUser.id, linked_account: alatarUser.linked_accounts?.[0] }, null, 2)}</code>
                    </pre>
                  </Box>
                </BlockStack>
              )}
              {!alatarUser && !alatarAuthError && (
                <BlockStack gap="200">
                  <Text as="p" variant="bodyMd">
                    Alatar account is not connected or data could not be fetched.
                  </Text>
                  <Button url="/connect-alatar" variant="primary">
                    Connect to Alatar
                  </Button>
                </BlockStack> 
                //hello
              )}
            </BlockStack>
          </Card>
        </Layout.Section>

        {alatarUser && alatarUser.linked_accounts && alatarUser.linked_accounts.length > 0 ? (
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Box padding="400" borderColor="border" borderWidth="025" borderRadius="200" minHeight="300px" maxHeight="500px" overflowY="auto">
                  <BlockStack gap="300">
                    {messages.map((msg) => (
                      <Box key={msg.id} 
                           padding="200" 
                           background={msg.sender === 'user' ? 'bg-interactive' : 'bg-surface'} 
                           borderRadius="100" 
                           shadow={msg.sender === 'user' ? undefined : '100'}
                           width="fit-content"
                           maxWidth="80%"
                           alignSelf={msg.sender === 'user' ? 'flex-end' : 'flex-start'}
                      >
                        <BlockStack gap="050">
                            <Text as="p" variant="bodyMd" fontWeight={msg.sender === 'user' ? 'bold': undefined}>
                                {msg.sender === 'user' ? 'You' : 'Alatar'}
                            </Text>
                            <Text as="p" variant="bodyMd">
                                {msg.text}
                            </Text>
                            {msg.sender === 'ai' && msg.status && msg.status !== 'COMPLETED' && msg.status !== 'FAILED' && (
                            <Text as="p" variant="bodySm" tone="subdued">
                                ({msg.status.toLowerCase()})
                            </Text>
                            )}
                        </BlockStack>
                      </Box>
                    ))}
                    {isChatLoading && messages[messages.length -1]?.sender === 'user' && (
                       <Box padding="200" background='bg-surface' borderRadius="100" shadow='100' width="fit-content" maxWidth="80%" alignSelf='flex-start'>
                         <BlockStack gap="050">
                            <Text as="p" variant="bodyMd">Alatar</Text>
                            <Text as="p" variant="bodyMd">Thinking...</Text>
                         </BlockStack>
                       </Box>
                    )}
                  </BlockStack>
                </Box>

                <Box paddingBlockStart="200">
                  <BlockStack gap="300">
                    <TextField
                      label="Your message"
                      labelHidden
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder="Type your message to Alatar..."
                      autoComplete="off"
                      disabled={isChatLoading || !alatarUser?.linked_accounts?.[0]?.id}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' && !event.shiftKey && !isChatLoading && inputValue.trim()) {
                          event.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage} fullWidth variant="primary" disabled={isChatLoading || !inputValue.trim() || !alatarUser?.linked_accounts?.[0]?.id}>
                      Send
                    </Button>
                  </BlockStack>
                </Box>
                {fetcher.data?.errors && (
                  <Box paddingBlockStart="200">
                    {fetcher.data.errors.map((err, index) => (
                      <Text key={index} tone="critical">{err.message}</Text>
                    ))}
                  </Box>
                )}
              </BlockStack>
            </Card>
          </Layout.Section>
        ) : alatarUser && (!alatarUser.linked_accounts || alatarUser.linked_accounts.length === 0) ? (
            <Layout.Section>
                <Card>
                    <BlockStack gap="300">
                        <Text as="h2" variant="headingMd">Chat Unavailable</Text>
                        <Text as="p" variant="bodyMd">
                            No linked accounts found for your Alatar user. Please ensure a Shopify store or other account is linked in your Alatar settings.
                        </Text>
                    </BlockStack>
                </Card>
            </Layout.Section>
        ) : null}
      </Layout>
    </Page>
  );
}
