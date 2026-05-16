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
