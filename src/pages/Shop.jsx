import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { publicApi } from "../api/publicApi";
import { getUserFacingApiError } from "../api/errorUtils";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { TurnstileWidget } from "../components/TurnstileWidget";
import { DASHBOARD_URL } from "../constants/siteData";
import { AUTH_TOKEN_STORAGE_KEY } from "../constants/auth";

const dashboardSignInUrl = `${DASHBOARD_URL.replace(/\/$/, "")}/sign-in`;
const SHOP_PAGE_LIMIT = 8;

function buildShopInquirySignInUrl(item) {
  const nextUrl = new URL("/gallery", `${DASHBOARD_URL.replace(/\/$/, "")}/`);
  nextUrl.searchParams.set("intent", "shop-inquiry");
  nextUrl.searchParams.set("itemId", item.id);
  nextUrl.searchParams.set("source", "landing-shop");

  const signInUrl = new URL("/sign-in", `${DASHBOARD_URL.replace(/\/$/, "")}/`);
  signInUrl.searchParams.set("next", `${nextUrl.pathname}${nextUrl.search}`);

  return signInUrl.toString();
}

const formatPrice = (item) => {
  const amount = item.priceAmount ?? item.carPriceNgn ?? item.priceUsd;
  if (!amount) return null;

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: item.priceCurrency ?? "NGN",
    maximumFractionDigits: 0,
  }).format(Number(amount));
};

function ListingPreview({ item }) {
  const [hasImageError, setHasImageError] = useState(false);
  const hasRenderableImage = Boolean(item.previewImageUrl) && !hasImageError;

  if (hasRenderableImage) {
    return (
      <img
        src={item.previewImageUrl}
        alt={item.title}
        className="h-48 w-full object-cover"
        loading="lazy"
        onError={() => setHasImageError(true)}
      />
    );
  }

  return (
    <div className="flex h-48 w-full flex-col items-center justify-center gap-2 bg-[color:var(--muted)] px-6 text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">
        Preview unavailable
      </span>
      <p className="max-w-[18rem] text-sm text-[color:var(--text-muted)]">
        Listing image is being refreshed. The item details below are still available.
      </p>
    </div>
  );
}

function ListingCard({ item, action }) {
  const priceLabel = formatPrice(item);

  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] overflow-hidden flex flex-col">
      <ListingPreview key={`${item.id}-${item.previewImageUrl ?? "no-image"}`} item={item} />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h2 className="font-semibold text-[color:var(--text)]">{item.title}</h2>
        {item.description && (
          <p className="line-clamp-2 text-sm text-[color:var(--text-muted)]">
            {item.description}
          </p>
        )}
        {priceLabel && (
          <p className="text-sm font-semibold text-[color:var(--accent)]">
            {priceLabel}
          </p>
        )}
        <div className="mt-auto pt-2">{action(item)}</div>
      </div>
    </div>
  );
}

function ListingCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]">
      <div className="h-48 animate-pulse bg-[color:var(--muted)]" />
      <div className="space-y-3 p-4">
        <div className="h-5 w-2/3 animate-pulse rounded-full bg-[color:var(--muted)]" />
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded-full bg-[color:var(--muted)]" />
          <div className="h-4 w-5/6 animate-pulse rounded-full bg-[color:var(--muted)]" />
        </div>
        <div className="h-4 w-24 animate-pulse rounded-full bg-[color:var(--muted)]" />
        <div className="pt-2">
          <div className="h-10 w-full animate-pulse rounded-lg bg-[color:var(--muted)]" />
        </div>
      </div>
    </div>
  );
}

function ShopSectionSkeleton({ title, description, cards = 3 }) {
  return (
    <section>
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-semibold max-sm:text-xl">{title}</h2>
          <span className="rounded-full bg-[color:var(--muted)] px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
            Loading
          </span>
        </div>
        <p className="mt-2 max-w-2xl text-sm text-[color:var(--text-muted)]">
          {description}
        </p>
        <div className="mt-4 h-4 w-full max-w-xl animate-pulse rounded-full bg-[color:var(--muted)]" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: cards }).map((_, index) => (
          <ListingCardSkeleton key={`${title}-${index}`} />
        ))}
      </div>
    </section>
  );
}

function CarInquiryModal({ item, onClose }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [captchaToken, setCaptchaToken] = useState(null);
  const [state, setState] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const handleCaptchaToken = useCallback((token) => setCaptchaToken(token), []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      await publicApi.submitPublicVehicleInquiry(
        item.id,
        {
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          message: form.message || undefined,
        },
        captchaToken
      );

      setState({ loading: false, error: null, success: true });
    } catch (error) {
      setState({
        loading: false,
        error: getUserFacingApiError(
          error,
          "Failed to submit. Please try again."
        ),
        success: false,
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-md rounded-2xl bg-[color:var(--surface)] p-6 shadow-xl">
        {state.success ? (
          <div className="py-4 text-center">
            <p className="mb-2 text-2xl">✓</p>
            <h3 className="mb-1 font-semibold text-[color:var(--text)]">
              Inquiry received
            </h3>
            <p className="mb-4 text-sm text-[color:var(--text-muted)]">
              Our team will confirm availability and share the next steps shortly.
            </p>
            <button
              onClick={onClose}
              className="rounded-lg bg-[color:var(--accent)] px-6 py-2 text-sm font-semibold text-white"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-[color:var(--text)]">
                  Make an Inquiry
                </h3>
                <p className="text-sm text-[color:var(--text-muted)]">
                  {item.title}
                </p>
              </div>
              <button
                onClick={onClose}
                className="ml-2 text-[color:var(--text-muted)] hover:text-[color:var(--text)]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-[color:var(--text)]">
                  Full Name *
                </label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-[color:var(--border)] bg-transparent px-3 py-2 text-sm text-[color:var(--text)] outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-[color:var(--text)]">
                  Email *
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-[color:var(--border)] bg-transparent px-3 py-2 text-sm text-[color:var(--text)] outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-[color:var(--text)]">
                  Phone *
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  minLength={5}
                  required
                  className="w-full rounded-lg border border-[color:var(--border)] bg-transparent px-3 py-2 text-sm text-[color:var(--text)] outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-[color:var(--text)]">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={2}
                  className="w-full resize-none rounded-lg border border-[color:var(--border)] bg-transparent px-3 py-2 text-sm text-[color:var(--text)] outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
                />
              </div>

              <TurnstileWidget onToken={handleCaptchaToken} />
              {state.error && (
                <p className="text-sm text-red-500">{state.error}</p>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-lg border border-[color:var(--border)] py-2 text-sm font-medium text-[color:var(--text)] hover:bg-[color:var(--muted)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={state.loading}
                  className="flex-1 rounded-lg bg-[color:var(--accent)] py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
                >
                  {state.loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function ItemInquiryModal({ item, onClose }) {
  const [message, setMessage] = useState("");
  const [state, setState] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setState({ loading: true, error: null, success: false });

    try {
      await publicApi.submitAuthenticatedShopItemInquiry(item.id, {
        message: message.trim() || undefined,
      });

      setState({ loading: false, error: null, success: true });
    } catch (error) {
      setState({
        loading: false,
        error: getUserFacingApiError(
          error,
          "Failed to send your inquiry. Please try again."
        ),
        success: false,
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-md rounded-2xl bg-[color:var(--surface)] p-6 shadow-xl">
        {state.success ? (
          <div className="py-4 text-center">
            <p className="mb-2 text-2xl">✓</p>
            <h3 className="mb-1 font-semibold text-[color:var(--text)]">
              Inquiry sent
            </h3>
            <p className="mb-4 text-sm text-[color:var(--text-muted)]">
              Your request is now in the customer workflow. Our team will follow up from there.
            </p>
            <button
              onClick={onClose}
              className="rounded-lg bg-[color:var(--accent)] px-6 py-2 text-sm font-semibold text-white"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-[color:var(--text)]">
                  Send Inquiry
                </h3>
                <p className="text-sm text-[color:var(--text-muted)]">
                  {item.title}
                </p>
              </div>
              <button
                onClick={onClose}
                className="ml-2 text-[color:var(--text-muted)] hover:text-[color:var(--text)]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-[color:var(--text)]">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  rows={3}
                  placeholder="Share what you need to know about this item."
                  className="w-full resize-none rounded-lg border border-[color:var(--border)] bg-transparent px-3 py-2 text-sm text-[color:var(--text)] outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
                />
              </div>

              {state.error && (
                <p className="text-sm text-red-500">{state.error}</p>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-lg border border-[color:var(--border)] py-2 text-sm font-medium text-[color:var(--text)] hover:bg-[color:var(--muted)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={state.loading}
                  className="flex-1 rounded-lg bg-[color:var(--accent)] py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
                >
                  {state.loading ? "Sending..." : "Send Inquiry"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function Shop() {
  const navigate = useNavigate();
  const [carTarget, setCarTarget] = useState(null);
  const [itemTarget, setItemTarget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sectionErrors, setSectionErrors] = useState({
    vehicles: null,
    items: null,
  });
  const [vehicles, setVehicles] = useState([]);
  const [saleItems, setSaleItems] = useState([]);
  const [hasAuthToken, setHasAuthToken] = useState(() => {
    if (typeof window === "undefined") return false;
    return Boolean(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY));
  });

  useEffect(() => {
    const syncAuthState = () => {
      setHasAuthToken(Boolean(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)));
    };

    syncAuthState();
    window.addEventListener("storage", syncAuthState);

    return () => {
      window.removeEventListener("storage", syncAuthState);
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const loadListings = async () => {
      setLoading(true);
      setError(null);
      setSectionErrors({ vehicles: null, items: null });

      const [vehicleResult, itemResult] = await Promise.allSettled([
        publicApi.getPublicShopVehicles(1, SHOP_PAGE_LIMIT),
        publicApi.getPublicShopItems(1, SHOP_PAGE_LIMIT),
      ]);

      if (isCancelled) return;

      let vehiclesError = null;
      let itemsError = null;
      let loadedVehicles = [];
      let loadedItems = [];

      if (vehicleResult.status === "fulfilled") {
        loadedVehicles = vehicleResult.value?.data?.data ?? [];
      } else {
        vehiclesError = getUserFacingApiError(
          vehicleResult.reason,
          "Failed to load vehicles."
        );
      }

      if (itemResult.status === "fulfilled") {
        loadedItems = itemResult.value?.data?.data ?? [];
      } else {
        itemsError = getUserFacingApiError(
          itemResult.reason,
          "Failed to load shop items."
        );
      }

      setVehicles(loadedVehicles);
      setSaleItems(loadedItems);
      setSectionErrors({ vehicles: vehiclesError, items: itemsError });

      if (vehiclesError && itemsError) {
        setError("Failed to load shop listings.");
      }

      setLoading(false);
    };

    loadListings();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen text-[color:var(--text)]">
      <Header />

      <section className="page-shell pb-12 pt-32 max-sm:pt-24">
        <div className="page-frame">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">
            Public Shop
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold max-sm:text-2xl">
            Browse cars and ready-to-buy items from the warehouse
          </h1>
          <p className="mt-3 max-w-2xl text-[color:var(--text-muted)] max-sm:text-sm">
            Keep this page public and simple: browse what is available, make an
            inquiry for vehicles immediately, and sign in only when you need to
            send a formal inquiry for other items.
          </p>
        </div>
      </section>

      {loading && (
        <div className="page-shell pb-24">
          <div className="page-frame space-y-16">
            <ShopSectionSkeleton
              title="Cars Available"
              description="Browse available vehicles and send an inquiry. Our team will confirm availability and next steps."
              cards={2}
            />
            <ShopSectionSkeleton
              title="Shop Listings"
              description="Regular sale items will appear here once the catalog finishes loading."
              cards={3}
            />
          </div>
        </div>
      )}

      {error && (
        <div className="page-shell pb-16">
          <div className="page-frame">
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="page-shell pb-24">
          <div className="page-frame space-y-16">
          {(vehicles.length > 0 || sectionErrors.vehicles) && (
            <section>
              <h2 className="mb-2 text-2xl font-semibold max-sm:text-xl">
                Cars Available
              </h2>
              <p className="mb-6 text-sm text-[color:var(--text-muted)]">
                Browse available vehicles and send an inquiry. Our team will
                confirm availability and next steps.
              </p>
              {sectionErrors.vehicles && (
                <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {sectionErrors.vehicles}
                </p>
              )}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {vehicles.map((item) => (
                  <ListingCard
                    key={item.id}
                    item={item}
                    action={() => (
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

          {(saleItems.length > 0 || sectionErrors.items) && (
            <section>
              <h2 className="mb-2 text-2xl font-semibold max-sm:text-xl">
                Shop Listings
              </h2>
              <p className="mb-6 text-sm text-[color:var(--text-muted)]">
                Browse regular sale items and send an inquiry when you are ready.
              </p>
              {sectionErrors.items && (
                <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {sectionErrors.items}
                </p>
              )}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {saleItems.map((item) => (
                  <ListingCard
                    key={item.id}
                    item={item}
                    action={() => (
                      <button
                        onClick={() =>
                          hasAuthToken
                            ? setItemTarget(item)
                            : (window.location.href = buildShopInquirySignInUrl(item))
                        }
                        className="w-full rounded-lg border border-[color:var(--border)] py-2 text-sm font-medium text-[color:var(--text)] hover:bg-[color:var(--muted)]"
                      >
                        {hasAuthToken ? "Send Inquiry" : "Sign in to Inquire"}
                      </button>
                    )}
                  />
                ))}
              </div>
            </section>
          )}

          {vehicles.length === 0 && saleItems.length === 0 && !sectionErrors.vehicles && !sectionErrors.items && (
            <div className="py-24 text-center text-[color:var(--text-muted)]">
              <p className="text-lg">The shop is currently empty.</p>
              <p className="mt-1 text-sm">
                Check back soon for new listings from the warehouse.
              </p>
            </div>
          )}

          <section className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
            <h2 className="text-2xl font-semibold max-sm:text-xl">
              Looking for your own package instead?
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[color:var(--text-muted)]">
              If you are trying to identify a parcel that belongs to you, use
              the dedicated claim flow instead of browsing the shop.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/claim-a-package")}
                className="rounded-lg bg-[color:var(--accent)] px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                Claim a Package
              </button>
              <button
                onClick={() => {
                  window.location.href = dashboardSignInUrl;
                }}
                className="rounded-lg border border-[color:var(--border)] px-5 py-2 text-sm font-medium text-[color:var(--text)] hover:bg-[color:var(--muted)]"
              >
                Sign in to Dashboard
              </button>
            </div>
          </section>
          </div>
        </div>
      )}

      <Footer topSpacingClass="mt-24 max-md:mt-20 max-sm:mt-16" />

      {carTarget && (
        <CarInquiryModal
          item={carTarget}
          onClose={() => setCarTarget(null)}
        />
      )}

      {itemTarget && (
        <ItemInquiryModal
          item={itemTarget}
          onClose={() => setItemTarget(null)}
        />
      )}
    </div>
  );
}
