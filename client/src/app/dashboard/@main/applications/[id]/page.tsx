"use client";

import Academic from "@/components/dashboard/candidate-data/academic";
import Experience from "@/components/dashboard/candidate-data/experience";
import Personal from "@/components/dashboard/candidate-data/personal";
import Projects from "@/components/dashboard/candidate-data/projects";
import { Button } from "@/components/ui/button";
import UserCard from "@/components/ui/cards/user-card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusPill } from "@/components/ui/status-pill";
import { ReactTable } from "@/components/ui/table/react-table";
import {
  getApplicationsByJobId,
  getJobById,
  rejectApplication,
  updateApplicationStatus,
} from "@/controllers/jobController";
import { UserType, VarientType } from "@/lib/types";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Briefcase, MoreHorizontal, School, TrafficCone, User2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

interface IApplications {
  user_id: string,
  user_name: string,
  user_profile: string,
  applied_on: number,
  status: string
}

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentUser, setCurrentUser] = useState<UserType>();
  const { id }: { id: string } = useParams();

  const tabs: { [key: number]: JSX.Element } = {
    0: <Personal user={currentUser} />,
    1: <Academic user={currentUser} />,
    2: <Experience user={currentUser} />,
    3: <Projects user={currentUser} />,
  };

  const { data: job, error } = useQuery({
    queryKey: ["single-job", id],
    queryFn: () => getJobById({ queryKey: ["", id] }),
  });

  const { data, status } = useQuery({
    queryKey: ["application-jobid", id],
    queryFn: () => getApplicationsByJobId(id!),
  });

  const { mutate: reject } = useMutation({
    mutationFn: rejectApplication,
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: updateUserStatus } = useMutation({
    mutationFn: updateApplicationStatus,
    onSuccess: (res) => {
      console.log(res)
    }
  })

  const rejectApp = (uid: string) => {
    reject({ job_id: id, user_id: uid });
  };

  const columns: ColumnDef<IApplications>[] = [
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
        const { user_name, user_profile } = row.original
        return (
          <div className="flex items-center gap-5">
            <Image
              src={user_profile ?? "/icons/Default_pfp.svg.png"}
              alt="user profile"
              width={60}
              height={60}
            />
            <h1>{user_name}</h1>
          </div>
        )
      }
    },
    {
      accessorKey: "applied_on",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            Applied On
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-5">
            <h1>{row.getValue("applied_on")}</h1>
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
        const { status } = row.original

        return (
          <div className="text-center font-medium ">
            <StatusPill variant={"applied"}>
              {status}
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




  // const userApplications: { user_id: string, applied_on: number, status: VarientType } = applications?.applications.find((app) => app.user_id === currentUser?.user_id)

  return (
    <div className="w-full h-full bg-slate-50 dark:bg-slate-900 dark:border dark:border-slate-800 rounded-2xl p-6 flex gap-5 flex-col">
      <div>
        <h1 className="font-semibold text-2xl">Applications for {job?.role}</h1>
      </div>

      {
        status === "success" ?
          <ReactTable data={data} columns={columns} page={10} showSelected={false} searchQuery="user_name" searchBarTitle="User name" />
          : <div>loading</div>}
      {/* {applications?.applications?.length! > 0 ? ( */}
      {/*   <> */}
      {/*     <div className="w-1/2 h-[780px] overflow-auto hide-scroll-bar"> */}
      {/*       <div className="w-full flex flex-col gap-5 py-3 px-4 sticky top-0 left-0 z-50 bg-slate-50 dark:bg-slate-900"> */}
      {/*         <div> */}
      {/*           <h1 className="font-semibold text-2xl"> */}
      {/*             Applications for {data?.role} */}
      {/*           </h1> */}
      {/*         </div> */}
      {/*         <div className="flex justify-between"> */}
      {/*           <div> */}
      {/*             <Select> */}
      {/*               <SelectTrigger className="bg-inherit border-none outline-none focus:ring-transparent"> */}
      {/*                 <SelectValue placeholder="sort by" /> */}
      {/*               </SelectTrigger> */}
      {/*               <SelectContent> */}
      {/*                 <SelectGroup> */}
      {/*                   <SelectItem value="latest">latest</SelectItem> */}
      {/*                   <SelectItem value="viewed">viewed</SelectItem> */}
      {/*                   <SelectItem value="rejected">rejected</SelectItem> */}
      {/*                 </SelectGroup> */}
      {/*               </SelectContent> */}
      {/*             </Select> */}
      {/*           </div> */}
      {/*         </div> */}
      {/*       </div> */}
      {/*       <div className="w-full flex flex-col gap-5"> */}
      {/*         {applications?.applications.length == 0 && ( */}
      {/*           <h1>0 Applications</h1> */}
      {/*         )} */}
      {/*         {applications?.applications */}
      {/*           ?.sort((a, b) => { */}
      {/*             const order: { [key: string]: number } = { */}
      {/*               applied: 0, */}
      {/*               rejected: 1, */}
      {/*             }; */}
      {/*             return order[a.status] - order[b.status]; */}
      {/*           }) */}
      {/*           ?.map((app, index) => ( */}
      {/*             <UserCard */}
      {/*               job_id={data?._id!} */}
      {/*               app={app} */}
      {/*               onclickhandler={(data) => setCurrentUser(data)} */}
      {/*               key={index} */}
      {/*             /> */}
      {/*           ))} */}
      {/*       </div> */}
      {/*     </div> */}
      {/*     <div className="w-1/2 h-[780px] overflow-auto hide-scroll-bar"> */}
      {/*       {currentUser ? ( */}
      {/*         <> */}
      {/*           <div className="w-full h-auto sticky top-0 bg-slate-50 dark:bg-slate-900"> */}
      {/*             <div className="w-full p-4 flex flex-col gap-10 "> */}
      {/*               <div className="space-y-4"> */}
      {/*                 <h1 className="font-semibold text-xl"> */}
      {/*                   Candidate Details */}
      {/*                 </h1> */}
      {/*                 <div className="flex items-end gap-4 justify-between"> */}
      {/*                   <div className="flex gap-4"> */}
      {/*                     <Image */}
      {/*                       src={"/icons/Default_pfp.svg.png"} */}
      {/*                       width={70} */}
      {/*                       height={70} */}
      {/*                       alt="user-icon" */}
      {/*                     /> */}
      {/*                     <div> */}
      {/*                       <h1 className="font-semibold"> */}
      {/*                         {currentUser?.fname} {currentUser?.lname} */}
      {/*                       </h1> */}
      {/*                       <h2 className="text-slate-600 text-[14px]"> */}
      {/*                         {currentUser?.profession} */}
      {/*                       </h2> */}
      {/*                     </div> */}
      {/*                   </div> */}
      {/*                   <div className="space-y-3"> */}
      {/*                     <StatusPill className="w-full text-center" variant={userApplications?.status}>{userApplications?.status}</StatusPill> */}
      {/*                     <Button */}
      {/*                       onClick={() => { */}
      {/*                         updateUserStatus({ job_id: id, user_id: currentUser?.user_id, new_status: "accepted" }) */}
      {/*                       }} */}
      {/*                       disabled={applications?.applications?.some( */}
      {/*                         (app) => */}
      {/*                           app.user_id === currentUser?.user_id && */}
      {/*                           app.status === "rejected" */}
      {/*                       )} */}
      {/*                       className="mr-1 bg-blue-500 hover:bg-blue-400"> */}
      {/*                       Accept */}
      {/*                     </Button> */}
      {/*                     <Button */}
      {/*                       disabled={applications?.applications?.some( */}
      {/*                         (app) => */}
      {/*                           app?.user_id === currentUser?.user_id && */}
      {/*                           app?.status === "rejected" */}
      {/*                       )} */}
      {/*                       onClick={() => rejectApp(currentUser?.user_id!)} */}
      {/*                       className="bg-destructive hover:bg-destructive/50"> */}
      {/*                       {applications?.applications?.some( */}
      {/*                         (app) => */}
      {/*                           app.user_id === currentUser?.user_id && */}
      {/*                           app.status === "rejected" */}
      {/*                       ) */}
      {/*                         ? "Rejected" */}
      {/*                         : "Reject"} */}
      {/*                     </Button> */}
      {/*                   </div> */}
      {/*                 </div> */}
      {/*               </div> */}
      {/*               <div className="w-full"> */}
      {/*                 <ul className="w-full flex justify-between"> */}
      {/*                   <li */}
      {/*                     className="flex items-center gap-3 cursor-pointer" */}
      {/*                     onClick={() => setCurrentIndex(0)}> */}
      {/*                     <User2 */}
      {/*                       className={`${currentIndex === 0 && "text-blue-600" */}
      {/*                         }`} */}
      {/*                     /> */}
      {/*                     <p */}
      {/*                       className={`${currentIndex === 0 && */}
      {/*                         "text-blue-600 font-semibold" */}
      {/*                         }`}> */}
      {/*                       Overview */}
      {/*                     </p> */}
      {/*                   </li> */}
      {/*                   <li */}
      {/*                     className="flex items-center gap-3 cursor-pointer" */}
      {/*                     onClick={() => setCurrentIndex(1)}> */}
      {/*                     <School */}
      {/*                       className={`${currentIndex === 1 && "text-blue-600" */}
      {/*                         }`} */}
      {/*                     /> */}
      {/*                     <p */}
      {/*                       className={`${currentIndex === 1 && */}
      {/*                         "text-blue-600 font-semibold" */}
      {/*                         }`}> */}
      {/*                       Academic */}
      {/*                     </p> */}
      {/*                   </li> */}
      {/*                   <li */}
      {/*                     className="flex items-center gap-3 cursor-pointer" */}
      {/*                     onClick={() => setCurrentIndex(2)}> */}
      {/*                     <Briefcase */}
      {/*                       className={`${currentIndex === 2 && "text-blue-600" */}
      {/*                         }`} */}
      {/*                     /> */}
      {/*                     <p */}
      {/*                       className={`${currentIndex === 2 && */}
      {/*                         "text-blue-600 font-semibold" */}
      {/*                         }`}> */}
      {/*                       Experience */}
      {/*                     </p> */}
      {/*                   </li> */}
      {/*                   <li */}
      {/*                     className="flex items-center gap-3 cursor-pointer" */}
      {/*                     onClick={() => setCurrentIndex(3)}> */}
      {/*                     <TrafficCone */}
      {/*                       className={`${currentIndex === 3 && "text-blue-600" */}
      {/*                         }`} */}
      {/*                     /> */}
      {/*                     <p */}
      {/*                       className={`${currentIndex === 3 && */}
      {/*                         "text-blue-600 font-semibold" */}
      {/*                         }`}> */}
      {/*                       Projects */}
      {/*                     </p> */}
      {/*                   </li> */}
      {/*                 </ul> */}
      {/*               </div> */}
      {/*             </div> */}
      {/*           </div> */}
      {/*           <div className="w-full p-5 overflow-auto bg-slate-100 dark:bg-slate-900 py-2 px-5 rounded-xl border border-slate-500 border-opacity-30"> */}
      {/*             {tabs[currentIndex]} */}
      {/*           </div> */}
      {/*         </> */}
      {/*       ) : ( */}
      {/*         <div>no user selected</div> */}
      {/*       )} */}
      {/*     </div> */}
      {/*   </> */}
      {/* ) : ( */}
      {/*   <div className="flex gap-1"> */}
      {/*     <h1>Currently there are no applications found for</h1> */}
      {/*     <strong>{data?.role}</strong> */}
      {/*   </div> */}
      {/* )} */}
    </div>
  )
}
