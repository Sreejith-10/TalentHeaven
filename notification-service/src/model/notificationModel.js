import mongoose from "mongoose";

const notificationScehma = new mongoose.Schema(
	{
		user_id: {
			type: String,
			required: true,
		},
		notification: [
			{
				sender_id: {
					type: String,
				},
				sender: {
					type: String,
				},
				recipient: {
					type: String,
				},
				notification_type: {
					type: String,
				},
				title: {
					type: String,
				},
				description: {
					type: String,
				},
				status: {
					type: String,
					default: "UNREAD",
				},
				created_on: {
					type: Number,
					default: Date.now(),
				},
			},
		],
	},
	{versionKey: false}
);

export const NotificationModel = mongoose.model(
	"notifications",
	notificationScehma
);
