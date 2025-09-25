import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	user_id: {
		type: String,
		required: true,
	},
	fname: {
		type: String,
		required: true,
	},
	lname: {
		type: String,
		required: true,
	},
	profession: {
		type: String,
	},
	about: {
		type: String,
	},
	phone: {
		type: String,
	},
	email: {
		type: String,
	},
	skills: [
		{
			type: String,
		},
	],
	education: [
		{
			institute: {
				type: String,
			},
			education_type: {
				type: String,
			},
			stream: {
				type: String,
			},
			marks: {
				type: String,
			},
			start_date: {
				type: String,
			},
			end_date: {
				type: String,
			},
		},
	],
	experience: [
		{
			company_name: {
				type: String,
			},
			start_date: {
				type: String,
			},
			end_date: {
				type: String,
			},
			position: {
				type: String,
			},
		},
	],
	job_preferences: [{type: String}],
	projects: [
		{
			project_name: {
				type: String,
			},
			project_description: {
				type: String,
			},
			technologies_used: {
				type: [String],
			},
			reference: {type: String},
		},
	],
	resume: {
		type: String,
	},
	profile_image: {
		type: String,
	},
	created_on: {
		type: Number,
		default: Date.now(),
	},
});

const UserModel = mongoose.model("talent_heaven_users", userSchema);

export default UserModel;
