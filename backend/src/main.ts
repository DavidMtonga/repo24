import cors from "cors";
import express, { Express } from "express";
import compression from "compression";
import "dotenv/config";

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(compression());

app.get("/", (_, res) => {
  res.send("API up");
});

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
