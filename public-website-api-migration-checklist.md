# Public Website API Migration Checklist

Date: 2026-04-22

Use this checklist to migrate the public website to the current backend API contracts.

## 1) Base URL and Routing Strategy

- [x] Confirm canonical backend prefix is `/api/v1/...`.
- [x] Set and verify `VITE_API_BASE_URL` strategy:
  - [x] Option A: `VITE_API_BASE_URL=https://<host>/api/v1` and FE paths like `/auth/login`, `/users/me`.
  - [ ] Option B: `VITE_API_BASE_URL=https://<host>` and FE paths like `/api/v1/auth/login`, `/api/v1/users/me`.
- [x] Remove any double-prefix risk (`/api/api/v1/...`).
- [x] Update `.env.example` with the final expected base URL format.
- [x] Update `README.md` env docs to match the chosen strategy.

## 2) Existing Endpoint Migration (Current FE Usage -> Current Backend)

### Public Calculator + Tracking

- [x] `GET /api/v1/public/calculator/rates` remains active.
  - [x] Confirm FE reads response shape: `data.air`, `data.sea`.
- [x] `POST /api/v1/public/calculator/estimate` remains active with enhanced shape.
  - [x] Ensure request supports `shipmentType`, `weightKg`, `lengthCm`, `widthCm`, `heightCm`, optional `cbm`.
  - [x] Ensure UI handles `d2d` mode where `estimatedCostUsd` can be `null`.
  - [x] Ensure UI can render optional `intake` / `d2dIntake` block.
- [x] `GET /api/v1/orders/track/:trackingNumber` remains active with richer response.
  - [x] Ensure UI uses `statusLabel`, `estimatedDelivery`, `lastUpdate`, `shipmentCost`, `cargoMetrics` when present.
  - [x] Keep handling timeline events from `timeline[]`.
  - [x] Handle intentional `404` for `GEX-MASTER-*` tracking numbers with user-friendly message.

### Auth + User

- [x] `POST /api/v1/auth/login` remains active (internal operator login only).
  - [x] Update FE token extraction to `tokens.accessToken` (not `token`).
  - [x] Keep user extraction from `user`.
- [x] `POST /api/v1/auth/register` now returns Clerk info helper.
  - [x] Remove/avoid legacy registration flow assumptions for customer signup.
- [x] `GET /api/v1/users/me` remains active (auth required).
  - [x] Ensure bearer token is attached.
  - [x] Support new permission flags in profile response.
- [x] `PATCH /api/v1/users/:id` replaces old `PUT /users/:userId`.
  - [x] Change method from `PUT` to `PATCH`.
  - [x] Keep payload partial (all fields optional).
  - [x] Update path param name handling to `:id`.
- [x] `POST /api/v1/auth/logout` remains active (auth required).

## 3) New Endpoint Adoption Checklist

### Shipment Type + D2D Intake

- [x] Integrate `GET /api/v1/public/shipment-types` to drive dynamic shipment type options.
- [x] Integrate `POST /api/v1/public/d2d/intake` submission flow.
  - [x] Build form using required fields from `intake.requiredFields`.
  - [x] Handle `201` response with `order`, `ticket`, and `contact`.

### Newsletter

- [x] Integrate `POST /api/v1/public/newsletter/subscribe`.
  - [x] Validate email before submit.
  - [x] Handle success/error messaging.

### Public Gallery

- [x] Integrate `GET /api/v1/public/gallery?limitPerSection=<n>`.
- [x] Integrate `GET /api/v1/public/gallery/adverts?limit=<n>`.
- [x] Integrate `POST /api/v1/public/gallery/claims/presign`.
  - [x] Upload proof asset directly to returned `uploadUrl`.
  - [x] Persist `uploadToken` and `r2Key/publicUrl`.
- [x] Integrate `POST /api/v1/public/gallery/anonymous/:trackingNumber/claim`.
  - [x] Submit claim details + `uploadToken` + `proofR2Keys`.
- [x] Integrate `POST /api/v1/public/gallery/cars/:trackingNumber/purchase-attempt`.

## 4) Customer Auth Flow Migration (Clerk-first)

- [x] Replace customer signup/signin entrypoints with Clerk UI/SDK.
  - [x] Landing page now links users to dashboard `sign-in` / `sign-up` pages (no in-landing auth flow).
- [x] After Clerk auth, call `POST /api/v1/auth/sync` with Clerk bearer token.
- [x] Handle `200` sync success by hydrating local user state.
- [x] Handle `409` sync conflicts with clear support/escalation UX.
- [x] Ensure authenticated calls (`/users/me`, etc.) use Clerk-derived bearer token strategy.

## 5) FE Code Changes Checklist (Current Repo)

- [x] `src/api/apiConfig.js`
  - [x] Verify baseURL strategy.
  - [x] Confirm 401 redirect behavior still intended for public site.
- [x] `src/api/userApi.js`
  - [x] Switch `updateProfile` to `PATCH /users/:id`.
  - [x] Review login/register/logout contracts against current backend.
- [x] `src/contexts/AuthContext.jsx`
  - [x] Update login token parsing to `tokens.accessToken`.
  - [x] Rework/remove legacy customer register flow if Clerk-first is required.
- [x] `src/pages/ShipmentCalculator.jsx`
  - [x] Support shipment type expansion (`d2d`) and intake UX.
- [x] `src/components/Track.jsx`
  - [x] Support richer tracking response fields.
- [x] Add API service modules for new public endpoints.

## 6) Validation and QA

- [ ] Manual smoke tests for all active current endpoints.
- [ ] Manual tests for each newly added endpoint integration.
- [ ] Verify auth-required endpoints reject missing/invalid tokens as expected.
- [ ] Verify loading/error states for 4xx/5xx responses.
- [x] Verify no broken route links to dashboard (`sign-in`, `sign-up`).
- [ ] Verify production env variables are set consistently with chosen base URL strategy.

## 7) Rollout Order (Recommended)

- [x] Step 1: Base URL normalization + existing endpoint contract fixes.
- [x] Step 2: Auth flow alignment (token parsing, register behavior, Clerk sync path).
- [x] Step 3: Shipment calculator (`shipment-types`, `d2d` intake) updates.
- [x] Step 4: Tracking response UX enhancements.
- [x] Step 5: Newsletter + gallery feature integration.
- [ ] Step 6: Full regression + deployment checklist.

