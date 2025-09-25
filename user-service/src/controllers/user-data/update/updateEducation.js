import UserModel from "../../../models/userModel.js";

export const updateEducation = async (req, res) => {
	try {
		const {education, user_id} = req.body;

		const {_id} = education;

		const d = await UserModel.findOneAndUpdate(
			{user_id: user_id},
			{$set: {"education.$[elem]": education}},
			{arrayFilters: [{"elem._id": _id}]}
		);

		return res.status(200).json({message: "updated", user: d});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "something went wrong"});
	}
};
