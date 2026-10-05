import "./globals.css";

export const metadata = { title: "Battlebot Wiring and Parts" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
