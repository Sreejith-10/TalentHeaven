import {JobModel} from "../models/JobModel.js";

export const updateApplicationStatus = async (data) => {
	try {
		const {job_id, user_id, status} = data;

		await JobModel.findOneAndUpdate(
			{user_id},
			{$set: {"applications.$[elem].status": status}},
			{arrayFilters: [{"elem.job_id": job_id}]}
		);

		return;
	} catch (error) {
		console.log(error);
		return;
	}
};
