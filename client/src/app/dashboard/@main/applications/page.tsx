"use client";

import Academic from "@/components/dashboard/candidate-data/academic";
import Experience from "@/components/dashboard/candidate-data/experience";
import Personal from "@/components/dashboard/candidate-data/personal";
import Projects from "@/components/dashboard/candidate-data/projects";
import {Button} from "@/components/ui/button";
import UserCard from "@/components/ui/cards/user-card";
import {Checkbox} from "@/components/ui/checkbox";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {addToChatList} from "@/controllers/chatController";
import {getAllApplications} from "@/controllers/jobController";
import {UserType} from "@/lib/types";
import {useRecruiterStore} from "@/store/useRecruiterStore";
import {useMutation, useQuery} from "@tanstack/react-query";
import {Briefcase, School, TrafficCone, User2} from "lucide-react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import Cookie from "js-cookie";
import {jwtDecode} from "jwt-decode";

export default function Page() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentUser, setCurrentUser] = useState<UserType>();
	const cmpId = useRecruiterStore((state) => state.companyId);
	const {push} = useRouter();

	const tabs: {[key: number]: JSX.Element} = {
		0: <Personal user={currentUser} />,
		1: <Academic user={currentUser} />,
		2: <Experience user={currentUser} />,
		3: <Projects user={currentUser} />,
	};

	const {data, isLoading, isError, refetch} = useQuery({
		queryKey: ["applications", cmpId],
		queryFn: () => getAllApplications(cmpId!),
		enabled: !!cmpId,
	});

	const {mutate, isSuccess} = useMutation({
		mutationFn: addToChatList,
	});

	const clickHandler = () => {
		const access = Cookie.get("access_token");
		const payload: {id: string} = jwtDecode(access!);
		mutate({uid: payload.id, rid: currentUser?.user_id});
	};

	useEffect(() => {
		console.log(isSuccess);
	}, [isSuccess]);

	if (isLoading) {
		return <div>loading ...</div>;
	}

	if (isError) {
		return (
			<div className="space-y-3">
				<h1 className="font-semibold text-2xl">
					something went wrong try again
				</h1>
				<Button onClick={() => refetch()}>Try agin</Button>
			</div>
		);
	}

	return (
		<div className="w-full h-full bg-slate-50 dark:bg-slate-900 dark:border dark:border-slate-800 rounded-2xl p-6 flex gap-5">
			<div className="w-1/2 h-[780px] overflow-auto hide-scroll-bar">
				<div className="w-full flex flex-col gap-5 py-3 px-4 sticky top-0 left-0 z-50 bg-slate-50 dark:bg-slate-900">
					<div>
						<h1 className="font-semibold text-2xl">All Applications</h1>
					</div>
					<div className="flex justify-between">
						<div className="flex items-center gap-2">
							<Checkbox />
							<p className="font-semibold">Select all</p>
						</div>
						<div>
							<Select>
								<SelectTrigger className="bg-inherit border-none outline-none focus:ring-transparent">
									<SelectValue placeholder="sort by" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="apple">Sort by date</SelectItem>
										<SelectItem value="orenge">Sort by type</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
				<div className="w-full flex flex-col gap-5">
					{data?.map((app, index) => (
						<UserCard
							app={app}
							onclickhandler={(data) => setCurrentUser(data)}
							key={index}
						/>
					))}
				</div>
			</div>
			<div className="w-1/2 h-[780px] overflow-auto hide-scroll-bar">
				<div className="w-full h-auto sticky top-0 bg-slate-50 dark:bg-slate-900">
					<div className="w-full p-4 flex flex-col gap-10 ">
						<div className="space-y-4">
							<h1 className="font-semibold text-xl">Candidate Details</h1>
							<div className="w-full flex gap-4 justify-between">
								<div className="flex items-start gap-5 w-fit">
									<Image
										src={"/icons/Default_pfp.svg.png"}
										width={70}
										height={70}
										alt="user-icon"
									/>
									<div>
										<h1 className="font-semibold">
											{currentUser?.fname} {currentUser?.lname}
										</h1>
										<h2 className="text-slate-600 text-[14px]">
											{currentUser?.profession}
										</h2>
									</div>
								</div>
								<div className="grid grid-cols-2 gap-5">
									<Button className="bg-purple-500 hover:bg-purple-400">
										View Resume
									</Button>
									<Button
										onClick={clickHandler}
										className="text-center bg-emerald-500 hover:bg-emerald-400 text-slate-50 rounded-md">
										Message
									</Button>
									<Button className="bg-blue-500 hover:bg-blue-400">
										Accept
									</Button>
									<Button
										// onClick={() => rejectApp(currentUser?.user_id!)}
										className="bg-destructive hover:bg-destructive/50">
										Reject
									</Button>
								</div>
							</div>
						</div>
						<div className="w-full">
							<ul className="w-full flex justify-between">
								<li
									className="flex items-center gap-3 cursor-pointer"
									onClick={() => setCurrentIndex(0)}>
									<User2
										className={`${currentIndex === 0 && "text-blue-600"}`}
									/>
									<p
										className={`${
											currentIndex === 0 && "text-blue-600 font-semibold"
										}`}>
										Overview
									</p>
								</li>
								<li
									className="flex items-center gap-3 cursor-pointer"
									onClick={() => setCurrentIndex(1)}>
									<School
										className={`${currentIndex === 1 && "text-blue-600"}`}
									/>
									<p
										className={`${
											currentIndex === 1 && "text-blue-600 font-semibold"
										}`}>
										Academic
									</p>
								</li>
								<li
									className="flex items-center gap-3 cursor-pointer"
									onClick={() => setCurrentIndex(2)}>
									<Briefcase
										className={`${currentIndex === 2 && "text-blue-600"}`}
									/>
									<p
										className={`${
											currentIndex === 2 && "text-blue-600 font-semibold"
										}`}>
										Experience
									</p>
								</li>
								<li
									className="flex items-center gap-3 cursor-pointer"
									onClick={() => setCurrentIndex(3)}>
									<TrafficCone
										className={`${currentIndex === 3 && "text-blue-600"}`}
									/>
									<p
										className={`${
											currentIndex === 3 && "text-blue-600 font-semibold"
										}`}>
										Projects
									</p>
								</li>
							</ul>
						</div>
					</div>
				</div>
				{currentUser ? (
					<div className="w-full p-5 overflow-auto bg-slate-100 dark:bg-slate-900 py-2 px-5 rounded-xl border border-slate-500 border-opacity-30">
						{tabs[currentIndex]}
					</div>
				) : (
					<div>no user selected</div>
				)}
			</div>
		</div>
	);
}
