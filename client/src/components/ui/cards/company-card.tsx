import {CompanyType} from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CompanyCard = ({data}: {data?: CompanyType}) => {
	return (
		<div className="w-[350px] h-[250px] bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-3xl p-5 space-y-5">
			<div className="w-full flex items-start justify-between">
				<Image src={"/google.png"} alt="comapny_logo" height={50} width={50} />

				<Link
					href={`/companies/company/${data?.company_id}`}
					className="hover:underline lowercase">
					View
				</Link>
			</div>
			<div className="space-y-3">
				<h1 className="font-semibold text-xl">{data?.company_name}</h1>
				<p className="line-clamp-4 font-medium text-slate-500">
					{data?.company_about}
				</p>
			</div>
		</div>
	);
};

export default CompanyCard;
