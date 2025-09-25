"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReactTable } from "@/components/ui/table/react-table";
import {
  getJobsByCompanyId,
  getAllApplications,
  deleteJobPost,
} from "@/controllers/jobController";
import { JobType } from "@/lib/types";
import { useRecruiterStore } from "@/store/useRecruiterStore";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import {
  AlertTriangle,
  ArrowUpDown,
  Loader2,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface IRecentApplications {
  company_id: string;
  job_id: string;
  job_name: string;
  application: IApplication;
}

interface IApplication {
  user_id: string;
  user_name: string;
  user_profile: string | null;
  applied_on: number;
  status: string;
  _id: string;
}

export default function Jobs() {
  const { push } = useRouter();
  const id = useRecruiterStore((state) => state.companyId);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["joblist", id],
    queryFn: () => getJobsByCompanyId(id!),
  });

  const { data: app } = useQuery<IRecentApplications[]>({
    queryKey: ["applications_length", id],
    queryFn: () => getAllApplications(id!),
  });

  const { mutate } = useMutation({
    mutationFn: deleteJobPost,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const columns: ColumnDef<JobType>[] = [
    {
      accessorKey: "role",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Job Role
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("role")}</div>
      ),
    },
    {
      accessorKey: "vaccancy",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center justify-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vaccancy
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center font-medium ">
          {row.getValue("vaccancy")}
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
      accessorKey: "applications",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center justify-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Applications
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {

        const count = app?.reduce((inital, reducer) => {
          return reducer.job_id === row.original._id ? inital + 1 : inital
        }, 0)

        return (
          <div className="text-center font-medium">
            {count}
          </div>
        );
      },
    },
    {
      accessorKey: "applications_start_date",
      header: ({ column }) => (
        <div
          className="flex gap-1 items-center justify-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Application Start date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="font-medium text-center">
          {row.getValue("applications_start_date")}
        </div>
      ),
    },
    {
      accessorKey: "applications_end_date",
      header: ({ column }) => (
        <div
          className="flex gap-1 items-center justify-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Application End date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="font-medium text-center">
          {row.getValue("applications_end_date")}
        </div>
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
        const job = row.original;

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

              <DropdownMenuItem
                onClick={() => push("/dashboard/jobs/" + job._id)}
              >
                View job
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  push("/dashboard/applications/" + job._id);
                }}
              >
                View applications
              </DropdownMenuItem>
              <DropdownMenuItem>Stop accecpting applications</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Options</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>stop accecpting</DropdownMenuItem>
                    <DropdownMenuItem>hired </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => push("/dashboard/jobs/edit/" + job._id)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => mutate(job._id)}>
                      Remove job post
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="w-full h-full bg-slate-50 dark:bg-slate-900 dark:border dark:border-slate-800 rounded-2xl p-6 flex flex-col gap-5">
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
      {data && (
        <>
          <div className="w-full h-fit flex justify-between">
            <h1 className="font-semibold text-2xl">Job Lists</h1>
            <Link
              href={"/dashboard/jobs/create"}
              className="w-fit bg-blue-500 text-slate-50 py-2 px-4 rounded-xl"
            >
              Post Job
            </Link>
          </div>
          <div>
            {data ? (
              <ReactTable data={data} columns={columns} page={10} searchQuery="role" showSelected={false} />
            ) : (
              <h1>Loading .. . </h1>
            )}
          </div>
        </>
      )}
    </div>
  );
}
