import sql from "../config/mysql.js";

export const user = (e) => {
	const userQuery = `SELECT * FROM recruiters WHERE recruiter_email = '${e}'`;

	return new Promise((resolve, reject) => {
		sql(userQuery)
			.then((res) => {
				resolve(res[0]);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
