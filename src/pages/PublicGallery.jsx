import { useState, useEffect } from "react";
import { publicApi } from "../api/publicApi";
import { getUserFacingApiError } from "../api/errorUtils";
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

export default function PublicGallery() {
  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
                Browse available vehicles. Log in to your account to send a formal inquiry.
              </p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {cars.map((car) => (
                  <GalleryCard
                    key={car.id}
                    item={car}
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
    </div>
  );
}
