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
			<Box maxWidth="350px" position="absolute" left="100px">
				<Typography
					sx={{
						color: "#fff",
						fontWeight: "300",
						display: { xs: "none", md: "flex" },
					}}
				>
					Red Relief, a healthcare startup, strives to eliminate deaths due to
					blood supply shortages and improve the medical supply chain within the
					country. Our grand vision extends to creating a global network for
					essential medical resources. We serve as a vital link connecting
					donors, individuals in need, cities, and states.
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
			<Box maxWidth="60%" p={2} mt={4}>
				<Typography
				textAlign={"center"}
					sx={{
						color: "#fff",
						fontWeight: "300",
						display: { xs: "none", md: "flex" },
					}}
				>
					We function as a network bridging the gap between those in need and
					blood donors, connecting people, cities, and states. We are building
					an extensive network with hospitals, blood banks, and NGOs while
					developing a comprehensive database to record, update, and display
					information about the availability and expiration of blood supplies,
					all through a real-time-based system. Our goal is to help hundreds of
					people access essential supplies in time to save the lives of their
					loved ones. We are also dedicated to raising awareness about blood
					donation by conducting social-level campaigns and expanding our reach
					to even the most remote parts of the country, providing them with
					access to this life-saving elixir. We encourage individuals to join
					this movement of spreading peace and love, making the world a better
					place to live.
				</Typography>
			</Box>
			{isMobile && (
				<Box display="flex" flexDirection="column" gap={2} mt={4} mb={4}>
					<Button
						variant="contained"
						onClick={() => {
							navigate("/register");
							window.location.reload();
						}}
					>
						Become a donor
					</Button>
					<Button
						variant="contained"
						onClick={() => {
							navigate("/login");
							window.location.reload();
						}}
					>
						Change donor status
					</Button>
				</Box>
			)}
		</Box>
	);
};
export default Hero;
