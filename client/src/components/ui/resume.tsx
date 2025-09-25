import {File} from "lucide-react";
import {Button} from "./button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./dialog";

const Resume = () => {
	return (
		<Dialog>
			<DialogTrigger>
				<Button className="space-x-2 bg-purple-600 hover:bg-purple-500">
					<File />
					<span>View Resume</span>
				</Button>{" "}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Resume</DialogTitle>
					<DialogDescription>
						Lorem ipsum dolor sit amet consectetur.
					</DialogDescription>
				</DialogHeader>

				<div>
					<embed
						src="chrome-extension://mhjfbmdgcfjbbpaeojofohoefgiehjai/93f74854-7d3a-477e-acff-dd185ab17178"
						origianl-file="/FAANGPath_Simple_Template__2_ (2).pdf"
						type="application/x-google-chrome-pdf"
					/>
				</div>

				<DialogClose asChild>
					<Button variant="outline" type="button">
						Close
					</Button>
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
};

export default Resume;
