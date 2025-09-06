import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// This is a "naked" version of the component with all styles removed for debugging.
const QOLandingPage = () => {
  const { language } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleStartOrdering = () => {
    setIsLoading(true);
    setTimeout(() => {
      alert('Navigating to menu... (QO-C002)');
      setIsLoading(false);
    }, 1500);
  };

  const content = {
    en: { title: "Welcome to Smart Dining", subtitle: "Order from your table", startButton: "Start Ordering", menuPreview: "View Menu" },
    ko: { title: "스마트 다이닝", subtitle: "테이블에서 바로 주문하세요", startButton: "주문 시작", menuPreview: "메뉴 보기" }
  };

  const currentContent = content[language];

  return (
    // Apply a single, simple test class
    <div className="bg-red-500 p-8 text-white">
      <main>
        <div>
          <h1>{currentContent.title}</h1>
          <p>{currentContent.subtitle}</p>
        </div>
        <div>
          <button onClick={handleStartOrdering} disabled={isLoading}>
            {isLoading ? 'Loading...' : currentContent.startButton}
          </button>
          <button>
            {currentContent.menuPreview}
          </button>
        </div>
      </main>
      <footer>
        <div>
          <span>Time: {currentTime.toLocaleTimeString()}</span>
        </div>
      </footer>
    </div>
  );
};

export default QOLandingPage;