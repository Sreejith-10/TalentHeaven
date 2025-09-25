import {notifications} from "../helper/notification.js";

export const getNotifications = async (req, res) => {
	const {id} = req.params;
	const n = await notifications(id);

	return res.json(n);
};
