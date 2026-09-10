import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

export default function Users() {
  const endpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/` : '/api/users/'
  const [users, setUsers] = useState([]); const [status, setStatus] = useState('loading')
  useEffect(() => { const controller = new AbortController(); fetchItems(endpoint, controller.signal).then(setUsers).then(() => setStatus('ready')).catch((error) => { if (error.name !== 'AbortError') setStatus('error') }); return () => controller.abort() }, [endpoint])
  return <section className="resource-page"><p className="eyebrow">PEOPLE / THE OCTOFIT CREW</p><h1>Your people</h1><p className="page-description">Meet the members making movement part of their rhythm.</p>{status === 'error' && <p className="error-message">Could not load users. Check the API connection.</p>}<div className="people-list">{users.length ? users.map((user) => <div className="person-row" key={user._id || user.id}><span className="person-avatar">{user.displayName?.slice(0, 1) || '?'}</span><span><strong>{user.displayName}</strong><small>@{user.username}</small></span><span className="person-email">{user.email}</span></div>) : <div className="empty-state">{status === 'loading' ? 'Loading...' : 'No users yet.'}</div>}</div></section>
}