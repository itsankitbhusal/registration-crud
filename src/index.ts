import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();

const app = express();

app.use(express.json());
connectDB();


const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

app.get("/:id", (req: Request, res: Response) => {
  console.log("req.params: ", req.params);
  // res.send('with id: ', req.params);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
