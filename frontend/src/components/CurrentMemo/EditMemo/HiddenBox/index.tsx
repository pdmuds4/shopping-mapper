import { Box, Typography } from '@mui/material';
import { s__hiddenBoxBody } from './style';

const HiddenBox: React.FC<{
    disabled: boolean
}> = (props) => {
    return props.disabled ? 
    (
        <>
        </>
    ) : (
        <Box sx={s__hiddenBoxBody}>
            <Typography sx={{margin: 'auto'}} variant="h5">
                完了済みのメモは変更できません
            </Typography>
        </Box>
    )
};

export default HiddenBox;