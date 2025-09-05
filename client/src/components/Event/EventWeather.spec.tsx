import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, waitFor, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { EventWeather } from './EventWeather'

const jsonResponse = (data: unknown, init?: ResponseInit): Response =>
  new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })

describe('<EventWeather />', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    cleanup()
  })
  it('shows weather for a city', () => {
    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(
        jsonResponse({ results: [{ latitude: 50.08, longitude: 14.44 }] }),
      )
      .mockResolvedValueOnce(
        jsonResponse({
          daily: { temperature_2m_max: [25], temperature_2m_min: [15] },
          daily_units: { temperature_2m_max: '°C' },
        }),
      )

    render(<EventWeather city="Praha" />)

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

    render(<EventWeather city="asdfQwer" />)

    return waitFor(() => {
      expect(screen.getByText(/Nenašel jsem město/i)).toBeInTheDocument()
    })
  })

  it('shows error when weather API fails', () => {
    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(
        jsonResponse({ results: [{ latitude: 49.20, longitude: 16.61 }] }),
      )
      .mockResolvedValueOnce(
        jsonResponse({ message: 'fail' }, { status: 500 }),
      )

    render(<EventWeather city="Brno" />)

    return waitFor(() => {
      expect(screen.getByText(/Nenašel jsem počasí/i)).toBeInTheDocument()
    })
  })
})
