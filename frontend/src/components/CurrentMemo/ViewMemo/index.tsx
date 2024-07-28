import { Card, CardContent, CardHeader, Divider, Chip, List } from '@mui/material';
import { s__viewMemoBody, s__viewMemoChip } from './style';
import ProductItem from './ProductItem';
import MenuDial from './MenuDial';

const ViewMemo: React.FC = () => {
    return (
        <Card sx={s__viewMemoBody}>
            <CardHeader 
                title={'メモのタイトル'}
                action={
                    <Chip 
                        sx={s__viewMemoChip}
                        label={`作成日時 - ${new Date().toLocaleString()}`}
                        variant='outlined'
                    />
                }
            />
            <Divider />
            <CardContent>
                <List>
                    <ProductItem />
                    <ProductItem />
                </List>
            </CardContent>
                <MenuDial />
        </Card>
    )
}

export default ViewMemo;