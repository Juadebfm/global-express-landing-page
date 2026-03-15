import { useState } from "react";
import horizontal from "../assets/horizontal.png";
import { FaPhoneVolume } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { CONTACT } from "../constants/siteData";

const SERVICES = [
  {
    id: "air-cargo",
    title: "Air Cargo",
    subtitle: "South Korea to Nigeria",
    description:
      "Global Express provides a worldwide network for all of your air freight needs, with guaranteed and time-defined services, supported by preferred Airline Partners. We offer fixed schedules on all main routes with competitive rates for all time and cost requirements.",
    details:
      "The main element of our freight management service is the ability to move single or complex shipments by air, at any time and to any destination. We are one of Korea\u2019s leading providers of air freight services with direct contract rates with most IATA and non-IATA Airlines. We provide a flexible and customer-friendly personalized service.",
    highlights: [
      "Direct IATA & non-IATA airline contracts",
      "Fixed schedules on all main routes",
      "Competitive rates for all shipment sizes",
      "End-to-end shipment tracking",
    ],
  },
  {
    id: "ocean-shipping",
    title: "Ocean Shipping",
    subtitle: "To Nigeria",
    description:
      "Our ocean freight service offers reliable, cost-effective shipping from South Korea and China to Nigeria. Whether you\u2019re shipping full containers (FCL) or less-than-container loads (LCL), we handle customs clearance, documentation, and delivery.",
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
    subtitle: "Professional & Secure",
    description:
      "Proper packaging is essential for the safe transit of your goods across international borders. Global Express provides professional packaging services tailored to the nature of your cargo &mdash; whether fragile electronics, heavy machinery, or bulk commercial goods.",
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
  const active = SERVICES.find((s) => s.id === activeId);

  return (
    <div className="mt-16 px-16 max-md:px-8 max-sm:px-4">
      {/* Header */}
      <div className="flex justify-center flex-col items-center">
        <div className="flex items-center gap-2">
          <img src={horizontal} alt="horizontal line" />
          <p className="text-sm font-semibold text-[color:var(--accent)] uppercase tracking-wide text-center">Our Services</p>
        </div>
        <h4 className="text-[32px] font-bold leading-tight w-[50%] text-center mt-2 max-md:text-[28px] max-md:w-full max-sm:text-[24px]">
          PROVIDING THE BEST SERVICES FOR OUR CUSTOMERS
        </h4>
        <p className="mt-4 w-[70%] text-center text-[17px] text-[color:var(--text-muted)] max-md:w-[90%] max-sm:w-full max-sm:text-[15px]">
          From the factory floor to your warehouse door, we provide a seamless
          link between global markets and your business.
        </p>
      </div>

      {/* Service Tabs */}
      <div className="mt-12 flex gap-0 border-b border-gray-300 max-sm:flex-col max-sm:border-b-0 max-sm:gap-2">
        {SERVICES.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveId(s.id)}
            className={`flex-1 py-4 px-6 text-center font-semibold text-[15px] transition-all duration-300 max-sm:rounded-lg max-sm:border max-sm:border-gray-300 ${
              activeId === s.id
                ? "border-b-3 border-b-[color:var(--accent)] text-[color:var(--accent)] bg-[color:var(--accent)]/5 max-sm:bg-[color:var(--accent)] max-sm:text-white max-sm:border-[color:var(--accent)]"
                : "text-[color:var(--text-muted)] hover:text-[color:var(--text)] hover:bg-gray-100"
            }`}
          >
            <span className="block">{s.title}</span>
            <span className="block text-xs font-normal mt-0.5 opacity-70">{s.subtitle}</span>
          </button>
        ))}
      </div>

      {/* Active Service Content */}
      <div className="mt-10 max-sm:mt-6">
        <div className="flex gap-12 max-lg:flex-col max-lg:gap-8">
          {/* Main Content */}
          <div className="flex-[2]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-10 bg-[color:var(--accent)] rounded-full" />
              <h4 className="text-2xl font-bold max-sm:text-xl">
                {active.title} <span className="text-[color:var(--text-muted)] font-normal text-lg max-sm:text-base">&mdash; {active.subtitle}</span>
              </h4>
            </div>

            <p className="text-[17px] leading-relaxed text-[color:var(--text-muted)] max-sm:text-[15px]">
              {active.description}
            </p>

            {/* Highlights */}
            <ul className="mt-8 grid grid-cols-2 gap-3 max-sm:grid-cols-1">
              {active.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 bg-[color:var(--surface)] border border-gray-200 rounded-lg px-4 py-3 text-[15px] max-sm:text-[14px]"
                >
                  <span className="text-[color:var(--accent)] font-bold text-lg leading-none mt-0.5">
                    &#10003;
                  </span>
                  {h}
                </li>
              ))}
            </ul>

            <p className="mt-8 text-[15px] leading-relaxed text-[color:var(--text-muted)] max-sm:text-[14px]">
              {active.details}
            </p>
          </div>

          {/* Help Sidebar */}
          <div className="flex-1 max-lg:w-full">
            <div className="bg-white border border-gray-200 rounded-lg p-8 max-sm:p-6 lg:sticky lg:top-24 shadow-sm">
              <h5 className="text-xl font-bold mb-2 text-[color:var(--text)]">Need Help?</h5>
              <p className="text-sm text-[color:var(--text-muted)] mb-6">
                Contact our team for personalized assistance with your shipment.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-[color:var(--accent)] p-2.5 rounded-lg">
                    <FaPhoneVolume className="text-white" />
                  </div>
                  <div className="text-sm">
                    <p>KR: {CONTACT.phones.korea}</p>
                    <p>NG: {CONTACT.phones.nigeria}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-[color:var(--accent)] p-2.5 rounded-lg">
                    <CiMail className="text-white text-lg" />
                  </div>
                  <a href={`mailto:${CONTACT.email}`} className="text-sm hover:underline">
                    {CONTACT.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
