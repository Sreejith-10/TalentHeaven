import Nav from "@/components/home/nav";

export default function ApplicationsLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="w-full h-auto relative">
			<Nav />
			<div className="pt-[100px]">{children}</div>
		</main>
	);
}
