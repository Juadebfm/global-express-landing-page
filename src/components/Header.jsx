import { useState, useEffect, useRef } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FaPhoneVolume } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import NavBar from "../components/NavBar";
import { CONTACT } from "../constants/siteData";

const Header = ({ navProps }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const contactBarRef = useRef(null);
  const [barHeight, setBarHeight] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (contactBarRef.current) {
        setBarHeight(contactBarRef.current.offsetHeight);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="bg-[color:var(--header-bg)] sticky z-50 transition-[top] duration-300 ease-in-out"
      style={{ top: isScrolled ? `-${barHeight}px` : "0px" }}
    >
      {/* Contact bar - slides above viewport on scroll (lg+ only) */}
      <div ref={contactBarRef} className="hidden lg:block text-white">
        <div className="page-shell py-5 pb-12">
          <div className="page-frame flex items-center justify-between gap-6">
            <div className="flex min-w-0 items-center gap-6 xl:gap-8">
              <div className="flex min-w-0 items-center gap-2 text-sm">
                <IoLocationOutline className="text-base flex-shrink-0" />
                <p className="truncate">KR: {CONTACT.addresses.korea}</p>
              </div>
              <div className="flex min-w-0 items-center gap-2 text-sm">
                <IoLocationOutline className="text-base flex-shrink-0" />
                <p className="truncate">NG: {CONTACT.addresses.nigeria}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <a href={`tel:${CONTACT.phones.koreaRaw}`} className="flex items-center gap-2 hover:underline">
                <FaPhoneVolume className="text-base flex-shrink-0" />
                <span>KR: {CONTACT.phones.korea}</span>
              </a>
              <span>|</span>
              <a href={`https://wa.me/${CONTACT.phones.nigeriaRaw.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                <FaPhoneVolume className="text-base flex-shrink-0" />
                <span>NG: {CONTACT.phones.nigeria}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <NavBar isScrolled={isScrolled} {...navProps} />
    </div>
  );
};

export default Header;
