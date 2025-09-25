import {JobModel} from "../models/jobModel.js";

export const openPositions = async (req, res) => {
	try {
		const {id} = req.params;

		const vaccancy = await JobModel.aggregate([
			{
				$match: {
					company_id: id,
				},
			},
			{
				$match: {
					status: {$ne: "hired"},
				},
			},
		]);

		return res.status(200).json({openPositions: vaccancy});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "something went wrong"});
	}
};
