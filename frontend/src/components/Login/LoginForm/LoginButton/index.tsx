import { Button, Box, ButtonProps } from '@mui/material'
import { styled } from "@mui/system";

const CustomMuiButton = styled(Button)({
    width: '60%',
    color: 'white',
    fontSize: '30px',
    boxShadow: '3px 3px 3px 3px rgba(0, 0, 0, 0.3)',
    '&:disabled': {
        backgroundColor: 'rgba(185, 185, 185, 0.3)',
    },
});

const LoginButton: React.FC<ButtonProps> = (props) => {
    return (
        <Box textAlign='center'>
            <CustomMuiButton {...props}>{props.children}</CustomMuiButton>
        </Box>
    )
}

export default LoginButton;