import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate()
	return (
		<AppBar position="static">
			<Toolbar style={{backgroundColor: "#fff"}}>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#000" }}>
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
