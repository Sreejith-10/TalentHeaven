import UserModel from "../../../models/userModel.js";

export const updateInfo = async (req, res) => {
	const {data, user_id} = req.body;

	try {
		const user = await UserModel.findOneAndUpdate(
			{user_id: user_id},
			{...data},
			{
				new: true,
			}
		);

		return res.status(200).json({message: "changes made", user});
	} catch (error) {
		return res.status(500).json({message: "something went wrong", error: err});
	}
};
