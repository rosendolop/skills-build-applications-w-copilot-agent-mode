import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/">
          <span className="brand-mark">OF</span>
          <span><strong>OctoFit</strong><small>team wellness</small></span>
        </NavLink>
        <Navigation />
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Overview />} />
        </Routes>
      </main>
    </div>
  )
}

function Navigation() {
  const links = [
    ['Activities', '/activities'],
    ['Leaderboard', '/leaderboard'],
    ['Teams', '/teams'],
    ['People', '/users'],
    ['Workouts', '/workouts'],
  ]

  return <nav className="main-nav" aria-label="Main navigation">{links.map(([label, path]) => <NavLink key={path} to={path}>{label}</NavLink>)}</nav>
}

function Overview() {
  const location = useLocation()
  return (
    <section className="overview">
      <p className="eyebrow">OCTOFIT / YOUR WEEK AT A GLANCE</p>
      <h1>Move together.<br /><em>Feel the difference.</em></h1>
      <p className="intro">A clear view of your team&apos;s momentum, every session and every small win.</p>
      <div className="overview-links">
        <NavLink className="primary-action" to="/activities">View activity <span aria-hidden="true">↗</span></NavLink>
        <NavLink className="quiet-action" to="/leaderboard">See the leaderboard</NavLink>
      </div>
      <div className="overview-note"><span>●</span> Live from your OctoFit API <small>{location.pathname === '/' ? 'Ready when you are' : ''}</small></div>
    </section>
  )
}

export default App
