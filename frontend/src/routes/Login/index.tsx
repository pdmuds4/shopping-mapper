import { Box, Container } from '@mui/material';
import { LoginHead, LoginForm } from "@components/Login";
import { s__loginBody } from './style';

const Login: React.FC = () => {
    return (
        <Box sx={s__loginBody}>
            <Container maxWidth='sm'>
                <LoginHead />
                <LoginForm />
            </Container>
        </Box>
    )
}

export default Login