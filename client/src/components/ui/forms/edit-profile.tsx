import {Pen} from "lucide-react";
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
import {useMutation} from "@tanstack/react-query";
import {updateAbout} from "@/controllers/userController";
import {useToast} from "../use-toast";
import {useUserStore} from "@/store/userStore";
import {useRef} from "react";

const schema = z.object({
	fname: z.string().min(3),
	lname: z.string(),
	profession: z.string(),
});

const EditProfile = ({
	values,
}: {
	values: {
		fname: string | undefined;
		lname: string | undefined;
		profession: string | undefined;
	};
}) => {
	const {toast} = useToast();
	const uid = useUserStore((state) => state.userId);
	const setUser = useUserStore((state) => state.updateUserData);

	const dialogRef = useRef<HTMLButtonElement>(null);

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver<typeof schema>(schema),
		defaultValues: {
			fname: values?.fname,
			lname: values?.lname,
			profession: values?.profession,
		},
	});

	const {mutate} = useMutation({
		mutationFn: updateAbout,
		onSuccess: (res) => {
			setUser(res.data);
			toast({title: "success", description: res.message, variant: "success"});
			dialogRef.current?.click();
		},
		onError: (err) => {
			console.log(err);
		},
	});

	const submitHandler = (values: z.infer<typeof schema>) => {
		mutate({data: {...values}, user_id: uid});
	};

	return (
		<Dialog>
			<DialogTrigger>
				<Pen className="size-4 text-purple-500 cursor-pointer" />
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit</DialogTitle>
					<DialogDescription>
						Make chages to you profile, ensure to save the changes
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						className="space-y-4"
						onSubmit={form.handleSubmit(submitHandler)}>
						<FormField
							control={form.control}
							name="fname"
							render={({field}) => (
								<FormItem>
									<FormLabel className="font-bold">First Name</FormLabel>
									<FormControl>
										<Input {...field} />
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
									<FormLabel className="font-bold">Last Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="profession"
							render={({field}) => (
								<FormItem>
									<FormLabel className="font-bold">Profession</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<br />
						<div className="flex gap-2 flex-col">
							<Button type="submit">Save changes</Button>
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

export default EditProfile;
