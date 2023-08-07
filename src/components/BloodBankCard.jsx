import { Avatar, Box, Stack, Typography } from "@mui/material";
import BloodBankIcon from "../assets/blood-bank-icon.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const BloodBankCard = ({ placeId, title, gps_coordinates, myLocation, hours }) => {
	const navigate = useNavigate();
    const [distance, setDistance] = useState(null)
    function deg2rad(deg) {
		return deg * (Math.PI / 180);
	}
	function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
		var R = 6371; // Radius of the earth in km
		var dLat = deg2rad(lat2 - lat1); // deg2rad below
		var dLon = deg2rad(lon2 - lon1);
		var a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(deg2rad(lat1)) *
				Math.cos(deg2rad(lat2)) *
				Math.sin(dLon / 2) *
				Math.sin(dLon / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c; // Distance in km
		return d;
	}
    useEffect(() => {
        const dist = getDistanceFromLatLonInKm(gps_coordinates.latitude, gps_coordinates.longitude, myLocation.lat, myLocation.lng)
        setDistance(dist)
    }, [gps_coordinates, myLocation])
	return (
		<Box
			display="flex"
			gap={1}
			borderRadius={2}
			p={1}
			sx={{ cursor: "pointer" }}
            onClick={() => navigate(`/blood-bank/${placeId}?dist=${Number(distance).toFixed(1)}`)}
		>
			<Avatar alt="donor" src={BloodBankIcon} sx={{zIndex: "1"}}/>
			<Stack spacing="2px">
				<Typography variant="h5" fontSize={14}>
					{title}
				</Typography>
					{/* <Typography variant="h6" fontSize={10}>
						{address}
					</Typography> */}
					<Box display="flex" gap={2}>
					<Typography variant="h6" fontSize={10}>
						{distance?.toFixed(1)} KM
					</Typography>
					<Typography variant="h6" fontSize={10}>
						{hours}
					</Typography>
					</Box>
			</Stack>
		</Box>
	);
};
export default BloodBankCard;
