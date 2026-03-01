import started from "../assets/started.png";
import ServiceCards from "./ServiceCards";
import { SERVICE_CARDS } from "../constants/siteData";

const AboutAbout = () => {
  return (
    <div className="text-[color:var(--text)] px-16 mt-16 max-md:px-8 max-sm:px-4 max-sm:mt-8">
      <div>
        <h4 className="text-[40px] font-bold leading-tight w-[50%] max-md:text-[32px] max-md:w-full max-sm:text-[28px]">
          TWO DECADES OF LOGISTICS EXCELLENCE
        </h4>
        <p className="text-base mt-6 w-[50%] max-md:w-full max-sm:text-[15px]">
          Global Express is a trading name and a Logistics/Freight forwarding
          division of Hazyom Holdings. Global Express is duly registered in
          Korea as Hazyom Holdings since 2003. We are one of the leading
          international freight forwarding and Logistics Company with offices
          in Seoul Korea, Guangzhou China and Lagos Nigeria.
        </p>
      </div>

      <div className="flex mt-12 max-md:flex-col max-md:gap-8 max-sm:mt-8">
        <div className="w-1/2 max-md:w-full">
          <img
            src={started}
            alt="Global Express team"
            className="w-full md:w-[95%] h-auto object-cover"
          />
        </div>
        <div className="w-1/2 mt-16 max-md:w-full max-md:mt-0">
          <p className="text-base max-sm:text-[15px]">
            Global Express is a company of mindful, committed, and responsive
            individuals with diverse backgrounds, ideologies, areas of
            expertise. As diverse as we are, we are unified by the common goal
            to servicing our customers beyond their greatest expectations
            through innovation and creativity. We accomplish this goal daily by
            assessing our customer's time and budgetary constraints and
            providing them with the best real time logistical solution to help
            them achieve their current goal and ever rising expectations. We are
            well connected and in a long term cordial relationship with the
            Nigerian customs services which is one of the reasons why we handle
            and clear any shipment fast and affordable without any hitches or
            delays
          </p>
        </div>
      </div>

      <div className="mt-16 max-sm:mt-12">
        <ServiceCards cards={SERVICE_CARDS} />
      </div>
    </div>
  );
};

export default AboutAbout;
