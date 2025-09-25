import sql from "../config/mysql.js";

export const create = (
	cmp_id,
	company_name,
	company_about,
	company_address,
	company_country,
	company_state,
	company_city,
	reference,
	phone_number
) => {
	const createQuery = `INSERT INTO companies VALUE("${cmp_id}",
	"${company_name}",
	"${company_about}",
	"${company_address}",
	"${company_country}",
	"${company_state}",
	"${company_city}",
	"${reference}",
	"${phone_number}")`;

	return new Promise((resolve, reject) => {
		sql(createQuery)
			.then((res) => resolve(res))
			.catch((err) => {
				console.log(err);
				reject(err);
			});
	});
};
