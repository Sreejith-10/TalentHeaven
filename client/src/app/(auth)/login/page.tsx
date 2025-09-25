"use client";

import GoogleLogin from "@/components/google-login";
import {Button} from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useToast} from "@/components/ui/use-toast";
import {loginUser} from "@/controllers/userAuthController";
import {loginSchema} from "@/schemas/login-schema";
import {useAuthStore} from "@/store/auth-store";
import {useUserStore} from "@/store/userStore";
import {delay} from "@/utils/delay";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {Check, Eye, EyeOffIcon, Loader2} from "lucide-react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {useForm} from "react-hook-form";
import * as z from "zod";

export default function Login() {
	const {toast} = useToast();
	const {push, back} = useRouter();
	const updateAuth = useAuthStore((state) => state.updateAuth);
	const updateUserId = useUserStore((state) => state.updateUserId);
	const [show, setShow] = useState(false);

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const {mutate, data, isPending, isSuccess} = useMutation({
		mutationFn: loginUser,
		onSuccess: (res) => {
			console.log(res);
			updateUserId(res.user.user_id);
			updateAuth(true);
			toast({title: "Succes", description: res.message, duration: 1500});
			localStorage.setItem("session_id", JSON.stringify(res.session_id));
			delay(2000).then(() => {
				back();
			});
		},
		onError: (error) => {
			const err = error as AxiosError<{message: string; err: any}>;
			if (err.message === "Network Error") {
				toast({
					title: "Bad network",
					description: "no network connection",
					variant: "info",
				});
			} else {
				toast({
					variant: "destructive",
					title: "Error",
					description: err.response?.data
						? err.response?.data.message
						: "cannot login",
					duration: 2000,
				});
			}
			return;
		},
	});

	const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
		mutate(values);
	};

	return (
		<div className="w-[400px] h-auto py-12 px-9 flex flex-col gap-10 shadow-xl rounded-2xl border border-slate-200 border-opacity-30 dark:border dark:border-input select-none">
			<div>
				<h1 className="font-bold text-[1.5rem]">Welcome back</h1>
				<p className="font-medium text-slate-600">Login to you account</p>
			</div>
			<GoogleLogin text="continue with google" />

			<div className="w-full h-auto grid place-content-center">
				<p className="w-fit h-fit p-1 font-bold text-[10px] text-slate-500 border border-slate-500 rounded-full relative before:content-[''] before:absolute before:w-[130px] before:left-[40px] before:h-[2px] before:bg-slate-300 before:top-0 before:bottom-0 before:my-auto after:content-[''] after:absolute after:w-[130px] after:right-[40px] after:h-[2px] after:bg-slate-300 after:top-0 after:bottom-0 after:my-auto">
					OR
				</p>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="email"
						render={({field}) => (
							<FormItem>
								<FormLabel className="font-bold">Email</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({field}) => (
							<FormItem>
								<FormLabel className="font-bold">Password</FormLabel>
								<FormControl>
									<div className="w-full h-auto relative">
										<Input
											autoComplete="password"
											{...field}
											type={show ? "text" : "password"}
										/>
										<div className="absolute top-1/2 translate-y-[-50%] right-3">
											{show ? (
												<Eye
													onClick={() => setShow(false)}
													size={22}
													className="cursor-pointer"
												/>
											) : (
												<EyeOffIcon
													onClick={() => setShow(true)}
													size={22}
													className="cursor-pointer"
												/>
											)}
										</div>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="w-full pb-3">
						<Link
							className="hover:text-purple-600 ease-in-out duration-700"
							href={"/register"}>
							create account?
						</Link>
						<Link
							className="float-right hover:text-purple-600 ease-in-out duration-700"
							href={"/forgot-password"}>
							forgot password ?
						</Link>
					</div>
					<Button
						type="submit"
						className={`${
							isSuccess
								? "bg-emerald-500 hover:bg-emerald-400 dark:bg-transparent dark:hover:bg-emerald-600"
								: "bg-purple-600 hover:bg-purple-400 dark:bg-transparent dark:hover:bg-purple-600"
						}  dark:text-white dark:border dark:border-input`}
						disabled={isPending}>
						Login
						{isPending && <Loader2 className="ml-3 animate-spin" />}
						{isSuccess && (
							<Check className="ml-3 animate-pop-up rounded-full border border-slate-50" />
						)}
					</Button>
				</form>
			</Form>
		</div>
	);
}
