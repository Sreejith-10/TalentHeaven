import UserModel from "../models/userModel.js";

export const createUser = async (req, res) => {
	const {values, user_id} = req.body;

	const {
		fname,
		lname,
		profession,
		about,
		phone,
		email,
		skills,
		education,
		experience,
		job_preferences,
		projects,
	} = values;

	UserModel.create({
		user_id,
		fname,
		lname,
		profession,
		about,
		phone,
		email,
		skills,
		education,
		experience,
		job_preferences,
		projects,
	})
		.then(() => {
			return res.status(202).json({message: "user created"});
		})
		.catch((err) => {
			return res
				.status(500)
				.json({message: "something went wrong", error: err});
		});
};
