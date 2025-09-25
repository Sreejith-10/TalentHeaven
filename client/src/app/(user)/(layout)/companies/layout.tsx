import {Metadata} from "next";

export const metadata: Metadata = {
	title: "Company-Talent Heaven",
	description: "Where skills meet opportunity",
};

export default function CompanyLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div>{children}</div>;
}
