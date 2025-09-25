"use client";

import {Button} from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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
import {updatePassword} from "@/controllers/userAuthController";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {Eye, EyeOffIcon} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
import {useState} from "react";
import {useForm} from "react-hook-form";
import * as z from "zod";

const schema = z.object({
	newPassword: z
		.string()
		.min(6, {message: "password must be 6 characters ling"}),
});

export default function Page() {
	const {id}: {id: string} = useParams();
	const [show, setShow] = useState(false);
	const {push} = useRouter();
	const {toast} = useToast();

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			newPassword: "",
		},
	});

	const {mutate} = useMutation({
		mutationFn: updatePassword,
		onSuccess: (res) => {
			toast({
				title: "updated",
				description: "password has been updated",
				variant: "success",
			});
			push("/login");
		},
		onError: (err) => {
			const error = err as AxiosError<{message: string}>;
			if (error.response?.status === 304) {
				form.setError("newPassword", {
					message:
						"New password is same as the previous one. Provide a strong password",
				});
			} else {
				toast({
					title: "error",
					description: error?.response?.data?.message,
					variant: "error",
				});
			}
		},
	});

	const submitHandler = (values: z.infer<typeof schema>) => {
		mutate({newPassword: values.newPassword, id});
	};

	return (
		<Card className="w-80 rounded-2xl">
			<CardHeader>
				<CardTitle>New Password</CardTitle>
				<CardDescription>Create a new password</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(submitHandler)}
						className="space-y-5">
						<FormField
							control={form.control}
							name="newPassword"
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
						<Button type="submit">Submit</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
