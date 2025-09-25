import mongoose from "mongoose";

const chatListSchema = new mongoose.Schema({
	user_id: {
		type: String,
	},
	chat_list: [{type: String}],
});

export const ChatListModel = mongoose.model("chat_lists", chatListSchema);
