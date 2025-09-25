import {Button} from "@/components/ui/button";
import SectionWrapper from "@/components/wrapper/section-wrapper";
import Link from "next/link";

export default function GetStarted() {
	return (
		<section className="w-full h-auto dark:bg-slate-950 py-[100px]">
			<SectionWrapper>
				<div className="w-full h-auto bg-gradient-to-br from-yellow-500 to-yellow-200 py-[100px] grid place-content-center rounded-3xl">
					<div className="w-full h-full flex flex-col gap-5 items-center">
						<h1 className="font-semibold text-[40px] sm:text-[30px] dark:text-slate-900 md:text-center">
							Kick Start you Career with Talent Heaven
						</h1>
						<Link
							href={"#"}
							className="dark:text-slate-700 hover:underline hover:font-semibold">
							Learn More
						</Link>
						<Button className="dark:text-slate-700">Get Started</Button>
					</div>
				</div>
			</SectionWrapper>
		</section>
	);
}
