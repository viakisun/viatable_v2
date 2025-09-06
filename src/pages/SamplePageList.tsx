import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

const samplePages = [
  { href: '/vt-l001', title: 'VT-L001: Viatable Landing Page' },
  { href: '/vt-l002', title: 'VT-L002: Viatable Signup Flow' },
  { href: '/vt-l003', title: 'VT-L003: Viatable Pricing Plans' },
  { href: '/vt-l004', title: 'VT-L004: Viatable Demo/Trial' },
  { href: '/vt-l005', title: 'VT-L005: Viatable Features (New)' },
  { href: '/vt-l017', title: 'VT-L017: Viatable Login (New)' },
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

const SamplePageList: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Sample Pages
          </h1>
        </div>

        <div className="mt-16">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Viatable Samples
            </h2>
            <ul>
              {samplePages.map((page) => (
                <PageLink key={page.href} {...page} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SamplePageList;
