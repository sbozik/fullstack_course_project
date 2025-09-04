import { it, expect, vi, afterEach } from 'vitest'
import { render, screen, waitFor, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import EventDetail from './EventDetail'

const jsonResponse = (data: unknown, init?: ResponseInit): Response =>
  new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })

afterEach(() => {
  vi.restoreAllMocks()
  cleanup()
})

it('renders event detail for an existing id (fetch 200)', () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
    jsonResponse({
      id: '123',
      title: 'Test Event',
      location: 'Praha',
      dates: [
        { timestamp: 1726514405258, records: [{ name: 'Honza', answer: 'yes' }] },
      ],
    }),
  )

  render(
    <MemoryRouter initialEntries={['/events/123']}>
      <Routes>
        <Route path="/events/:id" element={<EventDetail />} />
      </Routes>
    </MemoryRouter>,
  )

  expect(screen.getByText(/Načítám/i)).toBeInTheDocument()

  return waitFor(() => {
    expect(screen.getByText(/Detail události/i)).toBeInTheDocument()
    expect(screen.getByText(/Test Event/i)).toBeInTheDocument()
    expect(screen.getByText(/Praha/i)).toBeInTheDocument()
  })
})

it('shows not-found message when API returns 404', () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
    jsonResponse({ message: 'Not found' }, { status: 404 }),
  )

  render(
    <MemoryRouter initialEntries={['/events/999']}>
      <Routes>
        <Route path="/events/:id" element={<EventDetail />} />
      </Routes>
    </MemoryRouter>,
  )

  return waitFor(() => {
    expect(screen.getByText(/Událost nenalezena/i)).toBeInTheDocument()
  })
})
