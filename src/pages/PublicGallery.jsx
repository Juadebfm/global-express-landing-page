import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiLock,
  FiLogIn,
  FiMapPin,
  FiTruck,
  FiUserPlus,
  FiX,
} from "react-icons/fi";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MODAL_CONTENT = {
  gallery: {
    icon: FiLock,
    eyebrow: "Temporarily unavailable",
    title: "The gallery is hidden for now.",
    message:
      "We have taken the public gallery offline for the moment. Please check back later or reach out to our team if you need help with an existing shipment.",
    primaryLabel: "Back to home",
    primaryAction: "home",
    secondaryLabel: "Contact us",
    secondaryAction: "contact",
    dismissible: false,
  },
  signin: {
    icon: FiLogIn,
    eyebrow: "Portal update",
    title: "Sign in is not available right now.",
    message:
      "We are making a few updates to the customer portal. Please try again later for account access.",
    primaryLabel: "Okay, got it",
    primaryAction: "close",
    secondaryLabel: "Contact us",
    secondaryAction: "contact",
    dismissible: true,
  },
  signup: {
    icon: FiUserPlus,
    eyebrow: "Registration paused",
    title: "Sign up is temporarily unavailable.",
    message:
      "New account creation is on pause while we finish a quick update. Please try again later.",
    primaryLabel: "Okay, got it",
    primaryAction: "close",
    secondaryLabel: "Contact us",
    secondaryAction: "contact",
    dismissible: true,
  },
  track: {
    icon: FiTruck,
    eyebrow: "Tracking unavailable",
    title: "Shipment tracking is temporarily unavailable.",
    message:
      "The public tracking flow is taking a short break while we refresh it. Please try again later.",
    primaryLabel: "Okay, got it",
    primaryAction: "close",
    secondaryLabel: "Contact us",
    secondaryAction: "contact",
    dismissible: true,
  },
};

const PublicGallery = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState("gallery");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = activeModal ? "hidden" : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeModal]);

  const modal = useMemo(() => MODAL_CONTENT[activeModal] || null, [activeModal]);

  const openNoticeModal = (type) => {
    setActiveModal(type);
  };

  const closeModal = () => {
    if (!modal?.dismissible) return;
    setActiveModal(null);
  };

  const handleModalAction = (action) => {
    if (action === "home") {
      navigate("/");
      return;
    }

    if (action === "contact") {
      navigate("/contact");
      return;
    }

    if (action === "close") {
      closeModal();
    }
  };

  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
      <Header
        navProps={{
          onTrackShipmentClick: () => openNoticeModal("track"),
          onSignInClick: () => openNoticeModal("signin"),
          onGetStartedClick: () => openNoticeModal("signup"),
        }}
      />

      <main className="pt-24 lg:pt-20 max-sm:pt-16 px-4 sm:px-8 lg:px-16 pb-0">
        <section className="min-h-[68vh] flex items-center justify-center py-10">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-[32px] border border-[color:var(--border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(247,241,236,0.92))] p-8 shadow-[0_28px_90px_rgba(15,23,42,0.12)] sm:p-10 lg:p-14">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.18),transparent_55%)] pointer-events-none" />
            <div className="relative max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">
                <FiLock className="text-sm" />
                Access Pause
              </p>
              <h1 className="mt-6 text-4xl font-bold leading-tight text-[color:var(--text)] sm:text-5xl">
                The public gallery is currently unavailable.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-[color:var(--text-muted)] sm:text-lg">
                We have hidden this page for now while updates are being made. If you need help with a shipment, our team can still help you directly.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[color:var(--accent)] px-6 py-3 font-semibold text-[color:var(--accent-contrast)] transition-colors hover:bg-[color:var(--accent-hover)]"
                >
                  <FiArrowLeft className="text-base" />
                  Back to home
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[color:var(--border)] bg-white/70 px-6 py-3 font-semibold text-[color:var(--text)] transition-colors hover:bg-white"
                >
                  <FiMapPin className="text-base" />
                  Contact our team
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {modal && (
        <div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-[rgba(15,23,42,0.58)] p-4 backdrop-blur-[6px]"
          onClick={modal.dismissible ? closeModal : undefined}
          role="presentation"
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-[28px] border border-white/35 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(249,245,240,0.97))] p-7 shadow-[0_28px_90px_rgba(15,23,42,0.28)] sm:p-8"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-notice-title"
            aria-describedby="gallery-notice-message"
          >
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[rgba(255,106,0,0.16)] blur-2xl" />
            {modal.dismissible && (
              <button
                type="button"
                onClick={closeModal}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-white/80 text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--text)]"
                aria-label="Close modal"
              >
                <FiX className="text-lg" />
              </button>
            )}

            <div className="relative">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[rgba(255,106,0,0.12)] text-[color:var(--accent)]">
                <modal.icon className="text-[30px]" />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">
                {modal.eyebrow}
              </p>
              <h2
                id="gallery-notice-title"
                className="mt-3 text-3xl font-bold leading-tight text-[color:var(--text)]"
              >
                {modal.title}
              </h2>
              <p
                id="gallery-notice-message"
                className="mt-4 text-base leading-7 text-[color:var(--text-muted)]"
              >
                {modal.message}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => handleModalAction(modal.primaryAction)}
                  className="inline-flex flex-1 items-center justify-center rounded-xl bg-[color:var(--accent)] px-5 py-3 font-semibold text-[color:var(--accent-contrast)] transition-colors hover:bg-[color:var(--accent-hover)]"
                >
                  {modal.primaryLabel}
                </button>
                <button
                  type="button"
                  onClick={() => handleModalAction(modal.secondaryAction)}
                  className="inline-flex flex-1 items-center justify-center rounded-xl border border-[color:var(--border)] bg-white/80 px-5 py-3 font-semibold text-[color:var(--text)] transition-colors hover:bg-white"
                >
                  {modal.secondaryLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer
        topSpacingClass="mt-0"
        onTrackShipmentClick={() => openNoticeModal("track")}
      />
    </div>
  );
};

export default PublicGallery;
