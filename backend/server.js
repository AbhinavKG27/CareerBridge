import app from "./app.js";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";

config();

dbConnection()
  .then(() => {
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });