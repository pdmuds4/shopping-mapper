import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, Divider, Chip, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper} from '@mui/material';
import { s__viewMemoBody, s__viewMemoChip } from './style';
import ProductData from './ProductData';

import GetMemoProductsUseCase from '@usecase/getMemoProducts';
import MemoEntity from '@domain/memo/entity';
import ProductEntity from '@domain/product/entity';
import ProductRepository from '@domain/product/repository';
import { GetMemoRequestDTO } from '@domain/product/dto';

const ViewMemo: React.FC<{
    memo_entity: MemoEntity
}> = (props) => {
    const [product_list, setProductList] = useState<ProductEntity[]>([]);

    useEffect(()=>{
        new GetMemoProductsUseCase(
            new ProductRepository,
            new GetMemoRequestDTO(props.memo_entity.getId)
        ).execute()
        .then((response) => {
            console.log(response)
            setProductList(response)
        })
        .catch((error) => {
            console.error(error)
        })
    },[props.memo_entity.getId])

    return (
        <Card sx={s__viewMemoBody}>
            <CardHeader 
                title={props.memo_entity.getTitle}
                action={
                    <Chip 
                        sx={s__viewMemoChip}
                        label={`作成日時 - ${props.memo_entity.getCreatedAt}`}
                        variant='outlined'
                    />
                }
            />
            <Divider />
            <CardContent>
            <TableContainer component={Paper}>
                <Table aria-label="products table">
                    <TableHead>
                    <TableRow>
                        <TableCell>商品名</TableCell>
                        <TableCell align='right'>追加日時</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        { product_list.map((product, index)=>(
                            <ProductData 
                                key={index}
                                product_entity={product}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </CardContent>
        </Card>
    )
}

export default ViewMemo;