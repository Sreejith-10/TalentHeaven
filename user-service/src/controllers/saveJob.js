import {SavedJobModel} from "../models/savedJobModel.js";

export const saveJob = async (req, res) => {
	try {
		const {job_id, user_id} = req.body;

		let saved = await SavedJobModel.findOne({user_id});

		if (saved) {
			saved.saved_jobs.push(job_id);
			saved.save();
		} else {
			const data = {
				user_id: user_id,
				saved_jobs: [job_id],
			};

			saved = await SavedJobModel.create({...data});
		}

		return res.status(202).json({message: "saved", saved});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "something went wrong", error});
	}
};
