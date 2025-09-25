import {nanoid} from "nanoid";
import {create} from "../auth/create.js";

export const register = async (req, res) => {
	const {
		company_name,
		company_about,
		company_address,
		company_country,
		company_state,
		company_city,
		reference,
		phone_number,
	} = req.body;

	const cmp_id = "cmp-" + nanoid(10);

	create(
		cmp_id,
		company_name,
		company_about,
		company_address,
		company_country,
		company_state,
		company_city,
		reference,
		phone_number
	)
		.then(() => {
			return res
				.status(202)
				.json({message: "company registered", company_id: cmp_id});
		})
		.catch((err) => {
			throw err;
		});
};
