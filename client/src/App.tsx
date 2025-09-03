import * as React from 'react'
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import EventsList from './pages/EventsList'
import EventDetail from './pages/EventDetail'
import NewEvent from './pages/NewEvent'
import { Navigation } from './components/Navigation/Navigation'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/events" replace />} />
        <Route path="/events" element={<EventsList />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/events/new" element={<NewEvent />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
