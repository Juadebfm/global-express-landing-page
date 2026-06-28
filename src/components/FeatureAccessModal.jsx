import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";

const FeatureAccessModal = ({ content, onClose }) => {
  if (!content) return null;

  const Icon = content.icon;

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center bg-[rgba(15,23,42,0.58)] p-4 backdrop-blur-[6px]"
      onClick={content.dismissible ? onClose : undefined}
      role="presentation"
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-[28px] border border-white/35 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(249,245,240,0.97))] p-7 shadow-[0_28px_90px_rgba(15,23,42,0.28)] sm:p-8"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="feature-access-title"
        aria-describedby="feature-access-message"
      >
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[rgba(255,106,0,0.16)] blur-2xl" />
        {content.dismissible && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-white/80 text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--text)]"
            aria-label="Close modal"
          >
            <FiX className="text-lg" />
          </button>
        )}

        <div className="relative">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[rgba(255,106,0,0.12)] text-[color:var(--accent)]">
            <Icon className="text-[30px]" />
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">
            {content.modalEyebrow}
          </p>
          <h2
            id="feature-access-title"
            className="mt-3 text-3xl font-bold leading-tight text-[color:var(--text)]"
          >
            {content.modalTitle}
          </h2>
          <p
            id="feature-access-message"
            className="mt-4 text-base leading-7 text-[color:var(--text-muted)]"
          >
            {content.modalMessage}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex flex-1 items-center justify-center rounded-xl bg-[color:var(--accent)] px-5 py-3 font-semibold text-[color:var(--accent-contrast)] transition-colors hover:bg-[color:var(--accent-hover)]"
            >
              {content.modalPrimaryLabel || "Close"}
            </button>
            {content.modalSecondaryTo && (
              <Link
                to={content.modalSecondaryTo}
                onClick={onClose}
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-[color:var(--border)] bg-white/80 px-5 py-3 font-semibold text-[color:var(--text)] transition-colors hover:bg-white"
              >
                {content.modalSecondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureAccessModal;
