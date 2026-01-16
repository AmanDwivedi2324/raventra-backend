import mongoose from "mongoose";

const applicantSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    position: { type: String, required: true },
    resume: { type: String, required: true }, 
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Interview", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Applicant = mongoose.model("Applicant", applicantSchema);
export default Applicant;
