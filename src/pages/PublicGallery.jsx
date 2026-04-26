import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { publicApi } from "../api/publicApi";

const ANONYMOUS_ITEMS_PER_PAGE = 10;

const unwrapData = (payload) => payload?.data || payload || {};
const toList = (value) => (Array.isArray(value) ? value : []);

const formatApiError = (error, fallbackMessage) =>
  error.response?.data?.message ||
  error.response?.data?.error ||
  fallbackMessage;

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString();
};

const formatStatus = (value) => {
  if (!value || typeof value !== "string") return "-";
  return value
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const normalizeAnonymousGoods = (payload) => {
  const data = unwrapData(payload);
  const source =
    data?.anonymousGoods ||
    data?.sections?.anonymousGoods ||
    data?.sections?.anonymous_goods ||
    [];

  return toList(source).map((item, index) => {
    const trackingNumber =
      item?.maskedTrackingNumber ||
      item?.trackingNumber ||
      item?.shipmentTrackingNumber ||
      "";

    return {
      id: item?.id || item?._id || `${trackingNumber}-${index}`,
      trackingNumber,
      title: item?.title || "Anonymous Goods",
      description: item?.description || "",
      status: item?.status || "",
      previewImageUrl: item?.previewImageUrl || item?.imageUrl || item?.mediaUrls?.[0] || "",
      mediaUrls: toList(item?.mediaUrls),
      startsAt: item?.startsAt || null,
      endsAt: item?.endsAt || null,
      createdAt: item?.createdAt || null,
      updatedAt: item?.updatedAt || null,
      itemType: item?.itemType || "anonymous_goods",
    };
  });
};

const normalizeAdverts = (payload) => {
  const data = unwrapData(payload);
  const source = data?.adverts || data?.items || data;

  return toList(source).map((item, index) => ({
    id: item?.id || item?._id || `advert-${index}`,
    title: item?.title || "Featured Advert",
    text: item?.description || "",
    imageUrl: item?.previewImageUrl || item?.imageUrl || item?.mediaUrls?.[0] || "",
    ctaLabel: item?.ctaLabel || "Learn More",
    ctaUrl: item?.ctaUrl || "",
  }));
};

const PublicGallery = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [galleryError, setGalleryError] = useState("");
  const [galleryResponse, setGalleryResponse] = useState(null);
  const [advertsResponse, setAdvertsResponse] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let mounted = true;

    const loadGalleryData = async () => {
      setLoading(true);
      setGalleryError("");
      try {
        const [galleryResult, advertsResult] = await Promise.all([
          publicApi.getGallery(100),
          publicApi.getGalleryAdverts(8),
        ]);

        if (!mounted) return;
        setGalleryResponse(galleryResult);
        setAdvertsResponse(advertsResult);
      } catch (error) {
        if (!mounted) return;
        setGalleryError(
          formatApiError(
            error,
            "Unable to load gallery content right now. Please refresh and try again."
          )
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadGalleryData();
    return () => {
      mounted = false;
    };
  }, []);

  const anonymousGoods = useMemo(
    () => normalizeAnonymousGoods(galleryResponse),
    [galleryResponse]
  );

  const adverts = useMemo(
    () => normalizeAdverts(advertsResponse),
    [advertsResponse]
  );

  const totalPages = Math.max(
    1,
    Math.ceil(anonymousGoods.length / ANONYMOUS_ITEMS_PER_PAGE)
  );

  const paginatedAnonymousGoods = useMemo(() => {
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * ANONYMOUS_ITEMS_PER_PAGE;
    return anonymousGoods.slice(start, start + ANONYMOUS_ITEMS_PER_PAGE);
  }, [anonymousGoods, page, totalPages]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const openClaimPage = (item) => {
    if (!item?.trackingNumber) return;
    navigate(`/gallery/anonymous/${encodeURIComponent(item.trackingNumber)}/claim`, {
      state: { item },
    });
  };

  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
      <Header />
      <main className="pt-24 lg:pt-20 max-sm:pt-16 px-4 sm:px-8 lg:px-16 pb-0">
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-2xl font-bold">Anonymous Goods</h2>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="text-sm px-4 py-2 rounded-lg border border-[color:var(--border)] hover:bg-white/10 transition-colors self-start sm:self-auto"
            >
              Refresh
            </button>
          </div>

          {loading && (
            <p className="mt-4 text-sm text-[color:var(--text-muted)]">
              Loading anonymous goods...
            </p>
          )}

          {galleryError && <p className="mt-4 text-sm text-red-500">{galleryError}</p>}

          {!loading && !galleryError && anonymousGoods.length === 0 && (
            <p className="mt-4 text-sm text-[color:var(--text-muted)]">
              No anonymous goods are available right now.
            </p>
          )}

          {!loading && !galleryError && anonymousGoods.length > 0 && (
            <>
              <div className="mt-4 space-y-3 md:hidden">
                {paginatedAnonymousGoods.map((item) => (
                  <article
                    key={item.id}
                    onClick={() => openClaimPage(item)}
                    className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 cursor-pointer"
                  >
                    <p className="text-xs text-[color:var(--text-muted)]">Tracking Number</p>
                    <p className="text-sm font-semibold text-[color:var(--accent)] mt-1">
                      {item.trackingNumber || "-"}
                    </p>
                    <p className="font-semibold mt-3">{item.title}</p>
                    <p className="text-sm text-[color:var(--text-muted)] mt-1 line-clamp-2">
                      {item.description || "-"}
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-3 text-xs">
                      <span>Status: {formatStatus(item.status)}</span>
                      <span>Updated: {formatDate(item.updatedAt)}</span>
                    </div>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        openClaimPage(item);
                      }}
                      className="mt-4 text-xs px-3 py-1.5 rounded-md bg-[color:var(--accent)] text-[color:var(--accent-contrast)] hover:bg-[color:var(--accent-hover)]"
                      disabled={!item.trackingNumber}
                    >
                      Claim
                    </button>
                  </article>
                ))}
              </div>

              <div className="hidden md:block mt-6 overflow-x-auto rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)]">
                <table className="w-full min-w-[640px] text-sm">
                  <thead className="bg-white/30">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold">Tracking Number</th>
                      <th className="text-left px-4 py-3 font-semibold">Title</th>
                      <th className="hidden lg:table-cell text-left px-4 py-3 font-semibold">Description</th>
                      <th className="text-left px-4 py-3 font-semibold">Status</th>
                      <th className="hidden lg:table-cell text-left px-4 py-3 font-semibold">Updated</th>
                      <th className="text-left px-4 py-3 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedAnonymousGoods.map((item) => (
                      <tr
                        key={item.id}
                        className="border-t border-[color:var(--border)] hover:bg-white/20 cursor-pointer"
                        onClick={() => openClaimPage(item)}
                      >
                        <td className="px-4 py-3 font-semibold text-[color:var(--accent)]">
                          {item.trackingNumber || "-"}
                        </td>
                        <td className="px-4 py-3">{item.title}</td>
                        <td className="hidden lg:table-cell px-4 py-3 text-[color:var(--text-muted)] max-w-[360px] truncate">
                          {item.description || "-"}
                        </td>
                        <td className="px-4 py-3">{formatStatus(item.status)}</td>
                        <td className="hidden lg:table-cell px-4 py-3">{formatDate(item.updatedAt)}</td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              openClaimPage(item);
                            }}
                            className="text-xs px-3 py-1.5 rounded-md bg-[color:var(--accent)] text-[color:var(--accent-contrast)] hover:bg-[color:var(--accent-hover)]"
                            disabled={!item.trackingNumber}
                          >
                            Claim
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-xs text-[color:var(--text-muted)]">
                  Page {Math.min(page, totalPages)} of {totalPages}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                    disabled={page <= 1}
                    className="px-3 py-1.5 rounded-md border border-[color:var(--border)] text-sm disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={page >= totalPages}
                    className="px-3 py-1.5 rounded-md border border-[color:var(--border)] text-sm disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold">Adverts</h2>
          {adverts.length === 0 ? (
            <p className="mt-4 text-sm text-[color:var(--text-muted)]">
              No adverts are available right now.
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {adverts.map((advert) => (
                <article
                  key={advert.id}
                  className="rounded-xl border border-[color:var(--border)] overflow-hidden bg-[color:var(--surface)]"
                >
                  {advert.imageUrl ? (
                    <img
                      src={advert.imageUrl}
                      alt={advert.title}
                      className="w-full h-40 object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-40 bg-black/10 flex items-center justify-center text-sm text-[color:var(--text-muted)]">
                      Advert image unavailable
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold">{advert.title}</h3>
                    {advert.text && (
                      <p className="mt-2 text-sm text-[color:var(--text-muted)]">
                        {advert.text}
                      </p>
                    )}
                    {advert.ctaUrl && (
                      <a
                        href={advert.ctaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 text-sm text-[color:var(--accent)] hover:underline"
                      >
                        {advert.ctaLabel}
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer topSpacingClass="mt-14 max-md:mt-10 max-sm:mt-8" />
    </div>
  );
};

export default PublicGallery;
