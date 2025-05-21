import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export default function App() {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <style>
          {`
            body {
              background-color: white;
              background-image: url('/Dot Grid Pattern (3).svg');
              background-repeat: no-repeat;
              background-position: center;
              background-size: cover;
              min-height: 100vh;
              margin: 0;
              padding: 0;
              overflow: hidden;
            }
          `}
        </style>
        <Meta />
        <Links />
      </head>
      <body>
        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 100 }}>
        </div>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
