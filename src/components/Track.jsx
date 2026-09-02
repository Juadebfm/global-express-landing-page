import React, { useState } from "react";
import horizontal from "../assets/horizontal.png";
import { publicApi } from "../api/publicApi";
import { getUserFacingApiError } from "../api/errorUtils";
import { DASHBOARD_URL } from "../constants/siteData";

const trackImage =
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80";

const formatStatus = (value) => {
  if (!value || typeof value !== "string") return "Unknown";
  return value
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

const formatDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
};

const TrackYourShipments = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dashboardSignInUrl = `${DASHBOARD_URL.replace(/\/$/, "")}/sign-in`;

  const handleTrack = async (e) => {
    e.preventDefault();
    const normalized = trackingNumber.trim().toUpperCase();
    if (!normalized) {
      setError("Please enter a tracking number.");
      return;
    }
    if (/^(AIR|SEA)-/.test(normalized)) {
      setError("Master tracking references are internal and cannot be tracked on the public page.");
      return;
    }

    setError("");
    setResult(null);
    setLoading(true);

    try {
      const response = await publicApi.trackShipment(normalized);
      setResult(response?.data || response);
    } catch (err) {
      if (err.response?.status === 404) {
        setError("Shipment not found");
      } else {
        const msg = getUserFacingApiError(
          err,
          "Shipment not found. Please check your tracking number and try again."
        );
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell pt-24 text-[color:var(--text)] max-lg:pt-20 max-sm:pt-16">
      <div className="page-frame">
        <div className="flex items-center justify-between gap-16 max-lg:flex-col max-lg:gap-10 max-sm:gap-8">
        <div className="flex-1 max-lg:w-full">
          <div className="max-md:w-full">
            <div className="flex items-center gap-2">
              <img
                src={horizontal}
                alt="horizontal line"
                className="max-sm:w-8"
              />
              <p className="text-sm font-semibold text-[color:var(--accent)] uppercase tracking-wide max-sm:text-xs">
                Track Shipment
              </p>
            </div>
            <h4 className="text-[32px] font-bold leading-tight max-md:text-[28px] max-sm:text-[24px]">
              WHERE IS YOUR CARGO?
            </h4>
          </div>
          <p className="mt-4 max-w-2xl text-[17px] text-[color:var(--text-muted)] max-sm:text-[15px]">
            Get real-time updates on your shipment's journey from our hubs in
            Seoul and Guangzhou to its destination.
          </p>
          <form onSubmit={handleTrack} className="mt-8 max-w-2xl max-sm:mt-6">
            <label htmlFor="tracking-number" className="text-[13px] max-sm:text-xs">
              Enter your Tracking Number
            </label>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <input
                id="tracking-number"
                className="min-w-0 flex-1 rounded-lg border border-[color:var(--border)] bg-transparent px-4 py-3 text-[12px] placeholder:text-gray-400 max-sm:text-xs sm:rounded-r-none"
                type="text"
                placeholder="e.g., 20260902-AB12"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-[color:var(--accent)] px-4 py-3 text-[color:var(--accent-contrast)] max-sm:text-sm disabled:cursor-not-allowed disabled:opacity-60 sm:shrink-0 sm:rounded-l-none"
              >
                {loading ? "Tracking..." : "Track Shipment"}
              </button>
            </div>
          </form>

          {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}

          {result && (
            <div className="mt-6 border border-[color:var(--border)] rounded-lg p-5 max-sm:p-4 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h5 className="font-bold text-lg">Shipment Status</h5>
                <span className="bg-[color:var(--accent)] text-[color:var(--accent-contrast)] text-xs font-semibold px-3 py-1 rounded-full uppercase text-right">
                  {result.statusLabel || formatStatus(result.status)}
                </span>
              </div>

              {result.trackingNumber && (
                <div className="flex justify-between text-sm gap-3">
                  <span className="text-[color:var(--text-muted)]">Tracking Number</span>
                  <span className="font-semibold text-right">{result.trackingNumber}</span>
                </div>
              )}

              {result.lastLocation && (
                <div className="flex justify-between text-sm gap-3">
                  <span className="text-[color:var(--text-muted)]">Last Location</span>
                  <span className="font-semibold text-right">{result.lastLocation}</span>
                </div>
              )}

              {result.lastUpdate && (
                <div className="flex justify-between text-sm gap-3">
                  <span className="text-[color:var(--text-muted)]">Last Update</span>
                  <span className="font-semibold text-right">{result.lastUpdate}</span>
                </div>
              )}

              {result.timeline && result.timeline.length > 0 && (
                <div className="mt-4 pt-4 border-t border-[color:var(--border)]">
                  <h6 className="font-bold text-sm mb-3">Timeline</h6>
                  <div className="space-y-3">
                    {result.timeline.map((event, i) => (
                      <div key={i} className="flex gap-3 text-sm">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-3 h-3 rounded-full flex-shrink-0 ${
                              i < result.timeline.length - 1
                                ? "bg-[color:var(--accent)]"
                                : "bg-[color:var(--border)]"
                            }`}
                          />
                          {i < result.timeline.length - 1 && (
                            <div className="w-px flex-1 bg-[color:var(--border)] mt-1" />
                          )}
                        </div>
                        <div className="pb-3">
                          <p className="font-semibold">
                            {event.statusLabel ||
                              formatStatus(event.status || event.title)}
                          </p>
                          {event.location && (
                            <p className="text-[color:var(--text-muted)] text-xs">
                              {event.location}
                            </p>
                          )}
                          {(event.timestamp || event.date) && (
                            <p className="text-[color:var(--text-muted)] text-xs">
                              {formatDate(event.timestamp || event.date)}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <a
                href={dashboardSignInUrl}
                className="block w-full rounded-lg border border-[color:var(--accent)] px-4 py-3 text-center text-sm font-semibold text-[color:var(--accent)] transition hover:bg-[color:var(--accent)] hover:text-[color:var(--accent-contrast)]"
              >
                For more information, sign in to your dashboard
              </a>

              <button
                type="button"
                onClick={() => {
                  setResult(null);
                  setTrackingNumber("");
                }}
                className="w-full mt-2 text-sm text-[color:var(--accent)] hover:underline"
              >
                Track another shipment
              </button>
            </div>
          )}
        </div>
        <div className="flex-1 max-lg:w-full">
          <img src={trackImage} alt="Track your shipment" className="w-full rounded-lg" />
        </div>
        </div>
      </div>
    </div>
  );
};

export default TrackYourShipments;
