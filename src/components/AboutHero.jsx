import HeroAbout from "../assets/HeroAbout.png";

const AboutHero = () => {
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
      style={{ backgroundImage: `url(${HeroAbout})` }}
    >
      {/* Dark gradient overlay — right-heavy for right-aligned text */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/40 to-transparent" />

      <div
        className="
          relative ml-auto
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
            text-[color:var(--hero-text)] text-[60px] font-extrabold w-[90%] ml-auto leading-tight text-right
            max-md:text-[42px] max-md:w-full
            max-sm:text-[32px] max-sm:text-center

            md:text-[48px] md:w-[95%]
          "
        >
          YOUR TRUSTED PARTNER IN FRICTIONLESS GLOBAL TRADE
        </h1>

        <p
          className="
            text-[color:var(--hero-text)] text-[18px] w-[48%] ml-auto my-6 leading-relaxed text-right
            max-md:w-full max-md:text-[16px]
            max-sm:text-center

            md:w-[85%] md:text-[17px]
          "
        >
          Logistics is complex, but your experience shouldn't be. Global Express
          combines creative expertise with deep-rooted customs relationships to
          provide real-time solutions for your time and budgetary constraints.
        </p>
      </div>
    </div>
  );
};

export default AboutHero;
