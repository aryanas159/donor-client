import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import personImage from "../assets/image1.png";
import bgImage from "../assets/image2.png";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Hero = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery("(max-width: 600px)");
	const navigate = useNavigate();

	return (
		<Box
			backgroundColor="#000000"
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			p={4}
			position="relative"
			width="100%"
		>
			<Typography
				variant={isMobile ? "h3" : "h2"}
				align="center"
				sx={{
					color: "#fff",
					fontWeight: "600",
					fontFamily: "Arial",
					fontStretch: "condensed",
				}}
			>
				<span style={{ color: "red" }}>GIVE BLOOD</span> GIVE LIFE
			</Typography>
			<Box p={"5px 8px"} backgroundColor={theme.palette.primary.second} mt={2}>
				<Typography variant={isMobile ? "h7" : "h6"} color="#fff">
					1 DONATION CAN SAVE UPTO 3 LIVES
				</Typography>
			</Box>
			<Box maxWidth="300px" position="absolute" left="100px">
				<Typography
					sx={{
						color: "#fff",
						fontWeight: "300",
						display: { xs: "none", md: "flex" },
					}}
				>
					Our mission is to save lives and build a compassionate community of
					blood donors. Whether you're here to register as a donor or searching
					for donors in your area, you've come to the right place.
				</Typography>
			</Box>
			<Box position="relative" width="50vw" height="60vh">
				<img
					src={bgImage}
					alt="docthor"
					height={isMobile ? "250px" : "300px"}
					style={{
						position: "absolute",
						left: "50%",
						transform: "translate(-50%)",
						bottom: "0%",
					}}
				/>

				<img
					src={personImage}
					alt="docthor"
					height={isMobile ? "350px" : "450px"}
					style={{
						position: "absolute",
						left: "50%",
						transform: "translateX(-50%)",
						bottom: "0%",
					}}
				/>
			</Box>
			{isMobile && (
				<Box display="flex" flexDirection="column" gap={2} mt={4}>
					<Button variant="contained" onClick={() => navigate("/register")}>
						Become a donor
					</Button>
					<Button variant="contained" onClick={() => navigate("/login")}>
						Change donor status
					</Button>
				</Box>
			)}
		</Box>
	);
};
export default Hero;
