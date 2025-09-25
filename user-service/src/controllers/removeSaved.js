import {SavedJobModel} from "../models/savedJobModel.js";

export const removeSaved = async (req, res) => {
	try {
		const {user_id, job_id} = req.body;
		const removed = await SavedJobModel.findOneAndUpdate(
			{user_id: user_id},
			{$pull: {saved_jobs: job_id}},
			{new: true}
		);

		return res.status(200).json({message: "unsaved", removed});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "something went wrong", error});
	}
};
