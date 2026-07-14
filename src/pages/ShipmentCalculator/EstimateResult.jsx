import { createElement } from "react";
import {
  LuPlaneTakeoff,
  LuShip,
  LuClock,
  LuZap,
  LuAnchor,
  LuFileText,
  LuClipboard,
  LuInfo,
} from "react-icons/lu";
import { DASHBOARD_URL } from "../../constants/siteData";

function deriveLineItems(mode, total) {
  if (!total || !mode) return [];
  const t = Math.round(total);
  if (mode === "AIR") {
    const base = Math.round(t * 0.85);
    const fuel = Math.round(t * 0.12);
    const customs = t - base - fuel;
    return [
      { Icon: LuPlaneTakeoff, label: "Base air freight", amount: base },
      { Icon: LuZap, label: "Fuel & handling", amount: fuel },
      { Icon: LuFileText, label: "Customs clearance", amount: customs },
    ];
  }
  if (mode === "SEA") {
    const ocean = Math.round(t * 0.79);
    const port = Math.round(t * 0.17);
    const customs = t - ocean - port;
    return [
      { Icon: LuAnchor, label: "Ocean freight (LCL)", amount: ocean },
      { Icon: LuClipboard, label: "Port & documentation", amount: port },
      { Icon: LuFileText, label: "Customs clearance", amount: customs },
    ];
  }
  return [];
}

const MODE_CONFIG = {
  AIR: {
    label: "Air freight",
    Icon: LuPlaneTakeoff,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    badge: null,
    tags: ["Customs included", "Live tracking", "Insured"],
    disclaimer: "Estimate only — final price confirmed at pickup.",
  },
  SEA: {
    label: "Sea freight",
    Icon: LuShip,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-500",
    badge: "LCL",
    tags: ["Customs included", "Live tracking", "Insured"],
    disclaimer: "Estimate only — final price confirmed at port intake.",
  },
};

const EstimateResult = ({ result, onReset }) => {
  const dashboardSignInUrl = `${DASHBOARD_URL.replace(/\/$/, "")}/sign-in`;
  const mode = result?.mode;
  const total = result?.estimatedCostUsd;
  const ngnTotal = result?.estimatedCostNgn;
  const transitDays = result?.estimatedTransitDays;
  const calculation = result?.estimateDetails?.calculation;
  const chargeableKg = calculation?.chargeableWeightKg;
  const cbmUsed = calculation?.cbmUsed;

  const config = MODE_CONFIG[mode] || null;
  const lineItems = deriveLineItems(mode, total);

  const totalRounded = total != null ? Math.round(total) : null;
  const ngnRounded = ngnTotal != null ? Math.round(ngnTotal) : null;

  let subtitle = null;
  if (mode === "AIR" && chargeableKg != null) {
    subtitle = `Based on ${Math.round(chargeableKg).toLocaleString("en-US")} kg chargeable weight`;
  } else if (mode === "SEA" && cbmUsed != null) {
    subtitle = `Based on ${Number(cbmUsed).toFixed(1)} CBM volume`;
  }

  let transitLabel = null;
  if (transitDays != null) {
    transitLabel = transitDays <= 30
      ? `~${transitDays} business days`
      : `~${transitDays} days`;
  }

  return (
    <div className="mt-10 max-sm:mt-8">
      {/* Card */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: "1px solid rgba(35,35,35,0.15)", background: "var(--surface)" }}
      >
        {/* Header */}
        <div
          className="flex items-start justify-between p-5"
          style={{ background: "var(--surface-2)" }}
        >
          <div className="flex gap-3 items-start">
            {config && (
              <div className={`rounded-lg p-2 flex-shrink-0 ${config.iconBg}`}>
                <config.Icon size={18} className={config.iconColor} />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-[color:var(--text)] text-[15px] leading-tight">
                  {config?.label ?? "Freight Estimate"}
                </span>
                {config?.badge && (
                  <span
                    className="text-[10px] font-semibold rounded px-1.5 py-0.5"
                    style={{
                      color: "var(--text-muted)",
                      border: "1px solid rgba(35,35,35,0.2)",
                    }}
                  >
                    {config.badge}
                  </span>
                )}
              </div>
              {subtitle && (
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {transitLabel && (
            <div
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium flex-shrink-0 ml-3"
              style={{ border: "1px solid #ff9933", color: "#cc5500" }}
            >
              <LuClock size={12} />
              <span>{transitLabel}</span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="text-center py-6 px-5">
          <p
            className="text-[10px] uppercase tracking-[0.14em] font-semibold mb-3"
            style={{ color: "var(--text-muted)" }}
          >
            Estimated Cost
          </p>
          <p className="leading-none" style={{ color: "var(--text)" }}>
            <span
              className="text-xl font-light mr-0.5 align-top mt-1 inline-block"
              style={{ color: "var(--text-muted)" }}
            >
              ≈
            </span>
            <span className="text-[46px] max-sm:text-[36px] font-black">
              {totalRounded != null ? `$${totalRounded.toLocaleString("en-US")}` : "—"}
            </span>
          </p>
          {ngnRounded != null && (
            <p className="mt-1 text-base font-semibold" style={{ color: "var(--text-muted)" }}>
              ≈ ₦{ngnRounded.toLocaleString("en-US")}
            </p>
          )}
        </div>

        {/* Line items */}
        {lineItems.length > 0 && (
          <div className="px-5 pb-5 space-y-3">
            {lineItems.map(({ Icon: LineItemIcon, label, amount }) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
                  {createElement(LineItemIcon, { size: 13 })}
                  <span className="text-sm">{label}</span>
                </div>
                <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
                  ${amount.toLocaleString("en-US")}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Divider + total */}
        {lineItems.length > 0 && totalRounded != null && (
          <>
            <div style={{ height: "1px", background: "rgba(35,35,35,0.1)", margin: "0 20px" }} />
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                Estimated total
              </span>
              <span className="text-lg font-bold" style={{ color: "var(--text)" }}>
                ${totalRounded.toLocaleString("en-US")}
              </span>
            </div>
          </>
        )}

        {/* Tags */}
        {config?.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center px-5 pb-4">
            {config.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1.5 text-xs rounded-full px-2.5 py-1"
                style={{
                  color: "var(--text-muted)",
                  background: "var(--surface-2)",
                  border: "1px solid rgba(35,35,35,0.12)",
                }}
              >
                <span className="text-green-500 font-bold text-[11px]">✓</span>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Disclaimer */}
        <div style={{ height: "1px", background: "rgba(35,35,35,0.1)", margin: "0 20px" }} />
        <div
          className="flex items-center justify-center gap-1.5 py-3 px-5 text-[11px]"
          style={{ color: "var(--text-muted)" }}
        >
          <LuInfo size={12} />
          <span>{config?.disclaimer ?? "Estimate only — final price confirmed at pickup."}</span>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col items-center gap-3 mt-5">
        <a
          href={dashboardSignInUrl}
          className="w-full font-semibold py-3.5 rounded-md transition-colors text-center"
          style={{
            background: "var(--accent)",
            color: "var(--accent-contrast)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}
        >
          Request a Shipment
        </a>
        <button
          type="button"
          onClick={onReset}
          className="text-sm underline underline-offset-2 transition-colors"
          style={{ color: "var(--text-muted)" }}
        >
          Start a new estimate
        </button>
      </div>
    </div>
  );
};

export default EstimateResult;
