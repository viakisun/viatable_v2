import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home, Coffee, ShoppingCart, CreditCard, CheckCircle, User, Settings, BarChart2,
  Users, ClipboardList, ChefHat, LayoutGrid, MessageSquare, Star
} from 'lucide-react';
import './HomePage.css';

const customerPages = [
  { id: 'QO-C001', title: 'Landing Page', description: '언어 선택, 테이블 정보', icon: <Home />, link: '/qo-c-001' },
  { id: 'QO-C002', title: 'Menu Catalog', description: '메뉴 카탈로그, 카테고리 필터', icon: <Coffee />, link: '/qo-c-002' },
  { id: 'QO-C003', title: 'Item Details', description: '상세 페이지, 커스터마이징', icon: <Star />, link: '/qo-c-003' },
  { id: 'QO-C004', title: 'Shopping Cart', description: '장바구니, 프로모 코드', icon: <ShoppingCart />, link: '/qo-c-004' },
  { id: 'QO-C005', title: 'Checkout', description: '고객 정보, 결제 방법 선택', icon: <CreditCard />, link: '/qo-c-005' },
  { id: 'QO-C008', title: 'Confirmation', description: '주문 완료, QR 코드', icon: <CheckCircle />, link: '/qo-c-008' },
];

const staffPages = [
  { id: 'QO-S001', title: 'Staff Login', description: '다중 로그인, 보안 인증', icon: <User />, link: '/qo-s-001' },
  { id: 'QO-S002', title: 'Dashboard', description: '개인화 대시보드, 통계', icon: <LayoutGrid />, link: '/qo-s-002' },
  { id: 'QO-S003', title: 'Order Mgmt', description: '주문 관리, 상태별 필터링', icon: <ClipboardList />, link: '/qo-s-003' },
  { id: 'QO-S004', title: 'Kitchen Display', description: '주방용 디스플레이, 칸반 보드', icon: <ChefHat />, link: '/qo-s-004' },
  { id: 'QO-S005', title: 'Menu Mgmt', description: '실시간 메뉴, 재고 관리', icon: <Settings />, link: '/qo-s-005' },
  { id: 'QO-S007', title: 'Customer Svc', description: '고객 요청 관리, 실시간 채팅', icon: <MessageSquare />, link: '/qo-s-007' },
  { id: 'QO-S008', title: 'Analytics', description: '개인/팀 성과 분석', icon: <BarChart2 />, link: '/qo-s-008' },
];


const PageCard = ({ id, title, description, icon, link }) => (
  <Link to={link} className="page-card">
    <div className="card-icon">{icon}</div>
    <div className="card-content">
      <div className="card-id">{id}</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  </Link>
);

const FlowConnector = () => <div className="flow-connector">→</div>;

const HomePage: React.FC = () => {
  console.log('[HomePage.tsx] Rendering interactive dashboard.');
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>QO-DEMO Interactive Dashboard</h1>
        <p>프로젝트의 전체 구조와 사용자 흐름을 확인하세요.</p>
      </header>

      <main>
        <section className="flow-section">
          <h2 className="section-title">
            <Users className="inline-block mr-2" />
            고객용 페이지 흐름 (Customer Flow)
          </h2>
          <div className="flow-grid">
            {customerPages.map((page, index) => (
              <React.Fragment key={page.id}>
                <PageCard {...page} />
                {index < customerPages.length - 1 && <FlowConnector />}
              </React.Fragment>
            ))}
          </div>
        </section>

        <section className="flow-section">
          <h2 className="section-title">
            <Users className="inline-block mr-2" />
            직원용 페이지 흐름 (Staff Flow)
          </h2>
          <div className="flow-grid">
            {staffPages.map((page, index) => (
              <React.Fragment key={page.id}>
                <PageCard {...page} />
                {index < staffPages.length - 1 && <FlowConnector />}
              </React.Fragment>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
