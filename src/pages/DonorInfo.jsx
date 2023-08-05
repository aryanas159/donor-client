import Map, { Marker } from "react-map-gl";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
function useQuery() {
	const { search } = useLocation();

	return useMemo(() => new URLSearchParams(search), [search]);
}

const DonorInfo = () => {
	const { id } = useParams();
	let query = useQuery();
	const [donor, setDonor] = useState(null);
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
	const getDonorInfo = async () => {
		const res = await axios.get(`/donor/${id}`);
		setDonor(res?.data?.donor);
		setViewport({
			latitude: Number(res?.data?.donor?.location?.latitude),
			longitude: Number(res?.data?.donor?.location?.longitude),
			zoom: 14,
			pitch: 0,
			antialias: true,
		});
	};
	useEffect(getDonorInfo, [id]);
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
					style={isMobile ? { borderRadius: "12px"} : { borderRadius: "12px", width: "60%", height: "60%" }}
				>
					{donor && (
						<Marker
							latitude={donor?.location?.latitude}
							longitude={donor?.location?.longitude}
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
				width="100%"
				height="100%"
				justifyContent="center"
			>
				{donor && (
					<>
						<Typography variant="h5" fontWeight={300} color={"primary"} fontSize={isMobile ? "1.2rem" : "1.5rem"}>
							Name - <span style={{ color: "#fff" }}>{donor.fullName}</span>{" "}
						</Typography>
						<Typography variant="h5" fontWeight={300} color={"primary"} fontSize={isMobile ? "1.2rem" : "1.5rem"}>
							Age - <span style={{ color: "#fff" }}>{donor.age}</span>{" "}
						</Typography>
						<Typography variant="h5" fontWeight={300} color={"primary"} fontSize={isMobile ? "1.2rem" : "1.5rem"}>
							Blood Group -{" "}
							<span style={{ color: "#fff" }}>{donor.bloodGroup}</span>{" "}
						</Typography>
						<Typography variant="h5" fontWeight={300} color={"primary"} fontSize={isMobile ? "1.2rem" : "1.5rem"}>
							Gender - <span style={{ color: "#fff" }}>{donor.gender}</span>{" "}
						</Typography>
						<Typography variant="h5" fontWeight={300} color={"primary"} fontSize={isMobile ? "1.2rem" : "1.5rem"}>
							Address - <span style={{ color: "#fff" }}>{donor.address}</span>{" "}
						</Typography>
						<Typography variant="h5" fontWeight={300} color={"primary"} fontSize={isMobile ? "1.2rem" : "1.5rem"}>
							Phone no. -{" "}
							<span style={{ color: "#fff" }}>+91{donor.phoneNo}</span>{" "}
						</Typography>
						<Typography variant="h5" fontWeight={300} color={"primary"} fontSize={isMobile ? "1.2rem" : "1.5rem"}>
							Email - <span style={{ color: "#fff" }}>{donor.email}</span>{" "}
						</Typography>
						<Typography variant="h5" fontWeight={300} color={"primary"} fontSize={isMobile ? "1.2rem" : "1.5rem"}>
							Distance from your location -{" "}
							<span style={{ color: "#fff" }}>{query.get("dist")} KM</span>{" "}
						</Typography>
						<Typography variant="h5" fontWeight={300} color={"primary"} fontSize={isMobile ? "1.2rem" : "1.5rem"}>
							Donor status -{" "}
							<span style={{ color: "#fff" }}>
								{donor.isDonating ? "Donating" : "Not donating"}
							</span>{" "}
						</Typography>
					</>
				)}
			</Box>
		</Box>
	);
};
export default DonorInfo;
