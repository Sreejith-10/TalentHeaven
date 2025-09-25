import {company} from "../auth/company.js";

export const getCompany = async (req, res) => {
	const {id} = req.params;

	company(id)
		.then((val) => {
			return res.status(200).json({company: val});
		})
		.catch((err) => {
			return res.status(400).json({message: "not found", error: err});
		});
};
