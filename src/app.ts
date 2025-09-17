import express, { Application, Request, Response } from "express";
import cors from "cors";
import heathRoute from "./routes/health.route"



const app: Application = express();


//middlewares
app.use(cors());
app.use(express.json());

//routes 
app.use("/api/health",heathRoute)

export default app;
