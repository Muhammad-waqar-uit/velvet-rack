import "./globals.css";

export const metadata = { title: "Velvet Rack — Premium Streetwear", description: "Interactive clothing rack storefront" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
