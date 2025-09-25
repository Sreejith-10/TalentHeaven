import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SectionWrapper from "@/components/wrapper/section-wrapper";
import { Building, Clock, Mail, Phone } from "lucide-react";

export default function Report() {
  return (
    <div className="w-full">
      <SectionWrapper>
        <div className="w-full h-fit py-[100px] grid place-content-center">
          <div className="w-[1200px] h-[600px] sm:w-[350px] sm:h-fit bg-slate-100 dark:bg-slate-900 shadow-xl dark:shadow-lg flex items-center relative before:content-[''] before:absolute before:w-[250px] before:h-[600px] before:bg-purple-500 before:right-0 sm:before:hidden">
            <div className="w-[60%] sm:w-full h-full px-[100px] sm:p-5 py-5 space-y-5">
              <h1 className="text-[50px] sm:text-sm font-semibold dark:text-slate-100">
                Report any problem
              </h1>
              <p className="text-slate-600">
                Feel free to report any problems that you encounterd using talent heaven
              </p>
              <br />
              <Input placeholder="Name" />
              <Input placeholder="Email" />
              <Textarea placeholder="Message" className="resize-none" />
              <br />
              <Button className="w-full font-mono text-[26px] dark:bg-purple-600 dark:hover:bg-purple-500 dark:text-slate-300">
                Report
              </Button>
            </div>
            <div className="w-[40%] h-[80%] sm:hidden z-50 bg-slate-950 p-12 relative flex flex-col justify-evenly before:content-[''] before:absolute before:w-[50px] before:h-[50px] before:bg-purple-500 before:top-[-10px] before:left-[-10px] text-slate-100">
              <h2 className="text-xl">Info</h2>
              <span className="flex items-center gap-5">
                <Mail /> <p>123@gmail.com</p>
              </span>
              <span className="flex items-center gap-5">
                <Phone /> <p>+91 983289838</p>
              </span>
              <span className="flex items-center gap-5">
                <Building /> <p>Apex builder Room 3</p>
              </span>
              <span className="flex items-center gap-5">
                <Clock /> <p>09:00 - 10:00</p>
              </span>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
