# Public Website API Migration Checklist

Date: 2026-04-25  
Source: FE Public Endpoints Consumption Checklist (shared 2026-04-25)

How to read this:
- `[x]` = done and aligned
- `[ ]` = remaining work

## 1) Global Integration Checklist

- [x] Use backend base URL + `/api/v1` prefix.
- [x] Send `Content-Type: application/json` for JSON requests.
- [x] Do not send auth headers for public endpoints.
- [ ] Handle both response envelopes consistently in all public UI flows.  
  Current gap: some flows still rely on generic success messages instead of envelope-aware parsing.
- [ ] Handle validation errors (`errors: []`) consistently across all public forms.  
  Current gap: calculator handles this better than gallery/newsletter/purchase flows.

## 2) Public Routes (`/api/v1/public/*`)

### 2.1 `GET /api/v1/public/shipment-types`

- [x] Call on calculator page load.
- [x] Use returned `key` for shipment-type selection and estimate submission.

### 2.2 `GET /api/v1/public/calculator/rates`

- [x] Endpoint integrated and called.
- [x] Render full public rate cards/table from response.

### 2.3 `POST /api/v1/public/calculator/estimate`

- [x] Endpoint integrated and submits `shipmentType` from shipment-types.
- [x] FE sends estimate payload including dimensions and computed CBM.
- [x] Support ocean-like mode as `cbm` OR dimensions (without over-requiring unrelated fields).
- [ ] Ensure all backend validation/business messages are surfaced clearly.
- [ ] Optional: support intake-guidance response path from estimate for intake-mode types.

### 2.4 `POST /api/v1/public/newsletter/subscribe`

- [x] Endpoint integrated in footer newsletter form.
- [x] Duplicate email success is treated as success UX state.

### 2.5 `GET /api/v1/public/gallery`

- [x] Endpoint integrated with `limitPerSection`.
- [x] Gallery sections are rendered from response.

### 2.6 `GET /api/v1/public/gallery/adverts`

- [x] Endpoint integrated with `limit`.
- [x] Adverts widget/section is rendered.

### 2.7 `POST /api/v1/public/gallery/claims/presign`

- [x] Presign endpoint integrated.
- [x] Direct upload to returned URL is implemented.
- [x] `uploadToken` and `r2Key` are captured for later claim submit.
- [x] Align request body fields to current contract (`originalFileName`, etc.).
- [x] Support multi-file proof flow (1-5 files) instead of single file only.

### 2.8 `POST /api/v1/public/gallery/anonymous/:trackingNumber/claim`

- [x] Endpoint integrated and submits `uploadToken` + `proofR2Keys`.
- [x] Align payload to required fields (`fullName`, `email`, `phone`, `city`, `country`, `message`, `uploadToken`, `proofR2Keys`).
- [x] Remove fallback/legacy payload shapes once backend contract is final.
- [x] Support 1-5 proof keys.
- [x] Show returned claim + ticket reference in success UI.

### 2.9 `POST /api/v1/public/gallery/cars/:trackingNumber/purchase-attempt`

- [x] Endpoint integrated and submit flow is active.
- [x] Align request payload with current contract (`fullName`, `email`, `phone`, `city`, `country`, `message`).
- [x] Show returned ticket reference in success UI.

### 2.10 `POST /api/v1/public/d2d/intake`

- [x] Endpoint integrated and used by intake-mode calculator flow.
- [x] `consentAcknowledgement` required by FE before submit.
- [x] Optional delivery fields can be sent empty from FE.
- [x] Surface backend `409` conflict message directly and clearly.

## 3) Other Public/No-Auth Routes Outside `/public`

### 3.1 `GET /api/v1/orders/track/:trackingNumber`

- [x] Endpoint integrated on tracking page.
- [x] Rich response fields and timeline are rendered.
- [x] 404 is handled.
- [x] Block `GEX-MASTER-*` on FE before sending request.

### 3.2 `GET /health`

- [x] Not used for business UI (aligned with checklist).

## 4) End-to-End FE Flow Checklist (Anonymous Goods Claim)

- [x] Call `GET /api/v1/public/gallery` and render sections.
- [ ] Tie claim flow to selected anonymous item directly (instead of manual tracking number entry).
- [x] For each proof file, call `POST /api/v1/public/gallery/claims/presign`.
- [x] Upload each proof file via `PUT` to `uploadUrl`.
- [x] Submit claim with matching `uploadToken` and all `proofR2Keys`.
- [x] Show claim + ticket number from claim response.

## 5) What Is Left (Priority)

### P0: Contract correctness

- [x] Stop attaching `Authorization` on public endpoints.
- [x] Align anonymous claim payload to current backend schema.
- [x] Align car purchase attempt payload to current backend schema.
- [x] Fix calculator mode validation (`air` vs ocean-like `cbm`/dimensions logic).

### P1: UX + flow parity

- [x] Add multi-file proof upload (1-5 files).
- [x] Display claim and ticket references in success states.
- [x] Render full calculator rates table/cards.
- [x] Add FE pre-check for `GEX-MASTER-*`.
- [x] Improve 409 and validation error messaging consistency.

## 6) Files Reviewed

- `src/api/apiConfig.js`
- `src/api/publicApi.js`
- `src/pages/ShipmentCalculator.jsx`
- `src/pages/PublicGallery.jsx`
- `src/components/Track.jsx`
- `src/components/Footer.jsx`
- `src/api/userApi.js`
- `src/contexts/AuthContext.jsx`
- `.env.example`
- `README.md`
