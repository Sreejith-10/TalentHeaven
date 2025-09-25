import express from "express";
import dotenv from "dotenv";
import {log} from "./utils/log.js";
import chalk from "chalk";
import router from "./router.js";

dotenv.config();

const PORT = process.env.PORT || 3007;

const service = express();

service.use("/notification", router);

service.listen(PORT, () => {
	log(
		chalk.bold.yellowBright(`Server started on PORT : ${chalk.bold.blue(PORT)}`)
	);
});
