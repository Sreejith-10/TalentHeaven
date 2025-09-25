import {
	Archive,
	ArrowRight,
	EllipsisVertical,
	File,
	Flag,
	MinusCircle,
	Sheet,
	ThumbsDown,
	ThumbsUp,
	UserIcon,
	X,
} from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../card";
import {Button} from "../button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../dropdown-menu";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../dialog";
import {useQuery} from "@tanstack/react-query";
import {fetchCompany} from "@/controllers/recruiterController";
import {getJobById} from "@/controllers/jobController";
import {Skeleton} from "../skeleton";
import Link from "next/link";

interface ApplicationCardProps {
	application: {
		applied_on: number;
		company_id: string;
		job_id: string;
		status: string;
	};
}

const ApplicationCard = ({application}: ApplicationCardProps) => {
	const {data: job, isLoading: job_loading} = useQuery({
		queryKey: ["applied_job", application?.job_id],
		queryFn: getJobById,
	});

	const {data: company, isLoading: comapny_loading} = useQuery({
		queryKey: ["applied_company", application?.company_id],
		queryFn: () => fetchCompany(application.company_id!),
		enabled: Boolean(job),
	});

	const getAppliedTime = (t: number) => {
		const currentTime = new Date();
		const appliedTime = new Date(t);

		const difference = Math.floor(
			currentTime.getTime() - appliedTime.getTime()
		);

		if (difference > 86400) {
			return `applied on ${appliedTime.toLocaleDateString([], {
				dateStyle: "medium",
			})}`;
		} else {
			return "applied today";
		}
	};

	return (
		<Card>
			<CardHeader className="flex flex-row justify-between">
				{job_loading ? (
					<Skeleton className="w-full h-8" />
				) : (
					<CardTitle className="text-lg">{job?.role}</CardTitle>
				)}
				<DropdownMenu>
					<DropdownMenuTrigger className="cursor-pointer">
						<EllipsisVertical className="cursor-pointer" />
					</DropdownMenuTrigger>
					<DropdownMenuContent className="mt-2 cursor-pointer">
						<Link href={`/job/${application.job_id}`}>
							<DropdownMenuLabel className="flex items-center gap-5">
								<File /> View
							</DropdownMenuLabel>
						</Link>
						<DropdownMenuLabel className="flex items-center gap-5">
							<Archive /> Archieve
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuLabel className="flex items-center gap-5">
							<MinusCircle /> Withdraw application
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuLabel className="flex items-center gap-5">
							<Flag /> Report job
						</DropdownMenuLabel>
					</DropdownMenuContent>
				</DropdownMenu>
			</CardHeader>
			<CardContent>
				{comapny_loading ? (
					<>
						<Skeleton className="w-1/2 h-6" />
						<Skeleton className="w-1/2 h-6" />
					</>
				) : (
					<>
						<CardDescription>{company?.company_name}</CardDescription>
						<CardDescription>
							{company?.company_city},{company?.company_state}
						</CardDescription>
					</>
				)}
				<p className="text-sm text-muted-foreground mt-3">
					{getAppliedTime(application?.applied_on)}
				</p>
				<div className="mt-2">
					<span className="font-medium text-muted-foreground">
						status :{" "}
						<strong className="text-slate-950 dark:text-slate-50">
							{" "}
							{application.status}
						</strong>
					</span>
				</div>
			</CardContent>
			<CardFooter className="flex flex-col gap-5 items-start">
				<div className="w-full">
					<Dialog>
						<DialogTrigger className="w-full">
							<Button
								variant="outline"
								className="w-full border-purple-600 text-purple-500 hover:text-purple-500 hover:bg-purple-200">
								Update status
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Update status</DialogTitle>
								<DialogDescription>
									update your application status
								</DialogDescription>
							</DialogHeader>
							<div className="space-y-3">
								<Button className="w-full flex gap-5" variant="outline">
									<div className="w-1/2 flex justify-end">
										<div className="bg-emerald-600 rounded-full w-8 h-8 grid place-content-center">
											<Sheet className="text-white size-5" />
										</div>
									</div>
									<strong className="w-1/2 text-start">Interviewing</strong>
								</Button>
								<Button className="w-full flex gap-5" variant="outline">
									<div className="w-1/2 flex justify-end">
										<div className="bg-emerald-600 rounded-full w-8 h-8 grid place-content-center">
											<ThumbsUp className="text-white size-5" />
										</div>
									</div>
									<strong className="w-1/2 text-start"> Offer received</strong>
								</Button>
								<Button className="w-full flex gap-5" variant="outline">
									<div className="w-1/2 flex justify-end">
										<div className="bg-emerald-600 rounded-full w-8 h-8 grid place-content-center">
											<UserIcon className="text-white " />
										</div>
									</div>
									<strong className="w-1/2 text-start">Hired</strong>
								</Button>
								<Button className="w-full flex gap-5" variant="outline">
									<div className="w-1/2 flex justify-end">
										<div className="bg-destructive rounded-full w-8 h-8 grid place-content-center">
											<X className="text-white size-5" />
										</div>
									</div>
									<strong className="w-1/2 text-start"> Not Selected</strong>
								</Button>
								<Button className="w-full flex gap-5" variant="outline">
									<div className="w-1/2 flex justify-end">
										<div className="bg-destructive rounded-full w-8 h-8 grid place-content-center">
											<ThumbsDown className="text-white size-5" />
										</div>
									</div>
									<strong className="w-1/2 text-start">
										No longer interested
									</strong>
								</Button>
							</div>
							<DialogFooter className="text-center">
								<DialogDescription>
									This changes only can be seen by you
								</DialogDescription>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
				{/* <div className="flex items-center gap-2 cursor-pointer">
					<span className="text-purple-600 font-semibold">
						Message the employer
					</span>{" "}
					<ArrowRight className="text-purple-600" />
				</div> */}
			</CardFooter>
		</Card>
	);
};

export default ApplicationCard;
