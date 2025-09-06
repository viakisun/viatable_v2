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
  { id: 'QO-C001', title: 'Landing Page', description: 'QR 스캔 후 첫 화면, 언어 선택 기능', Component: QoC001 },
  { id: 'QO-C002', title: 'Menu Catalog', description: '메뉴 탐색, 카테고리 필터 및 검색', Component: QoC002 },
  { id: 'QO-C003', title: 'Item Details', description: '메뉴 상세 정보와 옵션 커스터마이징', Component: QoC003 },
  { id: 'QO-C004', title: 'Shopping Cart', description: '장바구니 관리 및 최종 주문 전 확인', Component: QoC004 },
  { id: 'QO-C005', title: 'Checkout', description: '고객 정보 입력 및 결제 방법 선택', Component: QoC005 },
  { id: 'QO-C006', title: 'Payment', description: '실제 결제 처리 및 보안 인증', Component: QoC006 },
  { id: 'QO-C007', title: 'Order Status', description: '실시간 주문 상태 추적', Component: QoC007 },
  { id: 'QO-C008', title: 'Confirmation', description: '주문 완료 확인 및 다음 단계 안내', Component: QoC008 },
];

const staffPages = [
  { id: 'QO-S001', title: 'Staff Login', description: '역할별 보안 로그인', Component: QoS001 },
  { id: 'QO-S002', title: 'Dashboard', description: '핵심 KPI 및 실시간 활동 피드', Component: QoS002 },
  { id: 'QO-S003', title: 'Order Management', description: '실시간 주문 관리 시스템', Component: QoS003 },
  { id: 'QO-S004', title: 'Kitchen Display', description: '주방을 위한 칸반 보드 디스플레이', Component: QoS004 },
  { id: 'QO-S005', title: 'Menu Management', description: '실시간 메뉴 및 재고 관리', Component: QoS005 },
  { id: 'QO-S006', title: 'Table Management', description: '테이블 상태 및 QR 코드 관리', Component: QoS006 },
  { id: 'QO-S007', title: 'Customer Service', description: '고객 요청 및 실시간 채팅 관리', Component: QoS007 },
  { id: 'QO-S008', title: 'Staff Analytics', description: '개인 및 팀 성과 분석', Component: QoS008 },
];

const ShowcaseItem = ({ id, title, description, Component }) => (
  <div className="showcase-item">
    <div className="page-title-container">
      <h3 className="page-title">{id}: {title}</h3>
      <p className="page-description">{description}</p>
    </div>
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
        <p className="intro-text">A modern, QR-based smart dining solution designed to streamline the ordering process for both customers and staff.</p>
      </header>
      <main>
        <section className="showcase-section">
          <h2 className="section-title">✨ Key Features</h2>
          <div className="features-grid">
            <div className="feature-card"><strong>Modern Stack</strong><p>React + Tailwind CSS</p></div>
            <div className="feature-card"><strong>Responsive</strong><p>Mobile-First Design</p></div>
            <div className="feature-card"><strong>Real-time</strong><p>Live Order & Status Tracking</p></div>
            <div className="feature-card"><strong>Globalized</strong><p>Multi-language & Currency</p></div>
          </div>
        </section>

        <section className="showcase-section">
          <h2 className="section-title">Customer Flow</h2>
          <p className="flow-description">The customer's journey from scanning the QR code to receiving their order confirmation.</p>
          {customerPages.map(page => <ShowcaseItem key={page.id} {...page} />)}
        </section>

        <section className="showcase-section">
          <h2 className="section-title">Staff Flow</h2>
          <p className="flow-description">The staff's workflow for managing orders, tables, and restaurant operations efficiently.</p>
          {staffPages.map(page => <ShowcaseItem key={page.id} {...page} />)}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
