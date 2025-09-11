import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import ShowcasePageLayout from './components/ShowcasePageLayout';

// Import all page components
import HomePage from './pages/HomePage';
import VTL001 from './pages/vt-l001-viatable_landing_page';
import VTL002 from './pages/vt-l002-viatable_signup_flow';
import VTL003 from './pages/vt-l003-viatable_pricing_plans';
import VTL004 from './pages/vt-l004-viatable_demo_trial';
import VTL005 from './pages/vt-l005-viatable_features_new';
import VTL017 from './pages/vt-l017-viatable_login_new';

// Customer pages
import QoC001 from './pages/qo_c001_landing';
import QoC002 from './pages/qo_c002_menu';
import QoC003 from './pages/qo_c003_item_details';
import QoC004 from './pages/qo_c004_cart';
import QoC005 from './pages/qo_c005_checkout';
import QoC006 from './pages/qo_c006_payment';
import QoC007 from './pages/qo_c007_order_status';
import QoC008 from './pages/qo_c008_confirmation';

// Staff pages
import QoS001 from './pages/qo_s001_staff_login';
import QoS002 from './pages/qo_s002_dashboard';
import QoS003 from './pages/qo_s003_order_management';
import QoS004 from './pages/qo_s004_kitchen_display';
import QoS005 from './pages/qo_s005_menu_management';
import QoS006 from './pages/qo_s006_table_management';
import QoS007 from './pages/qo_s007_customer_service';
import QoS008 from './pages/qo_s008_staff_analytics';

// Admin pages
import QoA001 from './pages/samples/admin/qo-a001-admin_dashboard';
import QoA002 from './pages/samples/admin/qo-a002-multi_location_management';
import QoA003 from './pages/samples/admin/qo-a003-global_menu_management';
import QoA004 from './pages/samples/admin/qo-a004-staff_management';
import QoA005 from './pages/samples/admin/qo-a005-analytics_reports';
import QoA006 from './pages/samples/admin/qo-a006-system_settings_fixed';
import QoA007 from './pages/samples/admin/qo-a007-payment_management';
import QoA008 from './pages/samples/admin/qo-a008-customer_management';
import QoA009 from './pages/samples/admin/qo-a009-inventory_management';
import QoA010 from './pages/samples/admin/qo-a010-promotion_management';
import QoA011 from './pages/samples/admin/qo-a011-audit_logs';
import QoA012 from './pages/samples/admin/qo-a012-qr_code_management';


const customerJourney = [
  { path: '/qo-c-001', component: QoC001, title: 'QO-C001: Landing/Welcome Page', description: 'The first touchpoint after QR code scanning, featuring multilingual language selection (English/Korean), table information display, and restaurant branding. Includes real-time clock, core feature preview, and intuitive navigation to the menu catalog.' },
  { path: '/qo-c-002', component: QoC002, title: 'QO-C002: Menu Catalog', description: 'Comprehensive digital menu showcasing categorized food and beverage items with advanced filtering, search functionality, and real-time pricing. Features coffee & brunch items with emoji icons, ratings, and dynamic currency conversion.' },
  { path: '/qo-c-003', component: QoC003, title: 'QO-C003: Item Details', description: 'Detailed product page showcasing individual menu items with comprehensive customization options, ingredient information, nutritional data, and allergen warnings. Example implementation features Avocado Toast with bread type selection and egg style options.' },
  { path: '/qo-c-004', component: QoC004, title: 'QO-C004: Shopping Cart', description: 'Smart shopping cart management system with item modification capabilities, promotional code application, and real-time total calculation including taxes and service charges. Features estimated preparation time and special request handling.' },
  { path: '/qo-c-005', component: QoC005, title: 'QO-C005: Checkout', description: 'Streamlined checkout process with customer information collection, service type selection (dine-in/takeaway), and multiple payment method options. Includes guest/member login options and real-time form validation.' },
  { path: '/qo-c-006', component: QoC006, title: 'QO-C006: Payment', description: 'Secure payment processing interface with multiple authentication methods including biometric verification. Features card information masking, real-time processing status, and comprehensive security measures.' },
  { path: '/qo-c-007', component: QoC007, title: 'QO-C007: Order Status', description: 'Real-time order tracking system displaying current order progress through multiple stages (Confirmed → Preparing → Ready for Pickup). Includes live timer, customer service options, and interactive progress indicators.' },
  { path: '/qo-c-008', component: QoC008, title: 'QO-C008: Order Confirmation', description: 'Order completion confirmation page with QR code generation for order tracking, loyalty point accumulation, and next-step guidance. Emphasizes achievement and provides seamless reordering options.' },
];

const staffJourney = [
  { path: '/qo-s-001', component: QoS001, title: 'QO-S001: Staff Login', description: 'Multi-authentication login system supporting password, PIN, and QR code access methods. Features security monitoring, login attempt tracking, and real-time system status display with current online staff visibility.' },
  { path: '/qo-s-002', component: QoS002, title: 'QO-S002: Staff Dashboard', description: 'Personalized staff dashboard with individual performance metrics, real-time work hour tracking, and key performance indicators. Features clock-in/out functionality and live activity feed with today\'s statistics.' },
  { path: '/qo-s-003', component: QoS003, title: 'QO-S003: Order Management', description: 'Comprehensive order management system with status-based filtering, bulk processing capabilities, and priority ordering. Features real-time search, one-click status updates, and automated workflow management.' },
  { path: '/qo-s-004', component: QoS004, title: 'QO-S004: Kitchen Display', description: 'Kitchen-optimized display system with 3-stage kanban board layout, dark theme for reduced eye strain, and real-time preparation timers. Features automatic delay detection and allergen warning highlights.' },
  { path: '/qo-s-005', component: QoS005, title: 'QO-S005: Menu Management', description: 'Real-time menu management interface for price adjustments, inventory control, and item availability management. Features popular item analytics, sales trend tracking, and one-touch item enable/disable functionality.' },
  { path: '/qo-s-006', component: QoS006, title: 'QO-S006: Table Management', description: 'Comprehensive table status management system with QR code generation, zone-based organization, and real-time occupancy tracking. Features customer contact integration and status-based color coding.' },
  { path: '/qo-s-007', component: QoS007, title: 'QO-S007: Customer Service', description: 'Advanced customer service management system with real-time chat functionality, priority-based request handling, and comprehensive response time tracking. Features categorized request types and satisfaction measurement.' },
  { path: '/qo-s-008', component: QoS008, title: 'QO-S008: Staff Analytics', description: 'Individual and team performance analytics dashboard with goal management, achievement tracking, and competitive rankings. Features real-time performance monitoring, badge systems, and trend analysis.' },
];

const adminJourney = [
  { path: '/qo-a-001', component: QoA001, title: 'QO-A001: Admin Dashboard', description: 'Executive-level dashboard providing comprehensive business overview with multi-location performance metrics, revenue analytics, and system-wide KPIs. Features real-time monitoring of all business operations across multiple venues.' },
  { path: '/qo-a-002', component: QoA002, title: 'QO-A002: Multi-Location Management', description: 'Centralized management interface for multiple restaurant locations with individual performance tracking, standardized menu distribution, and location-specific customization capabilities.' },
  { path: '/qo-a-003', component: QoA003, title: 'QO-A003: Global Menu Management', description: 'Enterprise-level menu management system for standardizing offerings across multiple locations while allowing location-specific modifications. Features bulk pricing updates and global inventory coordination.' },
  { path: '/qo-a-004', component: QoA004, title: 'QO-A004: Staff Management', description: 'Comprehensive human resource management system for employee accounts, role assignments, permission management, and performance tracking across all locations with scheduling integration.' },
  { path: '/qo-a-005', component: QoA005, title: 'QO-A005: Analytics & Reports', description: 'Advanced business intelligence platform providing detailed analytics, custom report generation, and predictive insights for strategic decision-making with exportable data formats.' },
  { path: '/qo-a-006', component: QoA006, title: 'QO-A006: System Settings', description: 'System-wide configuration management interface for global settings, integration management, security protocols, and platform customization with backup and restore capabilities.' },
  { path: '/qo-a-007', component: QoA007, title: 'QO-A007: Payment Management', description: 'Financial operations management system handling payment processing, settlement tracking, fee management, and financial reporting with integration to accounting systems.' },
  { path: '/qo-a-008', component: QoA008, title: 'QO-A008: Customer Management', description: 'Customer relationship management system providing customer data analytics, feedback management, loyalty program administration, and personalized marketing campaign tools.' },
  { path: '/qo-a-009', component: QoA009, title: 'QO-A009: Inventory Management', description: 'Enterprise inventory management system with automated reordering, supplier integration, waste tracking, and cost optimization across all locations with predictive analytics.' },
  { path: '/qo-a-010', component: QoA010, title: 'QO-A010: Promotion Management', description: 'Marketing campaign management system for creating, managing, and tracking promotional campaigns, discount codes, and loyalty programs with performance analytics and ROI measurement.' },
  { path: '/qo-a-011', component: QoA011, title: 'QO-A011: Audit Logs', description: 'Comprehensive system audit and compliance tracking interface providing detailed logs of all system activities, security events, and compliance monitoring with forensic analysis capabilities.' },
  { path: '/qo-a-012', component: QoA012, title: 'QO-A012: QR Code Management', description: 'QR code generation and management system for creating, tracking, and updating QR codes across all locations with analytics on scan rates, performance metrics, and security management.' },
];


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
                  description={page.description}
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
                  description={page.description}
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
                  description={page.description}
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
