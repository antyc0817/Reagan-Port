import "@fontsource/wix-madefor-text/400.css";
import "@fontsource/wix-madefor-text/600.css";
import "@fontsource/wix-madefor-text/700.css";
import "./globals.css";
import Navbar from "./components/Navbar";
import PreloaderOverlay from "./components/PreloaderOverlay";
import { EnterProvider } from "./context/EnterContext";

// Set to true to re-enable the black screen + "Wake the Dragon" preloader (currently on for local dev)
const PRELOADER_ENABLED = true;

export const metadata = {
  title: "Reagan",
  description: "Portfolio",
  icons: {
    icon: [
      { url: "/icons/Logo2.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <EnterProvider preloaderEnabled={PRELOADER_ENABLED}>
          {PRELOADER_ENABLED && <PreloaderOverlay />}
          <Navbar />
          <div style={{ paddingTop: "4.5rem" }}>
            {children}
          </div>
        </EnterProvider>
      </body>
    </html>
  );
}
