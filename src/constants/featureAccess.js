import {
  FiArrowLeft,
  FiLock,
  FiLogIn,
  FiMapPin,
  FiTruck,
  FiUserPlus,
} from "react-icons/fi";

export const FEATURE_ACCESS_CONTENT = {
  gallery: {
    icon: FiLock,
    badgeIcon: FiLock,
    badgeLabel: "Access paused",
    pageTitle: "The public gallery is unavailable right now.",
    pageMessage:
      "We have taken the gallery offline for the moment while we finish some updates behind the scenes.",
    pagePrimaryLabel: "Back to home",
    pagePrimaryTo: "/",
    pageSecondaryLabel: "Contact our team",
    pageSecondaryTo: "/contact",
    modalEyebrow: "Temporarily unavailable",
    modalTitle: "The gallery is hidden for now.",
    modalMessage:
      "We have taken the public gallery offline for the moment. Please check back later or contact our team if you need help.",
    dismissible: false,
  },
  signin: {
    icon: FiLogIn,
    modalEyebrow: "Dashboard update",
    modalTitle: "Sign in is not available yet.",
    modalMessage:
      "We are still working on the internal dashboard experience. Please try again later.",
    modalPrimaryLabel: "Close",
    modalSecondaryLabel: "Contact us",
    modalSecondaryTo: "/contact",
    dismissible: true,
  },
  signup: {
    icon: FiUserPlus,
    modalEyebrow: "Onboarding paused",
    modalTitle: "Get Started is not available yet.",
    modalMessage:
      "We are still setting up the dashboard onboarding flow. Please try again later.",
    modalPrimaryLabel: "Close",
    modalSecondaryLabel: "Contact us",
    modalSecondaryTo: "/contact",
    dismissible: true,
  },
  track: {
    icon: FiTruck,
    badgeIcon: FiTruck,
    badgeLabel: "Tracking paused",
    pageTitle: "Shipment tracking is unavailable right now.",
    pageMessage:
      "We are still wiring up the public tracking experience, so this page is temporarily offline.",
    pagePrimaryLabel: "Back to home",
    pagePrimaryTo: "/",
    pageSecondaryLabel: "Contact our team",
    pageSecondaryTo: "/contact",
    modalEyebrow: "Tracking unavailable",
    modalTitle: "Track shipment is not available yet.",
    modalMessage:
      "We are still working on the public tracking flow. Please try again later.",
    modalPrimaryLabel: "Close",
    modalSecondaryLabel: "Contact us",
    modalSecondaryTo: "/contact",
    dismissible: true,
  },
};

export const FEATURE_PAGE_DECORATION = {
  primaryIcon: FiArrowLeft,
  secondaryIcon: FiMapPin,
};
