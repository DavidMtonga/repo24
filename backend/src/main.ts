import cors from "cors";
import express, { Application, Response } from "express";
import compression from "compression";
import "dotenv/config";
import morgan from "morgan";

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(morgan("dev"));

app.get("/", (_, res: Response) => {
  res.send("API up");
});

app.listen(port, () => {
  console.log(`listening on https://localhost:${port}`);
});
