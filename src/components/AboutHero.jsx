import { Link } from "react-router-dom";
import { DASHBOARD_URL } from "../constants/siteData";

const ABOUT_BG =
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80";

const AboutHero = () => {
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
        style={{ backgroundImage: `url(${ABOUT_BG})` }}
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
          YOUR TRUSTED PARTNER IN FRICTIONLESS GLOBAL TRADE
        </h1>

        <p
          className="
            text-[color:var(--hero-text)] text-[16px] w-full my-6 leading-relaxed drop-shadow-lg
            max-sm:text-center
            md:text-[17px] md:w-[85%]
            lg:text-[22px] lg:w-[65%]
          "
        >
          Logistics is complex, but your experience shouldn&apos;t be. Global Express
          combines creative expertise with deep-rooted customs relationships to
          provide real-time solutions for your time and budgetary constraints.
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
            to="/contact"
            className="
              inline-block border-2 border-white px-10 py-3 rounded-lg text-white font-semibold
              transition hover:bg-white/10
              max-sm:w-full max-sm:py-4 max-sm:text-center
              md:px-12 md:py-3.5
            "
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
