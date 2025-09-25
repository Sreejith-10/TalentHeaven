import UserModel from "../../../models/userModel.js";

export const updateProjects = async (req, res) => {
	try {
		const {project, user_id} = req.body;

		const {_id} = project;

		const d = await UserModel.findOneAndUpdate(
			{user_id: user_id},
			{$set: {"projects.$[elem]": project}},
			{arrayFilters: [{"elem._id": _id}]}
		);

		return res.status(200).json({message: "updated", user: d});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "something went wrong"});
	}
};
