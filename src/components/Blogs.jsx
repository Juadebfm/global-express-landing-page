import React from "react";
import ship1 from "../assets/ship1.png";
import ship2 from "../assets/ship2.png";
import ship3 from "../assets/ship3.png";
import ship4 from "../assets/ship4.png";

const Blogs = () => {
  return (
    <div className="mt-12 md:mt-16 lg:mt-24 px-6 md:px-12 lg:px-24 text-[color:var(--text)]">
      <h4 className="font-bold text-xl md:text-2xl lg:text-2xl">
        Recent blog posts
      </h4>

      {/* Main Blog Grid */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-4 md:mt-5 lg:mt-6">
        {/* Featured Post - Left Column */}
        <div className="flex-1">
          <div>
            <img
              src={ship1}
              alt="Ship 1"
              loading="lazy"
              className="w-full rounded-lg lg:rounded-none"
            />
            <p className="text-[color:var(--accent)] text-[12px] mt-4 md:mt-5 lg:mt-6 font-semibold">
              Monday, 3 Mar 2025
            </p>
            <h6 className="text-lg md:text-xl lg:text-xl font-semibold mt-3 lg:mt-4">
              How Air Freight Works: Korea to Nigeria in 5–7 Days
            </h6>
            <p className="mt-3 lg:mt-4 text-sm w-full text-[color:var(--text-muted)]">
              We break down the full air freight journey — from pickup in Seoul
              to doorstep delivery in Lagos — and what affects your transit time.
            </p>
            <div className="flex items-center flex-wrap lg:flex-nowrap gap-3 lg:gap-4 mt-4 lg:mt-6 text-xs md:text-sm lg:text-sm">
              <button className="text-[color:var(--accent)] bg-[#FFF4EE] px-3 lg:px-4 py-1 rounded-2xl">
                Air Freight
              </button>
              <button className="text-[#3538CD] bg-[#EEF4FF] px-3 lg:px-4 py-1 rounded-2xl">
                Nigeria
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Two Posts */}
        <div className="flex-1 space-y-6 md:space-y-8 lg:space-y-12">
          {/* First Post */}
          <div className="flex gap-4 md:gap-5 lg:gap-6">
            <div className="flex-shrink-0 w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-32 lg:w-auto lg:h-auto overflow-hidden rounded-lg lg:rounded-none lg:overflow-visible">
              <img
                src={ship2}
                alt="Ship 2"
                loading="lazy"
                className="w-full h-full lg:h-auto object-cover lg:object-fill"
              />
            </div>
            <div className="flex-1">
              <p className="text-[color:var(--accent)] text-[12px] font-semibold">
                Wednesday, 19 Mar 2025
              </p>
              <h6 className="text-base md:text-lg lg:text-xl font-semibold mt-2 md:mt-3 lg:mt-4">
                Sea Freight vs. Air Freight: Which Is Right for Your Cargo?
              </h6>
              <p className="mt-2 md:mt-3 lg:mt-4 text-xs md:text-sm lg:text-sm w-full text-[color:var(--text-muted)]">
                Cost, weight, urgency, and item type all factor in. Here's how
                to choose the right mode for your next shipment.
              </p>
              <div className="flex flex-wrap gap-2 md:gap-3 lg:gap-4 mt-3 md:mt-4 lg:mt-6 text-xs md:text-sm lg:text-sm">
                <button className="text-[#3538CD] bg-[#EEF4FF] px-3 lg:px-4 py-1 rounded-2xl">
                  Sea Freight
                </button>
                <button className="text-[color:var(--accent)] bg-[#FFF4EE] px-3 lg:px-4 py-1 rounded-2xl">
                  Air Freight
                </button>
              </div>
            </div>
          </div>

          {/* Second Post */}
          <div className="flex gap-4 md:gap-5 lg:gap-6">
            <div className="flex-shrink-0 w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-32 lg:w-auto lg:h-auto overflow-hidden rounded-lg lg:rounded-none lg:overflow-visible">
              <img
                src={ship3}
                alt="Ship 3"
                loading="lazy"
                className="w-full h-full lg:h-auto object-cover lg:object-fill"
              />
            </div>
            <div className="flex-1">
              <p className="text-[color:var(--accent)] text-[12px] font-semibold">
                Tuesday, 1 Apr 2025
              </p>
              <h6 className="text-base md:text-lg lg:text-xl font-semibold mt-2 md:mt-3 lg:mt-4">
                Nigerian Customs Clearance: A Step-by-Step Guide
              </h6>
              <p className="mt-2 md:mt-3 lg:mt-4 text-xs md:text-sm lg:text-sm w-full text-[color:var(--text-muted)]">
                Navigating SON, NAFDAC, and NCS requirements doesn't have to be
                stressful. Here's what to prepare.
              </p>
              <div className="flex flex-wrap gap-2 md:gap-3 lg:gap-4 mt-3 md:mt-4 lg:mt-6 text-xs md:text-sm lg:text-sm">
                <button className="text-[#C14315] bg-[#FDF2FA] px-3 lg:px-4 py-1 rounded-2xl">
                  Customs
                </button>
                <button className="text-[#3538CD] bg-[#EEF4FF] px-3 lg:px-4 py-1 rounded-2xl">
                  Nigeria
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Featured Post */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 justify-between mt-10 md:mt-16 lg:mt-24">
        <img
          className="w-full md:w-1/2 rounded-lg lg:rounded-none"
          src={ship4}
          alt="Ship 4"
          loading="lazy"
        />
        <div className="w-full md:w-1/2">
          <p className="text-[color:var(--accent)] text-[12px] font-semibold">
            Friday, 18 Apr 2025
          </p>
          <h6 className="text-lg md:text-xl lg:text-xl font-semibold mt-3 lg:mt-4">
            Understanding CBM: How We Calculate Sea Freight Rates
          </h6>
          <p className="mt-3 lg:mt-4 text-sm w-full text-[color:var(--text-muted)]">
            Cubic metre (CBM) pricing can be confusing. We explain how ocean
            freight is measured and priced so you can estimate your costs
            accurately before shipping. Knowing your CBM helps you choose
            between LCL and FCL and avoid surprises on your invoice.
          </p>
          <div className="flex flex-wrap gap-3 lg:gap-4 mt-4 md:mt-6 lg:mt-8 text-xs md:text-sm lg:text-sm">
            <button className="text-[#3538CD] bg-[#EEF4FF] px-3 lg:px-4 py-1 rounded-2xl">
              Sea Freight
            </button>
            <button className="text-[color:var(--accent)] bg-[#FFF4EE] px-3 lg:px-4 py-1 rounded-2xl">
              Pricing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
