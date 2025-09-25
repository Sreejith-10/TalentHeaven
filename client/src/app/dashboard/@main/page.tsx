import NewApplications from "@/components/dashboard/new-applications";
import RecruitmentProgress from "@/components/dashboard/recruitment-progress";
import Todo from "@/components/dashboard/todo";
import Interviews from "@/components/dashboard/widgets/interviews";
import NumberOfApplications from "@/components/dashboard/widgets/number-of-applications";
import OpenPostions from "@/components/dashboard/widgets/open-positions";
import UnreadMessages from "@/components/dashboard/widgets/unread-messages";
import {Calendar} from "@/components/ui/calendar";
import {AreaChartGradient} from "@/components/ui/charts/area-chart";
import {LineChartLinear} from "@/components/ui/charts/line-chart";
import {PieChartOne} from "@/components/ui/charts/pie-chart";

export default function Main() {
	return (
		<div className="w-full h-full flex gap-5">
			<div className="w-full h-fit grid grid-cols-4 grid-flow-row gap-5">
				<div className="col-span-1">
					<NumberOfApplications />
				</div>
				<div className="col-span-1">
					<Interviews />
				</div>
				<div className="col-span-1">
					<OpenPostions />
				</div>
				<div className="col-span-1">
					<UnreadMessages />
				</div>
				<div className="col-span-1 row-span-1">
					<AreaChartGradient />
				</div>
				<div className="col-span-1 row-span-1">
					<LineChartLinear />
				</div>
				<div className="col-span-1 row-span-1">
					<PieChartOne />
				</div>

				<div className="col-span-1 row-span-1">
					<Calendar
						className="bg-slate-50 dark:bg-slate-950 dark:border dark:border-slate-800 w-full h-full rounded-3xl shadow-sm cursor-pointer inline-block"
						classNames={{
							months:
								"flex  w-full h-full inline-block flex-col sm:flex-col space-y-4 sm:space-x-4 sm:space-y-0 flex-1 font-bold",
							month: "w-full space-y-4 w-full flex flex-col",
							table: "w-full h-full border-collapse space-y-1",
							row: "w-full mt-2",
							head_row: "",
						}}
					/>
				</div>
				{/* <div className="col-start-1 col-end-5 bg-red-500"> */}
				<div className="col-span-2 row-span-1">
					<Todo />
				</div>
				<div className="col-span-1 row-span-1">
					<NewApplications />
				</div>
				<div className="col-span-2 row-span-1">
					<RecruitmentProgress />
				</div>
				{/* </div> */}
			</div>
			{/* <div className="w-[70%] flex gap-5 flex-col">
				<div className="w-full bg-purple-600 h-48 rounded-2xl p-5 flex justify-between relative">
					<div className="w-[65%] space-y-3">
						<h1 className="text-slate-50 text-[30px] font-bold">
							Welcome back!
						</h1>
						<p className="text-slate-50 text-wrap">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo nemo
							voluptatum voluptatibus totam recusandae neque aut illo corporis
							quod. Dicta.
						</p>
					</div>
					<div className="absolute right-7 top-[-38px]">
						<Image
							src={"/blogger.png"}
							width={100}
							height={100}
							alt="hero-image"
							className="w-[230px] h-[230px]"
						/>
					</div>
				</div>
				<div className="w-full h-1/2 flex gap-5">
					<div className="w-1/2 h-fit">
						<AreaChartGradient />
					</div>
					<div className="w-1/2 h-fit">
						<LineChartLinear />
					</div>
				</div>
				<div className="w-full h-auto">
					<div className="flex p-5 justify-between items-center">
						<h1 className="font-semibold text-xl">Currentyl hiring</h1>
						<Link href={""} className="hover:underline text-slate-700">
							see all
						</Link>
					</div>
					<div className="flex gap-5">
						<div className="w-1/2 bg-slate-50 dark:bg-slate-950 dark:border dark:border-slate-800 rounded-2xl flex items-center justify-between p-5">
							<div className="flex items-center gap-5">
								<span className="text-[40px]">1</span>
								<div>
									<h1 className="text-[20px]">Node Js Developer</h1>
									<p>(10 candidates)</p>
								</div>
							</div>
							<div className="font-bold text-center">40%</div>
						</div>
						<div className="w-1/2 bg-slate-50 dark:bg-slate-950 dark:border dark:border-slate-800 rounded-2xl flex items-center justify-between p-5">
							<div className="flex items-center gap-5">
								<span className="text-[40px]">1</span>
								<div>
									<h1 className="text-[20px]">Go Developer</h1>
									<p>(10 candidates)</p>
								</div>
							</div>
							<div className="font-bold text-center">40%</div>
						</div>
					</div>
				</div>
			</div>
			<div className="w-[30%] h-full flex flex-col gap-5">
				
				<div className="w-full h-[54%]">
					<NewApplications />
				</div>
			</div> */}
		</div>
	);
}
