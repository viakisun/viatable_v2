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
  { id: 'QO-C001', title: 'Landing Page', description: 'QR 스캔 후 첫 화면. 다국어(EN/KO) 지원, 실시간 시계 및 핵심 기능 미리보기를 제공합니다.', Component: QoC001 },
  { id: 'QO-C002', title: 'Menu Catalog', description: '전체 메뉴 카탈로그. 카테고리 필터, 검색, 실시간 가격 변환(AUD/KRW) 기능이 특징입니다.', Component: QoC002 },
  { id: 'QO-C003', title: 'Item Details', description: '메뉴 상세 정보, 옵션 커스터마이징, 수량 선택 및 특별 요청사항을 입력합니다.', Component: QoC003 },
  { id: 'QO-C004', title: 'Shopping Cart', description: '장바구니 관리, 수량 조절, 프로모 코드 적용 및 예상 조리시간을 표시합니다.', Component: QoC004 },
  { id: 'QO-C005', title: 'Checkout', description: '고객 정보 입력, 서비스 유형(매장/포장) 및 다양한 결제 방법을 선택합니다.', Component: QoC005 },
  { id: 'QO-C006', title: 'Payment', description: '실제 결제 처리 화면. 카드 정보 마스킹, 보안 인증, 생체 인증을 지원합니다.', Component: QoC006 },
  { id: 'QO-C007', title: 'Order Status', description: '주문 상태(확인/조리중/픽업대기)를 실시간으로 추적하고 직원을 호출합니다.', Component: QoC007 },
  { id: 'QO-C008', title: 'Confirmation', description: '주문 완료를 최종 확인하고, QR 추적 코드와 로열티 포인트를 제공합니다.', Component: QoC008 },
];

const staffPages = [
  { id: 'QO-S001', title: 'Staff Login', description: '역할(매니저, 셰프, 서버)별 보안 로그인. PIN, QR 등 다중 방식을 지원합니다.', Component: QoS001 },
  { id: 'QO-S002', title: 'Dashboard', description: '개인화된 대시보드. 핵심 KPI, 실시간 근무 시간 및 활동 피드를 제공합니다.', Component: QoS002 },
  { id: 'QO-S003', title: 'Order Management', description: '실시간 주문 관리 시스템. 상태별 필터링, 검색, 일괄 처리가 가능합니다.', Component: QoS003 },
  { id: 'QO-S004', title: 'Kitchen Display', description: '주방을 위한 칸반 보드 디스플레이. 다크 테마, 대형 폰트, 알레르기 경고 기능이 특징입니다.', Component: QoS004 },
  { id: 'QO-S005', title: 'Menu Management', description: '실시간 메뉴 및 재고 관리. 원터치 판매 중지/재개 및 인기 아이템 분석을 제공합니다.', Component: QoS005 },
  { id: 'QO-S006', title: 'Table Management', description: '테이블 상태(이용가능/사용중/예약 등)를 시각적으로 관리하고 QR코드를 생성합니다.', Component: QoS006 },
  { id: 'QO-S007', title: 'Customer Service', description: '고객 요청 관리 시스템. 유형별 분류, 실시간 채팅, 만족도 측정을 지원합니다.', Component: QoS007 },
  { id: 'QO-S008', title: 'Staff Analytics', description: '개인 및 팀의 성과(주문 처리, 평점, 효율성)를 분석하고 목표를 관리합니다.', Component: QoS008 },
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
