import {
	TextField,
	Menu,
	Box,
	Typography,
	Stack,
	CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { Collapse } from "@mui/material";
import { grey } from "@mui/material/colors";
import BloodBankCard from "./BloodBankCard";
import { useTheme, alpha } from "@mui/material";
const SearchBloodBank = ({ myLocation, results, setResults }) => {
	const theme = useTheme();
	const [searchPlace, setSearchPlace] = useState("");
	const [show, setShow] = useState(false);
	const [searchResults, setSearchResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const handlePlaceClick = async (location) => {
		try {
			if (myLocation) {
				setIsLoading(true)
				const res = await axios.get(
					`${window.location.origin}/search?engine=google_local&api_key=${
						import.meta.env.VITE_MAP_API
					}&q=Blood+banks&location=${location}`
				);
				setResults(res?.data?.local_results);
				setIsLoading(false)
			} else {
				setIsLoading(false)
				alert("Please mark your location");
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		const query = searchPlace.split(" ").join("+");
		axios
			.get(`${window.location.origin}/locations.json?q=${query}&limit=5`)
			.then((res) => {
				setSearchResults(res.data);
				console.log(res.data);
			});
	}, [searchPlace]);
	return (
		<>
			<Box
				position="relative"
				display="flex"
				flexDirection="column"
				gap={2}
				flex={1}
			>
				<Typography
					variant="h7"
					align="center"
					sx={{
						padding: "4px",
						backgroundColor: alpha(theme.palette.primary.second, 0.4),
						borderRadius: "20px",
					}}
				>
					Search for Blood banks
				</Typography>
				<Box position="relative">
					<TextField
						size="small"
						value={searchPlace}
						placeholder="Enter your city..."
						onChange={(e) => {
							setSearchPlace(e.target.value);
						}}
						onFocus={() => setShow(true)}
						onBlur={() => setShow(false)}
						fullWidth
					/>
					{isLoading && (
						<CircularProgress
							size="1.5rem"
							sx={{ position: "absolute", right: "10px", top: "8px" }}
						/>
					)}
				</Box>
				<Collapse in={show}>
					<Box
						position="absolute"
						display="flex"
						flexDirection="column"
						p={1}
						gap={1}
						backgroundColor={grey[800]}
						borderRadius={2}
						zIndex={100}
					>
						{!!searchResults?.length &&
							searchResults.map((result) => (
								<Box
									cursor="pointer"
									onClick={() => {
										handlePlaceClick(result.canonical_name);
									}}
								>
									<Typography sx={{ cursor: "pointer" }} fontSize={12}>
										{result.canonical_name}
									</Typography>
								</Box>
							))}
					</Box>
				</Collapse>
				<Stack
					sx={{
						maxHeight: { xs: "50vh", sm: "45vh" },
						overflowY: "scroll",
						zIndex: "1",
					}}
				>
					{!!results &&
						results.map((bloodBank) => (
							<BloodBankCard
								placeId={bloodBank.place_id}
								title={bloodBank.title}
								gps_coordinates={bloodBank.gps_coordinates}
								myLocation={myLocation}
								hours={bloodBank.hours}
							/>
						))}
				</Stack>
			</Box>
		</>
	);
};

export default SearchBloodBank;
