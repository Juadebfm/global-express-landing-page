import horizontal from "../assets/horizontal.png";
import shipment from "../assets/shipment.png";
import ServiceCards from "./ServiceCards";
import { SERVICE_CARDS } from "../constants/siteData";

const HomeAbout = () => {
  return (
    <div className="mt-24 text-[color:var(--text)] max-sm:mt-16">
      <div className="px-16 max-md:px-6 max-sm:px-4">
        <div className="flex items-center gap-2">
          <img src={horizontal} alt="horizontal line" />
          <p>About Us</p>
        </div>
        <h4 className="text-[40px] font-bold leading-tight w-[50%] max-md:text-[32px] max-md:w-full max-sm:text-[28px]">
          TWO DECADES OF LOGISTICS EXCELLENCE
        </h4>
        <p className="text-base mt-6 w-[50%] max-md:w-full max-sm:text-[15px]">
          Global Express is duly registered in Korea as Hazyom Holdings since
          2003. We are one of the leading international freight forwarding and
          Logistics Company with offices in Seoul Korea, Guangzhou China and
          Lagos Nigeria.
        </p>
      </div>
      <div className="px-16 mt-16 max-md:px-6 max-sm:px-4 max-sm:mt-12">
        <ServiceCards cards={SERVICE_CARDS} className="gap-32 max-md:gap-8" />
      </div>

      <div className="w-[800px] mx-auto mt-24 max-md:w-full max-md:px-6 max-sm:px-4 max-sm:mt-16">
        <img src={shipment} alt="shipment" className="w-full" />
      </div>
    </div>
  );
};

export default HomeAbout;
