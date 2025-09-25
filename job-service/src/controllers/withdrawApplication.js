import {ApplicationModel} from "../models/applicationModel.js";

export const withdrawApplication = async (req, res) => {
	try {
		const {job_id, user_id} = req.body;

		await ApplicationModel.findOneAndUpdate(
			{job_id},
			{$pull: {applications: {user_id}}}
		);

		return res.status(200).json({message: "application withdrawn"});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "something went wrong"});
	}
};
