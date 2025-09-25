import {ChatListModel} from "../model/chatListModel.js";

export const addToChatList = async (req, res) => {
	try {
		const {user_id, r_id} = req.body;

		const chatListRecruiter = await ChatListModel.findOne({user_id: user_id});
		const chatListUser = await ChatListModel.findOne({user_id: r_id});
		if (!chatListRecruiter) {
			await ChatListModel.create({
				user_id: user_id,
				chat_list: r_id,
			});
		}
		if (!chatListUser) {
			await ChatListModel.create({
				user_id: r_id,
				chat_list: user_id,
			});
		}

		return res.status(200);
	} catch (error) {
		console.log(error);
	}
};
