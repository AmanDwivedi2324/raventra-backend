import Applicant from "../models/Applicant.js"; 

// @desc    Submit a new application
// @route   POST /api/career/apply
export const applyForJob = async (req, res) => {
  try {
    const { name, email, phone, position } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Please upload your CV" });
    }

    const newApplicant = await Applicant.create({
      name,
      email,
      phone,
      position,
      resume: req.file.path,
    });

    res.status(201).json({
      success: true,
      message: "Application Submitted Successfully!",
      data: newApplicant,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all applications
// @route   GET /api/career/all
export const getApplicants = async (req, res) => {
  try {
    const applicants = await Applicant.find().sort({ createdAt: -1 });
    res.status(200).json(applicants);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
