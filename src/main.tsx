import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import QoC001Landing from './pages/qo_c001_landing';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QoC001Landing />
  </StrictMode>,
);
