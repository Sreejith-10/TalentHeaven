"use client";

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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { companyCategories } from "@/constants/company";
import { createJob } from "@/controllers/jobController";
import { jobScehma } from "@/schemas/job-scehma";
import { useRecruiterStore } from "@/store/useRecruiterStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Trash, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

export default function CreateJob() {
  const [skills, setSkills] = useState<string[] | []>([]);
  const [requirements, setRequirements] = useState<string[] | []>([]);

  const { toast } = useToast();
  const id = useRecruiterStore((state) => state.companyId);
  const { push } = useRouter();

  const form = useForm<z.infer<typeof jobScehma>>({
    resolver: zodResolver(jobScehma),
    defaultValues: {
      role: "",
      vaccany: "1",
      job_description: "",
      job_mode: "work form office",
      job_industry: "",
      job_category: "",
      job_requirements: [""],
      job_type: "full-time",
      experience: "fresher",
      salary: "",
      skill_rquired: [],
      duration: "",
      applications_start_date: "",
      applications_end_date: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: createJob,
    onSuccess: (res) => {
      console.log(res);
      toast({
        title: "success",
        description: "new job posted",
        variant: "success",
      });
      push("/dashboard/jobs");
    },
    onError: (err) => {
      console.log(err);
      toast({
        title: "error",
        description: "something went wrong",
        variant: "error",
      });
    },
  });

  const submitHandler = (values: z.infer<typeof jobScehma>) => {
    mutate({ values, id });
    form.reset();
    setSkills([]);
    setRequirements([]);
  };

  return (
    <div className="w-full h-full bg-slate-50 dark:bg-slate-900 dark:border dark:border-slate-800 rounded-2xl p-6 flex gap-5 overflow-auto hide-scroll-bar">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="w-full grid grid-cols-2 gap-10 overflow-auto px-4"
        >
          {/* role */}

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Role</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* job-description */}
          <FormField
            control={form.control}
            name="job_description"
            render={({ field }) => (
              <FormItem className="row-span-3">
                <FormLabel className="font-bold">Job Decription</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* job-industry */}
          <FormField
            control={form.control}
            name="job_industry"
            render={({ field }) => (
              <FormItem className="m-0">
                <FormLabel className="font-bold">Job Industry</FormLabel>
                <Select onValueChange={field.onChange} defaultValue="">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="select a indsutry" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(companyCategories).map((item, index) => (
                      <SelectItem value={item} key={index}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* job-catgeory */}
          <FormField
            control={form.control}
            name="job_category"
            render={({ field }) => (
              <FormItem className="m-0">
                <FormLabel className="font-bold">Job Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue="">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {form.getValues("job_industry") ? (
                      companyCategories[form.getValues("job_industry")!]?.map(
                        (item, index) => (
                          <SelectItem value={item} key={index}>
                            {item}
                          </SelectItem>
                        ),
                      )
                    ) : (
                      <h1 className="font-semibold text-sm">
                        select a category
                      </h1>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* job-mode */}
          <FormField
            control={form.control}
            name="job_mode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Job Mode</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue="work from office"
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="select a value" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"on site"}>On site</SelectItem>
                    <SelectItem value={"hybrid"}>Hybrid</SelectItem>
                    <SelectItem value={"work from home"}>
                      Work from home
                    </SelectItem>
                    <SelectItem value={"remote"}>Remote</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* job-type */}
          <FormField
            control={form.control}
            name="job_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Job Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue="full time">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="select a value" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"full time"}>Full-time</SelectItem>
                    <SelectItem value={"part time"}>Part-time</SelectItem>
                    <SelectItem value={"internship"}>Internship</SelectItem>
                    <SelectItem value={"contract"}>Contract</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* salary*/}
          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Salary</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue="work from office"
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="select a value" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"unpaird"}>unpaid</SelectItem>
                    <SelectItem value={"0 - 2 LPA"}>0 - 2 LPA</SelectItem>
                    <SelectItem value={"2 - 5 LPA"}>2 - 5 LPA</SelectItem>
                    <SelectItem value={"5 - 10 LPA"}>5 - 10 LPA</SelectItem>
                    <SelectItem value={"10 - 20 LPA"}>10 - 20 LPA</SelectItem>
                    <SelectItem value={"20+ LPA"}>20+ LPA</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Experience */}
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Experience Required</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue="work from office"
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="select a value" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"any"}>Any Experience</SelectItem>
                    <SelectItem value={"fresher"}>Fresher</SelectItem>
                    <SelectItem value={"0 - 1 Year"}>0 - 1 Year</SelectItem>
                    <SelectItem value={"1 - 3 Years"}>1 - 3 Years</SelectItem>
                    <SelectItem value={"3 - 5 Years"}>3 - 5 Years</SelectItem>
                    <SelectItem value={"5 - 10 Years"}>5 - 10 Years</SelectItem>
                    <SelectItem value={"10+ Years"}>10+ Years</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* vaccany */}
          <FormField
            control={form.control}
            name="vaccany"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Number of vaccancy</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Application_start_date */}
          <FormField
            control={form.control}
            name="applications_start_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">
                  Application start date
                </FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Application_end_date */}
          <FormField
            control={form.control}
            name="applications_end_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">
                  Application end date
                </FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Duration(in months)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Job requirements */}
          <div className="space-y-2">
            <Label className="font-semibold">Job Requirements</Label>
            <Input
              type="text"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const req = e.currentTarget.value.trim();
                  setRequirements((prev) => [...prev, req]);
                  form.setValue("job_requirements", [...requirements, req]);
                  e.currentTarget.value = "";
                }
              }}
            />
            <br />

            <div className="w-full h-auto flex flex-wrap gap-5">
              {requirements?.map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-300 px-4 py-1 rounded-md cursor-pointer relative group hover:bg-red-500 transition-all ease-in-out"
                >
                  <button
                    className="absolute left-0 right-0 grid place-content-center z-[-10] group-hover:z-[10] transition-all  ease-in-out"
                    onClick={(e) => {
                      e.preventDefault();
                      setRequirements((prev) =>
                        prev.filter((_, idx) => idx !== index),
                      );
                    }}
                  >
                    <Trash size={20} className="text-slate-50" />
                  </button>
                  <p className="font-semibold text-sm text-slate-800  group-hover:opacity-0 transition-all ease-in-out">
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <br />
          </div>

          {/* skills */}
          <div className="space-y-2">
            <Label className="font-semibold">Skills</Label>
            <Input
              type="text"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const skill = e.currentTarget.value;
                  setSkills((prev) => [...prev, skill]);
                  form.setValue("skill_rquired", [...skills, skill]);
                  e.currentTarget.value = "";
                }
              }}
            />
            <br />

            <div className="w-full h-auto flex flex-wrap gap-5">
              {skills?.map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-300 px-4 py-1 rounded-md cursor-pointer relative group hover:bg-red-500 transition-all ease-in-out"
                >
                  <button
                    className="absolute left-0 right-0 grid place-content-center z-[-10] group-hover:z-[10] transition-all  ease-in-out"
                    onClick={(e) => {
                      e.preventDefault();
                      setSkills((prev) =>
                        prev.filter((_, idx) => idx !== index),
                      );
                    }}
                  >
                    <Trash size={20} className="text-slate-50" />
                  </button>
                  <p className="font-semibold text-sm text-slate-800  group-hover:opacity-0 transition-all ease-in-out">
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <br />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

/* 


<FormItem className="m-0">
											<FormLabel className="font-bold">Category</FormLabel>
											<Select onValueChange={field.onChange} defaultValue="">
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="select a category" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{Object.keys(companyCategories).map((item, index) => (
														<SelectItem value={item} key={index}>
															{item}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>


*/
