import { useState } from 'react'
import { Box, Toolbar } from '@mui/material'
import { HomeAppBar, HomeDrawer } from '@components/Home';

import CurrentMemo from '@routes/_CurrentMemo';

const Home: React.FC = () => {
    const [mainContent, setMainContent] = useState<JSX.Element>(<CurrentMemo />);

    return (
        <Box sx={{ display: 'flex' }}>
            <HomeAppBar />
            <HomeDrawer onSetMainContent={(page)=>setMainContent(page)} />
            
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {mainContent}
            </Box>
        </Box>
    )
}

export default Home