import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import {useTheme} from "@mui/material";
const SuccessRegister = ({ fullName }) => {
	const navigate = useNavigate();
	const { width, height } = useWindowSize();
	const theme = useTheme()
	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			sx={{ minHeight: "90vh" }}
		>
			<Confetti width={width} height={height} opacity={0.5}/>
			<Box 
				display="flex"
				flexDirection="column"
				gap={4}
				alignItems="center"
				justifyContent="center"
				sx={{ width: "70%" }}
			>
				<Typography variant="h3" align="center">
					Thank you, <span style={{color: theme.palette.primary.main}}>{fullName}</span> for registering as a blood donor!
				</Typography>
				<Typography variant="h4" align="center">
					Your kindness saves lives. Together, we make a difference.
				</Typography>
				<Button variant="contained" onClick={() => navigate("/")}>
					Home
				</Button>
			</Box>
		</Box>
	);
};

export default SuccessRegister;
