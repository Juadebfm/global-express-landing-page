import { useEffect, useState } from "react";
import { publicApi } from "../api/publicApi";
import { getUserFacingApiError } from "../api/errorUtils";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { DASHBOARD_URL } from "../constants/siteData";

const MIN_SKELETON_MS = 500;
const skeletonClass =
  "animate-pulse rounded-full bg-[#cfcfcf] dark:bg-[#bdbdbd]";
const skeletonBlockClass = "animate-pulse bg-[#d7d7d7]";

function buildClaimSignInUrl(item) {
  const nextUrl = new URL("/gallery", `${DASHBOARD_URL.replace(/\/$/, "")}/`);
  nextUrl.searchParams.set("intent", "claim");
  nextUrl.searchParams.set("itemId", item.id);
  nextUrl.searchParams.set("source", "landing-claim");

  const signInUrl = new URL("/sign-in", `${DASHBOARD_URL.replace(/\/$/, "")}/`);
  signInUrl.searchParams.set("next", `${nextUrl.pathname}${nextUrl.search}`);

  return signInUrl.toString();
}

function PackageRow({ item }) {
  const displayTitle = item.title.replace(/^Unclaimed\s+/i, "");

  return (
    <tr className="border-t border-[color:var(--border)] align-middle transition-colors hover:bg-[color:var(--surface-2)]/40">
      <td className="border-r border-[color:var(--border)] px-4 py-3">
        {item.previewImageUrl ? (
          <img
            src={item.previewImageUrl}
            alt={item.title}
            className="h-12 w-12 rounded-md border border-[color:var(--border)] object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[color:var(--muted)] text-[10px] text-[color:var(--text-muted)]">
            No image
          </div>
        )}
      </td>
      <td className="border-r border-[color:var(--border)] px-4 py-3 pr-6">
        <p className="text-[15px] font-semibold leading-tight text-[color:var(--text)]">
          {displayTitle}
        </p>
      </td>
      <td className="border-r border-[color:var(--border)] px-4 py-3 whitespace-nowrap">
        <p className="text-sm font-medium tabular-nums leading-none text-[color:var(--text)]">
          {item.trackingNumberMasked || "Hidden"}
        </p>
      </td>
      <td className="px-4 py-3">
        <button
          onClick={() => {
            window.location.href = buildClaimSignInUrl(item);
          }}
          className="whitespace-nowrap rounded-md bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold leading-none text-white hover:opacity-90"
        >
          Claim
        </button>
      </td>
    </tr>
  );
}

function PackageTableSkeletonRow() {
  return (
    <tr className="border-t border-[color:var(--border)] align-middle">
      <td className="border-r border-[color:var(--border)] px-4 py-3">
        <div className={`h-12 w-12 rounded-md ${skeletonBlockClass}`} />
      </td>
      <td className="border-r border-[color:var(--border)] px-4 py-3 pr-6">
        <div className="space-y-2">
          <div className={`h-4 w-52 ${skeletonClass}`} />
          <div className={`h-3 w-32 ${skeletonClass}`} />
        </div>
      </td>
      <td className="border-r border-[color:var(--border)] px-4 py-3">
        <div className={`h-4 w-28 ${skeletonClass}`} />
      </td>
      <td className="px-4 py-3">
        <div className={`h-9 w-20 rounded-md ${skeletonBlockClass}`} />
      </td>
    </tr>
  );
}

function PackageTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]">
      <div className="border-b border-[color:var(--border)] px-4 py-4">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-xl font-semibold text-[color:var(--text)]">
            Unclaimed packages
          </p>
          <span className="rounded-full bg-[#d7d7d7] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--text-muted)] animate-pulse">
            Loading
          </span>
        </div>
        <div className={`mt-2 h-4 w-full max-w-md ${skeletonClass}`} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-left">
          <thead className="bg-[color:var(--surface-2)]">
            <tr className="text-xs uppercase tracking-[0.12em] text-[color:var(--text-muted)]">
              <th className="w-24 border-r border-[color:var(--border)] px-4 py-3 font-semibold">
                Image
              </th>
              <th className="w-[44%] border-r border-[color:var(--border)] px-4 py-3 font-semibold">
                Package
              </th>
              <th className="w-40 border-r border-[color:var(--border)] px-4 py-3 font-semibold">
                Tracking
              </th>
              <th className="w-28 px-4 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, index) => (
              <PackageTableSkeletonRow key={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ClaimPackage() {
  const [anonymousGoods, setAnonymousGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const startedAt = Date.now();
    let cancelled = false;
    let timeoutId;

    publicApi
      .getGallery()
      .then((response) => {
        if (!cancelled) {
          setAnonymousGoods(response?.data?.anonymousGoods ?? []);
        }
      })
      .catch((requestError) => {
        if (!cancelled) {
          setError(
            getUserFacingApiError(
              requestError,
              "Failed to load packages awaiting claim."
            )
          );
        }
      })
      .finally(() => {
        const elapsed = Date.now() - startedAt;
        const remaining = Math.max(0, MIN_SKELETON_MS - elapsed);

        timeoutId = window.setTimeout(() => {
          if (!cancelled) {
            setLoading(false);
          }
        }, remaining);
      });

    return () => {
      cancelled = true;
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div className="min-h-screen text-[color:var(--text)]">
      <Header />

      <section className="page-shell pb-12 pt-32 max-sm:pt-24">
        <div className="page-frame">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">
            Claim a Package
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold max-sm:text-2xl">
            Check unclaimed packages and sign in if one belongs to you
          </h1>
          <p className="mt-3 max-w-2xl text-[color:var(--text-muted)] max-sm:text-sm">
            This page is only for ownership recovery. If you recognise a package,
            sign in and submit your shipping mark and any proof that helps our
            team confirm it is yours.
          </p>
        </div>
      </section>

      <section className="page-shell pb-24">
        <div className="page-frame">
          <div className="mb-8 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
            <h2 className="text-xl font-semibold">How it works</h2>
            <div className="mt-3 grid gap-3 text-sm text-[color:var(--text-muted)] md:grid-cols-3">
              <div className="rounded-xl bg-[color:var(--muted)] p-4">
                1. Browse the visible package details and images.
              </div>
              <div className="rounded-xl bg-[color:var(--muted)] p-4">
                2. Sign in to the customer dashboard if you recognise one.
              </div>
              <div className="rounded-xl bg-[color:var(--muted)] p-4">
                3. Submit your shipping mark and proof for staff review.
              </div>
            </div>
          </div>
        </div>

        <div className="page-frame">
          {loading && <PackageTableSkeleton />}

          {error && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          {!loading && !error && anonymousGoods.length > 0 && (
            <div className="overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]">
              <div className="border-b border-[color:var(--border)] px-4 py-4">
                <h2 className="text-xl font-semibold text-[color:var(--text)]">
                  Unclaimed packages
                </h2>
                <p className="mt-1 text-sm text-[color:var(--text-muted)]">
                  Review the visible details below and sign in only if an item
                  looks like yours.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full table-fixed text-left">
                  <thead className="bg-[color:var(--surface-2)]">
                    <tr className="text-xs uppercase tracking-[0.12em] text-[color:var(--text-muted)]">
                      <th className="w-24 border-r border-[color:var(--border)] px-4 py-3 font-semibold">
                        Image
                      </th>
                      <th className="w-[44%] border-r border-[color:var(--border)] px-4 py-3 font-semibold">
                        Package
                      </th>
                      <th className="w-40 border-r border-[color:var(--border)] px-4 py-3 font-semibold">
                        Tracking
                      </th>
                      <th className="w-28 px-4 py-3 font-semibold">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {anonymousGoods.map((item) => (
                      <PackageRow key={item.id} item={item} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {!loading && !error && anonymousGoods.length === 0 && (
            <div className="py-24 text-center text-[color:var(--text-muted)]">
              <p className="text-lg">
                There are no packages awaiting claim right now.
              </p>
              <p className="mt-1 text-sm">
                If you need help locating a shipment, contact our team directly.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer topSpacingClass="mt-24 max-md:mt-20 max-sm:mt-16" />
    </div>
  );
}
