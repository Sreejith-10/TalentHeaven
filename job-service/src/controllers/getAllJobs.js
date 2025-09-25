import {JobModel} from "../models/jobModel.js";

export const getAllJobs = async (req, res) => {
	try {
		const joblist = await JobModel.find();
		return res.status(200).json({joblist});
	} catch (error) {
		console.log(error);
		return res.status(500).json({mesage: "something went wrong"});
	}
};
