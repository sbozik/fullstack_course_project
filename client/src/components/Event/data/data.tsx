import type {EventProps} from "../availability/availability.tsx";

export const events: EventProps[] = [
    {
        location: "Praha",
        id: "1",
        title: "Party",
                dates: [
            {
                timestamp: new Date(2025, 10, 20).getTime(),
                records: [
                    { name: "Renata", answer: "yes" },
                    { name: "Larissa", answer: "no" },
                ],
            },
            {
                timestamp: new Date(2025, 10, 21).getTime(),
                records: [
                    { name: "Renata", answer: "if-needed" },
                    { name: "Larissa", answer: "yes" },
                    { name: "Henrik", answer: "yes" },
                ],
            },
        ],
    },
    {
        location: "Brno",
        id: "2",
        title: "Morava rave",
                dates: [
            {
                timestamp: new Date(2025, 9, 3).getTime(), // 3. 3. 2025
                records: [
                    { name: "Renata", answer: "no" },
                    { name: "Larissa", answer: "yes" },
                    {name: "Henrik", answer: "if-needed"}
                ],
            },
        ],
    },
];