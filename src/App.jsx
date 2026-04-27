import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";

import ContactUS from "./pages/ContactUs";
import GetaQuote from "./pages/GetaQuote";
import Services from "./pages/Services";
import ShipmentCalculator from "./pages/ShipmentCalculator";
import TrackYourShipments from "./pages/TrackYourShipments";
import Blog from "./pages/Blog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import PublicGallery from "./pages/PublicGallery";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-[color:var(--text)] px-6">
      <h1 className="text-[60px] font-extrabold max-md:text-[42px] max-sm:text-[32px]">
        404
      </h1>
      <p className="mt-4 text-[color:var(--text-muted)] text-lg">
        Page not found
      </p>
      <Link
        to="/"
        className="mt-8 bg-[color:var(--accent)] text-[color:var(--accent-contrast)] px-8 py-3 rounded-lg font-semibold transition hover:bg-[color:var(--accent-hover)]"
      >
        Back to Home
      </Link>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUS />} />
        <Route path="/get-a-quote" element={<GetaQuote />} />
        <Route path="/services" element={<Services />} />
        <Route path="/shipment-calculator" element={<ShipmentCalculator />} />
        <Route path="/track-shipment" element={<TrackYourShipments />} />
        <Route path="/gallery" element={<PublicGallery />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsConditions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
