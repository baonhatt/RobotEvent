1. Install dependencies:
   `npm install`
2. Create `.env.local` from `.env.example` and set:
   - `GEMINI_API_KEY`
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL` (must be a verified sender in Resend)
3. Run the app (client + contact API server):
   `npm run dev`

The contact form submits to `/api/contact`, which sends email via Resend from `server/index.ts`.
