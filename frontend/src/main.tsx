import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { ThemeProvider } from '@mui/material';
import mui_theme from './theme.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider theme={mui_theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
)
