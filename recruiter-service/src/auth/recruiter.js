import sql from "../config/mysql.js";

export const recruiter = (
	cmp_id,
	recruiter_id,
	recruiter_name,
	recruiter_email,
	phone,
	hashedPass
) => {
	const query = `INSERT INTO recruiters(company_id,recruiter_id,recruiter_name,recruiter_email,phone,password) VALUE("${cmp_id}","${recruiter_id}","${recruiter_name}","${recruiter_email}","${phone}","${hashedPass}")`;

	return new Promise((resolve, reject) => {
		sql(query)
			.then((res) => resolve(res))
			.catch((err) => reject(err));
	});
};
