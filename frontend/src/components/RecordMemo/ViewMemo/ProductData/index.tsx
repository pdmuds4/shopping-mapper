import { TableRow, TableCell } from "@mui/material";

const ProductData: React.FC = () => {
    return (
        <TableRow
            key={1}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell component="th" scope="row">
                ああああ
            </TableCell>
            <TableCell align="right">
                {new Date().toLocaleString()}
            </TableCell>
        </TableRow>
    )
}

export default ProductData;