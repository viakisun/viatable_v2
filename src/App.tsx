import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import ShowcasePageLayout from './components/ShowcasePageLayout';

// Import all page components
import HomePage from './pages/HomePage';
import QoA001 from './pages/samples/admin/qo-a001-admin_dashboard';
import QoA002 from './pages/samples/admin/qo-a002-multi_location_management';
import QoA003 from './pages/samples/admin/qo-a003-global_menu_management';
import QoA004 from './pages/samples/admin/qo-a004-staff_management';
import QoA005 from './pages/samples/admin/qo-a005-analytics_reports';
import QoA006 from './pages/samples/admin/qo-a006-system_settings_fixed';
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

const customerJourney = [
  { path: '/qo-c-001', component: QoC001, title: 'QO-C001: Landing Page' },
  { path: '/qo-c-002', component: QoC002, title: 'QO-C002: Menu Catalog' },
  { path: '/qo-c-003', component: QoC003, title: 'QO-C003: Item Details' },
  { path: '/qo-c-004', component: QoC004, title: 'QO-C004: Shopping Cart' },
  { path: '/qo-c-005', component: QoC005, title: 'QO-C005: Checkout' },
  { path: '/qo-c-006', component: QoC006, title: 'QO-C006: Payment' },
  { path: '/qo-c-007', component: QoC007, title: 'QO-C007: Order Status' },
  { path: '/qo-c-008', component: QoC008, title: 'QO-C008: Order Confirmation' },
];

const staffJourney = [
  { path: '/qo-s-001', component: QoS001, title: 'QO-S001: Staff Login' },
  { path: '/qo-s-002', component: QoS002, title: 'QO-S002: Dashboard' },
  { path: '/qo-s-003', component: QoS003, title: 'QO-S003: Order Management' },
  { path: '/qo-s-004', component: QoS004, title: 'QO-S004: Kitchen Display' },
  { path: '/qo-s-005', component: QoS005, title: 'QO-S005: Menu Management' },
  { path: '/qo-s-006', component: QoS006, title: 'QO-S006: Table Management' },
  { path: '/qo-s-007', component: QoS007, title: 'QO-S007: Customer Service' },
  { path: '/qo-s-008', component: QoS008, title: 'QO-S008: Staff Analytics' },
];

const adminJourney = [
  { path: '/qo-a-001', component: QoA001, title: 'QO-A001: Admin Dashboard' },
  { path: '/qo-a-002', component: QoA002, title: 'QO-A002: Multi-Location Management' },
  { path: '/qo-a-003', component: QoA003, title: 'QO-A003: Global Menu Management' },
  { path: '/qo-a-004', component: QoA004, title: 'QO-A004: Staff Management' },
  { path: '/qo-a-005', component: QoA005, title: 'QO-A005: Analytics & Reports' },
  { path: '/qo-a-006', component: QoA006, title: 'QO-A006: System Settings' },
];

const placeholderDescription = "This is a placeholder description for the page. It will be replaced with more detailed information about the specific features and user interactions available on this screen.";

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

          {/* Customer Journey */}
          {customerJourney.map((page, index) => (
            <Route
              key={page.path}
              path={page.path}
              element={
                <ShowcasePageLayout
                  title={page.title}
                  description={placeholderDescription}
                  previousLink={index > 0 ? customerJourney[index - 1].path : undefined}
                  nextLink={index < customerJourney.length - 1 ? customerJourney[index + 1].path : undefined}
                  journeyType="customer"
                >
                  <page.component />
                </ShowcasePageLayout>
              }
            />
          ))}

          {/* Staff Journey */}
          {staffJourney.map((page, index) => (
            <Route
              key={page.path}
              path={page.path}
              element={
                <ShowcasePageLayout
                  title={page.title}
                  description={placeholderDescription}
                  previousLink={index > 0 ? staffJourney[index - 1].path : undefined}
                  nextLink={index < staffJourney.length - 1 ? staffJourney[index + 1].path : undefined}
                  journeyType="staff"
                >
                  <page.component />
                </ShowcasePageLayout>
              }
            />
          ))}

          {/* Admin Journey */}
          {adminJourney.map((page, index) => (
            <Route
              key={page.path}
              path={page.path}
              element={
                <ShowcasePageLayout
                  title={page.title}
                  description={placeholderDescription}
                  previousLink={index > 0 ? adminJourney[index - 1].path : undefined}
                  nextLink={index < adminJourney.length - 1 ? adminJourney[index + 1].path : undefined}
                  journeyType="admin"
                >
                  <page.component />
                </ShowcasePageLayout>
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
