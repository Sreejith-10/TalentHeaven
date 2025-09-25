import {NotificationModel} from "../model/notificationModel";

export const createNotification = async (content) => {
	const {
		sender_id,
		sender,
		recipient,
		notification_type,
		title,
		description,
		status,
	} = content;

	await NotificationModel.findOneAndUpdate(
		{user_id: sender_id},
		{
			notification: {
				$push: {
					sender_id,
					sender,
					recipient,
					notification_type,
					title,
					description,
					status,
				},
			},
		}
	);
};
