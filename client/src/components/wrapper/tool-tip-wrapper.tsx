import {ReactNode} from "react";
import {
	TooltipProvider,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "../ui/tooltip";

type ToolTipProps = {
	children: ReactNode;
	content: string;
	delay?: number;
};

const ToolTipWrapper = ({children, content, delay = 100}: ToolTipProps) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={delay}>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent>{content}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default ToolTipWrapper;
