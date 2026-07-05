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
    <div className="px-8 md:px-16 text-[color:var(--text)] pt-32 flex justify-between gap-8 max-lg:flex-col max-md:pt-24 max-sm:pt-16 max-sm:px-4 max-sm:gap-6">
      <div className="w-[50%] max-lg:w-full">
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
                className="w-full max-w-[90%] px-4 py-4 border border-[color:var(--border)] bg-transparent rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent outline-none max-md:max-w-full text-[color:var(--text)] max-lg:w-full max-sm:py-3 max-sm:text-sm"
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
                className="w-full max-w-[90%] px-4 py-4 border border-[color:var(--border)] bg-transparent rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent outline-none max-md:max-w-full placeholder:text-gray-400 max-lg:w-full max-sm:py-3 max-sm:text-sm"
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
                className="w-full max-w-[90%] px-4 py-4 border border-[color:var(--border)] bg-transparent rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent outline-none max-md:max-w-full placeholder:text-gray-400 max-lg:w-full max-sm:py-3 max-sm:text-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full max-w-[90%] bg-[#FF6600] text-white font-medium py-3 px-4 rounded-lg hover:bg-[#e55a00] transition-colors duration-200 max-md:max-w-full max-sm:text-sm disabled:opacity-60"
            >
              {loading ? "Calculating…" : "Check Cost"}
            </button>
          </form>

          {error && (
            <div className="mt-4 max-w-[90%] rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 max-md:max-w-full">
              {error}
            </div>
          )}

          {result && (
            <div className="mt-6 max-w-[90%] rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 space-y-3 max-md:max-w-full max-sm:text-sm">
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
      <div className="w-[40%] max-lg:w-full max-lg:flex max-lg:justify-center">
        <img
          src={calculate}
          alt=""
          loading="lazy"
          className="w-full h-auto max-lg:max-w-md max-sm:max-w-sm"
        />
      </div>
    </div>
  );
};

export default Quote;
