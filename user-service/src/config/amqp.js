import amqp from "amqplib";
import dotenv from "dotenv";
import { addJobs } from "../controllers/addjobs.js";
import { updateApplicationStatus } from "../controllers/updateApplicationStatus.js";
import { getJobPreferences } from "../controllers/getJobPreferences.js";
import { user } from "../controllers/user.js";
import { log } from "../lib/log.js";
import chalk from "chalk";

dotenv.config();

let queue = "user_service_queue";
let channel = null;

const routingKeys = [
  "JOB_POST",
  "APPLY_JOB",
  "JOB_REJECTION",
  "UPDATE_APPLICATION_STATUS",
  "USER_PREFERENCES",
  "USER_PREFERENCES_REPLY",
  "USER_DATA",
  "USER_DATA_REPLY",
];

const amqpConnect = async () => {
  try {
    const connection = await amqp.connect(process.env.AMQP_URL)
    log(
      chalk.bold.yellowBright(
        "Connected to AMQP Server",
      ),
    )

    channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });
    console.log("Waiting for data");

    channel.consume(
      queue,
      async (msg) => {
        const { action, body } = JSON.parse(msg.content.toString())
        const responseState = {}

        switch (action) {
          case "JOB_POST":
            console.log(msg.content.toString());
            break;
          case "APPLY_JOB":
            const res = await addJobs(body);
            responseState = res ?? responseState
            break;
          case "JOB_REJECTION":
            rejection(body);
            responseData = res ?? responseData
            break;
          case "UPDATE_APPLICATION_STATUS":
            updateApplicationStatus(data);
            responseData = res ?? responseData
            break;
          case "USER_PREFERENCES":
            const preferences = await getJobPreferences(body.uid);
            responseData = preferences ?? responseData
            break;
          case "USER_DATA":
            user(msg);
            responseData = res ?? responseData
            break;
          default:
            break;
        }

        await channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(responseState)), {
          correlationId: msg.properties.correlationId
        })

        channel.ack(msg)
      },
      { noAck: false }
    );
  }
  catch (err) {
    console.log(err)
  }
};

const sendToQueue = (targetQueue, data) => {
  return new Promise((resolve, reject) => {
    const uuid = crypto.randomUUID();

    const timeout = setTimeout(() => {
      reject(new Error("Request timed out"))
    }, 5000);

    const consumer = (msg) => {
      if (msg.properties.correlationId === uuid) {
        clearTimeout(timeout)
        channel.cancel(msg.fields.consumerTag)
        resolve(msg.content.toString())
      }
    }

    channel.consume(
      queue, consumer,
      { noAck: true }
    ).then(() => {
      channel.sendToQueue(targetQueue, Buffer.from(JSON.stringify(data)), {
        replyTo: queue,
        correlationId: uuid,
      });
    }).catch((err) => {
      clearTimeout(timeout)
      reject(err)
    })
  });
};

export { amqpConnect, sendToQueue }
