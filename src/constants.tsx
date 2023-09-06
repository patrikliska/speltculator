import { createTheme } from '@mui/material';
import { RouteObject } from 'react-router-dom';

import { Pages } from './types';
import { MarketPrices, ZvzSsLogger } from './screens';

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

export const pages = [
  { title: Pages.Prices },
  { title: Pages.GuildBuyOrders, disabled: true },
  { title: Pages.ZvzMagazine, disabled: true },
  { title: Pages.ZvzSsLogger, disabled: true },
  { title: Pages.GuildActivity, disabled: true },
];

export const menuPages: RouteObject[] = [
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
    element: <MarketPrices />,
  },
  {
    path: Pages.ZvzSsLogger,
    element: <ZvzSsLogger />,
  },
  {
    path: Pages.GuildBuyOrders,
    element: <div>Calc</div>,
  },
  {
    path: Pages.GuildActivity,
    element: <div>Guild activity</div>,
  },
];
