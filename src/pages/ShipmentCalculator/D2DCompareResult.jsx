import { useState } from "react";
import {
  LuArrowRight,
  LuChevronDown,
  LuChevronUp,
  LuClock3,
  LuPlaneTakeoff,
  LuShip,
  LuWallet,
} from "react-icons/lu";
import { DASHBOARD_URL } from "../../constants/siteData";
import { formatCurrency, formatNumber } from "./utils";

const buildDashboardLink = (path, context) => {
  const url = new URL(path, `${DASHBOARD_URL.replace(/\/$/, "")}/`);
  url.searchParams.set("source", "landing-d2d-comparison");
  url.searchParams.set("d2dContext", JSON.stringify(context));
  return url.toString();
};

const RESULT_CONFIG = {
  air: {
    label: "D2D Air",
    Icon: LuPlaneTakeoff,
    accentClass: "text-orange-500",
    borderClass: "border-orange-200",
    bgClass: "bg-orange-50/70",
    benefit: "Fastest delivery",
    tradeoff: "Higher shipping cost, quicker arrival.",
  },
  ocean: {
    label: "D2D Ocean",
    Icon: LuShip,
    accentClass: "text-sky-500",
    borderClass: "border-sky-200",
    bgClass: "bg-sky-50/70",
    benefit: "Lowest shipping cost",
    tradeoff: "Slower delivery, better for saving money.",
  },
};

const compactCurrency = (value) => {
  if (value == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Number(value));
};

const resolveModeKey = (result, fallback) => {
  const rawMode = String(result?.mode || fallback || "").trim().toLowerCase();
  if (rawMode.includes("air")) return "air";
  if (rawMode.includes("sea") || rawMode.includes("ocean")) return "ocean";
  return fallback;
};

const resolveWinnerKey = (airUsd, oceanUsd) => {
  if (airUsd == null || oceanUsd == null || airUsd === oceanUsd) return null;
  return airUsd < oceanUsd ? "air" : "ocean";
};

const getBasisLabel = (modeKey, result) => {
  const chargeableKg = result?.estimateDetails?.calculation?.chargeableWeightKg ?? null;
  const cbmUsed = result?.estimateDetails?.calculation?.cbmUsed ?? null;

  if (modeKey === "air") {
    return chargeableKg != null ? `${formatNumber(chargeableKg)} kg` : "Air basis";
  }

  return cbmUsed != null ? `${formatNumber(cbmUsed)} CBM` : "Ocean basis";
};

const SummaryStat = ({ label, value, Icon }) => (
  <div className="rounded-xl bg-white/85 px-4 py-3">
    <p className="text-xs uppercase tracking-[0.12em] text-[color:var(--text-muted)]">
      {label}
    </p>
    <p className="mt-2 flex items-center gap-2 font-semibold text-[color:var(--text)]">
      {Icon ? <Icon size={15} /> : null}
      <span>{value}</span>
    </p>
  </div>
);

const AlternateOption = ({ modeKey, result }) => {
  const config = RESULT_CONFIG[modeKey];
  const transitDays = result?.estimatedTransitDays ?? null;

  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-[color:var(--surface-2)] p-3">
          <config.Icon size={18} className={config.accentClass} />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-[color:var(--text)]">{config.label}</p>
          <p className="mt-1 text-sm text-[color:var(--text-muted)]">
            {compactCurrency(result?.estimatedCostUsd)} and{" "}
            {transitDays != null ? `~${transitDays} days` : "custom transit"}.
          </p>
        </div>
      </div>
    </div>
  );
};

const D2DCompareResult = ({ comparisonResult, onReset }) => {
  const [showAlternative, setShowAlternative] = useState(false);

  const { airResult, oceanResult, context } = comparisonResult;
  const airUsd = airResult?.estimatedCostUsd ?? null;
  const oceanUsd = oceanResult?.estimatedCostUsd ?? null;
  const winnerKey = resolveWinnerKey(airUsd, oceanUsd);
  const fasterMode =
    (airResult?.estimatedTransitDays ?? Infinity) <
    (oceanResult?.estimatedTransitDays ?? Infinity)
      ? "air"
      : "ocean";

  const resolvedAirModeKey = resolveModeKey(airResult, "air");
  const primaryKey = winnerKey || "ocean";
  const secondaryKey = primaryKey === "air" ? "ocean" : "air";
  const primaryResult = primaryKey === resolvedAirModeKey ? airResult : oceanResult;
  const secondaryResult = secondaryKey === resolvedAirModeKey ? airResult : oceanResult;
  const primaryConfig = RESULT_CONFIG[primaryKey];
  const priceDifference =
    airUsd != null && oceanUsd != null ? Math.abs(airUsd - oceanUsd) : null;

  const signInUrl = buildDashboardLink("/sign-in", context);
  const signUpUrl = buildDashboardLink("/sign-up", context);

  return (
    <div className="mt-10 space-y-6">
      <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
          D2D Recommendation
        </p>
        <h5 className="mt-2 text-2xl font-bold text-[color:var(--text)]">
          Recommended option: {primaryConfig.label}
        </h5>
        <p className="mt-2 text-sm text-[color:var(--text-muted)]">
          {winnerKey
            ? `${primaryConfig.benefit} for this shipment.`
            : "Both options are close, but this is the simpler default choice."}
        </p>

        <div className={`mt-5 rounded-2xl border p-5 ${primaryConfig.borderClass} ${primaryConfig.bgClass}`}>
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <primaryConfig.Icon size={18} className={primaryConfig.accentClass} />
            </div>
            <div>
              <p className="font-semibold text-[color:var(--text)]">
                {primaryConfig.benefit}
              </p>
              <p className="mt-1 text-sm text-[color:var(--text-muted)]">
                {primaryConfig.tradeoff}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs uppercase tracking-[0.12em] text-[color:var(--text-muted)]">
              Estimated total
            </p>
            <p className="mt-2 text-4xl font-black text-[color:var(--text)]">
              {compactCurrency(primaryResult?.estimatedCostUsd)}
            </p>
            <p className="mt-1 text-sm text-[color:var(--text-muted)]">
              {formatCurrency(Math.round(Number(primaryResult?.estimatedCostUsd || 0)))}
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
            <SummaryStat
              label="Transit"
              value={
                primaryResult?.estimatedTransitDays != null
                  ? `~${primaryResult.estimatedTransitDays} days`
                  : "Custom"
              }
              Icon={LuClock3}
            />
            <SummaryStat
              label="Basis"
              value={getBasisLabel(primaryKey, primaryResult)}
            />
            <SummaryStat
              label="Savings"
              value={
                winnerKey && priceDifference != null
                  ? `About ${compactCurrency(priceDifference)} cheaper`
                  : "Price is similar"
              }
              Icon={LuWallet}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowAlternative((prev) => !prev)}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--text)]"
        >
          {showAlternative ? "Hide other option" : `See ${RESULT_CONFIG[secondaryKey].label} instead`}
          {showAlternative ? <LuChevronUp size={16} /> : <LuChevronDown size={16} />}
        </button>

        {showAlternative && (
          <div className="mt-4">
            <AlternateOption modeKey={secondaryKey} result={secondaryResult} />
          </div>
        )}

        <p className="mt-5 text-sm text-[color:var(--text-muted)]">
          Fastest option:{" "}
          <span className="font-semibold text-[color:var(--text)]">
            {fasterMode === "air" ? "D2D Air" : "D2D Ocean"}
          </span>
        </p>
      </div>

      <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
        <h6 className="text-lg font-bold text-[color:var(--text)]">
          Continue in the customer dashboard
        </h6>
        <p className="mt-2 text-sm text-[color:var(--text-muted)]">
          Sign in if you already have an account, or create one to continue.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          <a
            href={signInUrl}
            className="flex items-center justify-center gap-2 rounded-xl bg-[color:var(--accent)] px-4 py-3.5 text-center font-semibold text-white transition-colors hover:bg-[color:var(--accent-hover)]"
          >
            Sign in to continue
            <LuArrowRight size={16} />
          </a>
          <a
            href={signUpUrl}
            className="flex items-center justify-center gap-2 rounded-xl border border-[color:var(--border)] px-4 py-3.5 text-center font-semibold text-[color:var(--text)] transition-colors hover:bg-[color:var(--surface-2)]"
          >
            Create account to continue
            <LuArrowRight size={16} />
          </a>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="mt-4 text-sm underline underline-offset-2 text-[color:var(--text-muted)]"
        >
          Start a new comparison
        </button>
      </div>
    </div>
  );
};

export default D2DCompareResult;
