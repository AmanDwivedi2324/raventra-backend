import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    type: { 
      type: String, 
      required: true, 
      enum: ['Residential', 'Commercial', 'Industrial', 'Institutional'] 
    },
    status: { 
      type: String, 
      required: true, 
      enum: ['Completed', 'Ongoing'] 
    },
    description: { type: String }, // Optional details
    // For now, we will use a text URL or placeholder. 
    // We can add Image Uploading logic later if needed.
    imageUrl: { type: String, default: "" } 
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;