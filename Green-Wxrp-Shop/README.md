# Green Wxrp LIFF WebApp

This project is a mobile-first, multilingual LIFF WebApp for a Thai herbal drink retailer. It integrates Google Sheets for data management, LIFF SDK for LINE-based authentication, and advanced analytics for operational insights.

## Features
- Product List & Cart
- Cart & Checkout
- Sales Analytics & Admin Panel
- Promotions & Coupons
- Offline Mode
- Member Registration

## Tech Stack
- Next.js (TypeScript)
- Tailwind CSS
- Shadcn/ui
- Recharts
- Google Sheets API
- LIFF SDK

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Configure your environment variables for Google Sheets API and LIFF SDK.

## Folder Structure
- `src/features/products` - Product list and stock
- `src/features/cart` - Cart management
- `src/features/checkout` - Checkout and payment
- `src/features/analytics` - Sales analytics and admin
- `src/features/promotions` - Promotions and coupons
- `src/features/members` - Member registration and management
- `src/features/offline` - Offline mode utilities

## Next Steps
- Set up Google Sheets and LIFF credentials
- Add product and promotion images as URLs
- Define dropdown options for registration

---
See the PDD for full requirements and design.
