import { Express } from "express";

export const configure = (app: Express) => {
    app.set("trust proxy", 1);
}