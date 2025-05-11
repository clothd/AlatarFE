import { redirect } from "@remix-run/node"; // Or "@shopify/remix-oxygen"
import { shopifyApp } from "@shopify/shopify-app-remix/server"; // To get shop domain

// This is the URL of your AlatarFE app's callback route that Alatar will redirect to.
// It MUST be one of the URIs you configure in Alatar's ALLOWED_CLIENT_REDIRECT_URIS setting.
const ALATARFE_CALLBACK_URL = "/auth/alatar/callback"; // Relative to AlatarFE's host

// This is the base URL of your Alatar backend.
// It should come from environment variables in a real app.
const ALATAR_BACKEND_BASE_URL = process.env.ALATAR_API_BASE_URL || "http://localhost:8000"; // Fallback for safety

export async function loader({ request }) {
  // Get the Shopify session to retrieve the shop domain.
  // This assumes the user has already installed the AlatarFE app on their Shopify store.
  const { session } = await shopifyApp.authenticate.admin(request);
  const shopDomain = session.shop;

  if (!shopDomain) {
    console.error("Shop domain could not be determined from Shopify session.");
    // You might want to redirect to an error page or the Shopify auth page for AlatarFE
    return redirect("/?error=shop_domain_missing"); // Or handle more gracefully
  }

  // Construct the AlatarFE callback URL dynamically using the request's host
  // This makes it work correctly in different environments (dev, staging, prod)
  const currentHost = new URL(request.url).origin;
  const dynamicAlatarFeCallbackUrl = `${currentHost}${ALATARFE_CALLBACK_URL}`;

  // Construct the URL for Alatar's Shopify OAuth start endpoint
  const alatarAuthStartUrl = new URL(`${ALATAR_BACKEND_BASE_URL}/auth/shopify/start`);
  alatarAuthStartUrl.searchParams.append("shop", shopDomain);
  alatarAuthStartUrl.searchParams.append("client_redirect_uri", dynamicAlatarFeCallbackUrl);

  console.log(`Redirecting to Alatar for auth: ${alatarAuthStartUrl.toString()}`);

  // Redirect the user to Alatar
  return redirect(alatarAuthStartUrl.toString());
}

// This page component will likely not be rendered if the loader always redirects.
// You can add a message here if needed, e.g., "Redirecting to connect Alatar..."
export default function ConnectAlatarPage() {
  return (
    <div>
      <p>Connecting to Alatar... You should be redirected automatically.</p>
    </div>
  );
} 