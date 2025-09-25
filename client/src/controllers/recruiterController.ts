import {RecruiterServiceInstance} from "@/lib/axios";
import { CompanyType, RecruiterType } from "@/lib/types";

export const registerCompany = async (comapnyData: any) => {
	const {data} = await RecruiterServiceInstance.post(
		"/register",
		{...comapnyData},
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	return data;
};

export const registerRecruiter = async (recruiterData: any) => {
	const {data} = await RecruiterServiceInstance.post(
		"/recruiter",
		{...recruiterData},
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	return data;
};

export const login = async (values: any) => {
	const {data} = await RecruiterServiceInstance.post("/login", values, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return data;
};

export const logOut = async (id: string) => {
	const {data} = await RecruiterServiceInstance.get("/logout/" + id);
	return data;
};

export const refresh = async (id: string) => {
	const {data} = await RecruiterServiceInstance.get("/refresh/" + id);
	return data;
};


export const getAllCompany = async() =>{
	const {data}:{data:{company_list:CompanyType[]}} = await RecruiterServiceInstance.get("/all-companies")
	return data
}

export const fetchCompany = async (key: string) => {
	const {data}:{data:{company:CompanyType}} = await RecruiterServiceInstance.get("/company/" + key);
	return data.company;
};


export const fetchRecruiter = async (key: string) => {
	const {data}:{data:{recruiter:RecruiterType}} = await RecruiterServiceInstance.get("/get-recruiter/" + key);
	return data.recruiter
}
