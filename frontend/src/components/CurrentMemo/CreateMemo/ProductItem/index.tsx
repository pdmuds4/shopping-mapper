import { IconButton, ListItem, Tooltip } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { CustomInput } from '@components/ui';

// [TODO]: propsを渡して、商品名と価格を表示する
const ProductItem: React.FC<{
    id: number;
    onDelete: (id: number) => void;
    onEdit: (id: number, text: string) => void;
}> = (props) => {
    return (
        <ListItem
            secondaryAction={
                <Tooltip title='削除する'>
                    <IconButton 
                        edge="end" 
                        aria-label="delete" 
                        size='large' 
                        color='error'
                        onClick={() => props.onDelete(props.id)}
                    >
                        <Delete fontSize="inherit" />
                    </IconButton>
                </Tooltip>
            }
        >   
            <CustomInput
                label='商品名'
                type='text'
                basecolor='gray'
                onChange={(e)=>props.onEdit(props.id, e.target.value)} 
            />
        </ListItem>
    )
}

export default ProductItem;