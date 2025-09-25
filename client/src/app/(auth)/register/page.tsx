"use client";

import GoogleLogin from "@/components/google-login";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { registerUser } from "@/controllers/userAuthController";
import { AuthServiceInstance } from "@/lib/axios";
import { RegisterSchema } from "@/schemas/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Check, Eye, EyeOffIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function Register() {
  const [show, setShow] = useState(false);

  const { push } = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (res) => {
      toast({ title: "Succes", description: "Account created" });
      push("/login");
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      console.log(err?.response?.data);
      if (err.message === "Network Error") {
        toast({
          title: "Bad network",
          description: "no network connection",
          variant: "info",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: err.response?.data.message,
        });
      }
      return;
    },
  });

  const handleSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    mutate(values);
  };

  return (
    <div className="w-[400px] h-auto py-12 px-9 flex flex-col gap-10 shadow-xl rounded-2xl border border-slate-200 border-opacity-30 dark:border dark:border-input select-none">
      <div>
        <h1 className="font-bold text-[1.5rem]">New accout</h1>
        <p className="font-medium text-slate-600">Creating a new account</p>
      </div>
      <GoogleLogin text="signin with google" />

      <div className="w-full h-auto grid place-content-center">
        <p className="w-fit h-fit p-1 font-bold text-[10px] select-none text-slate-500 border border-slate-500 rounded-full relative before:content-[''] before:absolute before:w-[130px] before:left-[40px] before:h-[2px] before:bg-slate-300 before:top-0 before:bottom-0 before:my-auto after:content-[''] after:absolute after:w-[130px] after:right-[40px] after:h-[2px] after:bg-slate-300 after:top-0 after:bottom-0 after:my-auto">
          OR
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Password</FormLabel>
                <FormControl>
                  <div className="w-full h-auto relative">
                    <Input
                      autoComplete="new-password"
                      {...field}
                      type={show ? "text" : "password"}
                    />
                    <div className="absolute top-1/2 translate-y-[-50%] right-3">
                      {show ? (
                        <Eye
                          onClick={() => setShow(false)}
                          size={22}
                          className="cursor-pointer"
                        />
                      ) : (
                        <EyeOffIcon
                          onClick={() => setShow(true)}
                          size={22}
                          className="cursor-pointer"
                        />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full pb-3">
            <Link
              className="float-right hover:text-purple-600 ease-in-out duration-700"
              href={"/login"}>
              already have an account?
            </Link>
          </div>
          <Button
            type="submit"
            className={`${isSuccess
              ? "bg-emerald-500 hover:bg-emerald-400 dark:bg-transparent dark:hover:bg-emerald-600"
              : "bg-purple-600 hover:bg-purple-400 dark:bg-transparent dark:hover:bg-purple-600"
              }  dark:text-white dark:border dark:border-input`}
            disabled={isPending}>
            Login
            {isPending && <Loader2 className="ml-3 animate-spin" />}
            {isSuccess && (
              <Check className="ml-3 animate-pop-up rounded-full border border-slate-50" />
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
