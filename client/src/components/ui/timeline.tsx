const TimeLine = () => {
	const dates = ["12-4-2024", "1-3-2024", "2-4-2024"];
	return (
		<div className="w-40 relative pl-6 flex flex-col gap-5 before:absolute before:content-[''] before:top-0 before:left-0 before:bg-slate-100 before:w-1 before:h-full before:rounded-t-md before:rounded-b-md">
			{dates.map((item, index) => (
				<div className="" key={index}>{item}</div>
			))}
		</div>
	);
};

export default TimeLine;
