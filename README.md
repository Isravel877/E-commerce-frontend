# ISROZONE — React Storefront

A responsive, light-theme e-commerce frontend built with React 19, Vite, and React Router. The UI has been redesigned while keeping the original Spring Boot product API contract.

## Requirements

- Node.js 20.19+ or 22.12+
- npm
- Your existing backend running and exposing `GET /products` and `GET /products/{id}`

## Run locally

1. Open this folder in your terminal.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and set the backend base URL:

   ```env
   VITE_API_BASE_URL=http://localhost:8080
   ```

   Do not add a trailing slash. For a deployed backend, set this to its public API base URL.

4. Start the frontend:

   ```bash
   npm run dev
   ```

5. Create a production build:

   ```bash
   npm run build
   ```

## Existing API contract retained

- `GET {VITE_API_BASE_URL}/products`
- `GET {VITE_API_BASE_URL}/products/{id}`

The frontend reads the original product fields used by the previous project: `id`, `name`, `price`, `imageUrl`, `category`, `rating`, `description`, and `stock`. Optional `originalPrice` / `original_price` fields are supported for displaying a genuine original price.

## What changed

- Replaced the old green fixed header and image hero with a clean light design and a typography-only hero.
- Added responsive navigation, product search, category filtering, and sorting.
- Improved product cards and product detail layout.
- Added a local-storage shopping bag and wishlist, including item count, quantity updates, and remove actions.
- Added frontend pages for cart, checkout, login, registration, wishlist, order confirmation state, and order history.
- Added loading, empty, and API error states.
- Centralized colors, spacing, radii, and shadows with CSS variables.

## Backend integration notes

The original ZIP only contained product-read requests. The cart and wishlist are therefore stored in the browser using `localStorage`. The checkout and login pages are UI flows only: the original project did not include authentication, payment, order-creation, or order-history endpoints, so these pages clearly explain that no server-side action is performed. Connect those existing or future backend endpoints before accepting real orders or credentials.

The backend must allow requests from the frontend origin through CORS. The frontend does not change your Spring Boot backend.
