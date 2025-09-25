import { UserType } from "@/lib/types";
import {create} from "zustand";

type UserStore = {
	userId: string | undefined;
	updateUserId: (id: string) => void;
	userData:UserType | undefined
	updateUserData : (data:UserType) => void
};

export const useUserStore = create<UserStore>((set) => ({
	userId: "",
	updateUserId: (id) => {
		set({userId: id});
	},
	userData:{
			user_id:"",
			fname: "",
			lname: "",
			profession: "",
			about: "",
			phone: "",
			email: "",
			skills: [""],
			experience: [
				{company_name: "", position: "", end_date: "", start_date: ""},
			],
			education: [
				{
					institute: "",
					education_type: "",
					stream: "",
					start_date: "",
					end_date: "",
					marks: "",
				},
			],
			job_preferences: [""],
			projects: [
				{
					project_name: "",
					project_description: "",
					technologies_used: [""],
					reference: "",
				},
			],
		},
		updateUserData:(data)=>{
			set({userData:data})
		}
}));
