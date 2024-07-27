import { Box, Card, CardContent, CardHeader, Divider, List, IconButton, Stack, Tooltip, Paper } from '@mui/material';
import { Save, Reply, Add } from '@mui/icons-material';
import { CustomInput } from '@components/ui';
import ProductItem from './ProductItem';
import HiddenBox from './HiddenBox';

import { s__editMemoBody, s__editMemoTypography, s__editMemoList } from './style';

const EditMemo: React.FC = () => {
    return (
        <Box >
            <Card sx={s__editMemoBody}>
                <CardHeader 
                    title="- メモの編集" 
                    sx={s__editMemoTypography} 
                    action={
                        <Stack direction='row' spacing={1}>
                            <Tooltip title='保存する'>
                                <IconButton
                                    color='primary'
                                    aria-label="save" 
                                    size='large'
                                    // [TODO]: onClickで保存処理を実装する
                                    // onClick={()=>console.log('save')}
                                >
                                    <Save fontSize="inherit"/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='メモへ戻る'>
                                <IconButton
                                    color='success'
                                    aria-label="back" 
                                    size='large'
                                    // [TODO]: onClickでメモ一覧に戻る処理を実装する
                                    // onClick={()=>console.log('back')}
                                >
                                    <Reply fontSize="inherit"/>
                                </IconButton>
                            </Tooltip>
                        </Stack>
                        
                    }
                />
                <Divider />
                <CardContent>                  
                    <CustomInput 
                        label="タイトル"
                        type="text"
                        basecolor="#ec8434"
                        onChange={(e)=>console.log(e.target.value)}
                    />
                    <Paper sx={s__editMemoList} elevation={3}>
                        <HiddenBox disabled={true} />
                        <List>
                            <>
                                <ProductItem />
                            </>
                            <Divider variant="middle">
                                <Tooltip title='商品を追加する'>
                                    <IconButton
                                        aria-label="add" 
                                        size='large'
                                        // [TODO]: onClickで商品追加処理を実装する
                                        // onClick={()=>console.log('add')}
                                    >
                                        <Add fontSize="inherit"/>
                                    </IconButton>
                                </Tooltip>
                            </Divider>
                        </List>
                    </Paper>
                </CardContent>
            </Card>
        </Box>
    )
}

export default EditMemo;