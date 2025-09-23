import express, { Application } from "express";
import morgan from "morgan";
import logger from "./utils/logger";
import cors from "cors";
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

//middlewares
app.use(cors());
app.use(express.json());

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

app.use(errorHandler);

export default app;
