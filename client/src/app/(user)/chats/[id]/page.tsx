"use client";

import ChatList from "@/components/chat/chat-list";
import MessageSection from "@/components/chat/message-section";
import UserList from "@/components/chat/user-list";
import { useUserStore } from "@/store/userStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { io } from "socket.io-client";

export default function Chats() {
  const socket = io("http://localhost:3006/");

  const { id }: { id: string } = useParams();

  const uid = useUserStore((state) => state.userId);

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="w-full h-full bg-slate-50 border border-slate-400 dark:bg-slate-900 dark:border dark:border-slate-800 rounded-2xl flex">
      <div className="w-[30%] h-auto rounded-2xl border-r border-slate-300 dark:border-slate-700 rounded-tr-none rounded-br-none">
        <ChatList id={id} uid={uid!} />
      </div>
      <div className="w-[70%] h-full">
        <MessageSection uid={uid} />
      </div>
    </div>
  );
}
