import {ApplicationModel} from "../models/applicationModel.js";

export const getApplicationWithUser = async (req, res) => {
	try {
		const {id} = req.params;

		const userApplications = await ApplicationModel.aggregate([]);

		return res.status(200).json(userApplications);
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "something went wrong"});
	}
};
