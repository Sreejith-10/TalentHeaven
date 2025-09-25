import {Metadata} from "next";

export const metadata: Metadata = {
	title: "Job-Talent Heaven",
	description: "Where skills meet opportunity",
};

export default function JobLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div className="w-full h-full relative">{children}</div>;
}
