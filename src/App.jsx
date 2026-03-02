import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUS />} />
            <Route path="/get-a-quote" element={<GetaQuote />} />
            <Route path="/services" element={<Services />} />
            <Route path="/shipment-calculator" element={<ShipmentCalculator />} />
            <Route path="/track-shipment" element={<TrackYourShipments />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
