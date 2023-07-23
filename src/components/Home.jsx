import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import btcSrc from "../assets/bitcoin.png";

const Home = () => {
	return (
		<Box bgColor={"blackAlpha.900"} w={"full"} h={"90vh"}>
			<Image
				w={"full"}
				h={"80vh"}
				objectFit={"contain"}
				src={btcSrc}
				filter={"grayscale(1)"}
				p={"7"}
			/>
			<Text
				fontSize={"6xl"}
				textAlign={"center"}
				fontWeight={"bold"}
				mt={"-7"}
				bgGradient={"linear-gradient(147deg, #d7d7d7 0%, #353535 74%)"}
				bgClip={"text"}
				color={"transparent"}
			>
				Kryptalio
			</Text>
		</Box>
	);
};

export default Home;
