import { VStack, Box, Spinner, Text } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
	return (
		<>
			<VStack h="90vh" justifyContent={"center"}>
				<Box transform={"scale(3)"}>
					<Spinner size={"xl"}></Spinner>
				</Box>
				<Text
					p={"8vh"}
					justifyContent={"center"}
					bgGradient={"linear-gradient(147deg, #d7d7d7 0%, #353535 74%)"}
					bgClip={"text"}
					color={"transparent"}
					fontWeight={"bold"}
				>
					Loading...
				</Text>
			</VStack>
		</>
	);
};

export default Loader;
