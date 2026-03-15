import footerImage from "../assets/footerImage.png";
import { Link } from "react-router-dom";
import { FaYoutube, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { CONTACT, SOCIAL_LINKS } from "../constants/siteData";

const Footer = () => {
  return (
    <div className="mt-48 w-full overflow-hidden px-16 pb-8 text-[color:var(--footer-text)] bg-[color:var(--footer-bg)] max-md:px-6 max-md:mt-32 max-sm:px-4 max-sm:mt-24">
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
