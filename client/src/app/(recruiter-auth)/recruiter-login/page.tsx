"use client";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {Eye, EyeOffIcon, Loader2} from "lucide-react";
import {useState} from "react";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@tanstack/react-query";
import {login} from "@/controllers/recruiterController";
import {useToast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {AxiosError} from "axios";

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export default function Login() {
	const {push} = useRouter();
	const [show, setShow] = useState(false);
	const {toast} = useToast();
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver<typeof loginSchema>(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const {mutate, isPending} = useMutation({
		mutationFn: login,
		onSuccess: (res) => {
			push("/dashboard");
			toast({title: "Succes", duration: 3000});
			localStorage.setItem("session_id", JSON.stringify(res.data.session_id));
		},
		onError: (err) => {
			const error = err as AxiosError<{message: string}>;
			toast({
				title: "Error",
				description: error?.response?.data.message,
				variant: "error",
				duration: 3000,
			});
		},
	});

	const handleSubmit = (values: z.infer<typeof loginSchema>) => {
		mutate(values);
	};

	return (
		<div className="w-[400px] h-auto py-12 px-9 flex flex-col gap-10 shadow-xl rounded-2xl border border-slate-200 border-opacity-30 dark:border dark:border-input">
			<div>
				<h1 className="font-bold text-[1.5rem]">Login</h1>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="email"
						render={({field}) => (
							<FormItem>
								<FormLabel className="font-bold">User Email</FormLabel>
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
								<FormLabel className="font-bold">User Password</FormLabel>
								<FormControl>
									<div className="w-full h-auto relative">
										<Input {...field} type={show ? "text" : "password"} />
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

					<br />
					<Link
						href={"/register-company"}
						className="text-blue-500 hover:underline">
						Register company
					</Link>

					<br />

					<Button
						type="submit"
						className="bg-purple-600 hover:bg-purple-400 dark:bg-transparent dark:hover:bg-purple-600 dark:text-white dark:border dark:border-input">
						Login
						{isPending && <Loader2 className="ml-3 animate-spin" />}
					</Button>
				</form>
			</Form>
		</div>
	);
}
