import React, { useState } from "react";
import calculate from "../assets/calculate.png";

const Quote = () => {
  const [formData, setFormData] = useState({
    logisticType: "",
    weight: "",
    commodityType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Add your cost calculation logic here
  };

  return (
    <div className="px-8 md:px-16 text-[#FFFFFF] pt-32 flex justify-between gap-8 max-lg:flex-col max-md:pt-24 max-sm:pt-16 max-sm:px-4 max-sm:gap-6">
      <div className="w-[50%] max-lg:w-full">
        <div className="mb-8 max-sm:mb-6">
          <h1 className="text-[#FF6600] text-[40px] font-bold max-md:text-3xl max-sm:text-2xl">
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
                className="w-[90%] px-4 py-4 border border-[#FFFFFF]/30 bg-transparent rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent outline-none text-[#FFFFFF] max-lg:w-full max-sm:py-3 max-sm:text-sm"
                style={{
                  colorScheme: "dark",
                }}
              >
                <option value="" style={{ backgroundColor: "#1a1a1a" }}>
                  Select logistic type
                </option>
                <option value="air" style={{ backgroundColor: "#1a1a1a" }}>
                  Air
                </option>
                <option value="sea" style={{ backgroundColor: "#1a1a1a" }}>
                  Sea
                </option>
                <option value="land" style={{ backgroundColor: "#1a1a1a" }}>
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
                className="w-[90%] px-4 py-4 border border-[#FFFFFF]/30 bg-transparent rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent outline-none placeholder:text-gray-400 max-lg:w-full max-sm:py-3 max-sm:text-sm"
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
                className="w-[90%] px-4 py-4 border border-[#FFFFFF]/30 bg-transparent rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent outline-none placeholder:text-gray-400 max-lg:w-full max-sm:py-3 max-sm:text-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-[90%] bg-[#FF6600] text-white font-medium py-3 px-4 rounded-lg hover:bg-[#e55a00] transition-colors duration-200 max-lg:w-full max-sm:text-sm"
            >
              Check Cost
            </button>
          </form>
        </div>
      </div>
      <div className="w-[40%] max-lg:w-full max-lg:flex max-lg:justify-center">
        <img
          src={calculate}
          alt=""
          className="w-full h-auto max-lg:max-w-md max-sm:max-w-sm"
        />
      </div>
    </div>
  );
};

export default Quote;
