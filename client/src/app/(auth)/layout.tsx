import {Metadata} from "next";

export const metadata: Metadata = {
	title: "Talent Heaven Authentication",
	description: "Where skills meet opportunity",
};

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="w-full h-dvh grid place-content-center">{children}</div>
	);
}
