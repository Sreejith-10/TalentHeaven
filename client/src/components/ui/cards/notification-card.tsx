"use client";

import Image from "next/image";
import {useState} from "react";

const NotificationCard = () => {
	const [expand, setExpand] = useState(false);

	return (
		<div
			className={`w-full h-auto bg-slate-100 dark:bg-slate-900 dark:border dark:border-slate-700 shadow-sm rounded-3xl flex gap-5 py-3 relative`}>
			<div className="w-3 h-3 bg-emerald-600 rounded-full absolute top-3 right-3" />
			<div
				className={`w-[15%] flex ${
					expand
						? "items-start justify-center pt-10"
						: "items-center justify-center"
				}`}>
				<Image src={"/google.png"} width={40} height={40} alt="icon" />
			</div>
			<div
				className={`w-[70%] h-auto flex flex-col gap-2 items-start justify-center`}>
				<h1 className="font-semibold text-lg">Title</h1>
				<h3 className={`${expand ? "line-clamp-none" : "line-clamp-1"}`}>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
					praesentium exercitationem ipsam nostrum dicta minus libero commodi
					quasi impedit temporibus! Lorem ipsum dolor sit amet consectetur
					adipisicing elit. Nostrum, nesciunt recusandae quia reiciendis quasi
					ipsa velit placeat
				</h3>
				<p className="font-medium text-slate-500">Date</p>
			</div>
			<div
				className={`w-[15%] flex ${
					expand
						? "items-start justify-center pt-10"
						: "items-center justify-center"
				}`}>
				<span
					onClick={() => setExpand(!expand)}
					className="hover:underline hover:text-purple-600 cursor-pointer">
					View
				</span>
			</div>
		</div>
	);
};

export default NotificationCard;
