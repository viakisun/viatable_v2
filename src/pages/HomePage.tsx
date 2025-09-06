import React from 'react';
import IphoneFrame from '../components/IphoneFrame';

// Import all page components
import QoC001 from './qo_c001_landing';
import QoC002 from './qo_c002_menu';
import QoC003 from './qo_c003_item_details';
import QoC004 from './qo_c004_cart';
import QoC005 from './qo_c005_checkout';
import QoC006 from './qo_c006_payment';
import QoC007 from './qo_c007_order_status';
import QoC008 from './qo_c008_confirmation';
import QoS001 from './qo_s001_staff_login';
import QoS002 from './qo_s002_dashboard';
import QoS003 from './qo_s003_order_management';
import QoS004 from './qo_s004_kitchen_display';
import QoS005 from './qo_s005_menu_management';
import QoS006 from './qo_s006_table_management';
import QoS007 from './qo_s007_customer_service';
import QoS008 from './qo_s008_staff_analytics';

const customerPages = [
  { id: 'QO-C001', title: 'Landing Page', Component: QoC001 },
  { id: 'QO-C002', title: 'Menu Catalog', Component: QoC002 },
  { id: 'QO-C003', title: 'Item Details', Component: QoC003 },
  { id: 'QO-C004', title: 'Shopping Cart', Component: QoC004 },
  { id: 'QO-C005', title: 'Checkout', Component: QoC005 },
  { id: 'QO-C006', title: 'Payment', Component: QoC006 },
  { id: 'QO-C007', title: 'Order Status', Component: QoC007 },
  { id: 'QO-C008', title: 'Confirmation', Component: QoC008 },
];

const staffPages = [
  { id: 'QO-S001', title: 'Staff Login', Component: QoS001 },
  { id: 'QO-S002', title: 'Dashboard', Component: QoS002 },
  { id: 'QO-S003', title: 'Order Management', Component: QoS003 },
  { id: 'QO-S004', title: 'Kitchen Display', Component: QoS004 },
  { id: 'QO-S005', title: 'Menu Management', Component: QoS005 },
  { id: 'QO-S006', title: 'Table Management', Component: QoS006 },
  { id: 'QO-S007', title: 'Customer Service', Component: QoS007 },
  { id: 'QO-S008', title: 'Staff Analytics', Component: QoS008 },
];

const ShowcaseItem = ({ id, title, Component }) => (
  <div className="showcase-item">
    <h3 className="page-title">{id}: {title}</h3>
    <div className="frame-container">
      <IphoneFrame>
        <Component />
      </IphoneFrame>
    </div>
  </div>
);

const HomePage: React.FC = () => {
  return (
    <div className="showcase-container">
      <header className="showcase-header">
        <h1>QO-DEMO Application Showcase</h1>
        <p>Scroll down to see the entire application flow at a glance.</p>
      </header>
      <main>
        <section className="showcase-section">
          <h2 className="section-title">Customer Flow</h2>
          {customerPages.map(page => <ShowcaseItem key={page.id} {...page} />)}
        </section>
        <section className="showcase-section">
          <h2 className="section-title">Staff Flow</h2>
          {staffPages.map(page => <ShowcaseItem key={page.id} {...page} />)}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
