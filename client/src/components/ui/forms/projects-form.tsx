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
import {ReactNode, useRef, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {addProject, updateProject} from "@/controllers/userController";
import {ProjectsType} from "@/lib/types";
import {Textarea} from "../textarea";
import {Label} from "../label";
import {Loader2, Trash} from "lucide-react";
import {useUserStore} from "@/store/userStore";
import {useToast} from "../use-toast";

const schema = z.object({
	project_name: z.string(),
	project_description: z.string(),
	technologies_used: z.array(z.string()),
	reference: z.string(),
});

const ProjectsForm = ({
	children,
	projects,
	title = "Edit",
	content = "Make chages to you profile, ensure to save the changes",
	method,
}: {
	children: ReactNode;
	projects: ProjectsType;
	title?: string;
	content?: string;
	method: "ADD" | "UPDATE";
}) => {
	const uid = useUserStore((state) => state.userId);
	const setUser = useUserStore((state) => state.updateUserData);

	const dialogRef = useRef<HTMLButtonElement>(null);

	const {toast} = useToast();
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver<typeof schema>(schema),
		defaultValues: {
			project_name: projects.project_name,
			project_description: projects.project_description,
			technologies_used: projects.technologies_used,
			reference: projects.reference,
		},
	});

	const [tech, setTech] = useState(
		method === "ADD" ? [] : form.getValues("technologies_used")
	);

	const {mutate, isPending} = useMutation({
		mutationFn: method === "ADD" ? addProject : updateProject,
		onSuccess: (res) => {
			setUser(res.user);
			toast({title: res.message});
			dialogRef.current?.click();
		},
	});

	const submitHandler = (values: z.infer<typeof schema>) => {
		uid && mutate({projects: values, user_id: uid});
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
							name="project_name"
							render={({field}) => (
								<FormItem>
									<FormLabel className="font-bold">Project name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="project_description"
							render={({field}) => (
								<FormItem>
									<FormLabel className="font-bold">Description</FormLabel>
									<FormControl>
										<Textarea {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<div className="space-y-4">
							<div className="space-y-2">
								<Label className="font-semibold">Techologies used</Label>
								<Input
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											const t = e.currentTarget.value.trim();
											setTech((prev) => [...prev, t]);
											form.setValue("technologies_used", [...tech, t]);
											e.currentTarget.value = "";
										}
									}}
								/>
							</div>
							<div className="flex flex-wrap gap-5">
								{tech.map((item, index) => (
									<div
										key={index}
										className="bg-slate-300 px-4 py-1 rounded-md cursor-pointer relative group hover:bg-red-500 transition-all ease-in-out">
										<button
											className="absolute left-0 right-0 grid place-content-center z-[-10] group-hover:z-[10] transition-all  ease-in-out"
											onClick={(e) => {
												e.preventDefault();
												setTech((prev) =>
													prev.filter((_, idx) => idx !== index)
												);
											}}>
											<Trash size={20} className="text-slate-50" />
										</button>
										<p className="font-semibold text-sm text-slate-800  group-hover:opacity-0 transition-all ease-in-out">
											{item}
										</p>
									</div>
								))}
							</div>
						</div>

						<FormField
							control={form.control}
							name="reference"
							render={({field}) => (
								<FormItem>
									<FormLabel className="font-bold">
										Refrence (source code)
									</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
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

export default ProjectsForm;
