import * as React from 'react'
import type { DateRecord } from '../../types/api'

type Props = {
  nazev: string
  lokace: string | null | undefined
  datum: DateRecord[]
}

export const Event: React.FC<Props> = ({ nazev, lokace, datum }) => {
  const participants = Array.from(
    new Set(
      datum.flatMap(d => d.records.map(r => r.name)),
    ),
  )

  return (
    <table>
      <caption>
        {nazev}
        {lokace ? `: ${lokace}` : ''}
      </caption>

      <thead>
        <tr>
          <th>Účastník</th>
          {datum.map(day => (
            <th key={day.timestamp}>{new Date(day.timestamp).toLocaleDateString()}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {participants.map(name => (
          <tr key={name}>
            <th scope="row">{name}</th>

            {datum.map((day) => {
              const rec = day.records.find(rec => rec.name === name)
              return (
                <td key={day.timestamp}>
                  {rec?.answer ?? ''}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
