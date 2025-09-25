import {UserType} from "@/lib/types";

const Experience = ({user}: {user?: UserType | undefined}) => {
	return (
		<div>
			<div className="border-b border-slate-300 dark:border-slate-800 py-3">
				<h1 className="font-semibold">Experience</h1>
			</div>
			<ul className="space-y-4">
				{user?.experience?.map((item, index) => (
					<li
						key={index}
						className="border-b border-slate-300 dark:border-slate-700 p-2 last:border-none space-y-1">
						<h1 className="font-bold text-blue-600 text-[16px]">
							{item.company_name}
						</h1>
						<h2 className="font-semibold text-[14px]">{item.position}</h2>
						<p className="text-slate-600">
							{item.start_date} - {item.end_date}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Experience;
