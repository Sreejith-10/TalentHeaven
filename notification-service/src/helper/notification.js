import {NotificationModel} from "../model/notificationModel.js";

export const notifications = (id) => {
	return new Promise((resolve, reject) => {
		NotificationModel.findOne({user_id: id})
			.then((res) => resolve(res))
			.catch((err) => reject(err));
	});
};
