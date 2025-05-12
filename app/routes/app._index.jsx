import { useState } from "react";
import { Page, Card, TextField, Button, BlockStack, Box, Text } from "@shopify/polaris";

export default function Index() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); // {from: 'user'|'bot', text: string}
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { from: "user", text: input }]);
    setLoading(true);
    try {
      const res = await fetch("https://51c1-50-66-72-97.ngrok-free.app/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: JSON.stringify(data, null, 2) },
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: "Error: " + err.message },
      ]);
    }
    setInput("");
    setLoading(false);
  }

  return (
    <Page title="Alatar">
      <Card>
        <BlockStack gap="200">
          <Box minHeight="300px" maxHeight="400px" overflowY="auto" background="bgSurfaceHover" padding="200" borderRadius="100">
            {messages.map((msg, i) => (
              <Box key={i} padding="100" background={msg.from === "user" ? "bg-interactive" : "bg-surface"} borderRadius="100" marginBlockEnd="100" width="fit-content" maxWidth="80%" alignSelf={msg.from === "user" ? "flex-end" : "flex-start"}>
                <Text as="p" variant="bodyMd" fontWeight={msg.from === "user" ? "bold" : undefined}>
                  {msg.from === "user" ? "You" : "Alatar"}
                </Text>
                <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{msg.text}</pre>
              </Box>
            ))}
            {loading && (
              <Box padding="100" background="bg-surface" borderRadius="100" marginBlockEnd="100" width="fit-content" maxWidth="80%" alignSelf="flex-start">
                <Text as="p" variant="bodyMd">Alatar</Text>
                <Text as="p" variant="bodyMd">Thinking...</Text>
              </Box>
            )}
          </Box>
          <TextField
            label="Your message"
            labelHidden
            value={input}
            onChange={setInput}
            placeholder="Type your message to Alatar..."
            autoComplete="off"
            disabled={loading}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey && input.trim() && !loading) {
                event.preventDefault();
                sendMessage();
              }
            }}
          />
          <Button onClick={sendMessage} fullWidth variant="primary" disabled={!input.trim() || loading}>
            Send
          </Button>
        </BlockStack>
      </Card>
    </Page>
  );
}
