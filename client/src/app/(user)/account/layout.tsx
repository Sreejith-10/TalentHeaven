import Nav from "@/components/home/nav";
import {Metadata} from "next";

export const metadata: Metadata = {
	title: "Profile-Talent Heaven",
	description: "Where skills meet opportunity",
};

export default function AccountLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="w-full h-auto relative">
			<Nav />
			<div className="pt-[100px]">{children}</div>
			<div className="w-full grid place-content-center">
				<p className="w-[800px] text-center font-semibold text-slate-600 dark:text-slate-500 text-sm py-10">
					Make sure to make your profile stand out and add all your career
					experience and projects to land on a prefect job. Upload a
					prefessional image and a creative resume to catch the eyes of the
					recruiters.
				</p>
			</div>
		</main>
	);
}
