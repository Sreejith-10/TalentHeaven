"use client";

import {ArrowUp} from "lucide-react";
import {useEffect, useState} from "react";

const Top = () => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => {
			const scrollY = window.scrollY;
			const show = scrollY > 100;
			setIsScrolled(show);
		};

		window.addEventListener("scroll", onScroll);

		return () => {
			window.removeEventListener("scroll", onScroll);
		};
	}, []);

	return (
		<div
			className={`w-10 h-10 fixed bottom-[50px] right-[50px] bg-purple-600 grid place-content-center cursor-pointer rounded-sm ease-in-out duration-500 ${
				isScrolled ? "visible opacity-[1]" : "invisible opacity-0"
			}`}>
			<ArrowUp
				size={30}
				className="text-white"
				onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
			/>
		</div>
	);
};

export default Top;
