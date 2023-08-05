import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	Box,
	Typography,
} from "@mui/material";
import UserCard from "./UserCard";
import { CircularProgress } from "@mui/material";

const SelectBloodType = ({
	handleSearch,
	bloodType,
	setBloodType,
	results,
	isLoading,
}) => {
	return (
		<Box display="flex" flexDirection="column" gap={2} flex={1}>
			<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
				<InputLabel id="demo-simple-select-label">Blood Type</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={bloodType}
					label="Blood Type"
					onChange={(e) => setBloodType(e.target.value)}
					// variant="standard"
				>
					<MenuItem value={"A"}>A+</MenuItem>
					<MenuItem value={"A-"}>A-</MenuItem>
					<MenuItem value={"B"}>B+</MenuItem>
					<MenuItem value={"B-"}>B-</MenuItem>
					<MenuItem value={"AB"}>AB+</MenuItem>
					<MenuItem value={"AB-"}>AB-</MenuItem>
					<MenuItem value={"O"}>O+</MenuItem>
					<MenuItem value={"O-"}>O-</MenuItem>
				</Select>
				<Button
					variant="contained"
					style={{ margin: "24px 4px 0px 4px" }}
					onClick={handleSearch}
				>
					Search for donors
					{isLoading && (
						<CircularProgress
							size={20}
							sx={{ color: "#fff", marginLeft: "10px" }}
						/>
					)}
				</Button>
			</FormControl>
			{results && (
				<Typography>{results?.length} blood donors found</Typography>
			)}
			<Box
				display="flex"
				flexDirection="column"
				gap={2}
				sx={{maxHeight: {xs: "50vh", sm: "40vh"}}}
				overflow="hidden scroll"
			>
				{!!results?.length && (
					<>
						{results.map(
							({ _id, fullName, age, bloodGroup, distance, gender, isDonating }) => (
								<UserCard
									donorId={_id}
									fullName={fullName}
									age={age}
									bloodGroup={bloodGroup}
									distance={distance}
									gender={gender}
									isDonating={isDonating}
								/>
							)
						)}
					</>
				)}
			</Box>
		</Box>
	);
};

export default SelectBloodType;
