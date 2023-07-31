import * as yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import FormTextField from "../components/FormTextField";
import AppMap from "./AppMap";
import { useRef, useState } from "react";
import {
	Stack,
	Button,
	Box,
} from "@mui/material";
import axios from "axios";

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

const DonorRegisterForm = () => {
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

	const handleSubmit = async (values) => {
		const location = {
			latitude: newPlace?.lat,
			longitude: newPlace?.lng
		}
		values.location = location
		console.log(location)
		console.log(values);
		const res = await axios.post('/donor/register', {...values})
		console.log(res)
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
				<form
					onSubmit={handleSubmit}
					style={{ width: "70%" }}
					encType="multipart/form-data"
				>
					<Stack direction="column" spacing={2}>
						<FormTextField
							id="fullName"
							label="Full name"
							value={values.fullName}
							handleChange={handleChange}
							handleBlur={handleBlur}
							touched={touched}
							errors={errors}
						/>
						<Box display="flex" gap={2}>
							<FormTextField
								id="age"
								label="Age"
								value={values.age}
								handleChange={handleChange}
								handleBlur={handleBlur}
								touched={touched}
								errors={errors}
								isNumber={true}
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
						<Box display="flex" gap={2}>
							<Field
								component="select"
								id="bloodGroup"
								value={values.bloodGroup}
								name="bloodGroup"
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
							<ErrorMessage name="bloodGroup" />
							<Field
								component="select"
								name="gender"
								id="gender"
								value={values.gender}
							>
								<option disabled selected value="">
									Gender
								</option>
								<option value={"Male"}>Male</option>
								<option value={"Female"}>Female</option>
							</Field>
							<ErrorMessage name="gender" />
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
                            width="50vw"
                            height="50vh"
                            display={"flex"}
                            gap={4}
                            p={3}
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
					</Stack>
					<Button
						type="submit"
						variant="contained"
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
