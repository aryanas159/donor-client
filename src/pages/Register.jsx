import { Box, Typography } from "@mui/material";
import DonorRegisterForm from "../components/DonorRegisterForm";
import { grey } from "@mui/material/colors";
import SuccessRegister from "../components/SuccessRegister";
import { useState } from "react";
import { useTheme } from "@mui/material";
import person from "../assets/image3.png";
import text from "../assets/text.png";
import logo from "../assets/blood-icon.png";
const Register = () => {
	const [success, setSuccess] = useState(false);
	const [fullName, setFullName] = useState("");
	const theme = useTheme();
	return (
		<Box display="flex" p={4} alignItems="center" justifyContent="center">
			{
			success ? (
				<SuccessRegister fullName={fullName} />
			) : (
				<Box
					display="grid"
					gridTemplateColumns="1fr 1fr"
					gap={4}
					p={4}
					maxWidth="75vw"
					border="1px solid #fff"
				>
					<Box
						display="flex"
						flexDirection="column"
						gap={2}
						p={4}
						alignItems="center"
						position="relative"
					>
						<img
							src={logo}
							alt="bloodIcon"
							width="100px"
							style={{ position: "absolute", left: "5%", top: "5%" }}
						/>

						<img
							src={person}
							alt="person"
							width="300px"
							style={{ position: "absolute", right: "0px", top: "0px" }}
						/>

						<img
							src={text}
							alt="text"
							width="250px"
							style={{ position: "absolute", left: "40px", top: "48%" }}
						/>
						<Box
							sx={{
								position: "absolute",
								bottom: "8%",
							}}
						>
							<Typography
								sx={{
									fontSize: "1.2rem",
									fontWeight: "300",
								}}
							>
								<span
									style={{
										fontSize: "1.4rem",
										color: theme.palette.primary.main,
									}}
								>
									Welcome
								</span>{" "}
								to our blood donating community!
							</Typography>
							<Typography
								sx={{
									fontSize: "1rem",
									fontWeight: "300",
								}}
							>
								Your decision to become a blood donor can save lives and make a
								real difference. Register now to join us in this noble cause and
								help those in need.
							</Typography>
						</Box>
					</Box>
					<Box display="flex" flex={1}>
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
