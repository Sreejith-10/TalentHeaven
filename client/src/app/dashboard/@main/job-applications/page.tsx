"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusPill } from "@/components/ui/status-pill";
import { ReactTable } from "@/components/ui/table/react-table";
import { getAllApplications, recentApplications } from "@/controllers/jobController";
import { useRecruiterStore } from "@/store/useRecruiterStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { AlertTriangle, ArrowUpDown, Loader2, MoreHorizontal } from "lucide-react";
import Image from "next/image";

interface IRecentApplications {
  company_id: string;
  job_id: string;
  job_name: string;
  application: IApplication;
}

type VarientType = "default" | "applied" | "accepted" | "rejected"

interface IApplication {
  user_id: string;
  user_name: string;
  user_profile: string | null;
  applied_on: number;
  status: VarientType;
  _id: string;
}

export default function Page() {
  const id = useRecruiterStore((state) => state.companyId);

  const { data: applications, isLoading, isError, error, refetch } = useQuery<IRecentApplications[]>({
    queryKey: ["recent-user-applications", id],
    queryFn: () => getAllApplications(id!),
    enabled: Boolean(id),
  });

  const columns: ColumnDef<IRecentApplications>[] = [
    {
      accessorKey: "user_name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const application = row.original.application
        return (
          <div className="flex items-center gap-5">
            <Image
              src={application.user_profile ?? "/icons/Default_pfp.svg.png"}
              alt="user profile"
              width={60}
              height={60}
            />
            <h1>{application.user_name}</h1>
          </div>
        )
      }
    },
    {
      accessorKey: "job_name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            Role
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-5">
            <h1>{row.getValue("job_name")}</h1>
          </div>
        )
      }
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center justify-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const application = row.original.application

        return (
          <div className="text-center font-medium ">
            <StatusPill variant={application.status}>
              {application.status}
            </StatusPill>
          </div>
        )
      }
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
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Message</DropdownMenuItem>
              <DropdownMenuItem>View Profile</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];


  return (
    <div className="w-full h-full bg-slate-50 dark:bg-slate-900 dark:border dark:border-slate-800 rounded-2xl p-6 flex gap-5">

      {isLoading && (
        <div className="w-full h-full flex items-center justify-center flex-col gap-5">
          <Loader2 className="size-20 animate-spin" />
          <p className="font-semibold text-slate-700">Loading please wait</p>
        </div>
      )}

      {isError && (
        <div className="w-full h-full flex items-center justify-center flex-col gap-5">
          <AlertTriangle className="size-20" />
          <h1 className="font-semibold text-slate-700">something went wrong</h1>
          <span
            onClick={() => refetch()}
            className="bg-purple-500 px-8 py-2 text-slate-50 rounded-md shadow-xl cursor-pointer hover:bg-purple-400 active:shadow-none select-none"
          >
            retry
          </span>
        </div>
      )}

      {applications && <div className="w-full h-auto">
        <ReactTable
          columns={columns}
          data={applications!}
          page={7}
          showSelected={false}
          searchQuery="job_name"
        />
      </div>}
    </div>
  );
}
