import { ListItem, Card, CardActionArea, Typography, Chip, Stack } from "@mui/material";
import { s__memoItemBody, s__memoItemChip } from "./style";
import MemoEntity from "@domain/memo/entity";

const ProductItem: React.FC<{
    memo_entity: MemoEntity
    onClickMemo: () => void
}> = (props) => {
    return (
        <>
            <ListItem 
                onClick={props.onClickMemo}
                disableGutters
            >
                <CardActionArea
                >
                    <Card sx={s__memoItemBody}>
                        <Stack direction='row' spacing={2}>
                            <Chip 
                                sx={s__memoItemChip}
                                label={`${props.memo_entity.getCreatedAt} - 作成`}
                                variant='outlined'
                            />
                            <Typography variant="h5">
                                {props.memo_entity.getTitle}
                            </Typography>
                        </Stack>
                        
                    </Card>
                </CardActionArea>
            </ListItem>
        </>
        
    )
}

export default ProductItem;