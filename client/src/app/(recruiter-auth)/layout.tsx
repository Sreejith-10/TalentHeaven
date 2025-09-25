import {Metadata} from "next";

export const metadata: Metadata = {
	title: "Talent Heaven Recruiter Authentication",
	description: "Where skills meet opportunity",
};

export default function RecruiterAuth({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div className=" h-dvh grid place-content-center">{children}</div>;
}
