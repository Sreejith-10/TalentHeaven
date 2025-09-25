"use client";

import { getJobById } from "@/controllers/jobController";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function Job() {
  const { id }: { id: string } = useParams();

  const { data: job, isLoading } = useQuery({
    queryKey: ["job-data", id],
    queryFn: getJobById,
  });

  return (
    <div className="w-full h-full bg-slate-50 dark:bg-slate-900 dark:border dark:border-slate-800 rounded-2xl p-6 flex gap-5">
      <div className="w-1/2 h-auto space-y-5">
        <h1 className="text-3xl font-bold">Job Details</h1>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">{job?.role}</h2>
          <h3 className="text-lg font-semibold">{job?.salary}</h3>
        </div>
        <p className="font-semibold">{job?.job_description}</p>
        <div className="flex gap-5">
          <span>
            <h3 className="text-sm font-semibold">Job Type:</h3>
            <h4 className="text-lg font-semibold">{job?.job_type}</h4>
          </span>

          <span>
            <h3 className="text-sm font-semibold">Job Mode</h3>
            <h4 className="text-lg font-semibold">{job?.job_mode}</h4>
          </span>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-xl">Job Requirements</h3>
          <ul>
            {job?.job_requirements?.map((item, index) => (
              <li key={index} className="font-semibold list-disc ml-5">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-xl">Skills Requried</h3>
          <ul>
            {job?.skill_rquired?.map((item, index) => (
              <li key={index} className="font-semibold list-disc ml-5">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-1/2 h-auto"></div>
    </div>
  );
}
