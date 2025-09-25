import {Metadata} from "next";

export const metadata: Metadata = {
	title: "Account Setup-Talent Heaven",
	description: "Where skills meet opportunity",
};

export default function AccountSetupLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div>{children}</div>;
}
