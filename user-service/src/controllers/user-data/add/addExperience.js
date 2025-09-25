import UserModel from "../../../models/userModel.js";

export const addExperience = async (req, res) => {
	try {
		const {experience, user_id} = req.body;

		const updated = await UserModel.findOneAndUpdate(
			{user_id: user_id},
			{$addToSet: {experience: experience}},
			{new: true}
		);
		return res.status(202).json({message: "added to user data", user: updated});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "something went wrong"});
	}
};
