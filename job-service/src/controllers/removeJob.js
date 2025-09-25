import { JobModel } from "../models/jobModel.js";

export const removeJob = async (req, res) => {
  const { id } = req.params;

  try {
    await JobModel.deleteOne({ _id: id });

    return res.status(200).json({ message: "job post removed" });
  } catch (error) {
    return res.status(500).josn({ message: "something went wrong" });
  }
};
