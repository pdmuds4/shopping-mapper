import { useState, useEffect, useCallback } from "react";
import { ListItem, ListItemIcon, ListItemButton, Typography, Checkbox, Divider } from "@mui/material";

import DoneProductUseCase from "@usecase/doneProduct";
import UnDoneProductUseCase from "@usecase/unDoneProduct";
import ProductEntity from "@domain/product/entity";
import ProductRepository from "@domain/product/repository";
import { DoneRequestDTO, UndoneRequestDTO } from "@domain/product/dto";

const ProductItem: React.FC<{
    product_entity: ProductEntity
}> = (props) => {
    const [default_checked, setDefaultChecked] = useState(props.product_entity.getIsDone);
    const [is_checked, setChecked] = useState(props.product_entity.getIsDone);
    const [checked_location, setCheckedLocation] = useState<{latitude: number, longitude: number}>();

    const onCheckSaveHandler = useCallback(async () => {
        if (is_checked) {
            new DoneProductUseCase(
                new ProductRepository,
                new DoneRequestDTO(
                    props.product_entity.getId,
                    checked_location?.latitude || 0,
                    checked_location?.longitude || 0,
                    0 // [TODO]: 金額の入力機能を追加
                )
            ).execute()
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.error(error);
            })
        } else {
            new UnDoneProductUseCase(
                new ProductRepository,
                new UndoneRequestDTO(
                    props.product_entity.getId
                )
            ).execute()
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.error(error);
            })
        }
    }, [checked_location?.latitude, checked_location?.longitude, is_checked, props.product_entity.getId]);

    // 1秒後に変更があれば保存処理を実行
    useEffect(()=>{
        const timer = setTimeout(() => {
            if (is_checked !== default_checked) {
                navigator.geolocation.getCurrentPosition((position) => setCheckedLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }));
                setDefaultChecked(is_checked);
                onCheckSaveHandler();
            }
        }, 1000);
        return () => clearTimeout(timer);
    },[is_checked, default_checked, onCheckSaveHandler])

    return (
        <>
            <ListItem>
                <ListItemButton 
                    onClick={()=>setChecked(!is_checked)} 
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
                        {props.product_entity.getName}
                    </Typography>
                </ListItemButton>
            </ListItem>
            <Divider />
        </>
        
    )
}

export default ProductItem;