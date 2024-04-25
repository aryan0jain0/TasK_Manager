import express from "express";
import userRouter from "./routes/userRoutes.js";

export const app = express();

app.use(express.json());
app.use("/api/v1/user", userRouter);
