import { render } from '@testing-library/react'
import { Event } from './Event'
import type { DateRecord } from './user/user'

const dates: DateRecord[] = [
  {
    timestamp: new Date(2026, 0, 1).getTime(),
    records: [
      { name: 'Renata', answer: 'yes' },
      { name: 'Larissa', answer: 'no' },
    ],
  },
  {
    timestamp: new Date(2026, 0, 2).getTime(),
    records: [
      { name: 'Renata', answer: 'if-needed' },
      { name: 'Larissa', answer: 'yes' },
    ],
  },
]

const baseProps = {
  id: 'e1',
  title: 'Test Event',
  location: 'Praha',
  dates,
}

describe('<Event />', () => {
  it('renders caption with title and location', () => {
    const { container } = render(
      <Event nazev={baseProps.title} lokace={baseProps.location} datum={baseProps.dates} />,
    )

    const caption = container.querySelector('caption')
    expect(caption).not.toBeNull()
    expect(caption!.textContent).toContain('Test Event')
    expect(caption!.textContent).toContain('Praha')
  })

  it('renders all participant rows', () => {
    const { container } = render(
      <Event nazev={baseProps.title} lokace={baseProps.location} datum={baseProps.dates} />,
    )

    const rows = container.querySelectorAll('tbody tr')
    expect(rows.length).toBe(2)

    const firstRowName = rows[0].querySelector('th')?.textContent
    const secondRowName = rows[1].querySelector('th')?.textContent

    expect(firstRowName).toBe('Renata')
    expect(secondRowName).toBe('Larissa')
  })

  it('renders answers for each participant/date', () => {
    const { container } = render(
      <Event nazev={baseProps.title} lokace={baseProps.location} datum={baseProps.dates} />,
    )

    const rows = container.querySelectorAll('tbody tr')

    const renataCells = rows[0].querySelectorAll('td')
    expect(renataCells[0].textContent).toBe('yes')
    expect(renataCells[1].textContent).toBe('if-needed')

    const larissaCells = rows[1].querySelectorAll('td')
    expect(larissaCells[0].textContent).toBe('no')
    expect(larissaCells[1].textContent).toBe('yes')
  })
})
