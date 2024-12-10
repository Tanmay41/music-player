"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { register } from "@/api/auth";
import { CheckCircle2, CircleX } from "lucide-react";

const formSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(6, "Password must be at least 6 characters"),
		confirmPassword: z
			.string()
			.min(6, "Password must be at least 6 characters"),
		gender: z.enum(["male", "female"]),
		name: z.string().nonempty("Name is required"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

const Register = () => {
	const { toast } = useToast();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
			gender: "male",
			name: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const response = await register(values);
		if (response.success) {
			toast({
				description: (
					<div
						className={
							"flex flex-row items-center gap-5 text-2xl text-green-500"
						}
					>
						<CheckCircle2 size={50} />
						<h1>{response.message}</h1>
					</div>
				),
			});
		} else {
			toast({
				description: (
					<div
						className={
							"flex flex-row items-center gap-5 text-2xl text-red-500"
						}
					>
						<CircleX size={50} />
						<h1>{response.message}</h1>
					</div>
				),
			});
		}
	}

	return (
		<div
			className={
				"w-[95vw] md:w-[70vw] lg:w-[55vw] xl:w-[30vw] h-[calc(fit+4rem)]  mx-auto p-14 rounded-3xl border border-gray-400"
			}
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8"
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										placeholder="enter your name"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="enter your email"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="enter your password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="re-enter your password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="gender"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Gender</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="male">
											male
										</SelectItem>
										<SelectItem value="female">
											female
										</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Register</Button>
				</form>
			</Form>
		</div>
	);
};

export default Register;
