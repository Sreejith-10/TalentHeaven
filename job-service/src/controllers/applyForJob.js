import { sendToQueue } from "../config/amqp.js";
import { ApplicationModel } from "../models/applicationModel.js";
import { JobModel } from "../models/jobModel.js"

export const applyForJob = async (req, res) => {
  try {
    const { company_id, job_id, user_id, user_name, user_profile } = req.body;

    await ApplicationModel.updateOne(
      { job_id },
      {
        $push: {
          applications: {
            user_id,
            user_name,
            user_profile,
          },
        },
      }
    );

    await JobModel.findByIdAndupdate({ _id: job_id }, { $push: { applications: user_id } })

    sendToQueue("user_service_queue", {
      action: "APPLY_JOB",
      data: {
        job_id,
        user_id,
        cmp_id: company_id,
        applied_on: new Date().getTime()
      }
    }).then(() => {
      return res.status(200).json({ message: "applied for job" });
    });

    // push the job_id and date on queue
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};
