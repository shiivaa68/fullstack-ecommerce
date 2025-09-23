// src/server.ts
import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./models"; // ✅ centralized Sequelize
import { errorHandler } from "./middlewares/errorhandler";
import authRoutes from "./routes/authRoute";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRouters";
import cartRoutes from "./routes/cartRoute";
import cartItemRoutes from "./routes/cartItemRoute";
import orderRoutes from "./routes/orderRouters";
import orderItemRoutes from "./routes/orderItemRoute";

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/cart-items", cartItemRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/order-items", orderItemRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

// ✅ DB connection
sequelize
  .authenticate()
  .then(async () => {
    console.log("✅ Database connected");

    if (NODE_ENV === "development") {
      await sequelize.sync({ alter: true });
      console.log("🔄 Database synced (dev mode)");
    } else {
      console.log("⚡ Running without schema sync (prod mode)");
    }

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Failed to connect to database:", err);
  });
