"use client";

import {Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";
import {motion} from "framer-motion";

export function Toggle({size}: {size?: number}) {
	const {theme, setTheme} = useTheme();

	return (
		<div className="relative">
			<motion.div
				variants={{
					show: {
						opacity: 1,
						scale: 1,
						translateY: 0,
					},
					hide: {
						opacity: 0,
						scale: 0,
						translateY: -20,
						// visibility: "hidden",
					},
				}}
				transition={{ease: "easeInOut", delay: 0.2}}
				animate={theme === "light" ? "hide" : "show"}
				className="absolute">
				<Sun
					size={size}
					onClick={() => {
						setTheme("light");
					}}
					className="cursor-pointer sm:size-8"
				/>
			</motion.div>
			<motion.div
				variants={{
					show: {
						opacity: 1,
						scale: 1,
						translateY: 0,
					},
					hide: {
						opacity: 0,
						scale: 0,
						translateY: 20,
						// visibility: "hidden",
					},
				}}
				transition={{ease: "easeInOut", delay: 0.2}}
				animate={theme === "dark" ? "hide" : "show"}>
				<Moon
					size={size}
					onClick={() => {
						setTheme("dark");
					}}
					className="cursor-pointer sm:size-8"
				/>
			</motion.div>
		</div>
	);
}
