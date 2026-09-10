import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

export default function Teams() {
  const endpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/` : '/api/teams/'
  const [teams, setTeams] = useState([]); const [status, setStatus] = useState('loading')
  useEffect(() => { const controller = new AbortController(); fetchItems(endpoint, controller.signal).then(setTeams).then(() => setStatus('ready')).catch((error) => { if (error.name !== 'AbortError') setStatus('error') }); return () => controller.abort() }, [endpoint])
  return <section className="resource-page"><p className="eyebrow">COMMUNITY / YOUR CREWS</p><h1>Teams</h1><p className="page-description">Shared goals are easier to keep. Find your people.</p>{status === 'error' && <p className="error-message">Could not load teams. Check the API connection.</p>}<div className="data-grid">{teams.length ? teams.map((team) => <article className="data-card team-card" key={team._id || team.id}><span className="team-avatar">{team.name?.slice(0, 1) || '?'}</span><strong>{team.name}</strong><small>{team.members?.length || 0} members</small></article>) : <div className="empty-state">{status === 'loading' ? 'Loading...' : 'No teams yet.'}</div>}</div></section>
}