import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {log} from "./lib/log.js";
import {createConnectionMQ} from "./config/rabbitmq.js";
import router from "./router.js";
import chalk from "chalk";
import database from "./config/db.js";

dotenv.config();

const service = express();
const PORT = process.env.PORT || 3005;

service.use(express.urlencoded({extended: true}));
service.use(express.json());
service.use(
	cors({
		origin: process.env.CLIENT,
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
	})
);

service.use("/chat", router);

createConnectionMQ();

database;

service.listen(PORT, () => {
	log(
		chalk.bold.yellowBright(`Server started on PORT : ${chalk.bold.blue(PORT)}`)
	);
});
