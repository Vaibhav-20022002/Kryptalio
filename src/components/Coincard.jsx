import React from "react";
import { Link } from "react-router-dom";
import { VStack, Image, Heading, Text } from "@chakra-ui/react";

const Coincard = ({
	id,
	name,
	price,
	img,
	symbol,
	currency,
	currencySymbol = "₹",
}) => {
	// currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

	return (
		<Link to={`/coin/${id}`}>
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
					{symbol}
				</Heading>

				<Text noOfLines={1}>{name}</Text>
				{/* coins those have price as 0 rae not shown in the api response */}
				<Text noOfLines={1}>{price ? `${currencySymbol}${price}` : "N/A"}</Text>
			</VStack>
		</Link>
	);
};

export default Coincard;
