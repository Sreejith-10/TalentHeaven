import UserModel from "../models/userModel.js";

export const getUser = async (req, res) => {
	const {id} = req.params;

	const user = await UserModel.findOne({user_id: id});

	if (user) {
		return res.status(200).json({user});
	} else {
		return res
			.status(404)
			.json({message: "user account does not have any data"});
	}
};
