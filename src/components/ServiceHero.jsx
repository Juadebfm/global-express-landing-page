import { Link } from "react-router-dom";
import service from "../assets/service.png";

const ServiceHero = () => {
  return (
    <div
      className="
        relative overflow-hidden
        min-h-[85vh]
        px-16
        max-md:px-6 max-sm:px-4
        max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center
        max-sm:pt-16 max-sm:pb-8 max-sm:min-h-[65vh]
        md:min-h-[85vh]
      "
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${service})` }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div
        className="
          relative
          pt-[12rem]
          max-md:pt-[6rem]
          max-sm:pt-0
          max-md:max-w-[720px]
          max-sm:w-full
          md:max-w-[900px]
        "
      >
        <h1
          className="
            text-[color:var(--hero-text)] text-[60px] font-extrabold w-[90%] leading-tight drop-shadow-lg
            max-md:text-[42px] max-md:w-full
            max-sm:text-[32px] max-sm:text-center
            md:text-[48px] md:w-[95%]
          "
        >
          SPECIALIZED SHIPPING FOR GLOBAL END-TO-END EXCELLENCE
        </h1>

        <p
          className="
            text-[color:var(--hero-text)] text-[16px] w-full my-6 leading-relaxed drop-shadow-lg
            max-sm:text-center
            md:text-[17px] md:w-[85%]
            lg:text-[22px] lg:w-[65%]
          "
        >
          From the factory floor to your warehouse door, we provide a seamless
          link between global markets and your business.
        </p>

        <div className="flex gap-4 max-sm:flex-col max-sm:w-full">
          <Link
            to="/get-a-quote"
            className="
              inline-block bg-[color:var(--accent)] px-10 py-3 rounded-lg text-[color:var(--accent-contrast)] font-semibold
              transition hover:bg-[color:var(--accent-hover)]
              max-sm:w-full max-sm:py-4 max-sm:text-center
              md:px-12 md:py-3.5
            "
          >
            Get a Quote
          </Link>
          <Link
            to="/shipment-calculator"
            className="
              inline-block border-2 border-white px-10 py-3 rounded-lg text-white font-semibold
              transition hover:bg-white/10
              max-sm:w-full max-sm:py-4 max-sm:text-center
              md:px-12 md:py-3.5
            "
          >
            Calculate Shipment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceHero;
