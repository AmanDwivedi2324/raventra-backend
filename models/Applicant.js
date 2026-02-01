import mongoose from "mongoose";

const applicantSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    position: { type: String, required: true },
    resume: { type: String, required: true }, // Stores the file path
  },
  { timestamps: true },
);

const Applicant = mongoose.model("Applicant", applicantSchema);
export default Applicant;
