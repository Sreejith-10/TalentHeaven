import {SavedJobModel} from "../models/savedJobModel.js";

export const getSavedJobs = async (req, res) => {
	try {
		const {id} = req.params;
		const saved = await SavedJobModel.findOne({user_id: id});

		return res.status(200).json({message: "saved", saved});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "something went wrong", error});
	}
};
