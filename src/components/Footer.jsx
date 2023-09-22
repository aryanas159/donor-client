import React from "react";
import { Box, Typography } from "@mui/material";

const Person = ({name, email}) => {
    return (
        <Box>
            <Typography fontSize={14}>{name}</Typography>
            <Typography fontSize={12}>{email}</Typography>
        </Box>
    )
}
function Footer() {
	return (
        <Box 
            sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                gap: "24px",
                pt: "24px",
                pl: "24px",
            }}
        >
            <Person
                name="Krish dave"
                email="davekrish09@gmail.com"
            />
            <Person
                name="Shreyansh Kumar"
                email="2022uch1332@mnut.ac.in"
            />
            <Person
                name="Karan agrawal"
                email="2022uch1045@mnit.ac.in"
            />
        </Box>
    );
}

export default Footer;

