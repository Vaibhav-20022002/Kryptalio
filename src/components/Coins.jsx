import React, { useEffect, useState } from "react";
import { Container, HStack, Button, RadioGroup, Radio } from "@chakra-ui/react";
import { server } from "../index";
import axios from "axios";
import Loader from "./Loader";
import ErrorPage from "./ErrorPage";
import Coincard from "./Coincard";

const Coins = () => {
	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [currency, setCurrency] = useState("inr");
	const [page, setPage] = useState(1);

	const currencySymbol =
		currency === "inr" ? "₹" : currency === "usd" ? "$" : "€";

	const btns = new Array(60).fill(1);

	const changePage = (page) => {
		setPage(page);
		setLoading(true);
	};

	useEffect(() => {
		const fetchCoins = async () => {
			try {
				const { data } = await axios.get(
					`${server}/coins/markets?vs_currency=${currency}&page=${page}`
				);

				setCoins(data);
				setLoading(false);
			} catch (error) {
				setError(true);
				setLoading(false);
			}
		};

		fetchCoins();
	}, [currency, page]);

	if (error) {
		return <ErrorPage message={"Error while fetching Coins"} />;
	}

	return (
		<Container maxWidth={"Container.xl"}>
			{loading ? (
				<Loader />
			) : (
				<>
					<RadioGroup m={"4"} value={currency} onChange={setCurrency} p={"8"}>
						<HStack>
							<Radio value="inr">₹ INR</Radio>
							<Radio value="usd">$ USD</Radio>
							<Radio value="eur">€ EUR</Radio>
						</HStack>
					</RadioGroup>

					<HStack wrap={"wrap"} justifyContent={"space-evenly"}>
						{coins.map((i) => (
							<Coincard
								id={i.id}
								key={i.id}
								name={i.name}
								price={i.current_price}
								img={i.image}
								symbol={i.symbol}
								currency={i.currency}
								currrencySymbol={currencySymbol}
							/>
						))}
					</HStack>

					<HStack width={"full"} overflowX={"auto"} py={"2"}>
						{btns.map((item, index) => (
							<Button
								key={index}
								bgColor={"blackAlpha.900"}
								color={"white"}
								onClick={() => changePage(index + 1)}
							>
								{index + 1}
							</Button>
						))}
					</HStack>
				</>
			)}
		</Container>
	);
};

export default Coins;
