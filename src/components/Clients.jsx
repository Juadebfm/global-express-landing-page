import React, { useState, useEffect } from "react";
import storeImg from "../assets/store.png";
import quotation from "../assets/quotation.png";

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
      className="bg-cover bg-center bg-no-repeat h-[450px] mt-24  max-w-[92%] mx-auto relative mb-16"
      style={{ backgroundImage: `url(${storeImg})` }}
    >
      <div className="bg-[#FFFFFF] w-[30%] absolute top-32 right-16">
        <div className="pt-8 px-8">
          <img src={quotation} alt="" />
          <h4 className="font-extrabold mt-4 text-[24px]">
            {testimonials[activeSlide].title}
          </h4>
          <p className="mt-4 text-[13px]">
            <span className="font-bold">
              {testimonials[activeSlide].highlight}
            </span>{" "}
            "{testimonials[activeSlide].text}"
          </p>
          <p className="mt-4 font-bold text-[14px]">
            {testimonials[activeSlide].author}
          </p>
        </div>

        {/* Orange div with white dots at the right end - full width of parent */}
        <div className="bg-[#FF6600] w-full h-[40px] mt-4 flex items-center justify-end px-8 gap-2">
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
