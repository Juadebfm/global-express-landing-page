import { formatShipmentTypeValue } from "./utils";

const IntakeResult = ({ intakeResult, onReset }) => {
  const intakeRequest = intakeResult?.intakeRequest || null;
  const intakeDelivery = intakeRequest?.delivery || null;

  return (
    <div className="mt-12 max-sm:mt-8 border border-[color:var(--border)] rounded-lg p-6 max-sm:p-4">
      <h5 className="text-lg font-bold text-[color:var(--text)] mb-4">
        Door-to-Door Request Submitted
      </h5>
      {intakeResult.ticket?.ticketNumber && (
        <p className="text-sm text-[color:var(--text)] mb-4">
          Your D2D request has been submitted successfully. Reference:{" "}
          <span className="font-semibold">
            {intakeResult.ticket.ticketNumber}
          </span>
          . Our team will review your request and contact you.
        </p>
      )}
      <div className="space-y-3 text-sm">
        {intakeResult.ticket?.ticketNumber && (
          <div className="flex justify-between items-center gap-3">
            <span className="text-[color:var(--text-muted)]">Ticket Number</span>
            <span className="font-semibold text-[color:var(--text)]">
              {intakeResult.ticket.ticketNumber}
            </span>
          </div>
        )}
        {intakeResult.ticket?.status && (
          <div className="flex justify-between items-center gap-3">
            <span className="text-[color:var(--text-muted)]">Ticket Status</span>
            <span className="font-semibold text-[color:var(--text)]">
              {formatShipmentTypeValue(
                String(intakeResult.ticket.status).replace(/_/g, " ")
              )}
            </span>
          </div>
        )}
        {intakeResult.ticket?.subject && (
          <div className="flex justify-between items-center gap-3">
            <span className="text-[color:var(--text-muted)]">Subject</span>
            <span className="font-semibold text-[color:var(--text)]">
              {intakeResult.ticket.subject}
            </span>
          </div>
        )}
        {intakeRequest?.fullName && (
          <div className="flex justify-between items-center gap-3">
            <span className="text-[color:var(--text-muted)]">Full Name</span>
            <span className="font-semibold text-[color:var(--text)]">
              {intakeRequest.fullName}
            </span>
          </div>
        )}
        {intakeRequest?.email && (
          <div className="flex justify-between items-center gap-3">
            <span className="text-[color:var(--text-muted)]">Email</span>
            <span className="font-semibold text-[color:var(--text)]">
              {intakeRequest.email}
            </span>
          </div>
        )}
        {intakeRequest?.phone && (
          <div className="flex justify-between items-center gap-3">
            <span className="text-[color:var(--text-muted)]">Phone</span>
            <span className="font-semibold text-[color:var(--text)]">
              {intakeRequest.phone}
            </span>
          </div>
        )}
        {intakeDelivery?.phone && (
          <div className="flex justify-between items-center gap-3">
            <span className="text-[color:var(--text-muted)]">Delivery Phone</span>
            <span className="font-semibold text-[color:var(--text)]">
              {intakeDelivery.phone}
            </span>
          </div>
        )}
        {intakeDelivery?.addressLine1 && (
          <div className="flex justify-between items-center gap-3">
            <span className="text-[color:var(--text-muted)]">Delivery Address</span>
            <span className="font-semibold text-[color:var(--text)] text-right">
              {intakeDelivery.addressLine1}
            </span>
          </div>
        )}
        {intakeDelivery?.city && (
          <div className="flex justify-between items-center gap-3">
            <span className="text-[color:var(--text-muted)]">Delivery City</span>
            <span className="font-semibold text-[color:var(--text)]">
              {intakeDelivery.city}
            </span>
          </div>
        )}
        {intakeDelivery?.state && (
          <div className="flex justify-between items-center gap-3">
            <span className="text-[color:var(--text-muted)]">Delivery State</span>
            <span className="font-semibold text-[color:var(--text)]">
              {intakeDelivery.state}
            </span>
          </div>
        )}
        {intakeDelivery?.postalCode && (
          <div className="flex justify-between items-center gap-3">
            <span className="text-[color:var(--text-muted)]">Delivery Postal Code</span>
            <span className="font-semibold text-[color:var(--text)]">
              {intakeDelivery.postalCode}
            </span>
          </div>
        )}
        {intakeDelivery?.landmark && (
          <div className="flex justify-between items-center gap-3">
            <span className="text-[color:var(--text-muted)]">Delivery Landmark</span>
            <span className="font-semibold text-[color:var(--text)] text-right">
              {intakeDelivery.landmark}
            </span>
          </div>
        )}
      </div>
      <div className="flex justify-center pt-6">
        <button
          type="button"
          onClick={onReset}
          className="w-[60%] max-sm:w-[80%] bg-[color:var(--accent)] text-white font-semibold py-3 rounded-md hover:bg-[color:var(--accent-hover)] transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    </div>
  );
};

export default IntakeResult;
