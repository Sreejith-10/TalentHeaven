"use client";

import {fetchUser} from "@/controllers/userController";
import {useUserStore} from "@/store/userStore";
import {useQuery} from "@tanstack/react-query";
import {ReactNode, useEffect} from "react";

export default function UserProvider({
	children,
}: Readonly<{children: ReactNode}>) {
	const id = useUserStore((state) => state.userId);
	const setUser = useUserStore((state) => state.updateUserData);

	const {data, isSuccess} = useQuery({
		queryKey: ["user", id],
		queryFn: () => fetchUser(id),
		enabled: Boolean(id),
	});

	useEffect(() => {
		if (isSuccess && data) {
			setUser(data);
		}
	}, [isSuccess, data]);

	return <>{children}</>;
}
