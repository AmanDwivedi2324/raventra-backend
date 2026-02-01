import express from "express";
import multer from "multer";
import path from "path";
import {
  createApplicant,
  getApplicants,
} from "../controllers/careerController.js";

const router = express.Router();

// Configure Multer for PDF/Docs
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /pdf|doc|docx/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb("Error: Resumes only (PDF, DOC, DOCX)!");
    }
  },
});

router.post("/", upload.single("resume"), createApplicant);
router.get("/all", getApplicants);

export default router;
