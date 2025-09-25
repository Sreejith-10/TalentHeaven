import { JobModel } from "../models/JobModel.js";

export const appliedJobs = async (req, res) => {
  try {
    const { id } = req.params;

    const applied = await JobModel.findOne({ user_id: id });

    return res.status(200).json({ applied: applied.applications });
  } catch (error) {
    console.log(error);
  }
};
