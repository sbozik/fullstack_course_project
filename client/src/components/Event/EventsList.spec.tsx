import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, waitFor, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { EventsList } from './EventsList'
import { MemoryRouter } from 'react-router-dom'

describe('<EventsList /> (fetches from API)', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    cleanup()
  })
  it('renders items from API', () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          items: [
            { id: '1', title: 'Super akce', location: 'Praha', dates: [] },
            { id: '2', title: 'Super akce 2', location: 'Brno', dates: [] },
          ],
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    )

    render(
      <MemoryRouter>
        <EventsList />
      </MemoryRouter>,
    )

    return waitFor(() => {
      expect(screen.getByText(/Super akce — Praha/i)).toBeInTheDocument()
      expect(screen.getByText(/Super akce 2 — Brno/i)).toBeInTheDocument()
      // Optional: links exist
      const first = screen.getByRole('link', { name: /Super akce — Praha/i })
      expect(first).toHaveAttribute('href', '/events/1')
    })
  })

  it('shows error message when API fails', () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ message: 'fail' }), { status: 500 }),
    )

    render(
      <MemoryRouter>
        <EventsList />
      </MemoryRouter>,
    )

    return waitFor(() => {
      expect(
        screen.getByText(/Nepodařilo se/i),
      ).toBeInTheDocument()
    })
  })
})
