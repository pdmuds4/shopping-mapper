import { Box, Container } from '@mui/material'
import { RegisterHead, RegisterForm } from '@components/Register'
import { s__registerBody } from './style'

const Register: React.FC = () => {
    return (
        <Box sx={s__registerBody}>
            <Container maxWidth='sm'>
                <RegisterHead />
                <RegisterForm />
            </Container>
        </Box>
    )
}

export default Register