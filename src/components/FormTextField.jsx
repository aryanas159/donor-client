import { TextField } from "@mui/material";

const FormTextField = ({id, label, value, handleChange, handleBlur ,touched, errors, isNumber}) => {
	return (
		<TextField
			id={id}
			variant="standard"
			label={label}
			value={value}
            type={isNumber ? "number" : "text"}
			onChange={handleChange}
			onBlur={handleBlur}
			error={touched[id] && errors[id]}
			helperText={touched[id] && errors[id]}
			sx={{
				width: { xs: "80%", sm: "100%" },
				"& .MuiInputBase-input": {
					fontWeight: "300",
				},
				"& .MuiFormLabel-root": {
					fontSize: { xs: "0.9rem", sm: "1rem" },
				},
			}}
		/>

	);
};

export default FormTextField;