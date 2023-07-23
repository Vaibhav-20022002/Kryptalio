import { VStack, Image, Heading, Text } from "@chakra-ui/react";
import React from "react";

const Exchangecard = ({ name, img, rank, url }) => {
	return (
		// target = "blank" opens a single new tab for every new link
		<a href={url} target="blank">
			<VStack
				w={"52"}
				shadow={"lg"}
				bgColor={"white"}
				p={"8"}
				transition={"all 0.3s"}
				m={"4"}
				css={{
					"&: hover": {
						transform: "scale(1.15)",
						backgroundColor: "whitesmoke",
					},
				}}
			>
				<Image
					src={img}
					w={"10"}
					h={"10"}
					objectfit={"contain"}
					alt={"Exchange"}
				/>
				{/* noOfLines = {1} will display only '1' line and extra lines are shown through '...' */}
				<Heading size={"md"} noOfLines={1}>
					{rank}
				</Heading>

				<Text noOfLines={1}>{name}</Text>
			</VStack>
		</a>
	);
};

export default Exchangecard;
