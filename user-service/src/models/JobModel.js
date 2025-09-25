import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
	user_id: {
		type: String,
	},
	applications: [
		{
			job_id: {
				type: String,
			},
			company_id: {
				type: String,
			},
			status: {
				type: String,
				default: "applied",
			},
			applied_on: {
				type: Number,
			},
		},
	],
});

export const JobModel = mongoose.model("applied_jobs", jobSchema);
