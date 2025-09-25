import {useEffect, useState} from "react";

export const useScrollDirection = () => {
	const [scrollDirection, setScrollDirection] = useState<string | null>(null);

	useEffect(() => {
		let lastScrollY = window.scrollY;

		const updateScrollDirection = () => {
			const scrollY = window.scrollY; //pageYOffset
			const direction: string = scrollY > lastScrollY ? "down" : "up";
			if (
				direction !== scrollDirection &&
				(scrollY - lastScrollY > 50 || scrollY - lastScrollY < -10)
			) {
				setScrollDirection(direction);
			}
			lastScrollY = scrollY > 0 ? scrollY : 0;
		};

		window.addEventListener("scroll", updateScrollDirection);

		return () => {
			window.removeEventListener("scroll", updateScrollDirection);
		};
	}, [scrollDirection]);

	return scrollDirection;
};
