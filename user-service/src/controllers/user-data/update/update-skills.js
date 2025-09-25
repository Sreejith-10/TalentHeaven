import UserModel from "../../../models/userModel.js";

export const updateSkills = async (req, res) => {
	const {skill, user_id} = req.body;

	try {
		const u = await UserModel.findOneAndUpdate(
			{user_id: user_id},
			{$set: {skills: [...skill]}},
			{new: true}
		);
		return res.status(200).json({message: "updated", user: u});
	} catch (err) {
		return res.status(500).json({message: "something went wrong", error: err});
	}
};
