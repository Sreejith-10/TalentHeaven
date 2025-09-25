import {ChatModel} from "../model/chatModel.js";

export const getChat = async (req, res) => {
	try {
		const {id} = req.params;
		const {_page} = req.query;
		const chat = await ChatModel.findOne({chat_id: id});

		const startIndex = (_page - 1) * 10;
		const endIndex = startIndex + 10;
		const slicedPages = chat.messages
			.reverse()
			.slice(startIndex, endIndex)
			.reverse();

		if (!chat) {
			const newChat = await ChatModel.create({chat_id: id});
			return res.status(202).json({chats: newChat});
		}

		return res.status(200).json(slicedPages);
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "something went wrong"});
	}
};
