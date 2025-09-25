import mongoose from "mongoose";

const saveJobSchema = new mongoose.Schema({
	user_id: {
		type: String,
	},
	saved_jobs: {
		type: [String],
	},
});

export const SavedJobModel = mongoose.model("saved_jobs", saveJobSchema);
