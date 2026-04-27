import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { publicApi } from "../api/publicApi";

const ANONYMOUS_ITEMS_PER_PAGE = 10;
const MAX_CLAIM_PROOF_FILES = 5;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FALLBACK_IMG = "/images/gallery-fallback.svg";
const IMAGE_TIMEOUT_MS = 5000;

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
    const trackingNumberMasked =
      item?.trackingNumberMasked ||
      item?.maskedTrackingNumber ||
      item?.trackingNumber ||
      "";

    return {
      id: item?.id || item?._id || `${trackingNumberMasked}-${index}`,
      trackingNumberMasked,
      title: item?.title || "Anonymous Goods",
      description: item?.description || "",
      status: item?.status || "",
      previewImageUrl: item?.previewImageUrl || item?.imageUrl || item?.mediaUrls?.[0] || "",
      mediaUrls: toList(item?.mediaUrls),
      updatedAt: item?.updatedAt || null,
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

const resolveUploadMetadata = (payload) => {
  const data = unwrapData(payload);
  return {
    uploadUrl: data?.uploadUrl || data?.url || data?.presignedUrl || "",
    method: String(data?.method || "PUT").toUpperCase(),
    uploadToken: data?.uploadToken || data?.token || "",
    r2Key: data?.r2Key || data?.key || data?.objectKey || "",
    headers: data?.headers && typeof data.headers === "object" ? data.headers : {},
    fields: data?.fields && typeof data.fields === "object" ? data.fields : null,
  };
};

const uploadClaimFile = async (file, uploadMeta) => {
  if (!uploadMeta.uploadUrl) {
    throw new Error("Missing upload URL from claims presign endpoint.");
  }

  if (uploadMeta.method === "POST" && uploadMeta.fields) {
    const body = new FormData();
    Object.entries(uploadMeta.fields).forEach(([key, value]) => {
      body.append(key, value);
    });
    body.append("file", file);

    const response = await fetch(uploadMeta.uploadUrl, {
      method: "POST",
      body,
    });

    if (!response.ok) {
      throw new Error("File upload failed.");
    }
    return;
  }

  const headers = { ...uploadMeta.headers };
  if (!headers["Content-Type"] && !headers["content-type"] && file.type) {
    headers["Content-Type"] = file.type;
  }

  const response = await fetch(uploadMeta.uploadUrl, {
    method: uploadMeta.method || "PUT",
    headers,
    body: file,
  });

  if (!response.ok) {
    throw new Error("File upload failed.");
  }
};

const SkeletonTable = () => (
  <div className="hidden md:block mt-6 overflow-x-auto rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] animate-pulse">
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
        {Array.from({ length: 6 }).map((_, index) => (
          <tr key={`skeleton-row-${index}`} className="border-t border-[color:var(--border)]">
            <td className="px-4 py-3"><div className="h-4 w-28 bg-gray-200 rounded" /></td>
            <td className="px-4 py-3"><div className="h-4 w-44 bg-gray-200 rounded" /></td>
            <td className="hidden lg:table-cell px-4 py-3"><div className="h-4 w-full max-w-[280px] bg-gray-200 rounded" /></td>
            <td className="px-4 py-3"><div className="h-4 w-24 bg-gray-200 rounded" /></td>
            <td className="hidden lg:table-cell px-4 py-3"><div className="h-4 w-24 bg-gray-200 rounded" /></td>
            <td className="px-4 py-3"><div className="h-7 w-16 bg-gray-200 rounded" /></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const SkeletonCards = () => (
  <div className="mt-4 space-y-3 md:hidden animate-pulse">
    {Array.from({ length: 4 }).map((_, index) => (
      <article key={`skeleton-card-${index}`} className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4">
        <div className="h-3 w-24 bg-gray-200 rounded" />
        <div className="h-4 w-32 bg-gray-200 rounded mt-2" />
        <div className="h-5 w-52 bg-gray-200 rounded mt-4" />
        <div className="h-4 w-full bg-gray-200 rounded mt-2" />
        <div className="h-4 w-2/3 bg-gray-200 rounded mt-2" />
        <div className="h-7 w-16 bg-gray-200 rounded mt-4" />
      </article>
    ))}
  </div>
);

const SafeImageInstance = ({ src, alt, className, wrapperClassName, onError }) => {
  const [resolvedSrc, setResolvedSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setResolvedSrc((current) => (current === FALLBACK_IMG ? current : FALLBACK_IMG));
    }, IMAGE_TIMEOUT_MS);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName || ""}`}>
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-black/10" />
      )}
      <img
        src={resolvedSrc}
        alt={alt}
        className={className}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={(event) => {
          const nextSrc = event.currentTarget.getAttribute("src");
          if (nextSrc !== FALLBACK_IMG) {
            setResolvedSrc(FALLBACK_IMG);
          }
          if (typeof onError === "function") {
            onError();
          }
        }}
      />
    </div>
  );
};

const SafeImage = ({ src, alt, className, wrapperClassName, onError }) => {
  const safeSrc = src || FALLBACK_IMG;
  return (
    <SafeImageInstance
      key={safeSrc}
      src={safeSrc}
      alt={alt}
      className={className}
      wrapperClassName={wrapperClassName}
      onError={onError}
    />
  );
};

const PublicGallery = () => {
  const [loading, setLoading] = useState(true);
  const [galleryError, setGalleryError] = useState("");
  const [galleryResponse, setGalleryResponse] = useState(null);
  const [advertsResponse, setAdvertsResponse] = useState(null);
  const [page, setPage] = useState(1);
  const [claimedItemIds, setClaimedItemIds] = useState(() => new Set());
  const [toast, setToast] = useState({
    visible: false,
    type: "",
    message: "",
  });

  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemImages, setSelectedItemImages] = useState([]);
  const [activeImage, setActiveImage] = useState(FALLBACK_IMG);
  const [proofFiles, setProofFiles] = useState([]);
  const [claimForm, setClaimForm] = useState({
    typedTrackingNumber: "",
    fullName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    message: "",
  });
  const [claimState, setClaimState] = useState({
    loading: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    if (!toast.visible) return;
    const timer = setTimeout(() => {
      setToast({ visible: false, type: "", message: "" });
    }, 5000);
    return () => clearTimeout(timer);
  }, [toast.visible, toast.message, toast.type]);

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

  const isItemProcessing = (item) => {
    if (!item?.id) return false;
    const normalizedStatus = String(item.status || "").toLowerCase();
    return (
      claimedItemIds.has(item.id) ||
      normalizedStatus === "claim_pending" ||
      normalizedStatus === "processing"
    );
  };

  const openClaimModal = (item) => {
    if (!item?.id || isItemProcessing(item)) return;
    const images = [...new Set([item.previewImageUrl, ...toList(item.mediaUrls)].filter(Boolean))];

    setSelectedItem(item);
    setSelectedItemImages(images);
    setActiveImage(images[0] || FALLBACK_IMG);
    setClaimForm({
      typedTrackingNumber: "",
      fullName: "",
      email: "",
      phone: "",
      city: "",
      country: "",
      message: "",
    });
    setProofFiles([]);
    setClaimState({
      loading: false,
      type: "",
      message: "",
    });
    setIsClaimModalOpen(true);
  };

  const closeClaimModal = () => {
    if (claimState.loading) return;
    setIsClaimModalOpen(false);
    setSelectedItem(null);
    setSelectedItemImages([]);
    setActiveImage(FALLBACK_IMG);
  };

  const removeBrokenImage = (badUrl) => {
    if (!badUrl) return;
    setSelectedItemImages((prev) => {
      const next = prev.filter((url) => url !== badUrl);
      if (activeImage === badUrl) {
        setActiveImage(next[0] || FALLBACK_IMG);
      }
      return next;
    });
  };

  const handleClaimChange = (event) => {
    const { name, value } = event.target;
    setClaimForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitClaim = async (event) => {
    event.preventDefault();

    if (!selectedItem?.id) {
      setClaimState({
        loading: false,
        type: "error",
        message: "No selected item found for this claim.",
      });
      return;
    }

    const typedTrackingNumber = claimForm.typedTrackingNumber.trim();
    const payload = {
      fullName: claimForm.fullName.trim(),
      email: claimForm.email.trim(),
      phone: claimForm.phone.trim(),
      city: claimForm.city.trim(),
      country: claimForm.country.trim(),
      message: claimForm.message.trim(),
    };

    if (
      !typedTrackingNumber ||
      !payload.fullName ||
      !payload.email ||
      !payload.phone ||
      !payload.city ||
      !payload.country ||
      !payload.message
    ) {
      setClaimState({
        loading: false,
        type: "error",
        message: "Typed tracking number and all claim fields are required.",
      });
      return;
    }

    if (!EMAIL_PATTERN.test(payload.email)) {
      setClaimState({
        loading: false,
        type: "error",
        message: "Please enter a valid email for the claim contact.",
      });
      return;
    }

    if (proofFiles.length === 0) {
      setClaimState({
        loading: false,
        type: "error",
        message: "Attach at least one proof file before submitting your claim.",
      });
      return;
    }

    if (proofFiles.length > MAX_CLAIM_PROOF_FILES) {
      setClaimState({
        loading: false,
        type: "error",
        message: `You can upload up to ${MAX_CLAIM_PROOF_FILES} proof files.`,
      });
      return;
    }

    try {
      setClaimState({ loading: true, type: "", message: "" });

      let uploadToken = "";
      const proofR2Keys = [];

      for (const file of proofFiles) {
        const presignPayload = {
          originalFileName: file.name,
          contentType: file.type || "application/octet-stream",
          ...(uploadToken ? { uploadToken } : {}),
        };

        const presignResponse = await publicApi.presignGalleryClaimUpload(presignPayload);
        const uploadMeta = resolveUploadMetadata(presignResponse);

        if (!uploadMeta.uploadToken) {
          throw new Error("Missing upload token from presign response.");
        }

        if (!uploadToken) {
          uploadToken = uploadMeta.uploadToken;
        } else if (uploadMeta.uploadToken !== uploadToken) {
          throw new Error("Upload session mismatch while preparing proof files.");
        }

        await uploadClaimFile(file, uploadMeta);

        if (uploadMeta.r2Key) {
          proofR2Keys.push(uploadMeta.r2Key);
        }
      }

      if (!uploadToken || proofR2Keys.length === 0) {
        throw new Error("Proof uploads are incomplete. Please re-upload and try again.");
      }

      const claimResponse = await publicApi.submitAnonymousGalleryClaim(
        typedTrackingNumber,
        {
          itemId: selectedItem.id,
          ...payload,
          uploadToken,
          proofR2Keys,
        }
      );

      const claimData = unwrapData(claimResponse);
      const ticketNumber = claimData?.ticket?.ticketNumber;
      const claimId = claimData?.claim?.id;
      const claimedItemId = claimData?.item?.id || claimData?.claim?.itemId || selectedItem.id;
      const successMessage = ticketNumber
        ? `Claim submitted. Ticket: ${ticketNumber}${claimId ? ` • Claim ID: ${claimId}` : ""}.`
        : "Claim submitted successfully. Our team will contact you shortly.";

      if (claimedItemId) {
        setClaimedItemIds((prev) => {
          const next = new Set(prev);
          next.add(claimedItemId);
          return next;
        });
      }
      setToast({
        visible: true,
        type: "success",
        message: successMessage,
      });

      setClaimForm({
        typedTrackingNumber: "",
        fullName: "",
        email: "",
        phone: "",
        city: "",
        country: "",
        message: "",
      });
      setProofFiles([]);
      setClaimState({ loading: false, type: "", message: "" });
      closeClaimModal();
    } catch (error) {
      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "";

      const isTrackingMismatch =
        error?.response?.status === 422 &&
        backendMessage
          .toLowerCase()
          .includes("tracking number does not match the selected gallery item");

      setClaimState({
        loading: false,
        type: "error",
        message: isTrackingMismatch
          ? "Tracking number does not match selected item. Please recheck and try again."
          : formatApiError(
              error,
              "Could not submit your claim right now. Please try again."
            ),
      });
    }
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
            <>
              <SkeletonCards />
              <SkeletonTable />
            </>
          )}

          {!loading && galleryError && (
            <p className="mt-4 text-sm text-red-500">{galleryError}</p>
          )}

          {!loading && !galleryError && anonymousGoods.length === 0 && (
            <p className="mt-4 text-sm text-[color:var(--text-muted)]">
              No anonymous goods are available right now.
            </p>
          )}

          {!loading && !galleryError && anonymousGoods.length > 0 && (
            <>
              <div className="mt-4 space-y-3 md:hidden">
                {paginatedAnonymousGoods.map((item) => (
                  (() => {
                    const processing = isItemProcessing(item);
                    return (
                  <article
                    key={item.id}
                    onClick={() => {
                      if (!processing) {
                        openClaimModal(item);
                      }
                    }}
                    className={`rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 ${
                      processing ? "cursor-default" : "cursor-pointer"
                    }`}
                  >
                    <p className="text-xs text-[color:var(--text-muted)]">Tracking Number</p>
                    <p className="text-sm font-semibold text-[color:var(--accent)] mt-1">
                      {item.trackingNumberMasked || "-"}
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
                        if (!processing) {
                          openClaimModal(item);
                        }
                      }}
                      className={`mt-4 text-xs px-3 py-1.5 rounded-md ${
                        processing
                          ? "bg-amber-100 text-amber-700 cursor-default"
                          : "bg-[color:var(--accent)] text-[color:var(--accent-contrast)] hover:bg-[color:var(--accent-hover)]"
                      }`}
                      disabled={!item.id || processing}
                    >
                      {processing ? "Processing" : "Claim"}
                    </button>
                  </article>
                    );
                  })()
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
                      (() => {
                        const processing = isItemProcessing(item);
                        return (
                      <tr
                        key={item.id}
                        className={`border-t border-[color:var(--border)] ${
                          processing ? "" : "hover:bg-white/20 cursor-pointer"
                        }`}
                        onClick={() => {
                          if (!processing) {
                            openClaimModal(item);
                          }
                        }}
                      >
                        <td className="px-4 py-3 font-semibold text-[color:var(--accent)]">
                          {item.trackingNumberMasked || "-"}
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
                              if (!processing) {
                                openClaimModal(item);
                              }
                            }}
                            className={`text-xs px-3 py-1.5 rounded-md ${
                              processing
                                ? "bg-amber-100 text-amber-700 cursor-default"
                                : "bg-[color:var(--accent)] text-[color:var(--accent-contrast)] hover:bg-[color:var(--accent-hover)]"
                            }`}
                            disabled={!item.id || processing}
                          >
                            {processing ? "Processing" : "Claim"}
                          </button>
                        </td>
                      </tr>
                        );
                      })()
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
                  <SafeImage
                    src={advert.imageUrl}
                    alt={advert.title}
                    wrapperClassName="w-full h-40 bg-black/10"
                    className="w-full h-40 object-cover"
                  />
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

      {isClaimModalOpen && selectedItem && (
        <div
          className="fixed inset-0 z-[90] bg-black/45 backdrop-blur-[2px] flex items-center justify-center p-4"
          onClick={closeClaimModal}
          role="presentation"
        >
          <div
            className="w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 sm:p-6"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Anonymous goods claim form"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold">Claim Anonymous Goods</h3>
                <p className="mt-2 text-sm text-[color:var(--text-muted)]">
                  Type the full tracking number and submit your ownership claim for this selected item.
                </p>
              </div>
              <button
                type="button"
                onClick={closeClaimModal}
                className="text-2xl leading-none text-[color:var(--text-muted)] hover:text-[color:var(--text)]"
                aria-label="Close claim modal"
              >
                ×
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <section className="rounded-xl p-4">
                <SafeImage
                  src={activeImage}
                  alt={selectedItem.title}
                  wrapperClassName="w-full h-64 rounded-lg bg-black/10"
                  className="w-full h-64 object-contain rounded-lg p-6"
                  onError={() => removeBrokenImage(activeImage)}
                />

                {selectedItemImages.length > 1 && (
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {selectedItemImages.map((url, index) => (
                      <button
                        key={`${url}-${index}`}
                        type="button"
                        onClick={() => setActiveImage(url)}
                        className={`rounded-md overflow-hidden border ${
                          activeImage === url
                            ? "border-[color:var(--accent)]"
                            : "border-[color:var(--border)]"
                        }`}
                        aria-label={`View image ${index + 1}`}
                      >
                        <SafeImage
                          src={url}
                          alt={`${selectedItem.title} ${index + 1}`}
                          wrapperClassName="w-full h-16 bg-black/10"
                          className="w-full h-16 object-cover"
                          onError={() => removeBrokenImage(url)}
                        />
                      </button>
                    ))}
                  </div>
                )}

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between gap-3">
                    <span className="text-[color:var(--text-muted)]">Tracking Number</span>
                    <span className="font-semibold text-right">
                      {selectedItem.trackingNumberMasked || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-[color:var(--text-muted)]">Title</span>
                    <span className="font-semibold text-right">{selectedItem.title}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-[color:var(--text-muted)]">Status</span>
                    <span className="font-semibold text-right">{formatStatus(selectedItem.status)}</span>
                  </div>
                  <div>
                    <p className="text-[color:var(--text-muted)]">Description</p>
                    <p className="mt-1">{selectedItem.description || "No description provided."}</p>
                  </div>
                </div>
              </section>

              <section className="rounded-xl border border-[color:var(--border)] p-4">
                <form onSubmit={handleSubmitClaim} className="space-y-4">
                  <div>
                    <label
                      htmlFor="claim-typed-tracking"
                      className="block text-sm font-medium text-[color:var(--text)] mb-1"
                    >
                      Full Tracking Number
                    </label>
                    <input
                      id="claim-typed-tracking"
                      name="typedTrackingNumber"
                      value={claimForm.typedTrackingNumber}
                      onChange={handleClaimChange}
                      placeholder="Type full tracking number"
                      className="w-full px-4 py-3 rounded-md border border-[color:var(--border)] bg-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="claim-full-name"
                      className="block text-sm font-medium text-[color:var(--text)] mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      id="claim-full-name"
                      name="fullName"
                      value={claimForm.fullName}
                      onChange={handleClaimChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-md border border-[color:var(--border)] bg-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="claim-email"
                      className="block text-sm font-medium text-[color:var(--text)] mb-1"
                    >
                      Email
                    </label>
                    <input
                      id="claim-email"
                      name="email"
                      value={claimForm.email}
                      onChange={handleClaimChange}
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-md border border-[color:var(--border)] bg-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="claim-phone"
                      className="block text-sm font-medium text-[color:var(--text)] mb-1"
                    >
                      Phone
                    </label>
                    <input
                      id="claim-phone"
                      name="phone"
                      value={claimForm.phone}
                      onChange={handleClaimChange}
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 rounded-md border border-[color:var(--border)] bg-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="claim-city"
                      className="block text-sm font-medium text-[color:var(--text)] mb-1"
                    >
                      City
                    </label>
                    <input
                      id="claim-city"
                      name="city"
                      value={claimForm.city}
                      onChange={handleClaimChange}
                      placeholder="Enter your city"
                      className="w-full px-4 py-3 rounded-md border border-[color:var(--border)] bg-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="claim-country"
                      className="block text-sm font-medium text-[color:var(--text)] mb-1"
                    >
                      Country
                    </label>
                    <input
                      id="claim-country"
                      name="country"
                      value={claimForm.country}
                      onChange={handleClaimChange}
                      placeholder="Enter your country"
                      className="w-full px-4 py-3 rounded-md border border-[color:var(--border)] bg-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="claim-message"
                      className="block text-sm font-medium text-[color:var(--text)] mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="claim-message"
                      name="message"
                      value={claimForm.message}
                      onChange={handleClaimChange}
                      rows={3}
                      placeholder="Tell us why this item is yours"
                      className="w-full px-4 py-3 rounded-md border border-[color:var(--border)] bg-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="claim-proof-files"
                      className="block text-sm font-medium text-[color:var(--text)] mb-1"
                    >
                      Proof Files
                    </label>
                    <input
                      id="claim-proof-files"
                      type="file"
                      multiple
                      onChange={(event) =>
                        setProofFiles(
                          Array.from(event.target.files || []).slice(0, MAX_CLAIM_PROOF_FILES)
                        )
                      }
                      className="w-full text-sm"
                    />
                  </div>
                  {proofFiles.length > 0 && (
                    <p className="text-xs text-[color:var(--text-muted)]">
                      {proofFiles.length} proof file{proofFiles.length > 1 ? "s" : ""} selected.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={claimState.loading}
                    className="w-full bg-[color:var(--accent)] text-[color:var(--accent-contrast)] font-semibold py-3 rounded-md hover:bg-[color:var(--accent-hover)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {claimState.loading ? "Submitting Claim..." : "Submit Claim"}
                  </button>

                  {claimState.type === "error" && claimState.message && (
                    <p
                      className="text-sm text-red-500"
                    >
                      {claimState.message}
                    </p>
                  )}
                </form>
              </section>
            </div>
          </div>
        </div>
      )}

      {toast.visible && (
        <div className="fixed bottom-5 right-5 z-[95] w-[min(92vw,460px)]">
          <div
            className={`rounded-xl border p-4 shadow-xl ${
              toast.type === "success"
                ? "border-green-200 bg-green-50 text-green-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            <p className="text-sm font-semibold">
              {toast.type === "success" ? "Claim Submitted" : "Error"}
            </p>
            <p className="text-sm mt-1">{toast.message}</p>
          </div>
        </div>
      )}

      <Footer topSpacingClass="mt-14 max-md:mt-10 max-sm:mt-8" />
    </div>
  );
};

export default PublicGallery;
