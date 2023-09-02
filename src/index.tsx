import React from 'react';
import { DndProvider } from 'react-dnd';
import ReactDOM from 'react-dom/client';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { App } from './App';
import { defaultTheme } from './constants';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <DndProvider backend={HTML5Backend}>
        <CssBaseline />
        <App />
      </DndProvider>
    </ThemeProvider>
  </React.StrictMode>
);
