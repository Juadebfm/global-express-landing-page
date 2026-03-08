import React, { useState, useEffect, useRef } from "react";
import horizontal from "../assets/horizontal.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import two from "../assets/two.png";
import help from "../assets/help.png";
import { FaPhoneVolume } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { CONTACT } from "../constants/siteData";

const SERVICES = [
  {
    id: "air-cargo",
    title: "Air Cargo (South Korea to Nigeria)",
    description:
      "Global Express provides a worldwide network for all of your air freight needs, with guaranteed and time-defined services, supported by preferred Airline Partners. We offer fixed schedules on all main routes with competitive rates for all time and cost requirements.",
    details:
      "The main element of our freight management service is the ability to move single or complex shipments by air, at any time and to any destination. We are one of Korea's leading providers of air freight services with direct contract rates with most IATA and non-IATA Airlines. We provide a flexible and customer-friendly personalized service.",
    highlights: [
      "Direct IATA & non-IATA airline contracts",
      "Fixed schedules on all main routes",
      "Competitive rates for all shipment sizes",
      "End-to-end shipment tracking",
    ],
  },
  {
    id: "ocean-shipping",
    title: "Ocean Shipping to Nigeria",
    description:
      "Our ocean freight service offers reliable, cost-effective shipping from South Korea and China to Nigeria. Whether you're shipping full containers (FCL) or less-than-container loads (LCL), we handle customs clearance, documentation, and delivery.",
    details:
      "With strong relationships at Lagos ports and a deep understanding of Nigerian customs processes, we ensure your cargo clears quickly and without delays. Our team coordinates every step from origin to final delivery, keeping you informed with real-time updates throughout the voyage.",
    highlights: [
      "FCL & LCL shipping options",
      "Fast customs clearance at Lagos ports",
      "Port-to-port and full delivery options",
      "Real-time cargo tracking",
    ],
  },
  {
    id: "packaging",
    title: "Packaging",
    description:
      "Proper packaging is essential for the safe transit of your goods across international borders. Global Express provides professional packaging services tailored to the nature of your cargo — whether fragile electronics, heavy machinery, or bulk commercial goods.",
    details:
      "Our packaging team ensures your shipments meet international shipping standards and are protected against damage during air or sea transit. We use industry-grade materials and techniques to secure your cargo, reducing the risk of loss or damage and ensuring smooth customs inspection.",
    highlights: [
      "Custom packaging for all cargo types",
      "International shipping standard compliance",
      "Damage prevention for fragile goods",
      "Palletization and crating services",
    ],
  },
];

const OurServices = () => {
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const sectionRefs = useRef({});

  const scrollTo = (id) => {
    setActiveId(id);
    sectionRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  /* Track which section is in view */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            entry.target.classList.add("service-visible");
          }
        });
      },
      { threshold: 0.3 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-16 px-16 max-md:px-8 max-sm:px-4">
      {/* Header */}
      <div className="flex justify-center flex-col items-center">
        <div className="flex items-center gap-2">
          <img src={horizontal} alt="horizontal line" />
          <p className="text-center">Our Services</p>
        </div>
        <h4 className="text-[40px] font-bold leading-tight w-[50%] text-center mt-2 max-md:text-[32px] max-md:w-full max-sm:text-[28px]">
          PROVIDING THE BEST SERVICES FOR OUR CUSTOMERS
        </h4>
        <p className="mt-4 w-[70%] text-center text-sm max-md:w-[90%] max-sm:w-full">
          Global Express is duly registered in Korea as Hazyom Holdings since
          2003. We are one of the leading international freight forwarding and
          Logistics Company with offices in Seoul Korea, Guangzhou China and
          Lagos Nigeria.
        </p>
      </div>

      {/* Content */}
      <div className="flex gap-8 mt-16 max-lg:flex-col max-md:gap-6">
        {/* Sidebar */}
        <div className="w-[30%] max-lg:w-full">
          <div className="bg-[#2B2A2A] rounded-md px-4 py-8 max-lg:sticky max-lg:top-24 lg:sticky lg:top-24">
            {SERVICES.map((s) => (
              <div
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`flex items-center rounded-lg mt-2 first:mt-0 transition-all duration-300 cursor-pointer ${
                  activeId === s.id
                    ? "bg-[#FF6600] scale-[1.02] shadow-lg shadow-orange-500/20"
                    : "bg-[#262626] hover:bg-[#FF6600]/80"
                }`}
              >
                <button className="text-[#FFFFFF] px-4 py-3 w-full text-start font-semibold text-sm">
                  {s.title}
                </button>
                <MdKeyboardArrowRight
                  className={`text-[#FFFFFF] text-2xl mr-4 transition-transform duration-300 ${
                    activeId === s.id ? "translate-x-1" : ""
                  }`}
                />
              </div>
            ))}
          </div>

          {/* How Can We Help */}
          <div className="bg-[#2B2A2A] rounded-md mt-8 max-lg:hidden">
            <div className="flex flex-col items-center">
              <img src={two} alt="two staff" className="w-full" />
              <img className="-mt-8 max-sm:-mt-6" src={help} alt="image" />
            </div>
            <div className="mt-4 text-xl font-bold flex flex-col items-center justify-center">
              <h4>How Can We Help?</h4>
              <div className="flex items-center justify-center gap-2 mt-4">
                <FaPhoneVolume />
                <div className="text-[12px]">
                  <p>KR: +82 (0)70 4142 5371</p>
                  <p>NG: +234 (0)906 000 0193</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 mt-6 mb-8">
                <CiMail />
                <a href={`mailto:${CONTACT.email}`} className="text-[12px] hover:underline">{CONTACT.email}</a>
              </div>
            </div>
          </div>
        </div>

        {/* Service sections */}
        <div className="w-[70%] max-lg:w-full flex flex-col gap-24 max-md:gap-16 max-sm:gap-12">
          {SERVICES.map((s) => (
            <div
              key={s.id}
              id={s.id}
              ref={(el) => (sectionRefs.current[s.id] = el)}
              className="service-section opacity-0 translate-y-12 transition-all duration-700 ease-out"
            >
              {/* Accent bar + title */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-1 h-10 bg-[color:var(--accent)] rounded-full" />
                <h4 className="text-2xl font-bold max-sm:text-xl">
                  {s.title}
                </h4>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed max-sm:text-[13px]">
                {s.description}
              </p>

              {/* Highlights */}
              <ul className="mt-6 grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                {s.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 bg-[color:var(--surface)] border border-[color:var(--border)]/10 rounded-lg px-4 py-3 text-sm max-sm:text-[13px]"
                  >
                    <span className="text-[color:var(--accent)] font-bold text-lg leading-none mt-0.5">
                      ›
                    </span>
                    {h}
                  </li>
                ))}
              </ul>

              {/* Details */}
              <p className="mt-6 text-sm leading-relaxed text-[color:var(--text-muted)] max-sm:text-[13px]">
                {s.details}
              </p>

              {/* Divider */}
              <div className="mt-12 h-px bg-[color:var(--border)]/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServices;
