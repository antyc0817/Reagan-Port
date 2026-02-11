import "@fontsource/wix-madefor-text/400.css";
import "@fontsource/wix-madefor-text/600.css";
import "@fontsource/wix-madefor-text/700.css";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Reagan",
  description: "Portfolio",
  icons: {
    icon: [
      { url: "/icons/nicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/nicon.png", sizes: "16x16", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Navbar />
        <div style={{ paddingTop: "4.5rem" }}>
          {children}
        </div>
      </body>
    </html>
  );
}
