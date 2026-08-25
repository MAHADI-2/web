import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import ratelimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";
import router from "./api.js";
import cors from "cors";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use( cors() )
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(ratelimit({
 windowMs: 15 * 60 * 1000,
 max: 100,
 standardHeaders: true,
 legacyHeaders: false,
 validate: { xForwardedForHeader: false },
}));

app.use("/api/v1", router);

export default app;
