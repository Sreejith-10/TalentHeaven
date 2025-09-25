import sql from "../config/mysql.js";

export const getRecruiter = async (req, res) => {
	const {id} = req.params;

	sql(`SELECT * FROM recruiters WHERE recruiter_id = '${id}'`)
		.then((val) => {
			return res.status(200).json({recruiter: val[0]});
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).json({message: "something went wrong"});
		});
};
