# AI Language Experiment Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static React site on GitHub Pages that displays AI prompt experiments in a chronological timeline feed.

**Architecture:** Vite + React with a single `src/data/experiments.json` as the data source. Three components (App, Timeline, ExperimentCard) with local expand/collapse state. Deployed manually via `gh-pages` npm package.

**Tech Stack:** Vite, React 19, Vitest, @testing-library/react, @testing-library/jest-dom, gh-pages

---

## File Structure

```
ai-language/
├── index.html
├── vite.config.js
├── package.json
├── .gitignore
├── src/
│   ├── main.jsx
│   ├── index.css
│   ├── App.jsx
│   ├── App.test.jsx
│   ├── data/
│   │   └── experiments.json
│   ├── components/
│   │   ├── ExperimentCard.jsx
│   │   ├── ExperimentCard.css
│   │   ├── ExperimentCard.test.jsx
│   │   ├── Timeline.jsx
│   │   ├── Timeline.css
│   │   └── Timeline.test.jsx
│   └── test/
│       └── setup.js
```

---

### Task 1: Scaffold project and configure tooling

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.js`
- Create: `.gitignore`
- Create: `src/main.jsx`
- Create: `src/test/setup.js`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "ai-language",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest",
    "test:run": "vitest run",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.5.2",
    "@vitejs/plugin-react": "^4.5.0",
    "gh-pages": "^6.3.0",
    "jsdom": "^26.1.0",
    "vite": "^6.3.5",
    "vitest": "^3.2.2"
  }
}
```

- [ ] **Step 2: Create `vite.config.js`**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ai-language/',
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    globals: true,
  },
})
```

- [ ] **Step 3: Create `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI Language Experiments</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Create `src/main.jsx`**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 5: Create `src/test/setup.js`**

```js
import '@testing-library/jest-dom'
```

- [ ] **Step 6: Update `.gitignore`**

```
node_modules/
dist/
.superpowers/
```

- [ ] **Step 7: Install dependencies**

```bash
npm install
```

Expected: `node_modules/` created, no errors.

- [ ] **Step 8: Verify dev server starts**

```bash
npm run dev
```

Expected: Output includes `Local: http://localhost:5173/` (or similar). You'll see a blank page or React error — that's fine, `App.jsx` doesn't exist yet. Stop with `Ctrl+C`.

- [ ] **Step 9: Verify test runner works**

```bash
npm run test:run
```

Expected: `No test files found` or `0 tests passed` — no failures. If you get an error about missing files, check that `src/test/setup.js` exists.

- [ ] **Step 10: Commit**

```bash
git add package.json index.html vite.config.js .gitignore src/main.jsx src/test/setup.js
git commit -m "feat: scaffold vite + react project with vitest"
```

---

### Task 2: Create data file

**Files:**
- Create: `src/data/experiments.json`

- [ ] **Step 1: Create `src/data/experiments.json`**

```json
[
  {
    "id": 1,
    "date": "2026-05-17",
    "model": "GPT-4o",
    "tokens": 124,
    "transformation": "Remove whitespace",
    "originalPrompt": "What is the capital of France?",
    "transformedPrompt": "WhatisthecapitalofFrance?",
    "aiResponse": "Paris is the capital of France.",
    "observations": "Model correctly identified the question despite all spaces being removed."
  }
]
```

Replace this entry with your real data once you have it.

- [ ] **Step 2: Commit**

```bash
git add src/data/experiments.json
git commit -m "feat: add experiments data file with seed entry"
```

---

### Task 3: ExperimentCard component

**Files:**
- Create: `src/components/ExperimentCard.test.jsx`
- Create: `src/components/ExperimentCard.jsx`
- Create: `src/components/ExperimentCard.css`

- [ ] **Step 1: Write the failing tests**

Create `src/components/ExperimentCard.test.jsx`:

```jsx
import { render, screen, fireEvent } from '@testing-library/react'
import ExperimentCard from './ExperimentCard'

const experiment = {
  id: 1,
  date: '2026-05-17',
  model: 'GPT-4o',
  tokens: 124,
  transformation: 'Remove whitespace',
  originalPrompt: 'What is the capital of France?',
  transformedPrompt: 'WhatisthecapitalofFrance?',
  aiResponse: 'Paris is the capital of France.',
  observations: 'Model understood despite mangling.',
}

test('shows date, model, transformation, and token count when collapsed', () => {
  render(<ExperimentCard experiment={experiment} />)
  expect(screen.getByText('2026-05-17')).toBeInTheDocument()
  expect(screen.getByText('GPT-4o')).toBeInTheDocument()
  expect(screen.getByText('Remove whitespace')).toBeInTheDocument()
  expect(screen.getByText('124 tokens')).toBeInTheDocument()
})

test('does not show prompts or response when collapsed', () => {
  render(<ExperimentCard experiment={experiment} />)
  expect(screen.queryByText('What is the capital of France?')).not.toBeInTheDocument()
  expect(screen.queryByText('WhatisthecapitalofFrance?')).not.toBeInTheDocument()
  expect(screen.queryByText('Paris is the capital of France.')).not.toBeInTheDocument()
})

test('reveals prompts, response, and observations on click', () => {
  render(<ExperimentCard experiment={experiment} />)
  fireEvent.click(screen.getByRole('button'))
  expect(screen.getByText('What is the capital of France?')).toBeInTheDocument()
  expect(screen.getByText('WhatisthecapitalofFrance?')).toBeInTheDocument()
  expect(screen.getByText('Paris is the capital of France.')).toBeInTheDocument()
  expect(screen.getByText('Model understood despite mangling.')).toBeInTheDocument()
})

test('collapses again on second click', () => {
  render(<ExperimentCard experiment={experiment} />)
  fireEvent.click(screen.getByRole('button'))
  fireEvent.click(screen.getByRole('button'))
  expect(screen.queryByText('What is the capital of France?')).not.toBeInTheDocument()
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm run test:run -- src/components/ExperimentCard.test.jsx
```

Expected: FAIL — `Cannot find module './ExperimentCard'`

- [ ] **Step 3: Create `src/components/ExperimentCard.jsx`**

```jsx
import { useState } from 'react'
import './ExperimentCard.css'

export default function ExperimentCard({ experiment }) {
  const [expanded, setExpanded] = useState(false)
  const { date, model, tokens, transformation, originalPrompt, transformedPrompt, aiResponse, observations } = experiment

  return (
    <div className="experiment-card">
      <button className="card-header" onClick={() => setExpanded(!expanded)}>
        <span className="card-date">{date}</span>
        <span className="card-model">{model}</span>
        <span className="badge">{transformation}</span>
        <span className="badge">{tokens} tokens</span>
        <span className="card-toggle">{expanded ? '▲' : '▼'}</span>
      </button>
      {expanded && (
        <div className="card-body">
          <div className="prompt-grid">
            <div className="prompt-box">
              <div className="prompt-label">ORIGINAL PROMPT</div>
              <div className="prompt-text">{originalPrompt}</div>
            </div>
            <div className="prompt-box transformed">
              <div className="prompt-label">TRANSFORMED</div>
              <div className="prompt-text">{transformedPrompt}</div>
            </div>
          </div>
          <div className="response-box">
            <div className="prompt-label">AI RESPONSE</div>
            <div className="prompt-text">{aiResponse}</div>
          </div>
          <div className="observations-box">
            <div className="prompt-label">OBSERVATIONS</div>
            <div className="observations-text">{observations}</div>
          </div>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Create `src/components/ExperimentCard.css`**

```css
.experiment-card {
  flex: 1;
  border: 1px solid #30363d;
  border-radius: 8px;
  background: #161b22;
  margin-bottom: 16px;
  overflow: hidden;
}

.card-header {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: none;
  border: none;
  color: #e6edf3;
  cursor: pointer;
  text-align: left;
  flex-wrap: wrap;
}

.card-header:hover {
  background: #1c2128;
}

.card-date {
  color: #8b949e;
  font-size: 13px;
  flex-shrink: 0;
}

.card-model {
  font-weight: 600;
  font-size: 14px;
}

.badge {
  background: #21262d;
  color: #79c0ff;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 12px;
  flex-shrink: 0;
}

.card-toggle {
  margin-left: auto;
  color: #8b949e;
  font-size: 12px;
}

.card-body {
  padding: 16px;
  border-top: 1px solid #30363d;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.prompt-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.prompt-box {
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 6px;
  padding: 12px;
}

.prompt-box.transformed {
  border-color: #ffa657;
  border-left: 3px solid #ffa657;
}

.prompt-label {
  font-size: 10px;
  color: #8b949e;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.prompt-text {
  font-family: 'SFMono-Regular', Consolas, monospace;
  font-size: 13px;
  color: #e6edf3;
  line-height: 1.5;
}

.response-box {
  background: #0d1117;
  border: 1px solid #30363d;
  border-left: 3px solid #3fb950;
  border-radius: 6px;
  padding: 12px;
}

.observations-box {
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 6px;
  padding: 12px;
}

.observations-text {
  font-size: 14px;
  color: #c9d1d9;
  line-height: 1.6;
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npm run test:run -- src/components/ExperimentCard.test.jsx
```

Expected: `4 tests passed`

- [ ] **Step 6: Commit**

```bash
git add src/components/ExperimentCard.jsx src/components/ExperimentCard.css src/components/ExperimentCard.test.jsx
git commit -m "feat: add ExperimentCard component with expand/collapse"
```

---

### Task 4: Timeline component

**Files:**
- Create: `src/components/Timeline.test.jsx`
- Create: `src/components/Timeline.jsx`
- Create: `src/components/Timeline.css`

- [ ] **Step 1: Write the failing tests**

Create `src/components/Timeline.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import Timeline from './Timeline'

const makeExperiment = (overrides = {}) => ({
  id: 1,
  date: '2026-05-17',
  model: 'GPT-4o',
  tokens: 124,
  transformation: 'Remove whitespace',
  originalPrompt: 'What is the capital of France?',
  transformedPrompt: 'WhatisthecapitalofFrance?',
  aiResponse: 'Paris is the capital of France.',
  observations: 'Model understood despite mangling.',
  ...overrides,
})

test('shows empty state when experiments array is empty', () => {
  render(<Timeline experiments={[]} />)
  expect(screen.getByText('No experiments yet — check back soon.')).toBeInTheDocument()
})

test('renders one card per experiment', () => {
  const experiments = [
    makeExperiment({ id: 1, model: 'GPT-4o' }),
    makeExperiment({ id: 2, model: 'Claude 3' }),
  ]
  render(<Timeline experiments={experiments} />)
  expect(screen.getByText('GPT-4o')).toBeInTheDocument()
  expect(screen.getByText('Claude 3')).toBeInTheDocument()
})

test('does not show empty state when experiments exist', () => {
  render(<Timeline experiments={[makeExperiment()]} />)
  expect(screen.queryByText('No experiments yet — check back soon.')).not.toBeInTheDocument()
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm run test:run -- src/components/Timeline.test.jsx
```

Expected: FAIL — `Cannot find module './Timeline'`

- [ ] **Step 3: Create `src/components/Timeline.jsx`**

```jsx
import ExperimentCard from './ExperimentCard'
import './Timeline.css'

export default function Timeline({ experiments }) {
  if (experiments.length === 0) {
    return <p className="empty-state">No experiments yet — check back soon.</p>
  }

  return (
    <div className="timeline">
      {experiments.map((experiment, index) => (
        <div key={experiment.id} className="timeline-entry">
          <div className="timeline-connector">
            <div className="timeline-dot" />
            {index < experiments.length - 1 && <div className="timeline-line" />}
          </div>
          <ExperimentCard experiment={experiment} />
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Create `src/components/Timeline.css`**

```css
.timeline {
  display: flex;
  flex-direction: column;
}

.timeline-entry {
  display: flex;
  gap: 16px;
}

.timeline-connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 16px;
}

.timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #58a6ff;
  margin-top: 18px;
  flex-shrink: 0;
}

.timeline-line {
  width: 2px;
  flex: 1;
  background: #30363d;
  margin: 4px 0;
}

.empty-state {
  color: #8b949e;
  text-align: center;
  padding: 64px 24px;
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npm run test:run -- src/components/Timeline.test.jsx
```

Expected: `3 tests passed`

- [ ] **Step 6: Commit**

```bash
git add src/components/Timeline.jsx src/components/Timeline.css src/components/Timeline.test.jsx
git commit -m "feat: add Timeline component with empty state"
```

---

### Task 5: App component and global styles

**Files:**
- Create: `src/App.test.jsx`
- Create: `src/App.jsx`
- Create: `src/index.css`

- [ ] **Step 1: Write the failing tests**

Create `src/App.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import App from './App'

vi.mock('./data/experiments.json', () => ({
  default: [
    {
      id: 1,
      date: '2026-05-10',
      model: 'GPT-4o',
      tokens: 124,
      transformation: 'Remove whitespace',
      originalPrompt: 'Original A',
      transformedPrompt: 'TransformedA',
      aiResponse: 'Response A',
      observations: 'Obs A',
    },
    {
      id: 2,
      date: '2026-05-17',
      model: 'Claude 3',
      tokens: 98,
      transformation: '4-char words',
      originalPrompt: 'Original B',
      transformedPrompt: 'Orig inal B',
      aiResponse: 'Response B',
      observations: 'Obs B',
    },
  ],
}))

test('renders site title', () => {
  render(<App />)
  expect(screen.getByText('AI Language Experiments')).toBeInTheDocument()
})

test('shows experiment count', () => {
  render(<App />)
  expect(screen.getByText('2 experiments')).toBeInTheDocument()
})

test('sorts experiments newest first', () => {
  render(<App />)
  const models = screen.getAllByRole('button')
  expect(models[0]).toHaveTextContent('Claude 3')
  expect(models[1]).toHaveTextContent('GPT-4o')
})

test('shows singular "experiment" when count is 1', () => {
  vi.doMock('./data/experiments.json', () => ({
    default: [
      {
        id: 1,
        date: '2026-05-17',
        model: 'GPT-4o',
        tokens: 124,
        transformation: 'Remove whitespace',
        originalPrompt: 'q',
        transformedPrompt: 'q',
        aiResponse: 'r',
        observations: 'o',
      },
    ],
  }))
})
```

> Note: The singular/plural test for count=1 is best verified manually in the browser — mocking modules per-test in Vitest requires module reset which adds complexity. The first three tests cover the critical behaviour.

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm run test:run -- src/App.test.jsx
```

Expected: FAIL — `Cannot find module './App'`

- [ ] **Step 3: Create `src/App.jsx`**

```jsx
import experiments from './data/experiments.json'
import Timeline from './components/Timeline'
import './index.css'

export default function App() {
  const sorted = [...experiments].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="app">
      <header className="app-header">
        <h1>AI Language Experiments</h1>
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

- [ ] **Step 4: Create `src/index.css`**

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

.app-header h1 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
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

- [ ] **Step 5: Run tests to verify they pass**

```bash
npm run test:run -- src/App.test.jsx
```

Expected: `3 tests passed` (the 4th test is a note, not a runnable assertion)

- [ ] **Step 6: Run all tests**

```bash
npm run test:run
```

Expected: `10 tests passed, 0 failed`

- [ ] **Step 7: Verify site looks correct in browser**

```bash
npm run dev
```

Open `http://localhost:5173/ai-language/` in your browser. Verify:
- Dark background, site title visible
- Timeline shows one experiment entry
- Click the entry — prompts appear side by side, response and observations visible
- Click again — collapses

Stop with `Ctrl+C`.

- [ ] **Step 8: Commit**

```bash
git add src/App.jsx src/App.test.jsx src/index.css
git commit -m "feat: add App component with sorted timeline and dark theme"
```

---

### Task 6: Deploy to GitHub Pages

**Files:**
- No new files — `package.json` already has deploy scripts from Task 1

- [ ] **Step 1: Install gh-pages (already in devDependencies, just verify)**

```bash
ls node_modules/.bin/gh-pages
```

Expected: path printed. If missing, run `npm install`.

- [ ] **Step 2: Ensure GitHub remote is set**

```bash
git remote -v
```

Expected: `origin` pointing to `https://github.com/<your-username>/ai-language.git`. If not set, run:

```bash
git remote add origin https://github.com/<your-username>/ai-language.git
```

- [ ] **Step 3: Push main branch**

```bash
git push -u origin main
```

- [ ] **Step 4: Deploy**

```bash
npm run deploy
```

Expected: Output ends with `Published`. This builds the site and pushes `dist/` to the `gh-pages` branch.

- [ ] **Step 5: Enable GitHub Pages in repo settings**

Go to your repo on GitHub → Settings → Pages → Source: `Deploy from a branch` → Branch: `gh-pages` → `/root`. Save.

- [ ] **Step 6: Verify live site**

Open `https://<your-username>.github.io/ai-language/` in your browser (may take 1–2 minutes to propagate). Verify the timeline renders and expand/collapse works.
