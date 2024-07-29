import { ListItem, Card, CardActionArea, Typography, Chip, Stack } from "@mui/material";
import { s__memoItemBody, s__memoItemChip } from "./style";

const ProductItem: React.FC = () => {
    return (
        <>
            <ListItem 
                // key={}
                // onClick={() => console.log('clicked')} 
                disableGutters
            >
                <CardActionArea
                >
                    <Card sx={s__memoItemBody}>
                        <Stack direction='row' spacing={2}>
                            <Chip 
                                sx={s__memoItemChip}
                                label={`${new Date().toLocaleString()} - 作成`}
                                variant='outlined'
                            />
                            <Typography variant="h5">
                                メモタイトル
                            </Typography>
                        </Stack>
                        
                    </Card>
                </CardActionArea>
            </ListItem>
        </>
        
    )
}

export default ProductItem;