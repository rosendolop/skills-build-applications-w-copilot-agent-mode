import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

export default function Activities() {
  const endpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/` : '/api/activities/'
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const controller = new AbortController()
    fetchItems(endpoint, controller.signal).then(setActivities).then(() => setStatus('ready')).catch((error) => { if (error.name !== 'AbortError') setStatus('error') })
    return () => controller.abort()
  }, [endpoint])

  return <section className="resource-page"><p className="eyebrow">ACTIVITY LOG</p><h1>Keep your momentum visible.</h1><p className="page-description">Recent sessions from across your team.</p>{status === 'error' && <p className="error-message">Could not load activities. Check the API connection.</p>}<div className="data-grid">{activities.length ? activities.map((activity) => <article className="data-card" key={activity._id || activity.id}><span className="card-kicker">{activity.type}</span><strong>{activity.durationMinutes} min</strong><small>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : 'Date pending'}</small></article>) : <div className="empty-state">{status === 'loading' ? 'Loading...' : 'No activities yet.'}</div>}</div></section>
}