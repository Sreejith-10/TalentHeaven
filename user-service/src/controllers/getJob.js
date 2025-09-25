import {JobModel} from "../models/JobModel.js";

export const getJob = async (req, res) => {
	try {
		const {id, uid} = req.params;
		const job = await JobModel.findOne({user_id: uid});

		const current = job.applications.find((item) => item.job_id === id);

		return res.status(200).json({current});
	} catch (error) {
		console.log(error);
	}
};
