import { useState } from 'react'
import { Box, Toolbar } from '@mui/material'
import { HomeAppBar, HomeDrawer, LocalRedirectProvider } from '@components/Home';

import CurrentMemo from '@routes/_CurrentMemo';

const Home: React.FC = () => {
    const [mainContent, setMainContent] = useState<JSX.Element>(<CurrentMemo />);

    return (
        <LocalRedirectProvider>
            <Box sx={{ display: 'flex' }}>
                <HomeAppBar />
                <HomeDrawer onSetMainContent={(page)=>setMainContent(page)} />
                
                <Box component="main" sx={{ flexGrow: 1 }}>
                    <Toolbar />
                    {mainContent}
                </Box>
            </Box>
        </LocalRedirectProvider>
    )
}

export default Home