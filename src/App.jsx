import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import Home from "./pages/Home";
import { FeatureAccessProvider } from "./contexts/FeatureAccessContext";

const About = lazy(() => import("./pages/About"));
const ContactUS = lazy(() => import("./pages/ContactUs"));
const ClaimPackage = lazy(() => import("./pages/ClaimPackage"));
const Services = lazy(() => import("./pages/Services"));
const Shop = lazy(() => import("./pages/Shop"));
const ShipmentCalculator = lazy(() => import("./pages/ShipmentCalculator"));
const TrackYourShipments = lazy(() => import("./pages/TrackYourShipments"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));

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

function RouteLoadingFallback() {
  return (
    <div className="min-h-screen bg-[color:var(--bg)] px-6 pb-16 pt-28">
      <div className="mx-auto w-full max-w-[1200px] animate-pulse space-y-6">
        <div className="h-4 w-28 rounded-full bg-[color:var(--muted)]" />
        <div className="h-12 w-full max-w-2xl rounded-2xl bg-[color:var(--muted)]" />
        <div className="h-4 w-full max-w-3xl rounded-full bg-[color:var(--muted)]" />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="h-72 rounded-3xl bg-[color:var(--muted)]" />
          <div className="h-72 rounded-3xl bg-[color:var(--muted)]" />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <FeatureAccessProvider>
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUS />} />
            <Route
              path="/get-a-quote"
              element={<Navigate to="/shipment-calculator" replace />}
            />
            <Route path="/claim-a-package" element={<ClaimPackage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shipment-calculator" element={<ShipmentCalculator />} />
            <Route path="/track-shipment" element={<TrackYourShipments />} />
            <Route path="/gallery" element={<Navigate to="/shop" replace />} />
            <Route path="/blog" element={<Navigate to="/" replace />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </FeatureAccessProvider>
    </Router>
  );
}

export default App;
