import { useState, useEffect } from 'react';
import { ChevronRight, Clock, Star, QrCode, CreditCard, Bell } from 'lucide-react';
import { 
  Button, 
  Card, 
  AnimatedContainer, 
  StaggeredContainer
} from '../design-system';
import MobileHeader from '../components/MobileHeader';
import LanguageToggle from '../components/LanguageToggle';
import ViatableLogo from '../components/ViatableLogo';

const QOLandingPage = () => {
  const [language, setLanguage] = useState<'en' | 'ko'>('en');
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
      feature3: "Track Status",
      feature1Desc: "Scan QR code to browse menu",
      feature2Desc: "Secure payment processing",
      feature3Desc: "Real-time order tracking",
      currentTime: "Current Time",
      restaurantHours: "Open until 10:00 PM",
      quickFeatures: "Quick Features"
    },
    ko: {
      title: "환영합니다!",
      subtitle: "테이블에서 바로 주문하세요",
      startButton: "주문 시작",
      tableInfo: "테이블 12 • 더 비스트로",
      feature1: "스캔 & 주문",
      feature2: "온라인 결제",
      feature3: "상태 추적",
      feature1Desc: "QR 코드를 스캔하여 메뉴 둘러보기",
      feature2Desc: "안전한 결제 처리",
      feature3Desc: "실시간 주문 추적",
      currentTime: "현재 시간",
      restaurantHours: "오후 10시까지 영업",
      quickFeatures: "빠른 기능"
    }
  };

  const currentContent = content[language];

  const features = [
    {
      icon: QrCode,
      title: currentContent.feature1,
      description: currentContent.feature1Desc,
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: CreditCard,
      title: currentContent.feature2,
      description: currentContent.feature2Desc,
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Bell,
      title: currentContent.feature3,
      description: currentContent.feature3Desc,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50 to-secondary-50">
      {/* Mobile Header */}
      <MobileHeader
        title={currentContent.title}
        subtitle={currentContent.tableInfo}
        showBackButton={false}
        rightElement={
          <LanguageToggle
            language={language}
            onLanguageChange={setLanguage}
            size="sm"
          />
        }
      />

      {/* Mobile Content */}
      <div className="p-4 space-y-6">
        {/* VIATABLE Logo */}
        <div className="text-center pt-4">
          <ViatableLogo size="lg" className="justify-center" />
          <p className="text-sm text-neutral-600 mt-2 font-medium">Smart QR Ordering Platform</p>
        </div>

        {/* Welcome Section */}
        <AnimatedContainer animation="slideUp" className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            {currentContent.title}
          </h1>
          <p className="text-neutral-600 mb-4">{currentContent.subtitle}</p>
          
          {/* Current Time */}
          <Card className="p-4 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-1">
              <Clock className="w-4 h-4" />
              <span>{currentContent.currentTime}</span>
            </div>
            <div className="text-2xl font-mono font-bold text-gray-900">
              {currentTime.toLocaleTimeString(language === 'ko' ? 'ko-KR' : 'en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {currentContent.restaurantHours}
            </div>
          </Card>
        </AnimatedContainer>

        {/* Quick Features */}
        <AnimatedContainer animation="slideUp" delay={100}>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            {currentContent.quickFeatures}
          </h2>
          <StaggeredContainer animation="slideUp" staggerDelay={100} className="space-y-3">
            {features.map((feature, index) => (
              <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </StaggeredContainer>
        </AnimatedContainer>

        {/* Start Ordering Button */}
        <AnimatedContainer animation="slideUp" delay={200} className="text-center">
          <Button
            variant="gradient"
            size="lg"
            fullWidth
            rightIcon={<ChevronRight className="w-5 h-5" />}
            onClick={() => window.location.href = '/qo-c-002'}
            className="text-lg font-semibold py-4"
          >
            {currentContent.startButton}
          </Button>
        </AnimatedContainer>

        {/* Restaurant Info */}
        <AnimatedContainer animation="slideUp" delay={300}>
          <Card className="p-4 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">The Bistro</h3>
              <p className="text-sm text-gray-600 mb-3">
                {language === 'ko' 
                  ? '신선한 재료로 만든 정통 요리를 제공하는 프리미엄 레스토랑입니다.'
                  : 'Premium restaurant serving authentic dishes with fresh ingredients.'
                }
              </p>
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span>4.9/5</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{language === 'ko' ? '15분' : '15 min'}</span>
                </div>
              </div>
            </div>
          </Card>
        </AnimatedContainer>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 pt-4">
          <p>Powered by VIATABLE</p>
          <p className="mt-1">
            {language === 'ko' 
              ? '스마트 QR 주문 플랫폼으로 더 나은 식사 경험을 제공합니다.'
              : 'Providing better dining experiences with smart QR ordering platform.'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default QOLandingPage;