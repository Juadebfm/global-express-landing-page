const ErrorToast = ({ toast, onDismiss }) => {
  if (!toast.visible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 w-[min(92vw,420px)]">
      <div className="rounded-xl border-2 border-red-600 bg-gradient-to-br from-red-50 via-red-50 to-[#fff4ef] shadow-2xl p-4 ring-1 ring-red-200">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white text-sm font-bold shadow">
            !
          </span>
          <div className="flex-1">
            <p className="text-sm font-bold text-red-700">
              We Couldn&apos;t Submit Your Request
            </p>
            <p className="text-sm text-red-900 mt-1 leading-snug">
              {toast.message}
            </p>
          </div>
          <button
            type="button"
            onClick={onDismiss}
            className="text-red-500 hover:text-red-700 leading-none"
            aria-label="Dismiss error notification"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorToast;
