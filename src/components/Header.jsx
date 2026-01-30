import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import NavBar from "../components/NavBar";

const Header = () => {
  return (
    <div className="bg-[#78553E] sticky top-0 z-50">
      {/* Hide this section on mobile (below lg) */}
      <div className="hidden lg:flex items-center justify-between text-white px-16 py-6 pb-12">
        <div className="flex items-center gap-8">
          <div>
            <div className="flex items-center gap-2 text-[13px]">
              <IoLocationOutline />
              <p>Suite 2, 4b Toyin Street, Ikeja. Lagos</p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-[13px]">
              <MdOutlineMail />
              <p>sales@globalexpress.kr</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 text-[13px]">
            <FaPhoneVolume />
            <p>KR: +82 (0)70 4142 5371 | NG: +234 (0)906 000 0193</p>
          </div>
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default Header;
