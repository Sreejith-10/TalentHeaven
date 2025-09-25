import {X} from "lucide-react";
import {ReactNode} from "react";

export default function Tile({
	children,
	onclick,
}: {
	children: ReactNode;
	onclick: () => void;
}) {
	return (
		<div
			onClick={() => onclick()}
			className="w-fit bg-slate-100 dark:bg-slate-800 px-2 py-2 rounded-full flex items-center justify-between gap-4 cursor-pointer shadow-md">
			<div className="px-2 font-semibold dark:text-slate-300">{children}</div>
			<div className="w-fit h-fit bg-slate-300 dark:bg-slate-500 rounded-full p-1">
				<X className="text-slate-700 dark:text-slate-300" />
			</div>
		</div>
	);
}
