import { Facebook, Github, Globe, Instagram, Linkedin, User } from "lucide-react";
import Image from "next/image";

export default function Candidate() {
  return (
    <div className="w-full h-full bg-slate-50 dark:bg-slate-900 dark:border dark:border-slate-800 rounded-2xl p-6 flex flex-col gap-8 overflow-scroll">
      <div>
        <h1 className="font-semibold text-2xl">Candidate Information</h1>
      </div>

      <div className="flex gap-24 items-center justify-start">
        <div>
          <Image src={"/icons/Default_pfp.svg.png"} alt="user-avatar" width={100} height={100} className="size-40" />
        </div>

        <div className="space-y-2">
          <h1 className="font-semibold text-xl">User name</h1>
          <h1 className="font-semibold text-medium">User Profession</h1>
          <h2 className="font-normal">email@gmail.com</h2>
          <h2>+91 293903</h2>
        </div>

        <div className="w-auto h-auto flex gap-5">
          <div className="size-12 border-2 border-slate-400 rounded-lg border-opacity-50 grid place-content-center cursor-pointer"><User /></div>
          <div className="size-12 border-2 border-slate-400 rounded-lg border-opacity-50 grid place-content-center cursor-pointer"><Facebook /></div>
          <div className="size-12 border-2 border-slate-400 rounded-lg border-opacity-50 grid place-content-center cursor-pointer"><Instagram /></div>
          <div className="size-12 border-2 border-slate-400 rounded-lg border-opacity-50 grid place-content-center cursor-pointer"><Linkedin /></div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h1 className="font-semibold text-lg mb-2">About</h1>
          <p>lorem20</p>
        </div>


        <div>
          <h1 className="font-semibold text-lg mb-2">Skills</h1>
          <ul className="flex flex-wrap gap-4">
            {
              Array(10).fill(0).map((item, index) => (
                <li key={index} className="w-fit h-fit px-4 py-1 font-semibold rounded-md bg-zinc-300">{item}</li>
              ))
            }
          </ul>
        </div>
      </div>


      <div>
        <h1 className="font-semibold text-lg mb-2">Projects</h1>
        <div className="w-fit grid grid-cols-3 gap-5 place-content-start">
          {
            Array(3).fill(0).map((item, index) => (
              <div key={index} className="w-96 h-fit px-4 py-2 space-y-2 rounded-md border border-zinc-300">
                <h2 className="font-semibold text-xl">Project Title</h2>
                <p className="line-clamp-2">llorem impsum random shitolorem impsum random shitlorem impsum random shitlorem impsum random shitlorem impsum random shitrem impsum random shit</p>
                <span className="w-full pt-6 inline-flex justify-between">
                  <span className="inline-grid size-10 border-2 border-slate-400 border-opacity-50 rounded-lg place-content-center cursor-pointer">
                    <Globe />
                  </span>
                  <span className="inline-grid size-10 border-2 border-slate-400 border-opacity-50 rounded-lg place-content-center cursor-pointer"><Github /></span>
                </span>
              </div>
            ))
          }
        </div>
      </div>


      <div>
        <h1 className="font-semibold text-lg mb-2">Work Experience</h1>
        <div className="flex flex-wrap gap-4">
          {
            Array(4).fill(0).map((item, index) => (
              <div key={index} className="w-96 h-fit px-4 py-4 border-l-2 border-l-zinc-900">
                <h1 className="font-semibold">Senior Full Stack Developer</h1>
                <h2 className="text-zinc-700">Infoware Solutions Pvt Ltd</h2>
                <p className="text-zinc-400 mt-6">2024 - present</p>
              </div>
            ))
          }
        </div>
      </div>

      <div>
        <h1 className="font-semibold text-lg mb-2">Education</h1>
        <div className="flex flex-wrap gap-4">
          {
            Array(4).fill(0).map((item, index) => (
              <div key={index} className="w-96 h-fit px-4 py-4 border-l-2 border-l-zinc-900">
                <h1 className="font-semibold">Senior Full Stack Developer</h1>
                <h2 className="text-zinc-700">Infoware Solutions Pvt Ltd</h2>
                <p className="text-zinc-400 mt-6">2024 - present</p>
              </div>
            ))
          }
        </div>
      </div>

    </div >
  )
}
