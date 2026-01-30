import React from "react";
import One from "../assets/01.png";

const Numbers = () => {
  return (
    <div className="px-16 mt-6 grid grid-cols-4 border-t border-b border-white">
      <div className="border-r border-white p-6 py-12">
        <img className="mx-auto" src={One} alt="" />
        <h3 className="mt-10 text-[#FFFFFF]">Safe Cargo</h3>
        <p className="text-[#FFFFFF] mt-6 ">
          Our storage facilities are secure and you can be rest assured of the
          safety of your items whilst in our care.
        </p>
      </div>
      <div className="border-r border-white p-6 py-12">
        <img className="mx-auto" src={One} alt="" />
        <h3 className="mt-10 text-[#FFFFFF]">Fast Shipment</h3>
        <p className="text-[#FFFFFF] mt-6 ">
          We understand the need forflexibility and on time delivery. These
          requirements are the core of our service delivery. Your cargo is
          delivered in a safe and timely manner.
        </p>
      </div>
      <div className="border-r border-white p-6 py-12">
        <img className="mx-auto" src={One} alt="" />
        <h3 className="mt-10 text-[#FFFFFF]">Affordable Prices</h3>
        <p className="text-[#FFFFFF] mt-6 ">
          As a market leader, we offer competitive rates for all time and cost
          requirements. All end-to-end logistics processes are supported by
          leading-edge information management systems, providing the customer
          with complete shipment information.
        </p>
      </div>
      <div className="border-l border-white p-6 py-12">
        <img className="mx-auto" src={One} alt="" />
        <h3 className="mt-10 text-[#FFFFFF]">Door Step Delivery</h3>
        <p className="text-[#FFFFFF] mt-6">
          Our door to door cargo and ocean shipping service is fast, safe,
          efficient and highly effective. We can arrange for your consignment to
          be picked up from anywhere in the South Korea and have it delivered to
          your specified destination.
        </p>
      </div>
    </div>
  );
};

export default Numbers;
