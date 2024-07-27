import { AppBar, Toolbar, Typography } from "@mui/material"
import { s__homeAppBarBody, s__homeAppBarToolbar, s__homeAppBarIcon } from "./style"


const HomeAppBar: React.FC = () => {
    return (
        <AppBar sx={s__homeAppBarBody}>
            <Toolbar sx={s__homeAppBarToolbar} disableGutters>
                <img style={s__homeAppBarIcon} src='/icon-white.svg' />
                <Typography variant="h4" noWrap component="div">
                    Shopping Mapper
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default HomeAppBar