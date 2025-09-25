"use client";

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
import {Label} from "@/components/ui/label";
import {accountSchema} from "@/schemas/account-setup-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMemo, useState} from "react";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import * as z from "zod";
import Cookie from "js-cookie";
import {jwtDecode} from "jwt-decode";
import {useToast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import {useMutation} from "@tanstack/react-query";
import {createUser} from "@/controllers/userController";
import {AxiosError} from "axios";
import {Trash, X} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";
import {
	DialogDescription,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

export default function MultiStepForm() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const {toast} = useToast();
	const {push} = useRouter();
	const [skills, setSkills] = useState<string[] | []>([]);
	const [jobs, setJobs] = useState<string[] | []>([]);
	const [tech, setTech] = useState<string[] | []>([]);

	const {mutate, isPending} = useMutation({
		mutationFn: createUser,
		onSuccess: (res) => {
			push("/account");
			toast({
				title: "account setup complete",
				description: res.data.message,
				duration: 3000,
			});
		},
		onError: (error) => {
			const err = error as AxiosError<{message: string; err: any}>;
			toast({
				variant: "destructive",
				title: "Error",
				description: err.response?.data.message,
				duration: 3000,
			});
		},
	});

	const form = useForm<z.infer<typeof accountSchema>>({
		resolver: zodResolver(accountSchema),
		defaultValues: {
			fname: "",
			lname: "",
			profession: "",
			about: "",
			phone: "",
			email: "",
			skills: [""],
			references: [{link_name: "Personal website or portfolio", link_path: ""}],
			experience: [
				{company_name: "", position: "", end_date: "", start_date: ""},
			],
			education: [
				{
					institute: "",
					education_type: "",
					stream: "",
					start_date: "",
					end_date: "",
					marks: "",
				},
			],
			job_preferences: [""],
			projects: [
				{
					project_name: "",
					project_description: "",
					technologies_used: [""],
					reference: "",
				},
			],
		},
	});

	const {
		fields: educationFields,
		append: educationFieldAppend,
		remove: educationFieldRemove,
	} = useFieldArray({
		name: "education",
		control: form.control,
	});

	const {
		fields: experienceFields,
		append: experienceFieldAppend,
		remove: experienceFieldRemove,
	} = useFieldArray({
		name: "experience",
		control: form.control,
	});

	const {
		fields: projectsField,
		append: projectsFieldAppend,
		remove: projectsFieldRemove,
		update,
	} = useFieldArray({
		name: "projects",
		control: form.control,
	});

	const {
		fields: referenceField,
		append: referenceFieldAppend,
		remove: referenceFieldRemove,
	} = useFieldArray({
		name: "references",
		control: form.control,
	});

	const submitHandler = (values: z.infer<typeof accountSchema>) => {
		const token = Cookie.get("access_token");
		const decoded = jwtDecode(token!);

		//@ts-expect-error type jwt data
		const id = decoded.id;

		mutate({values, user_id: id});
	};

	const stepOneClickHandler = async () => {
		const fname = form.getValues("fname");
		const email = form.getValues("email");
		if (fname === "") {
			return form.setError("fname", {message: "Provide a name"});
		}

		if (email && email?.length > 0) {
			const valid = await form.trigger("email");

			if (valid) {
				setCurrentIndex(1);
			} else {
				return;
			}
		}
	};

	return (
		<div className="w-full min-h-dvh grid place-content-center py-10">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(submitHandler)}
					className="space-y-4 w-[500px] border border-slate-300 dark:border-slate-800 shadow-md rounded-xl py-10 px-8">
					{currentIndex === 0 && (
						<div className="space-y-4">
							<h1 className="font-semibold text-[25px]">Personal Details</h1>
							<br />
							<FormField
								control={form.control}
								name="fname"
								render={({field}) => (
									<FormItem>
										<FormLabel className="font-bold">Fisrt name</FormLabel>
										<FormControl>
											<Input {...field} required />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="lname"
								render={({field}) => (
									<FormItem>
										<FormLabel className="font-bold">Last name</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
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
								name="phone"
								render={({field}) => (
									<FormItem>
										<FormLabel className="font-bold">Phone number</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<br />
							<div className="w-full flex justify-end">
								<Button
									onClick={stepOneClickHandler}
									className="bg-blue-500 hover:bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-400">
									Next
								</Button>
							</div>
						</div>
					)}

					{currentIndex === 1 && (
						<div>
							<h1 className="font-semibold text-[25px]">Skills</h1>
							<p>Provide your skills if any</p>
							<br />
							<Input
								type="text"
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										const skill = e.currentTarget.value;
										setSkills((prev) => [...prev, skill]);
										e.currentTarget.value = "";
									}
								}}
							/>
							<br />

							<div className="w-full h-auto flex flex-wrap gap-5">
								{skills?.map((item, index) => (
									<div
										key={index}
										className="bg-slate-300 px-4 py-1 rounded-md cursor-pointer relative group hover:bg-red-500 transition-all ease-in-out">
										<button
											className="absolute left-0 right-0 grid place-content-center z-[-10] group-hover:z-[10] transition-all  ease-in-out"
											onClick={() => {
												setSkills((prev) =>
													prev.filter((iem, ind) => {
														if (ind !== index) {
															return item;
														}
													})
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
							<br />

							<div className="w-full flex justify-between">
								<Button
									onClick={() => {
										form.setValue("skills", skills);
										setCurrentIndex((prev) => prev - 1);
									}}
									className="bg-red-500 hover:bg-red-400 dark:bg-red-500 dark:hover:bg-red-400">
									Prev
								</Button>
								<Button
									onClick={() => {
										{
											form.setValue("skills", skills);
											setCurrentIndex((prev) => prev + 1);
										}
									}}
									className="bg-blue-500 hover:bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-400">
									Next
								</Button>
							</div>
						</div>
					)}

					{currentIndex === 2 && (
						<div className="space-y-5">
							<h1 className="font-semibold text-[25px]">Educational Details</h1>
							{educationFields.map((item, index) => {
								return (
									<div key={index} className="space-y-4">
										<h1>Education #{index + 1}</h1>

										<div>
											<Label className="font-bold">Institue</Label>
											<Input
												type="text"
												{...form.register(`education.${index}.institute`)}
											/>
										</div>

										<div>
											<Label className="font-bold">Qualification</Label>
											<Input
												type="text"
												{...form.register(`education.${index}.education_type`)}
											/>
										</div>

										<div>
											<Label className="font-bold">Stream</Label>
											<Input
												type="text"
												{...form.register(`education.${index}.stream`)}
											/>
										</div>

										<div>
											<Label className="font-bold">
												Marks{" "}
												<span className="font-medium text-slate-600">
													(in percentage %)
												</span>
											</Label>
											<Input
												type="text"
												{...form.register(`education.${index}.marks`)}
											/>
										</div>

										<div className="flex w-full justify-between gap-5">
											<div className="w-1/2">
												<Label className="font-bold">Start Date</Label>
												<Input
													className="w-full"
													type="date"
													{...form.register(`education.${index}.start_date`)}
												/>
											</div>

											<div className="w-1/2">
												<Label className="font-bold">End Date</Label>
												<Input
													className="w-full"
													type="date"
													{...form.register(`education.${index}.end_date`)}
												/>
											</div>
										</div>

										<br />
										<div className="w-full flex justify-between">
											{index >= 1 && (
												<Button
													onClick={() => {
														educationFieldRemove(index);
													}}>
													Remove
												</Button>
											)}
											<Button
												onClick={() => {
													educationFieldAppend({
														institute: "",
														education_type: "",
														stream: "",
														marks: "",
														start_date: "",
														end_date: "",
													});
												}}>
												Add Education
											</Button>
										</div>
									</div>
								);
							})}

							<br />
							<div className="w-full flex justify-between">
								<Button
									onClick={() => setCurrentIndex((prev) => prev - 1)}
									className="bg-red-500 hover:bg-red-400 dark:bg-red-500 dark:hover:bg-red-400">
									Prev
								</Button>
								<Button
									onClick={() => setCurrentIndex((prev) => prev + 1)}
									className="bg-blue-500 hover:bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-400">
									Next
								</Button>
							</div>
						</div>
					)}

					{currentIndex === 3 && (
						<div className="space-y-5">
							<h1 className="font-semibold text-[25px]">Projects</h1>
							{projectsField.map((item, index) => {
								return (
									<div key={index} className="space-y-4">
										<h1>Project #{index + 1}</h1>

										<div>
											<Label className="font-bold">Project name</Label>
											<Input
												type="text"
												{...form.register(`projects.${index}.project_name`)}
											/>
										</div>

										<div>
											<Label className="font-bold">Project description</Label>
											<Textarea
												{...form.register(
													`projects.${index}.project_description`
												)}
											/>
										</div>

										<div>
											<Label className="font-bold">Technologies Used</Label>
											<Input
												type="text"
												onChange={(e) => {
													const t = e.target.value.trim();
													setTech((prev) => [...prev, t]);
													e.target.value = "";
												}}
											/>

											{/* <div className="w-full h-auto flex flex-wrap gap-5">
												{tech?.map((item, index) => (
													<span
														className="bg-slate-200 w-fit px-3 py-3 rounded-md flex justify-between gap-5"
														key={index}>
														<p className="font-semibold text-sm text-slate-700">
															{item}
														</p>
														<X
															size={20}
															className="hover:cursor-pointer"
															onClick={() => {
																setTech((prev) =>
																	prev.filter((iem, ind) => {
																		if (ind !== index) {
																			return item;
																		}
																	})
																);
															}}
														/>
													</span>
												))}
											</div> */}
										</div>

										<div>
											<Label className="font-bold">Refrence</Label>
											<Input
												type="text"
												{...form.register(`projects.${index}.reference`)}
											/>
										</div>

										<br />
										<div className="w-full flex justify-between">
											{index >= 1 && (
												<Button
													onClick={() => {
														projectsFieldRemove(index);
													}}>
													Remove
												</Button>
											)}
											<Button
												onClick={() => {
													projectsFieldAppend({
														project_name: "",
														project_description: "",
														technologies_used: [""],
														reference: "",
													});
												}}>
												Add Project
											</Button>
										</div>
									</div>
								);
							})}

							<br />
							<div className="w-full flex justify-between">
								<Button
									onClick={() => setCurrentIndex((prev) => prev - 1)}
									className="bg-red-500 hover:bg-red-400 dark:bg-red-500 dark:hover:bg-red-400">
									Prev
								</Button>
								<Button
									onClick={() => setCurrentIndex((prev) => prev + 1)}
									className="bg-blue-500 hover:bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-400">
									Next
								</Button>
							</div>
						</div>
					)}

					{currentIndex === 4 && (
						<div>
							<h1 className="font-semibold text-[25px]">Job preferences</h1>
							<p>Add your prefered jobs</p>
							<br />
							<Input
								type="text"
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										const job = e.currentTarget.value;
										setJobs((prev) => [...prev, job]);
										e.currentTarget.value = "";
									}
								}}
							/>
							<br />

							<div className="w-full h-auto flex flex-wrap gap-5">
								{jobs?.map((item, index) => (
									<div
										key={index}
										className="bg-slate-300 px-4 py-1 rounded-md cursor-pointer relative group hover:bg-red-500 transition-all ease-in-out">
										<button
											className="absolute left-0 right-0 grid place-content-center z-[-10] group-hover:z-[10] transition-all  ease-in-out"
											onClick={() => {
												setJobs((prev) =>
													prev.filter((iem, ind) => {
														if (ind !== index) {
															return item;
														}
													})
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
							<br />

							<div className="w-full flex justify-between">
								<Button
									onClick={() => {
										form.setValue("job_preferences", jobs);
										setCurrentIndex((prev) => prev - 1);
									}}
									className="bg-red-500 hover:bg-red-400 dark:bg-red-500 dark:hover:bg-red-400">
									Prev
								</Button>
								<Button
									onClick={() => {
										{
											form.setValue("job_preferences", jobs);
											setCurrentIndex((prev) => prev + 1);
										}
									}}
									className="bg-blue-500 hover:bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-400">
									Next
								</Button>
							</div>
						</div>
					)}

					{currentIndex === 5 && (
						<div className="space-y-5">
							<h1 className="font-semibold text-[25px]">Experience</h1>
							{experienceFields.map((item, index) => {
								return (
									<div key={index} className="space-y-4">
										<h1>Comapny #{index + 1}</h1>

										<div>
											<Label className="font-bold">Company name</Label>
											<Input
												type="text"
												{...form.register(`experience.${index}.company_name`)}
											/>
										</div>

										<div>
											<Label className="font-bold">Position</Label>
											<Input
												type="text"
												{...form.register(`experience.${index}.position`)}
											/>
										</div>

										<div className="flex w-full justify-between gap-5">
											<div className="w-1/2">
												<Label className="font-bold">Start Date</Label>
												<Input
													className="w-full"
													type="date"
													{...form.register(`experience.${index}.start_date`)}
												/>
											</div>

											<div className="w-1/2">
												<Label className="font-bold">End Date</Label>
												<Input
													className="w-full"
													type="date"
													{...form.register(`experience.${index}.end_date`)}
												/>
											</div>
										</div>

										<br />
										<div className="w-full flex justify-between">
											{index >= 1 && (
												<Button
													onClick={() => {
														experienceFieldRemove(index);
													}}>
													Remove
												</Button>
											)}
											<Button
												onClick={() => {
													experienceFieldAppend({
														company_name: "",
														position: "",
														start_date: "",
														end_date: "",
													});
												}}>
												Add Experience
											</Button>
										</div>
									</div>
								);
							})}

							<br />
							<div className="w-full flex justify-between">
								<Button
									onClick={() => setCurrentIndex((prev) => prev - 1)}
									className="bg-red-500 hover:bg-red-400 dark:bg-red-500 dark:hover:bg-red-400">
									Prev
								</Button>
								<Button
									onClick={() => setCurrentIndex((prev) => prev + 1)}
									className="bg-blue-500 hover:bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-400">
									Next
								</Button>
							</div>
						</div>
					)}

					{currentIndex === 6 && (
						<div className="space-y-5">
							<h1 className="font-semibold text-[25px]">References</h1>

							{referenceField.map((field, index) => (
								<div key={index} className="space-y-2">
									<div className="w-fit flex items-center gap-3">
										<Label className="font-bold">{field.link_name}</Label>
										{field.link_name !== "Personal website or portfolio" && (
											<span className="cursor-pointer">
												<Trash
													className="size-5 hover:text-destructive"
													onClick={() => {
														referenceFieldRemove(index);
													}}
												/>
											</span>
										)}
									</div>
									<Input
										type="text"
										{...form.register(`references.${index}.link_path`)}
									/>
								</div>
							))}

							<div className="w-full flex flex-col items-start gap-5">
								<ReferenceSelect
									appendNewField={referenceFieldAppend}
									fields={referenceField}
								/>

								<div className="w-full flex justify-end">
									<Button
										type="submit"
										className="bg-emerald-500 hover:bg-emerald-400 dark:bg-emerald-500 dark:hover:bg-emerald-400 float-right">
										Submit
									</Button>
								</div>
							</div>
						</div>
					)}
				</form>
			</Form>
		</div>
	);
}

const ReferenceSelect = ({
	appendNewField,
	fields,
}: {
	appendNewField: any;
	fields: {id: string; link_name: string; link_path: string}[];
}) => {
	const refs = [
		{name: "linkedin"},
		{name: "twitter"},
		{name: "github"},
		{name: "stackoverflow"},
	];

	return (
		<Dialog>
			<DialogTrigger>
				<span className="bg-purple-600 text-slate-50 px-3 py-2 rounded-lg font-medium text-sm hover:bg-purple-400">
					add reference
				</span>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Select</DialogTitle>
					<DialogDescription>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione,
						cum?
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-3">
					{refs
						.filter((ref) => {
							return fields.every((field) => {
								return field.link_name !== ref.name;
							});
						})
						.map((ref, idx) => (
							<div
								onClick={() => {
									appendNewField({
										link_name: ref.name,
										link_path: "",
									});
								}}
								key={idx}
								className="w-full border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg py-2 px-3">
								{ref.name}
							</div>
						))}
				</div>
			</DialogContent>
		</Dialog>
	);
};
