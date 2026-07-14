import { useState, useEffect, useCallback } from "react";
import { publicApi } from "../api/publicApi";
import { getUserFacingApiError } from "../api/errorUtils";
import { TurnstileWidget } from "../components/TurnstileWidget";
import { DASHBOARD_URL } from "../constants/siteData";

const dashboardSignInUrl = `${DASHBOARD_URL.replace(/\/$/, "")}/sign-in`;

const formatPrice = (price, currency) => {
  if (!price) return null;
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currency ?? "NGN",
    maximumFractionDigits: 0,
  }).format(price);
};

function GalleryCard({ item, renderAction }) {
  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] overflow-hidden flex flex-col">
      {item.previewImageUrl ? (
        <img
          src={item.previewImageUrl}
          alt={item.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-48 bg-[color:var(--muted)] flex items-center justify-center text-[color:var(--text-muted)] text-sm">
          No image
        </div>
      )}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-semibold text-[color:var(--text)]">{item.title}</h3>
        {item.description && (
          <p className="text-sm text-[color:var(--text-muted)] line-clamp-2">{item.description}</p>
        )}
        {item.carPriceNgn && (
          <p className="text-sm font-semibold text-[color:var(--accent)]">
            {formatPrice(item.carPriceNgn, item.priceCurrency)}
          </p>
        )}
        {renderAction && <div className="mt-auto pt-2">{renderAction(item)}</div>}
      </div>
    </div>
  );
}

function CarInquiryModal({ item, onClose }) {
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", message: "" });
  const [captchaToken, setCaptchaToken] = useState(null);
  const handleCaptchaToken = useCallback((t) => setCaptchaToken(t), []);
  const [state, setState] = useState({ loading: false, error: null, success: false });

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      setState({
        loading: false,
        error: "Please complete the verification check before submitting.",
        success: false,
      });
      return;
    }

    setState({ loading: true, error: null, success: false });
    try {
      await publicApi.submitPublicVehicleInquiry(item.id, {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        message: form.message || undefined,
      }, captchaToken);
      setState({ loading: false, error: null, success: true });
    } catch (err) {
      setState({ loading: false, error: getUserFacingApiError(err, "Failed to submit. Please try again."), success: false });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-md rounded-2xl bg-[color:var(--surface)] p-6 shadow-xl">
        {state.success ? (
          <div className="text-center py-4">
            <p className="text-2xl mb-2">✓</p>
            <h3 className="font-semibold text-[color:var(--text)] mb-1">Inquiry received</h3>
            <p className="text-sm text-[color:var(--text-muted)] mb-4">Our team will confirm availability and follow up shortly.</p>
            <button onClick={onClose} className="rounded-lg bg-[color:var(--accent)] px-6 py-2 text-sm font-semibold text-white">
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-semibold text-[color:var(--text)]">Make an Inquiry</h2>
                <p className="text-sm text-[color:var(--text-muted)]">{item.title}</p>
              </div>
              <button onClick={onClose} className="text-[color:var(--text-muted)] hover:text-[color:var(--text)] ml-2">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-[color:var(--text)] mb-1">Full Name *</label>
                <input name="fullName" value={form.fullName} onChange={handleChange} required
                  className="w-full rounded-lg border border-[color:var(--border)] bg-transparent px-3 py-2 text-sm text-[color:var(--text)] outline-none focus:ring-2 focus:ring-[color:var(--accent)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[color:var(--text)] mb-1">Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required
                  className="w-full rounded-lg border border-[color:var(--border)] bg-transparent px-3 py-2 text-sm text-[color:var(--text)] outline-none focus:ring-2 focus:ring-[color:var(--accent)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[color:var(--text)] mb-1">Phone *</label>
                <input name="phone" value={form.phone} onChange={handleChange} required minLength={5}
                  className="w-full rounded-lg border border-[color:var(--border)] bg-transparent px-3 py-2 text-sm text-[color:var(--text)] outline-none focus:ring-2 focus:ring-[color:var(--accent)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[color:var(--text)] mb-1">Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={2}
                  className="w-full rounded-lg border border-[color:var(--border)] bg-transparent px-3 py-2 text-sm text-[color:var(--text)] outline-none focus:ring-2 focus:ring-[color:var(--accent)] resize-none" />
              </div>
              <TurnstileWidget onToken={handleCaptchaToken} />
              {state.error && <p className="text-sm text-red-500">{state.error}</p>}
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={onClose}
                  className="flex-1 rounded-lg border border-[color:var(--border)] py-2 text-sm font-medium text-[color:var(--text)] hover:bg-[color:var(--muted)]">
                  Cancel
                </button>
                <button type="submit" disabled={state.loading}
                  className="flex-1 rounded-lg bg-[color:var(--accent)] py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60">
                  {state.loading ? "Submitting…" : "Submit"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function PublicGallery() {
  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [carTarget, setCarTarget] = useState(null);

  useEffect(() => {
    publicApi
      .getGallery()
      .then(setGallery)
      .catch((err) => setError(getUserFacingApiError(err, "Failed to load gallery.")))
      .finally(() => setLoading(false));
  }, []);

  const cars = gallery?.cars ?? [];
  const sales = gallery?.sales ?? [];
  const anonymousGoods = gallery?.anonymousGoods ?? [];

  return (
    <div className="text-[color:var(--text)] min-h-screen">
      {/* Hero */}
      <section className="page-shell pt-32 pb-12 max-md:pt-24 max-sm:pt-16">
        <div className="page-frame">
          <h1 className="text-4xl font-bold max-sm:text-2xl">Gallery</h1>
          <p className="mt-3 max-w-xl text-[color:var(--text-muted)] max-sm:text-sm">
            Browse available cars, items for sale, and goods awaiting claim. Our team follows up on every inquiry.
          </p>
        </div>
      </section>

      {loading && (
        <div className="page-shell pb-16">
          <div className="page-frame grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 rounded-2xl bg-[color:var(--muted)] animate-pulse" />
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="page-shell pb-16">
          <div className="page-frame">
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="page-shell pb-24">
          <div className="page-frame space-y-16">
          {/* Cars for sale */}
          {cars.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-2 max-sm:text-xl">Cars for Sale</h2>
              <p className="text-sm text-[color:var(--text-muted)] mb-6">
                Browse available vehicles and send an inquiry. Our team will confirm availability and next steps.
              </p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {cars.map((car) => (
                  <GalleryCard
                    key={car.id}
                    item={car}
                    renderAction={(item) => (
                      <button
                        onClick={() => setCarTarget(item)}
                        className="w-full rounded-lg bg-[color:var(--accent)] py-2 text-sm font-semibold text-white hover:opacity-90"
                      >
                        Make an Inquiry
                      </button>
                    )}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Sales items */}
          {sales.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-2 max-sm:text-xl">Items for Sale</h2>
              <p className="text-sm text-[color:var(--text-muted)] mb-6">
                Goods available for purchase. Log in to your account to send a formal inquiry.
              </p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {sales.map((item) => (
                  <GalleryCard
                    key={item.id}
                    item={item}
                    renderAction={() => (
                      <button
                        onClick={() => {
                          window.location.href = dashboardSignInUrl;
                        }}
                        className="w-full rounded-lg border border-[color:var(--border)] py-2 text-sm font-medium text-[color:var(--text)] hover:bg-[color:var(--muted)]"
                      >
                        Sign in to Inquire
                      </button>
                    )}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Anonymous goods */}
          {anonymousGoods.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-2 max-sm:text-xl">Anonymous Goods</h2>
              <p className="text-sm text-[color:var(--text-muted)] mb-6">
                Packages awaiting an owner. If you recognise an item, log in to submit a claim with proof of ownership.
              </p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {anonymousGoods.map((item) => (
                  <GalleryCard
                    key={item.id}
                    item={item}
                    renderAction={() => (
                      <button
                        onClick={() => {
                          window.location.href = dashboardSignInUrl;
                        }}
                        className="w-full rounded-lg border border-[color:var(--border)] py-2 text-sm font-medium text-[color:var(--text)] hover:bg-[color:var(--muted)]"
                      >
                        Sign in to Claim
                      </button>
                    )}
                  />
                ))}
              </div>
            </section>
          )}

          {cars.length === 0 && sales.length === 0 && anonymousGoods.length === 0 && (
            <div className="py-24 text-center text-[color:var(--text-muted)]">
              <p className="text-lg">The gallery is currently empty.</p>
              <p className="text-sm mt-1">Check back soon for new listings.</p>
            </div>
          )}
          </div>
        </div>
      )}

      {carTarget && (
        <CarInquiryModal item={carTarget} onClose={() => setCarTarget(null)} />
      )}
    </div>
  );
}
