import Header from "@/components/dashboard/header";
import {ReactNode} from "react";

export default function MainLayout({
	children,
}: Readonly<{children: ReactNode}>) {
	return (
		<div className="w-full h-full bg-slate-200 dark:bg-slate-900 px-10 py-5 flex flex-col gap-5">
			<div className="h-[10%]">
				<Header />
			</div>
			<div className="h-auto overflow-auto hide-scroll-bar">{children}</div>
		</div>
	);
}
