import { describe, it, expect, afterEach, vi, type Mock } from 'vitest'
import { render, screen, waitFor, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import EventsListPage from '../../pages/EventsList'

vi.mock('../../apiClient', () => {
  return {
    getEvents: vi.fn(),
  }
})

import { getEvents } from '../../apiClient'

const mockGetEvents = () => getEvents as unknown as Mock

afterEach(() => {
  vi.restoreAllMocks()
  cleanup()
})

describe('<EventsList /> (fetches from API)', () => {
  it('renders items from API', () => {
    mockGetEvents().mockResolvedValueOnce({
      items: [
        {
          id: 1,
          title: 'Super akce',
          location: 'Praha',
          dates: [],
        },
        {
          id: 2,
          title: 'Super akce 2',
          location: 'Brno',
          dates: [],
        },
      ],
    })

    render(
      <MemoryRouter initialEntries={['/events']}>
        <Routes>
          <Route path="/events" element={<EventsListPage />} />
        </Routes>
      </MemoryRouter>,
    )

    return waitFor(() => {
      expect(screen.getByText(/Super akce — Praha/i)).toBeInTheDocument()
      expect(screen.getByText(/Super akce 2 — Brno/i)).toBeInTheDocument()
    })
  })

  it('shows error message when API fails', () => {
    mockGetEvents().mockRejectedValueOnce(new Error('Nepodařilo se načíst události'))

    render(
      <MemoryRouter initialEntries={['/events']}>
        <Routes>
          <Route path="/events" element={<EventsListPage />} />
        </Routes>
      </MemoryRouter>,
    )

    return waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/Nepodařilo se|Chyba|fetch failed/i)
    })
  })
})
