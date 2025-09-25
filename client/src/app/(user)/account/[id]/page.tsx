"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/wrapper/section-wrapper";
import { fetchUser } from "@/controllers/userController";
import { useQuery } from "@tanstack/react-query";
import { Pen, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import EditProfile from "@/components/ui/forms/edit-profile";
import ToolTipWrapper from "@/components/wrapper/tool-tip-wrapper";
import EditSkills from "@/components/ui/forms/edit-skills";
import EditPreferences from "@/components/ui/forms/edit-preferences";
import EditPhone from "@/components/ui/forms/edit-phone";
import EditAbout from "@/components/ui/forms/edit-about";
import EducationForm from "@/components/ui/forms/education-form";
import ExperienceForm from "@/components/ui/forms/experience-form";
import ProjectsForm from "@/components/ui/forms/projects-form";
import { useUserStore } from "@/store/userStore";
import Loader from "@/components/ui/loaders/loader";
import Link from "next/link";
import EditAvatar from "@/components/ui/forms/edit-avatar-image";
import Resume from "@/components/ui/resume";
import UploadResume from "@/components/ui/forms/upload-resume";

export default function Account() {
  const { id }: { id: string } = useParams();
  const { push } = useRouter();
  const user = useUserStore((state) => state.userData);
  const setUser = useUserStore((state) => state.updateUserData);

  const { data, error, status, isError, isPending, isSuccess } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
    enabled: !Boolean(user),
  });

  useEffect(() => {
    if (status === "success") {
      setUser(data);
    }
  }, [status, data]);

  if (isPending) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center py-20">
        <h1 className="font-semibold text-2xl mb-5">setup your account</h1>
        <p className="font-medium text-slate-700 mb-3">
          You have not completed your account setup process. Please complete
          that so you can apply for jobs
        </p>
        <Link href={"/account-setup"} className="font-semibold hover:underline">
          Go
        </Link>
      </div>
    );
  }

  if (isSuccess)
    return (
      <div className="w-full h-auto sm:py-5">
        <SectionWrapper className="w-auto h-auto">
          <div className="w-full h-auto flex sm:flex-col gap-5 items-center py-10 sm:py-0">
            <div className="w-[40%] sm:w-[100%] h-full bg-slate-50 dark:bg-slate-900 border border-slate-400 border-opacity-20 rounded-xl p-8 flex items-center flex-col gap-10 justify-evenly">
              <div className="relative">
                <Image
                  src={"/icons/Default_pfp.svg.png"}
                  width={150}
                  height={150}
                  alt="avatar"
                  priority
                />
                <div className="absolute size-7 bottom-1 right-4 bg-purple-600 rounded-full grid place-content-center">
                  <ToolTipWrapper content="change your profile picture">
                    <EditAvatar />
                  </ToolTipWrapper>
                </div>
              </div>
              <div className="relative text-center">
                <h1 className="font-semibold text-xl tracking-widest">
                  {user?.fname} {user?.lname}
                </h1>
                <h2 className="text-lg text-center">
                  {user?.profession ? user.profession : "add profession"}
                </h2>

                <ToolTipWrapper content="Edit profile">
                  <div className="absolute -top-3 -right-4">
                    <EditProfile
                      values={{
                        fname: user?.fname,
                        lname: user?.lname,
                        profession: user?.profession,
                      }}
                    />
                  </div>
                </ToolTipWrapper>
              </div>
              <div className="text-center">
                <div className="relative w-fit mx-auto">
                  <ToolTipWrapper content="Edit about">
                    <div className="absolute -top-4 -right-5">
                      <EditAbout about={user?.about} />
                    </div>
                  </ToolTipWrapper>
                  <h2 className="font-semibold text-xl">About</h2>
                </div>
                <p className="text-slate-600 text-center max-w-[350px]">
                  {user?.about}
                </p>
              </div>
              <div className="space-y-2 text-center">
                <div className="relative w-fit mx-auto">
                  <ToolTipWrapper content="Edit skills">
                    <div className="absolute -top-3 -right-5">
                      <EditSkills value={user?.skills} />
                    </div>
                  </ToolTipWrapper>
                  <h2 className="font-semibold text-xl">Skills</h2>
                </div>
                <div className="flex gap-5 flex-wrap">
                  {user?.skills.map((item, index) => (
                    <span
                      key={index}
                      className="text-sm bg-slate-400 dark:bg-slate-800 rounded-md px-3 py-1 font-semibold">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2 text-center">
                <div className="relative w-fit mx-auto">
                  <ToolTipWrapper content="Edit skills">
                    <div className="absolute -top-3 -right-4">
                      <EditPreferences value={user?.job_preferences} />
                    </div>
                  </ToolTipWrapper>
                  <h2 className="font-semibold text-xl">Job Preferences</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {user?.job_preferences.map((item, index) => (
                    <span
                      key={index}
                      className="text-sm bg-slate-400 dark:bg-slate-800 rounded-md px-2 py-1 font-semibold">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-[60%] sm:w-[100%] h-full space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-400 border-opacity-20 rounded-xl space-y-4 p-8">
                <div>
                  <h1 className="font-semibold text-lg">Basic Information</h1>
                </div>
                <div className="w-full h-auto grid grid-cols-3 sm:grid-cols-1 gap-5">
                  <div>
                    <h1 className="text-slate-600 text-[15px]">First name</h1>
                    <h3 className="font-semibold">{user?.fname}</h3>
                  </div>
                  <div>
                    <h1 className="text-slate-600 text-[15px]">Last name</h1>
                    <h3 className="font-semibold">{user?.lname}</h3>
                  </div>
                  <div>
                    <h1 className="text-slate-600 text-[15px]">Email</h1>
                    <h3 className="font-semibold">{user?.email}</h3>
                  </div>
                  <div>
                    <div className="relative">
                      <ToolTipWrapper content="Edit phone number">
                        <div className="relative">
                          <h1 className="text-slate-600 text-[15px]">
                            Phone number
                          </h1>
                          <EditPhone phone={user?.phone} />
                        </div>
                      </ToolTipWrapper>
                      <h3 className="font-semibold">{user?.phone}</h3>
                    </div>
                  </div>
                </div>
                <div className="space-x-8 lg:flex sm:flex-col sm:gap-5 sm:items-start sm:flex-nowrap sm:space-x-0">
                  <Resume />
                  <UploadResume />
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-400 border-opacity-20 rounded-xl space-y-4 p-8">
                <Accordion type="multiple">
                  <AccordionItem className="border-none" value="item-1">
                    <AccordionTrigger className="font-semibold text-lg">
                      Education
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-4">
                        {user?.education.map((item, index) =>
                          item.institute === "" ? (
                            "no data found"
                          ) : (
                            <li
                              key={index}
                              className="border-b border-slate-300 dark:border-slate-700 p-2 last:border-none space-y-3">
                              <div className="flex justify-end gap-5">
                                <ToolTipWrapper content="edit">
                                  <EducationForm
                                    method="UPDATE"
                                    education={item}>
                                    <Pen className="size-4 text-purple-500 cursor-pointer" />
                                  </EducationForm>
                                </ToolTipWrapper>
                                <ToolTipWrapper content="remove">
                                  <Trash2 className="size-5 text-red-500 cursor-pointer" />
                                </ToolTipWrapper>
                              </div>
                              <h1 className="font-bold text-blue-600 text-lg">
                                {item.institute}
                              </h1>
                              <h2 className="font-semibold text-base">
                                {item.education_type} in {item.stream}
                              </h2>
                              <p className="text-slate-600">
                                {item.start_date} - {item.end_date}
                              </p>
                              <p className="text-slate-600">{item.marks}%</p>
                            </li>
                          )
                        )}
                      </ul>
                      <br />
                      <EducationForm
                        method="ADD"
                        title="add education"
                        content="add new education, and make sure to submit the form"
                        education={{
                          institute: "",
                          education_type: "",
                          end_date: "",
                          marks: "",
                          start_date: "",
                          stream: "",
                        }}>
                        <Button>add education</Button>
                      </EducationForm>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-400 border-opacity-20 rounded-xl space-y-4 p-8">
                <Accordion type="multiple">
                  <AccordionItem className="border-none" value="item-1">
                    <AccordionTrigger className="font-semibold text-lg">
                      Experience
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-4">
                        {user?.experience.map((item, index) =>
                          item.company_name === "" ? (
                            "no data found"
                          ) : (
                            <li
                              key={index}
                              className="border-b border-slate-300 dark:border-slate-700 p-2 last:border-none space-y-3">
                              <div className="flex justify-end gap-5">
                                <ToolTipWrapper content="edit">
                                  <ExperienceForm
                                    method="UPDATE"
                                    experience={item}>
                                    <Pen className="size-4 text-purple-500 cursor-pointer" />
                                  </ExperienceForm>
                                </ToolTipWrapper>

                                <ToolTipWrapper content="remove">
                                  <Trash2 className="size-5 text-red-500 cursor-pointer" />
                                </ToolTipWrapper>
                              </div>
                              <h1 className="font-bold text-blue-600 text-lg">
                                {item.company_name}
                              </h1>
                              <h2 className="font-semibold text-base">
                                {item.position}
                              </h2>
                              <p className="text-slate-600">
                                {item.start_date} - {item.end_date}
                              </p>
                            </li>
                          )
                        )}
                      </ul>
                      <br />
                      <ExperienceForm
                        method="ADD"
                        title="add education"
                        content="add experience, and make sure to submit the form"
                        experience={{
                          company_name: "",
                          position: "",
                          end_date: "",
                          start_date: "",
                        }}>
                        <Button>add experience</Button>
                      </ExperienceForm>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-400 border-opacity-20 rounded-xl space-y-4 p-8">
                <Accordion type="multiple">
                  <AccordionItem className="border-none" value="item-1">
                    <AccordionTrigger className="font-semibold text-lg">
                      Projects
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-4">
                        {user?.projects.map((item, index) =>
                          item.project_name === "" ? (
                            "no data found"
                          ) : (
                            <li
                              key={index}
                              className="border-b border-slate-300 dark:border-slate-700 p-2 last:border-none space-y-3">
                              <ToolTipWrapper content="edit education">
                                <ProjectsForm method="UPDATE" projects={item}>
                                  <Pen className="size-4 text-purple-500 cursor-pointer" />
                                </ProjectsForm>
                              </ToolTipWrapper>
                              <h1 className="font-bold text-blue-600 text-lg">
                                {item.project_name}
                              </h1>
                              <p className="font-normal text-base">
                                {item.project_description}
                              </p>
                              <div className="flex flex-wrap gap-5">
                                {item.technologies_used.map((tech) => (
                                  <p
                                    key={tech}
                                    className="bg-slate-500 px-2 rounded-lg">
                                    {tech}
                                  </p>
                                ))}
                              </div>
                            </li>
                          )
                        )}
                      </ul>
                      <br />
                      <ProjectsForm
                        method="ADD"
                        title="add project"
                        content="add new project, and make sure to submit the form"
                        projects={{
                          project_name: "",
                          project_description: "",
                          technologies_used: [""],
                          reference: "",
                        }}>
                        <Button>add project</Button>
                      </ProjectsForm>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </div >
    );
}
