import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { publicApi } from "../api/publicApi";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const hasValue = (value) => value !== null && value !== undefined && value !== "";

const unwrapData = (payload) => payload?.data || payload || {};

const toList = (value) => (Array.isArray(value) ? value : []);

const toSectionLabel = (key = "") =>
  key
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());

const normalizeGalleryItem = (item) => {
  const trackingNumber =
    item?.trackingNumber ||
    item?.shipmentTrackingNumber ||
    item?.orderTrackingNumber ||
    item?.tracking_no ||
    "";

  const imageUrl =
    item?.imageUrl ||
    item?.coverImageUrl ||
    item?.photoUrl ||
    item?.publicUrl ||
    item?.thumbnailUrl ||
    item?.media?.[0]?.url ||
    "";

  const title =
    item?.title ||
    item?.name ||
    item?.carName ||
    item?.displayName ||
    (trackingNumber ? `Shipment ${trackingNumber}` : "Gallery Item");

  const subtitle =
    item?.subtitle ||
    item?.description ||
    item?.statusLabel ||
    item?.status ||
    item?.origin ||
    "";

  return {
    id: item?.id || item?._id || `${trackingNumber}-${title}`,
    trackingNumber,
    title,
    subtitle,
    imageUrl,
  };
};

const normalizeGallerySections = (payload) => {
  const data = unwrapData(payload);
  const sectionSource = data?.sections || data?.items || data?.gallery || data;

  if (Array.isArray(sectionSource)) {
    return [
      {
        key: "featured",
        label: "Featured",
        items: sectionSource.map(normalizeGalleryItem),
      },
    ];
  }

  if (sectionSource && typeof sectionSource === "object") {
    return Object.entries(sectionSource)
      .map(([key, value]) => ({
        key,
        label: toSectionLabel(key),
        items: toList(value).map(normalizeGalleryItem),
      }))
      .filter((section) => section.items.length > 0);
  }

  return [];
};

const normalizeAdverts = (payload) => {
  const data = unwrapData(payload);
  const source =
    data?.items || data?.adverts || data?.results || data?.data || data;

  return toList(source).map((item, index) => ({
    id: item?.id || item?._id || `advert-${index}`,
    title: item?.title || item?.name || "Featured Advert",
    text: item?.description || item?.caption || "",
    imageUrl:
      item?.imageUrl ||
      item?.publicUrl ||
      item?.bannerUrl ||
      item?.media?.[0]?.url ||
      "",
    ctaLabel: item?.ctaLabel || item?.buttonLabel || "Learn More",
    ctaUrl: item?.ctaUrl || item?.targetUrl || "",
  }));
};

const resolveUploadMetadata = (payload) => {
  const data = unwrapData(payload);
  return {
    uploadUrl: data?.uploadUrl || data?.url || data?.presignedUrl || "",
    method: String(data?.method || "PUT").toUpperCase(),
    uploadToken: data?.uploadToken || data?.token || "",
    r2Key: data?.r2Key || data?.key || data?.objectKey || "",
    publicUrl: data?.publicUrl || data?.fileUrl || "",
    headers: data?.headers && typeof data.headers === "object" ? data.headers : {},
    fields: data?.fields && typeof data.fields === "object" ? data.fields : null,
  };
};

const formatApiError = (error, fallbackMessage) =>
  error.response?.data?.message ||
  error.response?.data?.error ||
  fallbackMessage;

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

const PublicGallery = () => {
  const [loading, setLoading] = useState(true);
  const [galleryError, setGalleryError] = useState("");
  const [galleryResponse, setGalleryResponse] = useState(null);
  const [advertsResponse, setAdvertsResponse] = useState(null);
  const [claimUploadMeta, setClaimUploadMeta] = useState(null);

  const [claimForm, setClaimForm] = useState({
    trackingNumber: "",
    fullName: "",
    email: "",
    phone: "",
    details: "",
  });
  const [proofFile, setProofFile] = useState(null);
  const [claimState, setClaimState] = useState({
    loading: false,
    type: "",
    message: "",
  });

  const [purchaseForm, setPurchaseForm] = useState({
    trackingNumber: "",
    fullName: "",
    email: "",
    phone: "",
    offerAmountUsd: "",
    notes: "",
  });
  const [purchaseState, setPurchaseState] = useState({
    loading: false,
    type: "",
    message: "",
  });
  const [activeFormModal, setActiveFormModal] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadGalleryData = async () => {
      setLoading(true);
      setGalleryError("");
      try {
        const [galleryResult, advertsResult] = await Promise.all([
          publicApi.getGallery(12),
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

  const gallerySections = useMemo(
    () => normalizeGallerySections(galleryResponse),
    [galleryResponse]
  );

  const adverts = useMemo(
    () => normalizeAdverts(advertsResponse),
    [advertsResponse]
  );

  const handleClaimChange = (event) => {
    const { name, value } = event.target;
    setClaimForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePurchaseChange = (event) => {
    const { name, value } = event.target;
    setPurchaseForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitClaimWithFallbackPayloads = async (trackingNumber, uploadMeta) => {
    const payloads = [
      {
        fullName: claimForm.fullName.trim(),
        email: claimForm.email.trim(),
        phone: claimForm.phone.trim(),
        details: claimForm.details.trim(),
        uploadToken: uploadMeta.uploadToken,
        proofR2Keys: uploadMeta.r2Key ? [uploadMeta.r2Key] : [],
      },
      {
        name: claimForm.fullName.trim(),
        email: claimForm.email.trim(),
        phone: claimForm.phone.trim(),
        message: claimForm.details.trim(),
        uploadToken: uploadMeta.uploadToken,
        proofR2Keys: uploadMeta.r2Key ? [uploadMeta.r2Key] : [],
      },
    ];

    let lastError;
    for (const payload of payloads) {
      try {
        return await publicApi.submitAnonymousGalleryClaim(trackingNumber, payload);
      } catch (error) {
        lastError = error;
        if (error.response?.status !== 400 && error.response?.status !== 422) {
          throw error;
        }
      }
    }
    throw lastError;
  };

  const handleSubmitClaim = async (event) => {
    event.preventDefault();

    const trackingNumber = claimForm.trackingNumber.trim();
    const fullName = claimForm.fullName.trim();
    const email = claimForm.email.trim();
    const details = claimForm.details.trim();

    if (!trackingNumber || !fullName || !email || !details) {
      setClaimState({
        loading: false,
        type: "error",
        message: "Tracking number, name, email, and claim details are required.",
      });
      return;
    }

    if (!EMAIL_PATTERN.test(email)) {
      setClaimState({
        loading: false,
        type: "error",
        message: "Please enter a valid email for the claim contact.",
      });
      return;
    }

    if (!proofFile) {
      setClaimState({
        loading: false,
        type: "error",
        message: "Attach a proof file before submitting your claim.",
      });
      return;
    }

    try {
      setClaimState({ loading: true, type: "", message: "" });

      const presignPayload = {
        fileName: proofFile.name,
        contentType: proofFile.type || "application/octet-stream",
        sizeBytes: proofFile.size,
      };

      const presignResponse = await publicApi.presignGalleryClaimUpload(presignPayload);
      const uploadMeta = resolveUploadMetadata(presignResponse);

      if (!uploadMeta.uploadToken) {
        throw new Error("Missing upload token from presign response.");
      }

      await uploadClaimFile(proofFile, uploadMeta);
      setClaimUploadMeta(uploadMeta);

      await submitClaimWithFallbackPayloads(trackingNumber, uploadMeta);

      setClaimForm({
        trackingNumber: "",
        fullName: "",
        email: "",
        phone: "",
        details: "",
      });
      setProofFile(null);
      setClaimState({
        loading: false,
        type: "success",
        message: "Claim submitted successfully. Our team will contact you shortly.",
      });
    } catch (error) {
      setClaimState({
        loading: false,
        type: "error",
        message: formatApiError(
          error,
          "Could not submit your claim right now. Please try again."
        ),
      });
    }
  };

  const submitPurchaseWithFallbackPayloads = async (trackingNumber) => {
    const payloads = [
      {
        fullName: purchaseForm.fullName.trim(),
        email: purchaseForm.email.trim(),
        phone: purchaseForm.phone.trim(),
        offerAmountUsd: Number(purchaseForm.offerAmountUsd),
        notes: purchaseForm.notes.trim(),
      },
      {
        name: purchaseForm.fullName.trim(),
        email: purchaseForm.email.trim(),
        phone: purchaseForm.phone.trim(),
        offerAmount: Number(purchaseForm.offerAmountUsd),
        message: purchaseForm.notes.trim(),
      },
    ];

    let lastError;
    for (const payload of payloads) {
      try {
        return await publicApi.submitCarPurchaseAttempt(trackingNumber, payload);
      } catch (error) {
        lastError = error;
        if (error.response?.status !== 400 && error.response?.status !== 422) {
          throw error;
        }
      }
    }
    throw lastError;
  };

  const handleSubmitPurchaseAttempt = async (event) => {
    event.preventDefault();
    const trackingNumber = purchaseForm.trackingNumber.trim();
    const fullName = purchaseForm.fullName.trim();
    const email = purchaseForm.email.trim();
    const offerAmountUsd = Number(purchaseForm.offerAmountUsd);

    if (!trackingNumber || !fullName || !email || !hasValue(purchaseForm.offerAmountUsd)) {
      setPurchaseState({
        loading: false,
        type: "error",
        message: "Tracking number, name, email, and offer amount are required.",
      });
      return;
    }

    if (!EMAIL_PATTERN.test(email)) {
      setPurchaseState({
        loading: false,
        type: "error",
        message: "Please enter a valid email for the purchase attempt.",
      });
      return;
    }

    if (!Number.isFinite(offerAmountUsd) || offerAmountUsd <= 0) {
      setPurchaseState({
        loading: false,
        type: "error",
        message: "Offer amount must be a valid number greater than zero.",
      });
      return;
    }

    try {
      setPurchaseState({ loading: true, type: "", message: "" });
      await submitPurchaseWithFallbackPayloads(trackingNumber);
      setPurchaseForm({
        trackingNumber: "",
        fullName: "",
        email: "",
        phone: "",
        offerAmountUsd: "",
        notes: "",
      });
      setPurchaseState({
        loading: false,
        type: "success",
        message: "Purchase attempt submitted. Our sales team will follow up soon.",
      });
    } catch (error) {
      setPurchaseState({
        loading: false,
        type: "error",
        message: formatApiError(
          error,
          "Could not submit purchase attempt right now. Please try again."
        ),
      });
    }
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setActiveFormModal(null);
      }
    };

    if (activeFormModal) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [activeFormModal]);

  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
      <Header />
      <main className="pt-24 lg:pt-20 max-sm:pt-16 px-4 sm:px-8 lg:px-16 pb-0">
        <section className="rounded-2xl border border-[color:var(--border)] p-6 sm:p-8 bg-[color:var(--surface)]">
          <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--accent)] font-semibold">
            Public Gallery
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold">
            See Delivered Cargo, Featured Vehicles, and Live Adverts
          </h1>
          <p className="mt-4 max-w-3xl text-[color:var(--text-muted)]">
            Browse recent cargo highlights, submit anonymous ownership claims
            with proof uploads, and register interest in vehicle listings.
          </p>
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-bold">Gallery Collections</h2>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="text-sm px-4 py-2 rounded-lg border border-[color:var(--border)] hover:bg-white/10 transition-colors"
            >
              Refresh
            </button>
          </div>

          {loading && (
            <p className="mt-4 text-sm text-[color:var(--text-muted)]">
              Loading gallery content...
            </p>
          )}

          {galleryError && <p className="mt-4 text-sm text-red-500">{galleryError}</p>}

          {!loading && !galleryError && gallerySections.length === 0 && (
            <p className="mt-4 text-sm text-[color:var(--text-muted)]">
              No gallery items available yet.
            </p>
          )}

          {!loading && !galleryError && gallerySections.length > 0 && (
            <div className="space-y-8 mt-6">
              {gallerySections.map((section) => (
                <div key={section.key} className="space-y-4">
                  <h3 className="text-xl font-semibold">{section.label}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {section.items.map((item) => (
                      <article
                        key={item.id}
                        className="rounded-xl overflow-hidden border border-[color:var(--border)] bg-[color:var(--surface)]"
                      >
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-52 object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-52 bg-black/10 flex items-center justify-center text-sm text-[color:var(--text-muted)]">
                            Image unavailable
                          </div>
                        )}
                        <div className="p-4">
                          <h4 className="font-semibold">{item.title}</h4>
                          {item.subtitle && (
                            <p className="mt-2 text-sm text-[color:var(--text-muted)] line-clamp-2">
                              {item.subtitle}
                            </p>
                          )}
                          {item.trackingNumber && (
                            <p className="mt-3 text-xs text-[color:var(--accent)] font-semibold uppercase tracking-wide">
                              {item.trackingNumber}
                            </p>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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

        <section className="mt-14">
          <h2 className="text-2xl font-bold">Actions</h2>
          <p className="mt-2 text-sm text-[color:var(--text-muted)]">
            Choose what you want to do. The full form will open in a popup.
          </p>

          <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-8">
            <button
              type="button"
              onClick={() => setActiveFormModal("claim")}
              className="text-left rounded-2xl border border-[color:var(--border)] p-8 bg-[color:var(--surface)] hover:border-[color:var(--accent)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-all"
            >
              <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--accent)] font-semibold">
                Ownership
              </p>
              <h3 className="mt-3 text-3xl font-extrabold">Submit Anonymous Claim</h3>
              <p className="mt-4 text-base text-[color:var(--text-muted)]">
                Upload proof and submit claim details tied to your tracking number.
              </p>
              <p className="mt-8 inline-flex items-center text-sm font-semibold text-[color:var(--accent)]">
                Open claim form
              </p>
              {claimState.message && (
                <p
                  className={`mt-3 text-sm ${
                    claimState.type === "success" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {claimState.message}
                </p>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveFormModal("purchase")}
              className="text-left rounded-2xl border border-[color:var(--border)] p-8 bg-[color:var(--surface)] hover:border-[color:var(--accent)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-all"
            >
              <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--accent)] font-semibold">
                Vehicle
              </p>
              <h3 className="mt-3 text-3xl font-extrabold">Car Purchase Attempt</h3>
              <p className="mt-4 text-base text-[color:var(--text-muted)]">
                Register purchase interest for a listed car using tracking number.
              </p>
              <p className="mt-8 inline-flex items-center text-sm font-semibold text-[color:var(--accent)]">
                Open purchase form
              </p>
              {purchaseState.message && (
                <p
                  className={`mt-3 text-sm ${
                    purchaseState.type === "success" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {purchaseState.message}
                </p>
              )}
            </button>
          </div>

          {claimUploadMeta && (
            <div className="mt-4 p-3 rounded-md border border-[color:var(--border)] text-xs space-y-1">
              <p className="font-semibold">Last Uploaded Proof</p>
              <p>Upload Token: {claimUploadMeta.uploadToken}</p>
              {claimUploadMeta.r2Key && <p>R2 Key: {claimUploadMeta.r2Key}</p>}
              {claimUploadMeta.publicUrl && (
                <p className="break-all">Public URL: {claimUploadMeta.publicUrl}</p>
              )}
            </div>
          )}
        </section>
      </main>
      <Footer topSpacingClass="mt-14 max-md:mt-10 max-sm:mt-8" />

      {activeFormModal && (
        <div
          className="fixed inset-0 z-[80] bg-black/45 backdrop-blur-[2px] flex items-center justify-center p-4"
          onClick={() => setActiveFormModal(null)}
          role="presentation"
        >
          <div
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 sm:p-8"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={
              activeFormModal === "claim"
                ? "Submit Anonymous Claim Form"
                : "Car Purchase Attempt Form"
            }
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">
                  {activeFormModal === "claim"
                    ? "Submit Anonymous Claim"
                    : "Car Purchase Attempt"}
                </h2>
                <p className="mt-2 text-sm text-[color:var(--text-muted)]">
                  {activeFormModal === "claim"
                    ? "Upload proof, then submit your claim details with the returned upload token and object key."
                    : "Submit your interest for a listed vehicle using its tracking number."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveFormModal(null)}
                className="text-2xl leading-none text-[color:var(--text-muted)] hover:text-[color:var(--text)]"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            {activeFormModal === "claim" ? (
              <form onSubmit={handleSubmitClaim} className="mt-6 space-y-4">
                <input
                  name="trackingNumber"
                  value={claimForm.trackingNumber}
                  onChange={handleClaimChange}
                  placeholder="Tracking number"
                  className="w-full px-4 py-3 rounded-md border border-[color:var(--border)] bg-transparent"
                />
                <input
                  name="fullName"
                  value={claimForm.fullName}
                  onChange={handleClaimChange}
                  placeholder="Full name"
                  className="w-full px-4 py-3 rounded-md border border-[color:var(--border)] bg-transparent"
                />
                <input
                  name="email"
                  value={claimForm.email}
                  onChange={handleClaimChange}
                  placeholder="Email"
                  type="email"
                  className="w-full px-4 py-3 rounded-md border border-[color:var(--border)] bg-transparent"
                />
                <input
                  name="phone"
                  value={claimForm.phone}
                  onChange={handleClaimChange}
                  placeholder="Phone (optional)"
                  className="w-full px-4 py-3 rounded-md border border-[color:var(--border)] bg-transparent"
                />
                <textarea
                  name="details"
                  value={claimForm.details}
                  onChange={handleClaimChange}
                  placeholder="Claim details"
                  rows={4}
                  className="w-full px-4 py-3 rounded-md border border-[color:var(--border)] bg-transparent"
                />
                <input
                  type="file"
                  onChange={(event) => setProofFile(event.target.files?.[0] || null)}
                  className="w-full text-sm"
                />

                <button
                  type="submit"
                  disabled={claimState.loading}
                  className="w-full bg-[color:var(--accent)] text-[color:var(--accent-contrast)] font-semibold py-3 rounded-md hover:bg-[color:var(--accent-hover)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {claimState.loading ? "Submitting Claim..." : "Submit Claim"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmitPurchaseAttempt} className="mt-6 space-y-4">
                <input
                  name="trackingNumber"
                  value={purchaseForm.trackingNumber}
                  onChange={handlePurchaseChange}
                  placeholder="Car tracking number"
                  className="w-full px-4 py-3 rounded-md border border-[color:var(--border)] bg-transparent"
                />
                <input
                  name="fullName"
                  value={purchaseForm.fullName}
                  onChange={handlePurchaseChange}
                  placeholder="Full name"
                  className="w-full px-4 py-3 rounded-md border border-[color:var(--border)] bg-transparent"
                />
                <input
                  name="email"
                  type="email"
                  value={purchaseForm.email}
                  onChange={handlePurchaseChange}
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-md border border-[color:var(--border)] bg-transparent"
                />
                <input
                  name="phone"
                  value={purchaseForm.phone}
                  onChange={handlePurchaseChange}
                  placeholder="Phone (optional)"
                  className="w-full px-4 py-3 rounded-md border border-[color:var(--border)] bg-transparent"
                />
                <input
                  name="offerAmountUsd"
                  type="number"
                  min="1"
                  step="0.01"
                  value={purchaseForm.offerAmountUsd}
                  onChange={handlePurchaseChange}
                  placeholder="Offer amount (USD)"
                  className="w-full px-4 py-3 rounded-md border border-[color:var(--border)] bg-transparent"
                />
                <textarea
                  name="notes"
                  rows={4}
                  value={purchaseForm.notes}
                  onChange={handlePurchaseChange}
                  placeholder="Notes (optional)"
                  className="w-full px-4 py-3 rounded-md border border-[color:var(--border)] bg-transparent"
                />
                <button
                  type="submit"
                  disabled={purchaseState.loading}
                  className="w-full bg-[color:var(--accent)] text-[color:var(--accent-contrast)] font-semibold py-3 rounded-md hover:bg-[color:var(--accent-hover)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {purchaseState.loading
                    ? "Submitting Purchase Attempt..."
                    : "Submit Purchase Attempt"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicGallery;
