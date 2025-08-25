import * as React from 'react';
import type {EventProps} from "./availability/availability.tsx";
import type {UserRecord, DateRecord} from "./user/user.tsx"

function formDate(ts: number) {
    return new Date(ts).toLocaleDateString("cs-CZ");
}

export type Props = {lokace?: EventProps, nazev: EventProps, datum: EventProps};

export const Event: React.FC<Props> = (props) => {
    const uniqueParticipants = new Set<string>(props.datum.dates.flatMap((day: DateRecord) => day.records.map((rec: UserRecord): string => rec.name)));

    const participants: string[] = [];
    uniqueParticipants.forEach((value )  => {
        participants.push(value);
    });

    return (
        <table>
            <caption>{props.nazev.title}
                {props.lokace?.location ? `: ${props.lokace.location}` : ""}
            </caption>
            <thead>
                <tr>
                    <th>Účastník</th>
                    {props.datum.dates.map((day) => (<th key={day.timestamp}>{formDate(day.timestamp)}</th>))}
                </tr>
            </thead>
            <tbody>
                {participants.map((participant) => (
                    <tr key={participant}>
                        <th scope = "row">{participant}</th>
                        {props.datum.dates.map((day: DateRecord) => {
                            const record = day.records.find((rec) => rec.name === participant);
                            const answer: UserRecord["answer"] = record?.answer ?? "no";
                            return (
                                <td key={`${day.timestamp}:${participant}`} data-answer={answer}>
                                    {answer}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    )
    }
