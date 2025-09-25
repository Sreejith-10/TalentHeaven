"use client";

import CompanyCard from "@/components/ui/cards/company-card";
import SectionWrapper from "@/components/wrapper/section-wrapper";
import {getAllCompany} from "@/controllers/recruiterController";
import {useQuery} from "@tanstack/react-query";
import {AlertTriangle} from "lucide-react";

export default function Page() {
	const {data, isError, isLoading, refetch} = useQuery({
		queryKey: ["allcompanies"],
		queryFn: getAllCompany,
	});

	return (
		<div className="w-full">
			<SectionWrapper className="flex-col">
				{isLoading && <div className="py-10 w-full h-[800px]">loading...</div>}
				{isError && (
					<div className="w-full h-[800px] flex items-center justify-center flex-col gap-5">
						<AlertTriangle className="size-20 text-purple-500" />
						<h1 className="font-semibold text-slate-700">
							something went wrong
						</h1>
						<span
							onClick={() => refetch()}
							className="bg-purple-500 px-8 py-2 text-slate-50 rounded-md shadow-xl cursor-pointer hover:bg-purple-400 active:shadow-none select-none">
							retry
						</span>
					</div>
				)}
				{data && (
					<div className="w-full h-fit py-[100px]">
						<div className="w-full h-auto flex flex-wrap gap-8">
							{data?.company_list.map((item, index) => (
								<CompanyCard data={item} key={index} />
							))}
						</div>
					</div>
				)}
			</SectionWrapper>
		</div>
	);
}
