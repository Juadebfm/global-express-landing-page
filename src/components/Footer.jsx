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
    <div className="mt-48 px-16 text-[#FFFFFF] ">
      <div className="flex items-start ">
        <div>
          <img src={footerImage} alt="Footer" className="w-full h-auto" />
        </div>
        <div className="ml-16 flex items-start justify-between gap-32">
          <div className="mt-3 ">
            <h6 className="text-sm mb-3 font-semibold">Company</h6>
            <ul className="text-[13px] text-[#FFFF] flex flex-col gap-6">
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
          <div className="mt-3">
            <h6 className="text-sm mb-3 font-semibold">Solutions</h6>
            <ul className="text-[13px] text-[#FFFF] flex flex-col gap-4">
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
            </ul>
          </div>
          <div className="mt-3 ">
            <h6 className="text-sm mb-3 font-semibold">Resources</h6>
            <ul className="text-[13px] text-[#FFFF] flex flex-col gap-4">
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
        </div>
      </div>
      <div className="w-full h-[0.5px] bg-[#FF6600] mt-10"></div>
      <div className="flex items-start mt-12 ">
        <div>
          <img src={footerImage} alt="Footer" className="w-full h-auto" />
        </div>
        <div className="ml-16 flex items-start justify-between gap-32">
          <div className="mt-3 ">
            <h6 className="text-sm mb-3 font-semibold">Company</h6>
            <ul className="text-[13px] text-[#FFFF] flex flex-col gap-6">
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
          <div className="mt-3">
            <h6 className="text-sm mb-3 font-semibold">Solutions</h6>
            <ul className="text-[13px] text-[#FFFF] flex flex-col gap-4">
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
          <div className="mt-3 ">
            <h6 className="text-sm mb-3 font-semibold">Resources</h6>
            <ul className="text-[13px] text-[#FFFF] flex flex-col gap-4">
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
          <div className="mt-3 ml-3">
            <h6 className="text-sm mb-3 font-semibold">Contact us</h6>
            <p className="text-[12px]">KR: +82 (0)70 4142 5371</p>
            <p className="text-[12px] mt-2">NG: +234 (0)906 000 0193</p>
            <div className="mt-3 flex flex-col">
              <h6 className="text-[#FF6600]">Newsletter</h6>
              <input
                type="text"
                name=""
                id=""
                placeholder="Your Email"
                className="border border-[#99A0AE] rounded-md px-4 py-4 bg-transparent mt-2 placeholder:text-[14px] "
              />
              <button className="bg-[#FF6600] mt-3 px-4 py-2 rounded-lg w-[50%]">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[0.5px] bg-[#FF6600] mt-10"></div>
      <div className="flex items-center justify-between mt-6">
        <small>Globalexpress@2026. All rights reserved.</small>
        <div className="flex items-center gap-6">
          <FaYoutube />
          <FaFacebookF />
          <FaTwitter />
          <FaInstagram />
          <FaLinkedinIn />
        </div>
      </div>
      <div className="flex items-center justify-between mt-8">
        <small>Globalexpress@2026. All rights reserved.</small>
        <div className="flex items-center gap-6">
          <FaYoutube />
          <FaFacebookF />
          <FaTwitter />
          <FaInstagram />
          <FaLinkedinIn />
        </div>
      </div>
    </div>
  );
};

export default Footer;
