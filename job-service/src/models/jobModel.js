import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company_id: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    vaccancy: {
      type: String,
      default: "1",
    },
    job_type: {
      type: String,
    },
    job_mode: {
      type: String,
    },
    job_industry: {
      type: String,
    },
    job_category: {
      type: String,
    },
    job_description: {
      type: String,
    },
    job_industry: {
      type: String
    },
    job_category: {
      type: String
    },
    job_requirements: {
      type: [String],
    },
    skill_rquired: {
      type: [String],
    },
    experience: {
      type: String,
    },
    salary: {
      type: String,
    },
    status: {
      type: String,
      default: "initial",
    },
    duration: {
      type: String,
    },
    applications_start_date: {
      type: String,
    },
    applications_end_date: {
      type: String,
    },
    applications: {
      type: [String],
    },
    createdOn: {
      type: Number,
      default: Date.now(),
    },
  },
  { versionKey: false }
);

export const JobModel = mongoose.model("jobs", jobSchema);
