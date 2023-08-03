import { Avatar, Box, Stack, Typography } from "@mui/material"
import DonorIcon from '../assets/donor.png'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
const UserCard = ({donorId, fullName, age, bloodGroup, distance, gender, isDonating}) => {
    const navigate = useNavigate()
    const [newBloodGroup, setNewBloodGroup] = useState(bloodGroup)
    const formatBloodGroup = () => {
        if (['A', 'B', 'AB', 'O'].includes(bloodGroup)) {
            console.log(bloodGroup)
            setNewBloodGroup(bloodGroup + "+")
        }
    }
    useEffect(formatBloodGroup, [bloodGroup])
    return (
        <Box display="flex" gap={1} borderRadius={2} p={1} sx={{cursor: "pointer"}} onClick={() => navigate(`/${donorId}?dist=${Number(distance).toFixed(1)}`)}>
            <Avatar alt="donor" src={DonorIcon}/>
            <Stack>
                <Typography variant="h5" fontSize={14}>{fullName}</Typography>
                <Box display="flex" gap={2}>
                <Typography variant="h6" fontSize={10}>{age}</Typography>
                <Typography variant="h6" fontSize={10}>{gender}</Typography>
                <Typography variant="h6" fontSize={10}>{newBloodGroup}</Typography>
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