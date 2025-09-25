import {session} from "../auth/session.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const refresh = async (req, res) => {
	const {id} = req.params;
	const refresh = await session(id);

	if (!refresh) {
		return res.status(401).json({message: "session not authenticated"});
	}

	jwt.verify(refresh.refresh_token, process.env.JWT_SECRET, (err, data) => {
		if (err && err.message === "jwt expired") {
			return res
				.status(401)
				.json({message: "session not authenticated", error: err});
		}

		if (data) {
			const access_token = jwt.sign(
				{
					id: data.id,
					cmp_id: data.cmp_id,
					name: data.name,
					email: data.email,
					admin: true,
				},
				process.env.JWT_SECRET,
				{expiresIn: "10h"}
			);

			return res
				.cookie("hr_access_token", access_token, {maxAge: 1000 * 60 * 60 * 10})
				.status(200)
				.json({
					message: "login success",
					token: access_token,
					session_id: refresh.session_id,
				});
		}
	});
};
