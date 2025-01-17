import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";

import authRoutes from "./routes/user.routes";

dotenv.config();

const app = express();

app.use(express.json());
connectDB();

const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
