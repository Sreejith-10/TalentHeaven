"use client";

import JobCard from "@/components/ui/cards/job-card";
import {Skeleton} from "@/components/ui/skeleton";
import SectionWrapper from "@/components/wrapper/section-wrapper";
import {getJobsByCompanyId} from "@/controllers/jobController";
import {fetchCompany} from "@/controllers/recruiterController";
import {useQuery} from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import {useParams} from "next/navigation";

export default function Page() {
	const {id}: {id: string} = useParams();

	const {data: company, isFetching} = useQuery({
		queryKey: ["companydata", id],
		queryFn: () => fetchCompany(id!),
	});

	const {
		data: openings,
		isLoading,
		isSuccess,
	} = useQuery({
		queryKey: ["openings"],
		queryFn: () => getJobsByCompanyId(company?.company_id!),
		enabled: Boolean(company?.company_id),
	});

	return (
		<div className="w-full">
			<SectionWrapper>
				<div className="w-full h-fit py-[100px]">
					<div className="relative">
						<div className="w-full h-52 bg-gradient-to-tr from-pink-500 to-purple-400 rounded-3xl"></div>
						<div className="bg-slate-100 w-fit p-6 rounded-full absolute bottom-0 left-14 translate-y-[50%]">
							<Image
								src={"/google.png"}
								alt="company_logo"
								width={60}
								height={60}
							/>
						</div>
					</div>
					<div className="mt-20 px-6 space-y-1">
						<h1 className="font-semibold text-2xl">{company?.company_name}</h1>
						<h3 className="text-slate-600">{company?.company_address}</h3>
						<h3 className="text-slate-600">{company?.phone_number}</h3>
						<Link href={"#"} className="text-blue-500 hover:underline">
							{company?.reference}
						</Link>
						<br />
						<br />
						<p>{company?.company_about}</p>
					</div>
					<br />
					<br />

					<div className="space-y-5 px-6">
						<div>
							<h2 className="font-semibold text-xl">Openings</h2>
						</div>
						<div className="grid grid-cols-3 gap-y-10">
							{isLoading &&
								Array(6)
									.fill("")
									.map((_, index) => (
										<div
											key={index}
											className="w-[400px] md:w-full h-fit rounded-[28px] shadow-xl py-4 px-8 space-y-5 border border-slate-300 dark:shadow-lg dark:shadow-slate-900 border-opacity-35 dark:border-slate-800">
											<div className="w-full flex gap-5 justify-items-start justify-between">
												<div className="flex items-center gap-5">
													<Skeleton className="w-8 h-8 bg-slate-500 dark:bg-slate-800 rounded-full" />
													<div className="space-y-2">
														<Skeleton className="w-24 h-5 bg-slate-500 dark:bg-slate-800" />
														<Skeleton className="w-24 h-5 bg-slate-500 dark:bg-slate-800" />
													</div>
												</div>
											</div>
											<div className="w-full flex gap-5">
												<Skeleton className="w-20 h-5 bg-slate-500 dark:bg-slate-800" />
												<Skeleton className="w-20 h-5 bg-slate-500 dark:bg-slate-800" />
												<Skeleton className="w-20 h-5 bg-slate-500 dark:bg-slate-800" />
											</div>
											<div className="w-full flex justify-between"></div>
										</div>
									))}
							{isSuccess &&
								openings?.map((job, index) => (
									<JobCard job={job} key={index} className="h-[200px]" />
								))}
						</div>
					</div>
				</div>
			</SectionWrapper>
		</div>
	);
}
