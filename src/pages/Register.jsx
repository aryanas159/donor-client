import { Box, Typography } from "@mui/material";
import DonorRegisterForm from "../components/DonorRegisterForm";
import { grey } from "@mui/material/colors";
import SuccessRegister from "../components/SuccessRegister";
import { useState } from "react";
const Register = () => {
	const [success, setSuccess] = useState(false);
	const [fullName, setFullName] = useState("");

	return (
		<Box display="flex" p={4} alignItems="center" justifyContent="center">
			{success ? (
				<SuccessRegister fullName={fullName} />
			) : (
				<Box
					display="flex"
					gap={4}
					backgroundColor={grey[200]}
					p={4}
					maxWidth="70vw"
					justifyContent="center"
				>
					<Box
						display="flex"
						flexDirection="column"
						gap={2}
						p={4}
						alignItems="center"
					>
						<Typography variant="h5">
							Be a Lifesaver: Register as a Blood Donor Today!
						</Typography>
						<Typography variant="h7">
							Welcome to our blood donating community! Your decision to become a
							blood donor can save lives and make a real difference. Register
							now to join us in this noble cause and help those in need. Every
							donation counts, and together, we can create a healthier and
							happier community.
						</Typography>
					</Box>
					<Box display="flex">
						<DonorRegisterForm
							setSuccess={setSuccess}
							setFullName={setFullName}
						/>
					</Box>
				</Box>
			)}
		</Box>
	);
};
export default Register;
