import AppMap from "../components/AppMap";
import { useState, useRef } from "react";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import axios from "axios";
import SelectBloodType from "../components/SelectBloodType";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

const LandingPage = () => {
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
			>
				<SelectBloodType
					handleSearch={handleSearch}
					bloodType={bloodType}
					setBloodType={setBloodType}
					results={results}
					isLoading={isLoading}
				/>
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
