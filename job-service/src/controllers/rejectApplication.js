import { sendToQueue } from "../config/amqp.js";
import { ApplicationModel } from "../models/applicationModel.js";

export const rejectApplication = async (req, res) => {
  try {
    const { job_id, user_id } = req.body;

    await ApplicationModel.findOneAndUpdate(
      { job_id },
      {
        $set: {
          "applications.$[elem].status": "rejected",
        },
      },
      {
        arrayFilters: [{ "elem.user_id": user_id }],
      }
    );

    sendToQueue("user_service_queue", { action: "JOB_REJECTION", body: { job_id, user_id } });
    return res.status(200).json({ message: "application rejected" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};
