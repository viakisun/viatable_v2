import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Users, Briefcase, Shield } from 'lucide-react';

const adminPages = [
  { href: '/qo-a-001', title: 'QO-A001: Admin Dashboard' },
  { href: '/qo-a-002', title: 'QO-A002: Multi-Location Management' },
  { href: '/qo-a-003', title: 'QO-A003: Global Menu Management' },
  { href: '/qo-a-004', title: 'QO-A004: Staff Management' },
  { href: '/qo-a-005', title: 'QO-A005: Analytics & Reports' },
  { href: '/qo-a-006', title: 'QO-A006: System Settings' },
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
      className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
    >
      <span className="font-medium text-gray-700">{title}</span>
      <ExternalLink className="w-5 h-5 text-gray-400" />
    </Link>
  </li>
);

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            viatable
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            viatable will be launched in December. Simultaneous service open in Korea/Australia.
          </p>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            (viatable 12월에 오픈 예정. 한국/호주 동시 서비스 오픈.)
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Admin Pages */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Shield className="w-7 h-7 mr-3 text-red-500" />
              Admin Pages
            </h2>
            <ul>
              {adminPages.map((page) => (
                <PageLink key={page.href} {...page} />
              ))}
            </ul>
          </div>

          {/* Customer Pages */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Users className="w-7 h-7 mr-3 text-indigo-500" />
              Customer Pages
            </h2>
            <ul>
              {customerPages.map((page) => (
                <PageLink key={page.href} {...page} />
              ))}
            </ul>
          </div>

          {/* Staff Pages */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Briefcase className="w-7 h-7 mr-3 text-green-500" />
              Staff Pages
            </h2>
            <ul>
              {staffPages.map((page) => (
                <PageLink key={page.href} {...page} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
