import "@fontsource/wix-madefor-text/400.css";
import "@fontsource/wix-madefor-text/600.css";
import "@fontsource/wix-madefor-text/700.css";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Reagan",
  description: "Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
