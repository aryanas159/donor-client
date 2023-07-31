import { Stack, Typography } from "@mui/material"
const Place = ({placeName, handlePlaceSelect}) => {
    const parts = placeName.split(",");
    const heading = parts.shift()
    return (
        <Stack style={{cursor: 'pointer', padding: "4px 8px"}} onClick={handlePlaceSelect}>
            <Typography variant="h7" fontSize={14}>{heading}</Typography>
            <Typography variant="h8" fontSize={12}>{parts.join(',')}</Typography>
        </Stack>
    )
}
export default Place;