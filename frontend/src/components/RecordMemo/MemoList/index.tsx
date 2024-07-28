import { Card, CardContent, CardHeader, Divider, List } from '@mui/material'
import { s__memoListBody } from './style'
import MemoItem from './MemoItem'

const MemoList: React.FC = () =>{
    return (
        <Card sx={s__memoListBody}>
            <CardHeader 
                title={'- メモ履歴'}
            />
            <Divider />
            <CardContent>
                <List>
                    <MemoItem />
                    <MemoItem />
                </List>
            </CardContent>
        </Card>
    )
}

export default MemoList