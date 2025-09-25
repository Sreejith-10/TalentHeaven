import { getChatLists } from "@/controllers/chatController";
import { fetchCompany, fetchRecruiter } from "@/controllers/recruiterController";
import { useChatStore } from "@/store/useChatStore";
import { useQuery } from "@tanstack/react-query";
import { EllipsisVertical, Search } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3006");

const ChatList = ({ id, uid }: { id: string; uid: string }) => {
  const { data } = useQuery({
    queryKey: ["chat-list", id],
    queryFn: () => getChatLists(id!),
  });

  const clickHandler = (uid: string) => {
    const url = new URL(window.location.href);
    const search = new URLSearchParams(url.search);

    socket.emit("leave_chat", { id: search.get("q") });

    search.set("q", uid + id);
    window.history.pushState(
      {},
      "",
      `${url.origin}${url.pathname}?${search.toString()}`
    );
  };

  return (
    <div className="w-full h-[800px] overflow-auto hide-scroll-bar">
      <div className="w-full flex items-center justify-between sticky top-0 p-5 rounded-t-2xl rounded-tr-none rounded-br-none">
        <h1 className="font-semibold text-2xl">Talent Heaven</h1>
      </div>
      <div className="flex flex-col gap-5 p-5">
        {data?.chat_list?.map((item, index) => (
          <User key={index} id={item} onclick={clickHandler} />
        ))}
      </div>
    </div>
  );
};

export default ChatList;

const User = ({ id, onclick }: { id: string; onclick: (id: string) => void }) => {
  const update = useChatStore((state) => state.updateSender);

  const { data } = useQuery({
    queryKey: ["chat-user", id],
    queryFn: () => fetchRecruiter(id),
  });

  const { data: company } = useQuery({
    queryKey: ["chat-company", data?.company_id],
    queryFn: () => fetchCompany(data?.company_id!),
    enabled: !!data,
  });

  useEffect(() => {
    update(company!, data!);
  }, [data, company]);

  return (
    <div
      onClick={() => onclick(data?.recruiter_id!)}
      className="w-auto h-20 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:border dark:border-slate-800 px-4 rounded-xl flex items-center justify-between cursor-pointer border border-zinc-300">
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
          <h1 className="font-semibold text-lg">{company?.company_name}</h1>
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
