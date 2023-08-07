import Map, { Marker } from "react-map-gl";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";

function useQuery() {
	const { search } = useLocation();

	return useMemo(() => new URLSearchParams(search), [search]);
}

const BloodBankInfo = () => {
	const { placeId } = useParams();
	const theme = useTheme();
	let query = useQuery();
	const [bloodBank, setBloodBank] = useState(null);
	const getPlace = async () => {
		const res = await axios.get(
			`${window.location.origin}/search?engine=google_local&api_key=${
				import.meta.env.VITE_MAP_API
			}&q=Blood+banks&ludocid=${placeId}`
		);
		setBloodBank(res?.data?.local_results[0]);
		setViewport({
			latitude: Number(res?.data?.local_results[0]?.gps_coordinates?.latitude),
			longitude: Number(
				res?.data?.local_results[0]?.gps_coordinates?.longitude
			),
			zoom: 14,
			pitch: 0,
			antialias: true,
		});
	};
	useEffect(getPlace, [placeId]);

	const isMobile = useMediaQuery("(max-width: 600px)");

	const navigate = useNavigate();
	const mapRef = useRef();
	let initial = {
		latitude: 28.6448,
		longitude: 77.216721,
		zoom: 9,
		pitch: 0,
		antialias: true,
	};
	const [viewport, setViewport] = useState(initial);

	return (
		<Box
			display={isMobile ? "flex" : "grid"}
			flexDirection="column"
			gap={2}
			gridTemplateColumns="1fr 1fr"
			alignItems="center"
			justifyContent="center"
			minWidth="7vw"
			minHeight="70vh"
			p={2}
		>
			<Box
				display="flex"
				flexDirection="column"
				width={isMobile ? "90vw" : "100%"}
				height={isMobile ? "40vh" : "100%"}
				alignItems="center"
				justifyContent="center"
				gap={2}
			>
				<Map
					ref={mapRef}
					mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
					{...viewport}
					onMove={(evt) => setViewport(evt.viewState)}
					mapStyle="mapbox://styles/aryanas159/clktkkbje00td01qy50hgge98"
					transitionDuration="200"
					attributionControl={true}
					style={
						isMobile
							? { borderRadius: "12px" }
							: { borderRadius: "12px", width: "60%", height: "60%" }
					}
				>
					{bloodBank && (
						<Marker
							latitude={bloodBank?.gps_coordinates?.latitude}
							longitude={bloodBank?.gps_coordinates?.longitude}
						></Marker>
					)}
				</Map>
				<Button
					variant="contained"
					onClick={() => {
						navigate("/");
						window.location.reload();
					}}
				>
					Back to Home
				</Button>
			</Box>
			<Box
				display="flex"
				flexDirection="column"
				gap={2}
				width="90%"
				height="100%"
				justifyContent="center"
				alignItems="center"
			>
				{bloodBank && (
					<>
						<Typography variant={isMobile ? "h5" : "h3"} align="center" p={2}>
							{bloodBank.title}
						</Typography>
						<Typography
							variant="h5"
							fontWeight={300}
							fontSize={isMobile ? "1.2rem" : "1.3rem"}
							align="center"
						>
							<span>{bloodBank.address}</span>{" "}
						</Typography>
						{bloodBank?.hours && (
							<Typography
								variant="h5"
								fontWeight={300}
								fontSize={isMobile ? "1.2rem" : "1.5rem"}
							>
								<span>{bloodBank.hours}</span>{" "}
							</Typography>
						)}
						<Typography
							variant="h5"
							fontWeight={300}
							fontSize={isMobile ? "1.2rem" : "1.5rem"}
						>
							<span>{bloodBank.phone}</span>{" "}
						</Typography>
						<Typography
							variant="h5"
							fontWeight={300}
							fontSize={isMobile ? "1.2rem" : "1.5rem"}
						>
							<span>{query.get("dist")} KM away</span>{" "}
						</Typography>
						<Box display="flex" gap={2}>
							{!!bloodBank?.links?.website && (
								<Button
									variant="contained"
									onClick={() => window.open(bloodBank?.links?.website)}
									
								>
									Website
								</Button>
							)}
							{!!bloodBank?.links?.directions && (
								<Button
									variant="contained"
									onClick={() => window.open(bloodBank?.links?.directions)}
								>
									Directions
								</Button>
							)}
						</Box>
					</>
				)}
			</Box>
		</Box>
	);
};

export default BloodBankInfo;
