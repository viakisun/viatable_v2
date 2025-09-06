import React from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import AppHeader from './AppHeader'; // The truly global header (QR, App Name)

interface PageLayoutProps {
  title: string;
  backLink?: string;
  headerActions?: ReactNode;
  children: ReactNode;
  // Prop to control padding for pages that need edge-to-edge content
  removeMainPadding?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, backLink, headerActions, children, removeMainPadding = false }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backLink) {
      navigate(backLink);
    } else {
      navigate(-1); // Go back to the previous page in history as a fallback
    }
  };

  return (
    <div className="min-h-full bg-slate-50">
      {/* This is the top-most header with App Name and Language toggle */}
      <AppHeader />

      {/* This is the page-specific sticky header */}
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-slate-200 pt-16">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            {/* Show back button if backLink is provided. An empty string means show but use history. */}
            {backLink !== undefined && (
              <button onClick={handleBack} className="p-2 -ml-2 text-slate-600 hover:text-slate-900 rounded-full transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <h1 className="text-lg font-semibold text-slate-900 truncate">{title}</h1>
          </div>
          <div className="flex items-center space-x-2">
            {headerActions}
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className={removeMainPadding ? '' : 'p-4'}>
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
