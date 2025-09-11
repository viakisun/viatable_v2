import { useState, useEffect } from 'react';
import { ChevronRight, Clock, Star, QrCode } from 'lucide-react';
import { useLanguage } from '../contexts/useLanguage';
import PageLayout from '../components/PageLayout';

const QOLandingPage = () => {
  const { language, setLanguage } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const content = {
    en: {
      title: "Welcome!",
      subtitle: "Order from your table",
      startButton: "Start Ordering",
      tableInfo: "Table 12 • The Bistro",
      feature1: "Scan & Order",
      feature2: "Pay Online",
      feature3: "Track Status"
    },
    ko: {
      title: "환영합니다!",
      subtitle: "테이블에서 바로 주문하세요",
      startButton: "주문 시작",
      tableInfo: "테이블 12 • 더 비스트로",
      feature1: "스캔 & 주문",
      feature2: "온라인 결제",
      feature3: "상태 추적"
    }
  };

  const currentContent = content[language];

  const LanguageSwitcher = () => (
    <div className="flex bg-slate-100 rounded-full p-1">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 text-sm font-semibold rounded-full ${language === 'en' ? 'bg-white shadow' : 'text-slate-500'}`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('ko')}
        className={`px-3 py-1 text-sm font-semibold rounded-full ${language === 'ko' ? 'bg-white shadow' : 'text-slate-500'}`}
      >
        KO
      </button>
    </div>
  );

  return (
    <PageLayout title={currentContent.tableInfo} backLink={undefined} headerActions={<LanguageSwitcher />}>
      <div className="flex flex-col items-center justify-center text-center pt-8 pb-12">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
          <QrCode className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">{currentContent.title}</h1>
        <p className="text-lg text-slate-600 mb-8">{currentContent.subtitle}</p>

        <a href="/qo-c-002" className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center hover:bg-slate-800 transition-colors">
          <span>{currentContent.startButton}</span>
          <ChevronRight className="w-5 h-5 ml-2" />
        </a>
      </div>

      <div className="bg-white rounded-xl p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center">
            <Star className="w-8 h-8 text-yellow-500 mb-2" />
            <span className="text-sm font-medium text-slate-700">{currentContent.feature1}</span>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="w-8 h-8 text-blue-500 mb-2" />
            <span className="text-sm font-medium text-slate-700">{currentContent.feature2}</span>
          </div>
          <div className="flex flex-col items-center">
            <ChevronRight className="w-8 h-8 text-green-500 mb-2" />
            <span className="text-sm font-medium text-slate-700">{currentContent.feature3}</span>
          </div>
        </div>
      </div>
      <div className="text-center mt-4 text-slate-500 text-sm">
        {currentTime.toLocaleTimeString()}
      </div>
    </PageLayout>
  );
};

export default QOLandingPage;