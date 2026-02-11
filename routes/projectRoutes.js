import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { createProject, deleteProject, getProjectById, getProjects, updateProject } from "../controllers/projectController.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// 1. Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Configure Storage Engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "raventra-projects", // Folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"], // Allowed file types
  },
});

const upload = multer({ storage: storage });

// 3. Routes (Same as before, just using the new 'upload')
router.post("/", upload.single("image"), createProject);
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.delete("/:id", deleteProject);
router.put("/:id", upload.single("image"), updateProject);

export default router;