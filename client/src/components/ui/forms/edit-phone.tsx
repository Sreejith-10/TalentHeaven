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
import {useRef} from "react";
import {useUserStore} from "@/store/userStore";
import {useToast} from "../use-toast";
import {useMutation} from "@tanstack/react-query";
import {updatePhone} from "@/controllers/userController";

const schema = z.object({
	phone: z.string(),
});

const EditPhone = ({phone}: {phone: string | undefined}) => {
	const {toast} = useToast();
	const uid = useUserStore((state) => state.userId);
	const setUser = useUserStore((state) => state.updateUserData);

	const dialogRef = useRef<HTMLButtonElement>(null);

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver<typeof schema>(schema),
		defaultValues: {
			phone: phone,
		},
	});

	const {mutate, isPending} = useMutation({
		mutationFn: updatePhone,
		onSuccess: (res) => {
			setUser(res.user);
			toast({title: "success", description: res.message, variant: "success"});
			dialogRef.current?.click();
		},
		onError: (err) => {
			console.log(err);
		},
	});

	const submitHandler = (values: z.infer<typeof schema>) => {
		mutate({phone: values.phone, user_id: uid});
	};
	return (
		<Dialog>
			<DialogTrigger className="absolute top-[-10px] left-[110px]">
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
						<div className="flex gap-2 flex-col">
							<Button type="submit">
								Save changes
								{isPending && <Loader2 className="ml-3 animate-spin" />}
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

export default EditPhone;
