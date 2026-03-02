import { useState } from "react";
import globallogo from "../assets/globallogo.svg";
import { NavLink } from "react-router-dom";
import { FiMoon, FiSun } from "react-icons/fi";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useTheme } from "../contexts/theme-context";
import { NAV_LINKS, DASHBOARD_URL } from "../constants/siteData";

const NavBar = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "font-bold text-[color:var(--accent)] border-b-2 border-[color:var(--accent)] pb-1"
      : "pb-1 hover:text-[color:var(--accent)] transition-colors";

  return (
    <div className={`w-full px-8 bg-[color:var(--nav-bg)] mx-auto absolute left-1/2 -translate-x-1/2 top-full ${isScrolled ? "lg:px-16" : "md:w-[92%] lg:-mt-6"} shadow-[0_4px_10px_rgba(128,128,128,0.5)] z-50 transition-[margin,width,padding] duration-300 ease-in-out`}>
      <nav className="flex items-center justify-between">
        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between gap-16">
          <img src={globallogo} alt="Global Express Logo" />
          <ul className="text-[color:var(--text)] flex items-center gap-6 py-6 text-[13px] font-heading font-medium whitespace-nowrap">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={navLinkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:flex text-[color:var(--text)] text-[13px] font-heading font-medium items-center gap-4 whitespace-nowrap">
          <NavLink to="/track-shipment" className={navLinkClass}>
            Track your shipment
          </NavLink>
          <p className="text-[color:var(--text-muted)]">|</p>
          <a href={`${DASHBOARD_URL}/sign-in`} className="pb-1 hover:text-[color:var(--accent)] transition-colors">
            Sign in
          </a>
          <a
            href={`${DASHBOARD_URL}/sign-up`}
            className="bg-[color:var(--accent)] text-[color:var(--accent-contrast)] px-5 py-2 rounded-lg hover:bg-[color:var(--accent-hover)] transition-colors"
          >
            Get Started
          </a>
          <p className="text-[color:var(--text-muted)]">|</p>
          <button
            type="button"
            onClick={toggleTheme}
            className="text-[color:var(--icon)] text-lg"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>
        </div>

        {/* Mobile Layout */}
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
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <IoClose /> : <HiMenuAlt3 />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden pb-6">
          <ul className="text-[color:var(--text)] flex flex-col gap-4 text-sm font-heading font-medium">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={navLinkClass}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile actions */}
          <div className="flex flex-col gap-3 mt-6 text-[color:var(--text)] text-sm font-heading font-medium border-t border-gray-600 pt-4">
            <NavLink
              to="/track-shipment"
              className={navLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Track your shipment
            </NavLink>
            <a
              href={`${DASHBOARD_URL}/sign-in`}
              className="text-left"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign in
            </a>
            <a
              href={`${DASHBOARD_URL}/sign-up`}
              className="bg-[color:var(--accent)] text-[color:var(--accent-contrast)] px-4 py-2 rounded-lg text-left hover:bg-[color:var(--accent-hover)] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </a>
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
