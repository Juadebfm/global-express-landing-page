import React from "react";
import footerImage from "../assets/footerImage.png";
import { Link } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="mt-48 px-16 text-[color:var(--footer-text)] bg-[color:var(--footer-bg)] max-md:px-6 max-md:mt-32 max-sm:px-4 max-sm:mt-24">
    
      <div className="flex items-start mt-12 max-md:flex-col max-md:gap-8 max-md:mt-8 max-sm:gap-6">
        <div className="max-md:w-full max-md:flex max-md:justify-center max-sm:justify-start">
          <img
            src={footerImage}
            alt="Footer"
            className="w-full h-auto max-md:max-w-[200px] max-sm:max-w-[180px]"
          />
        </div>
        <div className="ml-16 flex items-start justify-between gap-32 max-md:ml-0 max-md:gap-8 max-md:w-full max-md:flex-wrap max-sm:flex-col max-sm:gap-6">
          <div className="mt-3 max-md:mt-0">
            <h6 className="text-sm mb-3 font-semibold">Company</h6>
            <ul className="text-[13px] text-[color:var(--footer-text)] flex flex-col gap-6 max-sm:gap-4">
              <li>
                <Link>Track your shipment</Link>
              </li>
              <li>
                <Link>Ship Management </Link>
              </li>
              <li>
                <Link>Marine Logistics</Link>
              </li>
              <li>
                <Link>Sailors Management </Link>
              </li>
            </ul>
          </div>
          <div className="mt-3 max-md:mt-0">
            <h6 className="text-sm mb-3 font-semibold">Solutions</h6>
            <ul className="text-[13px] text-[color:var(--footer-text)] flex flex-col gap-4">
              <li>
                <Link>Air Cargo</Link>
              </li>
              <li>
                <Link>Courier Services (door-to-door)</Link>
              </li>
              <li>
                <Link>Ocean Shipping</Link>
              </li>
              <li>
                <Link>Packaging</Link>
              </li>
              <li>
                <Link>Storage services</Link>
              </li>
              <li>
                <Link>Product sourcing and buying</Link>
              </li>
              <li>
                <Link>Fund Transfer</Link>
              </li>
            </ul>
          </div>
          <div className="mt-3 max-md:mt-0">
            <h6 className="text-sm mb-3 font-semibold">Resources</h6>
            <ul className="text-[13px] text-[color:var(--footer-text)] flex flex-col gap-4">
              <li>
                <Link>Get a quote</Link>
              </li>
              <li>
                <Link>Calculate Shipment</Link>
              </li>
              <li>
                <Link>Blog</Link>
              </li>
            </ul>
          </div>
          <div className="mt-3 ml-3 max-md:ml-0 max-md:mt-0 max-md:w-full max-sm:w-full">
            <h6 className="text-sm mb-3 font-semibold">Contact us</h6>
            <p className="text-[12px]">KR: +82 (0)70 4142 5371</p>
            <p className="text-[12px] mt-2">NG: +234 (0)906 000 0193</p>
            <div className="mt-3 flex flex-col">
              <h6 className="text-[color:var(--accent)]">Newsletter</h6>
              <input
                type="text"
                name=""
                id=""
                placeholder="Your Email"
                className="border border-[#99A0AE] rounded-md px-4 py-4 bg-transparent mt-2 placeholder:text-[14px] max-sm:py-3"
              />
              <button className="bg-[color:var(--accent)] text-[color:var(--accent-contrast)] mt-3 px-4 py-2 rounded-lg w-[50%] max-md:w-[40%] max-sm:w-full transition hover:bg-[#e65c00]">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[0.5px] bg-[color:var(--accent)] mt-10 max-sm:mt-8"></div>
      <div className="flex items-center justify-between mt-6 max-sm:flex-col max-sm:gap-4 max-sm:items-start">
        <small className="max-sm:text-[11px]">
          Globalexpress@2026. All rights reserved.
        </small>
        <div className="flex items-center gap-6 max-sm:gap-4">
          <FaYoutube className="cursor-pointer hover:text-[color:var(--accent)] transition max-sm:text-sm" />
          <FaFacebookF className="cursor-pointer hover:text-[color:var(--accent)] transition max-sm:text-sm" />
          <FaTwitter className="cursor-pointer hover:text-[color:var(--accent)] transition max-sm:text-sm" />
          <FaInstagram className="cursor-pointer hover:text-[color:var(--accent)] transition max-sm:text-sm" />
          <FaLinkedinIn className="cursor-pointer hover:text-[color:var(--accent)] transition max-sm:text-sm" />
        </div>
      </div>
      
    </div>
  );
};

export default Footer;
