import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
	chat_id: {
		type: String,
	},
	messages: [
		{
			sender_id: {
				type: String,
			},
			message: {
				type: String,
			},
			date: {
				type: Number,
				default: Date.now(),
			},
		},
	],
});

export const ChatModel = mongoose.model("messages", chatSchema);
