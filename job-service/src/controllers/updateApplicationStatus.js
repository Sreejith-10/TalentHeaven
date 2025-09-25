import { sendToQueue } from "../config/amqp.js";
import { ApplicationModel } from "../models/applicationModel.js";

export const updateApplicationStatus = async (req, res) => {
  try {
    const { job_id, user_id, new_status } = req.body;

    await ApplicationModel.findOneAndUpdate(
      { job_id },
      {
        $set: {
          "applications.$[elem].status": new_status,
        },
      },
      {
        arrayFilters: [{ "elem.user_id": user_id }],
      }
    );

    sendToQueue("user_service_queue", {
      action: "UPDATE_APPLICATION_STATUS", body: {
        job_id,
        user_id,
        status: new_status
      }
    }).then(() => {
      return res.status(200).json({ message: "application status updated" });
    });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};
