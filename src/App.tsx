import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import page components
// Note: HomePage will be created in the next step.
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/qo-c-001" element={<QoC001Landing />} />
        <Route path="/qo-c-002" element={<QoC002Menu />} />
        <Route path="/qo-c-003" element={<QoC003ItemDetails />} />
        <Route path="/qo-c-004" element={<QoC004Cart />} />
        <Route path="/qo-c-005" element={<QoC005Checkout />} />
        <Route path="/qo-c-006" element={<QoC006Payment />} />
        <Route path="/qo-c-007" element={<QoC007OrderStatus />} />
        <Route path="/qo-c-008" element={<QoC008Confirmation />} />
        <Route path="/qo-s-001" element={<QoS001StaffLogin />} />
        <Route path="/qo-s-002" element={<QoS002Dashboard />} />
        <Route path="/qo-s-003" element={<QoS003OrderManagement />} />
        <Route path="/qo-s-004" element={<QoS004KitchenDisplay />} />
        <Route path="/qo-s-005" element={<QoS005MenuManagement />} />
        <Route path="/qo-s-006" element={<QoS006TableManagement />} />
        <Route path="/qo-s-007" element={<QoS007CustomerService />} />
        <Route path="/qo-s-008" element={<QoS008StaffAnalytics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
