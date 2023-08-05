import { Box, Typography } from "@mui/material";
import DonorRegisterForm from "../components/DonorRegisterForm";
import { grey } from "@mui/material/colors";
import SuccessRegister from "../components/SuccessRegister";
import { useState } from "react";
import { useTheme } from "@mui/material";
import person from "../assets/image3.png";
import text from "../assets/text.png";
import logo from "../assets/blood-icon.png";
import { useMediaQuery } from "@mui/material";
const Register = () => {
	const [success, setSuccess] = useState(false);
	const [fullName, setFullName] = useState("");
	const isMobile = useMediaQuery("(max-width: 600px)");
	const theme = useTheme();
	return (
		<Box display="flex" p={4} alignItems="center" justifyContent="center">
			{success ? (
				<SuccessRegister fullName={fullName} />
			) : (
				<Box
					display="grid"
					sx={
						isMobile
							? { gridTemplateRows: ".95fr 1fr" }
							: { gridTemplateColumns: "1fr 1fr" }
					}
					gap={4}
					p={isMobile ? 0 : 4}
					maxWidth={isMobile ? "100vw" : "75vw"}
					border={isMobile ? "none" : "1px solid #fff"}
				>
					<Box
						display="flex"
						flexDirection="column"
						gap={2}
						p={4}
						alignItems="center"
						height="100%"
						position="relative"
					>
						<img
							src={logo}
							alt="bloodIcon"
							width={isMobile ? "60px" : "100px"}
							style={{ position: "absolute", left: "4%", top: "4%" }}
						/>

						<img
							src={person}
							alt="person"
							width={isMobile ? "260px" : "300px"}
							style={{ position: "absolute", right: "0px", top: "0px" }}
						/>

						<img
							src={text}
							alt="text"
							width={isMobile ? "200px" : "250px"}
							style={{ position: "absolute", left: "40px", top: "48%" }}
						/>
						<Box
							sx={{
								position: "absolute",
								bottom: {xs: "5%", sm: "8%"},
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
