import SideBar from "@/components/dashboard/side-bar";
import {ProtectedRoute} from "@/providers/dashboard-provider";
import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
	title: "Talent Heaven -  Recruiter",
	description: "Where skills meet opportunity. Recruiter Dashboard",
};

export default function RecruiterLayout({
	main,
}: Readonly<{
	main: React.ReactNode;
}>) {
	return (
		<ProtectedRoute>
			<div className="w-ful h-dvh flex">
				<div className="w-[20%] h-full">
					<SideBar />
				</div>
				<div className="w-[80%] h-full">{main}</div>
			</div>
		</ProtectedRoute>
	);
}
