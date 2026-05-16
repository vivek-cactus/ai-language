# Logo & Favicon — Design Spec

**Date:** 2026-05-17
**Status:** Approved

## Overview

Add a "Text Transform" SVG logo displayed inline-left of the site title in the App header, and a matching SVG favicon shown in the browser tab. The logo is a React component; the favicon is a static SVG in `public/`.

## Visual Design

The logo uses the "Text Transform" concept: monospace text `ABC` (blue, `#58a6ff`) above a dashed divider, with `A3C` (orange, `#ffa657`) below, and a right-pointing arrow (`#58a6ff`) on the right side. The icon sits in a dark rounded square (`#161b22`, `rx="16"`).

## Files Changed

### New: `src/components/Logo.jsx`

React component rendering the SVG. Accepts a `size` prop (default `48`). No state, no logic — pure render.

```jsx
export default function Logo({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="80" rx="16" fill="#161b22"/>
      <text x="12" y="34" fontFamily="monospace" fontSize="16" fill="#58a6ff" fontWeight="bold">ABC</text>
      <path d="M14 44 L66 44" stroke="#30363d" strokeWidth="1.5" strokeDasharray="4 3"/>
      <text x="12" y="62" fontFamily="monospace" fontSize="16" fill="#ffa657" fontWeight="bold">A3C</text>
      <path d="M54 28 L66 40 L54 52" stroke="#58a6ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
```

### New: `public/favicon.svg`

Same SVG as Logo, saved as a static file. Vite serves `public/` at the root during dev and at `base` path after build.

```svg
<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="80" height="80" rx="16" fill="#161b22"/>
  <text x="12" y="34" font-family="monospace" font-size="16" fill="#58a6ff" font-weight="bold">ABC</text>
  <path d="M14 44 L66 44" stroke="#30363d" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="12" y="62" font-family="monospace" font-size="16" fill="#ffa657" font-weight="bold">A3C</text>
  <path d="M54 28 L66 40 L54 52" stroke="#58a6ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

### Modified: `index.html`

Add favicon link in `<head>`:

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

Vite automatically prepends the `base` path (`/ai-language/`) to this href during build, so the production output correctly resolves to `/ai-language/favicon.svg`. Using the full path would double it.

### Modified: `src/App.jsx`

Import `Logo` and wrap the `<h1>` in a flex row using a new `.app-header-title` div:

```jsx
import Logo from './components/Logo'

// In the header:
<div className="app-header-title">
  <Logo size={48} />
  <h1>AI Language Experiments</h1>
</div>
```

The `.subtitle` and `.experiment-count` paragraphs remain unchanged below.

### Modified: `src/index.css`

Add one new class:

```css
.app-header-title {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
}
```

The existing `.app-header h1` rule's `margin-bottom: 8px` moves to `.app-header-title` (since the `<h1>` is now inside that wrapper).

## Testing

No new tests. `Logo` is a pure SVG with no logic. The existing `App` test for `screen.getByText('AI Language Experiments')` continues to pass — the `<h1>` text is unchanged.

Run `npm run test:run` after implementation to confirm all 10 tests still pass.

## Out of Scope

- Animated logo
- Dark/light theme variants of the logo
- PNG fallback favicon (SVG is sufficient for modern browsers)
- Logo in any location other than the App header
