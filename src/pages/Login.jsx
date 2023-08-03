import LoginForm from "../components/LoginForm";
import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Login = () => {
	const [isDonor, setIsDonor] = useState(null);
	const [token, setToken] = useState(null);
	const [donorName, setDonorName] = useState("");
	const theme = useTheme();
	const navigate = useNavigate()
	const handleStatusChange = async () => {
		try {
			const res = await axios.patch(
				"/donor/update",
				{},
				{
					headers: {
						"Authorization": `Bearer ${token}`,
					},
				}
			);
			setIsDonor(res?.data?.isDonating);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Box
			display="grid"
			gridTemplateColumns="1fr 1fr"
			p={4}
			alignItems="center"
			justifyContent="center"
		>
			<Box
				display="flex"
				flexDirection="column"
				gap={3}
				justifyContent="center"
				alignItems="flex-start"
				p={theme.spacing(4, 0, 4, 8)}
			>
				<Typography variant="h2" color="primary" maxWidth="80%">
					Welcome back, Lifesaver!
				</Typography>
				<Typography variant="h5" sx={{ fontWeight: "300" }} maxWidth="80%">
					Your login grants you the power to update your status and make an
					impact. Whether you're ready to donate again or need to take a break,
					this is your platform to let us know.
				</Typography>
				<Typography variant="h6" sx={{ fontWeight: "300" }} maxWidth="80%">
					Login now and change your status with just a few clicks. Your kindness
					and commitment are appreciated beyond measure.
				</Typography>
				<Typography variant="h5" sx={{ fontWeight: "400" }} maxWidth="80%">
					Thank you for being a lifeline for those in need!
				</Typography>
				<Button variant="contained" onClick={() => navigate('/')}>Home</Button>
			</Box>
			<Box>
				<LoginForm
					setIsDonor={setIsDonor}
					setToken={setToken}
					setDonorName={setDonorName}
				/>
				{isDonor != null && (
					<Box
						pt={4}
						display="flex"
						flexDirection="column"
						gap={2}
						alignItems="flex-start"
					>
						<Typography variant="h4">
							Welcome back,{" "}
							<span style={{ color: theme.palette.primary.main }}>
								{donorName}
							</span>
						</Typography>
						<Typography variant="h6" fontWeight="300">
							You current status is:{" "}
							<span style={{fontSize: "1.5rem", color: theme.palette.primary.main}}>{isDonor ? "Donating" : "Not donating"}</span>
						</Typography>
						<Button onClick={handleStatusChange} variant="contained">
							Change Status
						</Button>
					</Box>
				)}
			</Box>
		</Box>
	);
};
export default Login;
