const contactImage = "/customer.png";
import horizontal from "../assets/horizontal.png";
import { IoLocationOutline } from "react-icons/io5";
import { FaPhoneVolume } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { CONTACT } from "../constants/siteData";

const GetInTouch = () => {
  return (
    <div className="mt-48 px-16 text-[color:var(--text)] max-md:px-6 max-md:mt-32 max-sm:px-4 max-sm:mt-24">
      <div className="flex items-start justify-between gap-16 max-md:flex-col max-md:gap-8 max-sm:gap-6">
        {/* First Container - Image */}
        <div className="flex-1 max-md:w-full">
          <img
            src={contactImage}
            alt="Contact us"
            className="w-full h-auto rounded-lg object-cover max-md:max-h-[350px] max-sm:max-h-[250px]"
          />
        </div>

        {/* Second Container - Content */}
        <div className="flex-1 max-w-2xl mt-24 max-lg:mt-12 max-md:mt-0 max-md:max-w-full">
          <div className="flex items-center gap-2">
            <img src={horizontal} alt="horizontal line" />
            <p className="text-sm font-semibold text-[color:var(--accent)] uppercase tracking-wide">Get in Touch</p>
          </div>
          <div className="mt-4">
            <h4 className="text-[32px] font-bold mb-4 max-w-[80%] max-md:text-[28px] max-md:max-w-full max-sm:text-[24px]">
              WE ARE YOUR RELIABLE PARTNERS FOR THE BEST LOGISTICS SOLUTIONS
            </h4>
            <p className="mb-6 text-[17px] text-[color:var(--text-muted)] max-w-[80%] max-md:max-w-full max-sm:text-[15px]">
              Whether you have a specific shipping requirement or need help
              navigating Nigerian Customs, we're here to help. Contact our
              offices in Seoul, Guangzhou, or Lagos to get started.
            </p>
          </div>
          <div className="space-y-4 max-sm:space-y-3">
            <div className="flex items-center gap-3 text-base max-sm:items-start">
              <p className="bg-[color:var(--accent)] text-[color:var(--accent-contrast)] py-2 p-3 max-sm:py-2.5 max-sm:px-2.5 flex-shrink-0">
                <IoLocationOutline className="text-[18px] max-sm:text-[16px]" />
              </p>
              <div>
                <p>
                  <span className="font-bold">NIGERIA:</span>{" "}
                  {CONTACT.addresses.nigeria}
                </p>
                <p className="max-sm:mt-1">
                  <span className="font-bold">KOREA:</span>{" "}
                  {CONTACT.addresses.korea}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-base max-sm:items-start">
              <p className="bg-[color:var(--accent)] text-[color:var(--accent-contrast)] py-2 p-3 max-sm:py-2.5 max-sm:px-2.5 flex-shrink-0">
                <FaPhoneVolume className="text-[18px] max-sm:text-[16px]" />
              </p>
              <div>
                <p>
                  <span className="font-bold">KR:</span>{" "}
                  <a href={`tel:${CONTACT.phones.koreaRaw}`}>{CONTACT.phones.korea}</a>
                </p>
                <p className="max-sm:mt-1">
                  <span className="font-bold">NG:</span>{" "}
                  <a href={`tel:${CONTACT.phones.nigeriaRaw}`}>{CONTACT.phones.nigeria}</a>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-base max-sm:items-start">
              <p className="bg-[color:var(--accent)] text-[color:var(--accent-contrast)] py-2 p-3 max-sm:py-2.5 max-sm:px-2.5 flex-shrink-0">
                <CiMail className="text-[18px] max-sm:text-[16px]" />
              </p>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
