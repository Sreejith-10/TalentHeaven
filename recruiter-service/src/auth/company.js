import sql from "../config/mysql.js";

export const company = (id) => {
	const comapnyQuery = `SELECT * FROM companies WHERE company_id = '${id}'`;

	return new Promise((resolve, reject) => {
		sql(comapnyQuery)
			.then((result) => resolve(result[0]))
			.catch((err) => reject(err));
	});
};
