import {fetchUser} from "@/controllers/userController";
import {UserType} from "@/lib/types";
import {useMutation, useQuery} from "@tanstack/react-query";
import Image from "next/image";
import {EllipsisVertical} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {updateApplicationStatus} from "@/controllers/jobController";
import {useToast} from "../use-toast";
import {AxiosError} from "axios";

interface UserCardProps {
	job_id: string;
	app: {
		user_id: string;
		applied_on: number;
		status: string;
	};
	onclickhandler: (data: UserType) => void;
}

export default function UserCard({job_id, app, onclickhandler}: UserCardProps) {
	const {toast} = useToast();

	const {data: user} = useQuery({
		queryKey: ["user-data", app.user_id],
		queryFn: () => fetchUser(app.user_id),
	});

	const {mutate} = useMutation({
		mutationFn: updateApplicationStatus,
		onSuccess: (res) => {
			toast({title: "updated", description: res.message, variant: "success"});
		},
		onError: (err) => {
			const error = err as AxiosError<{message: string}>;
			toast({
				title: "error",
				description: error.response?.data?.message,
				variant: "destructive",
			});
		},
	});

	return (
		<div
			onClick={(e) => {
				e.stopPropagation();
				onclickhandler(user!);
			}}
			className="w-full relative flex gap-3 items-center bg-slate-100 dark:bg-slate-900 py-2 px-5 rounded-xl border border-slate-500 border-opacity-30 cursor-pointer">
			{/* <Checkbox /> */}
			<Image
				src={"/icons/Default_pfp.svg.png"}
				width={60}
				height={60}
				alt="user-icon"
			/>
			<div>
				<h1 className="font-semibold">
					{user?.fname} {user?.lname}
				</h1>
				<h2 className="text-slate-600 text-[14px]">{user?.profession}</h2>
				<p className="text-slate-600 text-[14px]">
					{new Date(app?.applied_on).toLocaleDateString()}
				</p>
			</div>
			<div className="absolute right-5 cursor-pointer">
				<DropdownMenu>
					<DropdownMenuTrigger className="cursor-pointer">
						<EllipsisVertical className="text-slate-600" />
					</DropdownMenuTrigger>
					<DropdownMenuContent className="mt-2 cursor-pointer">
						<DropdownMenuLabel
							onClick={() => {
								mutate({job_id, user_id: user?.user_id!, new_status: "viewed"});
							}}>
							Viewed
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuLabel>Accept</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuLabel
							onClick={() => {
								mutate({
									job_id,
									user_id: user?.user_id!,
									new_status: "rejected",
								});
							}}>
							Reject
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuLabel onClick={() => onclickhandler(user!)}>
							View Profile
						</DropdownMenuLabel>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
