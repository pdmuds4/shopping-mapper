import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/system";

const CustomMuiTextField = styled(TextField)(
    (props: {
        basecolor: string
    }) => ({
        width: '80%',
        '& label': {
            color: props.basecolor,
            fontSize: '20px'
        },
        '& .MuiOutlinedInput-root': {
            color: props.basecolor,
            '& input[type="password"]' : {
                fontFamily: 'monospace',
            },
            '& fieldset': {
                border: `2px solid ${props.basecolor}`,
                borderColor: props.basecolor,
            },
            '&:hover fieldset': {
                borderColor: props.basecolor,
            },
            '&.Mui-focused fieldset': {
                borderColor: props.basecolor,
            },
        },
        '& label.Mui-focused': {
            color: props.basecolor,
        },
        '& p': {
            fontSize: '15px',
        },
}))

const CustomInput: React.FC<TextFieldProps & {
    basecolor: string
}> = (props) => {
    return (
        <>
            <CustomMuiTextField {...props} basecolor={props.basecolor} />
        </>
    )
}

export default CustomInput;