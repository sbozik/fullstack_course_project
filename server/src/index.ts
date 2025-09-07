import express, { NextFunction, Request, Response } from "express";
import eventsRouter from './eventsRouter'
import { configure } from "./middleware";
import cors from "cors";

const port = 4000;
const app = express();
configure(app);

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

app.get('/', (_req, res) => {
    res.send('Hello Stranger!');
});

app.use("/api/events", eventsRouter);

app.use((_req, _res) => {
    _res.status(404).json({message: 'Not found'});
});

app.use((_err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(_err.message);
    res.status(500).json({message: 'Internal Server Error'});
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

