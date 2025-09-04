import { Router } from 'express';
import { data as items } from "./data";

const eventsRouter = Router();

eventsRouter.get("/", (_req, res ) => {
    res.json({ items });
});

eventsRouter.get("/:id", (req, res ) => {
    const id = req.params.id
    const event = items.find(e => String(e.id) === String(id));
    if (!event) return res.status(404).json({ message: "Not found" });
    res.json(event);
});

eventsRouter.post('/', (req, res, _next) => {
    const body = req.body as {
        title?: unknown;
        location?: unknown;
        dates?: unknown;
    };

    if (typeof body !== "object" || body == null) {
        return res.status(400).json({ message: "Invalid JSON" });
    }

    const title = body.title;
    const location = body.location; // optional
    const dates = body.dates;

    if (typeof title !== "string" || title.trim() === "") {
        return res.status(422).json({ message: "Title is required" });
    }

    if (!Array.isArray(dates) || dates.length < 1 || dates.length > 10) {
        return res
            .status(422)
            .json({ message: "Please provide 1 - 10 dates" });
    }

       const maxId = items.reduce((max, ev) => {
        const idNum = Number(ev.id);
        return idNum > max ? idNum : max;
    }, 0);

    const id = (maxId + 1).toString();

    const newEvent = {
        id,
        title: title.trim(),
        location: typeof location === "string" && location.trim() !== "" ? location.trim() : undefined,
        dates: (dates as number[]).map((ts) => ({
            timestamp: Number(ts),
            records: [],
        })),
    };

    items.push(newEvent);
    return res.status(201).json(newEvent);
});

export default eventsRouter;