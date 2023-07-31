import LoginForm from "../components/LoginForm";
import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
const Login = () => {
	const [isDonor, setIsDonor] = useState(null);
    const [token, setToken] = useState(null)
    const handleStatusChange = async () => {
        try {
            const res = await axios.patch('/donor/update',{} , {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setIsDonor(res?.data?.isDonating)
        } catch (error) {
            console.log(error)
        }
    }
	return (
		<Box
			display="flex"
			flexDirection="column"
			p={4}
			alignItems="center"
			justifyContent="center"
		>
			<LoginForm setIsDonor={setIsDonor} setToken={setToken}/>
			{isDonor != null && (
				<Box>
					<Typography>You current status is: {isDonor ? "Donating" : "Not donating"}</Typography>
                    <Button onClick={handleStatusChange}>Change Status</Button>
				</Box>
			)}
		</Box>
	);
};
export default Login;
