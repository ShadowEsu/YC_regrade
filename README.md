# Regrade

Premium landing page for [regradeapp.tech](https://regradeapp.tech).

## Stack

- **Vite + React 19 + TypeScript** — fast builds, type-safe components
- **Tailwind CSS v4** — design tokens, responsive layout
- **Framer Motion** — preloader, staggered hero, FAQ accordion, sticky CTA, cursor glow
- **GSAP + ScrollTrigger** — product parallax, feature deep-dive scrub animations
- **Lenis** — buttery smooth scroll (synced with GSAP)
- **Lucide React** — crisp iconography
- **Supabase** — waitlist RPC, live stats, visitor analytics

## Backend (Supabase)

| RPC | Purpose |
|-----|---------|
| `join_waitlist` | Sign up + return queue position |
| `get_waitlist_stats` | Live waitlist total & spots left |
| `register_visitor` | Anonymous visitor tracking |
| `get_visitor_stats` | Site traffic aggregates |

View signups: [Supabase table editor](https://supabase.com/dashboard/project/lshqzxgzehgmzgeilvmy/editor)

Copy `.env.example` → `.env` for local keys (optional; defaults are baked in for the publishable key).

## Development

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Production build

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to Vercel, Netlify, or any static host.

## Waitlist

Signups write to the `waitlist` table in Supabase (`Regrade-waitlist` project). View entries in the [Supabase dashboard](https://supabase.com/dashboard/project/lshqzxgzehgmzgeilvmy/editor).
