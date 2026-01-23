import Project from "../models/Project.js";

// @desc    Create a new project
// @route   POST /api/projects
export const createProject = async (req, res) => {
  try {
    // 1. Extract data (INCLUDING imageUrl from JSON body)
    let { title, location, type, status, description, imageUrl } = req.body;

    // 2. Handle File Upload (Fallback)
    // If a file was uploaded, overwrite the URL with the local path
    if (req.file) {
      imageUrl = `uploads/${req.file.filename}`;
    }

    // 3. Save to DB
    const project = await Project.create({
      title,
      location,
      type,
      status,
      description,
      imageUrl, // Uses the URL string from frontend OR the file path
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

    // Find the project first
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    // Update fields (only if new value is provided)
    project.title = title || project.title;
    project.location = location || project.location;
    project.type = type || project.type;
    project.status = status || project.status;
    project.description = description || project.description;

    // Handle Image Update
    // 1. If a new URL string was sent, update it
    if (imageUrl) {
      project.imageUrl = imageUrl;
    }

    // 2. If a FILE was uploaded, it takes priority (overwrites everything)
    if (req.file) {
      project.imageUrl = `uploads/${req.file.filename}`;
    }

    const updatedProject = await project.save();

    res.status(200).json({ success: true, data: updatedProject });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};