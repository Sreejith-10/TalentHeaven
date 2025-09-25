import { ApplicationModel } from "../models/applicationModel.js";

export const recentApplications = async (req, res) => {
  try {
    const { id } = req.params;

    // TODO : get user data from queue to add the user name and profile image

    const app = await ApplicationModel.aggregate([
      {
        $match: {
          company_id: id,
        },
      },
      {
        $unwind: {
          path: "$applications",
        },
      },
      {
        $sort: {
          "applications.applied_on": 1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    return res.status(200).json({ applications: app });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};
