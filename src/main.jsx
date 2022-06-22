import React from 'react';
import { createRoot } from 'react-dom/client';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import AdapterJalali from '@date-io/date-fns-jalali';
// import AdapterHijri from '@date-io/hijri';
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

const faTheme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: [
      'IRANSansX'
    ]
  }
});

const arTheme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: [
      'Noto Kufi Arabic'
    ]
  }
})

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const renderReact = () => {
  const container = document.getElementById('root');
  const root = createRoot(container);

  if (app.isRtl()) {
    let adapter = AdapterDateFns
    if (app.getLocale().key === 'fa') {
      adapter = AdapterJalali
    }
    else if (app.getLocale().key === 'ar') {
      adapter = AdapterDateFns
    }
    let theme = faTheme
    if (app.getLocale().key === 'ar') {
      theme = arTheme
    }
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <LocalizationProvider dateAdapter={adapter}>
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
