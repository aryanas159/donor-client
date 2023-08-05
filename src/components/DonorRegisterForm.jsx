import * as yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import FormTextField from "../components/FormTextField";
import AppMap from "./AppMap";
import { useRef, useState } from "react";
import { Stack, Button, Box } from "@mui/material";
import axios from "axios";
import { useMediaQuery } from "@mui/material";
const DonorSchema = yup.object({
	fullName: yup.string().required("Full name is required"),
	age: yup
		.number("Age must be a number")
		.max(100)
		.min(18)
		.required("Age is required"),
	phoneNo: yup
		.string()
		.matches(/^\d{10}$/, "Phone number is not valid")
		.required("Phone number is required"),
	email: yup
		.string()
		.email("Please enter a valid email")
		.required("Email is required"),
	password: yup
		.string()
		.min(6, "Password must be at least six characters")
		.required("Password is required"),
	bloodGroup: yup.string().required("Blood group is required"),
	gender: yup.string().required("Gender is required"),
	address: yup.string().required("Address is required"),
});
const initialValues = {
	fullName: "",
	age: null,
	phoneNo: "",
	email: "",
	password: "",
	bloodGroup: "",
	gender: "",
	address: "",
};

const DonorRegisterForm = ({ setSuccess, setFullName }) => {
	const isMobile = useMediaQuery("(max-width: 600px)");
	const mapRef = useRef(null);
	let initial = {
		latitude: 28.6448,
		longitude: 77.216721,
		zoom: 9,
		pitch: 0,
		antialias: true,
	};
	const [newPlace, setNewPlace] = useState(null);
	const [viewport, setViewport] = useState(initial);
	const [isLoading, setIsLoading] = useState(false);
	const [errMsg, setErrMsg] = useState("");
	const handleSubmit = async (values) => {
		try {
			if (!newPlace) {
				return alert("Please enter a location")
			}
			setIsLoading(true);
			const location = {
				latitude: newPlace?.lat,
				longitude: newPlace?.lng,
			};
			values.location = location;
			const res = await axios.post("/donor/register", { ...values });
			setIsLoading(false);
			setErrMsg("");
			setSuccess(true);
			setFullName(values.fullName);
		} catch (error) {
			setIsLoading(false);
			setErrMsg(error?.response?.data?.message || error.message);
		}
	};

	return (
		<Formik
			onSubmit={handleSubmit}
			initialValues={initialValues}
			validationSchema={DonorSchema}
		>
			{({
				values,
				handleSubmit,
				handleBlur,
				touched,
				errors,
				handleChange,
				setFieldValue,
			}) => (
				<form onSubmit={handleSubmit} encType="multipart/form-data">
					<Stack
						direction="column"
						spacing={2}
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<FormTextField
							id="fullName"
							label="Full name"
							value={values.fullName}
							handleChange={handleChange}
							handleBlur={handleBlur}
							touched={touched}
							errors={errors}
						/>
						<Box display="flex" gap={2} width="100%">
							<FormTextField
								id="age"
								label="Age"
								value={values.age}
								handleChange={handleChange}
								handleBlur={handleBlur}
								touched={touched}
								errors={errors}
								type="number"
							/>
							<FormTextField
								id="phoneNo"
								label="Phone number"
								value={values.phoneNo}
								handleChange={handleChange}
								handleBlur={handleBlur}
								touched={touched}
								errors={errors}
							/>
						</Box>
						<FormTextField
							id="email"
							label="Email"
							value={values.email}
							handleChange={handleChange}
							handleBlur={handleBlur}
							touched={touched}
							errors={errors}
							type="email"
						/>
						<FormTextField
							id="password"
							label="Password"
							value={values.password}
							handleChange={handleChange}
							handleBlur={handleBlur}
							touched={touched}
							errors={errors}
							type="password"
						/>
						<Box display="flex" gap={2} width="100%">
							<Box display="flex" flexDirection="column">
								<Field
									component="select"
									id="bloodGroup"
									value={values.bloodGroup}
									name="bloodGroup"
									style={{
										padding: "4px",
										background: "transparent",
										color: "#fff",
									}}
								>
									<option disabled selected value="">
										Blood Group
									</option>
									<option value={"A"}>A+</option>
									<option value={"A-"}>A-</option>
									<option value={"B"}>B+</option>
									<option value={"B-"}>B-</option>
									<option value={"AB"}>AB+</option>
									<option value={"AB-"}>AB-</option>
									<option value={"O"}>O+</option>
									<option value={"O-"}>O-</option>
								</Field>
								<ErrorMessage name="bloodGroup">
									{(msg) => (
										<div style={{ color: "red", fontSize: "0.8rem" }}>
											{msg}
										</div>
									)}
								</ErrorMessage>
							</Box>
							<Box display="flex" flexDirection="column">
								<Field
									component="select"
									name="gender"
									id="gender"
									value={values.gender}
									style={{
										padding: "4px",
										background: "transparent",
										color: "#fff",
									}}
								>
									<option disabled selected value="">
										Gender
									</option>
									<option value={"Male"}>Male</option>
									<option value={"Female"}>Female</option>
								</Field>
								<ErrorMessage name="gender">
									{(msg) => (
										<div style={{ color: "red", fontSize: "0.8rem" }}>
											{msg}
										</div>
									)}
								</ErrorMessage>
							</Box>
						</Box>
						<FormTextField
							id="address"
							label="Address"
							value={values.address}
							handleChange={handleChange}
							handleBlur={handleBlur}
							touched={touched}
							errors={errors}
						/>
						<Box
							width={isMobile ? "90vw" : "35vw"}
							height={isMobile ? "60vh" : "50vh"}
							display={"flex"}
							gap={4}
							p={isMobile ? 2 : 3}
							borderRadius={6}
						>
							<AppMap
								mapRef={mapRef}
								setNewPlace={setNewPlace}
								newPlace={newPlace}
								viewport={viewport}
								setViewport={setViewport}
							/>
						</Box>
						<Box color="red">{errMsg}</Box>
					</Stack>
					<Button
						type="submit"
						variant="contained"
						disabled={isLoading}
						sx={{
							width: { xs: "150px", sm: "200px" },
							marginTop: "20px",
						}}
					>
						Register
					</Button>
				</form>
			)}
		</Formik>
	);
};

export default DonorRegisterForm;
