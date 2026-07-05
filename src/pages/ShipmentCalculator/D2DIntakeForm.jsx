import { DELIVERY_COUNTRY, INPUT_CLASS } from "./utils";

const D2DIntakeForm = ({
  d2dForm,
  handleD2DChange,
  getInputClass,
  isIntakeFieldRequired,
  nigeriaStates,
  deliveryCities,
  citiesLoading,
  locationLoadError,
  fieldErrors,
}) => (
  <div className="mt-8 border border-[color:var(--border)] rounded-lg p-4 space-y-4">
    <h6 className="font-semibold text-[color:var(--text)]">
      Door-to-Door Intake Details
    </h6>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
          Full Name{isIntakeFieldRequired("fullName") && <span className="text-red-700">*</span>}
        </label>
        <input
          type="text"
          name="fullName"
          value={d2dForm.fullName}
          onChange={handleD2DChange}
          placeholder="Enter full name"
          className={getInputClass("fullName")}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
          Email{isIntakeFieldRequired("email") && <span className="text-red-700">*</span>}
        </label>
        <input
          type="email"
          name="email"
          value={d2dForm.email}
          onChange={handleD2DChange}
          placeholder="Enter email address"
          className={getInputClass("email")}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
          Phone Number{isIntakeFieldRequired("phone") && <span className="text-red-700">*</span>}
        </label>
        <input
          type="text"
          name="phone"
          value={d2dForm.phone}
          onChange={handleD2DChange}
          placeholder="Enter phone number"
          className={getInputClass("phone")}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
          City{isIntakeFieldRequired("city") && <span className="text-red-700">*</span>}
        </label>
        <input
          type="text"
          name="city"
          value={d2dForm.city}
          onChange={handleD2DChange}
          placeholder="Enter city"
          className={getInputClass("city")}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
          Origin Country{isIntakeFieldRequired("country") && <span className="text-red-700">*</span>}
        </label>
        <input
          type="text"
          name="country"
          value={d2dForm.country}
          onChange={handleD2DChange}
          placeholder="Enter origin country"
          className={getInputClass("country")}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
          Delivery Phone{isIntakeFieldRequired("deliveryPhone") && <span className="text-red-700">*</span>}
        </label>
        <input
          type="text"
          name="deliveryPhone"
          value={d2dForm.deliveryPhone}
          onChange={handleD2DChange}
          placeholder="Enter delivery contact phone"
          className={getInputClass("deliveryPhone")}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
          Delivery Country
        </label>
        <input
          type="text"
          value={DELIVERY_COUNTRY}
          readOnly
          className={`${INPUT_CLASS} bg-gray-100/70 cursor-not-allowed`}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
          Delivery City
        </label>
        <select
          name="deliveryCity"
          value={d2dForm.deliveryCity}
          onChange={handleD2DChange}
          className={getInputClass("deliveryCity")}
          disabled={!d2dForm.deliveryState || citiesLoading}
        >
          <option value="">
            {d2dForm.deliveryState
              ? citiesLoading
                ? "Loading cities..."
                : "Select delivery city"
              : "Select delivery state first"}
          </option>
          {deliveryCities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
          Delivery State
        </label>
        <select
          name="deliveryState"
          value={d2dForm.deliveryState}
          onChange={handleD2DChange}
          className={getInputClass("deliveryState")}
        >
          <option value="">Select delivery state</option>
          {nigeriaStates.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
          Delivery Postal Code
        </label>
        <input
          type="text"
          name="deliveryPostalCode"
          value={d2dForm.deliveryPostalCode}
          onChange={handleD2DChange}
          placeholder="Enter postal code"
          className={getInputClass("deliveryPostalCode")}
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
          Delivery Address Line 1
          {isIntakeFieldRequired("deliveryAddressLine1") && <span className="text-red-700">*</span>}
        </label>
        <input
          type="text"
          name="deliveryAddressLine1"
          value={d2dForm.deliveryAddressLine1}
          onChange={handleD2DChange}
          placeholder="Enter delivery address"
          className={getInputClass("deliveryAddressLine1")}
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
          Delivery Landmark
        </label>
        <input
          type="text"
          name="deliveryLandmark"
          value={d2dForm.deliveryLandmark}
          onChange={handleD2DChange}
          placeholder="Enter nearby landmark (optional)"
          className={getInputClass("deliveryLandmark")}
        />
      </div>
    </div>
    {locationLoadError && (
      <p className="text-xs text-red-700">{locationLoadError}</p>
    )}
    <div>
      <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
        Goods Description
        {isIntakeFieldRequired("goodsDescription") && <span className="text-red-700">*</span>}
      </label>
      <textarea
        name="goodsDescription"
        value={d2dForm.goodsDescription}
        onChange={handleD2DChange}
        placeholder="Describe the goods"
        rows={3}
        className={getInputClass("goodsDescription")}
      />
    </div>
    <label
      className={`flex items-center gap-2 text-sm text-[color:var(--text)] rounded-md px-2 py-1 ${
        fieldErrors?.wantsAccount ? "border-2 border-red-600 bg-red-50/30" : ""
      }`}
    >
      <input
        type="checkbox"
        name="wantsAccount"
        checked={d2dForm.wantsAccount}
        onChange={handleD2DChange}
      />
      I want to create an account after this request
    </label>
    <label
      className={`flex items-start gap-2 text-sm text-[color:var(--text)] rounded-md px-2 py-1 ${
        fieldErrors?.consentAcknowledgement ? "border-2 border-red-600 bg-red-50/30" : ""
      }`}
    >
      <input
        type="checkbox"
        name="consentAcknowledgement"
        checked={d2dForm.consentAcknowledgement}
        onChange={handleD2DChange}
        className="mt-1"
      />
      I confirm that the information provided is accurate and I consent to be
      contacted for this shipment request.
      {isIntakeFieldRequired("consentAcknowledgement") && (
        <span className="text-red-700">*</span>
      )}
    </label>
  </div>
);

export default D2DIntakeForm;
