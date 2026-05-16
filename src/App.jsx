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
