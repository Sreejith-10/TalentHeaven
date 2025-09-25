import {nanoid} from "nanoid";
import bcrypt from "bcrypt";
import {recruiter} from "../auth/recruiter.js";

export const registeRecruiter = async (req, res) => {
	const {id, recruiter_email, recruiter_name, phone, password} = req.body;

	const hashedPass = await bcrypt.hash(password, 12);
	const uid = nanoid(10);
	recruiter(id, uid, recruiter_name, recruiter_email, phone, hashedPass)
		.then(() => {
			return res.status(202).json({message: "success"});
		})
		.catch((err) => {
			throw err;
		});
};
