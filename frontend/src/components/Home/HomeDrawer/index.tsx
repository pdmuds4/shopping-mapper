import { useNavigate } from 'react-router';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Article, Restore, Logout, PinDrop } from '@mui/icons-material'
import { s__homeDrawerLayout, s__homeDrawerTopBody, s__homeDrawerBottomBody, s__homeDrawerIcon, s__homeDrawerText } from './style';

import CurrentMemo from '@routes/_CurrentMemo';
import RecordMemo from '@routes/_RecordMemo';
import ProductsMap from '@routes/_ProductsMap';

const HomeDrawer: React.FC<{
    onSetMainContent: (content: JSX.Element) => void;
}> = (props) => {
    const navigate = useNavigate();

    // [TODO]: props.onSetMainContent()を使ってmain contentを変更する
    const d__topListItems = [
        {
            text: '作成中のメモ',
            icon: <Article />,
            onclick: () => props.onSetMainContent(<CurrentMemo />)
        },
        {
            text: 'メモ履歴',
            icon: <Restore />,
            onclick: () => props.onSetMainContent(<RecordMemo />)
        },
        {
            text: '購入場所を確認',
            icon: <PinDrop />,
            onclick: () => props.onSetMainContent(<ProductsMap />)
        }
    ];

    const d__bottomListItems = [
        {
            text: 'ログアウト',
            icon: <Logout />,
            onclick: () => {
                localStorage.removeItem('user_id')
                navigate('/login')
            }
        }
    ];

    return (
        <Drawer
                variant="permanent"
                sx={s__homeDrawerLayout}
            >
                <Toolbar />
                <Box sx={s__homeDrawerTopBody}>
                    <List>
                        {d__topListItems.map((item, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton onClick={item.onclick}>
                                <ListItemIcon sx={s__homeDrawerIcon}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText sx={s__homeDrawerText} primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                        ))}
                    </List>
                </Box>
                <Box sx={s__homeDrawerBottomBody}>
                    <List>
                        {d__bottomListItems.map((item, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton onClick={item.onclick}>
                                    <ListItemIcon sx={s__homeDrawerIcon}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText sx={s__homeDrawerText} primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
    )
}

export default HomeDrawer;