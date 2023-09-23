import React from "react";
import { Box, Typography } from "@mui/material";

const Person = ({ name, email }) => {
	return (
		<Box>
			<Typography fontSize={14}>{name}</Typography>
			<Typography fontSize={12}>{email}</Typography>
		</Box>
	);
};
function Footer() {
	return (
		<Box maxWidth="80vw" mt={8}>
			<Typography variant="h4" color="primary">
				Our Plan and Idea
			</Typography>
			<Typography variant="h6" fontWeight={300} sx={{marginBottom: "24px"}}>
				Our plan is to make an integrated system of the donors and the
				receivers.
			</Typography>
			<Typography variant="h5" color="primary">
				Problem
			</Typography>
			<Typography  variant="h7" fontWeight={300} paragraph>
				Blood banks are often fragmented and lack coordination. This can make it
				difficult to track blood inventory and ensure that blood is available
				where it is needed most.
			</Typography>
			<Typography variant="h7" fontWeight={300} paragraph>
				As per 2021 statistics, the demand and supply ratio was 1.46 vs 1.25
				crore units. In every two seconds, someone in India needs blood. It is
				estimated that over 12,000 persons die every day in India due to
				non-availability of blood.
			</Typography>
			<Typography variant="h7" fontWeight={300} paragraph>
				India has the world's largest shortage of blood, with all states
				together battling a huge shortfall of 41 million units and demand
				outstripping supply by over 400%, says the first of its kind study
				published in the journal The Lancet. And demand is rising, says the
				findings. The overall global shortfall is 100 million units.
			</Typography>
			<Typography variant="h7" fontWeight={300} paragraph>
				According to some reports, India needs 15 million units of blood each
				year but manages to collect only 11 million units, a deficit of 4
				million units. It is also estimated that nearly 12,000 individuals die
				in India each day, due to non-availability of quality blood. While this
				is one side of the coin, the other side indicates that India wastes
				about 6.5 lakh units of blood and blood components each year, due to
				lack of proper storage facilities.
			</Typography>
			<Typography variant="h7" fontWeight={300} paragraph>
				India also faces challenges in ensuring the quality and safety of blood
				products, as many blood banks do not follow the standards and guidelines
				issued by the National AIDS Control Organization (NACO) and the Drug
				Controller General of India (DCGI).
			</Typography>

			<Box
				sx={{
					display: "flex",
					width: "100%",
					alignItems: "center",
					gap: "24px",
					pt: "24px",
					pl: "24px",
				}}
			>
				<Person name="Krish dave" email="davekrish09@gmail.com" />
				<Person name="Shreyansh Kumar" email="2022uch1332@mnut.ac.in" />
				<Person name="Karan agrawal" email="2022uch1045@mnit.ac.in" />
			</Box>
		</Box>
	);
}

export default Footer;
