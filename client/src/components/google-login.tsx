

import { AuthServiceInstance } from "@/lib/axios";
import Image from "next/image";

const icon = "/google.png";

const GoogleLogin = ({ text }: { text: string }) => {

  const googleAuth = async () => {
    // AuthServiceInstance.get("/h").then((res) => console.log(res)).catch((err) => console.log(err))
    window.location.href = "http://localhost:3001/auth/google"
  }

  return (
    <div onClick={googleAuth} className="w-full h-auto bg-slate-50 flex items-center justify-center gap-5 rounded-xl py-2 border border-slate-200 cursor-pointer dark:border dark:border-input dark:bg-transparent ">
      <Image src={icon} alt="google-icon" width={20} height={20} />
      <p className="text-slate-500">{text}</p>
    </div>
  );
};

export default GoogleLogin;
