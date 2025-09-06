import React, { useState, useEffect } from 'react';
import { ChevronRight, Clock, Star, QrCode } from 'lucide-react';
import AppHeader from '../components/AppHeader';

const QOLandingPage = () => {
  console.log('[qo_c001_landing.tsx] Rendering sample page inside the frame.');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLanguageSwitch = (lang: 'en' | 'ko') => {
    setSelectedLanguage(lang);
  };

  const handleStartOrdering = () => {
    setIsLoading(true);
    // Simulate navigation delay
    setTimeout(() => {
      alert('Navigating to menu... (QO-C002)');
      setIsLoading(false);
    }, 1500);
  };

  const content = {
    en: {
      title: "Welcome to Smart Dining",
      subtitle: "Order directly from your table",
      description: "Scan, browse, order, and pay - all from your smartphone",
      features: [
        { icon: <QrCode className="w-5 h-5" />, text: "Contactless Ordering" },
        { icon: <Clock className="w-5 h-5" />, text: "Real-time Updates" },
        { icon: <Star className="w-5 h-5" />, text: "Premium Experience" }
      ],
      startButton: "Start Ordering",
      menuPreview: "View Menu",
      tableInfo: "Table 12 • The Bistro",
      openingHours: "Open until 10:00 PM",
      loading: "Loading menu..."
    },
    ko: {
      title: "스마트 다이닝에 오신 것을 환영합니다",
      subtitle: "테이블에서 바로 주문하세요",
      description: "스캔, 둘러보기, 주문, 결제 - 모든 것을 스마트폰으로",
      features: [
        { icon: <QrCode className="w-5 h-5" />, text: "비접촉 주문" },
        { icon: <Clock className="w-5 h-5" />, text: "실시간 업데이트" },
        { icon: <Star className="w-5 h-5" />, text: "프리미엄 경험" }
      ],
      startButton: "주문 시작",
      menuPreview: "메뉴 보기",
      tableInfo: "테이블 12 • 더 비스트로",
      openingHours: "오후 10시까지 영업",
      loading: "메뉴 로딩 중..."
    }
  };

  const currentContent = content[selectedLanguage];

  return (
    <div className="relative min-h-full bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      <AppHeader selectedLanguage={selectedLanguage} onLanguageChange={handleLanguageSwitch} />

      {/* Main Content with Safe Area Padding */}
      <main className="flex-1 flex flex-col justify-center px-6 py-8 pt-20">
        {/* Restaurant Info */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-slate-200 mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-slate-600">{currentContent.tableInfo}</span>
          </div>
          
          <h1 className="text-3xl font-bold text-slate-900 mb-2 leading-tight">
            {currentContent.title}
          </h1>
          
          <p className="text-lg text-slate-600 mb-2">
            {currentContent.subtitle}
          </p>
          
          <p className="text-sm text-slate-500">
            {currentContent.description}
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {currentContent.features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 text-center">
              <div className="text-slate-700 mb-2 flex justify-center">
                {feature.icon}
              </div>
              <p className="text-xs font-medium text-slate-600">
                {feature.text}
              </p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleStartOrdering}
            disabled={isLoading}
            className="w-full bg-slate-900 text-white rounded-xl py-4 font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg hover:bg-slate-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{currentContent.loading}</span>
              </>
            ) : (
              <>
                <span>{currentContent.startButton}</span>
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
          
          <button className="w-full bg-white text-slate-700 border border-slate-300 rounded-xl py-3 font-medium flex items-center justify-center space-x-2 hover:bg-slate-50 transition-colors">
            <span>{currentContent.menuPreview}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="p-4 bg-white/80 backdrop-blur-sm border-t border-slate-200">
        <div className="flex justify-between items-center text-sm text-slate-500">
          <span>{currentContent.openingHours}</span>
          <span>{currentTime.toLocaleTimeString(selectedLanguage === 'ko' ? 'ko-KR' : 'en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}</span>
        </div>
      </footer>
    </div>
  );
};

export default QOLandingPage;