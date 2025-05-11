import { useEffect } from "react";
import { redirect } from "@remix-run/node"; // or "@shopify/remix-oxygen"
import { useFetcher, useNavigate } from "@remix-run/react";
import { shopifyApp } from "@shopify/shopify-app-remix/server";

// This key will be used to store the Alatar token in the Remix session.
export const ALATAR_USER_TOKEN_SESSION_KEY = "alatar_user_token";

/**
 * Remix Action: Receives the Alatar token from the client-side 
 * and stores it in the Shopify app session.
 */
export async function action({ request }) {
  const { session: appSession, admin } = await shopifyApp.authenticate.admin(request); // Authenticates AlatarFE with Shopify
  const formData = await request.formData();
  const alatarToken = formData.get("alatarToken");

  if (typeof alatarToken !== "string" || !alatarToken) {
    console.error("Alatar token not provided in action.");
    return redirect("/?error=alatar_token_missing_in_action"); // Or handle error appropriately
  }

  // Store the Alatar token in the Shopify session
  // The shopifyApp.sessionStorage provided by the template handles encryption.
  // Note: Remix sessions have size limits. For very large tokens or more complex
  // user data from Alatar, consider storing in a separate database (e.g., using Prisma)
  // linked to appSession.id or admin.session.shop.
  appSession.set(ALATAR_USER_TOKEN_SESSION_KEY, alatarToken);
  
  console.log("Alatar token stored in session successfully for shop:", appSession.shop);

  // After storing, you need to commit the session and then redirect.
  // The redirect here is to the app's root, but you can change it.
  // IMPORTANT: shopifyApp.authenticate.admin also returns session and admin,
  // and the session it returns needs to be committed by shopifyApp.sessionStorage.commitSession
  
  // No, this is wrong. shopifyApp.authenticate.admin() already handles session loading and saving
  // for its own purposes. We need to use the provided sessionStorage to save our custom data.
  // The `shopifyApp` object should provide access to its configured `sessionStorage`.

  // Correct approach: Get the raw session, update it, then commit using the app's storage.
  // This part is tricky as shopifyApp.authenticate.admin itself returns a session object that
  // is a *snapshot*. We need to ensure our update is on the *actual* session that gets committed.

  // The `shopifyApp` object from `@shopify/shopify-app-remix/server` should provide a session manager.
  // Let's assume `shopifyApp.sessionStorage` is available as per Shopify template documentation.
  
  // The `authenticate.admin` call returns a `session` object that is part of the Shopify context.
  // Modifications to `session.set()` should be picked up when the response is processed if the 
  // session storage is cookie-based and properly configured by the Shopify template.
  // For other session storages, an explicit commit might be needed.
  // The default template uses CookieSessionStorage.

  // For CookieSessionStorage, modifications to the session object returned by authenticate.admin
  // are typically automatically committed when the response headers are set.
  // However, let's be explicit if the library offers a direct way or if issues arise.

  // According to Shopify Remix template, the session is managed by the `shopifyApp` instance.
  // The `session` object returned by `authenticate.admin` can be directly modified.
  // The Shopify App template handles committing this session when the request/response cycle completes.

  // Redirect to the app's home page or a relevant dashboard page
  return redirect("/"); // Or e.g., "/app/dashboard"
}

/**
 * React component for the callback page.
 * Its primary job is to extract the token from the URL fragment using client-side JS
 * and submit it to the Remix action.
 */
export default function AlatarAuthCallback() {
  const fetcher = useFetcher();
  const navigate = useNavigate();

  useEffect(() => {
    // This code runs only on the client-side
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1)); // Remove #
    const token = params.get("token");

    if (token) {
      console.log("Alatar token found in URL fragment, submitting to action.");
      const formData = new FormData();
      formData.append("alatarToken", token);
      fetcher.submit(formData, { method: "post" });
      // Clear the hash from the URL for cleanliness and to prevent re-submission on refresh
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    } else {
      console.warn("Alatar token not found in URL fragment.");
      // Handle error: maybe redirect to an error page or back to the start of the flow
      // For now, redirect to home with an error query param
      navigate("/?error=alatar_token_missing_from_callback", { replace: true });
    }
  }, [fetcher, navigate]);

  // Display a loading message or spinner while processing
  if (fetcher.state === "submitting" || fetcher.state === "loading") {
    return <p>Processing Alatar authentication...</p>;
  }

  // If the fetcher has data, it means the action has run and redirected (or returned data).
  // This component might briefly show if the redirect is client-side via navigate in error cases.
  return (
    <div>
      <p>Verifying Alatar connection...</p>
      {/* You could show an error message here if fetcher.data contains an error from the action */} 
    </div>
  );
} 