import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import IphoneFrame from './components/iPhoneFrame';

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

// Viatable sample pages
import VTL001 from './pages/vt-l001-viatable_landing_page';
import VTL002 from './pages/vt-l002-viatable_signup_flow';
import VTL003 from './pages/vt-l003-viatable_pricing_plans';
import VTL004 from './pages/vt-l004-viatable_demo_trial';
import VTL005 from './pages/vt-l005-viatable_features_new';
import VTL017 from './pages/vt-l017-viatable_login_new';

// A wrapper component to apply the iPhone frame to pages
const FramedPage = ({ children }: { children: React.ReactNode }) => (
  <IphoneFrame>{children}</IphoneFrame>
);

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<VTL001 />} />
          <Route path="/samples" element={<HomePage />} />

          {/* Viatable Sample Pages */}
          <Route path="/vt-l001" element={<VTL001 />} />
          <Route path="/vt-l002" element={<VTL002 />} />
          <Route path="/vt-l003" element={<VTL003 />} />
          <Route path="/vt-l004" element={<VTL004 />} />
          <Route path="/vt-l005" element={<VTL005 />} />
          <Route path="/vt-l017" element={<VTL017 />} />

          {/* Customer Pages */}
          <Route path="/qo-c-001" element={<FramedPage><QoC001 /></FramedPage>} />
          <Route path="/qo-c-002" element={<FramedPage><QoC002 /></FramedPage>} />
          <Route path="/qo-c-003" element={<FramedPage><QoC003 /></FramedPage>} />
          <Route path="/qo-c-004" element={<FramedPage><QoC004 /></FramedPage>} />
          <Route path="/qo-c-005" element={<FramedPage><QoC005 /></FramedPage>} />
          <Route path="/qo-c-006" element={<FramedPage><QoC006 /></FramedPage>} />
          <Route path="/qo-c-007" element={<FramedPage><QoC007 /></FramedPage>} />
          <Route path="/qo-c-008" element={<FramedPage><QoC008 /></FramedPage>} />

          {/* Staff Pages */}
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
