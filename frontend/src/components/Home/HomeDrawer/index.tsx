import { useNavigate } from 'react-router';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Article, Restore, Logout } from '@mui/icons-material'
import { s__homeDrawerLayout, s__homeDrawerTopBody, s__homeDrawerBottomBody, s__homeDrawerIcon, s__homeDrawerText } from './style';

const HomeDrawer: React.FC<{
    onSetMainContent: (content: JSX.Element) => void;
}> = (/*props*/) => {
    const navigate = useNavigate();

    // [TODO]: props.onSetMainContent()を使ってmain contentを変更する
    const d__topListItems = [
        {
            text: '作成中のメモ',
            icon: <Article />,
            onclick: () => console.log('main content is 作成中のメモ')// props.setMainContent()
        },
        {
            text: 'メモ履歴',
            icon: <Restore />,
            onclick: () => console.log('main content is メモ履歴') //props.setMainContent()
        }
    ];

    const d__bottomListItems = [
        {
            text: 'ログアウト',
            icon: <Logout />,
            onclick: () => navigate('/login')
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