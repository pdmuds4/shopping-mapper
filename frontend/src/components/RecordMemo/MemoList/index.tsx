import { Card, CardContent, CardHeader, Divider, List } from '@mui/material'
import { s__memoListBody } from './style'
import MemoItem from './MemoItem'
import MemoEntity from '@domain/memo/entity'

const MemoList: React.FC<{
    memo_list: MemoEntity[]
    toViewMemo: (memo: MemoEntity) => void
}> = (props) =>{
    return (
        <Card sx={s__memoListBody}>
            <CardHeader 
                title={'- メモ履歴'}
            />
            <Divider />
            <CardContent>
                <List>
                    { props.memo_list.map((memo, index) => {
                        return (
                            <MemoItem 
                                key={index}
                                memo_entity={memo}
                                onClickMemo={() => props.toViewMemo(memo)}
                            />
                        )
                    })}
                </List>
            </CardContent>
        </Card>
    )
}

export default MemoList