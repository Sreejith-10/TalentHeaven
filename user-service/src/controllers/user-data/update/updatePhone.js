import UserModel from "../../../models/userModel.js";

export const updatePhone = async (req, res) => {
	try {
		const {phone, user_id} = req.body;

		const d = await UserModel.findOneAndUpdate(
			{user_id: user_id},
			{$set: {phone: phone}}
		);

		return res.status(200).json({message: "updated", user: d});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "something went wrong"});
	}
};
