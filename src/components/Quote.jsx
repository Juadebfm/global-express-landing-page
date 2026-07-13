import React, { useState } from "react";
import calculate from "../assets/calculate.png";
import { publicApi } from "../api/publicApi";
import { getUserFacingApiError } from "../api/errorUtils";

const Quote = () => {
  const [formData, setFormData] = useState({
    logisticType: "",
    weight: "",
    commodityType: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setResult(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const weightKg = parseFloat(formData.weight);
      const response = await publicApi.estimateShipment({
        shipmentType: formData.logisticType,
        ...(Number.isFinite(weightKg) ? { weightKg } : {}),
      });
      setResult(response.data);
    } catch (err) {
      setError(getUserFacingApiError(err, "Failed to estimate. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell pt-32 text-[color:var(--text)] max-md:pt-24 max-sm:pt-16">
      <div className="page-frame flex justify-between gap-8 max-lg:flex-col max-sm:gap-6">
        <div className="flex-1 max-w-2xl max-lg:max-w-full">
          <div className="mb-8 max-sm:mb-6">
            <h1 className="text-[color:var(--accent)] text-[40px] font-bold max-md:text-3xl max-sm:text-2xl">
              Shipping Calculator
            </h1>
            <p className="max-sm:text-sm">
              Get a quick quote for your item with an estimated cost.
            </p>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6 max-sm:space-y-4">
            {/* Logistic Type */}
            <div>
              <label
                htmlFor="logisticType"
                className="block text-sm font-medium mb-2 max-sm:text-xs"
              >
                Logistic Type <span className="text-red-500">*</span>
              </label>
              <select
                id="logisticType"
                name="logisticType"
                value={formData.logisticType}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-[color:var(--border)] bg-transparent px-4 py-4 text-[color:var(--text)] outline-none focus:border-transparent focus:ring-2 focus:ring-[#FF6600] max-sm:py-3 max-sm:text-sm"
                style={{
                  colorScheme: "auto",
                }}
              >
                <option value="" style={{ backgroundColor: "var(--surface)" }}>
                  Select logistic type
                </option>
                <option value="air" style={{ backgroundColor: "var(--surface)" }}>
                  Air
                </option>
                <option value="sea" style={{ backgroundColor: "var(--surface)" }}>
                  Sea
                </option>
                <option value="land" style={{ backgroundColor: "var(--surface)" }}>
                  Land
                </option>
              </select>
            </div>

            {/* Weight */}
            <div>
              <label
                htmlFor="weight"
                className="block text-sm font-medium mb-2 max-sm:text-xs"
              >
                Weight (Kg) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="20kg"
                required
                className="w-full rounded-lg border border-[color:var(--border)] bg-transparent px-4 py-4 outline-none placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-[#FF6600] max-sm:py-3 max-sm:text-sm"
              />
            </div>

            {/* Commodity Type */}
            <div>
              <label
                htmlFor="commodityType"
                className="block text-sm font-medium mb-2 max-sm:text-xs"
              >
                Commodity Type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="commodityType"
                name="commodityType"
                value={formData.commodityType}
                onChange={handleChange}
                placeholder="e.g General goods"
                required
                className="w-full rounded-lg border border-[color:var(--border)] bg-transparent px-4 py-4 outline-none placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-[#FF6600] max-sm:py-3 max-sm:text-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#FF6600] px-4 py-3 font-medium text-white transition-colors duration-200 hover:bg-[#e55a00] max-sm:text-sm disabled:opacity-60"
            >
              {loading ? "Calculating…" : "Check Cost"}
            </button>
          </form>

            {error && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {result && (
              <div className="mt-6 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 space-y-3 max-sm:text-sm">
                <h3 className="font-semibold text-[color:var(--text)]">Estimate</h3>
                {result.estimatedCostUsd != null ? (
                  <p className="text-2xl font-bold text-[#FF6600] max-sm:text-xl">
                    ~${result.estimatedCostUsd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                  </p>
                ) : (
                  <p className="text-sm text-[color:var(--text-muted)]">
                    {result.intake?.description ?? result.d2dIntake?.description ?? "Contact us for a tailored quote."}
                  </p>
                )}
                <div className="grid grid-cols-2 gap-2 text-sm text-[color:var(--text-muted)]">
                  {result.estimatedTransitDays != null && (
                    <span>Transit: ~{result.estimatedTransitDays} days</span>
                  )}
                  {result.departureFrequency && (
                    <span>Departures: {result.departureFrequency}</span>
                  )}
                </div>
                {result.disclaimer && (
                  <p className="text-xs text-[color:var(--text-muted)] border-t border-[color:var(--border)] pt-3">
                    {result.disclaimer}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="w-full max-w-xl max-lg:flex max-lg:justify-center">
          <img
            src={calculate}
            alt=""
            loading="lazy"
            className="h-auto w-full max-lg:max-w-md max-sm:max-w-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default Quote;
