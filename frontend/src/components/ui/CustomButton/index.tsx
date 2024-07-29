import { Button, ButtonProps } from '@mui/material'
import { styled } from "@mui/system";

const CustomMuiButton = styled(Button)({
    width: '60%',
    color: 'white',
    fontSize: '30px',
    boxShadow: '3px 3px 3px 3px rgba(0, 0, 0, 0.3)',
    backgroundImage: 'linear-gradient(135deg, #ec8434, #fda085)',
    '&:disabled': {
        backgroundImage: 'none',
        backgroundColor: 'rgba(199, 199, 199, 0.3)',
    },
});

const CustomButton: React.FC<ButtonProps> = (props) => {
    return (
        <>
            <CustomMuiButton {...props}>
                {props.children}
            </CustomMuiButton>
        </>
    )
}

export default CustomButton;