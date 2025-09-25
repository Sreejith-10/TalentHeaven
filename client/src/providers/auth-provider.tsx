"use client";

import { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { refreshToken } from "@/controllers/userAuthController";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/store/auth-store";
import { jwtDecode } from "jwt-decode";
import { useUserStore } from "@/store/userStore";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [load, setLoad] = useState(false);

  const { push } = useRouter();
  const { toast } = useToast();
  const updateAuth = useAuthStore((state) => state.updateAuth);
  const updateUserId = useUserStore((state) => state.updateUserId);

  const { mutate, data, isPending } = useMutation({
    mutationFn: refreshToken,
    onSuccess: (res) => {
      updateAuth(true);
      updateUserId(res.data.id);
      toast({ title: "Welcome back", description: res.data.name });
      setLoad(false);
      return;
    },
    onError: (err) => {
      updateAuth(false);
      const error = err as AxiosError;
      if (error.message === "Network Error") {
        toast({
          title: "Bad network",
          description: "no network connection",
          variant: "info",
        });
        setLoad(false);
      }
      if (error?.response?.status === 404) {
        return push("/");
      }
      if (error.status === 401) {
        push("/login");
        setLoad(false);
        return;
      }
    },
  });

  useLayoutEffect(() => {
    const authenticate = () => {
      setLoad(true);
      try {
        const access_token = Cookies.get("access_token");
        const session_id = Cookies.get("session_id");

        // if (!access_token && !session_id) {
        // 	updateAuth(false);
        // }
        if (!access_token && session_id) {
          mutate(session_id);
          return;
        }
        if (access_token) {
          console.log("object");
          const decoded = jwtDecode<{ id: string }>(access_token!);
          updateAuth(true);
          updateUserId(decoded.id);
        } else {
          updateAuth(false);
        }
      } catch (error) {
        setLoad(false);
      } finally {
        setLoad(false);
      }
    };

    authenticate();
  }, []);

  if (load) {
    return <div>loading</div>;
  }

  if (isPending) {
    return <div>loading...</div>;
  }

  return <div>{children}</div>;
};
