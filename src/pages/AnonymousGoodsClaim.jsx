import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { publicApi } from "../api/publicApi";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_CLAIM_PROOF_FILES = 5;

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
  return date.toLocaleString();
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

const AnonymousGoodsClaim = () => {
  const { trackingNumber: routeTrackingNumber } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const decodedTrackingNumber = decodeURIComponent(routeTrackingNumber || "").trim();

  const [loadingItem, setLoadingItem] = useState(true);
  const [itemError, setItemError] = useState("");
  const [item, setItem] = useState(location.state?.item || null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    message: "",
  });
  const [proofFiles, setProofFiles] = useState([]);
  const [submitState, setSubmitState] = useState({
    loading: false,
    type: "",
    message: "",
  });

  const displayMedia = useMemo(() => {
    if (!item) return [];
    if (item.previewImageUrl && item.mediaUrls.length === 0) {
      return [item.previewImageUrl];
    }
    return item.previewImageUrl
      ? [item.previewImageUrl, ...item.mediaUrls.filter((url) => url !== item.previewImageUrl)]
      : item.mediaUrls;
  }, [item]);

  useEffect(() => {
    let mounted = true;

    const loadItem = async () => {
      if (item?.trackingNumber) {
        setLoadingItem(false);
        return;
      }

      setLoadingItem(true);
      setItemError("");

      try {
        const galleryResponse = await publicApi.getGallery(100);
        const anonymousGoods = normalizeAnonymousGoods(galleryResponse);
        const found = anonymousGoods.find(
          (entry) => entry.trackingNumber.toLowerCase() === decodedTrackingNumber.toLowerCase()
        );

        if (!mounted) return;

        if (!found) {
          setItemError("Anonymous goods item not found.");
          setItem(null);
        } else {
          setItem(found);
        }
      } catch (error) {
        if (!mounted) return;
        setItemError(formatApiError(error, "Unable to load anonymous goods details right now."));
      } finally {
        if (mounted) {
          setLoadingItem(false);
        }
      }
    };

    loadItem();

    return () => {
      mounted = false;
    };
  }, [decodedTrackingNumber, item?.trackingNumber]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!item?.trackingNumber) {
      setSubmitState({
        loading: false,
        type: "error",
        message: "Missing tracking number for this claim.",
      });
      return;
    }

    const payload = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      city: form.city.trim(),
      country: form.country.trim(),
      message: form.message.trim(),
    };

    if (
      !payload.fullName ||
      !payload.email ||
      !payload.phone ||
      !payload.city ||
      !payload.country ||
      !payload.message
    ) {
      setSubmitState({
        loading: false,
        type: "error",
        message: "All claim fields are required.",
      });
      return;
    }

    if (!EMAIL_PATTERN.test(payload.email)) {
      setSubmitState({
        loading: false,
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    if (proofFiles.length === 0) {
      setSubmitState({
        loading: false,
        type: "error",
        message: "Attach at least one proof file before submitting your claim.",
      });
      return;
    }

    if (proofFiles.length > MAX_CLAIM_PROOF_FILES) {
      setSubmitState({
        loading: false,
        type: "error",
        message: `You can upload up to ${MAX_CLAIM_PROOF_FILES} proof files.`,
      });
      return;
    }

    try {
      setSubmitState({ loading: true, type: "", message: "" });

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

      const claimResponse = await publicApi.submitAnonymousGalleryClaim(item.trackingNumber, {
        ...payload,
        uploadToken,
        proofR2Keys,
      });

      const claimData = unwrapData(claimResponse);
      const ticketNumber = claimData?.ticket?.ticketNumber;
      const claimId = claimData?.claim?.id;

      setSubmitState({
        loading: false,
        type: "success",
        message: ticketNumber
          ? `Claim submitted. Ticket: ${ticketNumber}${claimId ? ` • Claim ID: ${claimId}` : ""}.`
          : "Claim submitted successfully. Our team will contact you shortly.",
      });

      setForm({
        fullName: "",
        email: "",
        phone: "",
        city: "",
        country: "",
        message: "",
      });
      setProofFiles([]);
    } catch (error) {
      setSubmitState({
        loading: false,
        type: "error",
        message: formatApiError(error, "Could not submit your claim right now. Please try again."),
      });
    }
  };

  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
      <Header />
      <main className="pt-24 lg:pt-20 max-sm:pt-16 px-4 sm:px-8 lg:px-16 pb-0">
        <div className="flex items-center justify-between gap-3 mb-6">
          <h1 className="text-2xl font-bold">Anonymous Goods Claim</h1>
          <button
            type="button"
            onClick={() => navigate("/gallery")}
            className="text-sm px-4 py-2 rounded-lg border border-[color:var(--border)] hover:bg-white/10 transition-colors"
          >
            Back to Gallery
          </button>
        </div>

        {loadingItem && <p className="text-sm text-[color:var(--text-muted)]">Loading item details...</p>}
        {itemError && <p className="text-sm text-red-500">{itemError}</p>}

        {!loadingItem && !itemError && item && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <section className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
              <h2 className="text-lg font-semibold">Goods Details</h2>
              {displayMedia.length > 0 ? (
                <img
                  src={displayMedia[0]}
                  alt={item.title}
                  className="w-full h-[320px] object-cover rounded-lg mt-4"
                />
              ) : (
                <div className="w-full h-[320px] bg-black/10 rounded-lg mt-4 flex items-center justify-center text-sm text-[color:var(--text-muted)]">
                  Image unavailable
                </div>
              )}

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-[color:var(--text-muted)]">Tracking Number</span>
                  <span className="font-semibold text-right">{item.trackingNumber || "-"}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-[color:var(--text-muted)]">Title</span>
                  <span className="font-semibold text-right">{item.title}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-[color:var(--text-muted)]">Status</span>
                  <span className="font-semibold text-right">{item.status || "-"}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-[color:var(--text-muted)]">Updated At</span>
                  <span className="font-semibold text-right">{formatDate(item.updatedAt)}</span>
                </div>
                <div>
                  <p className="text-[color:var(--text-muted)]">Description</p>
                  <p className="mt-1">{item.description || "No description provided."}</p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
              <h2 className="text-lg font-semibold">Claim Form</h2>
              <p className="mt-2 text-sm text-[color:var(--text-muted)]">
                Fill your details and upload proof files (1 to {MAX_CLAIM_PROOF_FILES}) to claim this goods item.
              </p>

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <input
                  value={item.trackingNumber || ""}
                  readOnly
                  className="w-full px-4 py-3 rounded-md border border-[color:var(--border)] bg-gray-100/60 text-sm"
                />
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="w-full px-4 py-3 rounded-md border border-[color:var(--border)] bg-transparent"
                />
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-md border border-[color:var(--border)] bg-transparent"
                />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="w-full px-4 py-3 rounded-md border border-[color:var(--border)] bg-transparent"
                />
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full px-4 py-3 rounded-md border border-[color:var(--border)] bg-transparent"
                />
                <input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="Country"
                  className="w-full px-4 py-3 rounded-md border border-[color:var(--border)] bg-transparent"
                />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Message"
                  className="w-full px-4 py-3 rounded-md border border-[color:var(--border)] bg-transparent"
                />
                <input
                  type="file"
                  multiple
                  onChange={(event) =>
                    setProofFiles(
                      Array.from(event.target.files || []).slice(0, MAX_CLAIM_PROOF_FILES)
                    )
                  }
                  className="w-full text-sm"
                />
                {proofFiles.length > 0 && (
                  <p className="text-xs text-[color:var(--text-muted)]">
                    {proofFiles.length} proof file{proofFiles.length > 1 ? "s" : ""} selected.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitState.loading}
                  className="w-full bg-[color:var(--accent)] text-[color:var(--accent-contrast)] font-semibold py-3 rounded-md hover:bg-[color:var(--accent-hover)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitState.loading ? "Submitting Claim..." : "Submit Claim"}
                </button>

                {submitState.message && (
                  <p
                    className={`text-sm ${
                      submitState.type === "success" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {submitState.message}
                  </p>
                )}
              </form>
            </section>
          </div>
        )}
      </main>
      <Footer topSpacingClass="mt-14 max-md:mt-10 max-sm:mt-8" />
    </div>
  );
};

export default AnonymousGoodsClaim;
