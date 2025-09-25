import {Metadata} from "next";

export const metadata: Metadata = {
	title: "Search-Talent Heaven",
	description: "Where skills meet opportunity",
};

export default function SearchLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div>{children}</div>;
}
