"use client";

import ApplicationCard from "@/components/ui/cards/application-card";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import SectionWrapper from "@/components/wrapper/section-wrapper";
import {getAppliedJobs} from "@/controllers/userController";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "next/navigation";

type AppliedJobType = {
	applied_on: number;
	company_id: string;
	job_id: string;
	status: string;
};

export default function Page() {
	const {id}: {id: string} = useParams();

	const {data, isLoading, isError} = useQuery<{applied: AppliedJobType[]}>({
		queryKey: ["user-applied-jobs", id],
		queryFn: () => getAppliedJobs(id),
	});

	return (
		<div className="w-full">
			<SectionWrapper>
				<div className="w-full h-fit py-[50px] space-y-10">
					<h1 className="font-semibold text-3xl">Applications</h1>

					<div className="w-full flex justify-between">
						<div className="flex gap-5 items-center">
							<div className="flex space-x-4 bg-slate-200 text-slate-600 px-3 py-1 rounded-md dark:bg-slate-900 dark:border dark:border-slate-800">
								<h2 className="font-semibold">Saved </h2>{" "}
								<span className="font-semibold">0</span>
							</div>
							<div className="flex space-x-4 bg-slate-200 text-slate-600 px-3 py-1 rounded-md dark:bg-slate-900 dark:border dark:border-slate-800">
								<h2 className="font-semibold">Applied </h2>{" "}
								<span className="font-semibold">{data?.applied.length}</span>
							</div>
							<div className="flex space-x-4 bg-slate-200 text-slate-600 px-3 py-1 rounded-md dark:bg-slate-900 dark:border dark:border-slate-800">
								<h2 className="font-semibold">Interviewed </h2>{" "}
								<span className="font-semibold">1</span>
							</div>
						</div>
						<Select>
							<SelectTrigger className="w-fit">
								<SelectValue placeholder="sort" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="status">Sort by status</SelectItem>
								<SelectItem value="date">Sort by date</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{isLoading && <div>loading...</div>}

					{data && (
						<div className="w-full grid grid-cols-3 gap-5">
							{data?.applied?.map((applicaion, index) => (
								<ApplicationCard key={index} application={applicaion} />
							))}
						</div>
					)}
				</div>
			</SectionWrapper>
		</div>
	);
}
