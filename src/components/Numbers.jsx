import React from "react";
import One from "../assets/01.png";

const Numbers = () => {
  return (
    <div className="px-16 mt-6 grid grid-cols-4 border-t border-b border-[color:var(--border)] max-md:px-6 max-md:grid-cols-2 max-sm:px-4 max-sm:grid-cols-1">
      <div className="border-r border-[color:var(--border)] p-6 py-12 max-md:border-b max-sm:border-r-0">
        <img className="mx-auto theme-number" src={One} alt="" />
        <h3 className="mt-10 text-[color:var(--text)] max-sm:text-center">Safe Cargo</h3>
        <p className="text-[color:var(--text)] mt-6 max-sm:text-center">
          Our storage facilities are secure and you can be rest assured of the
          safety of your items whilst in our care.
        </p>
      </div>
      <div className="border-r border-[color:var(--border)] p-6 py-12 max-md:border-b max-sm:border-r-0">
        <img className="mx-auto theme-number" src={One} alt="" />
        <h3 className="mt-10 text-[color:var(--text)] max-sm:text-center">
          Fast Shipment
        </h3>
        <p className="text-[color:var(--text)] mt-6 max-sm:text-center">
          We understand the need forflexibility and on time delivery. These
          requirements are the core of our service delivery. Your cargo is
          delivered in a safe and timely manner.
        </p>
      </div>
      <div className="border-r border-[color:var(--border)] p-6 py-12 max-md:border-r-0 max-md:border-b max-sm:border-r-0">
        <img className="mx-auto theme-number" src={One} alt="" />
        <h3 className="mt-10 text-[color:var(--text)] max-sm:text-center">
          Affordable Prices
        </h3>
        <p className="text-[color:var(--text)] mt-6 max-sm:text-center">
          As a market leader, we offer competitive rates for all time and cost
          requirements. All end-to-end logistics processes are supported by
          leading-edge information management systems, providing the customer
          with complete shipment information.
        </p>
      </div>
      <div className="border-l border-[color:var(--border)] p-6 py-12 max-md:border-l-0 max-sm:border-l-0 max-sm:border-b-0">
        <img className="mx-auto theme-number" src={One} alt="" />
        <h3 className="mt-10 text-[color:var(--text)] max-sm:text-center">
          Door Step Delivery
        </h3>
        <p className="text-[color:var(--text)] mt-6 max-sm:text-center">
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
