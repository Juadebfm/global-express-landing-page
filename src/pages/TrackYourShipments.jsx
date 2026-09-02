import Track from "../components/Track";
import Header from "../components/Header";
import Footer from "../components/Footer";

const TrackYourShipments = () => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main className="flex-1">
      <Track />
    </main>
    <Footer topSpacingClass="mt-24 max-md:mt-20 max-sm:mt-16" />
  </div>
);

export default TrackYourShipments;
