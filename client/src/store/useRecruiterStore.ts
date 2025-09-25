import {create} from "zustand";

type RecruiterStore = {
	isRecruiterAuthenticated: boolean;
	companyId: string | undefined;
	recuiterId: string | undefined;
	updateRecruiterAuth: (val: boolean) => void;
	updateCompanyId: (id: string) => void;
	updateRecruiterId: (id: string) => void;
};

export const useRecruiterStore = create<RecruiterStore>((set) => ({
	isRecruiterAuthenticated: false,
	companyId: undefined,
	recuiterId: undefined,
	updateRecruiterAuth: (val) => {
		set({isRecruiterAuthenticated: val});
	},
	updateCompanyId: (id) => {
		set({companyId: id});
	},
	updateRecruiterId: (id) => {
		set({recuiterId: id});
	},
}));
