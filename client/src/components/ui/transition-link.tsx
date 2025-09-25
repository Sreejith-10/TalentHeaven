"use client";

import Link, {LinkProps} from "next/link";
import {useRouter} from "next/navigation";
import {MouseEvent, ReactNode, useEffect, useState, useTransition} from "react";
import {flushSync} from "react-dom";

interface TransitionLinkProps extends LinkProps {
	children: ReactNode;
	href: string;
}

const delay = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

const TransitionLink = ({children, href, ...props}: TransitionLinkProps) => {
	const {push} = useRouter();
	const [changed, setChanged] = useState(false);

	const onTransition = async (
		e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
	) => {
		e.preventDefault();
		const body = document.querySelector("body");

		if (window.location.pathname !== href) {
			body?.classList.add("page-transistion");
			await delay(1000);
			push(href);
			setChanged(true);
		}
	};

	useEffect(() => {
		delay(500).then(() => {
			setChanged(false);
			const body = document.querySelector("body");
			body?.classList.remove("page-transistion");
		});
	}, [changed]);

	return (
		<Link href={href} {...props} onClick={onTransition}>
			{children}
		</Link>
	);
};

export default TransitionLink;
