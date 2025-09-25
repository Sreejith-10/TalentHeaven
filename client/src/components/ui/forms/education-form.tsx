import {Loader2, Pen} from "lucide-react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../dialog";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../form";
import {Input} from "../input";
import {Button} from "../button";
import {ReactNode, useRef} from "react";
import {useMutation} from "@tanstack/react-query";
import {addEducation, updateEducation} from "@/controllers/userController";
import {useUserStore} from "@/store/userStore";
import {useToast} from "../use-toast";
import {AxiosError} from "axios";

const schema = z.object({
	institute: z.string(),
	education_type: z.string(),
	stream: z.string(),
	marks: z.string(),
	start_date: z.string(),
	end_date: z.string(),
});

const EducationForm = ({
	children,
	education,
	title = "Edit",
	content = "Make chages to you profile, ensure to save the changes",
	method,
}: {
	children: ReactNode;
	education: {
		institute: string;
		education_type: string;
		stream: string;
		marks: string;
		start_date: string;
		end_date: string;
	};
	title?: string;
	content?: string;
	method: "ADD" | "UPDATE";
}) => {
	const {toast} = useToast();
	const uid = useUserStore((state) => state.userId);
	const setUser = useUserStore((state) => state.updateUserData);

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver<typeof schema>(schema),
		defaultValues: {
			institute: education.institute,
			education_type: education.education_type,
			stream: education.stream,
			marks: education.marks,
			start_date: education.start_date,
			end_date: education.end_date,
		},
	});

	const dialogRef = useRef<HTMLButtonElement>(null);

	const {mutate, isPending} = useMutation({
		mutationFn: method === "ADD" ? addEducation : updateEducation,
		onSuccess: (res) => {
			setUser(res.user);
			toast({title: res.message});
			dialogRef.current?.click();
		},
		onError: (err) => {
			const error = err as AxiosError<{message: string}>;
			toast({title: "error", description: error.response?.data.message});
		},
	});

	const submitHandler = (values: z.infer<typeof schema>) => {
		mutate({education: values, user_id: uid});
	};

	return (
		<Dialog>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{content}</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						className="space-y-4"
						onSubmit={form.handleSubmit(submitHandler)}>
						<FormField
							control={form.control}
							name="institute"
							render={({field}) => (
								<FormItem>
									<FormLabel className="font-bold">Institute</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="education_type"
							render={({field}) => (
								<FormItem>
									<FormLabel className="font-bold">course</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="stream"
							render={({field}) => (
								<FormItem>
									<FormLabel className="font-bold">Stream</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="marks"
							render={({field}) => (
								<FormItem>
									<FormLabel className="font-bold">
										Marks(in percentage %)
									</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<div>
							<FormField
								control={form.control}
								name="start_date"
								render={({field}) => (
									<FormItem>
										<FormLabel className="font-bold">Start date</FormLabel>
										<FormControl>
											<Input {...field} type="date" />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="end_date"
								render={({field}) => (
									<FormItem>
										<FormLabel className="font-bold">End date</FormLabel>
										<FormControl>
											<Input {...field} type="date" />
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						<br />
						<div className="flex gap-2 flex-col">
							<Button type="submit">
								{method === "ADD" ? "Submit" : "Save changes"}
								{isPending && <Loader2 className="ml-4 animate-spin" />}
							</Button>
							<DialogClose ref={dialogRef} asChild>
								<Button variant="outline" type="button">
									Cancel changes
								</Button>
							</DialogClose>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default EducationForm;
