"use client";

import Image from "next/image";

const Message = ({
	uid,
	message,
}: {
	uid: string | undefined;
	message: {
		sender_id: string;
		message: string;
		date: number;
	};
}) => {
	return (
		<div
			className={`w-full flex ${message.sender_id !== uid && "justify-end"}`}>
			<div
				className={`w-fit h-auto flex gap-4 items-start float-right ${
					message.sender_id !== uid && "flex-row-reverse"
				}`}>
				<div>
					<Image
						src={"/icons/Default_pfp.svg.png"}
						width={40}
						height={40}
						alt="avatar"
					/>
				</div>
				<div
					className={`flex flex-col
						${
							message.sender_id === uid
								? "bg-purple-700 text-slate-50 rounded-tl-none"
								: "bg-slate-100 text-slate-800 rounded-tr-none"
						} px-4 py-1 rounded-xl `}>
					<h2>{message.message}</h2>
					<p className="w-fit text-[12px] float-right">
						{new Date(message.date).toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
							hour12: true,
						})}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Message;
