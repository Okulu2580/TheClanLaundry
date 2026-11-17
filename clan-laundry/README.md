# The Clan Laundry — website

Static site built from the CLAN-UI Figma design (Home, Services & pricing, Book a pickup).
Plain HTML + Tailwind CSS + a little vanilla JS. No framework.

## Run it in VS Code
1. `npm install`
2. `npm run dev`   (rebuilds `dist/styles.css` as you edit)
3. Open `index.html` with the Live Server extension (or just double-click it).

`npm run build` makes a minified `dist/styles.css` for production.

## Where things are
- `index.html` — all three pages (switched with `#home`, `#services`, `#book`) + shared header/footer
- `js/main.js` — service + price data, rendering, router, mobile menu, form handler
- `src/input.css` — Tailwind entry + custom styles
- `tailwind.config.js` — colour and font tokens from Figma
- `assets/` — `logo.png`, `hero.jpg`, `laundry.jpg` (replace with your full-resolution exports, same file names)

## Design tokens (from Figma)
Colours: brand `#0170c2`, navy `#072460`, ink `#132e42`, muted `#5a6a75`, line `#dce2e5`, mist `#f5f7f7`, tint `#f0f7fc`
Fonts: DM Sans (headings, optical size 14) and Inter (body/UI), loaded from Google Fonts in `index.html`.

## Edit content
Prices and services are the `prices` and `services` arrays at the top of `js/main.js`.
The pickup form is front-end only: see the `TODO` at the bottom of `js/main.js` to send the data somewhere.
