import app from "./app";
import dotenv from "dotenv";
import sequelize from "./config/database";
import "./models/User";
import "./models/Product";
import "./models/Order";
import "./models/Cart";
import "./models/CartItem";
import "./models/OrderItem";

dotenv.config();
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("database connect successfully");
    await sequelize.sync({ alter: true });
    console.log("all models synced to db")
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("unable to connect to the database ", error);
    process.exit(1);
  }
}

startServer();
