import {JobModel} from "../models/jobModel.js";

export const getSingleJob = async (req, res) => {
	try {
		const {id} = req.params;

		const job = await JobModel.findById(id);
		return res.status(200).json({job});
	} catch (error) {
		console.log(error);
		return res.status(500).json({mesage: "something went wrong"});
	}
};
