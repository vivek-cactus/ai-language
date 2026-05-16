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
