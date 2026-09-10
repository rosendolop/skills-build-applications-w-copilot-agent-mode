import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

export default function Workouts() {
  const endpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/` : '/api/workouts/'
  const [workouts, setWorkouts] = useState([]); const [status, setStatus] = useState('loading')
  useEffect(() => { const controller = new AbortController(); fetchItems(endpoint, controller.signal).then(setWorkouts).then(() => setStatus('ready')).catch((error) => { if (error.name !== 'AbortError') setStatus('error') }); return () => controller.abort() }, [endpoint])
  return <section className="resource-page"><p className="eyebrow">LIBRARY / FIND YOUR NEXT</p><h1>Workouts</h1><p className="page-description">A little structure for wherever your energy takes you.</p>{status === 'error' && <p className="error-message">Could not load workouts. Check the API connection.</p>}<div className="data-grid workout-grid">{workouts.length ? workouts.map((workout) => <article className="data-card workout-card" key={workout._id || workout.id}><span className="card-kicker">{workout.difficulty}</span><strong>{workout.name}</strong><p>{workout.description}</p><small>{workout.durationMinutes} minutes</small></article>) : <div className="empty-state">{status === 'loading' ? 'Loading...' : 'No workouts yet.'}</div>}</div></section>
}