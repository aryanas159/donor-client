import { Avatar, Box, Stack, Typography } from "@mui/material"
import DonorIcon from '../assets/donor.png'
import { useEffect } from "react"
const UserCard = ({fullName, age, bloodGroup, distance, gender, isDonating}) => {
    const formatBloodGroup = () => {
        if (['A', 'B', 'AB', 'O'].includes(bloodGroup)) {
            bloodGroup = bloodGroup + '+'
        }
    }
    useEffect(formatBloodGroup, [bloodGroup])
    return (
        <Box display="flex" gap={1} backgroundColor="#fff" borderRadius={2} p={1}>
            <Avatar alt="donor" src={DonorIcon}/>
            <Stack>
                <Typography variant="h5" fontSize={14}>{fullName}</Typography>
                <Box display="flex" gap={2}>
                <Typography variant="h6" fontSize={10}>{age}</Typography>
                <Typography variant="h6" fontSize={10}>{gender}</Typography>
                <Typography variant="h6" fontSize={10}>{bloodGroup}</Typography>
                </Box>
                <Box display="flex" gap={2}>
                <Typography variant="h6" fontSize={10}>{Number(distance).toFixed(1)}KM</Typography>
                <Typography variant="h6" fontSize={10}>{!isDonating && "Currently not donating"}</Typography>
                </Box>
            </Stack>
        </Box>
    )
}
export default UserCard;