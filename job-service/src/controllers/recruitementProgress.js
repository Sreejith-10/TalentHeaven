import { ApplicationModel } from "../models/applicationModel.js";

export const recruitementProgress = async (req, res) => {
  try {
    const { id } = req.params;

    return res.status(200).json({});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};
