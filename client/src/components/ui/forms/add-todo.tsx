import {Loader2, Pen} from "lucide-react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../dialog";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../form";
import {Button} from "../button";
import {useToast} from "../use-toast";
import {useRef} from "react";
import {Input} from "../input";

const schema = z.object({
	todo: z.string(),
	deadLine: z.string(),
});

interface AddTodoProps {
	addTodo: (val: {todo: string; deadLine: string}) => void;
}

const AddTodo = ({addTodo}: AddTodoProps) => {
	const {toast} = useToast();

	const dialogRef = useRef<HTMLButtonElement>(null);

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver<typeof schema>(schema),
		defaultValues: {
			todo: "",
			deadLine: "",
		},
	});

	const submitHandler = (values: z.infer<typeof schema>) => {
		addTodo({todo: values.todo, deadLine: values.deadLine});
	};

	return (
		<Dialog>
			<DialogTrigger>
				<Button className="h-fit bg-purple-600 dark:bg-purple-600 hover:bg-purple-500 text-slate-50 dark:text-slate-50">
					Add
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add a Task</DialogTitle>
					<DialogDescription>Add a new taks to not forget</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						className="space-y-4"
						onSubmit={form.handleSubmit(submitHandler)}>
						<FormField
							control={form.control}
							name="todo"
							render={({field}) => (
								<FormItem>
									<FormLabel className="font-bold">Task</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="deadLine"
							render={({field}) => (
								<FormItem>
									<FormLabel className="font-bold">Deadline</FormLabel>
									<FormControl>
										<Input {...field} type="datetime-local" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<br />
						<div className="flex gap-2 flex-col">
							<Button type="submit">
								Save Task
								{/* {isPending && <Loader2 className="ml-3 animate-spin" />} */}
							</Button>
							<DialogClose asChild ref={dialogRef}>
								<Button variant="outline" type="button">
									Cancel changes
								</Button>
							</DialogClose>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default AddTodo;
