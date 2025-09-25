import chalk from "chalk";
import {log} from "../lib/log.js";
import {connection as sql} from "../config/mysql.js";

log(chalk.bgBlueBright("Server Setup Starting \n"));

log(chalk.bold("Conneting to Database"));

sql.connect((err) => {
	if (err) {
		log(chalk.bgRed(chalk.bold.magenta("database connection failed !")));
	} else {
		log(chalk.bgGreenBright(chalk.white("database connection success.....")));
	}
});
