import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
	company_id: {
		type: String,
	},
	job_id: {
		type: String,
	},
	job_name: {
		type: String,
	},
	applications: [
		{
			user_id: {
				type: String,
			},
			user_name: {
				type: String,
			},
			user_profile: {
				type: String,
			},
			applied_on: {
				type: Number,
				default: Date.now(),
			},
			status: {
				type: String,
				default: "applied",
			},
		},
	],
});

export const ApplicationModel = mongoose.model(
	"applications",
	applicationSchema
);
