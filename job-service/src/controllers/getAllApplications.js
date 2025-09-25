import { ApplicationModel } from "../models/applicationModel.js";

export const getAllApplications = async (req, res) => {
  try {
    const { id } = req.params;
    const applications = await ApplicationModel.aggregate([
      {
        $match: {
          company_id: id
        }
      },
      {
        $unwind: "$applications"
      },
      {
        $group: {
          _id: {
            company_id: "$company_id",
            job_id: "$job_id",
            job_name: "$job_name",
            application: "$applications"
          }
        }
      },
      {
        $project: {
          _id: 0,
          company_id: "$_id.company_id",
          job_id: "$_id.job_id",
          job_name: "$_id.job_name",
          application: "$_id.application"
        }
      }
    ])
    return res.status(200).json({ applications });
  } catch (error) {
    console.log(error);
  }
};
