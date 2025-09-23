// src/app.ts
import express, { Application } from "express";
import morgan from "morgan";
import logger from "./utils/logger";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { errorHandler } from "./middlewares/errorhandler";
import heathRoute from "./routes/health.route";

//import routes
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRouters";
import orderRoute from "./routes/orderRouters";
import cartRoute from "./routes/cartRoute";
import cartItemRoute from "./routes/cartItemRoute";
import orderItemRoute from "./routes/orderItemRoute";
import authRoutes from "./routes/authRoute";
import checkoutRoute from "./routes/checkoutRoute";

const app: Application = express();

// 🔹 Security Middlewares
app.use(helmet()); // secure HTTP headers
app.use(cors({
  origin: process.env.FRONTEND_URL || "*", // later set your frontend URL
  credentials: true,
}));
app.use(express.json());

// 🔹 Rate Limiting (global)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, // limit per IP
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// 🔹 Logging (dev only)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//routes
app.use("/api/health", heathRoute);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoute);
app.use("/api/carts", cartRoute);
app.use("/api/cart-items", cartItemRoute);
app.use("/api/order-items", orderItemRoute);
app.use("/api/auth", authRoutes);
app.use("/checkout", checkoutRoute);

// error handler
app.use(errorHandler);

export default app;
