"use client";

import {fetchCompany} from "@/controllers/recruiterController";
import {useQuery} from "@tanstack/react-query";
import {AlertTriangle, Link2} from "lucide-react";
import {useRecruiterStore} from "@/store/useRecruiterStore";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function Company() {
	const company_id = useRecruiterStore((state) => state.companyId);

	const {data, isLoading, isSuccess, isError, refetch} = useQuery({
		queryKey: ["company", company_id],
		queryFn: () => fetchCompany(company_id!),
	});

	return (
		<div className="w-full h-full bg-slate-50 dark:bg-slate-900 dark:border dark:border-slate-800 rounded-2xl p-6 flex flex-col gap-5">
			{isLoading && <div>loading...</div>}
			{isError && (
				<div className="flex items-center justify-center flex-col gap-5">
					<AlertTriangle className="size-20 text-purple-500" />
					<h1 className="font-semibold text-slate-700">something went wrong</h1>
					<span
						onClick={() => refetch()}
						className="bg-purple-500 px-8 py-2 text-slate-50 rounded-md shadow-xl cursor-pointer hover:bg-purple-400 active:shadow-none select-none">
						retry
					</span>
				</div>
			)}
			{isSuccess && (
				<>
					<div className="w-full h-fit relative">
						<div className="w-full h-56 bg-purple-600 rounded-tl-md rounded-tr-md"></div>
						<div className="w-44 h-44 rounded-full bg-slate-600 absolute bottom-[-35%] left-10"></div>
					</div>
					<div className="mt-[80px] flex flex-col gap-8">
						<div className="flex gap-2 flex-col">
							<h1 className="text-xl font-semibold">{data?.company_name}</h1>
							<span className="flex items-center gap-3 text-blue-500 hover:underline">
								<Link2 />
								<Link href={"#"}>{data?.reference}</Link>
							</span>
							<div className="w-full">
								<p>{data?.company_address}</p>
								<p>{data?.company_country}</p>
								<p>{data?.company_state}</p>
								<p>{data?.company_city}</p>

								<p>Phone : {data.phone_number}</p>
							</div>
						</div>
						<p className="max-w-[1000px]">{data?.company_about}</p>
					</div>
				</>
			)}
		</div>
	);
}
