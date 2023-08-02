import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/blood-icon.png"
const Navbar = () => {
    const navigate = useNavigate()
	return (
		<AppBar position="static">
			<Toolbar style={{backgroundColor: "#000"}}>
				<img src={logo} alt="Donor" height="50px"/>
				<Typography variant="h5" component="div" sx={{ flexGrow: 1, ml: "8px"}}>
					DONOR
				</Typography>
				<Box display="flex" gap={2}>
                <Button variant="contained" onClick={() => navigate('/register')}>Become a donor</Button>
				<Button variant="contained" onClick={() => navigate('/login')}>Change donor status</Button>
                </Box>
			</Toolbar>
		</AppBar>
	);
};
export default Navbar;