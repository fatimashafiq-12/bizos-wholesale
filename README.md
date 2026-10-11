# BizOS E-commerce Wholesale

Production-oriented B2B wholesale marketplace built with Next.js App Router, TypeScript, Tailwind CSS, Zustand, React Hook Form, Zod, Framer Motion, Lucide React, and Sonner.

## Run

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Demo authentication

Any valid email/password (8+ chars) works. Use `admin@bizos.local` to receive the admin role.

## Mock coupon

Use `BIZOS10` in the cart for 10% off orders of $500 or more.

## Notes

- Product pages are server-rendered from the supplied BizOS product payload.
- Cart and wishlist persist in local storage.
- Authentication uses an HTTP-only demo cookie architecture that can be replaced with a real identity provider.
- Payment is abstracted as a mock provider; no card data is sent to a real gateway.
