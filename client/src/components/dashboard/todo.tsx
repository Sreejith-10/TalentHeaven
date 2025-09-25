"use client";

import {useState} from "react";
import {Checkbox} from "../ui/checkbox";
import AddTodo from "../ui/forms/add-todo";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {Button} from "../ui/button";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import {ColumnDef} from "@tanstack/react-table";
import {ReactTable} from "../ui/table/react-table";

interface TodoType {
	todo: string;
	createdOn: string;
	deadline: string;
	status: "pending" | "completed" | "failed";
}

const Todo = () => {
	const [todo, setTodo] = useState<TodoType[]>([]);

	const columns: ColumnDef<TodoType>[] = [
		{
			accessorKey: "todo",
			header: ({column}) => {
				return <div>Task</div>;
			},
			cell: ({row}) => <div className="lowercase">{row.getValue("todo")}</div>,
		},
		{
			accessorKey: "createdOn",
			header: ({column}) => (
				<div
					className="flex items-center justify-center gap-1"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Created on
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</div>
			),
			cell: ({row}) => (
				<div className="text-center font-medium ">
					{row.getValue("createdOn")}
				</div>
			),
		},
		{
			accessorKey: "deadline",
			header: ({column}) => (
				<div
					className="flex items-center justify-center gap-1"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Deadline
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</div>
			),
			cell: ({row}) => (
				<div className="text-center font-medium ">
					{row.getValue("deadline")}
				</div>
			),
		},
		{
			accessorKey: "status",
			header: () => <div className="text-right">Status</div>,
			cell: ({row}) => (
				<div className="text-right font-medium">{row.getValue("status")}</div>
			),
		},
		{
			header: () => (
				<div>
					<h1>Actions</h1>
				</div>
			),
			id: "actions",
			enableHiding: false,
			cell: ({row}) => {
				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Completed</DropdownMenuItem>
							<DropdownMenuItem>Pending</DropdownMenuItem>
							<DropdownMenuItem>Failed</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
	];

	const addTodo = ({todo, deadLine}: {todo: string; deadLine: string}) => {
		setTodo((prev) => [
			...prev,
			{
				todo: todo,
				deadline: deadLine,
				createdOn: new Date().toLocaleDateString(),
				status: "pending",
			},
		]);
	};

	return (
		<div className="w-full h-full bg-slate-50 dark:bg-slate-950 dark:border dark:border-slate-800 rounded-3xl overflow-auto hide-scroll-bar">
			<div className="w-full h-auto bg-slate-50 dark:bg-slate-950 flex items-center justify-between p-3 sticky top-0">
				<h1 className="font-semibold text-xl">Daily Tasks</h1>
				<AddTodo addTodo={addTodo} />
			</div>
			<div className="w-full h-auto">
				<div className="w-full h-full px-5 py-3 flex flex-col gap-5">
					<ReactTable data={todo} columns={columns} page={5} />
				</div>
			</div>
		</div>
	);
};

export default Todo;
