import express from "express";
import dotenv from "dotenv";
import { connection as sql } from "./config/mysql.js";
import chalk from "chalk";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./router.js";
import { log } from "./lib/log.js";
import { createConnectionMQ } from "./config/rabbitmq.js";
import morgan from "morgan";

dotenv.config();

const service = express();
const PORT = process.env.PORT || 3002;

service.use(morgan("dev"))
service.use(express.json());
service.use(express.urlencoded({ extended: true }));
service.use(
  cors({
    origin: process.env.CLIENT,
    credentials: true,
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
  }),
);
service.use(cookieParser());
service.use("/recruiter", router);

sql.connect((err) => {
  if (err) {
    throw err;
  } else {
    log(chalk.blue("Connected to db"));
  }
});

createConnectionMQ();

service.listen(PORT, () => {
  log(
    chalk.bold.yellowBright(
      `Server started on PORT : ${chalk.bold.blue(PORT)}`,
    ),
  );
});
