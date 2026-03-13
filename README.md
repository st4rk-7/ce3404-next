# Starz Sneaker Store

Starz is a responsive Vue 3 and TypeScript storefront built for the CS3404 GUI Programming mini project. It uses DummyJSON product/authentication APIs and augments the limited shoe catalog with deterministic local presentation data.

## Features

- Search, gender/sale/category filters, eight sort modes, and paginated product results
- Product routes with responsive galleries and real product size/color selection
- Persistent Pinia cart with quantity controls and an accessible slide-in drawer
- Validated demo checkout, working discount codes, and session-persistent order confirmation
- Responsive landing page with two user-selected hero videos and reduced-motion support
- Dark mode, authentication simulation, mobile navigation, error/retry states, and a 404 route

## Run locally

Requirements: Bun 1.x or Node.js 18+.

```bash
bun install
bun run dev
```

Open `http://localhost:5173`.

## Verify and build

```bash
bun run check
bun run build
```

The storefront is a portfolio demo: checkout does not process payments or send customer data. Product and login data come from [DummyJSON](https://dummyjson.com/).

Test login credentials:

- Username: `emilys`
- Password: `emilyspass`
