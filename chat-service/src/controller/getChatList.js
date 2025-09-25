import {ChatListModel} from "../model/chatListModel.js";

export const getChatList = async (req, res) => {
	try {
		const {id} = req.params;
		const chatList = await ChatListModel.findOne({user_id: id});

		return res.status(200).json({chatList});
	} catch (error) {
		return res.status(500).json({message: "something went wrong"});
	}
};
