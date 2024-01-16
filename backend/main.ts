import cors from "cors";
import express, { Express } from "express";
import compression from "compression";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(compression());
