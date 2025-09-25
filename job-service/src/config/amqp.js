import amqp from "amqplib";
import dotenv from "dotenv";

dotenv.config();

const queue = "job_service_queue";
let channel = null;

const createConnectionMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.AMQP_URL)
    channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });
  }
  catch (err) {
    console.log(err)
  }
};

const sendToQueue = async (targetQueue, data) => {
  return new Promise((resolve, reject) => {
    const uuid = crypto.randomUUID();

    const timeout = setTimeout(() => {
      reject(new Error("Request timeout"));
    }, 5000);

    const consumer = (msg) => {
      if (msg.properties.correlationId === uuid) {
        clearTimeout(timeout);
        channel.cancel(msg.fields.consumerTag);
        resolve(msg.content.toString());
      }
    };

    channel
      .consume(queue, consumer, { noAck: true })
      .then(({ consumerTag }) => {
        channel.sendToQueue(targetQueue, Buffer.from(JSON.stringify(data)), {
          replyTo: queue,
          correlationId: uuid,
        });
      })
      .catch((err) => {
        clearTimeout(timeout);
        reject(err);
      });
  });
};

export { createConnectionMQ, sendToQueue }
