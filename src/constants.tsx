import { createTheme } from '@mui/material';
import { createBrowserRouter } from 'react-router-dom';

import { Pages } from './types';
import { ZvzSsLogger } from './screens';

export const defaultTheme = createTheme({
  palette: {
    background: { default: '#F8F0FB' },
    primary: {
      main: '#6320EE',
      // light: '#001044',
      // dark: '#000000',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#8075FF',
      // light: '#c9cfcc',
      // dark: '#939f9a',
      contrastText: '#FFFFFF',
    },
    common: { white: '#FFFFFF', black: '#000000' },
  },
});

export const topBarRouter = createBrowserRouter([
  {
    path: '/',
    element: <div>Home</div>,
  },
  {
    path: Pages.ZvzMagazine,
    element: <div>ZvZ magazine</div>,
  },
  {
    path: Pages.Prices,
    element: <div>Prices</div>,
  },
  {
    path: Pages.ZvzSsLogger,
    element: <ZvzSsLogger />,
  },
  {
    path: Pages.GuildBuyOrders,
    element: <div>Calc</div>,
  },
]);
