import type { EventProps } from "./availability";
import type { DateRecord } from "../user/user";

describe("EventProps (basic)", () => {
    it("has title, optional location, and dates", () => {
        const dates: DateRecord[] = [
            { timestamp: 111, records: [{ name: "Renata", answer: "yes" }] },
            { timestamp: 222, records: [{ name: "Larissa", answer: "no" }] },
        ];

        const event: EventProps = {
            id: "e1",
            title: "Schuzka",
            location: "Praha",
            dates,
        };

        expect(event.id).toBe("e1");
        expect(event.title).toBe("Schuzka");
        expect(event.location).toBe("Praha");
        expect(event.dates).toHaveLength(2);
    });

    it("supports missing location", () => {
        const event: EventProps = {
            id: "e2",
            title: "Bez mista",
            dates: [{ timestamp: 333, records: [] }],
        };

        expect(event.location).toBeUndefined();
        expect(event.dates.length).toBe(1);
    });
});
