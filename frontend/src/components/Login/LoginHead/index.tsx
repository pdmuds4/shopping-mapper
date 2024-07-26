import { Box, Typography } from "@mui/material"

const LoginHead: React.FC = () => {
    return (
        <Box textAlign='center' paddingBottom='5vh'>
            <img width='50%' src='/icon-white.svg' />
            <Typography variant='h3'>Shopping Mapper</Typography>
        </Box>
    )
}

export default LoginHead