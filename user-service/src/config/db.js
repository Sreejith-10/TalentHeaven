import mongoose from "mongoose";
import dotenv from "dotenv";
import {log} from "../lib/log.js";
import chalk from "chalk";
dotenv.config();

const mongo_url = process.env.MONGO_URI;

mongoose.connect(mongo_url);

const database = mongoose.connection;

database.on("error", () => {
	log(chalk.redBright("Connection Failed"));
});

database.once("open", () => {
	log(chalk.blueBright("Connected to Database"));
});

export default database;
