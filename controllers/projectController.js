import Project from "../models/Project.js";

// @desc    Create a new project
// @route   POST /api/projects
export const createProject = async (req, res) => {
  try {
    const { title, location, type, status, description } = req.body;

    // 1. Handle Image Logic
    let imageUrl = "";
    if (req.file) {
      // Create the path string that we save to DB
      // Note: We use backward slashes for Windows compatibility if needed,
      // but standard forward slash is better for URLs.
      imageUrl = `uploads/${req.file.filename}`;
    }

    // 2. Save to DB
    const project = await Project.create({
      title,
      location,
      type,
      status,
      description,
      imageUrl, // Saving the STRING path, not the file
    });

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ... getProjects remains the same
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    // Use deleteOne() or findByIdAndDelete()
    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { title, location, type, status, description } = req.body;

    // Find the project first
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    // Update fields
    project.title = title || project.title;
    project.location = location || project.location;
    project.type = type || project.type;
    project.status = status || project.status;
    project.description = description || project.description;

    // Handle Image Update
    if (req.file) {
      // Logic: You might want to delete the old file here using 'fs' module
      project.imageUrl = `uploads/${req.file.filename}`;
    }

    const updatedProject = await project.save();

    res.status(200).json({ success: true, data: updatedProject });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
