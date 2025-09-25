import {create} from "zustand";

type AuthStore = {
	isAuthenticated: boolean;
	updateAuth: (val: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
	isAuthenticated: false,
	updateAuth: (val) => {
		set({isAuthenticated: val});
	},
}));
