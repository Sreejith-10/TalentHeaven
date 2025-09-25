"use client";

import { MapPinnedIcon, Search } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { searchJob } from "@/controllers/jobController";

const SerachBar = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  const url = new URL(window.location.href);
  const search = new URLSearchParams(url.search);

  const clickHandler = () => {
    search.set("job", query);
    search.set("location", location);
    window.history.pushState(
      {},
      "",
      `${url.origin}${url.pathname}?${search.toString()}`,
    );
  };

  return (
    <div className="w-fit h-[60px] sm:h-fit flex items-center sm:flex-col sm:space-y-4 gap-5 px-4 lg:px-2 lg:gap-2 rounded-full box-shadow sm:shadow-none dark:dark-box-shadow dark:border dark:border-slate-200 dark:border-opacity-10">
      <div className="flex gap-5 items-center justify-center sm:box-shadow sm:px-4 sm:py-2 sm:rounded-full">
        <Search />
        <input
          name="job-title"
          value={query ? query : ""}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          className="h-[30px] p-2 outline-none bg-transparent font-semibold placeholder:font-medium"
          placeholder="Job title or keyword"
        />
      </div>
      <span className="inline-block w-[2px] h-[30px] bg-slate-300 sm:hidden" />
      <div className="flex gap-5 sm:box-shadow sm:px-4 sm:py-2 sm:rounded-full">
        <MapPinnedIcon />
        <input
          name="job-location"
          value={location ? location : ""}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          className="h-[30px] p-2 outline-none bg-transparent font-semibold placeholder:font-medium"
          placeholder="Prefred location (optional)"
        />
      </div>
      <div className="hidden sm:block space-x-4">
        <Button
          onClick={() => {
            history.replaceState(null, "", "/search?query=all");
          }}
          className="rounded-full bg-white sm:bg-slate-300 sm:hover:bg-slate-400 hover:bg-white text-slate-900 dark:bg-inherit dark:text-slate-50"
        >
          Clear
        </Button>
        <Button
          onClick={clickHandler}
          className="rounded-full bg-purple-600 hover:bg-purple-400 dark:text-slate-50"
        >
          Search
        </Button>
      </div>
      <Button
        onClick={() => {
          history.replaceState(null, "", "/search?query=all");
        }}
        className="rounded-full sm:hidden bg-white sm:bg-slate-300 sm:hover:bg-slate-400 hover:bg-white text-slate-900 dark:bg-inherit dark:text-slate-50"
      >
        Clear
      </Button>
      <Button
        onClick={clickHandler}
        className="rounded-full sm:hidden bg-purple-600 hover:bg-purple-400 dark:text-slate-50"
      >
        Search
      </Button>
    </div>
  );
};

export default SerachBar;
