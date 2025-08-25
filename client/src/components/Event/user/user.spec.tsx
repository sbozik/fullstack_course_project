import type { UserRecord, DateRecord } from "./user";

describe("user types (basic)", () => {
    it("UserRecord holds name and answer", () => {
        const u: UserRecord = { name: "Renata", answer: "if-needed" };
        expect(u.name).toBe("Renata");
        expect(u.answer).toBe("if-needed");
    });

    it("DateRecord holds timestamp and records", () => {
        const day: DateRecord = {
            timestamp: Date.now(),
            records: [
                { name: "Renata", answer: "yes" },
                { name: "Larissa", answer: "no" },
            ],
        };
        expect(typeof day.timestamp).toBe("number");
        expect(day.records.length).toBe(2);
    });
});