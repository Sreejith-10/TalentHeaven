import {JobModel} from "../models/JobModel.js";

export const rejection = async (data) => {
	try {
		const {job_id, user_id} = data;

		await JobModel.findOneAndUpdate(
			{user_id: user_id},
			{$set: {"applications.$[elem].status": "rejected"}},
			{arrayFilters: [{"elem.job_id": job_id}]}
		);

		return;
	} catch (error) {
		console.log(error);
	}
};
