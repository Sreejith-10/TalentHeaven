import {UserServiceInstance} from "@/lib/axios";
import {
	EducationType,
	ExperienceType,
	ProjectsType,
	UserType,
} from "@/lib/types";

type UserInputType = {
	values: {
		fname?: string | undefined;
		lname?: string | undefined;
		phone?: string | undefined;
		email?: string | undefined;
		skills?: string[] | undefined;
		education?:
			| {
					institute: string;
					education_type: string;
					stream: string;
					start_date: string;
					end_date: string;
			  }[]
			| undefined;
	};
	user_id: string;
};

export const createUser = async (userInputs: UserInputType) => {
	const {data} = await UserServiceInstance.post("/create-user", userInputs, {
		headers: {"Content-Type": "application/json"},
	});
	return data;
};

export const userJobs = async (id: string) => {
	const {data} = await UserServiceInstance.get("/user-jobs/" + id);
	return data;
};

export const getAppliedJobs = async (id: string) => {
	const {data} = await UserServiceInstance.get("/get-applied-jobs/" + id);
	return data;
};

export const fetchUser = async (user_id: string | undefined) => {
	const {data}: {data: {user: UserType}} = await UserServiceInstance.get(
		`/get-user/${user_id}`
	);
	return data.user;
};

export const fetchUserJob = async (values: {
	id: string;
	uid: string | undefined;
}) => {
	const {data}: {data: {current: {status: string}}} =
		await UserServiceInstance.get(`/get-job/${values.id}/${values.uid}`);
	return data.current.status;
};

export const addEducation = async (value: {
	education: EducationType;
	user_id: string | undefined;
}) => {
	const {data} = await UserServiceInstance.post(
		"/add-education",
		{...value},
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	return data;
};

export const addExperience = async (value: {
	experience: ExperienceType;
	user_id: string;
}) => {
	const {data} = await UserServiceInstance.post(
		"/add-experience",
		{...value},
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	return data;
};

export const addProject = async (value: {
	projects: ProjectsType;
	user_id: string;
}) => {
	const {data} = await UserServiceInstance.post(
		"/add-projects",
		{...value},
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	return data;
};

export const updateAbout = async (val: any) => {
	const {data} = await UserServiceInstance.post("/update-info", val, {
		headers: {"Content-Type": "application/json"},
	});
	return data;
};

export const updatePhone = async (val: any) => {
	const {data} = await UserServiceInstance.post("/update-phone", val, {
		headers: {"Content-Type": "application/json"},
	});
	return data;
};

export const updateSkills = async (val: any) => {
	const {data} = await UserServiceInstance.post("/update-skills", val, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return data;
};

export const updateJobPreferences = async (val: any) => {
	const {data} = await UserServiceInstance.post("/update-preferences", val, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return data;
};

export const updateEducation = async (value: {
	education: EducationType;
	user_id: string | undefined;
}) => {
	const {data} = await UserServiceInstance.post(
		"/update-education",
		{...value},
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	return data;
};

export const updateExperience = async (value: {
	experience: ExperienceType;
	user_id: string;
}) => {
	const {data} = await UserServiceInstance.post(
		"/update-experience",
		{...value},
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	return data;
};

export const updateProject = async (value: {
	projects: ProjectsType;
	user_id: string;
}) => {
	const {data} = await UserServiceInstance.post(
		"/update-projects",
		{...value},
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	return data;
};

export const removeEducation = async (value: {
	education: EducationType;
	user_id: string;
}) => {
	const {data} = await UserServiceInstance.post(
		"/remove-education",
		{...value},
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	return data;
};

export const removeExperience = async (value: {
	experience: ExperienceType;
	user_id: string;
}) => {
	const {data} = await UserServiceInstance.post(
		"/remove-experience",
		{...value},
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	return data;
};

export const removeProject = async (value: {
	projects: ProjectsType;
	user_id: string;
}) => {
	const {data} = await UserServiceInstance.post(
		"/remove-projects",
		{...value},
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	return data;
};

export const fetchSavedJobs = async (id: string | undefined) => {
	const {data} = await UserServiceInstance.get("/saved/" + id);
	return data.saved;
};

export const saveJob = async (ids: {job_id: string; user_id: string}) => {
	const {data} = await UserServiceInstance.post("/save-job", ids, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	return data;
};

export const removeSaved = async (ids: {job_id: string; user_id: string}) => {
	const {data} = await UserServiceInstance.patch("/unsave", ids, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	return data;
};

export const updateAvatar = async (formData: FormData) => {
	const avatar = formData.get("avatar");
	console.log(avatar);
	const {data} = await UserServiceInstance.post(
		"/update-avatar",
		{avatar},
		{headers: {"Content-Type": "application/json"}}
	);
	return data;
};
