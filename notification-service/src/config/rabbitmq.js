import amqp from "amqplib/callback_api.js";
import dotenv from "dotenv";
// import {socket} from "../service.js";

dotenv.config();

let queue = "chat_service_queue";
let channel = null;

export const createConnectionMQ = () => {
	amqp.connect(process.env.AMQP_URL, async (err0, connection) => {
		if (err0) {
			throw err0;
		}
		channel = await connection.createChannel();
		await channel.assertExchange(queue, "direct", {durable: false});
		const q = await channel.assertQueue("", {exclusive: true});
		console.log("Waiting for data");
		channel.bindQueue(q.queue, queue, "MESSAGE");
		channel.consume(
			q.queue,
			(msg) => {
				const key = msg.fields.routingKey;

				switch (key) {
					case "NEW_NOTIFICATION":
						break;
					default:
						break;
				}
			},
			{noAck: true}
		);
	});
};
