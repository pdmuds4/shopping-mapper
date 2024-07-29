import { Backdrop, CircularProgress } from "@mui/material";

const LoadingDrop: React.FC<{
    isOpen: boolean
}> = (props) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, top: -64 }}
            open={props.isOpen}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
};

export default LoadingDrop;