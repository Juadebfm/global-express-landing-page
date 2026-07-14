import { useState, useCallback } from "react";
import footerImage from "../assets/footerImage.png";
import { Link } from "react-router-dom";
import { FaYoutube, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { CONTACT, SOCIAL_LINKS } from "../constants/siteData";
import { publicApi } from "../api/publicApi";
import { getUserFacingApiError } from "../api/errorUtils";
import { useFeatureAccess } from "../hooks/useFeatureAccess";
import { TurnstileWidget } from "./TurnstileWidget";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Footer = ({ topSpacingClass = "mt-48 max-md:mt-32 max-sm:mt-24" }) => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterState, setNewsletterState] = useState({
    loading: false,
    type: "",
    message: "",
  });
  const [captchaToken, setCaptchaToken] = useState(null);
  const handleCaptchaToken = useCallback((token) => setCaptchaToken(token), []);
  const { openFeatureModal } = useFeatureAccess();

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

    if (!captchaToken) {
      setNewsletterState({
        loading: false,
        type: "error",
        message: "Please complete the verification check before subscribing.",
      });
      return;
    }

    try {
      setNewsletterState({
        loading: true,
        type: "",
        message: "",
      });
      await publicApi.subscribeNewsletter(email, captchaToken);
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
    <div className={`${topSpacingClass} w-full overflow-hidden bg-[color:var(--footer-bg)] text-[color:var(--footer-text)]`}>
      <div className="page-shell pb-8">
      <div className="page-frame">
      <div className="mt-12 flex items-start max-md:mt-8 max-md:flex-col max-md:gap-8 max-sm:gap-6">
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
                <Link to="/shop">Shop</Link>
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
                <Link to="/claim-a-package">Claim a Package</Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openFeatureModal("track")}
                  className="text-left hover:text-[color:var(--accent)] transition-colors"
                >
                  Track Shipment
                </button>
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
              <TurnstileWidget onToken={handleCaptchaToken} className="mb-1" />
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
      <div className="mt-10 h-[0.5px] w-full bg-[color:var(--accent)] max-sm:mt-8"></div>
      <div className="mt-6 flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-4">
        <small className="max-sm:text-[11px]">
          Globalexpress@2026. All rights reserved.
        </small>
        <div className="flex items-center gap-6 max-sm:gap-4">
          {SOCIAL_LINKS.youtube && (
            <a href={SOCIAL_LINKS.youtube} aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="cursor-pointer hover:text-[color:var(--accent)] transition max-sm:text-sm" />
            </a>
          )}
          {SOCIAL_LINKS.facebook && (
            <a href={SOCIAL_LINKS.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="cursor-pointer hover:text-[color:var(--accent)] transition max-sm:text-sm" />
            </a>
          )}
          {SOCIAL_LINKS.twitter && (
            <a href={SOCIAL_LINKS.twitter} aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="cursor-pointer hover:text-[color:var(--accent)] transition max-sm:text-sm" />
            </a>
          )}
          {SOCIAL_LINKS.instagram && (
            <a href={SOCIAL_LINKS.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="cursor-pointer hover:text-[color:var(--accent)] transition max-sm:text-sm" />
            </a>
          )}
          {SOCIAL_LINKS.linkedin && (
            <a href={SOCIAL_LINKS.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className="cursor-pointer hover:text-[color:var(--accent)] transition max-sm:text-sm" />
            </a>
          )}
        </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Footer;
