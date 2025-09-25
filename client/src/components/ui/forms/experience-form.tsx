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
import {addExperience, updateExperience} from "@/controllers/userController";
import {ExperienceType} from "@/lib/types";
import {useUserStore} from "@/store/userStore";
import {useToast} from "../use-toast";
import {Loader2} from "lucide-react";

const schema = z.object({
	company_name: z.string(),
	position: z.string(),
	start_date: z.string(),
	end_date: z.string(),
});

const ExperienceForm = ({
	children,
	experience,
	title = "Edit",
	content = "Make chages to you profile, ensure to save the changes",
	method,
}: {
	children: ReactNode;
	experience: ExperienceType;
	title?: string;
	content?: string;
	method: "ADD" | "UPDATE";
}) => {
	const {toast} = useToast();
	const uid = useUserStore((state) => state.userId);
	const setUser = useUserStore((state) => state.updateUserData);

	const dialogRef = useRef<HTMLButtonElement>(null);

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver<typeof schema>(schema),
		defaultValues: {
			company_name: experience.company_name,
			position: experience.position,
			start_date: experience.start_date,
			end_date: experience.end_date,
		},
	});

	const {mutate, isPending} = useMutation({
		mutationFn: method === "ADD" ? addExperience : updateExperience,
		onSuccess: (res) => {
			setUser(res.user);
			toast({title: res.message});
			dialogRef.current?.click();
		},
		onError: (err) => {
			toast({title: "error", description: "something went wrong"});
		},
	});

	const submitHandler = (values: z.infer<typeof schema>) => {
		uid && mutate({experience: values, user_id: uid});
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
							name="company_name"
							render={({field}) => (
								<FormItem>
									<FormLabel className="font-bold">Company name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="position"
							render={({field}) => (
								<FormItem>
									<FormLabel className="font-bold">Position</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<div className="space-y-5">
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
							<Button type="submit" className="">
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

export default ExperienceForm;
