# Super App

A personalized entertainment hub built with **React + Vite + TypeScript + Zustand + Tailwind CSS**.

Sign up, pick your favourite genres, then get a dashboard with live weather, cycling news, a notepad, a countdown timer, and a full movies browser — all in a sleek dark UI.

---

## Features

- **Registration** — form validation (name, username, email, 10-digit mobile), persisted in Zustand + LocalStorage
- **Category selection** — colorful image cards (Action, Drama, Romance, Thriller, Western, Horror, Fantasy, Music, Fiction), minimum 3 required
- **Dashboard**
  - Profile card (purple gradient)
  - Weather widget with pink date bar — live data via OpenWeatherMap API
  - News ticker with image + title + description — live data via News API
  - Notes widget — auto-saved to LocalStorage
  - Countdown timer — hours / minutes / seconds with Start / Pause / Resume / Reset
- **Movies page** — horizontal rows of real TMDB poster images per selected genre, with fallback data when API key is absent
- **Movie detail modal** — poster, rating, runtime, genre pills, plot, director, cast; smooth spring animation, closes on ESC / backdrop / button
- **Responsive** — desktop, tablet, and mobile layouts

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 18 + Vite 7 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| State | Zustand (persisted to LocalStorage) |
| Forms | React Hook Form + Zod |
| HTTP | Axios |
| Routing | React Router DOM v7 |

---

## Quick Start

```bash
# 1. Clone / unzip the project
git clone https://github.com/your-username/super-app.git
cd super-app

# 2. Install dependencies
npm install

# 3. Copy and fill in environment variables
cp .env.example .env
# Edit .env with your API keys (see below)

# 4. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Environment Variables

Copy `.env.example` to `.env` and add your keys:

```
VITE_OMDB_API_KEY=your_omdb_key_here
VITE_NEWS_API_KEY=your_news_api_key_here
VITE_WEATHER_API_KEY=your_openweathermap_key_here
```

| Variable | Where to get it | Required? |
|---|---|---|
| `VITE_OMDB_API_KEY` | [omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx) — free | Optional (fallback data used) |
| `VITE_NEWS_API_KEY` | [newsapi.org](https://newsapi.org/) — free tier | Optional (fallback articles used) |
| `VITE_WEATHER_API_KEY` | [openweathermap.org/api](https://openweathermap.org/api) — free | Optional (retry shown on fail) |

All APIs have built-in fallback data so the app remains fully functional without any keys.

---

## Available Scripts

```bash
npm run dev        # Start development server (http://localhost:5173)
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
npm run typecheck  # TypeScript type-check without emitting
```

---

## Project Structure

```
src/
├── components/
│   ├── ui/              # Radix-based UI primitives
│   ├── CategoryCard.tsx # Genre selection card with real poster image
│   ├── Header.tsx       # Navigation bar
│   ├── MovieCard.tsx    # Movie poster card
│   ├── MovieModal.tsx   # Movie detail modal with animations
│   ├── NewsWidget.tsx   # Auto-cycling news ticker
│   ├── NotesWidget.tsx  # Auto-saving notepad
│   ├── TimerWidget.tsx  # Countdown timer
│   ├── UserProfile.tsx  # Profile summary
│   └── WeatherWidget.tsx# Live weather with pink date bar
├── hooks/
│   ├── useTimer.ts      # Timer logic
│   └── useLocalStorage.ts
├── pages/
│   ├── Register.tsx     # Step 1 — sign up
│   ├── Categories.tsx   # Step 2 — pick genres
│   ├── Dashboard.tsx    # Step 3 — main hub
│   └── Movies.tsx       # Step 4 — browse movies
├── services/
│   ├── movieService.ts  # OMDb API + TMDB fallback data
│   ├── newsService.ts   # News API + fallback articles
│   └── weatherService.ts# OpenWeatherMap API
├── store/
│   └── useStore.ts      # Zustand store (persisted)
└── utils/
    ├── constants.ts     # Categories config with image URLs
    ├── helpers.ts       # Date, time, string helpers
    └── validations.ts   # Zod schemas
```

---

## Deployment

### Vercel

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) — it auto-detects Vite.

Set environment variables in **Project Settings → Environment Variables**.

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --build
```

Or drag the `dist/` folder to [app.netlify.com/drop](https://app.netlify.com/drop).

Build settings:
- **Build command:** `npm run build`
- **Publish directory:** `dist`

Set environment variables in **Site Settings → Environment Variables**.

---

## Screenshots

| Page | Description |
|---|---|
| Register | Concert background · split layout |
| Categories | Colorful genre cards with real movie posters |
| Dashboard | Profile · Weather · News · Notes · Timer |
| Movies | Horizontal poster rows per genre |
| Movie Modal | Poster · Rating · Plot · Cast |

---

## License

MIT
