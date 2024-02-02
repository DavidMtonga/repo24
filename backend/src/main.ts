import cors from "cors";
import express, { Application, Response } from "express";
import compression from "compression";
import "dotenv/config";
import morgan from "morgan";
import productRouter from "./products/router";
import cookieParser from "cookie-parser";
import authRouter from "./user/router";

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(morgan("dev"));

app.use("/api/product", productRouter);
app.use("/api/user", authRouter);

app.get("/", (_, res: Response) => {
  res.send("API's up");
});

app.listen(port, () => {
  console.log(`listening pa http://localhost:${port}`);
});
