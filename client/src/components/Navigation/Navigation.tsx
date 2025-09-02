import { Link } from 'react-router-dom'
import * as React from 'react'

export const Navigation: React.FC = () => (
  <nav className="navigation">
    <Link to="/events" style={{ padding: 12 }}>Events</Link>
    <Link to="/events/new">New Event</Link>
  </nav>
)
