import {cn} from "@/lib/utils";
import {cva, VariantProps} from "class-variance-authority";
import {ButtonHTMLAttributes, FC, ReactNode} from "react";

const statusPillVariants = cva(
	"w-fit h-fit px-6 py-1 rounded-full text-sm cursor-pointer",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/90",
				applied: "bg-primary text-primary-foreground hover:bg-primary/90",
				accepted: "bg-emerald-500",
				rejected: "bg-destructive",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

interface StatusPillProps
	extends ButtonHTMLAttributes<HTMLDivElement>,
		VariantProps<typeof statusPillVariants> {
	children: ReactNode;
	className?: string;
}

export const StatusPill: FC<StatusPillProps> = ({
	children,
	variant,
	className,
}) => {
	return (
		<div className={cn(statusPillVariants({variant, className}))}>
			{children}
		</div>
	);
};
