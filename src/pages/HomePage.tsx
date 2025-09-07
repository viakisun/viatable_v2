import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Shield, UserCheck } from 'lucide-react';

const adminPages = [
  { href: '/qo-a-001', title: 'QO-A001: Admin Dashboard' },
  { href: '/qo-a-002', title: 'QO-A002: Multi-Location Management' },
  { href: '/qo-a-003', title: 'QO-A003: Global Menu Management' },
  { href: '/qo-a-004', title: 'QO-A004: Staff Management' },
  { href: '/qo-a-005', title: 'QO-A005: Analytics & Reports' },
  { href: '/qo-a-006', title: 'QO-A006: System Settings' },
  { href: '/qo-a-007', title: 'QO-A007: Payment Management' },
  { href: '/qo-a-008', title: 'QO-A008: Customer Management' },
  { href: '/qo-a-009', title: 'QO-A009: Inventory Management' },
  { href: '/qo-a-010', title: 'QO-A010: Promotion Management' },
  { href: '/qo-a-011', title: 'QO-A011: Audit Logs' },
  { href: '/qo-a-012', title: 'QO-A012: QR Code Management' },
];

const customerPages = [
  { href: '/qo-c-001', title: 'QO-C001: Landing Page' },
  { href: '/qo-c-002', title: 'QO-C002: Menu Catalog' },
  { href: '/qo-c-003', title: 'QO-C003: Item Details' },
  { href: '/qo-c-004', title: 'QO-C004: Shopping Cart' },
  { href: '/qo-c-005', title: 'QO-C005: Checkout' },
  { href: '/qo-c-006', title: 'QO-C006: Payment' },
  { href: '/qo-c-007', title: 'QO-C007: Order Status' },
  { href: '/qo-c-008', title: 'QO-C008: Order Confirmation' },
];

const staffPages = [
  { href: '/qo-s-001', title: 'QO-S001: Staff Login' },
  { href: '/qo-s-002', title: 'QO-S002: Dashboard' },
  { href: '/qo-s-003', title: 'QO-S003: Order Management' },
  { href: '/qo-s-004', title: 'QO-S004: Kitchen Display' },
  { href: '/qo-s-005', title: 'QO-S005: Menu Management' },
  { href: '/qo-s-006', title: 'QO-S006: Table Management' },
  { href: '/qo-s-007', title: 'QO-S007: Customer Service' },
  { href: '/qo-s-008', title: 'QO-S008: Staff Analytics' },
];

const PageLink: React.FC<{ href: string; title: string }> = ({ href, title }) => (
  <li className="mb-2">
    <Link
      to={href}
      className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
    >
      <span className="font-medium text-gray-700 group-hover:text-purple-600">{title}</span>
      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
    </Link>
  </li>
);

const TABS = [
  {
    id: 'admin',
    name: 'Administrator',
    icon: Shield,
    pages: adminPages,
    description: 'Explore the powerful, centralized dashboard for multi-location management, global menu configuration, and system-wide analytics. This journey is designed for business owners and administrators to monitor and control the entire operation.'
  },
  {
    id: 'customer',
    name: 'Customer Journey',
    icon: Users,
    pages: customerPages,
    description: 'Experience the seamless customer flow from scanning a QR code to placing an order and making a payment. This journey showcases the intuitive, user-friendly interface that your customers will love.'
  },
  {
    id: 'staff',
    name: 'Staff Interface',
    icon: UserCheck,
    pages: staffPages,
    description: 'See how your staff will manage orders, update table statuses, and interact with the kitchen display. This journey is optimized for efficiency and clear communication in a fast-paced restaurant environment.'
  },
];

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('admin');

  const activeTabData = TABS.find(tab => tab.id === activeTab);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Interactive Product Showcase
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
            Explore the core user journeys of the VIATABLE platform. Click on any page to start an interactive, guided tour of our key features.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div>
          {activeTabData && (
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
                  <activeTabData.icon className="w-8 h-8 mr-3 text-purple-500" />
                  {activeTabData.name}
                </h2>
                <p className="text-gray-600">{activeTabData.description}</p>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeTabData.pages.map((page) => (
                  <PageLink key={page.href} {...page} />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
