import Nav from "@/components/home/nav";
import Footer from "@/components/home/sections/footer";
import Top from "@/components/ui/top";
import {ReactNode} from "react";

export default function Layout({children}: Readonly<{children: ReactNode}>) {
	return (
		<div>
			<Nav />
			{children}
			<Top />
			<Footer />
		</div>
	);
}
