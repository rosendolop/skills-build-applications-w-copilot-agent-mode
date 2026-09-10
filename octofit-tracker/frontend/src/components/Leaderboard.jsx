import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

export default function Leaderboard() {
  const endpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/` : '/api/leaderboard/'
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('loading')
  useEffect(() => { const controller = new AbortController(); fetchItems(endpoint, controller.signal).then(setEntries).then(() => setStatus('ready')).catch((error) => { if (error.name !== 'AbortError') setStatus('error') }); return () => controller.abort() }, [endpoint])
  return <section className="resource-page"><p className="eyebrow">COMPETITION / THIS SEASON</p><h1>Leaderboard</h1><p className="page-description">Consistency adds up. See who is leading the way.</p>{status === 'error' && <p className="error-message">Could not load the leaderboard. Check the API connection.</p>}<div className="leaderboard-list">{entries.length ? [...entries].sort((a, b) => (a.rank || 999) - (b.rank || 999)).map((entry, index) => <div className={`leaderboard-row ${index === 0 ? 'leader' : ''}`} key={entry._id || entry.id}><span className="rank">{entry.rank || index + 1}</span><span className="person-id">{entry.userId?.displayName || entry.userId || 'OctoFit member'}</span><strong>{entry.points} <small>pts</small></strong></div>) : <div className="empty-state">{status === 'loading' ? 'Loading...' : 'No leaderboard entries yet.'}</div>}</div></section>
}