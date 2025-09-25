import {ApplicationModel} from "../models/applicationModel.js";

export const getApplicationsByJobId = async (req, res) => {
	try {
		const {id} = req.params;
		const applications = await ApplicationModel.findOne({job_id: id});
		return res.status(200).json({applications});
	} catch (error) {
		return res.status(500).json({message: "something went wrong"});
	}
};
