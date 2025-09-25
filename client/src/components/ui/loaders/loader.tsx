"use client";

import {motion} from "framer-motion";

const Loader = () => {
	return (
		<div className="w-full h-dvh grid place-content-center">
			<div className="flex gap-5">
				{Array(4)
					.fill(20)
					.map((item, index) => (
						<motion.div
							initial={{
								translateY: -50,
							}}
							animate={{
								translateY: 0,
							}}
							transition={{
								repeat: Infinity,
								repeatType: "reverse",
								restSpeed: 0.3,
								delay: index * 0.4,
								ease: "easeInOut",
							}}
							key={index}
							className={`p-3 bg-purple-600 rounded-full`}></motion.div>
					))}
			</div>
		</div>
	);
};

export default Loader;
