import {ApplicationModel} from "../models/applicationModel.js";

export const interviews = async (req, res) => {
	try {
		const {id} = req.params;

		const numberOfInterviews = await ApplicationModel.aggregate([
			{$match: {company_id: id}},
			{
				$unwind: "$applications",
			},
			{
				$group: {
					_id: null,
					applications: {$push: "$applications"},
				},
			},
			{
				$unwind: "$applications",
			},
			{
				$match: {
					"applications.status": "applied",
				},
			},
		]);

		return res.status(200).json({applications: numberOfInterviews});
	} catch (error) {
		return res.status(500).json({message: "something went wrong"});
	}
};
