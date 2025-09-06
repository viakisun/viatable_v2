import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import QoC001Landing from './pages/qo_c001_landing';
import { LanguageProvider } from './contexts/LanguageContext';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <QoC001Landing />
    </LanguageProvider>
  </React.StrictMode>
);
