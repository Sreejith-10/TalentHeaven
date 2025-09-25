import {User} from "lucide-react";
import React from "react";

const OpenPostions = () => {
	return (
		<div className="bg-emerald-700 h-[200px] rounded-3xl p-5 flex items-center justify-between text-slate-50">
			<div className="border border-slate-50 p-4 rounded-3xl">
				<User className="size-12" />
			</div>
			<div className="text-end">
				<h1 className="font-semibold">Open positions</h1>
				<span className="font-semibold text-3xl">86</span>
			</div>
		</div>
	);
};

export default OpenPostions;
