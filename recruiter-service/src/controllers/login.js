import bcrypt from "bcrypt";
import {user} from "../auth/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {nanoid} from "nanoid";
import sql from "../config/mysql.js";

dotenv.config();

export const login = async (req, res) => {
	const {email, password} = req.body;

	const userExist = await user(email);

	if (!userExist) {
		return res.status(404).json({message: "user does not exist"});
	}

	bcrypt.compare(password, userExist.password, async (err, same) => {
		try {
			if (!same) {
				return res.status(400).json({message: "password does not match"});
			}

			const refresh_token = jwt.sign(
				{
					id: userExist.recruiter_id,
					cmp_id: userExist.company_id,
					name: userExist.recruiter_name,
					email: userExist.recruiter_email,
				},
				process.env.JWT_SECRET,
				{expiresIn: "5d"}
			);

			const access_token = jwt.sign(
				{
					id: userExist.recruiter_id,
					cmp_id: userExist.company_id,
					name: userExist.recruiter_name,
					email: userExist.recruiter_email,
					admin: true,
				},
				process.env.JWT_SECRET,
				{expiresIn: "10h"}
			);

			const session_id = nanoid(10);

			await sql(
				`DELETE FROM auth WHERE recruiter_id = '${userExist.recruiter_id}'`
			);

			await sql(
				`INSERT INTO auth (session_id,refresh_token,recruiter_id) VALUES ('${session_id}','${refresh_token}','${userExist.recruiter_id}')`
			);

			return res
				.cookie("hr_access_token", access_token, {maxAge: 1000 * 60 * 60 * 10})
				.cookie("hr_session_id", session_id, {maxAge: 1000 * 60 * 60 * 24 * 5})
				.status(200)
				.json({
					message: "login success",
					token: access_token,
					session_id: session_id,
				});
		} catch (error) {
			console.log(error);
			return res.status(500).json({message: "something went wrong"});
		}
	});
};
