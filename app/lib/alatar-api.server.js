import { shopifyApp } from "@shopify/shopify-app-remix/server";
import { ALATAR_USER_TOKEN_SESSION_KEY } from "../routes/auth/alatar/callback"; // Import the session key
import { redirect } from "@remix-run/node";

const ALATAR_API_BASE_URL = process.env.ALATAR_API_BASE_URL;

// Removed service account credentials and related token cache/fetch logic

/**
 * Retrieves the Alatar user token from the current Shopify session.
 * If the token is not found, it means the user needs to go through the Alatar auth flow.
 * This function can optionally redirect the user to the connection initiation route.
 *
 * @param {Request} request The Remix request object.
 * @param {object} [options] Options for token retrieval.
 * @param {boolean} [options.redirectIfMissing=false] - Whether to redirect to connect-alatar if token is missing.
 * @returns {Promise<string|null>} The Alatar access token, or null if not found and not redirecting.
 * @throws {Response} Throws a redirect Response if token is missing and redirectIfMissing is true.
 */
async function getAlatarTokenFromSession(request, options = { redirectIfMissing: false }) {
  if (!request) {
    console.error("Request object is required to retrieve Alatar token from session.");
    throw new Error("Request object missing for getAlatarTokenFromSession.");
  }
  try {
    // Authenticate with Shopify to get the current app session
    const { session: appSession } = await shopifyApp.authenticate.admin(request);
    
    const alatarToken = appSession.get(ALATAR_USER_TOKEN_SESSION_KEY);

    if (typeof alatarToken === 'string' && alatarToken) {
      return alatarToken;
    }

    console.warn("Alatar user token not found in session for shop:", appSession.shop);
    if (options.redirectIfMissing) {
      // If token is missing and redirect is requested, throw a redirect to the connection page.
      // The caller (e.g., a loader) should handle this Response.
      throw redirect("/connect-alatar"); // Or a more specific error/initiation page
    }
    return null;
  } catch (error) {
    if (error instanceof Response) {
        // This is likely a redirect from shopifyApp.authenticate.admin (e.g., to Shopify auth)
        // or our own redirect to /connect-alatar. Re-throw it.
        throw error;
    }
    console.error("Error retrieving Alatar token from session:", error);
    // Depending on the error, might re-throw or return null.
    // If shopifyApp.authenticate.admin fails, it often throws a Response for redirect.
    // If it's another error, it might indicate a problem with session storage or config.
    throw new Error("Failed to retrieve Alatar token from session. Ensure Shopify auth is complete.");
  }
}

/**
 * Makes an authenticated GraphQL request to the Alatar backend using the user-specific token.
 *
 * @param {Request} request The Remix request object (needed to get the session token).
 * @param {string} query The GraphQL query string.
 * @param {object} [variables] The variables for the GraphQL query.
 * @param {object} [options] Options for fetching.
 * @param {boolean} [options.redirectIfTokenMissing=true] - Whether to redirect to connect-alatar if token is missing.
 * @returns {Promise<object>} The data from the GraphQL response.
 * @throws {Error} If the GraphQL request fails or returns errors.
 * @throws {Response} If redirectIfTokenMissing is true and token is missing (redirects to /connect-alatar).
 */
export async function fetchAlatarGraphQL(request, query, variables = {}, options = { redirectIfTokenMissing: true }) {
  if (!ALATAR_API_BASE_URL) {
    console.error("Alatar API base URL is not configured.");
    throw new Error("Alatar client is not configured (missing base URL).");
  }

  const alatarToken = await getAlatarTokenFromSession(request, { redirectIfMissing: options.redirectIfTokenMissing });

  if (!alatarToken) {
    // This case should only be reached if options.redirectIfTokenMissing was false
    // and no token was found. The caller needs to handle this (e.g. show a connect button).
    console.error("Alatar token is missing, and redirectIfTokenMissing is false. Cannot make GraphQL request.");
    throw new Error("Alatar authentication required. Please connect your Alatar account.");
  }

  const graphqlUrl = `${ALATAR_API_BASE_URL.replace(/\/$/, "")}/graphql`;
  console.log(`Making GraphQL request to Alatar: ${graphqlUrl} (token acquired from session)`);

  try {
    const response = await fetch(graphqlUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${alatarToken}`,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      let detail = errorBody;
      try {
        const jsonError = JSON.parse(errorBody);
        detail = jsonError.detail || errorBody;
      } catch (e) { /* ignore parsing error, use raw body */ }

      console.error(
        `Alatar GraphQL request failed: ${response.status} ${response.statusText}`,
        { query, variables, detail }
      );
      // Check for 401/403 specifically, as it might mean the Alatar token is invalid/expired
      if (response.status === 401 || response.status === 403) {
        // Optionally, clear the bad token from session and redirect to re-authenticate with Alatar
        // This would require access to the session object here, which is complex.
        // For now, just indicate a re-connection might be needed.
        // Or, the redirect in getAlatarTokenFromSession should handle re-auth if token is invalid.
        // The current getAlatarTokenFromSession doesn't validate the token, only its presence.
        // Alatar's GraphQL returning 401/403 is the indicator of an invalid token.
        throw new Error(
          `Alatar GraphQL request unauthorized (token might be invalid/expired - ${response.status}). Please try reconnecting Alatar.`
        );
      }
      throw new Error(
        `Alatar GraphQL request failed: ${response.status} ${response.statusText} - ${detail}`
      );
    }

    const jsonResponse = await response.json();

    if (jsonResponse.errors) {
      console.error("Alatar GraphQL response contains errors:", {
        query,
        variables,
        errors: jsonResponse.errors,
      });
      throw new Error(
        `Alatar GraphQL errors: ${jsonResponse.errors
          .map((err) => err.message)
          .join(", ")}`
      );
    }
    
    // It's possible for a GraphQL query to return no data and no errors (e.g., an empty list)
    // So, checking for the presence of the `data` field is more robust than checking if it's falsy.
    if (typeof jsonResponse.data === 'undefined') {
        console.warn("Alatar GraphQL response has no data field (but no errors reported):", { query, variables, response: jsonResponse });
        // This might be acceptable for some mutations that don't return data.
        // For queries, it usually implies an issue or an unexpected empty result.
        // Let's return null in this case, as it's not strictly an error from the server.
        return null; 
    }

    return jsonResponse.data;
  } catch (error) {
    if (error instanceof Response) throw error; // Re-throw redirects
    console.error("Error during Alatar GraphQL request execution:", { query, variables, error });
    throw error; // Re-throw other errors
  }
}

// Example usage (how you would call this from your Remix loaders/actions):
/*
export async function loader({ request }) {
  try {
    const query = `
      query GetHelloForUser {
        hello # Assuming this now works in user context or is public
        me { id email }
      }
    `;
    // Pass the request object here!
    // redirectIfTokenMissing is true by default, so it will redirect to /connect-alatar if no token
    const data = await fetchAlatarGraphQL(request, query);
    console.log("Data from Alatar (user context):", data);
    return json({ alatarData: data });
  } catch (error) {
    if (error instanceof Response) {
      // If it's a Response, it's a redirect (e.g., to Shopify auth or /connect-alatar)
      // Remix will handle it automatically if thrown from a loader/action.
      throw error;
    }
    console.error("Failed to fetch data from Alatar in loader:", error.message);
    return json({ error: error.message }, { status: 500 });
  }
}
*/ 