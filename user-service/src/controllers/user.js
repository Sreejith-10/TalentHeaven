import {sendToQueue} from "../config/amqp.js";
import UserModel from "../models/userModel.js";

export const user = async (id) => {
	const user = await UserModel.findOne({user_id: id});
	console.log(user.fname);
	sendToQueue("USER_DATA_REPLY", user);
	return;
};
