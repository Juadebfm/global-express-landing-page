import React, { useState } from "react";
import globallogo from "../assets/globallogo.png";
import { NavLink } from "react-router-dom";
import { GiMoon } from "react-icons/gi";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "font-bold text-[#FF6600] border-b-2 border-[#FF6600] pb-1"
      : "pb-1";

  return (
    <div className=" w-full px-8 bg-[#232323] md:w-[92%] mx-auto absolute left-1/2 -translate-x-1/2 top-full lg:-mt-6 shadow-[0_4px_10px_rgba(128,128,128,0.5)] z-50">
      <nav className="flex items-center justify-between">
        {/* Desktop Layout - unchanged */}
        <div className="hidden lg:flex items-center justify-between gap-20">
          <img className="" src={globallogo} alt="Global Express Logo" />
          <ul className="text-[#FFFFFF] flex items-center gap-8 py-6 text-[13px] font-semibold">
            <li>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navLinkClass}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" className={navLinkClass}>
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/get-a-quote" className={navLinkClass}>
                Get a quote
              </NavLink>
            </li>
            <li>
              <NavLink to="/shipment-calculator" className={navLinkClass}>
                Shipment Calculator
              </NavLink>
            </li>
            <li>
              <NavLink to="/blog" className={navLinkClass}>
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navLinkClass}>
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="hidden lg:flex text-[#FFFFFF] text-[13px] font-semibold items-center gap-4">
          <NavLink to="/track-shipment" className={navLinkClass}>
            Track your shipment
          </NavLink>
          <p>|</p>
          <button>Sign in</button>
          <button className="bg-[#FF6600] px-4 py-2 rounded-lg">
            Get Started
          </button>
          <p>|</p>
          <GiMoon />
        </div>

        {/* Mobile Layout - Logo and Menu side by side */}
        <div className="lg:hidden w-full">
          <div className="flex items-center justify-between py-4">
            <img
              className="w-auto block"
              src={globallogo}
              alt="Global Express Logo"
            />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white text-3xl block"
            >
              {isMenuOpen ? <IoClose /> : <HiMenuAlt3 />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden pb-6">
          <ul className="text-[#FFFFFF] flex flex-col gap-4 text-[13px] font-semibold">
            <li>
              <NavLink
                to="/"
                className={navLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={navLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                className={navLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/get-a-quote"
                className={navLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Get a quote
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shipment-calculator"
                className={navLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Shipment Calculator
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                className={navLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={navLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </NavLink>
            </li>
          </ul>

          {/* Mobile actions - aligned and presentable */}
          <div className="flex flex-col gap-3 mt-6 text-[#FFFFFF] text-[13px] font-semibold border-t border-gray-600 pt-4">
            <NavLink
              to="/track-shipment"
              className={navLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Track your shipment
            </NavLink>
            <button className="text-left" onClick={() => setIsMenuOpen(false)}>
              Sign in
            </button>
            <button
              className="bg-[#FF6600] px-4 py-2 rounded-lg text-left"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </button>
            <div className="flex items-center gap-2 mt-2">
              <GiMoon />
              <span>Dark Mode</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
