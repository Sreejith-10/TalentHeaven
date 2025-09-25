"use client";

import {Button} from "@/components/ui/button";
import {
	Form,
	FormField,
	FormMessage,
	FormControl,
	FormLabel,
	FormItem,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {
	SelectItem,
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {useToast} from "@/components/ui/use-toast";
import {registerCompany} from "@/controllers/recruiterController";
import {comapnyRegistrationSchema} from "@/schemas/company-registration-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {useRouter} from "next/navigation";
import {useMemo, useRef, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import * as z from "zod";
import {Country, State, City} from "country-state-city";
import {companyCategories} from "@/constants/company";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Check, ChevronsUpDown} from "lucide-react";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {cn} from "@/lib/utils";

export default function RegisterCompany() {
	const {push} = useRouter();
	const {toast} = useToast();
	const [open, setOpen] = useState(false);

	const [page, setPage] = useState(0);

	const form = useForm<z.infer<typeof comapnyRegistrationSchema>>({
		resolver: zodResolver(comapnyRegistrationSchema),
		defaultValues: {
			company_name: "",
			company_logo: "",
			company_about: "",
			company_category: "",
			company_industry: "",
			company_country: "",
			company_state: "",
			company_city: "",
			company_address: "",
			reference: "",
			phone_number: "",
		},
	});

	const [countryCode, setCountryCode] = useState("");
	const [stateCode, setStateCode] = useState("");

	const phoneRef = useRef<HTMLInputElement>(null);

	const country = useMemo(() => {
		return Country.getAllCountries();
	}, []);

	const state = useMemo(() => {
		return State.getStatesOfCountry(countryCode);
	}, [countryCode]);

	const city = useMemo(() => {
		return City.getCitiesOfState(countryCode, stateCode);
	}, [countryCode, stateCode]);

	const {mutate} = useMutation({
		mutationFn: registerCompany,
		onSuccess: ({data}) => {
			const {message, company_id} = data;
			push("/recruiter-register/" + company_id);
		},
		onError: (err) => {
			const error = err as AxiosError<{message: string; err: any}>;
			toast({
				title: "error",
				description: error.message,
			});
		},
	});

	const submitHandler = (values: z.infer<typeof comapnyRegistrationSchema>) => {
		mutate(values);
	};

	return (
		<div className="w-[700px] lg:w-auto md:w-auto sm:w-auto h-auto py-12 px-9 flex flex-col gap-6 shadow-xl rounded-2xl border border-slate-200 border-opacity-30 dark:border dark:border-input">
			<div>
				<h1 className="font-bold text-[1.5rem]">Registration</h1>
				<p className="font-medium text-slate-600">
					Register your company in Talent Heaven
				</p>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(submitHandler)}>
					{page === 0 && (
						<div className="space-y-4">
							<h1 className="font-semibold text-lg">About Company</h1>
							<div className="grid grid-cols-2 gap-y-4 gap-x-3">
								<FormField
									control={form.control}
									name="company_name"
									render={({field}) => (
										<FormItem className="w-full">
											<FormLabel className="font-bold">Company Name</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="company_logo"
									render={({field}) => (
										<FormItem>
											<FormLabel className="font-bold">
												Logo (optional)
											</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="company_about"
									render={({field}) => (
										<FormItem className="col-span-2">
											<FormLabel className="font-bold">About</FormLabel>
											<FormControl>
												<Textarea {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="company_industry"
									render={({field}) => (
										<FormItem className="m-0">
											<FormLabel className="font-bold">Industry</FormLabel>
											<Select onValueChange={field.onChange} defaultValue="">
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="select a industry" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{Object.keys(companyCategories).map((item, index) => (
														<SelectItem value={item} key={index}>
															{item}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="company_category"
									render={({field}) => (
										<FormItem className="m-0">
											<FormLabel className="font-bold">Category</FormLabel>
											<Select onValueChange={field.onChange} defaultValue="">
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="select a category" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{form.getValues("company_industry") ? (
														companyCategories[
															form.getValues("company_industry")
														]?.map((item, index) => (
															<SelectItem value={item} key={index}>
																{item}
															</SelectItem>
														))
													) : (
														<h1 className="font-semibold text-sm">
															select a category
														</h1>
													)}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="reference"
									render={({field}) => (
										<FormItem>
											<FormLabel className="font-bold">
												Company Website <span>(optional)</span>
											</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
					)}

					{page === 1 && (
						<div className="space-y-4">
							<h1 className="font-semibold text-lg">Company Location</h1>
							<div className="grid grid-cols-2 gap-x-6 gap-y-4">
								<FormField
									control={form.control}
									name="company_country"
									render={({field}) => (
										<ComboBox
											data={country}
											title="Coountry"
											fieldValue={field.value}
											formValue={form.getValues("company_country")}
											updateFormField={(val) =>
												form.setValue("company_country", val)
											}
											updateKey={(key) => setCountryCode(key)}
										/>
									)}
								/>

								<FormField
									control={form.control}
									name="company_state"
									render={({field}) => (
										<ComboBox
											data={state}
											title="State"
											fieldValue={field.value}
											formValue={form.getValues("company_state")}
											updateFormField={(val) =>
												form.setValue("company_state", val)
											}
											updateKey={(key) => setStateCode(key)}
										/>
									)}
								/>

								<FormField
									control={form.control}
									name="company_city"
									render={({field}) => (
										<ComboBox
											data={city}
											title="City"
											fieldValue={field.value}
											formValue={form.getValues("company_city")}
											updateFormField={(val) =>
												form.setValue("company_city", val)
											}
											updateKey={(k) => {}}
										/>
									)}
								/>

								<FormField
									control={form.control}
									name="phone_number"
									render={({field}) => (
										<FormItem className="m-0">
											<FormItem className="w-full flex flex-col space-y-4">
												<FormLabel className="font-bold">
													Phone number
												</FormLabel>
												<div className="flex">
													<Popover open={open} onOpenChange={setOpen}>
														<PopoverTrigger asChild className="w-auto">
															<FormControl>
																<Button
																	variant="outline"
																	role="combobox"
																	className={cn(
																		"w-[100px] justify-between",
																		!field.value && "text-muted-foreground"
																	)}>
																	{field.value
																		? form.getValues("phone_number")
																		: `+${country[0].phonecode} `}
																	<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
																</Button>
															</FormControl>
														</PopoverTrigger>
														<PopoverContent className="w-[200px] p-0">
															<Command>
																<CommandInput placeholder="Search phone code..." />
																<CommandEmpty>No country found.</CommandEmpty>
																<CommandGroup className="cursor-pointer">
																	<CommandList>
																		{country?.map((item, index) => (
																			<CommandItem
																				value={item?.phonecode}
																				key={index}
																				className={cn("text-slate-950")}
																				onSelect={() => {
																					form.setValue(
																						"phone_number",
																						item.phonecode
																					);
																					setOpen(false);
																					phoneRef.current?.focus();
																				}}>
																				<Check
																					className={cn(
																						"mr-2 h-4 w-4",
																						item.name === field.value
																							? "opacity-100"
																							: "opacity-0"
																					)}
																				/>
																				{item.phonecode.includes("+")
																					? item.phonecode
																					: `+ ${item.phonecode}`}
																			</CommandItem>
																		))}
																	</CommandList>
																</CommandGroup>
															</Command>
														</PopoverContent>
													</Popover>

													<Input
														ref={phoneRef}
														placeholder="enter phone number"
														onChange={(e) => {
															const prev = form.getValues("phone_number");
															form.setValue(
																"phone_number",
																prev + e.target.value
															);
														}}
													/>
												</div>

												<FormMessage />
											</FormItem>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="company_address"
									render={({field}) => (
										<FormItem className="m-0 col-span-2">
											<FormLabel className="font-bold">Full Address</FormLabel>
											<FormControl>
												<Textarea {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
					)}
					<div className="mt-5 flex items-center justify-between">
						<Button
							type="button"
							disabled={page === 0}
							onClick={() => setPage((prev) => prev - 1)}>
							Prev
						</Button>
						{page === 1 ? (
							<Button
								type="submit"
								className="bg-purple-600 col-span-2 hover:bg-purple-400 dark:bg-transparent dark:hover:bg-purple-600 dark:text-white dark:border dark:border-input">
								Register
							</Button>
						) : (
							<Button
								type="button"
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									form.trigger().then((r) => r && setPage((prev) => prev + 1));
								}}>
								Next
							</Button>
						)}
					</div>
				</form>
			</Form>
		</div>
	);
}

interface ComboBoxProps {
	title: string;
	fieldValue: string;
	formValue: string;
	data: {name?: string; isoCode?: string}[];
	updateFormField: (val: string) => void;
	updateKey: (key: string) => void;
}

const ComboBox = ({
	title,
	data,
	fieldValue,
	formValue,
	updateFormField,
	updateKey,
}: ComboBoxProps) => {
	const [open, setOpen] = useState(false);

	return (
		<FormItem className="w-full flex flex-col space-y-4">
			<FormLabel className="font-bold">{title}</FormLabel>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild className="w-full">
					<FormControl>
						<Button
							variant="outline"
							role="combobox"
							className={cn(
								"w-full justify-between",
								!fieldValue && "text-muted-foreground"
							)}>
							{fieldValue ? formValue : `Select ${title.toLowerCase()}`}
							<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
						</Button>
					</FormControl>
				</PopoverTrigger>
				<PopoverContent className="w-full p-0">
					<Command>
						<CommandInput placeholder="Search country..." />
						<CommandEmpty>No country found.</CommandEmpty>
						<CommandGroup className="cursor-pointer">
							<CommandList>
								{data?.map((item, index) => (
									<CommandItem
										value={item?.name}
										key={index}
										className={cn("text-slate-950")}
										onSelect={() => {
											updateFormField(item?.name!);
											updateKey(item?.isoCode!);
											setOpen(false);
										}}>
										<Check
											className={cn(
												"mr-2 h-4 w-4",
												item.name === fieldValue ? "opacity-100" : "opacity-0"
											)}
										/>
										{item.name}
									</CommandItem>
								))}
							</CommandList>
						</CommandGroup>
					</Command>
				</PopoverContent>
			</Popover>

			<FormMessage />
		</FormItem>
	);
};
