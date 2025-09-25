"use client";

import {Pen, X} from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../dialog";
import {Button} from "../button";
import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {useMutation} from "@tanstack/react-query";
import {updateAvatar} from "@/controllers/userController";

const EditAvatar = () => {
	const [fileState, setFileState] = useState<File | null>();
	const [selectedFile, setSelectedFile] = useState<string | undefined>();

	const fileRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		function getImage() {
			if (fileState) {
				const path = URL.createObjectURL(fileState!);
				setSelectedFile(path);
			}
		}

		getImage();
	}, [fileState]);

	const {mutate} = useMutation({
		mutationFn: updateAvatar,
	});

	const submitAvatar = () => {
		const formData = new FormData();

		if (fileState) {
			formData.append("avatar", fileState);
			mutate(formData);
		}
	};

	return (
		<Dialog>
			<DialogTrigger>
				<Pen className="size-4 text-slate-100 cursor-pointer" />
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Avatar</DialogTitle>
					<DialogDescription>
						Make chages to you profile, ensure to save the changes
					</DialogDescription>
				</DialogHeader>
				<div>
					{selectedFile ? (
						<div className="relative">
							<div
								className="absolute top-4 right-4 p-2  border-2 border-destructive rounded-lg cursor-pointer hover:bg-destructive/50 group transition-colors ease-in-out"
								onClick={() => {
									setSelectedFile(undefined);
									setFileState(null);
								}}>
								<X className="size-5 text-destructive group-hover:text-slate-50 transition-colors ease-in-out" />
							</div>
							<Image
								src={selectedFile!}
								alt="not found"
								height={1000}
								width={1000}
								className="rounded-2xl"
							/>
						</div>
					) : (
						<div
							className="w-full h-[300px] border-8 border-dashed border-slate-300 rounded-2xl grid place-content-center"
							onClick={() => fileRef.current?.click()}>
							<p className="font-semibold text-slate-700 hover:underline cursor-pointer">
								Select an image from your device
							</p>
							<input
								type="file"
								hidden
								ref={fileRef}
								onChange={(e) => {
									const file = e.target.files;
									if (file) {
										setFileState(file[0]);
									}
								}}
							/>
						</div>
					)}
				</div>
				<DialogFooter>
					<Button variant="outline">Cancel changes</Button>
					<Button className="my-4" onClick={submitAvatar}>
						Save changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default EditAvatar;
