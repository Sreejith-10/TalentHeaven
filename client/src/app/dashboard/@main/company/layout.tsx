import { Metadata } from "next";
import {ReactNode} from "react";

export const metadata : Metadata = {
    title:"Company - Talent Heaven - Recruiter"
}

export default function CompanyLayout({
	children,
}: Readonly<{children: ReactNode}>) {
	return <div className="w-full h-full">{children}</div>;
}
