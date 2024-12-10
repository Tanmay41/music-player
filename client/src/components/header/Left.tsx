import React from "react";
import { Logo } from "./Logo";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Button } from "../ui/button";

const Left = () => {
	return (
		<div className={"flex justify-between items-center w-[40%] h-full"}>
			<Logo />
			<div className="flex w-full max-w-sm items-center space-x-2">
				<Input placeholder="Search a song..." />
				<Button type="submit">
					<Search />
				</Button>
			</div>
		</div>
	);
};

export default Left;
