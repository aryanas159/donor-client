import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SuccessRegister = ({ fullName }) => {
    const navigate = useNavigate()
	return (
		<Box display="flex" flexDirection="column" gap={2}>
			<Typography variant="h4">
				Thank you, {fullName} for registering as a blood donor!
			</Typography>
			<Typography variant="h4">
				Your kindness saves lives. Together, we make a difference.
			</Typography>
            <Button onClick={() => navigate('/')}>
                Home 
            </Button>
		</Box>
	);
};

export default SuccessRegister;