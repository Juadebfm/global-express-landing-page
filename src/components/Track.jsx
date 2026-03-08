import React, { useState } from "react";
import horizontal from "../assets/horizontal.png";
import track from "../assets/track.png";
import apiClient from "../api/apiConfig";

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

    setError("");
    setResult(null);
    setLoading(true);

    try {
      const response = await apiClient.get(`/api/v1/orders/track/${encodeURIComponent(trimmed)}`);
      setResult(response.data.data || response.data);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || "Shipment not found. Please check your tracking number and try again.";
      setError(msg);
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
              <p className="text-sm max-sm:text-xs">Track Shipment</p>
            </div>
            <h4 className="text-[40px] font-bold max-md:text-3xl max-sm:text-2xl">
              WHERE IS YOUR CARGO?
            </h4>
          </div>
          <p className="mt-4 w-[80%] max-lg:w-full max-sm:text-sm">
            Get real-time updates on your shipment's journey from our hubs in
            Seoul and Guangzhou to its destination.
          </p>
          <form onSubmit={handleTrack} className="mt-8 max-sm:mt-6">
            <label className="text-[13px] max-sm:text-xs">
              Enter your Tracking Number
            </label>
            <div className="mt-2 flex max-sm:flex-col max-sm:gap-2">
              <input
                className="px-4 py-3 w-[60%] border border-[color:var(--border)] bg-transparent rounded-l-lg placeholder:text-gray-400 text-[12px] max-sm:w-full max-sm:rounded-lg max-sm:text-xs"
                type="text"
                placeholder="e.g., GEX-20260307-164E284A"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[color:var(--accent)] text-[color:var(--accent-contrast)] px-4 py-3 rounded-r-lg max-sm:rounded-lg max-sm:text-sm max-sm:py-3 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Tracking..." : "Track Shipment"}
              </button>
            </div>
          </form>

          {error && (
            <p className="mt-4 text-red-500 text-sm">{error}</p>
          )}

          {result && (
            <div className="mt-6 border border-[color:var(--border)] rounded-lg p-5 max-sm:p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h5 className="font-bold text-lg">Shipment Status</h5>
                <span className="bg-[color:var(--accent)] text-[color:var(--accent-contrast)] text-xs font-semibold px-3 py-1 rounded-full uppercase">
                  {result.status}
                </span>
              </div>

              {result.trackingNumber && (
                <div className="flex justify-between text-sm">
                  <span className="text-[color:var(--text-muted)]">Tracking Number</span>
                  <span className="font-semibold">{result.trackingNumber}</span>
                </div>
              )}

              {result.origin && (
                <div className="flex justify-between text-sm">
                  <span className="text-[color:var(--text-muted)]">Origin</span>
                  <span className="font-semibold">{result.origin}</span>
                </div>
              )}

              {result.destination && (
                <div className="flex justify-between text-sm">
                  <span className="text-[color:var(--text-muted)]">Destination</span>
                  <span className="font-semibold">{result.destination}</span>
                </div>
              )}

              {result.lastLocation && (
                <div className="flex justify-between text-sm">
                  <span className="text-[color:var(--text-muted)]">Last Location</span>
                  <span className="font-semibold">{result.lastLocation}</span>
                </div>
              )}

              {result.timeline && result.timeline.length > 0 && (
                <div className="mt-4 pt-4 border-t border-[color:var(--border)]">
                  <h6 className="font-bold text-sm mb-3">Timeline</h6>
                  <div className="space-y-3">
                    {result.timeline.map((event, i) => (
                      <div key={i} className="flex gap-3 text-sm">
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full flex-shrink-0 ${i === 0 ? "bg-[color:var(--accent)]" : "bg-[color:var(--border)]"}`} />
                          {i < result.timeline.length - 1 && (
                            <div className="w-px flex-1 bg-[color:var(--border)] mt-1" />
                          )}
                        </div>
                        <div className="pb-3">
                          <p className="font-semibold">{event.status || event.title}</p>
                          {event.location && <p className="text-[color:var(--text-muted)] text-xs">{event.location}</p>}
                          {event.date && <p className="text-[color:var(--text-muted)] text-xs">{new Date(event.date).toLocaleString()}</p>}
                          {event.timestamp && <p className="text-[color:var(--text-muted)] text-xs">{new Date(event.timestamp).toLocaleString()}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => { setResult(null); setTrackingNumber(""); }}
                className="w-full mt-2 text-sm text-[color:var(--accent)] hover:underline"
              >
                Track another shipment
              </button>
            </div>
          )}
        </div>
        <div className="flex-1 max-lg:w-full">
          <img src={track} alt="Track your shipment" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default TrackYourShipments;
