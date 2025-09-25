import {Loader2, Pen, Trash, X} from "lucide-react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../dialog";
import {useEffect, useRef, useState} from "react";
import {Input} from "../input";
import {Label} from "../label";
import {Button} from "../button";
import {useMutation} from "@tanstack/react-query";
import {updateJobPreferences} from "@/controllers/userController";
import {useUserStore} from "@/store/userStore";
import {useToast} from "../use-toast";

const EditPreferences = ({value}: {value: string[] | undefined}) => {
	const uid = useUserStore((state) => state.userId);
	const setUser = useUserStore((state) => state.updateUserData);
	const {toast} = useToast();
	const [prefer, setPrefer] = useState<string[] | []>(value!);

	useEffect(() => {
		setPrefer(value!);
	}, [value]);

	const dialogRef = useRef<HTMLButtonElement>(null);

	const {mutate, isPending} = useMutation({
		mutationFn: updateJobPreferences,
		onSuccess: (res) => {
			setUser(res.user);
			toast({title: "success", description: res.message});
			dialogRef.current?.click();
		},
		onError: (err) => {
			toast({title: "error"});
		},
	});

	const submitHandler = () => {
		mutate({prefer: [...prefer], user_id: uid});
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

				<div className="space-y-3">
					<Label>prefer</Label>
					<Input
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								const val = e.currentTarget.value.trim();
								setPrefer((prev) => [...prev, val]);
								e.currentTarget.value = "";
							}
						}}
					/>
					<br />
					<div className="flex flex-wrap gap-5">
						{prefer.map((item, index) => (
							<div
								key={index}
								className="bg-slate-300 px-4 py-1 rounded-md cursor-pointer relative group hover:bg-red-500 transition-all ease-in-out">
								<button
									className="absolute left-0 right-0 grid place-content-center z-[-10] group-hover:z-[10] transition-all  ease-in-out"
									onClick={(e) => {
										e.preventDefault();
										setPrefer((prev) => prev.filter((_, idx) => idx !== index));
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
					<div className="flex gap-2 flex-col">
						<Button onClick={submitHandler}>
							Save changes
							{isPending && <Loader2 className="ml-3 animate-spin" />}
						</Button>
						<DialogClose
							ref={dialogRef}
							asChild
							onClick={() => setPrefer(value!)}>
							<Button variant="outline" type="button">
								Cancel changes
							</Button>
						</DialogClose>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default EditPreferences;
