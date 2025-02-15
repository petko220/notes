import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import noteRoutes from "./routes/noteRoutes";
import authRoutes from "./routes/authRoutes";
import { setupSwagger } from "./config/swagger";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use('/api', noteRoutes);

setupSwagger(app);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Documentation at http://localhost:${PORT}/api-docs`);
});
