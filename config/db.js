import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_CONNECTION_URL)
  .then(() => {
    console.log(`database connection successful`);
  })
  .catch((err) => {
    console.log(`error: ${err.message}`);
  });
