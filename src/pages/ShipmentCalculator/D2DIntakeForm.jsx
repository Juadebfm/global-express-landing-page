import { LuChevronDown } from "react-icons/lu";
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
}) => (
  <div className="mt-8 border border-[color:var(--border)] rounded-lg p-4 space-y-4">
    <h6 className="font-semibold text-[color:var(--text)]">
      Door-to-Door Route Details
    </h6>
    <p className="text-sm text-[color:var(--text-muted)]">
      Enter the route details once and we&apos;ll compare likely D2D pricing
      for both air and ocean delivery.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
          Pickup City{isIntakeFieldRequired("city") && <span className="text-red-700">*</span>}
        </label>
        <input
          type="text"
          name="city"
          value={d2dForm.city}
          onChange={handleD2DChange}
          readOnly
          className={`${INPUT_CLASS} bg-gray-100/70 cursor-not-allowed`}
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
          readOnly
          className={`${INPUT_CLASS} bg-gray-100/70 cursor-not-allowed`}
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
          Delivery State{isIntakeFieldRequired("deliveryState") && <span className="text-red-700">*</span>}
        </label>
        <div className="relative">
          <select
            name="deliveryState"
            value={d2dForm.deliveryState}
            onChange={handleD2DChange}
            className={`${getInputClass("deliveryState")} appearance-none pr-12`}
          >
            <option value="">Select delivery state</option>
            {nigeriaStates.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
          <LuChevronDown
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]"
            aria-hidden="true"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2 text-[color:var(--text)]">
          Delivery City{isIntakeFieldRequired("deliveryCity") && <span className="text-red-700">*</span>}
        </label>
        <div className="relative">
          <select
            name="deliveryCity"
            value={d2dForm.deliveryCity}
            onChange={handleD2DChange}
            className={`${getInputClass("deliveryCity")} appearance-none pr-12 disabled:bg-gray-100/70 disabled:text-[color:var(--text-muted)] disabled:cursor-not-allowed`}
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
          <LuChevronDown
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]"
            aria-hidden="true"
          />
        </div>
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
  </div>
);

export default D2DIntakeForm;
