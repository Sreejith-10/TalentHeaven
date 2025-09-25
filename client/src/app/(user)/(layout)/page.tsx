import CategorySection from "@/components/home/sections/category-section";
import GetStarted from "@/components/home/sections/get-started";
import Hero from "@/components/home/sections/hero";
import RecentJobList from "@/components/home/sections/recent-job-list";
import RegisterSection from "@/components/home/sections/register-section";
import Testimonials from "@/components/home/sections/testimonails";
import SlideWrapper from "@/components/wrapper/slide-wrapper";

export default function Home() {
	return (
		<div>
			<SlideWrapper>
				<Hero />
			</SlideWrapper>
			<SlideWrapper>
				<CategorySection />
			</SlideWrapper>
			<SlideWrapper>
				<RecentJobList />
			</SlideWrapper>
			<SlideWrapper>
				<RegisterSection />
			</SlideWrapper>
			{/* <Testimonials /> */}
			<SlideWrapper>
				<GetStarted />
			</SlideWrapper>
		</div>
	);
}
