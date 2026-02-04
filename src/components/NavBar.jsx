import React, { useState } from "react";
import globallogo from "../assets/globallogo.png";
import { NavLink } from "react-router-dom";
import { FiMoon, FiSun } from "react-icons/fi";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useTheme } from "../contexts/theme-context";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "font-bold text-[color:var(--accent)] border-b-2 border-[color:var(--accent)] pb-1"
      : "pb-1";

  return (
    <div className=" w-full px-8 bg-[color:var(--nav-bg)] md:w-[92%] mx-auto absolute left-1/2 -translate-x-1/2 top-full lg:-mt-6 shadow-[0_4px_10px_rgba(128,128,128,0.5)] z-50">
      <nav className="flex items-center justify-between">
        {/* Desktop Layout - unchanged */}
        <div className="hidden lg:flex items-center justify-between gap-20">
          <img className="" src={globallogo} alt="Global Express Logo" />
          <ul className="text-[color:var(--text)] flex items-center gap-8 py-6 text-[13px] font-semibold">
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

        <div className="hidden lg:flex text-[color:var(--text)] text-[13px] font-semibold items-center gap-4">
          <NavLink to="/track-shipment" className={navLinkClass}>
            Track your shipment
          </NavLink>
          <p>|</p>
          <button>Sign in</button>
          <button className="bg-[color:var(--accent)] text-[color:var(--accent-contrast)] px-4 py-2 rounded-lg">
            Get Started
          </button>
          <p>|</p>
          <button
            type="button"
            onClick={toggleTheme}
            className="text-[color:var(--icon)] text-lg"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>
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
              className="text-[color:var(--text)] text-3xl block"
            >
              {isMenuOpen ? <IoClose /> : <HiMenuAlt3 />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden pb-6">
          <ul className="text-[color:var(--text)] flex flex-col gap-4 text-[13px] font-semibold">
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
          <div className="flex flex-col gap-3 mt-6 text-[color:var(--text)] text-[13px] font-semibold border-t border-gray-600 pt-4">
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
              className="bg-[color:var(--accent)] text-[color:var(--accent-contrast)] px-4 py-2 rounded-lg text-left"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-2 mt-2 text-[color:var(--icon)]"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <FiSun /> : <FiMoon />}
              <span className="text-[color:var(--text)]">
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
