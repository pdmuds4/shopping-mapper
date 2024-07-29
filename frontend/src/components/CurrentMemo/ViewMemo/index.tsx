import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Divider, /*Chip,*/ List } from '@mui/material';
import { s__viewMemoBody, /*s__viewMemoChip*/ } from './style';
import ProductItem from './ProductItem';
import MenuDial from './MenuDial';

import GetMemoProductsUseCase from '@usecase/getMemoProducts';
import MemoEntity from '@domain/memo/entity';
import ProductEntity from '@domain/product/entity';
import ProductRepository from '@domain/product/repository';
import { GetMemoRequestDTO } from '@domain/product/dto';

const ViewMemo: React.FC<{
    memoEntity: MemoEntity
}> = (props) => {
    const [memoProducts, setMemoProducts] = useState<ProductEntity[]>([]);

    useEffect(()=>{
        const request = new GetMemoRequestDTO(1/*props.memoEntity.getId*/);
        new GetMemoProductsUseCase(
            new ProductRepository,
            request
        ).execute()
        .then((response: ProductEntity[]) => {
            console.log(response);
            setMemoProducts(response);
        }).catch((error) => {
            console.error(error);
        })
    },[props.memoEntity.getId])

    return (
        <Card sx={s__viewMemoBody}>
            <CardHeader 
                title={props.memoEntity.getTitle}
                // [TODO]: created_atが返されてない
                // action={
                //     <Chip 
                //         sx={s__viewMemoChip}
                //         label={`作成日時 - ${new Date().toLocaleString()}`}
                //         variant='outlined'
                //     />
                // }
            />
            <Divider />
            <CardContent>
                <List>
                { memoProducts.map((product, index) => (
                    <ProductItem key={index} product_entity={product} />
                ))}
                </List>
            </CardContent>
            <MenuDial memo_id={props.memoEntity.getId} />
        </Card>
    )
}

export default ViewMemo;