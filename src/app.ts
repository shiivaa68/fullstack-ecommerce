import express, { Application } from "express";
import cors from "cors";
import heathRoute from "./routes/health.route";

//import routes
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRouters";

const app: Application = express();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/health", heathRoute);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

export default app;
