import express from "express";
import multer from "multer";
import { applyForJob, getApplicants } from "../controllers/careerController.js";

const router = express.Router();

// --- Multer Configuration ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// --- Routes ---
router.post("/apply", upload.single("resume"), applyForJob);
router.get("/all", getApplicants);

export default router;
