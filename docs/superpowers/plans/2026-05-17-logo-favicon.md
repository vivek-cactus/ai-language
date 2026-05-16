# Logo & Favicon Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Text Transform" SVG logo next to the site title in the App header, and a matching SVG favicon in the browser tab.

**Architecture:** A new `Logo.jsx` React component holds the SVG markup and accepts a `size` prop. A static `public/favicon.svg` file (same SVG, plain HTML attributes) is served by Vite and linked from `index.html`. `App.jsx` wraps the `<h1>` and `<Logo>` in a flex row using a new `.app-header-title` CSS class.

**Tech Stack:** React, Vite, SVG

---

## File Structure

```
src/
  components/
    Logo.jsx          ← NEW: SVG logo component
  App.jsx             ← MODIFY: import Logo, wrap h1 in flex row
  index.css           ← MODIFY: add .app-header-title, remove margin from h1
public/
  favicon.svg         ← NEW: static SVG favicon
index.html            ← MODIFY: add <link rel="icon"> in <head>
```

---

### Task 1: Logo component and favicon file

**Files:**
- Create: `src/components/Logo.jsx`
- Create: `public/favicon.svg`

- [ ] **Step 1: Create `src/components/Logo.jsx`**

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

Note: SVG inside JSX uses camelCase attributes (`fontFamily`, `fontSize`, `strokeWidth`, `strokeDasharray`, `strokeLinecap`, `strokeLinejoin`). This differs from the plain HTML SVG in `favicon.svg`.

- [ ] **Step 2: Create `public/favicon.svg`**

```svg
<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="80" height="80" rx="16" fill="#161b22"/>
  <text x="12" y="34" font-family="monospace" font-size="16" fill="#58a6ff" font-weight="bold">ABC</text>
  <path d="M14 44 L66 44" stroke="#30363d" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="12" y="62" font-family="monospace" font-size="16" fill="#ffa657" font-weight="bold">A3C</text>
  <path d="M54 28 L66 40 L54 52" stroke="#58a6ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

Note: This is a plain SVG file (not JSX), so it uses hyphenated HTML attributes (`font-family`, `stroke-width`, etc.).

- [ ] **Step 3: Commit**

```bash
git add src/components/Logo.jsx public/favicon.svg
git commit -m "feat: add Logo component and favicon SVG"
```

---

### Task 2: Wire Logo into App header and add favicon link

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/index.css`
- Modify: `index.html`

- [ ] **Step 1: Update `src/App.jsx`**

Replace the current file contents with:

```jsx
import experiments from './data/experiments.json'
import Timeline from './components/Timeline'
import Logo from './components/Logo'
import './index.css'

export default function App() {
  const sorted = [...experiments].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-title">
          <Logo size={48} />
          <h1>AI Language Experiments</h1>
        </div>
        <p className="subtitle">How do different text transformations affect AI responses?</p>
        <p className="experiment-count">{sorted.length} experiment{sorted.length !== 1 ? 's' : ''}</p>
      </header>
      <main>
        <Timeline experiments={sorted} />
      </main>
    </div>
  )
}
```

- [ ] **Step 2: Update `src/index.css`**

Replace the current file contents with:

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #0d1117;
  color: #e6edf3;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  min-height: 100vh;
}

.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 48px 24px;
}

.app-header {
  margin-bottom: 48px;
}

.app-header-title {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
}

.app-header h1 {
  font-size: 28px;
  font-weight: 600;
  color: #e6edf3;
}

.subtitle {
  color: #8b949e;
  font-size: 15px;
  margin-bottom: 12px;
}

.experiment-count {
  color: #58a6ff;
  font-size: 13px;
}
```

Key change: `margin-bottom: 8px` moved from `.app-header h1` to `.app-header-title` (the wrapping flex row now owns the spacing below the title row).

- [ ] **Step 3: Update `index.html`**

Replace the current file contents with:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI Language Experiments</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

Note: Use `/favicon.svg` (not `/ai-language/favicon.svg`). Vite automatically prepends the `base` path during build, so the deployed version resolves correctly.

- [ ] **Step 4: Run all tests**

```bash
npm run test:run
```

Expected: `10 tests passed, 0 failed` — all existing tests pass unchanged. The `App` test for `screen.getByText('AI Language Experiments')` still finds the `<h1>` text regardless of the new wrapping div.

- [ ] **Step 5: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:5173/ai-language/`. Verify:
- Logo icon appears to the left of "AI Language Experiments" in the header
- Browser tab shows the favicon (may take a hard refresh)
- Layout looks correct — subtitle and experiment count are below the title row

Stop with `Ctrl+C`.

- [ ] **Step 6: Commit**

```bash
git add src/App.jsx src/index.css index.html
git commit -m "feat: wire Logo into App header and add favicon link"
```
