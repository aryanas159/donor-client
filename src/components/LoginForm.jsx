import * as yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import FormTextField from "./FormTextField";
import { Stack, Button, Box } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";


const LoginSchema = yup.object({
	email: yup
		.string()
		.email("Please enter a valid email")
		.required("Email is required"),
	password: yup
		.string()
		.min(6, "Password must be at least six characters")
		.required("Password is required"),
});
const initialValues = {
	email: "",
	password: "",
};

const LoginForm = ({ setIsDonor, setToken, setDonorName, setIsForgotPassword }) => {
	const [isLoading, setIsLoading] = useState(false);
	const isMobile = useMediaQuery("(max-width: 600px)");
	const handleSubmit = async (values) => {
		try {
			setIsLoading(true);
			const res = await axios.post("/donor/login", { ...values });
			setDonorName(res?.data?.donor?.fullName);
			setIsDonor(res?.data?.donor?.isDonating);
			setToken(res?.data?.token);
			setIsLoading(false);
		} catch (error) {
			alert(error?.response?.data?.message || error.message);
			setIsLoading(false);
		}
	};
	return (
		<Formik
			onSubmit={handleSubmit}
			initialValues={initialValues}
			validationSchema={LoginSchema}
		>
			{({
				values,
				handleSubmit,
				handleBlur,
				touched,
				errors,
				handleChange,
			}) => (
				<form
					onSubmit={handleSubmit}
					encType="multipart/form-data"
					style={{ width: isMobile ? "100%" : "70%" }}
				>
					<Stack direction="column" spacing={2}>
						<FormTextField
							id="email"
							label="Email"
							value={values.email}
							type="email"
							handleChange={handleChange}
							handleBlur={handleBlur}
							touched={touched}
							errors={errors}
						/>
						<FormTextField
							id="password"
							label="Password"
							value={values.password}
							type="password"
							handleChange={handleChange}
							handleBlur={handleBlur}
							touched={touched}
							errors={errors}
						/>
					</Stack>
					<Box display="flex" gap={2}>
						<Button
							type="submit"
							variant="contained"
							disabled={isLoading}
							sx={{
								width: { xs: "150px", sm: "200px" },
								marginTop: "20px",
							}}
						>
							Check status
						</Button>
						<Button
							variant="contained"
							disabled={isLoading}
							onClick={() => setIsForgotPassword(true)}
							sx={{
								width: { xs: "150px", sm: "200px" },
								marginTop: "20px",
							}}
						>
							Forgot password
						</Button>
					</Box>
				</form>
			)}
		</Formik>
	);
};

export default LoginForm;
