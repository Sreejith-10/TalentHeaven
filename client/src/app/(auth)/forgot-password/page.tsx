"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useToast} from "@/components/ui/use-toast";
import {sendMail} from "@/controllers/userAuthController";
import {Label} from "@radix-ui/react-label";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {useRouter} from "next/navigation";
import {FormEvent} from "react";

export default function ForgotPassword() {
	const {push} = useRouter();

	const {mutate, isPending} = useMutation({
		mutationFn: sendMail,
		onError: (err) => {
			const error = err as AxiosError<{message: string}>;
			console.log(error);
			toast({
				title: "Error",
				description: error?.response?.data?.message,
				variant: "destructive",
			});
		},
		onSuccess: (res) => {
			toast({
				title: "Success",
				description: "otp has send to mail",
			});
			console.log(res);
			push("/otp/" + res.user_id);
		},
	});

	const {toast} = useToast();

	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		const mail = form.get("email");
		mutate(mail as string);
	};

	return (
		<div className="w-[350px] shadow-xl py-20 px-5 flex flex-col items-center gap-5 rounded-xl border border-slate-700 border-opacity-25 dark:border dark:border-slate-900">
			<h1 className="font-bold">OTP Generation</h1>
			<form
				onSubmit={submitHandler}
				className="flex flex-col items-center justify-center gap-5">
				<div className="space-y-2">
					<Label className="font-semibold">Email</Label>
					<Input type="email" name="email" />
				</div>
				<Button
					disabled={isPending}
					type="submit"
					className="bg-purple-500 hover:bg-purple-400 dark:text-slate-100">
					Send Otp
				</Button>
			</form>
		</div>
	);
}
