import { IconButton, ListItem, Tooltip } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { CustomInput } from '@components/ui';

// [TODO]: propsを渡して、商品名と価格を表示する
const ProductItem: React.FC = () => {
    return (
        <ListItem
            // id={}
            secondaryAction={
                <Tooltip title='削除する'>
                    <IconButton 
                        edge="end" 
                        aria-label="delete" 
                        size='large' 
                        color='error'
                        // onClick={() => console.log('delete')}
                    >
                        <Delete fontSize="inherit" />
                    </IconButton>
                </Tooltip>
            }
        >   
            <CustomInput 
                // defaultValue={}
                label='商品名'
                type='text'
                basecolor='gray' 
            />
        </ListItem>
    )
}

export default ProductItem;