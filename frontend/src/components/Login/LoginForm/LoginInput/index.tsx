import { Box, TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/system";

const CustomMuiTextField = styled(TextField)({
    width: '80%',
    '& label': {
        color: 'white',
        fontSize: '20px'
    },
    '& .MuiOutlinedInput-root': {
        color: 'white',
        '& input[type="password"]' : {
            fontFamily: 'monospace',
        },
        '& fieldset': {
            border: '2px solid white',
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
    },
    '& label.Mui-focused': {
        color: 'white',
    },
})

const LoginInput: React.FC<TextFieldProps> = (props) => {
    return (
        <Box textAlign='center'>
            <CustomMuiTextField {...props} />
        </Box>
    )
}

export default LoginInput;