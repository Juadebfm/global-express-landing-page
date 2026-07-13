import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useFeatureAccess } from "../hooks/useFeatureAccess";
import {
  FEATURE_ACCESS_CONTENT,
  FEATURE_PAGE_DECORATION,
} from "../constants/featureAccess";

const UnavailableFeaturePage = ({ feature }) => {
  const { openFeatureModal } = useFeatureAccess();
  const content = FEATURE_ACCESS_CONTENT[feature];

  if (!content) return null;

  const BadgeIcon = content.badgeIcon || content.icon;
  const PrimaryIcon = FEATURE_PAGE_DECORATION.primaryIcon;
  const SecondaryIcon = FEATURE_PAGE_DECORATION.secondaryIcon;

  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
      <Header />

      <main className="page-shell pt-24 pb-0 lg:pt-20 max-sm:pt-16">
        <section className="min-h-[68vh] flex items-center justify-center py-10">
          <div className="relative page-frame-wide overflow-hidden rounded-[32px] border border-[color:var(--border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(247,241,236,0.92))] p-8 shadow-[0_28px_90px_rgba(15,23,42,0.12)] sm:p-10 lg:p-14">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.18),transparent_55%)] pointer-events-none" />
            <div className="relative max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">
                <BadgeIcon className="text-sm" />
                {content.badgeLabel}
              </p>
              <h1 className="mt-6 text-4xl font-bold leading-tight text-[color:var(--text)] sm:text-5xl">
                {content.pageTitle}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-[color:var(--text-muted)] sm:text-lg">
                {content.pageMessage}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to={content.pagePrimaryTo}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[color:var(--accent)] px-6 py-3 font-semibold text-[color:var(--accent-contrast)] transition-colors hover:bg-[color:var(--accent-hover)]"
                >
                  <PrimaryIcon className="text-base" />
                  {content.pagePrimaryLabel}
                </Link>
                <Link
                  to={content.pageSecondaryTo}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[color:var(--border)] bg-white/70 px-6 py-3 font-semibold text-[color:var(--text)] transition-colors hover:bg-white"
                >
                  <SecondaryIcon className="text-base" />
                  {content.pageSecondaryLabel}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer
        topSpacingClass="mt-0"
        onTrackShipmentClick={() => openFeatureModal("track")}
      />
    </div>
  );
};

export default UnavailableFeaturePage;
