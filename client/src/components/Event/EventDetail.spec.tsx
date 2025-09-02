import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, waitFor, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import { EventDetail } from './EventDetail'
import { WeatherForEvent } from './EventWeather'
import type { PollingEvent } from './availability/availability'

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

describe('WeatherForEvent', () => {
  it('shows weather for a city (happy path)', () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(jsonResponse({ results: [{ latitude: 50.08, longitude: 14.44 }] }),
    )
      .mockResolvedValueOnce(jsonResponse({ daily: { temperature_2m_max: [25], temperature_2m_min: [15] }, daily_units: { temperature_2m_max: '°C' },
      }),
      )

    render(<WeatherForEvent city="Praha" />)

    expect(screen.getByText(/Načítám/i)).toBeInTheDocument()

    return waitFor(() => {
      expect(
        screen.getByText(/Průměr:\s*20°C,\s*Min:\s*15°C,\s*Max:\s*25°C/i),
      ).toBeInTheDocument()
    })
  })

  it('shows error when city not found', () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      jsonResponse({ results: [] }),
    )

    render(<WeatherForEvent city="AsdfQwer" />)

    return waitFor(() => {
      expect(screen.getByText(/Nenašel jsem město/i)).toBeInTheDocument()
    })
  })

  it('shows error when weather API fails', () => {
    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(
        jsonResponse({ results: [{ latitude: 50.08, longitude: 14.44 }] }),
      )
      .mockResolvedValueOnce(
        jsonResponse({ message: 'fail' }, { status: 500 }),
      )

    render(<WeatherForEvent city="Brno" />)

    return waitFor(() => {
      expect(
        screen.getByText(/Nenašel jsem počasí/i),
      ).toBeInTheDocument()
    })
  })
})

const sampleEvent: PollingEvent = {
  id: 'e1',
  title: 'Test Event',
  location: 'Praha',
  dates: [
    {
      timestamp: new Date(2025, 0, 1).getTime(),
      records: [
        { name: 'Renata', answer: 'yes' },
        { name: 'Larissa', answer: 'no' },
      ],
    },
  ],
}

describe('<EventDetail />', () => {
  it('renders detail for an existing event', () => {
    render(<EventDetail event={sampleEvent} />)
    expect(screen.getByText(/Detail/i)).toBeInTheDocument()
    expect(screen.getByText(/Test Event/i)).toBeInTheDocument()
    expect(screen.getByText(/Praha/i)).toBeInTheDocument()
  })

  it('shows not-found message for unknown event (null)', () => {
    render(<EventDetail event={null} />)
    expect(
      screen.getByText(/Událost nenalezena|Event nenalezen/i),
    ).toBeInTheDocument()
  })
})
