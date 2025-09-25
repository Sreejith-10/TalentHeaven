import {cn} from "@/lib/utils";
import {ReactNode} from "react";

const SectionWrapper = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<div className={cn("mx-[15%] xl:mx-[5%] flex", className)}>{children}</div>
	);
};

export default SectionWrapper;
