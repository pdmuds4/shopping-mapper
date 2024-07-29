import { Theme } from "@mui/material";
import { SxProps } from "@mui/system";

export const s__homeAppBarBody: SxProps<Theme> = {
    position: 'fixed',
    zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
    backgroundColor: '#ec8434',
}

export const s__homeAppBarToolbar: SxProps = {
    maxHeight: '24px',
}

export const s__homeAppBarIcon: React.CSSProperties = {
    height: '50px',
    margin: '0 10px',
}