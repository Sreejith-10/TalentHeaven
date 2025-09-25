"use client";

import Image from "next/image";
import SectionWrapper from "../../wrapper/section-wrapper";
import {categories} from "@/constants/categories";
import {motion} from "framer-motion";

const CategorySection = () => {
	return (
		<section className="h-screen xs:h-auto xs:pb-20 bg-purple-200 dark:bg-slate-900/30 flex justify-center">
			<SectionWrapper>
				<div className="mt-[100px] space-y-12">
					<div className="text-center">
						<h1 className="text-[50px] sm:text-[30px] font-semibold  text-slate-800 dark:text-slate-300">
							Popular Categories
						</h1>
						<p className="text-slate-500 dark:text-slate-700">
							Search your career oppertunity with selected catgories
						</p>
					</div>
					<div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 xs:place-content-center xs:justify-items-center gap-[60px]">
						{categories.map((item, index) => (
							<motion.div
								initial={{scale: 0, opacity: 0, rotate: 180}}
								whileInView={{scale: 1, opacity: 1, rotate: 0}}
								transition={{ease: "easeInOut", delay: index * 0.4}}
								viewport={{once: true}}
								key={index}
								style={{background: `#${item.color}`}}
								className={`w-[250px] relative p-5 flex flex-col justify-between gap-5 rounded-[34px] shadow-xl`}>
								<h1 className="font-extrabold min-h-[70px] text-[30px] dark:text-slate-700">
									{item.category}
								</h1>
								<div>
									<p className="text-slate-500">
										{Math.floor(Math.random() * 20) + 1} open position
									</p>
								</div>
								<br />
								<div className="absolute w-[70px] h-[70px] bottom-0 right-0 bg-slate-50 dark:bg-slate-200 rounded-br-[34px] rounded-tl-[34px] flex items-center justify-center">
									<Image
										src={item.icon}
										alt="card-icon"
										width={40}
										height={30}
										className="w-auto dark:brightness-0 dark:invert-0"
									/>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</SectionWrapper>
		</section>
	);
};

export default CategorySection;
