import { useState } from "react";
import { ListItem, ListItemIcon, ListItemButton, Typography, Checkbox, Divider } from "@mui/material";

const ProductItem: React.FC = () => {
    const [is_checked, setChecked] = useState(false);
    return (
        <>
            <ListItem 
                // key={}
            >
                <ListItemButton 
                    onClick={() => setChecked(!is_checked)} 
                    dense
                >
                    <ListItemIcon>
                        <Checkbox 
                            edge="start"
                            checked={is_checked}
                            disableRipple
                        />
                    </ListItemIcon>
                    <Typography variant='h5' noWrap>
                        商品名
                    </Typography>
                </ListItemButton>
            </ListItem>
            <Divider />
        </>
        
    )
}

export default ProductItem;