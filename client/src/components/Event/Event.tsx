import * as React from 'react'
import type { UserRecord, DateRecord } from './user/user'

function formDate(ts: number) {
  return new Date(ts).toLocaleDateString()
}

export type Props = { lokace?: string, nazev: string, datum: DateRecord[] }

export const Event: React.FC<Props> = (props) => {
  const uniqueParticipants = new Set<string>(props.datum.flatMap((day: DateRecord) => day.records.map((rec: UserRecord): string => rec.name)))

  const participants: string[] = []
  uniqueParticipants.forEach((value) => {
    participants.push(value)
  })

  return (
    <table>
      <caption>
        {props.nazev}
        {props.lokace ? `: ${props.lokace}` : ''}
      </caption>
      <thead>
        <tr>
          <th>Účastník</th>
          {props.datum.map(day => (<th key={day.timestamp}>{formDate(day.timestamp)}</th>))}
        </tr>
      </thead>
      <tbody>
        {participants.map(participant => (
          <tr key={participant}>
            <th scope="row">{participant}</th>
            {props.datum.map((day: DateRecord) => {
              const record = day.records.find(rec => rec.name === participant)
              const answer: string = record?.answer ?? '-'
              return (
                <td key={`${day.timestamp}:${participant}`} data-answer={answer}>
                  {answer}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
