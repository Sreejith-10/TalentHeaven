"use client";

import MessageSection from "@/components/chat/message-section";
import UserList from "@/components/chat/user-list";
import {useRecruiterStore} from "@/store/useRecruiterStore";
import {useParams} from "next/navigation";
import {useEffect} from "react";
import {io} from "socket.io-client";

export default function Messages() {
	const socket = io("http://localhost:3006/");
	const uid = useRecruiterStore((state) => state.recuiterId);

	const {id}: {id: string} = useParams();

	useEffect(() => {
		socket.connect();

		return () => {
			socket.disconnect();
		};
	}, [socket]);

	return (
		<div className="w-full h-full bg-slate-50 dark:bg-slate-900 dark:border dark:border-slate-800 rounded-2xl flex cursor-pointer">
			<div className="w-[30%] h-full border-r border-slate-300 dark:border-slate-700">
				<UserList id={id} uid={uid} />
			</div>
			<div className="w-[70%] h-full">
				<MessageSection uid={uid} />
			</div>
		</div>
	);
}
