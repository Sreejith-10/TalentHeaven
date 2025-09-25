import UserModel from "../../../models/userModel.js";

export const removeExperience = async (req, res) => {
	try {
		const {experience, user_id} = req.body;

		const {_id} = experience;

		const d = await UserModel.findOneAndUpdate(
			{
				user_id: user_id,
			},
			{
				$pull: {experience: {_id: _id}},
			},
			{
				new: true,
			}
		);

		return res.status(200).json({message: "updated", user: d});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "something went wrong"});
	}
};
