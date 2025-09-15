import Database from 'better-sqlite3'
import type { PollingEvent, DateRecord } from "../dataTypes";

const db = new Database('events.db', { verbose: console.log });

export const createSchema = () => {
db.exec(`
    CREATE TABLE IF NOT EXISTS \`events\` (
    \`id\` INTEGER PRIMARY KEY AUTOINCREMENT,
    \`title\` VARCHAR(255) NULL,
    \`location\` VARCHAR(512) NULL);

    CREATE TABLE IF NOT EXISTS \`event_dates\` (
    \`id\` INTEGER PRIMARY KEY AUTOINCREMENT,
    \`timestamp\` INTEGER NOT NULL,
    \`event_id\` INTEGER NOT NULL);

    CREATE TABLE IF NOT EXISTS \`user_responses\` (
    \`id\` INTEGER PRIMARY KEY AUTOINCREMENT,
    \`user\` VARCHAR(512) NULL,
    \`answer\` VARCHAR(45) NULL,
    \`event_id\` INTEGER NOT NULL,
    \`dates_id\` INTEGER NOT NULL);
    `);
};

export const addEvent = (newEvent: PollingEvent) => {
const insertEvent = db.prepare(`INSERT INTO events (title, location) VALUES (?, ?);`);
    const newEventDb = insertEvent.run(newEvent.title, newEvent.location || "");
    const newEventId = Number(newEventDb.lastInsertRowid);

const insertDate = db.prepare(`INSERT INTO event_dates (timestamp, event_id) VALUES (?, ?)`);

    newEvent.dates.forEach((date: DateRecord) => {
        insertDate.run(date.timestamp, newEventId);
    })
};

export const getEvents = () => {
const rows = db.prepare(`SELECT id, title, location FROM events`).all() as
        Array<{ id: number; title: string; location: string | null }>

    const getDates = db.prepare(
        `SELECT timestamp FROM event_dates WHERE event_id = ? ORDER BY timestamp ASC`
    )

    const events: PollingEvent[] = rows.map((e) => {
        const dateRows = getDates.all(Number(e.id)) as Array<{ timestamp: number }>
        const dates: DateRecord[] = dateRows.map(r => ({
            timestamp: r.timestamp,
            records: [],
        }))

        return { id: e.id, title: e.title, location: e.location ?? '', dates } as PollingEvent
    })

    return events
}

export const getEvent = (eventId: number): PollingEvent => {
    const ev = db.prepare(
        `SELECT id, title, location FROM events WHERE id = ?`
    ).get(eventId) as { id: number; title: string; location: string | null } | undefined

    if (!ev) {
        throw new Error('Event not found')
    }

    const dateRows = db.prepare(
        `SELECT timestamp FROM event_dates WHERE event_id = ? ORDER BY timestamp ASC`
    ).all(eventId) as Array<{ timestamp: number }>

    const dates: DateRecord[] = dateRows.map(r => ({
        timestamp: r.timestamp,
        records: [],
    }))

    return { id: ev.id, title: ev.title, location: ev.location ?? '', dates } as PollingEvent
}