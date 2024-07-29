import { Box, Stack, Typography } from '@mui/material';
import { s__notFoundMemoImg, s__notFoundMemoTypography } from './style';
import { CustomButton } from '@components/ui';

const NotFoundMemo: React.FC<{
    onCreateMemo: () => void
}> = (props) => {
    return (
        <Stack spacing={3}>
            <Box textAlign='center'>
                <img style={s__notFoundMemoImg} src='/currentMemo-notFound.svg' />
            </Box>
            <Box textAlign='center'>
                <Typography sx={s__notFoundMemoTypography} variant='h3'>
                    作成中のメモはありません
                </Typography>
            </Box>
            <Box textAlign='center'>
                <CustomButton
                    onClick={props.onCreateMemo}
                    sx={{ width: '30%' }}
                >
                    メモを作成する
                </CustomButton>
            </Box>
        </Stack>
    )
}

export default NotFoundMemo;