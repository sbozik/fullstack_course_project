import type { PollingEvent } from '../availability/availability'

export const data: PollingEvent[] = [
  {
    title: 'Tím bulding',

    id: '1',
    location: 'Praha',
    dates: [
      {
        timestamp: 1726514405258,
        records: [
          { name: 'Honza', answer: 'yes' },
          { name: 'Jana', answer: 'no' },
        ],
      },
      {
        timestamp: 1726600861177,
        records: [{ name: 'Jana', answer: 'no' }],
      },
    ],
  },
]
