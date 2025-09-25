import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router.js";
import { log } from "./lib/log.js";
import database from "./config/connection.js";
import chalk from "chalk";
import { createConnectionMQ } from "./config/amqp.js";
import morgan from "morgan";

dotenv.config();

const service = express();
const PORT = process.env.PORT || 3004;

service.use(express.json());
service.use(express.urlencoded({ extended: true }));
service.use(
  cors({
    origin: process.env.CLIENT,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);
service.use(morgan("dev"))

service.use("/job", router);

database;

createConnectionMQ();

service.listen(PORT, () => {
  log(
    chalk.bold.yellowBright(
      `Server started on PORT : ${chalk.bold.blue(PORT)}`,
    ),
  );
});
