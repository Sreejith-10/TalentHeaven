import {AuthServiceInstance} from "@/lib/axios";
import {delay} from "@/utils/delay";

export const registerUser = async (values: {email: string; password: string}) => {
	const {data} = await AuthServiceInstance.post("/register", values, {
		headers: {"Content-Type": "application/json"},
	});

	return data;
};

export const loginUser = async (values: {email: string; password: string}) => {
	const {data} = await AuthServiceInstance.post("/login", values, {
		headers: {"Content-Type": "application/json"},
	});

	return data;
};

export const refreshToken = async (id: string) => {
	const {data} = await AuthServiceInstance.get("/refresh/" + id);
	return data;
};

export const logOutUser = async (id: string) => {
	const {data} = await AuthServiceInstance.get("/logout/" + id);
	return data;
};

export const sendMail = async (mail: string) => {
	const {data} = await AuthServiceInstance.post(
		"/forgot-password",
		{mail},
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	return data;
};

type ValType = {
	otp: number;
	id: string;
};

export const sendOtp = async (val: ValType) => {
	const {otp, id} = val;
	const {data} = await AuthServiceInstance.post(
		"/otp",
		{otp, id},
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	return data;
};

export const resentOtp = async (id: string | undefined) => {
	const {data} = await AuthServiceInstance.post("/resend-otp", {id});
	await delay(2000);
	return data;
};

export const updatePassword = async ({newPassword, id}: any) => {
	const {data} = await AuthServiceInstance.post(
		"/reset-password",
		{newPassword, id},
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	return data;
};
