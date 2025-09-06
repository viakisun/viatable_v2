import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import IphoneFrame from './components/IphoneFrame';

// Import all page components
import HomePage from './pages/HomePage';
import QoC001 from './pages/qo_c001_landing';
import QoC002 from './pages/qo_c002_menu';
import QoC003 from './pages/qo_c003_item_details';
import QoC004 from './pages/qo_c004_cart';
import QoC005 from './pages/qo_c005_checkout';
import QoC006 from './pages/qo_c006_payment';
import QoC007 from './pages/qo_c007_order_status';
import QoC008 from './pages/qo_c008_confirmation';
import QoS001 from './pages/qo_s001_staff_login';
import QoS002 from './pages/qo_s002_dashboard';
import QoS003 from './pages/qo_s003_order_management';
import QoS004 from './pages/qo_s004_kitchen_display';
import QoS005 from './pages/qo_s005_menu_management';
import QoS006 from './pages/qo_s006_table_management';
import QoS007 from './pages/qo_s007_customer_service';
import QoS008 from './pages/qo_s008_staff_analytics';

const FramedPage = ({ children }: { children: React.ReactNode }) => (
  <IphoneFrame>{children}</IphoneFrame>
);

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          {/* The showcase homepage is the root */}
          <Route path="/" element={<HomePage />} />

          {/* Direct routes to each page, wrapped in the iPhone Frame */}
          <Route path="/qo-c-001" element={<FramedPage><QoC001 /></FramedPage>} />
          <Route path="/qo-c-002" element={<FramedPage><QoC002 /></FramedPage>} />
          <Route path="/qo-c-003" element={<FramedPage><QoC003 /></FramedPage>} />
          <Route path="/qo-c-004" element={<FramedPage><QoC004 /></FramedPage>} />
          <Route path="/qo-c-005" element={<FramedPage><QoC005 /></FramedPage>} />
          <Route path="/qo-c-006" element={<FramedPage><QoC006 /></FramedPage>} />
          <Route path="/qo-c-007" element={<FramedPage><QoC007 /></FramedPage>} />
          <Route path="/qo-c-008" element={<FramedPage><QoC008 /></FramedPage>} />

          <Route path="/qo-s-001" element={<FramedPage><QoS001 /></FramedPage>} />
          <Route path="/qo-s-002" element={<FramedPage><QoS002 /></FramedPage>} />
          <Route path="/qo-s-003" element={<FramedPage><QoS003 /></FramedPage>} />
          <Route path="/qo-s-004" element={<FramedPage><QoS004 /></FramedPage>} />
          <Route path="/qo-s-005" element={<FramedPage><QoS005 /></FramedPage>} />
          <Route path="/qo-s-006" element={<FramedPage><QoS006 /></FramedPage>} />
          <Route path="/qo-s-007" element={<FramedPage><QoS007 /></FramedPage>} />
          <Route path="/qo-s-008" element={<FramedPage><QoS008 /></FramedPage>} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
