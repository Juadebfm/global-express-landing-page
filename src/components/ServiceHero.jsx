import React from "react";
import service from "../assets/service.png";

const ServiceHero = () => {
  return (
    <div
      className="
            relative
            bg-cover bg-center bg-no-repeat
            min-h-screen
            px-16
            lg:px-12
            md:px-8
            sm:px-6
            max-sm:px-4
            flex items-center justify-center
          "
      style={{ backgroundImage: `url(${service})` }}
    >
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      <div
        className="relative flex flex-col items-start justify-start w-full max-w-[1200px]"
      >
        <h1
          className="
            text-[color:var(--hero-text)] font-extrabold text-start leading-tight
            text-[75px]
            lg:text-[65px] lg:w-[90%]
            md:text-[50px] md:w-full
            sm:text-[40px] sm:w-full
            max-sm:text-[28px] max-sm:w-full max-sm:leading-snug
          "
        >
          SPECIALIZED SHIPPING FOR GLOBAL END-TO-END EXCELLENCE.
        </h1>
        <p
          className="
            text-[color:var(--hero-text)] text-start leading-relaxed my-6
            text-[18px] w-[70%] max-w-[600px]
            lg:text-[17px] lg:w-[75%]
            md:text-[16px] md:w-full
            sm:text-[15px] sm:w-full
            max-sm:text-[14px] max-sm:w-full max-sm:my-4
          "
        >
          From the factory floor to your warehouse door, we provide a seamless
          link between global markets and your business.
        </p>
      </div>
    </div>
  );
};

export default ServiceHero;
