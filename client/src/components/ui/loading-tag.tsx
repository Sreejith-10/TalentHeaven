"use client";

import {cn} from "@/lib/utils";
import {ReactNode, useLayoutEffect, useRef, useState} from "react";

const LoadingTag = ({
	className,
	children,
}: {
	className?: string;
	children: ReactNode;
}) => {
	const [dimensions, setDimensions] = useState({w: 0, h: 0});

	const ref = useRef<HTMLHeadingElement>(null);
	useLayoutEffect(() => {
		const d = ref.current?.getBoundingClientRect();

		if (d) setDimensions((prev) => ({w: d?.width, h: d?.height}));
	}, []);

	return (
		<div
			ref={ref}
			className={`relative before:absolute before:content-[''] before:top-0 before:left-0 before:bg-purple-600 before:w-[${dimensions.w}px] before:h-[${dimensions.h}px]`}>
			{children}
		</div>
	);
};

export default LoadingTag;
