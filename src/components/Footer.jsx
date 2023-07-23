import {
	Avatar,
	Box,
	Stack,
	VStack,
	Text,
	HStack,
	Link,
} from "@chakra-ui/react";
import React from "react";
import {
	FaInstagram,
	FaTwitter,
	FaFacebook,
	FaLinkedin,
	FaGithub,
} from "react-icons/fa";

const Footer = () => {
	return (
		<Box
			bgColor={"blackAlpha.900"}
			color={"whiteAlpha.700"}
			minH={"48"}
			px={"16"}
			py={["16", "8"]}
		>
			<Stack direction={["column", "row"]} h={"full"} alignItems={"center"}>
				<VStack w={"full"} alignItems={["center", "flex-start"]}>
					<Text fontWeight={"bold"} fontSize={"lg"}>
						About us
					</Text>
					<Text
						fontSize={"sm"}
						fontWeight={"extrabold"}
						letterSpacing={"widest"}
						textAlign={["center", "left"]}
						color={"ThreeDDarkShadow"}
					>
						We are the best crypto trading app in India, we provide our guidance
						at a reasonable price!
					</Text>
				</VStack>

				<VStack>
					<Avatar
						name="Vaibhav Vaibhav"
						boxSize={"28"}
						mt={["4", "0"]}
						bg={"blackAlpha.900"}
					/>
					<Text>VaibhavVaibhav</Text>
					<HStack>
						<Link
							href="https://www.facebook.com/profile.php?id=100010894293303&mibextid=ZbWKwL"
							isExternal
						>
							<FaFacebook />
						</Link>
						<Link
							href="https://instagram.com/vaibhav_vaibhav2002?igshid=YmM0MjE2YWMzOA=="
							isExternal
						>
							<FaInstagram />
						</Link>
						<Link
							href="https://twitter.com/vibhu20022002?t=ADK5eISsu7xrHSLsITIWEg&s=09"
							isExternal
						>
							<FaTwitter />
						</Link>
						<Link
							href="https://www.linkedin.com/in/vaibhav-vaibhav-664761264"
							isExternal
						>
							<FaLinkedin />
						</Link>
						<Link href="https://github.com/Vaibhav-20022002" isExternal>
							<FaGithub />
						</Link>
					</HStack>
				</VStack>
			</Stack>
		</Box>
	);
};

export default Footer;
