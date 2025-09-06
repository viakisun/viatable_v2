import React, { useState } from 'react';
import { QrCode } from 'lucide-react';

// This component now manages its own language state for demo purposes.
const AppHeader: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleLanguageChange = (lang: 'en' | 'ko') => {
    setSelectedLanguage(lang);
    // In a real app, this would likely call a global context update.
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-4 bg-white/80 backdrop-blur-sm border-b border-slate-200">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
          <QrCode className="w-5 h-5 text-white" />
        </div>
        <span className="font-semibold text-slate-900">QR Order</span>
      </div>

      <div className="flex bg-slate-200 rounded-full p-1">
        <button
          onClick={() => handleLanguageChange('en')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
            selectedLanguage === 'en'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => handleLanguageChange('ko')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
            selectedLanguage === 'ko'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600'
          }`}
        >
          한국어
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
