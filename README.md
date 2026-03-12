1. Install dependencies:
   `npm install`
2. Create `.env.local` from `.env.example` and set:
   - `GEMINI_API_KEY`
   - `VITE_API_BASE_URL` (for Worker host, leave empty if same origin)
   - `VITE_CONTACT_API_PATH` (default `/contact` for Worker)
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL` (must be a verified sender in Resend)
3. Run the app (client + contact API server):
   `npm run dev`

The contact form submits to `/api/contact`, which sends email via Resend from `server/index.ts`.

For Cloudflare deployment:
- If frontend and API are on the same origin, keep `VITE_API_BASE_URL` empty.
- If API is hosted separately (e.g. Worker domain), set `VITE_API_BASE_URL="https://your-api-domain.com"`.
- Set `VITE_CONTACT_API_PATH` to match Worker route (usually `/contact`).
