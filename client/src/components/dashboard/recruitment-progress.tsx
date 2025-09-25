"use client";

import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ReactTable } from "../ui/table/react-table";
import { Button } from "../ui/button";
import { useRecruiterStore } from "@/store/useRecruiterStore";
import { useQuery } from "@tanstack/react-query";
import { recruitmentProgress } from "@/controllers/jobController";

type RecruitmentDataType = {
  username: string;
  position: string;
  status: string;
};

const RecruitmentProgress = () => {
  const cmpId = useRecruiterStore((state) => state.companyId);

  const { data: progress } = useQuery<
    { position: string; user_id: string; status: string }[]
  >({
    queryKey: ["recruitment-progress", cmpId],
    queryFn: () => (recruitmentProgress(cmpId!)),
    enabled: Boolean(cmpId),
  });

  const data: RecruitmentDataType[] = [
    { username: "sreejith", position: "Full Stack Developer", status: "pending" },
    {
      username: "vipin",
      position: "Front End Developer",
      status: "hired",
    },
  ];

  const columns: ColumnDef<RecruitmentDataType>[] = [
    {
      accessorKey: "username",
      header: ({ column }) => {
        return <div>Position</div>;
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("username")}</div>
      ),
    },
    {
      accessorKey: "position",
      header: ({ column }) => (
        <div className="flex items-center justify-center gap-1">Position</div>
      ),
      cell: ({ row }) => (
        <div className="text-center font-medium ">
          {row.getValue("position")}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: () => <div className="text-right">Status</div>,
      cell: ({ row }) => (
        <div className="text-right font-medium">{row.getValue("status")}</div>
      ),
    },
    {
      header: () => (
        <div>
          <h1>Actions</h1>
        </div>
      ),
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2 cursor-pointer">
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="font-semibold cursor-pointer">
                  Update Status
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="font-semibold cursor-pointer">
                    <DropdownMenuItem>interview</DropdownMenuItem>
                    <DropdownMenuItem>task</DropdownMenuItem>
                    <DropdownMenuItem>hired </DropdownMenuItem>
                    <DropdownMenuItem>rejected</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuLabel>View Application</DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 dark:border dark:border-slate-800 h-full rounded-3xl">
      <div className="flex p-5 justify-between items-center">
        <h1 className="font-semibold text-xl">Recuitment progress</h1>
        <Link
          href={""}
          className="bg-purple-600 py-2 px-3 text-slate-50 rounded-md">
          see all
        </Link>
      </div>
      <div className="p-2">
        <ReactTable data={data} columns={columns} page={5} />
      </div>
    </div>
  );
};

export default RecruitmentProgress;
