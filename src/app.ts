import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

//middlewares
app.use(cors());
app.use(express.json());

//test route
app.get("/", (req: Request, res: Response) => {
  res.send("E-commerce API is runnig!");
});
export default app;
