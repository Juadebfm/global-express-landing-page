import { useEffect, useMemo, useState } from "react";
import FeatureAccessModal from "../components/FeatureAccessModal";
import { FEATURE_ACCESS_CONTENT } from "../constants/featureAccess";
import FeatureAccessContext from "./feature-access-context";

export const FeatureAccessProvider = ({ children }) => {
  const [activeFeature, setActiveFeature] = useState(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = activeFeature ? "hidden" : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeFeature]);

  const value = useMemo(
    () => ({
      openFeatureModal: (feature) => setActiveFeature(feature),
      closeFeatureModal: () => setActiveFeature(null),
      getFeatureContent: (feature) => FEATURE_ACCESS_CONTENT[feature] || null,
    }),
    []
  );

  const activeContent = activeFeature ? FEATURE_ACCESS_CONTENT[activeFeature] : null;

  return (
    <FeatureAccessContext.Provider value={value}>
      {children}
      <FeatureAccessModal
        content={activeContent}
        onClose={() => {
          if (activeContent?.dismissible) {
            setActiveFeature(null);
          }
        }}
      />
    </FeatureAccessContext.Provider>
  );
};
