import express from "express";
import multer from "multer";
import { createProject, deleteProject, getProjectById, getProjects, updateProject } from "../controllers/projectController.js";

const router = express.Router();

// --- Reuse Multer Logic ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // timestamp-name.jpg
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// --- Updated Route ---
// Now acts like the Career route: accepts file + text data
router.post("/", upload.single("image"), createProject);
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.delete("/:id", deleteProject);
router.put("/:id", upload.single("image"), updateProject);

export default router;