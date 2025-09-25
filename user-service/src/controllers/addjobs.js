import {JobModel} from "../models/JobModel.js";

export const addJobs = async (data) => {
	try {
		const {job_id, user_id, cmp_id, applied_on} = data;

		const user = await JobModel.findOne({user_id: user_id});

		if (user) {
			user.applications.push({
				job_id: job_id,
				company_id: cmp_id,
				status: "applied",
				applied_on: applied_on,
			});
			user.save();
		} else {
			await JobModel.create({
				user_id: user_id,
				applications: [
					{
						job_id: job_id,
						company_id: cmp_id,
						status: "applied",
						applied_on: applied_on,
					},
				],
			});
		}

		return;
	} catch (error) {
		console.log(error);
	}
};
