import { useState } from "react";
import globallogo from "../assets/globallogo.svg";
import { NavLink } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { NAV_LINKS } from "../constants/siteData";
import { useFeatureAccess } from "../hooks/useFeatureAccess";

const NavBar = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openFeatureModal } = useFeatureAccess();

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "font-bold text-[color:var(--accent)] border-b-2 border-[color:var(--accent)] pb-1"
      : "pb-1 hover:text-[color:var(--accent)] transition-colors";

  return (
    <div
      className={`absolute left-1/2 top-full z-50 w-full -translate-x-1/2 transition-[margin] duration-300 ease-in-out ${isScrolled ? "" : "lg:-mt-6"}`}
    >
      <div className="page-shell">
        <div
          className={`mx-auto bg-[color:var(--nav-bg)] px-6 sm:px-8 lg:px-10 shadow-[0_4px_10px_rgba(128,128,128,0.5)] ${
            isScrolled ? "w-full" : "md:w-[92%]"
          }`}
        >
      <nav className="flex items-center justify-between">
        {/* Desktop Layout */}
        <div className="hidden min-w-0 lg:flex items-center justify-between gap-10 xl:gap-16">
          <img className="h-auto w-[170px] xl:w-auto" src={globallogo} alt="Global Express Logo" />
          <ul className="flex items-center gap-4 whitespace-nowrap py-6 text-xs font-heading font-medium text-[color:var(--text)] xl:gap-6 xl:text-[13px]">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={navLinkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden items-center gap-3 whitespace-nowrap text-xs font-heading font-medium text-[color:var(--text)] xl:gap-4 xl:text-[13px] lg:flex">
          <button
            type="button"
            onClick={() => openFeatureModal("track")}
            className="pb-1 hover:text-[color:var(--accent)] transition-colors"
          >
            Track your shipment
          </button>
          <p className="text-[color:var(--text-muted)]">|</p>
          <button
            type="button"
            onClick={() => openFeatureModal("signin")}
            className="pb-1 hover:text-[color:var(--accent)] transition-colors"
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => openFeatureModal("signup")}
            className="bg-[color:var(--accent)] text-[color:var(--accent-contrast)] px-5 py-2 rounded-lg hover:bg-[color:var(--accent-hover)] transition-colors"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Layout */}
        <div className="w-full lg:hidden">
          <div className="flex items-center justify-between py-4">
            <img
              className="block h-auto w-[170px] max-sm:w-[150px]"
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
            <button
              type="button"
              className="text-left pb-1 hover:text-[color:var(--accent)] transition-colors"
              onClick={() => {
                setIsMenuOpen(false);
                openFeatureModal("track");
              }}
            >
              Track your shipment
            </button>
            <button
              type="button"
              className="text-left hover:text-[color:var(--accent)] transition-colors"
              onClick={() => {
                setIsMenuOpen(false);
                openFeatureModal("signin");
              }}
            >
              Sign in
            </button>
            <button
              type="button"
              className="bg-[color:var(--accent)] text-[color:var(--accent-contrast)] px-4 py-2 rounded-lg text-left hover:bg-[color:var(--accent-hover)] transition-colors"
              onClick={() => {
                setIsMenuOpen(false);
                openFeatureModal("signup");
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
