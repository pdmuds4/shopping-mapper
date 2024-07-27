import { SxProps } from "@mui/system";

export const s__homeDrawerLayout: SxProps = {
    width: 240,
    flexShrink: 0,
    [`& .MuiDrawer-paper`]: { 
        width: 240, 
        boxSizing: 'border-box',
        backgroundImage: 'linear-gradient(360deg, #ec8434, #fda085)',
    },
}

export const s__homeDrawerTopBody: SxProps = {
    overflow: 'auto',
}

export const s__homeDrawerBottomBody: SxProps = {
    overflow: 'auto',
    marginTop: 'auto',
}

export const s__homeDrawerIcon: SxProps = {
    color: 'white',
    minWidth: 40,
}

export const s__homeDrawerText: SxProps = {
    color: 'white',
}