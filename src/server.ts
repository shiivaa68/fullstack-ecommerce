import app from "./app";
import dotenv from "dotenv";
import sequelize from "./config/database";

dotenv.config();
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("database connect successfully");
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("unable to connect to the database ", error);
    process.exit(1);
  }
}

startServer();
