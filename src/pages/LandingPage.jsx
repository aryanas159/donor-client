import AppMap from "../components/AppMap";
import { useState, useRef } from "react";
import { Box } from "@mui/material";

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

	const mapRef = useRef();

	return (
		<>
			<Box width="50vw" height="50vh">
				<AppMap
					mapRef={mapRef}
					setNewPlace={setNewPlace}
					newPlace={newPlace}
					viewport={viewport}
					setViewport={setViewport}
				/>
			</Box>
		</>
	);
};
export default LandingPage;
