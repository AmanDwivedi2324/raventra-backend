import Project from "../models/Project.js";

// @desc    Create a new project
// @route   POST /api/projects
export const createProject = async (req, res) => {
  try {
    let { title, location, type, status, description, imageUrl } = req.body;

    // --- CHANGE IS HERE ---
    // Cloudinary gives us the full URL in req.file.path
    if (req.file) {
      imageUrl = req.file.path;
    }

    const project = await Project.create({
      title,
      location,
      type,
      status,
      description,
      imageUrl,
    });

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all projects
// @route   GET /api/projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
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

// @desc    Delete a project
// @route   DELETE /api/projects/:id
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
export const updateProject = async (req, res) => {
  try {
    const { title, location, type, status, description, imageUrl } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    project.title = title || project.title;
    project.location = location || project.location;
    project.type = type || project.type;
    project.status = status || project.status;
    project.description = description || project.description;

    // Handle Image URL string (if pasted manually)
    if (imageUrl) {
      project.imageUrl = imageUrl;
    }

    // --- CHANGE IS HERE ---
    // If a new file is uploaded to Cloudinary
    if (req.file) {
      project.imageUrl = req.file.path;
    }

    const updatedProject = await project.save();
    res.status(200).json({ success: true, data: updatedProject });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
