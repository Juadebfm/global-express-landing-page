import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import ContactUS from "./pages/ContactUs";
import GetaQuote from "./pages/GetaQuote";
import Services from "./pages/Services";
import ShipmentCalculator from "./pages/ShipmentCalculator";
import TrackYourShipments from "./pages/TrackYourShipments";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<ContactUS />} />
            <Route path="/get-a-quote" element={<GetaQuote />} />
            <Route path="/services" element={<Services />} />
            <Route
              path="/shipment-calculator"
              element={<ShipmentCalculator />}
            />
            <Route path="/track-shipment" element={<TrackYourShipments />} />
          </Routes>
        </Router>
        {/* <Home /> */}
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
