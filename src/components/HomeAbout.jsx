import horizontal from "../assets/horizontal.png";
import { LuMoveRight } from "react-icons/lu";
import ServiceCards from "./ServiceCards";
import { SERVICE_CARDS } from "../constants/siteData";

const achievementImage =
  "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80";


const achievements = [
  "20+ Years of Uninterrupted Service Since 2003",
  "3 Global Hubs: Korea, China, and Nigeria",
  "98% On-Time Delivery Rate for Global Shipments",
  "0 Hitches: Seamless Nigerian Customs Clearing",
];

const HomeAbout = () => {
  return (
    <div className="mt-24 text-[color:var(--text)] max-sm:mt-16">
      {/* Intro */}
      <div className="px-16 max-md:px-6 max-sm:px-4">
        <div className="flex items-center gap-2">
          <img src={horizontal} alt="horizontal line" />
          <p className="text-sm font-semibold text-[color:var(--accent)] uppercase tracking-wide">About Us</p>
        </div>
        <h4 className="text-[32px] font-bold leading-tight w-[50%] max-md:text-[28px] max-md:w-full max-sm:text-[24px]">
          TWO DECADES OF LOGISTICS EXCELLENCE
        </h4>
        <p className="text-[17px] mt-6 w-[50%] max-md:w-full max-sm:text-[15px] text-[color:var(--text-muted)]">
          Global Express is duly registered in Korea as Hazyom Holdings since
          2003. We are one of the leading international freight forwarding and
          Logistics Company with offices in Seoul Korea, Guangzhou China and
          Lagos Nigeria.
        </p>
      </div>

      {/* Service Cards */}
      <div className="px-16 mt-16 max-md:px-6 max-sm:px-4 max-sm:mt-12">
        <ServiceCards cards={SERVICE_CARDS} className="gap-32 max-md:gap-8" />
      </div>

      {/* Achievements */}
      <div className="px-16 mt-24 flex gap-12 max-md:px-6 max-md:flex-col max-md:gap-8 max-md:mt-16 max-sm:px-4">
        <div className="flex-1">
          <h4 className="text-[32px] font-bold leading-tight max-md:text-[28px] max-sm:text-[24px]">
            WHY OUR MILESTONES MATTER TO YOU
          </h4>

          <p className="text-[17px] text-[color:var(--text-muted)] mt-4 max-w-[70%] max-md:max-w-full">
            <span className="font-bold">Two Decades of Reliability</span> We
            didn&apos;t just start yesterday. Registered as Hazyom Holdings in 2003, we
            have spent over 20 years perfecting the trade routes between Asia and
            Africa.
          </p>

          <p className="text-[17px] text-[color:var(--text-muted)] mt-4 max-w-[70%] max-md:max-w-full">
            <span className="font-bold">Expert Customs Integration</span> Our
            long-term relationship with Nigerian Customs isn&apos;t just a stat—it&apos;s
            your guarantee. We&apos;ve cleared thousands of shipments without the
            typical delays that halt other businesses.
          </p>

          <p className="text-[17px] text-[color:var(--text-muted)] mt-4 max-w-[70%] max-md:max-w-full">
            <span className="font-bold">Multimodal Versatility</span> From small
            parcels to heavy machinery, we have successfully managed air, ocean,
            and land freight for over 500+ corporate clients worldwide.
          </p>

          <p className="text-base mt-4">We have:</p>
          {achievements.map((item, index) => (
            <div key={index} className="md:w-[60%]">
              <div className="group flex items-center gap-3 cursor-pointer px-3 py-4 transition-colors duration-300 hover:bg-[color:var(--accent)] hover:text-white">
                <LuMoveRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                <p>{item}</p>
              </div>
              <hr className="border-gray-300" />
            </div>
          ))}
        </div>

        {/* Image */}
        <div className="flex-1 flex justify-end max-md:justify-center max-md:mt-4">
          <img
            src={achievementImage}
            alt="Shipping containers at port"
            className="max-w-full h-auto max-md:max-w-[500px] max-sm:max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeAbout;
