import {
	Copyright,
	Facebook,
	Github,
	Instagram,
	Mail,
	MailboxIcon,
	Twitter,
	Zap,
} from "lucide-react";
import SectionWrapper from "../../wrapper/section-wrapper";
import {Button} from "../../ui/button";
import {Input} from "../../ui/input";

const Footer = () => {
	return (
		<div className="w-full bg-slate-100 dark:bg-slate-900">
			<SectionWrapper>
				<footer className="w-full flex flex-col gap-[60px] items-center justify-center py-10 ">
					<div className="w-full flex items-center justify-end gap-10 sm:flex-col sm:items-start sm:gap-4">
						<div>
							<MailboxIcon size={30} />
						</div>
						<div>
							<h2
								className="text-[16px] font-semibold text-slate-700 dark:text-slate-300
							">
								Subscribe for latest job posting
							</h2>
							<p className="text-[14px] text-slate-500 ">
								We&ll keep you updated with latest job alerts
							</p>
						</div>
						<Input className="w-auto" placeholder="enter your email" />
						<Button className="bg-red-600 hover:bg-red-500 dark:text-slate-50">
							Subscribe
						</Button>
					</div>
					<div className="w-full h-[2px] bg-slate-300 dark:bg-slate-800" />
					<div className="w-full flex justify-center md:flex-col md:gap-10">
						<div className="flex flex-col gap-5">
							<div className="flex items-center gap-5">
								<Zap />
								<h1 className="font-semibold text-lg">Talent Heaven</h1>
							</div>
							<p className="text-slate-600 dark:text-slate-400">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
								similique quisquam tenetur eligendi quod nulla iste, aliquid
								earum itaque sint?
							</p>
						</div>
						<div className="w-full flex gap-10 justify-evenly sm:flex-wrap sm:items-start sm:justify-start">
							<ul>
								<li className="font-bold cursor-pointer mb-2">Pages</li>
								<li className="font-semibold text-slate-700 dark:text-slate-400 cursor-pointer mb-1">
									Home
								</li>
								<li className="font-semibold text-slate-700 dark:text-slate-400 cursor-pointer mb-1">
									Search
								</li>
								<li className="font-semibold text-slate-700 dark:text-slate-400 cursor-pointer mb-1">
									Contact
								</li>
								<li className="font-semibold text-slate-700 dark:text-slate-400 cursor-pointer mb-1">
									Jobs
								</li>
								<li className="font-semibold text-slate-700 dark:text-slate-400 cursor-pointer mb-1">
									Companies
								</li>
								<li className="font-semibold text-slate-700 dark:text-slate-400 cursor-pointer mb-1">
									Login
								</li>
								<li className="font-semibold text-slate-700 dark:text-slate-400 cursor-pointer mb-1">
									Signup
								</li>
							</ul>
							<ul>
								<li className="font-bold cursor-pointer mb-2">Resources</li>
								<li className="font-semibold text-slate-700 dark:text-slate-400 cursor-pointer mb-1">
									Blog
								</li>
								<li className="font-semibold text-slate-700 dark:text-slate-400 cursor-pointer mb-1">
									Newsletter
								</li>
								<li className="font-semibold text-slate-700 dark:text-slate-400 cursor-pointer mb-1">
									Events
								</li>
								<li className="font-semibold text-slate-700 dark:text-slate-400 cursor-pointer mb-1">
									Help centre
								</li>
								<li className="font-semibold text-slate-700 dark:text-slate-400 cursor-pointer mb-1">
									Support
								</li>
							</ul>
							<ul>
								<li className="font-bold cursor-pointer mb-2">Social</li>
								<li className="font-semibold text-slate-700 dark:text-slate-400 cursor-pointer mb-1">
									Instagram
								</li>
								<li className="font-semibold text-slate-700 dark:text-slate-400 cursor-pointer mb-1">
									Twitter
								</li>
								<li className="font-semibold text-slate-700 dark:text-slate-400 cursor-pointer mb-1">
									Facebook
								</li>
								<li className="font-semibold text-slate-700 dark:text-slate-400 cursor-pointer mb-1">
									Linkdin
								</li>
								<li className="font-semibold text-slate-700 dark:text-slate-400 cursor-pointer mb-1">
									Github
								</li>
								<li className="font-semibold text-slate-700 dark:text-slate-400 cursor-pointer mb-1">
									Dribble
								</li>
							</ul>
							<ul>
								<li className="font-bold cursor-pointer mb-2">Legal</li>
								<li className="font-semibold text-slate-700 dark:text-slate-400 cursor-pointer mb-1">
									Terms
								</li>
								<li className="font-semibold text-slate-700 dark:text-slate-400 cursor-pointer mb-1">
									Privacy
								</li>
								<li className="font-semibold text-slate-700 dark:text-slate-400 cursor-pointer mb-1">
									Cookies
								</li>
								<li className="font-semibold text-slate-700 dark:text-slate-400 cursor-pointer mb-1">
									Licenses
								</li>
							</ul>
						</div>
					</div>
					<div className="w-full h-[2px] bg-slate-300 dark:bg-slate-800" />

					<div className="w-full flex justify-between items-center sm:flex-col sm:gap-5">
						<div className="flex items-center gap-2">
							<span className="flex items-center gap-3">
								<Copyright /> 2024{" "}
							</span>
							<span className="font-semibold">TalentHeaven</span>
							<p>, All rights reserved</p>
						</div>
						<div className="flex gap-5">
							<Facebook />
							<Instagram />
							<Twitter />
							<Github />
							<Mail />
						</div>
					</div>
				</footer>
			</SectionWrapper>
		</div>
	);
};

export default Footer;
