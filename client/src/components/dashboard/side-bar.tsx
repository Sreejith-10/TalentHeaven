"use client";

import { useRecruiterStore } from "@/store/useRecruiterStore";
import {
  Building,
  File,
  FileIcon,
  LayoutDashboard,
  Mail,
  Settings,
  TargetIcon,
} from "lucide-react";
import Link from "next/link";

const SideBar = () => {
  const id = useRecruiterStore((state) => state.recuiterId);

  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={30} />,
    },
    { name: "Jobs", href: "/dashboard/jobs", icon: <TargetIcon /> },
    {
      name: "Applications",
      href: "/dashboard/job-applications",
      icon: <File />,
    },
    { name: "Company", href: "/dashboard/company", icon: <Building /> },
    { name: "Messages", href: "/dashboard/messages/" + id, icon: <Mail /> },
    { name: "Settings", href: "", icon: <Settings /> },
  ];

  return (
    <div className="w-full h-full">
      <div className="py-5 flex flex-col items-center justify-center">
        <h1 className="py-6 font-semibold text-[30px]">TalentHeaven</h1>
        <br />
        <div className="space-y-10">
          {links.map((link, index) => (
            <div className="flex items-center gap-5" key={index}>
              {link.icon}
              <Link href={link.href} className="font-semibold">
                {link.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
