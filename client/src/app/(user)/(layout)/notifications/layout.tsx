import {Metadata} from "next";

export const metadata: Metadata = {
	title: "Notifications-Talent Heaven",
	description: "Where skills meet opportunity",
};

export default function NotificationLayoutLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div>{children}</div>;
}
