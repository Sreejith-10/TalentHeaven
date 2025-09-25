"use client";

import {getChatLists} from "@/controllers/chatController";
import {fetchUser} from "@/controllers/userController";
import {useChatStore} from "@/store/useChatStore";
import {useQuery} from "@tanstack/react-query";
import {EllipsisVertical, Search} from "lucide-react";
import Image from "next/image";

const UserList = ({id, uid}: {id: string; uid: string | undefined}) => {
	const clearCache = useChatStore((state) => state.clearChat);

	const {data} = useQuery({
		queryKey: ["chat-list", id],
		queryFn: () => getChatLists(id),
	});

	const createChat = (id: string) => {
		const url = new URL(window.location.href);
		const search = new URLSearchParams(url.search);
		search.set("q", uid + id);
		window.history.pushState(
			{},
			"",
			`${url.origin}${url.pathname}?${search.toString()}`
		);
		clearCache([]);
	};

	return (
		<div className="w-full h-[800px] overflow-auto hide-scroll-bar">
			<div className="w-full flex items-center justify-between sticky top-0 bg-slate-50 dark:bg-slate-900 p-5 rounded-t-2xl rounded-tr-none">
				<div className="h-auto bg-slate-100 border border-slate-800 border-opacity-10 rounded-full flex items-center justify-evenly px-4">
					<input className="p-2 outline-none bg-transparent font-semibold placeholder:font-medium" />
					<Search className="size-7" />
				</div>
				<EllipsisVertical className="size-7" />
			</div>
			<div className="flex flex-col gap-5 p-5">
				{data?.chat_list?.map((item, index) => (
					<User key={index} user_id={item} clickHandler={createChat} />
				))}
			</div>
		</div>
	);
};

export default UserList;

const User = ({
	user_id,
	clickHandler,
}: {
	user_id: string;
	clickHandler: (id: string) => void;
}) => {
	const {data} = useQuery({
		queryKey: ["chat-user", user_id],
		queryFn: () => fetchUser(user_id),
	});

	console.log(data);

	return (
		<div
			onClick={() => clickHandler(user_id)}
			className="w-auto h-20 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:border dark:border-slate-800 px-4 rounded-xl flex items-center justify-between cursor-pointer">
			<div className="w-auto h-full flex items-center gap-4">
				<div>
					<Image
						src={"/icons/Default_pfp.svg.png"}
						width={40}
						height={40}
						alt="avatar"
					/>
				</div>
				<div>
					<h1 className="font-semibold text-lg">
						{data?.fname} {data?.lname}
					</h1>
					<p className="font-medium text-slate-700">message</p>
				</div>
			</div>
			<div className="flex flex-col items-end">
				<p className="font-medium text-emerald-500">5:26 pm</p>
				<span className="w-5 h-5 bg-emerald-500 m-0 p-0 rounded-full grid place-content-center">
					4
				</span>
			</div>
		</div>
	);
};
