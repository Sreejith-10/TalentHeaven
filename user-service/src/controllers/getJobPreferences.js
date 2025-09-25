import { sendToQueue } from "../config/amqp.js";
import UserModel from "../models/userModel.js";

export const getJobPreferences = async (uid) => {
  const preferences = await UserModel.findOne({ user_id: uid }, { job_preferences: 1 });
  return preferences.job_preferences
};
