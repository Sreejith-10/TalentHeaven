import {JobModel} from "../models/jobModel.js";

export const getCompanyJobs = async (req, res) => {
	try {
		const {id} = req.params;

		const jobList = await JobModel.find({company_id: id});

		return res.status(200).json({jobList});
	} catch (error) {
		console.log(error);
		return res.status(500).json({mesage: "something went wrong"});
	}
};
