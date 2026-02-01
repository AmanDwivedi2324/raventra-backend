import Applicant from "../models/Applicant.js";

// @desc    Submit a job application
// @route   POST /api/career
export const createApplicant = async (req, res) => {
  try {
    const { name, email, phone, position } = req.body;

    // Validate if file exists
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Resume is required" });
    }

    const resumePath = `uploads/${req.file.filename}`;

    const applicant = await Applicant.create({
      name,
      email,
      phone,
      position,
      resume: resumePath,
    });

    res.status(201).json({ success: true, data: applicant });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all applicants
// @route   GET /api/career/all
export const getApplicants = async (req, res) => {
  try {
    const applicants = await Applicant.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: applicants });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
