import { useContext } from "react";
import FeatureAccessContext from "../contexts/feature-access-context";

export const useFeatureAccess = () => {
  const context = useContext(FeatureAccessContext);

  if (!context) {
    throw new Error("useFeatureAccess must be used within a FeatureAccessProvider.");
  }

  return context;
};
