import amqp from "amqplib";
import dotenv from "dotenv";

dotenv.config();

const queue = "recruiter_service_queue";
let channel = null;

export const createConnectionMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.AMQP_URL)
    channel = await connection.createChannel();
    console.log("Connected to AMQP Server")
    await channel.assertQueue(queue, { durable: true });
    console.log("Waiting for data");
    channel.consume(
      queue,
      async (msg) => {
        const { action, body } = JSON.parse(msg.content.toString())
        const responseState = {}

        switch (key) {
          case "JOB_POST":
            console.log(msg.content.toString());
            break;
          case "OPT":
            console.log(msg.content.toString());
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

  } catch (error) {
    throw new Error("RabbitMQ Error" + error)
  }
};
