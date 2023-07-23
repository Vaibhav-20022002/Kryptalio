import React, { useEffect, useState } from "react";
import { Container, HStack } from "@chakra-ui/react";
import { server } from "../index";
import axios from "axios";
import Loader from "./Loader";
import Exchangecard from "./Exchangecard";
import ErrorPage from "./ErrorPage";

const Exchanges = () => {
	const [exchanges, setExchanges] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchExchanges = async () => {
			try {
				const { data } = await axios.get(`${server}/exchanges`);
				setExchanges(data);
				setLoading(false);
			} catch (error) {
				setError(true);
				setLoading(false);
			}
		};

		fetchExchanges();
	}, []);

	if (error) {
		return <ErrorPage message={"Error while fetching Exchanges"} />;
	}

	return (
		<Container maxWidth={"Container.xl"}>
			{loading ? (
				<Loader />
			) : (
				<>
					<HStack wrap={"wrap"} justifyContent={"space-evenly"}>
						{exchanges.map((i) => (
							<Exchangecard
								key={i.id}
								name={i.name}
								img={i.image}
								rank={i.trust_score_rank}
								url={i.url}
							/>
						))}
					</HStack>
				</>
			)}
		</Container>
	);
};

export default Exchanges;
