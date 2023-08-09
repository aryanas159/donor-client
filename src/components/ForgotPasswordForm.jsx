import { Stack, Button, Box, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [otpHash, setOtpHash] = useState(null);
	const [otp, setOtp] = useState("");
	const [isVerified, setIsVerified] = useState(false);
	const [newPassword, setNewPassword] = useState("");
	const handleOtpGeneration = async () => {
		try {
			setIsLoading(true);
			const otpReq = await axios.post("/otp/generate", { email });
			const { otpHash } = otpReq.data;
			setOtpHash(otpHash);
			setIsLoading(false);
		} catch (error) {
			alert("There was an error in generating OTP, please try again later.");
			console.log(error);
			setIsLoading(false);
		}
	};
	const handleOtpVerification = async () => {
        setIsLoading(true)
		const verifyOtp = await axios.post("/otp/verify", { otpHash, otp });
		const { verified } = verifyOtp.data;
		if (!verified) {
			alert("Otp incorrect");
            setIsLoading(false)
		}
		setIsVerified(verified);
        setIsLoading(false)
	};
	const handleNewPassword = async () => {
		try {
            setIsLoading(true)
			const res = await axios.patch("/donor/changePassword", {
				email,
				newPassword,
			});
			alert("Your password has been changed successfully");
            setIsLoading(false)
			window.location.reload();
		} catch (error) {
			alert(error.message);
            setIsLoading(false)
			console.log(message);
		}
	};
	return (
		<Box display="flex" flexDirection="column" gap={2} sx={{width: {xs: "100%", sm: "70%"}}}>
			<Stack direction="column" spacing={2}>
				{!isVerified ? (
					<>
						<TextField
							variant="standard"
							label="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							sx={{
								width: "100%",
								"& .MuiInputBase-input": {
									fontWeight: "300",
								},
								"& .MuiFormLabel-root": {
									fontSize: { xs: "0.9rem", sm: "1rem" },
								},
							}}
						/>
						{otpHash && (
							<TextField
								variant="standard"
								label="OTP"
								value={otp}
								onChange={(e) => setOtp(e.target.value)}
								sx={{
									width: "100%",
									"& .MuiInputBase-input": {
										fontWeight: "300",
									},
									"& .MuiFormLabel-root": {
										fontSize: { xs: "0.9rem", sm: "1rem" },
									},
								}}
							/>
						)}
					</>
				) : (
					<TextField
						variant="standard"
						label="New password"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						sx={{
							width: "100%",
							"& .MuiInputBase-input": {
								fontWeight: "300",
							},
							"& .MuiFormLabel-root": {
								fontSize: { xs: "0.9rem", sm: "1rem" },
							},
						}}
					/>
				)}
			</Stack>
			{isVerified ? (
				<Button
					variant="contained"
					onClick={handleNewPassword}
                    disabled={isLoading}
					sx={{
						width: { xs: "150px", sm: "200px" },
						marginTop: "20px",
					}}
				>
					Change password
				</Button>
			) : (
				<Button
					variant="contained"
					onClick={otpHash ? handleOtpVerification : handleOtpGeneration}
                    disabled={isLoading}
					sx={{
						width: { xs: "150px", sm: "200px" },
						marginTop: "20px",
					}}
				>
					{otpHash ? "Verify OTP" : "Send OTP"}
				</Button>
			)}
		</Box>
	);
};

export default ForgotPassword;
