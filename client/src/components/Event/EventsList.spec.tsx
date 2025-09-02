import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { EventsList } from './EventsList'
import '@testing-library/jest-dom/vitest'
import type { PollingEvent } from './availability/availability'

const mockData: PollingEvent[] = [
  {
    id: '1',
    title: 'Team building',
    location: 'Praha',
    dates: [],
  },
  {
    id: '2',
    title: 'Workshop',
    dates: [],
  },
]

describe('<EventsList />', () => {
  it('renders list of events with links', () => {
    render(
      <BrowserRouter>
        <EventsList data={mockData} />
      </BrowserRouter>,
    )

    expect(screen.getByText(/Team building/)).toBeInTheDocument()
    expect(screen.getByText(/Workshop/)).toBeInTheDocument()

    expect(screen.getByText(/Team building/).closest('a')).toHaveAttribute(
      'href',
      '/events/1',
    )
  })
})
