import { FormControl, InputLabel, Select, MenuItem, Button, Box } from "@mui/material";
import UserCard from "./UserCard";

const SelectBloodType = ({
	handleSearch,
	bloodType,
	setBloodType,
	results,
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
					style={{ margin: "24px 4px" }}
					onClick={handleSearch}
				>
					Search for donors
				</Button>
			</FormControl>
			<Box display="flex" flexDirection="column" gap={2} overflowY="scroll">
				{!!results.length &&
					results.map(
						({ fullName, age, bloodGroup, distance, gender, isDonating }) => (
							<UserCard
								fullName={fullName}
								age={age}
								bloodGroup={bloodGroup}
								distance={distance}
								gender={gender}
								isDonating={isDonating}
							/>
						)
					)}
			</Box>
		</Box>
	);
};

export default SelectBloodType;