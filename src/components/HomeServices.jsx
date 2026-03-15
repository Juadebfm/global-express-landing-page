import { Link } from "react-router-dom";
import horizontal from "../assets/horizontal.png";
import HoverCards from "./HoverCards";

const HomeServices = () => {
  return (
    <div className="text-[color:var(--text)] mt-28 px-16 max-md:px-6 max-md:mt-20 max-sm:px-4 max-sm:mt-16">
      <div className="flex flex-col justify-center items-center">
        <div className="flex items-center gap-2">
          <img src={horizontal} alt="horizontal line" />
          <p className="text-sm font-semibold text-[color:var(--accent)] uppercase tracking-wide">Our Services</p>
        </div>
        <h4 className="text-[32px] font-bold leading-tight max-w-[60%] text-center mt-3 max-md:text-[28px] max-md:max-w-[80%] max-sm:text-[24px] max-sm:max-w-full">
          PROVIDING THE BEST SERVICES FOR OUR CUSTOMERS
        </h4>
        <p className="mt-2 text-[17px] text-[color:var(--text-muted)] max-md:text-center max-md:max-w-[90%] max-sm:text-[15px] max-sm:max-w-full max-sm:px-2">
          From the factory floor to your warehouse door, we provide a seamless
          link between global markets and your business.
        </p>
      </div>
      <div>
        <HoverCards />
      </div>
      <div className="flex justify-center items-center">
        <Link
          to="/services"
          className="inline-block px-8 rounded-lg py-2 bg-[color:var(--accent)] text-[color:var(--accent-contrast)] mt-12 max-sm:w-full max-sm:py-3 max-sm:mt-8 max-sm:text-center transition hover:bg-[color:var(--accent-hover)]"
        >
          Explore All
        </Link>
      </div>
    </div>
  );
};

export default HomeServices;
