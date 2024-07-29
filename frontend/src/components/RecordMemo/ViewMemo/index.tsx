import { Card, CardContent, CardHeader, Divider, Chip, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper} from '@mui/material';
import { s__viewMemoBody, s__viewMemoChip } from './style';
import ProductData from './ProductData';

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
            <TableContainer component={Paper}>
                <Table aria-label="products table">
                    <TableHead>
                    <TableRow>
                        <TableCell>商品名</TableCell>
                        <TableCell align='right'>追加日時</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <ProductData />
                        <ProductData />
                    </TableBody>
                </Table>
            </TableContainer>
            </CardContent>
        </Card>
    )
}

export default ViewMemo;