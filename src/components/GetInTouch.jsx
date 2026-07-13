import { useState, useCallback } from "react";
import contactImage from "../assets/customer.webp";
import horizontal from "../assets/horizontal.png";
import { IoLocationOutline } from "react-icons/io5";
import { FaPhoneVolume } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { CONTACT } from "../constants/siteData";
import { publicApi } from "../api/publicApi";
import { getUserFacingApiError } from "../api/errorUtils";
import { TurnstileWidget } from "./TurnstileWidget";

const INITIAL_FORM = { fullName: "", email: "", phone: "", message: "" };

const GetInTouch = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [state, setState] = useState({ loading: false, success: false, error: "" });

  const handleCaptchaToken = useCallback((token) => setCaptchaToken(token), []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.message.trim()) return;
    if (!captchaToken) {
      setState({
        loading: false,
        success: false,
        error: "Please complete the verification check before sending your message.",
      });
      return;
    }

    setState({ loading: true, success: false, error: "" });
    try {
      await publicApi.submitContactInquiry(
        {
          fullName: form.fullName.trim(),
          email: form.email.trim() || undefined,
          phone: form.phone.trim() || undefined,
          message: form.message.trim(),
        },
        captchaToken,
      );
      setForm(INITIAL_FORM);
      setState({ loading: false, success: true, error: "" });
    } catch (err) {
      const error = getUserFacingApiError(err, "Unable to send your message right now. Please try again.");
      setState({ loading: false, success: false, error });
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-[color:var(--border)] bg-[color:var(--input-bg,var(--bg))] text-[color:var(--text)] text-sm outline-none focus:ring-2 focus:ring-[color:var(--accent)] transition";

  return (
    <div className="page-shell mt-48 text-[color:var(--text)] max-md:mt-32 max-sm:mt-24">
      <div className="page-frame">
        <div className="flex items-start justify-between gap-16 max-md:flex-col max-md:gap-8 max-sm:gap-6">
          {/* Left — image */}
          <div className="flex-1 max-md:w-full">
            <img
              src={contactImage}
              alt="Contact us"
              className="w-full h-auto rounded-lg object-cover max-md:max-h-[350px] max-sm:max-h-[250px]"
            />
          </div>

          {/* Right — info + form */}
          <div className="flex-1 max-w-2xl mt-24 max-lg:mt-12 max-md:mt-0 max-md:max-w-full">
            <div className="flex items-center gap-2">
              <img src={horizontal} alt="" aria-hidden="true" />
              <p className="text-sm font-semibold text-[color:var(--accent)] uppercase tracking-wide">Get in Touch</p>
            </div>
            <div className="mt-4">
              <h4 className="text-[32px] font-bold mb-4 max-w-[80%] max-md:text-[28px] max-md:max-w-full max-sm:text-[24px]">
                WE ARE YOUR RELIABLE PARTNERS FOR THE BEST LOGISTICS SOLUTIONS
              </h4>
              <p className="mb-6 text-[17px] text-[color:var(--text-muted)] max-w-[80%] max-md:max-w-full max-sm:text-[15px]">
                Whether you have a specific shipping requirement or need help
                navigating Nigerian Customs, we're here to help.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-4 max-sm:space-y-3 mb-8">
              <div className="flex items-center gap-3 text-base max-sm:items-start">
                <p className="bg-[color:var(--accent)] text-[color:var(--accent-contrast)] py-2 p-3 max-sm:py-2.5 max-sm:px-2.5 flex-shrink-0">
                  <IoLocationOutline className="text-[18px] max-sm:text-[16px]" />
                </p>
                <div>
                  <p><span className="font-bold">NIGERIA:</span> {CONTACT.addresses.nigeria}</p>
                  <p className="max-sm:mt-1"><span className="font-bold">KOREA:</span> {CONTACT.addresses.korea}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-base max-sm:items-start">
                <p className="bg-[color:var(--accent)] text-[color:var(--accent-contrast)] py-2 p-3 max-sm:py-2.5 max-sm:px-2.5 flex-shrink-0">
                  <FaPhoneVolume className="text-[18px] max-sm:text-[16px]" />
                </p>
                <div>
                  <p><span className="font-bold">KR:</span> <a href={`tel:${CONTACT.phones.koreaRaw}`}>{CONTACT.phones.korea}</a></p>
                  <p className="max-sm:mt-1"><span className="font-bold">NG:</span> <a href={`tel:${CONTACT.phones.nigeriaRaw}`}>{CONTACT.phones.nigeria}</a></p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-base max-sm:items-start">
                <p className="bg-[color:var(--accent)] text-[color:var(--accent-contrast)] py-2 p-3 max-sm:py-2.5 max-sm:px-2.5 flex-shrink-0">
                  <CiMail className="text-[18px] max-sm:text-[16px]" />
                </p>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-[color:var(--accent)] transition-colors">{CONTACT.email}</a>
              </div>
            </div>

            {/* Contact form */}
            {state.success ? (
              <div className="rounded-xl border border-green-200 bg-green-50 px-6 py-5">
                <p className="font-semibold text-green-800">Message sent!</p>
                <p className="mt-1 text-sm text-green-700">
                  Thank you. Our team will be in touch within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => setState({ loading: false, success: false, error: "" })}
                  className="mt-4 text-sm font-medium text-green-800 underline hover:no-underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                      minLength={2}
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+234 900 000 0000"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message <span className="text-red-500">*</span></label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    rows={4}
                    placeholder="Tell us about your shipment or enquiry"
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <TurnstileWidget onToken={handleCaptchaToken} />
                {state.error && (
                  <p className="text-sm text-red-600">{state.error}</p>
                )}
                <button
                  type="submit"
                  disabled={state.loading}
                  className="w-full bg-[color:var(--accent)] text-[color:var(--accent-contrast)] font-semibold py-3 rounded-lg transition-colors hover:bg-[color:var(--accent-hover)] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {state.loading ? "Sending..." : "Send message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
