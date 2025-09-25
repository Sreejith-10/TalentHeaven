import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import { log } from "./lib/log.js";
import db from "./config/db.js";
import router from "./router.js";
import cors from "cors";
import { amqpConnect } from "./config/amqp.js";
import morgan from "morgan";

dotenv.config();

const service = express();
const PORT = process.env.PORT || 3003;

service.use(express.json());
service.use(express.urlencoded({ extended: true }));
service.use(
  cors({
    origin: process.env.CLIENT,
    credentials: true,
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
  }),
);
service.use(morgan("dev"))

service.use("/user", router);

db;

amqpConnect();

service.listen(PORT, () => {
  log(
    chalk.bold.yellowBright(
      `Server started on PORT : ${chalk.bold.blue(PORT)}`,
    ),
  );
});
