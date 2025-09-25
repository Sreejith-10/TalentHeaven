import {Calendar} from "lucide-react";
import React from "react";

const Interviews = () => {
	return (
		<div className="bg-blue-800 h-[200px] rounded-3xl p-5 flex items-center justify-between text-slate-50">
			<div className="border border-slate-50 p-4 rounded-3xl">
				<Calendar className="size-12" />
			</div>
			<div className="text-end">
				<h1 className="font-semibold">Interviews</h1>
				<span className="font-semibold text-3xl">16</span>
			</div>
		</div>
	);
};

export default Interviews;
