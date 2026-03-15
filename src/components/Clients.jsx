import { useState, useEffect } from "react";
import quotation from "../assets/quotation.png";

const BG_IMAGE =
  "https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&w=1920&q=80";

const Clients = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const testimonials = [
    {
      title: "WHAT OUR HAPPY CLIENT SAY ABOUT US",
      highlight: "Finally, a stress-free clearing process.",
      text: "I've had several shipments get stuck at the Lagos ports in the past with other agents. Switching to Global Express was the best move for my business. Their relationship with Customs is clearly solid, my last container from Guangzhou cleared faster than I thought possible. No hitches, no hidden fees.",
      author: "Chidi O., CEO of Retail Solutions Ltd.",
    },
    {
      title: "WHAT OUR HAPPY CLIENT SAY ABOUT US",
      highlight: "Exceptional service and reliability.",
      text: "Working with Global Express has transformed how we handle our imports. Their team is professional, responsive, and always keeps us informed throughout the process. Highly recommend!",
      author: "Amaka T., Import Manager",
    },
    {
      title: "WHAT OUR HAPPY CLIENT SAY ABOUT US",
      highlight: "Best decision for our supply chain.",
      text: "The efficiency and transparency we've experienced with Global Express is unmatched. They handle everything seamlessly, allowing us to focus on growing our business.",
      author: "Michael B., Operations Director",
    },
  ];

  // Auto-swipe every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-[450px] mt-24 max-w-[92%] mx-auto relative mb-16 max-md:h-auto max-md:mt-20 max-md:mb-12 max-sm:mt-16 max-sm:mb-8 max-sm:max-w-full max-sm:flex max-sm:items-center max-sm:justify-center max-sm:py-12"
      style={{ backgroundImage: `url(${BG_IMAGE})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="bg-white text-[#232323] w-[35%] absolute top-16 right-16 z-10 max-lg:w-[45%] max-md:w-[85%] max-md:right-[7.5%] max-md:top-12 max-sm:w-[90%] max-sm:relative max-sm:top-auto max-sm:right-auto shadow-xl">
        <div className="pt-8 px-8 max-md:pt-6 max-md:px-6 max-sm:pt-6 max-sm:px-5">
          <img src={quotation} alt="Quotation mark" className="max-sm:w-8" />
          <h4 className="font-extrabold mt-4 text-[24px] max-md:text-[20px] max-sm:text-[18px] text-[#232323] font-[Montserrat]">
            {testimonials[activeSlide].title}
          </h4>
          <p className="mt-4 text-[13px] max-md:text-[14px] max-sm:text-[14px] text-[#5c5c5c] font-[Lato]">
            <span className="font-bold text-[#232323]">
              {testimonials[activeSlide].highlight}
            </span>{" "}
            &ldquo;{testimonials[activeSlide].text}&rdquo;
          </p>
          <p className="mt-4 font-bold text-[14px] max-sm:text-[13px] text-[#232323] font-[Montserrat]">
            {testimonials[activeSlide].author}
          </p>
        </div>

        {/* Slide indicator dots */}
        <div className="bg-[color:var(--accent)] w-full h-[40px] mt-4 flex items-center justify-end px-8 gap-2 max-sm:px-5 max-sm:h-[50px] max-sm:justify-center">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSlide === index ? "bg-white w-8" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clients;
