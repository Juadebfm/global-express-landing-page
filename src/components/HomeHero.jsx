import { Link } from "react-router-dom";
import HomeHeroImage from "../assets/HomeHero.png";
import { DASHBOARD_URL } from "../constants/siteData";

const HomeHero = () => {
  return (
    <div
      className="
        relative
        bg-cover bg-center bg-no-repeat
        min-h-screen
        px-16
        max-md:px-6 max-sm:px-4

        max-sm:flex
        max-sm:flex-col
        max-sm:justify-center
        max-sm:items-center
        max-sm:pt-16
        max-sm:pb-8
        max-sm:min-h-[85vh]

        md:min-h-screen
      "
      style={{ backgroundImage: `url(${HomeHeroImage})` }}
    >
      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

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
            text-[color:var(--hero-text)] text-[60px] font-extrabold w-[90%] leading-tight
            max-md:text-[42px] max-md:w-full
            max-sm:text-[32px] max-sm:text-center

            md:text-[48px] md:w-[95%]
          "
        >
          GLOBAL FREIGHT, LOCAL EXPERTISE — DELIVERED WITH FULL VISIBILITY
        </h1>

        <p
          className="
            text-[color:var(--hero-text)] text-[18px] w-[48%] my-6 leading-relaxed
            max-md:w-full max-md:text-[16px]
            max-sm:text-center

            md:w-[85%] md:text-[17px]
          "
        >
          Real-time tracking, upfront pricing, and customs clearance handled
          end to end — so your cargo moves across borders without the
          guesswork.
        </p>

        <div className="flex gap-4 max-sm:flex-col max-sm:w-full">
          <a
            href={`${DASHBOARD_URL}/sign-up`}
            className="
              inline-block bg-[color:var(--accent)] px-10 py-3 rounded-lg text-[color:var(--accent-contrast)] font-semibold
              transition hover:bg-[color:var(--accent-hover)]
              max-sm:w-full max-sm:py-4 max-sm:text-center
              md:px-12 md:py-3.5
            "
          >
            Get Started
          </a>
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

export default HomeHero;
