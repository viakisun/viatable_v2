import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout Component
import IphoneFrame from './components/iPhoneFrame';

// Page Components
import HomePage from './pages/HomePage';
import QoC001Landing from './pages/qo_c001_landing';
import QoC002Menu from './pages/qo_c002_menu';
import QoC003ItemDetails from './pages/qo_c003_item_details';
import QoC004Cart from './pages/qo_c004_cart';
import QoC005Checkout from './pages/qo_c005_checkout';
import QoC006Payment from './pages/qo_c006_payment';
import QoC007OrderStatus from './pages/qo_c007_order_status';
import QoC008Confirmation from './pages/qo_c008_confirmation';
import QoS001StaffLogin from './pages/qo_s001_staff_login';
import QoS002Dashboard from './pages/qo_s002_dashboard';
import QoS003OrderManagement from './pages/qo_s003_order_management';
import QoS004KitchenDisplay from './pages/qo_s004_kitchen_display';
import QoS005MenuManagement from './pages/qo_s005_menu_management';
import QoS006TableManagement from './pages/qo_s006_table_management';
import QoS007CustomerService from './pages/qo_s007_customer_service';
import QoS008StaffAnalytics from './pages/qo_s008_staff_analytics';

import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  console.log('[App.tsx] Router component rendering. Setting up routes.');
  // A helper function to wrap routes with the iPhone frame
  const framed = (element: React.ReactNode) => <IphoneFrame>{element}</IphoneFrame>;

  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          {/* Homepage without the frame */}
          <Route path="/" element={<HomePage />} />

        {/* Customer Pages */}
        <Route path="/qo-c-001" element={framed(<QoC001Landing />)} />
        <Route path="/qo-c-002" element={framed(<QoC002Menu />)} />
        <Route path="/qo-c-003" element={framed(<QoC003ItemDetails />)} />
        <Route path="/qo-c-004" element={framed(<QoC004Cart />)} />
        <Route path="/qo-c-005" element={framed(<QoC005Checkout />)} />
        <Route path="/qo-c-006" element={framed(<QoC006Payment />)} />
        <Route path="/qo-c-007" element={framed(<QoC007OrderStatus />)} />
        <Route path="/qo-c-008" element={framed(<QoC008Confirmation />)} />

        {/* Staff Pages */}
        <Route path="/qo-s-001" element={framed(<QoS001StaffLogin />)} />
        <Route path="/qo-s-002" element={framed(<QoS002Dashboard />)} />
        <Route path="/qo-s-003" element={framed(<QoS003OrderManagement />)} />
        <Route path="/qo-s-004" element={framed(<QoS004KitchenDisplay />)} />
        <Route path="/qo-s-005" element={framed(<QoS005MenuManagement />)} />
        <Route path="/qo-s-006" element={framed(<QoS006TableManagement />)} />
        <Route path="/qo-s-007" element={framed(<QoS007CustomerService />)} />
        <Route path="/qo-s-008" element={framed(<QoS008StaffAnalytics />)} />
      </Routes>
    </BrowserRouter>
  </LanguageProvider>
  );
}

export default App;
