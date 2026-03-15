import { useState, useEffect } from "react";
import Header from "../components/Header";
import calculator from "../assets/calculator.png";
import Footer from "../components/Footer";
import apiClient from "../api/apiConfig";

const INPUT_CLASS =
  "w-full px-4 py-3 bg-transparent border border-[color:var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] text-[color:var(--text)]";

const ShipmentCalculator = () => {
  const [formData, setFormData] = useState({
    shipmentType: "air",
    weightKg: "",
    lengthCm: "",
    widthCm: "",
    heightCm: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rates, setRates] = useState(null);

  // Fetch rates on mount
  useEffect(() => {
    apiClient
      .get("/api/v1/public/calculator/rates")
      .then((res) => setRates(res.data.data))
      .catch(() => {});
  }, []);

  // Auto-revert from results back to form after 5 seconds
  useEffect(() => {
    if (!result) return;
    const timer = setTimeout(() => {
      setResult(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [result]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    const { shipmentType, weightKg, lengthCm, widthCm, heightCm } = formData;
    if (!weightKg || !lengthCm || !widthCm || !heightCm) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post(
        "/api/v1/public/calculator/estimate",
        {
          shipmentType,
          weightKg: Number(weightKg),
          lengthCm: Number(lengthCm),
          widthCm: Number(widthCm),
          heightCm: Number(heightCm),
        }
      );
      setResult(response.data.data);
    } catch {
      setError("Unable to get an estimate right now. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const isAir = formData.shipmentType === "air";

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-32 lg:pt-28 px-4 sm:px-8 lg:px-16 pb-12">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Form Section */}
          <div className="w-full lg:w-1/2 lg:order-2">
            <div>
              <h4 className="text-[color:var(--accent)] text-[30px] font-bold max-md:text-3xl max-sm:text-2xl">
                Shipment Cost Estimator
              </h4>
              <p className="text-[color:var(--text-muted)] mt-2 max-lg:w-full">
                Get an instant estimate for your shipment. Enter your package
                dimensions and weight below.
              </p>
            </div>

            {result ? (
              /* Results Card — replaces form, reverts after 30s */
              <div className="mt-12 max-sm:mt-8 border border-[color:var(--border)] rounded-lg p-6 max-sm:p-4">
                <h5 className="text-lg font-bold text-[color:var(--text)] mb-4">
                  Your Estimate
                </h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[color:var(--text-muted)]">
                      Estimated Cost
                    </span>
                    <span className="text-2xl font-bold text-[color:var(--accent)]">
                      ${result.estimatedCostUsd?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[color:var(--text-muted)]">
                      Departure Frequency
                    </span>
                    <span className="font-semibold text-[color:var(--text)]">
                      {result.departureFrequency}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[color:var(--text-muted)]">
                      Estimated Transit
                    </span>
                    <span className="font-semibold text-[color:var(--text)]">
                      {result.estimatedTransitDays} days
                    </span>
                  </div>
                </div>
                {result.disclaimer && (
                  <p className="text-xs text-[color:var(--text-muted)] mt-4 pt-4 border-t border-[color:var(--border)]">
                    {result.disclaimer}
                  </p>
                )}
                <div className="flex justify-center pt-6">
                  <button
                    type="button"
                    onClick={() => setResult(null)}
                    className="w-[60%] max-sm:w-[80%] bg-[color:var(--accent)] text-white font-semibold py-3 rounded-md hover:bg-[color:var(--accent-hover)] transition-colors"
                  >
                    Calculate Again
                  </button>
                </div>
              </div>
            ) : (
              <form className="mt-12 max-sm:mt-8" onSubmit={handleSubmit}>
                {/* Shipment Type Toggle */}
                <div className="mb-8">
                  <label className="block text-sm font-medium mb-3 text-[color:var(--text)]">
                    Shipment Type<span className="text-red-700">*</span>
                  </label>
                  <div className="flex gap-0 w-fit rounded-lg overflow-hidden border border-[color:var(--border)]">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          shipmentType: "air",
                        }))
                      }
                      className={`px-8 py-2.5 font-semibold text-sm transition-colors ${
                        isAir
                          ? "bg-[color:var(--accent)] text-white"
                          : "bg-transparent text-[color:var(--text)]"
                      }`}
                    >
                      Air
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          shipmentType: "ocean",
                        }))
                      }
                      className={`px-8 py-2.5 font-semibold text-sm transition-colors ${
                        !isAir
                          ? "bg-[color:var(--accent)] text-white"
                          : "bg-transparent text-[color:var(--text)]"
                      }`}
                    >
                      Ocean
                    </button>
                  </div>
                </div>

                {/* Weight and Length - Two columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-sm:gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                      Weight (kg)<span className="text-red-700">*</span>
                    </label>
                    <input
                      type="number"
                      name="weightKg"
                      value={formData.weightKg}
                      onChange={handleChange}
                      placeholder="Enter weight in kg"
                      className={INPUT_CLASS}
                      min="0"
                      step="any"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                      Length (cm)<span className="text-red-700">*</span>
                    </label>
                    <input
                      type="number"
                      name="lengthCm"
                      value={formData.lengthCm}
                      onChange={handleChange}
                      placeholder="Enter length in cm"
                      className={INPUT_CLASS}
                      min="0"
                      step="any"
                    />
                  </div>
                </div>

                {/* Width and Height - Two columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-sm:gap-4 max-sm:mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                      Width (cm)<span className="text-red-700">*</span>
                    </label>
                    <input
                      type="number"
                      name="widthCm"
                      value={formData.widthCm}
                      onChange={handleChange}
                      placeholder="Enter width in cm"
                      className={INPUT_CLASS}
                      min="0"
                      step="any"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
                      Height (cm)<span className="text-red-700">*</span>
                    </label>
                    <input
                      type="number"
                      name="heightCm"
                      value={formData.heightCm}
                      onChange={handleChange}
                      placeholder="Enter height in cm"
                      className={INPUT_CLASS}
                      min="0"
                      step="any"
                    />
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <p className="text-red-600 text-sm mt-4">{error}</p>
                )}

                {/* Submit Button */}
                <div className="flex justify-center pt-10 max-sm:pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-[60%] max-sm:w-[80%] bg-[color:var(--accent)] text-white font-semibold py-3 rounded-md hover:bg-[color:var(--accent-hover)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Calculating..." : "Get Estimate"}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Image + Rates Section */}
          <div className="w-full lg:w-1/2 lg:order-1">
            <img
              src={calculator}
              alt="Shipment calculator"
              className="w-full max-h-[500px] object-contain object-top"
            />

            {rates && (
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Air Freight Rates */}
                <div className="border border-[color:var(--border)] rounded-lg p-5">
                  <h5 className="text-base font-bold text-[color:var(--accent)] mb-1">
                    Air Freight Rates
                  </h5>
                  <p className="text-xs text-[color:var(--text-muted)] mb-4">
                    {rates.air.unit}
                  </p>
                  <div className="space-y-2">
                    {rates.air.tiers.map((tier, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center text-sm"
                      >
                        <span className="text-[color:var(--text-muted)]">
                          {tier.maxKg
                            ? `${tier.minKg} – ${tier.maxKg} kg`
                            : `${tier.minKg}+ kg`}
                        </span>
                        <span className="font-semibold text-[color:var(--text)]">
                          ${tier.rateUsdPerKg.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sea Freight Rate */}
                <div className="border border-[color:var(--border)] rounded-lg p-5 flex flex-col">
                  <h5 className="text-base font-bold text-[color:var(--accent)] mb-1">
                    Sea Freight Rate
                  </h5>
                  <p className="text-xs text-[color:var(--text-muted)] mb-4">
                    {rates.sea.unit}
                  </p>
                  <div className="flex-1 flex items-center justify-center">
                    <span className="text-3xl font-bold text-[color:var(--text)]">
                      ${rates.sea.flatRateUsdPerCbm.toLocaleString("en-US")}
                      <span className="text-sm font-normal text-[color:var(--text-muted)]">
                        {" "}/ CBM
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShipmentCalculator;
