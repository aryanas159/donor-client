import AppMap from "../components/AppMap";
import { useState, useRef } from "react";
import { Box, Switch, Avatar } from "@mui/material";
import { grey } from "@mui/material/colors";
import axios from "axios";
import SelectBloodType from "../components/SelectBloodType";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBloodBank from "../components/SearchBloodBank";
import DonorIcon from "../assets/donor.png";
import BloodBankIcon from "../assets/blood-bank-icon.png";
import { useTheme } from "@mui/material";
import { alpha } from "@mui/material";
const LandingPage = () => {
	const theme = useTheme();
	let initial = {
		latitude: 28.6448,
		longitude: 77.216721,
		zoom: 9,
		pitch: 0,
		antialias: true,
	};
	const [newPlace, setNewPlace] = useState(null);
	const [viewport, setViewport] = useState(initial);
	const [bloodType, setBloodType] = useState(null);
	const [results, setResults] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isDonorSearch, setIsDonorSearch] = useState(true);

	const mapRef = useRef();
	const handleSearch = async () => {
		try {
			setIsLoading(true);
			if (!newPlace) {
				setIsLoading(false);
				return alert("Please enter a location");
			}
			if (!bloodType) {
				setIsLoading(false);
				return alert("Please choose a blood type");
			}
			const res = await axios.get(
				`/donor/closestDonors?lat=${newPlace?.lat}&long=${newPlace.lng}&bloodType=${bloodType}`
			);
			setResults(res?.data?.sortedListOfDonors);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			alert(error.message);
			console.log(error);
		}
	};
	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			backgroundColor="#000"
			pb={4}
		>
			<Navbar />
			<Hero />
			<Box
				display={"flex"}
				sx={{
					flexDirection: { xs: "column", sm: "row" },
					width: { xs: "90vw", sm: "70vw" },
					minHeight: { xs: "90vh", sm: "70vh" },
				}}
				gap={4}
				p={3}
				mt={3}
				backgroundColor={grey[900]}
				borderRadius={6}
				position="relative"
			>
				<Box
					p={theme.spacing(0, 1, 0, 1)}
					borderRadius="30px"
					sx={{
						position: "absolute",
						top: "-40px",
						left: "0px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: alpha(theme.palette.primary.second, 0.3),
					}}
				>
					<img src={BloodBankIcon} alt="bloodBank" height="25px" />
					<Switch
						checked={isDonorSearch}
						onChange={() => {
							setIsDonorSearch((prev) => !prev);
							setResults(null)
						}}
					/>
					<img src={DonorIcon} alt="bloodBank" height="25px" />
				</Box>
				{isDonorSearch ? (
					<SelectBloodType
						handleSearch={handleSearch}
						bloodType={bloodType}
						setBloodType={setBloodType}
						results={results}
						isLoading={isLoading}
					/>
				) : (
					<SearchBloodBank
						myLocation={newPlace}
						results={results}
						setResults={setResults}
					/>
				)}

				<AppMap
					mapRef={mapRef}
					setNewPlace={setNewPlace}
					newPlace={newPlace}
					viewport={viewport}
					setViewport={setViewport}
					setResults={setResults}
					donors={results}
				/>
			</Box>
		</Box>
	);
};
export default LandingPage;
