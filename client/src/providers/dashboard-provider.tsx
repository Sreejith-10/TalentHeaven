"use client";

import {Fragment, ReactNode, useEffect, useState} from "react";
import Cookie from "js-cookie";
import {useRecruiterStore} from "@/store/useRecruiterStore";
import {jwtDecode} from "jwt-decode";
import {useMutation} from "@tanstack/react-query";
import {refresh} from "@/controllers/recruiterController";
import {useRouter} from "next/navigation";
import {AxiosError} from "axios";

export const ProtectedRoute = ({children}: {children: ReactNode}) => {
	const {push} = useRouter();
	const [load, setLoad] = useState(true);
	const auth = useRecruiterStore((state) => state.isRecruiterAuthenticated);
	const setAuth = useRecruiterStore((state) => state.updateRecruiterAuth);
	const setCompanyId = useRecruiterStore((state) => state.updateCompanyId);
	const setId = useRecruiterStore((state) => state.updateRecruiterId);

	const {mutate} = useMutation({
		mutationFn: refresh,
		onSuccess: (data) => {
			const access_token = Cookie.get("hr_access_token");
			const decode = jwtDecode<{id: string; cmp_id: string}>(
				access_token as string
			);
			setCompanyId(decode.cmp_id);
			setId(decode.id);
			setAuth(true);
		},
		onError: (err) => {
			const error = err as AxiosError;
			if (error.response?.status === 401) return push("/recruiter-login");
		},
	});

	useEffect(() => {
		const authentication = () => {
			try {
				setLoad(true);
				const access_token = Cookie.get("hr_access_token");
				const session_id = Cookie.get("hr_session_id");

				if (!access_token && !session_id) {
					push("/recruiter-login");
				} else if (!access_token) {
					mutate(session_id as string);
				} else {
					const decode = jwtDecode<{id: string; cmp_id: string}>(access_token);
					setCompanyId(decode.cmp_id);
					setId(decode.id);
					setAuth(true);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoad(false);
			}
		};

		authentication();
	}, []);

	if (load) {
		return <div>loading...</div>;
	}

	return <Fragment>{children}</Fragment>;
};
