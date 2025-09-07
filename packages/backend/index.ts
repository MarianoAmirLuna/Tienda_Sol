import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
      : true,
  }),
);

app.get("/hello", (req: Request, res: Response) => {
  res.json({ message: "hello world" });
});

const PORT = process.env.SERVER_PORT || 8000;

app.listen(PORT, () => {
  console.log(`Backend escuchando en puerto ${PORT}`);
});