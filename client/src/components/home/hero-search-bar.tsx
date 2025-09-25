"use client";

import { MapPinnedIcon, Search } from "lucide-react";
import { Button } from "../ui/button";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

const HeroSeachBar = () => {
  const { push } = useRouter();

  const searchhandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const job_title = data.get("job-title");
    const job_location = data.get("job-location");
    push(`/search?q=${job_title}&location=${job_location}&limit=10&page=1`);
  };

  return (
    <form
      onSubmit={searchhandler}
      className="w-fit h-[60px] flex items-center gap-5 px-4 sm:gap-3 rounded-full box-shadow dark:dark-box-shadow">
      <div className="flex gap-5 items-center justify-center sm:gap-0">
        <Search />
        <input
          name="job-title"
          type="text"
          className="h-[30px] p-2 outline-none bg-transparent font-semibold placeholder:font-medium placeholder:text-slate-500"
          placeholder="Job title or keyword"
        />
      </div>
      <span className="inline-block w-[2px] h-[30px] bg-slate-300 md:hidden" />
      <div className="flex gap-5 sm:hidden">
        <MapPinnedIcon />
        <input
          name="job-location"
          type="text"
          className="h-[30px] p-2 outline-none bg-transparent font-semibold placeholder:font-medium placeholder:text-slate-500"
          placeholder="Prefred location (optional)"
        />
      </div>
      <Button
        type="submit"
        className="rounded-full bg-purple-600 hover:bg-purple-400 dark:text-slate-50">
        Search
      </Button>
    </form>
  );
};

export default HeroSeachBar;
