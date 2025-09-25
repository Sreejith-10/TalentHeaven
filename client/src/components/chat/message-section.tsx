"use client";

import { getChat } from "@/controllers/chatController";
import { ChatType } from "@/lib/types";
import { useChatStore } from "@/store/useChatStore";
import { timeDifference } from "@/utils/time-difference";
import { useInfiniteQuery } from "@tanstack/react-query";
import { EllipsisVertical, Loader2, TriangleAlertIcon } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Message from "./message";
import KeyBoard from "./keyboard";
import { Button } from "@/components/ui/button";

const MessageSection = ({ uid }: { uid: string | undefined }) => {
  const socket = io("http://localhost:3006", { timeout: 2000 });

  const cacheChat = useChatStore((state) => state.cachedChats);
  const setCacheChat = useChatStore((state) => state.updateCachedChats);
  const clearCache = useChatStore((state) => state.clearChat);

  const param = useSearchParams();

  const q = param.get("q");

  const sender = useChatStore((state) => state.sender);
  const chatRef = useRef<HTMLDivElement>(null);

  //listening to message reception
  useEffect(() => {
    socket.on("recieve_chat_message", (d) => {
      const { content }: { content: ChatType } = d;
      setCacheChat(content);
    });

    return () => {
      socket.off("recieve_chat_message");
    };
  }, [socket]);

  useEffect(() => {
    socket.emit("join_chat", { id: q });

    return () => {
      socket.emit("leave_chat", {});
    };
  }, [q, socket]);

  const {
    data: chats,
    fetchNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
    isRefetching,
    refetch,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["chat", q],
    queryFn: getChat,
    initialPageParam: 1,
    getNextPageParam: (allPage, lastPage, firstPage) => {
      if (lastPage[lastPage.length - 1].length === 0) {
        return undefined;
      }
      return lastPage.length + 1;
    },
  });

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [cacheChat, q]);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <div className="w-full h-[820px] flex flex-col items-center justify-between ">
      <div className="w-full h-fit flex items-center justify-between px-6 py-3 border-b border-slate-300 dark:border-slate-700">
        <div className="flex items-center gap-4">
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
              {sender?.comapny?.company_name}
            </h1>
            <h1 className="font-semibold text-base">
              {sender?.recruiter?.recruiter_name}
            </h1>
          </div>
        </div>
        <div>
          <EllipsisVertical className="size-6" />
        </div>
      </div>
      <div className={`w-full h-full overflow-auto`} ref={chatRef}>
        {!isFetchingNextPage && (
          <div className="w-full py-2 flex items-center justify-center">
            <Button className="w-fitt h-fit" variant="outline" onClick={() => fetchNextPage()}>Load more</Button>
          </div>
        )}
        {isFetchingNextPage && (
          <div className="w-full h-auto flex items-center justify-center gap-3 bg-slate-500/30 py-3">
            <h1 className="font-semibold lowercase">Loading</h1>
            <Loader2 className="animate-spin" />
          </div>
        )}
        {isLoading && (
          <div className="w-full h-auto flex items-center justify-center gap-3 bg-slate-500/30 py-3">
            <h1 className="font-semibold lowercase">Loading</h1>
            <Loader2 className="animate-spin" />
          </div>
        )}
        {isFetchNextPageError && (
          <div className="w-full h-auto flex items-center justify-center gap-3 bg-destructive/30 py-3">
            <h1 className="font-semibold text-destructive lowercase">Error</h1>
            <TriangleAlertIcon className="text-destructive" />
          </div>
        )}
        <div className="w-full space-y-6 px-4 py-3">
          {chats?.pages
            .map((subPage: ChatType[]) =>
              subPage.map(
                (
                  item: { message: string; date: number; sender_id: string },
                  index: number
                ) => (
                  <div key={index}>
                    {/* <h1>{timeDifference(item.date)}</h1> */}
                    <Message uid={uid} message={item} />
                  </div>
                )
              )
            )
            .reverse()}
          {cacheChat.map((item, index) => (
            <Message uid={uid} message={item} key={index} />
          ))}
        </div>
      </div>
      <div className="w-full h-fit border-t border-slate-300 dark:border-slate-700">
        <KeyBoard uid={uid} />
      </div>
    </div >
  );
};

export default MessageSection;
