import React from "react";
import ship1 from "../assets/ship1.png";
import ship2 from "../assets/ship2.png";
import ship3 from "../assets/ship3.png";
import ship4 from "../assets/ship4.png";

const Blogs = () => {
  return (
    <div className="mt-12 md:mt-16 lg:mt-24 px-6 md:px-12 lg:px-24">
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
              className="w-full rounded-lg lg:rounded-none"
            />
            <p className="text-[#FF6600] text-[12px] mt-4 md:mt-5 lg:mt-6 font-semibold">
              Sunday , 1 Jan 2023
            </p>
            <h6 className="text-lg md:text-xl lg:text-xl font-semibold mt-3 lg:mt-4">
              UX review presentations
            </h6>
            <p className="mt-3 lg:mt-4 text-sm w-full text-[#C0C5D0]">
              How do you create compelling presentations that wow your
              colleagues and impress your managers?
            </p>
            <div className="flex items-center flex-wrap lg:flex-nowrap gap-3 lg:gap-4 mt-4 lg:mt-6 text-xs md:text-sm lg:text-sm">
              <button className="text-[#FF6600] bg-[#F9F5FF] px-3 lg:px-4 py-1 rounded-2xl">
                Design
              </button>
              <button className="text-[#3538CD] bg-[#EEF4FF] px-3 lg:px-4 py-1 rounded-2xl">
                Research
              </button>
              <button className="text-[#C14315] bg-[#FDF2FA] px-3 lg:px-4 py-1 rounded-2xl">
                Presentation
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
                className="w-full h-full lg:h-auto object-cover lg:object-fill"
              />
            </div>
            <div className="flex-1">
              <p className="text-[#FF6600] text-[12px] font-semibold">
                Sunday , 1 Jan 2023
              </p>
              <h6 className="text-base md:text-lg lg:text-xl font-semibold mt-2 md:mt-3 lg:mt-4">
                Migrating to Linear 101
              </h6>
              <p className="mt-2 md:mt-3 lg:mt-4 text-xs md:text-sm lg:text-sm w-full text-[#C0C5D0]">
                Linear helps streamline software projects, sprints, tasks, and
                bug tracking. Here's how to get...
              </p>
              <div className="flex flex-wrap gap-2 md:gap-3 lg:gap-4 mt-3 md:mt-4 lg:mt-6 text-xs md:text-sm lg:text-sm">
                <button className="text-[#FF6600] bg-[#F9F5FF] px-3 lg:px-4 py-1 rounded-2xl">
                  Design
                </button>
                <button className="text-[#C14315] bg-[#FDF2FA] px-3 lg:px-4 py-1 rounded-2xl">
                  Research
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
                className="w-full h-full lg:h-auto object-cover lg:object-fill"
              />
            </div>
            <div className="flex-1">
              <p className="text-[#FF6600] text-[12px] font-semibold">
                Sunday , 1 Jan 2023
              </p>
              <h6 className="text-base md:text-lg lg:text-xl font-semibold mt-2 md:mt-3 lg:mt-4">
                Migrating to Linear 101
              </h6>
              <p className="mt-2 md:mt-3 lg:mt-4 text-xs md:text-sm lg:text-sm w-full text-[#C0C5D0]">
                Linear helps streamline software projects, sprints, tasks, and
                bug tracking. Here's how to get...
              </p>
              <div className="flex flex-wrap gap-2 md:gap-3 lg:gap-4 mt-3 md:mt-4 lg:mt-6 text-xs md:text-sm lg:text-sm">
                <button className="text-[#FF6600] bg-[#F9F5FF] px-3 lg:px-4 py-1 rounded-2xl">
                  Design
                </button>
                <button className="text-[#C14315] bg-[#FDF2FA] px-3 lg:px-4 py-1 rounded-2xl">
                  Research
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
        />
        <div className="w-full md:w-1/2">
          <p className="text-[#FF6600] text-[12px] font-semibold">
            Sunday , 1 Jan 2023
          </p>
          <h6 className="text-lg md:text-xl lg:text-xl font-semibold mt-3 lg:mt-4">
            Grid system for better Design User Interface
          </h6>
          <p className="mt-3 lg:mt-4 text-sm w-full text-[#C0C5D0]">
            A grid system is a design tool used to arrange content on a webpage.
            It is a series of vertical and horizontal lines that create a matrix
            of intersecting points, which can be used to align and organize page
            elements. Grid systems are used to create a consistent look and feel
            across a website, and can help to make the layout more visually
            appealing and easier to navigate.
          </p>
          <div className="flex flex-wrap gap-3 lg:gap-4 mt-4 md:mt-6 lg:mt-8 text-xs md:text-sm lg:text-sm">
            <button className="text-[#FF6600] bg-[#F9F5FF] px-3 lg:px-4 py-1 rounded-2xl">
              Design
            </button>
            <button className="text-[#C14315] bg-[#FDF2FA] px-3 lg:px-4 py-1 rounded-2xl">
              Research
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
