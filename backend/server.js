import express from 'express';
import router from './routes/authRoutes.js'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './database/db.js';
import issueRoutes from "./routes/issueRoutes.js";
import path from "path";
import { fileURLToPath } from "url";


dotenv.config()

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use('/api/auth/', router);
app.use("/api/issues", issueRoutes);
app.get("/api/health", (_req, res) => {
    res.json({ success: true, message: "JanSeva API is running" });
});

const PORT = process.env.SERVER_PORT || process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", ()=>{
    console.log(`Server running on ${PORT}`);
})
