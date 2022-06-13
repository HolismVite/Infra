import React from 'react';
import { createRoot } from 'react-dom/client';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import AdapterJalali from '@date-io/date-fns-jalali';
import { LocalizationProvider } from '@mui/x-date-pickers'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { DndProvider } from 'react-dnd'
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import Panel from './Panel/Panel';
import app from './Base/App';
import { get } from './Base/Api';
import './index.css';

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: [
      'IRANSansX'
    ]
  }
});

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const renderReact = () => {
  const container = document.getElementById('root');
  const root = createRoot(container);
  if (app.isRtl()) {
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CacheProvider value={cacheRtl}>
              <ThemeProvider theme={theme}>
                <Panel />
              </ThemeProvider>
            </CacheProvider>
          </LocalizationProvider>
        </BrowserRouter>
      </React.StrictMode>
    );
  }
  else {
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Panel />
          </LocalizationProvider>
        </BrowserRouter>
      </React.StrictMode>
    );
  }
}

const render = () => {
  app.configPusher();
  if (import.meta.env.VITE_HAS_MULTIPLE_LOCALES) {
    get('/locale/data')
      .then(data => {
        app.setTranslations(data.translations);
        app.setLocale(data.locale);
        document.dir = data.locale.isRtl ? "rtl" : "ltr"
        renderReact();
      }, error => {
        console.error(error);
        renderReact();
        alert(error);
      });
  }
  else {
    document.dir = 'ltr'
    renderReact();
  }
}

window.app = app;

// window.React1 = require('react');

if (import.meta.env.VITE_SECURITY === 'off') {
  render();
}
else {
  app.checkLogin(
    () => {
      render();
    }
  );
}
