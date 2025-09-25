import sql from "../config/mysql.js";

export const session = (id) => {
	const sessionQuery = `SELECT * FROM auth WHERE session_id = '${id}'`;

	return new Promise((resolve, reject) => {
		sql(sessionQuery)
			.then((res) => resolve(res[0]))
			.catch((err) => reject(err));
	});
};
