import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// 1. CONFIGURATION (Must be at the top)
// This loads the .env file from the root directory
dotenv.config();

// 2. IMPORT LOCAL FILES (After dotenv config)
import connectDB from "./config/db.js";
import careerRoutes from "./routes/careerRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";

// Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: [
    "https://www.raventra.in", // The one you specifically asked for
    "http://localhost:3000"    // REQUIRED for you to work on your laptop
  ],
  credentials: true
}));
app.use(express.json());

// Static Folder for Uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/career", careerRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/inventory", inventoryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
