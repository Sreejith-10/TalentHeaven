import sql from "../config/mysql.js";

export const getAllCompany = async (req, res) => {
	sql(`SELECT * FROM companies`)
		.then((val) => {
			return res.status(200).json({company_list: val});
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).json({message: "something went wrong"});
		});
};
