import {UserType} from "@/lib/types";

const Academic = ({user}: {user?: UserType | undefined}) => {
	return (
		<div>
			<div className="border-b border-slate-300 dark:border-slate-800 py-3">
				<h1 className="font-semibold">Academic</h1>
			</div>
			<ul className="space-y-4">
				{user?.education?.map((item, index) => (
					<li
						key={index}
						className="border-b border-slate-300 dark:border-slate-700 p-2 last:border-none space-y-1">
						<h1 className="font-bold text-blue-600 text-[16px]">
							{item.institute}
						</h1>
						<h2 className="font-semibold text-[14px]">{item.education_type}</h2>
						<h2 className="font-semibold text-[12px]">{item.stream}</h2>
						<p className="text-slate-600">
							{item.start_date} - {item.end_date}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Academic;
