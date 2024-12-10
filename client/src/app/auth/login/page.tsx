"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

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
import { login } from "@/api/auth";
import { CheckCircle2, CircleX } from "lucide-react";

const formSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

const Login = () => {
	const { toast } = useToast();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const response = await login(values);
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
				"w-[90vw] md:w-[60vw] lg:w-[45vw] xl:w-[25vw] h-[40vh]  mx-auto p-14 rounded-3xl border border-gray-400"
			}
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8"
				>
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
										placeholder="enter your password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Login</Button>
				</form>
			</Form>
		</div>
	);
};

export default Login;
