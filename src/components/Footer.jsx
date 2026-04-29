import { useState } from "react";
import footerImage from "../assets/footerImage.png";
import { Link } from "react-router-dom";
import { FaYoutube, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { CONTACT, SOCIAL_LINKS } from "../constants/siteData";
import { publicApi } from "../api/publicApi";
import { getUserFacingApiError } from "../api/errorUtils";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Footer = ({ topSpacingClass = "mt-48 max-md:mt-32 max-sm:mt-24" }) => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterState, setNewsletterState] = useState({
    loading: false,
    type: "",
    message: "",
  });

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault();
    const email = newsletterEmail.trim();

    if (!email || !EMAIL_PATTERN.test(email)) {
      setNewsletterState({
        loading: false,
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    try {
      setNewsletterState({
        loading: true,
        type: "",
        message: "",
      });
      await publicApi.subscribeNewsletter(email);
      setNewsletterEmail("");
      setNewsletterState({
        loading: false,
        type: "success",
        message: "You are subscribed. We will share updates soon.",
      });
    } catch (error) {
      const message = getUserFacingApiError(
        error,
        "Unable to subscribe right now. Please try again."
      );
      setNewsletterState({
        loading: false,
        type: "error",
        message,
      });
    }
  };

  return (
    <div className={`${topSpacingClass} w-full overflow-hidden px-16 pb-8 text-[color:var(--footer-text)] bg-[color:var(--footer-bg)] max-md:px-6 max-sm:px-4`}>
      <div className="flex items-start mt-12 max-md:flex-col max-md:gap-8 max-md:mt-8 max-sm:gap-6">
        <div className="shrink-0 max-md:w-full max-md:flex max-md:justify-center max-sm:justify-start">
          <img
            src={footerImage}
            alt="Global Express"
            className="footer-logo w-full h-auto max-md:max-w-[200px] max-sm:max-w-[180px]"
          />
        </div>
        <div className="flex-1 min-w-0 ml-16 flex items-start justify-between gap-16 max-md:ml-0 max-md:gap-8 max-md:w-full max-md:flex-wrap max-sm:flex-col max-sm:gap-6">
          <div className="mt-3 max-md:mt-0">
            <h6 className="text-sm mb-3 font-semibold font-[Montserrat]">Company</h6>
            <ul className="text-[14px] text-[color:var(--footer-text)] font-[Lato] flex flex-col gap-6 max-sm:gap-4">
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="mt-3 max-md:mt-0">
            <h6 className="text-sm mb-3 font-semibold font-[Montserrat]">Resources</h6>
            <ul className="text-[14px] text-[color:var(--footer-text)] font-[Lato] flex flex-col gap-6 max-sm:gap-4">
              <li>
                <Link to="/shipment-calculator">Shipment Calculator</Link>
              </li>
              <li>
                <Link to="/track-shipment">Track Shipment</Link>
              </li>
            </ul>
          </div>
          <div className="mt-3 max-md:mt-0">
            <h6 className="text-sm mb-3 font-semibold font-[Montserrat]">Legal</h6>
            <ul className="text-[14px] text-[color:var(--footer-text)] font-[Lato] flex flex-col gap-6 max-sm:gap-4">
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-and-conditions">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
          <div className="mt-3 ml-3 max-md:ml-0 max-md:mt-0 max-md:w-full max-sm:w-full">
            <h6 className="text-sm mb-3 font-semibold font-[Montserrat]">Contact us</h6>
            <p className="text-[14px] font-[Lato]">KR: {CONTACT.phones.korea}</p>
            <p className="text-[14px] font-[Lato] mt-2">NG: {CONTACT.phones.nigeria}</p>
            <a href={`mailto:${CONTACT.email}`} className="text-[14px] font-[Lato] mt-2 block hover:text-[color:var(--accent)] transition-colors">{CONTACT.email}</a>
          </div>
          <div className="mt-3 max-md:mt-0 max-md:w-full">
            <h6 className="text-sm mb-3 font-semibold font-[Montserrat]">Newsletter</h6>
            <p className="text-[14px] font-[Lato] text-[color:var(--footer-muted)] mb-3">
              Get shipment updates and route alerts in your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2 max-w-[280px]">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(event) => setNewsletterEmail(event.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-md border border-[color:var(--footer-border)] bg-transparent text-[14px] outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
              />
              <button
                type="submit"
                disabled={newsletterState.loading}
                className="w-full bg-[color:var(--accent)] text-[color:var(--accent-contrast)] text-sm font-semibold px-4 py-2 rounded-md transition-colors hover:bg-[color:var(--accent-hover)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {newsletterState.loading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            {newsletterState.message && (
              <p
                className={`mt-2 text-xs ${
                  newsletterState.type === "success" ? "text-green-300" : "text-red-300"
                }`}
              >
                {newsletterState.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-[0.5px] bg-[color:var(--accent)] mt-10 max-sm:mt-8"></div>
      <div className="flex items-center justify-between mt-6 max-sm:flex-col max-sm:gap-4 max-sm:items-start">
        <small className="max-sm:text-[11px]">
          Globalexpress@2026. All rights reserved.
        </small>
        <div className="flex items-center gap-6 max-sm:gap-4">
          <a href={SOCIAL_LINKS.youtube} aria-label="YouTube" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="cursor-pointer hover:text-[color:var(--accent)] transition max-sm:text-sm" />
          </a>
          <a href={SOCIAL_LINKS.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="cursor-pointer hover:text-[color:var(--accent)] transition max-sm:text-sm" />
          </a>
          <a href={SOCIAL_LINKS.twitter} aria-label="Twitter" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="cursor-pointer hover:text-[color:var(--accent)] transition max-sm:text-sm" />
          </a>
          <a href={SOCIAL_LINKS.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="cursor-pointer hover:text-[color:var(--accent)] transition max-sm:text-sm" />
          </a>
          <a href={SOCIAL_LINKS.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn className="cursor-pointer hover:text-[color:var(--accent)] transition max-sm:text-sm" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
