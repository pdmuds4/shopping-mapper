import { Box, Stack, Typography } from '@mui/material';
import { s__notFoundMemoImg, s__notFoundMemoTypography } from './style';

const NotFoundMemo: React.FC = () => {
    return (
        <Stack spacing={3}>
            <Box textAlign='center'>
                <img style={s__notFoundMemoImg} src='/currentMemo-notFound.svg' />
            </Box>
            <Box textAlign='center'>
                <Typography sx={s__notFoundMemoTypography} variant='h3'>
                    メモ履歴はありません
                </Typography>
            </Box>
        </Stack>
    )
}

export default NotFoundMemo;