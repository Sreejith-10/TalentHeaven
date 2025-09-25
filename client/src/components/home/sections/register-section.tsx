"use client";

import SectionWrapper from "@/components/wrapper/section-wrapper";
import {Bookmark, SearchIcon} from "lucide-react";
import Image from "next/image";
import {motion} from "framer-motion";

export default function RegisterSection() {
	return (
		<section className="w-full h-auto py-20 bg-purple-600/20 dark:bg-slate-900/30">
			<SectionWrapper>
				<div className="w-full flex flex-col gap-[70px] items-center justify-center">
					<div className="text-center">
						<h1 className="text-[50px] sm:text-[30px] font-semibold  text-slate-800 dark:text-slate-300">
							Easy to Use, Easy to Apply
						</h1>
						<p className="text-slate-500 dark:text-slate-700">How it works</p>
					</div>
					<div className="flex gap-10 md:grid md:gap-16 lg:gap-3 md:space-y-10">
						<motion.div
							initial={{opacity: 0}}
							whileInView={{opacity: 1}}
							transition={{ease: "easeInOut", delay: 0.5}}
							viewport={{once: true}}
							className="w-[300px] h-[350px] md:w-[350px] md:h-[380px] xs:w-[350px] bg-cyan-200 px-5 flex flex-col rounded-[32px] shadow-md">
							<div className="py-5 space-y-2">
								<h1 className="font-semibold text-xl dark:text-slate-600">
									Sign Up for TalentHeaven
								</h1>
								<p className="text-slate-500">Lets get started</p>
							</div>
							<div className="w-full h-full bg-white dark:bg-slate-900 rounded-tl-xl rounded-tr-xl p-3 space-y-2 flex flex-col">
								<div className="space-x-2 pb-2">
									<span className="w-3 h-3 bg-red-500 rounded-full inline-block" />
									<span className="w-3 h-3 bg-yellow-500 rounded-full inline-block" />
									<span className="w-3 h-3 bg-green-500 rounded-full inline-block" />
								</div>
								<p className="text-slate-500 text-[13px]">Email</p>
								<div className="w-full h-fit border border-slate-300 text-[13px] px-2 py-1 rounded-md">
									user@gmail.com
								</div>
								<p className="text-slate-500 text-[13px]">Password</p>
								<div className="w-full h-fit border border-slate-300 text-[13px] px-2 py-1 rounded-md flex items-center justify-start">
									&#x2022; &#x2022; &#x2022; &#x2022; &#x2022; &#x2022; &#x2022;
								</div>
								<br />
								<div className="w-full bg-purple-400 text-slate-50 rounded-md text-center py-1">
									Login
								</div>
							</div>
						</motion.div>

						<motion.div
							initial={{opacity: 0}}
							whileInView={{opacity: 1}}
							transition={{ease: "easeInOut", delay: 0.9}}
							viewport={{once: true}}
							className="w-[300px] h-[350px] md:w-[350px] md:h-[380px] xs:w-[350px] bg-pink-200 px-5 flex flex-col rounded-[32px] shadow-md">
							<div className="py-5 space-y-2">
								<h1 className="font-semibold text-xl dark:text-slate-700">
									Find a job to liking
								</h1>
								<p className="text-slate-500">Lets get started</p>
							</div>
							<div
								className="w-full h-full rounded-xl p-2 space-y-5
							flex flex-col">
								<div className="w-full flex bg-slate-50 dark:bg-slate-900 p-1 items-center justify-between rounded-md">
									<div className="flex gap-2">
										<SearchIcon size={20} className="text-slate-400" />
										<p className="text-[14px] text-slate-500">
											Search for jobs
										</p>
									</div>
									<span className="text-[12px] bg-purple-500 rounded-full text-center text-slate-50 p-1">
										Search
									</span>
								</div>
								<div className="w-full h-fit bg-slate-50 dark:bg-slate-900 flex p-1 justify-between rounded-md">
									<div className="flex">
										<Image
											src={"/icons/fb.png"}
											width={50}
											height={30}
											alt="company_icon"
											className="w-auto"
										/>
										<div className="p-1">
											<h2 className="text-[13px] font-semibold">
												Backend Developer
											</h2>
											<p className="text-[11px]">Facebook</p>
										</div>
									</div>
									<Bookmark size={20} className="" />
								</div>
								<div className="w-full h-fit bg-slate-50 dark:bg-slate-900 flex p-1 justify-between rounded-md">
									<div className="flex">
										<Image
											src={"/icons/fig.png"}
											width={50}
											height={30}
											alt="company_icon"
											className="p-2"
										/>
										<div className="p-1">
											<h2 className="text-[13px] font-semibold">
												Product Designer
											</h2>
											<p className="text-[11px]">Figma</p>
										</div>
									</div>
									<Bookmark size={20} className="" />
								</div>
							</div>
						</motion.div>

						<motion.div
							initial={{opacity: 0}}
							whileInView={{opacity: 1}}
							transition={{ease: "easeInOut", delay: 1.3}}
							viewport={{once: true}}
							className="w-[300px] h-[350px] md:w-[350px] md:h-[380px] xs:w-[350px] bg-rose-200 px-5 flex flex-col rounded-[32px] shadow-md">
							<div className="py-5 space-y-2">
								<h1 className="font-semibold text-xl dark:text-slate-700">
									Apply to job your choice
								</h1>
								<p className="text-slate-500">Lets get started</p>
							</div>
							<div className="w-full h-full bg-white dark:bg-slate-900 rounded-tl-xl rounded-tr-xl p-3 space-y-2 flex flex-col">
								<div className="space-x-2 pb-2">
									<span className="w-3 h-3 bg-red-500 rounded-full inline-block" />
									<span className="w-3 h-3 bg-yellow-500 rounded-full inline-block" />
									<span className="w-3 h-3 bg-green-500 rounded-full inline-block" />
								</div>
								<p className="text-slate-500 text-[13px]">Full name</p>
								<div className="w-full h-7 border border-slate-300 text-[13px] px-2 py-1 rounded-md"></div>
								<p className="text-slate-500 text-[13px]">Email address</p>
								<div className="w-full h-7 border border-slate-300 text-[13px] px-2 py-1 rounded-md flex items-center justify-start"></div>
								<br />
								<div className="w-full bg-purple-400 text-slate-50 rounded-md text-center py-1">
									Apply now
								</div>
							</div>
						</motion.div>
					</div>
					<br />
					<br />
				</div>
			</SectionWrapper>
		</section>
	);
}
