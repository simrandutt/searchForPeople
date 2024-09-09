import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import stylesheet from "~/tailwind.css?url";

// Add the Tailwind CSS stylesheet to the app
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

// Set meta tags for the app, including charset, title, and viewport
export const meta = () => [
  {
    charset: "utf-8",
    title: "Remix App",
    viewport: "width=device-width,initial-scale=1",
  },
];

// The main app layout component
export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        {/* Enable scroll restoration between page transitions */}
        <ScrollRestoration />
        <Scripts />
        {/* Enable live reloading during development */}
        <LiveReload />
      </body>
    </html>
  );
}
