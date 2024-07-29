import { useState } from 'react';
import { Box, Card, CardContent, CardHeader, Divider, List, IconButton, Tooltip, Paper } from '@mui/material';
import { Save, Add } from '@mui/icons-material';
import { CustomInput, LoadingDrop } from '@components/ui';
import ProductItem from './ProductItem';
import HiddenBox from './HiddenBox';

import { s__createMemoBody, s__createMemoTypography, s__createMemoList } from './style';

import { CreateMemoRequestDTO } from '@domain/memo/dto'
import { CreateProductRequestDTO } from '@domain/product/dto';
import MemoRepository from '@domain/memo/repository';
import ProductRepository from '@domain/product/repository';
import CreateMemoUseCase from '@usecase/createMemo';
import CreateProductUseCase from '@usecase/createProduct';
import MemoEntity from '@domain/memo/entity';

const CreateMemo: React.FC<{
    toViewMemo: (memoEntity: MemoEntity) => void;
}> = (props) => {
    const [memoRequestDto, setRequestDto] = useState<CreateMemoRequestDTO>(
        new CreateMemoRequestDTO(parseInt(localStorage.getItem('user_id') || ''),'')
    );
    const [productList, setProductList] = useState<string[]>([]);

    // ローティング関係
    const [is_loading, setLoading] = useState(false);

    const saveMemoHandler = async () => {
        try {
            setLoading(true);
            const memo_response = await new CreateMemoUseCase(new MemoRepository ,memoRequestDto).execute();
            await Promise.all(productList.map(async (product) => {
                new CreateProductUseCase(
                    new ProductRepository, 
                    new CreateProductRequestDTO(memo_response.getId, product)
                );
            }));
            props.toViewMemo(memo_response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box>
            <Card sx={s__createMemoBody}>
                <CardHeader 
                    title="- メモの作成" 
                    sx={s__createMemoTypography} 
                    action={
                        <Tooltip title='保存する'>
                            <IconButton
                                color='primary'
                                aria-label="save" 
                                size='large'
                                disabled={memoRequestDto.titleIsEmpty()}
                                onClick={saveMemoHandler}
                            >
                                <Save fontSize="inherit"/>
                            </IconButton>
                        </Tooltip>
                    }
                />
                <Divider />
                <CardContent>                  
                    <CustomInput 
                        label="タイトル"
                        type="text"
                        basecolor="#ec8434"
                        onChange={(e)=>setRequestDto(memoRequestDto.updateTitle(e.target.value))}
                    />
                    <Paper sx={s__createMemoList} elevation={3}>
                        <HiddenBox disabled={true} />
                        <List>
                            <>
                            { productList.map((_, index) => (
                                <ProductItem 
                                    key={index}
                                    id={index}
                                    onDelete={(id)=>setProductList(productList.filter((_, i) => i !== id))}
                                    onEdit={(id, text)=>setProductList(productList.map((p, i) => i === id ? text : p))}
                                />
                            ))}
                            </>
                            <Divider variant="middle">
                                <Tooltip title='商品を追加する'>
                                    <IconButton
                                        aria-label="add" 
                                        size='large'
                                        onClick={()=>setProductList([...productList, ''])}
                                    >
                                        <Add fontSize="inherit"/>
                                    </IconButton>
                                </Tooltip>
                            </Divider>
                        </List>
                    </Paper>
                </CardContent>
            </Card>
            
            {/* ローティング画面 */}
            <LoadingDrop isOpen={is_loading} />
        </Box>
    )
}

export default CreateMemo;