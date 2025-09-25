import UserModel from "../../../models/userModel.js";

export const addEducation = async (req, res) => {
	try {
		const {education, user_id} = req.body;

		const updated = await UserModel.findOneAndUpdate(
			{user_id: user_id},
			{$addToSet: {education: education}},
			{new: true}
		);
		return res.status(202).json({message: "successfully added", user: updated});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "something went wrong"});
	}
};
