# AI Language Experiment Showcase — Design Spec

**Date:** 2026-05-17
**Status:** Approved

## Overview

A personal experiment showcase site built with React, hosted on GitHub Pages. The site displays a chronological timeline of AI prompt experiments — each showing how different text transformations (e.g., removing whitespace, constraining word length) affect AI model responses.

The site is read-only for visitors. New experiments are added by editing a JSON data file and redeploying.

## Architecture

### Tooling

- **Framework:** Vite + React
- **Deployment:** `gh-pages` npm package, manual deploy via `npm run deploy`
- **Hosting:** GitHub Pages (repo: `ai-language`)

### Data

All experiments live in `src/data/experiments.json` as a flat array sorted by date (newest first at render time). To add a new experiment, append an entry to this file and run `npm run deploy`.

**Experiment schema:**
```json
{
  "id": 1,
  "date": "2026-05-17",
  "model": "GPT-4o",
  "tokens": 124,
  "transformation": "Remove whitespace",
  "originalPrompt": "What is the capital of France?",
  "transformedPrompt": "WhatisthecapitalofFrance?",
  "aiResponse": "Paris is the capital of France.",
  "observations": "Model understood despite mangling."
}
```

### Vite Config

`vite.config.js` sets `base: '/ai-language/'` to match the GitHub repo name, ensuring assets resolve correctly when served from a subdirectory.

## Components

### `App.jsx`

- Imports `experiments.json`
- Sorts entries by `date` descending
- Renders the page shell: site title, subtitle, experiment count
- Passes sorted experiments to `<Timeline />`

### `Timeline.jsx`

- Receives the experiments array as a prop
- Renders the vertical connector line and dot between each entry
- Maps over experiments, rendering one `<ExperimentCard />` per entry
- If the array is empty, renders an empty state: *"No experiments yet — check back soon."*

### `ExperimentCard.jsx`

- Receives a single experiment object as a prop
- **Collapsed state (default):** shows date, model name, transformation tag, token count
- **Expanded state:** reveals original prompt and transformed prompt side by side, AI response, and observations
- Toggle controlled by local `useState`

## UI & Styling

- **Theme:** Dark, GitHub-inspired (`#0d1117` background, `#161b22` card backgrounds, `#30363d` borders)
- **Layout:** Single-page, no routing
- **Typography:** Monospace for prompts and responses; sans-serif for metadata and observations
- **Prompt display:** Original and transformed prompts rendered side by side within expanded card
- **Tags:** Transformation type and token count displayed as pill badges on the collapsed card

## Deployment

```json
// package.json scripts
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

Run `npm run deploy` to build and push `dist/` to the `gh-pages` branch. GitHub Pages serves from that branch automatically.

### `.gitignore` additions
```
dist/
.superpowers/
```

## Out of Scope

- Live AI API calls — all responses are pre-captured and stored in JSON
- User input / interactive prompt builder
- Filtering or search — flat chronological list only
- Authentication
- GitHub Actions CI (can be added later)
- TypeScript (can be added later if schema grows complex)
