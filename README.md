# Velvet Rack

Premium streetwear. An interactive clothing-rack storefront where garments hang on a rail, hover to select, drag to scroll, and click to open a detail view with front/back flip.

## Two ways to view it

### 1. Open `index.html` (no build, no dependencies)

Just open the file in a browser, or host it anywhere:

```bash
# from this directory
python3 -m http.server 8000
# then visit http://localhost:8000
```

React 18 + Babel load from CDN. No install, no build step.

### 2. Next.js 14 source (`nextjs/velvet-rack/`)

The same app as a Next.js App Router app:

```bash
cd nextjs/velvet-rack
npm install
npm run dev
```

## Interactions

- **Hover** a garment → selection box + toolbar appear, rail expands that slot.
- **Drag** the rail to scroll horizontally.
- **Click** a garment (without dragging) → detail view opens.
- In the detail view: **flip Front/Back**, navigate with the arrows, hit **Back** to return to the collection.

## Structure

- `components/Garment.jsx` — hand-drawn SVG garments; all colour comes from the `color` prop.
- `components/Store.jsx` — the rail, hover/selection state, drag-scroll, and detail view.
- `data/products.js` — the catalogue. Add a product here to add it to the rack.

## Edit the catalogue

Each product is drawn automatically by `<Garment />` from its `kind` (`tee`, `blazer`, `crew`, `hoodie`), `color`, and optional `front`/`back` text. Add a new entry to `data/products.js`.

## GitHub Pages

Enable **Pages → Source: main, / (root)** in the repo settings. `index.html` is served at the root, so the site is live at `https://muhammad-waqar-uit.github.io/velvet-rack/` once enabled.