import {
	Badge,
	Box,
	Container,
	HStack,
	Image,
	Progress,
	Radio,
	RadioGroup,
	Stat,
	StatArrow,
	StatHelpText,
	StatLabel,
	StatNumber,
	Text,
	VStack,
	Tooltip,
	Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import { server } from "../index";
import ErrorPage from "./ErrorPage";
import Charts from "./Charts";

const CoinDetails = () => {
	const [coin, setCoin] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [currency, setCurrency] = useState("inr");
	const [days, setDays] = useState("24h");
	const [chartArray, setChartArray] = useState([]);

	const params = useParams();

	const btns = [
		"24h",
		"1 week",
		"2 weeks",
		"1 mon",
		"2 mon",
		"6 mon",
		"1 yr",
		"max",
	];

	const currencySymbol =
		currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

	const switchDays = (i) => {
		switch (i) {
			case "24h":
				setDays("24h");
				// setLoading(true);
				break;

			case "1 week":
				setDays("7d");
				// setLoading(true);
				break;

			case "2 weeks":
				setDays("14d");
				// setLoading(true);
				break;

			case "1 mon":
				setDays("30d");
				// setLoading(true);
				break;

			case "2 mon":
				setDays("60d");
				// setLoading(true);
				break;

			case "6 mon":
				setDays("183d");
				// setLoading(true);
				break;

			case "1 yr":
				setDays("365d");
				// setLoading(true);
				break;

			case "max":
				setDays("max");
				// setLoading(true);
				break;

			default:
				setDays("24h");
				// setLoading(true);
				break;
		}
	};

	useEffect(() => {
		const fetchCoin = async () => {
			try {
				const { data } = await axios.get(`${server}/coins/${params.id}`);

				const { data: chartData } = await axios.get(
					`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
				);
				setCoin(data);
				setChartArray(chartData.prices);
				setLoading(false);
			} catch (error) {
				setError(true);
				setLoading(false);
			}
		};

		fetchCoin();
	}, [params.id, currency, days]);

	if (error) {
		return <ErrorPage message={"Error while fetching Coins"} />;
	}

	return (
		<Container maxW={"container.xl"}>
			{loading ? (
				<Loader />
			) : (
				<>
					<RadioGroup m={"4"} value={currency} onChange={setCurrency} px={"9"}>
						<HStack>
							<Radio value="inr">₹ INR</Radio>
							<Radio value="usd">$ USD</Radio>
							<Radio value="eur">€ EUR</Radio>
						</HStack>
					</RadioGroup>

					<VStack spacing={"4"} p={"7"} alignItems={"flex-start"}>
						<Text fontSize={"small"} alignSelf={"center"} opacity={0.8}>
							Last Updated on :{" "}
							{new Date(coin.market_data.last_updated).toUTCString()}
						</Text>
						<Image
							src={coin.image.large}
							w={"16"}
							h={"16"}
							objectFit={"contain"}
						></Image>

						<Stat>
							<StatLabel>{coin.name}</StatLabel>
							<StatNumber>
								{currencySymbol}
								{coin.market_data.current_price[currency]}
							</StatNumber>
							<StatHelpText>
								<StatArrow
									type={
										coin.market_data.price_change_percentage_24h >= 0
											? "increase"
											: "decrease"
									}
								/>
								{coin.market_data.price_change_percentage_24h.toFixed(5) + "%"}
							</StatHelpText>
						</Stat>
						<Badge
							fontSize={"xl"}
							bgColor={"blackAlpha.900"}
							textColor={"white"}
						>{`#${coin.market_cap_rank}`}</Badge>

						{/* DECLARED BELOW (IT IS CUSTOM MADE) */}
						<CustomBar
							high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
							low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
							valueNow={
								((coin.market_data.current_price[currency] -
									coin.market_data.low_24h[currency]) /
									(coin.market_data.high_24h[currency] -
										coin.market_data.low_24h[currency])) *
								100
							}
							markValue={`${currencySymbol}${coin.market_data.current_price[currency]}`}
						/>

						<Box w={"full"} p={"4"}>
							<Item
								title={"Max Supply"}
								value={coin.market_data.max_supply}
								sno={1}
							/>
							<Item
								title={"Circulating Supply"}
								value={coin.market_data.circulating_supply}
								sno={2}
							/>
							<Item
								title={"Market Cap"}
								value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
								sno={3}
							/>
							<Item
								title={"All Time Low"}
								value={`${currencySymbol}${coin.market_data.atl[currency]}`}
								sno={4}
							/>
							<Item
								title={"All Time High"}
								value={`${currencySymbol}${coin.market_data.ath[currency]}`}
								sno={5}
							/>
						</Box>
					</VStack>

					<Box w={"full"} borderWidth={1} m={1}>
						<Charts arr={chartArray} currency={currencySymbol} days={days} />
						{/* {window.scrollTo(0, 0)} */}
					</Box>

					<HStack p={"4"} wrap={"wrap"} justifyContent={"center"}>
						{btns.map((i) => (
							<Button
								key={i}
								bgColor={"blackAlpha.100"}
								onClick={() => {
									switchDays(i);
									// window.scrollTo(0, 0);
								}}
							>
								{i}
							</Button>
						))}
					</HStack>
				</>
			)}
		</Container>
	);
};

const Item = ({ title, value, sno }) => {
	let clr;
	if (sno % 2 !== 0) clr = "blackAlpha.300";
	else clr = "transparent.800";

	return (
		<HStack
			justifyContent={"space-between"}
			w={"full"}
			my={"4"}
			bgColor={clr}
			borderRadius={"base"}
		>
			<Text
				fontFamily={"Victor Mono"}
				fontWeight={"bold"}
				letterSpacing={"widest"}
				px={"2.5"}
			>
				{title}
			</Text>
			<Text px={"2.5"}>{value}</Text>
		</HStack>
	);
};

const CustomBar = ({ high, low, valueNow, markValue }) => (
	<VStack w={"full"}>
		<Tooltip hasArrow label={markValue} placement="top" bg="black">
			<Progress
				value={valueNow}
				colorScheme={"telegram"}
				w={"full"}
				border={"1px solid lightgray"}
			/>
		</Tooltip>
		<HStack justifyContent={"space-between"} w={"full"}>
			<Badge children={low} colorScheme={"red"} />
			<Text fontSize={"sm"}>24H Range</Text>
			<Badge children={high} colorScheme={"green"} />
		</HStack>
	</VStack>
);

export default CoinDetails;
