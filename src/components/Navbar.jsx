import { HStack, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<HStack p={"3.5"} bgColor={"blackAlpha.900"} spacing={"10"}>
			<Button variant={"unstyled"} color={"white"}>
				<Link to="/">Home</Link>
			</Button>

			<Button variant={"unstyled"} color={"white"}>
				<Link to="/exchanges">Exchanges</Link>
			</Button>

			<Button variant={"unstyled"} color={"white"}>
				<Link to="/coins">Coins</Link>
			</Button>
		</HStack>
	);
};

export default Navbar;
