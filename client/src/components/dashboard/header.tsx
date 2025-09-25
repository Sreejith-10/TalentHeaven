"use client";

import {Bell, User} from "lucide-react";
import {Toggle} from "../ui/toggle";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import {useMutation} from "@tanstack/react-query";
import {logOut} from "@/controllers/recruiterController";
import {useToast} from "../ui/use-toast";
import Cookie from "js-cookie";
import {useRecruiterStore} from "@/store/useRecruiterStore";

const Header = () => {
	const {toast} = useToast();
	const setAuth = useRecruiterStore((state) => state.updateRecruiterAuth);

	const {mutate} = useMutation({
		mutationFn: logOut,
		onError: () => {
			toast({
				title: "Error",
				description: "something went wrong",
				type: "foreground",
			});
		},
		onSuccess: () => {
			location.reload();
			toast({
				title: "Success",
				description: "user logged out",
			});
			setAuth(false);
			localStorage.removeItem("session_id");
			Cookie.remove("access_token");
		},
	});

	const logout = () => {
		const id = JSON.parse(localStorage.getItem("session_id")!);
		mutate(id);
	};

	return (
		<div className="w-full h-full flex items-center justify-between">
			<div>
				<h1 className="font-semibold text-2xl">Dashboard</h1>
			</div>
			<div className="flex items-center gap-5">
				<Toggle size={30} />
				<div className="relative">
					<span className="absolute -top-3 -right-1 bg-red-400 rounded-full w-5 h-5 grid place-content-center text-slate-50 p-2">
						1
					</span>
					<Bell size={30} />
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger className="cursor-pointer">
						<User size={30} className="cursor-pointer mr-5" />
					</DropdownMenuTrigger>
					<DropdownMenuContent className="mt-2 mr-5 cursor-pointer">
						<DropdownMenuLabel>
							<Link href={"#"}>My account</Link>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuSeparator />
						<DropdownMenuLabel onClick={logout}>Logout</DropdownMenuLabel>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
};

export default Header;
