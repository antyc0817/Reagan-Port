import Footer from "../components/Footer";
import ScrollToTop from "./_components/ScrollToTop";

export default function ProjectsLayout({ children }) {
  return (
    <>
      <ScrollToTop />
      {children}
      <Footer />
    </>
  );
}
