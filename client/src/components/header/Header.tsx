import React from "react";
import Left from "./Left";
import Right from "./Right";

const Header = () => {
	return (
		<div className={"flex h-20 w-full px-5 border-b border-gray-400"}>
			<Left />
			<Right />
		</div>
	);
};

export default Header;
