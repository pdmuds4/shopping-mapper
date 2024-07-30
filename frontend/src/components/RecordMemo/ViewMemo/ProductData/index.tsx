import ProductEntity from "@domain/product/entity";
import { TableRow, TableCell } from "@mui/material";

const ProductData: React.FC<{
    product_entity: ProductEntity
}> = (props) => {
    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell component="th" scope="row">
                {props.product_entity.getName}
            </TableCell>
            <TableCell align="right">
                {props.product_entity.getCreatedAt}
            </TableCell>
        </TableRow>
    )
}

export default ProductData;