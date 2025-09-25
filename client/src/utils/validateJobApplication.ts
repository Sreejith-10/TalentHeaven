import {JobType, UserType} from "@/lib/types";

const exp: {[key: string]: number} = {
	any: 0,
	fresher: 0,
	"0 - 1 Year": 0,
	"1 - 3 Years": 1,
	"3 - 5 Years": 3,
	"5 - 10 Years": 5,
	"10+ Years": 10,
};

export const validateJobApplcation = (user: UserType, job: JobType) => {
	const cases: {
		skills: {
			match: boolean;
			notIncludes: string[];
		};
		experience: {
			match: boolean;
			message: string;
		};
	} = {
		skills: {
			match: false,
			notIncludes: [],
		},
		experience: {
			match: false,
			message: "",
		},
	};
	let totalExperience = 0;

	const userSkills = user.skills.map((skill) => skill.toLowerCase());

	job.skill_rquired.forEach((elem) => {
		if (!userSkills.includes(elem.toLowerCase())) {
			cases.skills.match = false;
			cases.skills.notIncludes.push(elem);
		}else{
			cases.skills.match == true
		}
	});

	user.experience.forEach((exp) => {
		const start = new Date(exp.start_date);
		const end = new Date(exp.end_date);
		totalExperience += Math.abs(end.getTime() - start.getTime()) / 86400000;
	});

	const minExp = exp[job.experience];

	if (totalExperience / 365 >= minExp) {
		cases.experience.match = true;
	} else {
		if (job.experience === "fresher") {
			cases.experience.match = true;
		} else {
			cases.experience.match = false;
			cases.experience.message = "experience requried";
		}
	}

	return cases;
};
