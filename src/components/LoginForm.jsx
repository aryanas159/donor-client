import * as yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import FormTextField from "./FormTextField";
import { Stack, Button } from "@mui/material";
import axios from "axios";
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

const LoginForm = ({ setIsDonor, setToken }) => {
	const handleSubmit = async (values) => {
		try {
			const res = await axios.post("/donor/login", { ...values });
			setIsDonor(res?.data?.donor?.isDonating);
            setToken(res?.data?.token)
			console.log(res);
		} catch (error) {
			console.log(error);
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
					style={{ width: "70%" }}
					encType="multipart/form-data"
				>
					<Stack direction="column" spacing={2}>
						<FormTextField
							id="email"
							label="Email"
							value={values.email}
							handleChange={handleChange}
							handleBlur={handleBlur}
							touched={touched}
							errors={errors}
						/>
						<FormTextField
							id="password"
							label="Password"
							value={values.password}
							handleChange={handleChange}
							handleBlur={handleBlur}
							touched={touched}
							errors={errors}
						/>
					</Stack>
					<Button
						type="submit"
						variant="contained"
						sx={{
							width: { xs: "150px", sm: "200px" },
							marginTop: "20px",
						}}
					>
						Check status
					</Button>
				</form>
			)}
		</Formik>
	);
};

export default LoginForm;
