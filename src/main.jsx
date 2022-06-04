import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import AdapterJalali from '@date-io/date-fns-jalali';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { BrowserRouter } from 'react-router-dom';
import { DndProvider } from 'react-dnd'
import Panel from './Panel/Panel';
import app from './Base/App';
import { get } from './Base/Api';

const renderReact = () => {
  const container = document.getElementById('root');
  const root = createRoot(container);
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

renderReact()

const render = () => {
  app.configPusher();
  if (import.meta.env.VITE_HAS_MULTIPLE_LOCALES) {
    get('/locale/data')
      .then(data => {
        app.setTranslations(data.translations);
        app.setLocale(data.locale);
        renderReact();
      }, error => {
        console.error(error);
        renderReact();
        alert(error);
      });
  }
  else {
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
