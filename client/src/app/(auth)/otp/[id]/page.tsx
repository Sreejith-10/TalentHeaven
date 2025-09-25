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
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp";
import {Label} from "@/components/ui/label";
import {useToast} from "@/components/ui/use-toast";
import {resentOtp, sendOtp} from "@/controllers/userAuthController";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {Loader2} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import * as z from "zod";

const otpSchema = z.object({
	otp: z.string().min(4, {message: "not a valid otp"}),
});

export default function OTP() {
	const {id}: {id: string} = useParams();
	const {toast} = useToast();
	const {push} = useRouter();

	const [reset, setReset] = useState(false);
	const [time, setTime] = useState(59);
	const [resetTime, setResetTime] = useState(30);
	const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
	const [resetId, setResetId] = useState<NodeJS.Timeout | null>(null);

	const form = useForm<z.infer<typeof otpSchema>>({
		resolver: zodResolver(otpSchema),
		defaultValues: {
			otp: "",
		},
	});

	const {
		mutate: resend,
		isPending,
		isSuccess,
	} = useMutation({
		mutationFn: resentOtp,
		onError: (err) => {
			console.log(err);
		},
		onSuccess: (res) => {
			toast({title: "success", description: res.message, variant: "success"});
			setResetTime(30);
		},
	});

	const {mutate: submitOtp} = useMutation({
		mutationFn: sendOtp,
		onSuccess: (res) => {
			toast({
				title: "success",
				description: res.message,
				variant: "success",
				duration: 1500,
			});
			push("/reset-password/" + res.id);
		},
		onError: (err) => {
			const error = err as AxiosError<{message: string}>;
			toast({
				title: "error",
				description: error.response?.data?.message,
				variant: "error",
			});
		},
	});

	useEffect(() => {
		if (isPending) return;
		if (intervalId) {
			clearInterval(intervalId);
		}
		const newInterval = setInterval(() => {
			if (time <= 0) return;

			setTime(time - 1);
		}, 1000);

		setIntervalId(newInterval);

		return () => {
			clearInterval(newInterval);
		};
	}, [time, isPending]);

	useEffect(() => {
		if (resetId) {
			clearInterval(resetId);
		}
		const newResetId = setInterval(() => {
			if (resetTime <= 0) return;

			setResetTime(resetTime - 1);
		}, 1000);

		setResetId(newResetId);
		return () => {
			clearInterval(newResetId);
		};
	}, [resetTime]);

	useEffect(() => {
		if (time === 0) {
			form.setError("otp", {
				message: "otp timeout",
			});
		}

		if (reset) {
			form.clearErrors("otp");
			setTime(59);
		}
	}, [reset, time]);

	const otpSubmitHandler = (values: z.infer<typeof otpSchema>) => {
		submitOtp({otp: parseInt(values.otp), id});
	};

	const resendOtpHandler = () => {
		resend(id);
		setTime(59);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-center">Submit the OTP</CardTitle>
				<CardDescription>one time password has sent your mail</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(otpSubmitHandler)}>
						<FormField
							control={form.control}
							name="otp"
							render={({field}) => (
								<FormItem className="space-y-4 text-center flex items-center justify-center flex-col">
									<FormLabel>OTP</FormLabel>
									<FormLabel>{time}</FormLabel>
									<FormControl>
										<InputOTP maxLength={4} {...field} disabled={time === 0}>
											<InputOTPGroup>
												<InputOTPSlot index={0} valid={time === 0} />
												<InputOTPSlot index={1} valid={time === 0} />
												<InputOTPSlot index={2} valid={time === 0} />
												<InputOTPSlot index={3} valid={time === 0} />
											</InputOTPGroup>
										</InputOTP>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<br />
						<div className="w-full flex justify-between">
							<Button
								onClick={resendOtpHandler}
								type="button"
								variant="outline"
								disabled={resetTime !== 0}>
								Resend{" "}
								{resetTime !== 0 ? (
									<span className="ml-3">({resetTime})</span>
								) : (
									""
								)}
								{isPending && <Loader2 className="animate-spin ml-3" />}
							</Button>
							<Button type="submit" disabled={time === 0}>
								Submit
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
