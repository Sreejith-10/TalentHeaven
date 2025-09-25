"use client";

import {Button} from "@/components/ui/button";
import JobCard from "@/components/ui/cards/job-card";
import {useToast} from "@/components/ui/use-toast";
import {
	applyForJob,
	getJobById,
	getJobsByCompanyId,
} from "@/controllers/jobController";
import {fetchCompany} from "@/controllers/recruiterController";
import {
	fetchSavedJobs,
	fetchUserJob,
	removeSaved,
	saveJob,
} from "@/controllers/userController";
import {useUserStore} from "@/store/userStore";
import {validateJobApplcation} from "@/utils/validateJobApplication";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {
	Banknote,
	Bookmark,
	BookmarkCheck,
	Calendar,
	Clock,
	Compass,
	Share,
} from "lucide-react";
import Image from "next/image";
import {useParams, useRouter} from "next/navigation";
import {useState} from "react";

export default function Job() {
	const [valid, setValid] = useState(false);
	const [skillRequired, setSkillRequried] = useState<string[]>();

	const {id}: {id: string} = useParams();
	const {push} = useRouter();
	const {toast} = useToast();

	const user = useUserStore((state) => state.userId);
	const userData = useUserStore((state) => state.userData);

	const queryClient = useQueryClient();

	const {mutate} = useMutation({
		mutationFn: applyForJob,
		onSuccess: (res) => {
			toast({title: res.message});
		},
		onError: (err) => {
			const error = err as AxiosError;
			console.log(error);
		},
	});

	const {data: job, isLoading} = useQuery({
		queryKey: ["job", id],
		queryFn: getJobById,
	});

	const {data: company, error} = useQuery({
		queryKey: ["company", job?.company_id],
		queryFn: () => fetchCompany(job?.company_id!),
		enabled: !!job?.company_id,
	});

	const {data: userStatus} = useQuery({
		queryKey: ["user-data", {id, uid: user}],
		queryFn: () => fetchUserJob({id, uid: user}),
		enabled: !!user,
	});

	const {data: saved} = useQuery({
		queryKey: ["saved", user],
		queryFn: () => fetchSavedJobs(user),
	});

	const {data: moreJobs} = useQuery({
		queryKey: ["other-jobs", company],
		queryFn: () => getJobsByCompanyId(company?.company_id!),
		enabled: Boolean(company?.company_id),
	});

	const {mutate: save} = useMutation({
		mutationFn: saveJob,
		onSuccess: (res) => {
			toast({title: res.message, variant: "success"});
			queryClient.invalidateQueries(saved);
		},
		onError: (err) => {
			console.log(err);
		},
	});

	console.log(userData);

	const {mutate: unsave} = useMutation({
		mutationFn: removeSaved,
		onSuccess: (res) => {
			queryClient.invalidateQueries(saved);
			toast({title: res.message, variant: "success"});
		},
		onError: (err) => {
			console.log(err);
		},
	});

	const apply = () => {
		if (user) {
			const valid = validateJobApplcation(userData!, job!);
			if (valid.experience.match) {
				setValid(false);
			} else {
				setValid(true);
			}
			if (!valid.skills.match) {
				setSkillRequried(valid.skills.notIncludes);
			} else {
				setSkillRequried([]);
			}

			if (valid.experience.match && valid.skills.match) {
				mutate({
					company_id: company?.company_id!,
					job_id: id,
					user_id: user,
					user_name: userData?.fname + " " + userData?.lname,
					user_profile: userData?.profile_image ?? null,
				});
			}
		} else {
			push("/login");
		}
	};

	if (isLoading) {
		return (
			<div className="w-full h-dvh flex flex-col">
				<div className="mx-[10%] xl:mx-[5%] flex flex-col py-10 px-20">
					loading . . .
				</div>
			</div>
		);
	}

	return (
		<div className="w-full h-auto flex flex-col">
			<div className="mx-[10%] xl:mx-[5%] flex flex-col py-10 px-20">
				<div className="w-full h-52 bg-gradient-to-br from-yellow-400 to-pink-600 rounded-xl relative">
					<div className="bg-slate-50 w-fit h-fit p-8 rounded-full absolute bottom-0 translate-y-[50%] left-10">
						<Image
							src={"/google.png"}
							alt="company_logo"
							width={50}
							height={50}
						/>
					</div>
				</div>
				<br />
				<br />
				<br />
				<div className="w-full px-10 flex gap-5">
					<div className="w-[70%]">
						<div>
							<h1 className="font-bold text-3xl">{job?.role}</h1>
							<h1 className="font-semibold text-xl">{company?.company_name}</h1>
							<p className="text-slate-500 mt-3">{company?.company_address}</p>
						</div>
						<br />
						<br />
						<div>
							<h2 className="font-semibold text-lg">About the job</h2>
							<p className="font-medium">{job?.job_description}</p>
						</div>
						<br />
						<div className="space-y-4">
							<h2 className="font-semibold text-lg">Requirements:</h2>
							<ul className="list-disc ml-5">
								{job?.job_requirements.map((req, index) => (
									<li
										key={index}
										className="text-slate-700 dark:text-slate-500 font-medium">
										{req}
									</li>
								))}
							</ul>
						</div>
						<br />
						<div className="space-y-4">
							<h2 className="font-semibold text-lg">Skills:</h2>
							{skillRequired?.length! > 0 && (
								<p className="text-sm text-destructive">
									some skills are missing in your profile
								</p>
							)}
							<ul className="flex flex-wrap gap-5">
								{job?.skill_rquired.map((req, index) => (
									<li
										key={index}
										className={`${
											skillRequired?.includes(req)
												? "bg-destructive text-slate-50"
												: "bg-slate-200 dark:bg-slate-500 text-slate-700 dark:text-slate-800"
										}  px-4 py-1 rounded-md w-fit`}>
										{req}
									</li>
								))}
							</ul>
						</div>
						<br />
						<div className="space-y-4">
							<h2 className="font-semibold text-lg">Experience</h2>
							{valid && (
								<p className="text-sm text-destructive">
									experience do not match
								</p>
							)}
							<p
								className={`${
									valid
										? "bg-destructive text-slate-50"
										: "bg-slate-200 dark:bg-slate-500 text-slate-700 dark:text-slate-800 "
								} px-4 py-1 rounded-md w-fit`}>
								{job?.experience}
							</p>
						</div>
						<br />
					</div>
					<div className="w-[30%]">
						<div className="w-full h-12 flex gap-5 mb-10">
							<div
								className="bg-blue-500 hover:bg-blue-400 text-slate-50 dark:bg-blue-500 dark:border-2 dark:border-slate-100 rounded-full w-1/2 font-semibold flex items-center justify-center gap-3 cursor-pointer"
								onClick={() => {
									navigator.share({
										title: document.title,
										text: "Job search from talent heaven",
										url: window.location.href,
									});
								}}>
								<Share />
								Share
							</div>
							{saved?.saved_jobs?.includes(id) ? (
								<div
									onClick={() => {
										unsave({job_id: id, user_id: user!});
									}}
									className="bg-emerald-600 text-slate-50 dark:bg-emerald-600 dark:border-2 dark:border-slate-100 rounded-full w-1/2 font-semibold flex items-center justify-center gap-3 cursor-pointer">
									<BookmarkCheck />
									Saved
								</div>
							) : (
								<div
									onClick={() => {
										save({job_id: id, user_id: user!});
									}}
									className="bg-slate-200 dark:bg-slate-900 dark:border-2 dark:border-slate-800 rounded-full w-1/2 font-semibold flex items-center justify-center gap-3 cursor-pointer">
									<Bookmark />
									Save
								</div>
							)}
						</div>
						<div className="w-full h-auto bg-slate-100 dark:bg-slate-900 dark:border-2 dark:border-slate-800 rounded-xl p-5">
							<div className="w-full flex">
								<div className="w-3/12 grid place-content-center">
									<Banknote className="size-8" />
								</div>
								<div className="w-3/4 flex flex-col items-start">
									<h2 className="font-semibold text-lg dark:text-slate-300">
										Salary
									</h2>
									<p className="">{job?.salary}</p>
								</div>
							</div>
							<br />
							<div className="w-full flex">
								<div className="w-3/12 grid place-content-center">
									<Compass className="size-8" />
								</div>
								<div>
									<h2 className="font-semibold text-lg dark:text-slate-300">
										Job mode
									</h2>
									<h3>{job?.job_mode}</h3>
								</div>
							</div>
							<br />
							<div className="w-full flex">
								<div className="w-3/12 grid place-content-center">
									<Clock className="size-8" />
								</div>
								<div>
									<h2 className="font-semibold text-lg dark:text-slate-300">
										Job type
									</h2>
									<h3>{job?.job_type}</h3>
								</div>
							</div>
							{job?.job_type === "internship" && (
								<>
									<br />
									<div className="w-full flex">
										<div className="w-3/12 grid place-content-center">
											<Calendar className="size-8" />
										</div>
										<div>
											<h2 className="font-semibold text-lg dark:text-slate-300">
												Duration
											</h2>
											<h3>{job?.duration} month</h3>
										</div>
									</div>
								</>
							)}
						</div>
					</div>
				</div>

				<div className="w-auto px-10 mt-5 space-y-3">
					<div className="w-fit font-semibold flex items-center justify-center gap-3 cursor-pointer">
						<Button
							onClick={apply}
							disabled={userStatus === "rejected"}
							className="w-56 h-full py-2  bg-purple-600 hover:bg-purple-500 dark:text-slate-200">
							{userStatus ? "Applied" : "Apply now"}
						</Button>
					</div>
					<p className="font-semibold text-slate-500 text-sm">
						*please read the job description and requirements and if it matches
						your profile then apply
					</p>
				</div>

				<div className="mt-10">
					<h1 className="font-semibold text-2xl">
						Other jobs from {company?.company_name}
					</h1>
					<div className="grid grid-cols-3 gap-5 py-5">
						{moreJobs
							?.filter((job) => job._id !== id)
							.slice(0, 9)
							.map((job, index) => (
								<JobCard job={job} key={index} className="w-full" />
							))}
					</div>
				</div>
			</div>
		</div>
	);
}
