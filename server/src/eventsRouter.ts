import { Router } from 'express';
import { getEvents, getEvent, addEvent } from "./db/db";

const eventsRouter = Router();

eventsRouter.get("/", (_req, res ) => {
    const items = getEvents();
    res.json({ items });
});

eventsRouter.get("/:id", (req, res ) => {
    const id = Number(req.params.id)
    if (!Number.isFinite(id)) return res.status(400).json({ message: "Invalid ID" });

    try {
        const ev = getEvent(id);
        res.json(ev);
    }
    catch {
        res.status(404).json({ message: "Not found" });
    }
});

eventsRouter.post('/', (req, res) => {
    const body = req.body as {
        title?: unknown;
        location?: unknown;
        dates?: unknown;
    };

    if (!body || typeof body !== "object") {
        return res.status(400).json({ message: "Invalid JSON" });
    }

    const { title, location, dates } = body;

    if (typeof title !== "string" || title.trim() === "") {
        return res.status(422).json({ message: "Title is required" });
    }

    if (!Array.isArray(dates) || dates.length < 1 || dates.length > 10) {
        return res.status(422).json({ message: "Please provide 1 - 10 dates" });
    }

    const datesMs = dates.map((x) => Number(x));
    if (datesMs.some((n) => !Number.isFinite(n))) {
        return res.status(422).json({ message: 'All dates must be valid timestamps' });
    }

    const insertEvent = {
        id: '0',
        title: String(title),
        location: location == null ? '': String(location),
        dates: dates.map((ts: number) => ({timestamp: Number(ts), records: [] })),
    };

    try {
        addEvent(insertEvent);
        return res.status(201).json({ message: 'Event created' });
    }
    catch (e) {
        console.error('POST /api/events failed', e);
        return res.status(500).json({ message: 'Internal Server Error' })
    }
});

export default eventsRouter;