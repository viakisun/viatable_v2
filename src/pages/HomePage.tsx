import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Coffee, User, Settings, BarChart2, Users, ClipboardList, ChefHat, LayoutGrid, MessageSquare } from 'lucide-react';
import './HomePage.css'; // I will recreate this CSS file in the next step

const customerPages = [
  { id: 'QO-C001', title: 'Landing Page', description: 'QR 스캔 후 첫 화면', icon: <Home />, link: '/qo-c-001' },
  { id: 'QO-C002', title: 'Menu Catalog', description: '메뉴 탐색 및 검색', icon: <Coffee />, link: '/qo-c-002' },
  // Add other customer pages here...
];

const staffPages = [
  { id: 'QO-S001', title: 'Staff Login', description: '보안 로그인', icon: <User />, link: '/qo-s-001' },
  { id: 'QO-S002', title: 'Dashboard', description: '개인화 대시보드', icon: <LayoutGrid />, link: '/qo-s-002' },
  // Add other staff pages here...
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

const HomePage: React.FC = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>QO-DEMO Project</h1>
        <p>Select a page to view the demo</p>
      </header>
      <main>
        <section className="flow-section">
          <h2 className="section-title">Customer Pages</h2>
          <div className="card-grid">
            {customerPages.map(page => <PageCard key={page.id} {...page} />)}
          </div>
        </section>
        <section className="flow-section">
          <h2 className="section-title">Staff Pages</h2>
          <div className="card-grid">
            {staffPages.map(page => <PageCard key={page.id} {...page} />)}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
