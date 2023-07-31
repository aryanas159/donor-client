import AppMap from "../components/AppMap";
import { useState, useRef } from "react";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import axios from "axios";
import SelectBloodType from "../components/SelectBloodType";


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
	const [results, setResults] = useState([]);

	const mapRef = useRef();
	const handleSearch = async () => {
		const res = await axios.get(
			`/donor/closestDonors?lat=${newPlace?.lat}&long=${newPlace.lng}&bloodType=${bloodType}`
		);
		setResults(res?.data?.sortedListOfDonors);
	};
	return (
		<Box
			display={"flex"}
			flexDirection={"column"}
			alignItems={"center"}
			justifyContent={"center"}
		>
			<Box
				width="70vw"
				height="70vh"
				display={"flex"}
				gap={4}
				p={3}
				backgroundColor={grey[200]}
				borderRadius={6}
			>
				<SelectBloodType
					handleSearch={handleSearch}
					bloodType={bloodType}
					setBloodType={setBloodType}
					results={results}
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
