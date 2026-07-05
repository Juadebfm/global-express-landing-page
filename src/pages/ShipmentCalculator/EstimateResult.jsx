import { formatCurrency, formatNumber, formatChargeBasis, formatShipmentTypeValue, hasValue } from "./utils";

const EstimateResult = ({ result, onReset }) => {
  const estimateDetails = result?.estimateDetails || null;
  const estimateInput = estimateDetails?.input || null;
  const estimateCalculation = estimateDetails?.calculation || null;
  const estimatePricing = estimateDetails?.pricing || null;

  const finalEstimateDisplay = formatCurrency(
    result?.estimatedCostUsd ?? estimatePricing?.estimatedCostUsd,
    estimatePricing?.currency || "USD"
  );

  const inputRows = estimateInput
    ? [
        { label: "Shipment Type", value: formatShipmentTypeValue(estimateInput.shipmentType) },
        { label: "Weight Input (kg)", value: formatNumber(estimateInput.weightKgInput) },
        { label: "Length Input (cm)", value: formatNumber(estimateInput.lengthCmInput) },
        { label: "Width Input (cm)", value: formatNumber(estimateInput.widthCmInput) },
        { label: "Height Input (cm)", value: formatNumber(estimateInput.heightCmInput) },
        { label: "CBM Input", value: formatNumber(estimateInput.cbmInput, 6) },
      ].filter((row) => hasValue(row.value))
    : [];

  const calculationRows = estimateCalculation
    ? [
        { label: "Charge Basis", value: formatChargeBasis(estimateCalculation.chargeBasis) },
        { label: "Actual Weight (kg)", value: formatNumber(estimateCalculation.actualWeightKg) },
        { label: "Volumetric Weight (kg)", value: formatNumber(estimateCalculation.volumetricWeightKg) },
        { label: "Chargeable Weight (kg)", value: formatNumber(estimateCalculation.chargeableWeightKg) },
        { label: "CBM Used", value: formatNumber(estimateCalculation.cbmUsed, 6) },
      ].filter((row) => hasValue(row.value))
    : [];

  const tableClass = "w-full text-sm border border-[color:var(--border)] rounded-md overflow-hidden";
  const theadRowClass = "border-b border-[color:var(--border)] bg-white/20";
  const thClass = "text-left px-3 py-2 font-semibold text-[color:var(--text)]";
  const trClass = "border-b border-[color:var(--border)] last:border-b-0";

  return (
    <div className="mt-12 max-sm:mt-8 border border-[color:var(--border)] rounded-lg p-6 max-sm:p-4">
      <h5 className="text-lg font-bold text-[color:var(--text)] mb-4">
        Estimate Details
      </h5>

      {finalEstimateDisplay && (
        <div className="mb-5 rounded-md border border-[color:var(--border)] p-4 bg-white/20">
          <p className="text-xs uppercase tracking-wide text-[color:var(--text-muted)]">
            Approximate Final Price
          </p>
          <p className="text-[40px] max-sm:text-[32px] font-extrabold leading-none text-[color:var(--accent)] mt-1">
            ≈ {finalEstimateDisplay}
          </p>
        </div>
      )}

      {inputRows.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-[color:var(--text-muted)]">Input</p>
          <div className="overflow-x-auto">
            <table className={tableClass}>
              <thead>
                <tr className={theadRowClass}>
                  <th className={thClass}>Field</th>
                  <th className={`${thClass} text-right`}>Value</th>
                </tr>
              </thead>
              <tbody>
                {inputRows.map((row) => (
                  <tr key={row.label} className={trClass}>
                    <th scope="row" className="text-left font-medium text-[color:var(--text-muted)] px-3 py-2 pr-4">
                      {row.label}
                    </th>
                    <td className="text-right font-semibold text-[color:var(--text)] px-3 py-2">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {calculationRows.length > 0 && (
        <div className="space-y-2 pt-4">
          <p className="text-xs uppercase tracking-wide text-[color:var(--text-muted)]">Calculation</p>
          <div className="overflow-x-auto">
            <table className={tableClass}>
              <thead>
                <tr className={theadRowClass}>
                  <th className={thClass}>Field</th>
                  <th className={`${thClass} text-right`}>Value</th>
                </tr>
              </thead>
              <tbody>
                {calculationRows.map((row) => (
                  <tr key={row.label} className={trClass}>
                    <th scope="row" className="text-left font-medium text-[color:var(--text-muted)] px-3 py-2 pr-4">
                      {row.label}
                    </th>
                    <td className="text-right font-semibold text-[color:var(--text)] px-3 py-2">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="flex justify-center pt-6">
        <button
          type="button"
          onClick={onReset}
          className="w-[60%] max-sm:w-[80%] bg-[color:var(--accent)] text-white font-semibold py-3 rounded-md hover:bg-[color:var(--accent-hover)] transition-colors"
        >
          Start New Estimate
        </button>
      </div>
    </div>
  );
};

export default EstimateResult;
