import Footer from "../components/Footer";
import ScrollToTop from "./ScrollToTop";

export default function ProjectsLayout({ children }) {
  return (
    <>
      <ScrollToTop />
      {children}
      <Footer />
    </>
  );
}
