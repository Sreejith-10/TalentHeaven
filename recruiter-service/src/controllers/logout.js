import sql from "../config/mysql.js";

export const logout = async (req, res) => {
	const {session_id} = req.params;

	sql(`DELETE FROM auth WHERE session_id = '${session_id}'`)
		.then(() => {
			return res
				.clearCookie("hr_access_token")
				.clearCookie("hr_session_id")
				.status(200)
				.json({message: "use logged out"});
		})
		.catch((err) => {
			return res
				.status(500)
				.json({message: "something went wrong", error: err});
		});
};
