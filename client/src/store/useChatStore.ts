import {ChatType, CompanyType, RecruiterType} from "@/lib/types";
import {create} from "zustand";

type ChatStore = {
	sender: {
		comapny: CompanyType | undefined;
		recruiter: RecruiterType | undefined;
	};
	cachedChats: ChatType[] | [];
	updateSender: (company: CompanyType, recruiter: RecruiterType) => void;
	updateCachedChats: (chat: ChatType) => void;
	clearChat: ([]) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
	sender: {
		comapny: undefined,
		recruiter: undefined,
	},
	cachedChats: [],
	updateSender: (company, recruiter) => {
		set({sender: {comapny: company, recruiter: recruiter}});
	},
	updateCachedChats: (chat) =>
		set((state) => ({
			cachedChats: [...state.cachedChats, chat],
		})),
    clearChat:([])=>set({cachedChats:[]})
}));
