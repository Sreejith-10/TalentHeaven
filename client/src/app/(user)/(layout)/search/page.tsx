"use client";

import SerachBar from "@/components/serach/search-bar";
import { Button } from "@/components/ui/button";
import JobCard from "@/components/ui/cards/job-card";
import { Checkbox } from "@/components/ui/checkbox";
import SectionWrapper from "@/components/wrapper/section-wrapper";
import { AlertTriangle, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { paginationSearch } from "@/controllers/jobController";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterDropDown } from "@/components/serach/filter-dropdown";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
} from "@/components/ui/pagination";

const job_type = ["full-time", "part-time", "contract", "temporary", "intern"];
const job_mode = ["remote", "work from home", "on site", "hybrid"];
const experience_level = [
  "fresher",
  "0 - 1 year",
  "1 - 3 years",
  "3 - 5 years",
  "5 - 10 years",
  "10+ years",
];
const salary = [
  "all",
  "0 - 2 LPA",
  "2 - 5 LPA",
  "5 - 10 LPA",
  "10 - 20 LPA",
  "20+ LPA",
];

export default function Search() {
  const url = new URL(window.location.href);
  const search = new URLSearchParams(url.search);

  const [showFilter, setShowFilter] = useState(false);
  const [sortState, setSortState] = useState("");

  const [filters, setFilters] = useState<{
    job_type: [] | string[];
    job_mode: [] | string[];
    experience_level: [] | string[];
    salary: [] | string[];
  }>({
    job_type: [],
    job_mode: [],
    experience_level: [],
    salary: [],
  });

  useEffect(() => {
    document.body.style.overflow = showFilter ? "hidden" : "auto";
  }, [showFilter]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => paginationSearch(search),
    enabled: !!search,
  });


  return (
    <main className="w-full h-full relative">
      <SectionWrapper>
        <div className="w-full h-auto flex flex-col items-center">
          <section className="w-full pt-10 flex flex-col gap-10 items-center justify-center">
            <h1 className="text-[30px] font-semibold text-slate-800 dark:text-slate-200">
              Find Your Dream Jobs
            </h1>
            <SerachBar />
            {/* <div className="w-full h-auto px-28 flex flex-wrap gap-6">
							{search.getAll("filter_job_type").map((item, index) => (
								<Tile
									onclick={() => {
										search.delete("filter_job_type", item);
										window.history.pushState(
											{},
											"",
											`${url.origin}${url.pathname}?${search.toString()}`
										);
									}}
									key={index}>
									{item}
								</Tile>
							))}
							{search.getAll("filter_job_mode").map((item, index) => (
								<Tile
									onclick={() => {
										search.delete("filter_job_mode", item);
										window.history.pushState(
											{},
											"",
											`${url.origin}${url.pathname}?${search.toString()}`
										);
									}}
									key={index}>
									{item}
								</Tile>
							))}
							{search.getAll("filter_experience").map((item, index) => (
								<Tile
									onclick={() => {
										search.delete("filter_experience", item);
										window.history.pushState(
											{},
											"",
											`${url.origin}${url.pathname}?${search.toString()}`
										);
									}}
									key={index}>
									{item}
								</Tile>
							))}
							{search.getAll("filter_salary").map((item, index) => (
								<Tile
									onclick={() => {
										search.delete("filter_salary", item);
										window.history.pushState(
											{},
											"",
											`${url.origin}${url.pathname}?${search.toString()}`
										);
									}}
									key={index}>
									{item}
								</Tile>
							))}
						</div> */}
          </section>
          <div className="w-full h-auto flex flex-col gap-5 py-[40px] px-[200px] sm:py-[30px] sm:px-[30px]">
            <div className="w-[100%] lg:w-[25%] p-5 space-y-4 sm:hidden flex flex-col">
              <div className="space-y-3 space-x-5">
                <FilterDropDown
                  title="Job Type"
                  items={job_type}
                  id="filter_job_type"
                />
                <FilterDropDown
                  title="Job Mode"
                  items={job_mode}
                  id="filter_job_mode"
                />
                <FilterDropDown
                  title="Experience"
                  items={experience_level}
                  id="filter_experience"
                />
                <FilterDropDown
                  title="Salary"
                  items={salary}
                  id="filter_salary"
                />
              </div>
              <div>
                <div className="w-full flex justify-between">
                  <h2 className="font-semibold">
                    {isLoading
                      ? "Please wait"
                      : isError
                        ? "Failed"
                        : `${data?.pagination?.total} jobs`}
                  </h2>
                </div>
                <Button
                  onClick={() => setShowFilter(true)}
                  className="hidden sm:block bg-purple-600 hover:bg-purple-500"
                >
                  Filter
                </Button>
                <div className="hidden sm:flex flex-wrap gap-2">
                  {search.getAll("filter_job_type").map((item, index) => (
                    <span
                      className="bg-slate-200 px-2 py-1 rounded-md border border-slate-400 border-opacity-30 text-sm font-semibold"
                      key={index}
                    >
                      {item}
                    </span>
                  ))}
                  {search.getAll("filter_job_mode").map((item, index) => (
                    <span
                      className="bg-slate-200 px-2 py-1 rounded-md border border-slate-400 border-opacity-30 text-sm font-semibold"
                      key={index}
                    >
                      {item}
                    </span>
                  ))}
                  {search.getAll("filter_experience").map((item, index) => (
                    <span
                      className="bg-slate-200 px-2 py-1 rounded-md border border-slate-400 border-opacity-30 text-sm font-semibold"
                      key={index}
                    >
                      {item}
                    </span>
                  ))}
                  {search.getAll("filter_salary").map((item, index) => (
                    <span
                      className="bg-slate-200 px-2 py-1 rounded-md border border-slate-400 border-opacity-30 text-sm font-semibold"
                      key={index}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-[100%] xs:w-full lg:w-[75%] h-full space-y-5 flex flex-col">
              <div className="w-full space-y-5">
                {isLoading ? (
                  <div>loading . . .</div>
                ) : isError ? (
                  <div className="flex items-center justify-center flex-col gap-5">
                    <AlertTriangle className="size-20 text-purple-500" />
                    <h1 className="font-semibold text-slate-700">
                      something went wrong
                    </h1>
                    <span
                      onClick={() => refetch()}
                      className="bg-purple-500 px-8 py-2 text-slate-50 rounded-md shadow-xl cursor-pointer hover:bg-purple-400 active:shadow-none select-none"
                    >
                      retry
                    </span>
                  </div>
                ) : (
                  data?.jobList?.map((data, index) => (
                    <JobCard
                      job={data}
                      key={index}
                      className="w-full shadow-md"
                    />
                  ))
                )}
              </div>
              <div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <Button
                        variant="outline"
                        disabled={parseInt(search.get("page")!) === 1}
                        onClick={() => {
                          const curretPage = parseInt(search.get("page")!);
                          search.set("page", String(curretPage - 1));
                          window.history.pushState(
                            {},
                            "",
                            `${url.origin}${url.pathname}?${search.toString()}`,
                          );

                          refetch();
                        }}
                      >
                        Previous
                      </Button>
                    </PaginationItem>
                    {Array(data?.pagination?.totalPages)
                      .fill("")
                      .map((_, index) => (
                        <PaginationItem key={index}>
                          <Button
                            variant={
                              parseInt(search.get("page")!) === index + 1
                                ? "default"
                                : "outline"
                            }
                            onClick={() => {
                              search.set("page", String(index + 1));
                              window.history.pushState(
                                {},
                                "",
                                `${url.origin}${url.pathname}?${search.toString()}`,
                              );

                              refetch();
                            }}
                          >
                            {index + 1}
                          </Button>
                        </PaginationItem>
                      ))}
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <Button
                        variant="outline"
                        disabled={
                          parseInt(search.get("page")!) ===
                          data?.pagination?.totalPages
                        }
                        onClick={() => {
                          const curretPage = parseInt(search.get("page")!);
                          search.set("page", String(curretPage + 1));
                          window.history.pushState(
                            {},
                            "",
                            `${url.origin}${url.pathname}?${search.toString()}`,
                          );
                          refetch();
                        }}
                      >
                        Next
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
      <motion.div
        variants={{
          initial: {
            translateX: 1000,
            z: -9999,
          },
          slide: {
            translateX: 0,
          },
        }}
        animate={showFilter ? "slide" : "initial"}
        className="hidden sm:block fixed w-[300px] z-[99] h-dvh top-0 left-0 bg-slate-100 px-10 py-5 overflow-auto hide-scroll-bar"
      >
        <X
          className="absolute top-4 right-4"
          onClick={() => setShowFilter(false)}
        />

        <div className="my-10">
          <h1 className="text-2xl font-semibold">Filters</h1>
        </div>

        <div className="">
          <div className="space-y-3">
            <h2 className="text-slate-600 font-semibold uppercase text-sm">
              Job Type
            </h2>
            <ul className="space-y-2">
              {job_type.map((item) => (
                <li key={item} className="flex gap-3 items-center">
                  <Checkbox
                    checked={search.getAll("filter_job_type").includes(item)}
                    onCheckedChange={(state) => {
                      if (state) {
                        search.append("filter_job_type", item);
                        window.history.pushState(
                          {},
                          "",
                          `${url.origin}${url.pathname}?${search.toString()}`,
                        );
                        setFilters((prev) => ({
                          ...prev,
                          job_type: [...prev.job_type, item],
                        }));
                      } else {
                        search.delete("filter_job_type", item);
                        window.history.pushState(
                          {},
                          "",
                          `${url.origin}${url.pathname}?${search.toString()}`,
                        );
                        setFilters((prev) => ({
                          ...prev,
                          job_type: prev.job_type.filter((val) => val !== item),
                        }));
                      }
                    }}
                  />
                  <p className="text-slate-600">
                    {item.charAt(0).toUpperCase().concat(item.slice(1))}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <br />
          <div className="space-y-3">
            <h2 className="text-slate-600 font-semibold uppercase text-sm">
              Job Mode
            </h2>
            <ul className="space-y-2">
              {job_mode.map((item) => (
                <li key={item} className="flex gap-3 items-center">
                  <Checkbox
                    checked={search.getAll("filter_job_mode").includes(item)}
                    onCheckedChange={(state) => {
                      if (state) {
                        search.append("filter_job_mode", item);
                        window.history.pushState(
                          {},
                          "",
                          `${url.origin}${url.pathname}?${search.toString()}`,
                        );
                        setFilters((prev) => ({
                          ...prev,
                          job_mode: [...prev.job_mode, item],
                        }));
                      } else {
                        search.delete("filter_job_mode", item);
                        window.history.pushState(
                          {},
                          "",
                          `${url.origin}${url.pathname}?${search.toString()}`,
                        );
                        setFilters((prev) => ({
                          ...prev,
                          job_mode: prev.job_mode.filter((val) => val !== item),
                        }));
                      }
                    }}
                  />
                  <p className="text-slate-600">
                    {" "}
                    {item.charAt(0).toUpperCase().concat(item.slice(1))}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <br />
          <div className="space-y-3">
            <h2 className="text-slate-600 font-semibold uppercase text-sm">
              Experience level
            </h2>
            <ul className="space-y-2">
              {experience_level.map((item) => (
                <li key={item} className="flex gap-3 items-center">
                  <Checkbox
                    checked={search.getAll("filter_experience")?.includes(item)}
                    onCheckedChange={(state) => {
                      if (state) {
                        search.append("filter_experience", item);
                        window.history.pushState(
                          {},
                          "",
                          `${url.origin}${url.pathname}?${search.toString()}`,
                        );
                        setFilters((prev) => ({
                          ...prev,
                          experience_level: [...prev.experience_level, item],
                        }));
                      } else {
                        search.delete("filter_experience", item);
                        window.history.pushState(
                          {},
                          "",
                          `${url.origin}${url.pathname}?${search.toString()}`,
                        );
                        setFilters((prev) => ({
                          ...prev,
                          experience_level: prev.experience_level.filter(
                            (val) => val !== item,
                          ),
                        }));
                      }
                    }}
                  />
                  <p className="text-slate-600">{item}</p>
                </li>
              ))}
            </ul>
          </div>
          <br />
          <div className="space-y-3">
            <h2 className="text-slate-600 font-semibold uppercase text-sm">
              Salary
            </h2>
            <ul className="space-y-2">
              {salary.map((item) => (
                <li key={item} className="flex gap-3 items-center">
                  <Checkbox
                    checked={search.getAll("filter_salary")?.includes(item)}
                    onCheckedChange={(state) => {
                      if (state) {
                        search.append("filter_salary", item);
                        window.history.pushState(
                          {},
                          "",
                          `${url.origin}${url.pathname}?${search.toString()}`,
                        );
                        setFilters((prev) => ({
                          ...prev,
                          salary: [...prev.salary, item],
                        }));
                      } else {
                        search.delete("filter_salary", item);
                        window.history.pushState(
                          {},
                          "",
                          `${url.origin}${url.pathname}?${search.toString()}`,
                        );
                        setFilters((prev) => ({
                          ...prev,
                          salary: prev.salary.filter((val) => val !== item),
                        }));
                      }
                    }}
                  />
                  <p className="text-slate-600">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
