import { JobModel } from "../models/jobModel.js";

export const recentJobs = async (req, res) => {

  const preferences = req.query.preferences?.split(",")?.filter(i => Boolean(i))

  try {
    if (preferences?.length > 1) {
      const normalizePreferences = preferences.map((item) => {
        return item.trim().toLowerCase();
      })

      const regex = normalizePreferences.map((preference) => {
        const regexString = preference.replace(/\s+/g, '\\s*');
        return { role: { $regex: new RegExp(regexString), $options: 'i' } };
      })

      const query = preferences.length > 1 ? {
        $or: regex
      } : {}

      const jobs = await JobModel.find(query)
      return res.status(200).json({ recentJobs: jobs.slice(0, 5) });
    } else {
      const jobs = await JobModel.find()
      return res.status(200).json({ recentJobs: jobs.reverse().slice(0, 5) });
    }
  } catch (error) {
    console.log(error)
    return res.json({ mesage: "something went wrong", error });
  }
};
