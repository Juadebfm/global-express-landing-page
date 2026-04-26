import React, { useState } from "react";
import horizontal from "../assets/horizontal.png";
import { publicApi } from "../api/publicApi";

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

  const handleTrack = async (e) => {
    e.preventDefault();
    const trimmed = trackingNumber.trim();
    if (!trimmed) {
      setError("Please enter a tracking number.");
      return;
    }
    if (trimmed.toUpperCase().startsWith("GEX-MASTER-")) {
      setError("Master tracking references are internal and cannot be tracked on the public page.");
      return;
    }

    setError("");
    setResult(null);
    setLoading(true);

    try {
      const response = await publicApi.trackShipment(trimmed);
      setResult(response?.data || response);
    } catch (err) {
      const upper = trimmed.toUpperCase();
      if (err.response?.status === 404 && upper.startsWith("GEX-MASTER-")) {
        setError("Master tracking references are internal and cannot be tracked on the public page.");
      } else {
        const msg =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Shipment not found. Please check your tracking number and try again.";
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-8 md:px-16 text-[color:var(--text)] pt-32 max-sm:pt-20">
      <div className="flex items-center justify-between gap-16 max-lg:flex-col max-lg:gap-10">
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
            <h4 className="text-[32px] font-bold max-md:text-[28px] max-sm:text-[24px]">
              WHERE IS YOUR CARGO?
            </h4>
          </div>
          <p className="mt-4 text-[17px] text-[color:var(--text-muted)] w-[80%] max-lg:w-full max-sm:text-[15px]">
            Get real-time updates on your shipment's journey from our hubs in
            Seoul and Guangzhou to its destination.
          </p>
          <form onSubmit={handleTrack} className="mt-8 max-sm:mt-6">
            <label className="text-[13px] max-sm:text-xs">
              Enter your Tracking Number
            </label>
            <div className="mt-2 flex max-md:flex-col max-md:gap-2">
              <input
                className="px-4 py-3 w-[60%] border border-[color:var(--border)] bg-transparent rounded-l-lg placeholder:text-gray-400 text-[12px] max-md:w-full max-md:rounded-lg max-sm:text-xs"
                type="text"
                placeholder="e.g., GEX-20260307-164E284A"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[color:var(--accent)] text-[color:var(--accent-contrast)] px-4 py-3 rounded-r-lg max-md:rounded-lg max-md:w-full max-sm:text-sm disabled:opacity-60 disabled:cursor-not-allowed"
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

              {result.origin && (
                <div className="flex justify-between text-sm gap-3">
                  <span className="text-[color:var(--text-muted)]">Origin</span>
                  <span className="font-semibold text-right">{result.origin}</span>
                </div>
              )}

              {result.destination && (
                <div className="flex justify-between text-sm gap-3">
                  <span className="text-[color:var(--text-muted)]">Destination</span>
                  <span className="font-semibold text-right">{result.destination}</span>
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

              {result.estimatedDelivery && (
                <div className="flex justify-between text-sm gap-3">
                  <span className="text-[color:var(--text-muted)]">Estimated Delivery</span>
                  <span className="font-semibold text-right">{result.estimatedDelivery}</span>
                </div>
              )}

              {result.paymentStatus && (
                <div className="flex justify-between text-sm gap-3">
                  <span className="text-[color:var(--text-muted)]">Payment Status</span>
                  <span className="font-semibold text-right">
                    {formatStatus(result.paymentStatus)}
                  </span>
                </div>
              )}

              {result.shipmentCost && (
                <div className="pt-4 border-t border-[color:var(--border)] space-y-2">
                  <h6 className="font-bold text-sm">Shipment Cost</h6>
                  <div className="flex justify-between text-sm gap-3">
                    <span className="text-[color:var(--text-muted)]">USD</span>
                    <span className="font-semibold text-right">
                      ${result.shipmentCost.usd || "0.00"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm gap-3">
                    <span className="text-[color:var(--text-muted)]">NGN</span>
                    <span className="font-semibold text-right">
                      ₦{result.shipmentCost.ngn || "0.00"}
                    </span>
                  </div>
                  {result.shipmentCost.invoiceStatus && (
                    <div className="flex justify-between text-sm gap-3">
                      <span className="text-[color:var(--text-muted)]">Invoice</span>
                      <span className="font-semibold text-right">
                        {formatStatus(result.shipmentCost.invoiceStatus)}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {result.cargoMetrics && (
                <div className="pt-4 border-t border-[color:var(--border)] space-y-2">
                  <h6 className="font-bold text-sm">Cargo Metrics</h6>
                  <div className="flex justify-between text-sm gap-3">
                    <span className="text-[color:var(--text-muted)]">Packages</span>
                    <span className="font-semibold text-right">
                      {result.cargoMetrics.packageCount ?? 0}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm gap-3">
                    <span className="text-[color:var(--text-muted)]">Total Weight (kg)</span>
                    <span className="font-semibold text-right">
                      {result.cargoMetrics.totalWeightKg || "0.000"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm gap-3">
                    <span className="text-[color:var(--text-muted)]">Total CBM</span>
                    <span className="font-semibold text-right">
                      {result.cargoMetrics.totalCbm || "0.000000"}
                    </span>
                  </div>
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
  );
};

export default TrackYourShipments;
