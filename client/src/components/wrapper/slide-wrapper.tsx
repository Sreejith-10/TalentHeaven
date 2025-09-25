"use client";

import {ReactNode} from "react";
import {motion} from "framer-motion";

const SlideWrapper = ({children}: {children: ReactNode}) => {
	return (
		<motion.div
			initial={{
				translateY: 200,
				opacity: 0,
			}}
			whileInView={{
				translateY: 0,
				opacity: 1,
			}}
			viewport={{once: true}}
			transition={{
				ease: "easeInOut",
				delay: 0.5,
				type: "spring",
				bounce: 0.5,
			}}>
			{children}
		</motion.div>
	);
};

export default SlideWrapper;
