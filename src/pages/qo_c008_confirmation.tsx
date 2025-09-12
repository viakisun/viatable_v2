import { useState } from 'react';
import { CheckCircle, Home, RotateCcw, Clock, Star, QrCode, Bell } from 'lucide-react';
import { 
  Button, 
  Card, 
  Badge,
  AnimatedContainer, 
  StaggeredContainer
} from '../design-system';
import MobileHeader from '../components/MobileHeader';
import LanguageToggle from '../components/LanguageToggle';

const QOOrderConfirmation = () => {
  const [language, setLanguage] = useState<'en' | 'ko'>('en');

  const content = {
    en: { 
      title: "Order Confirmed!", 
      thankYou: "Thank you for your order", 
      orderNumber: "Order Number", 
      confirmation: "Your order is confirmed", 
      estimatedTime: "Estimated ready time", 
      trackOrder: "Track Your Order", 
      whatNext: "What's Next?", 
      newOrder: "New Order",
      backToMenu: "Back to Menu",
      orderDetails: "Order Details",
      totalAmount: "Total Amount",
      paymentMethod: "Payment Method",
      tableNumber: "Table Number",
      estimatedReady: "Estimated Ready Time",
      minutes: "minutes",
      orderSummary: "Order Summary",
      items: "items",
      loyaltyPoints: "Loyalty Points Earned",
      points: "points",
      nextSteps: "Next Steps",
      step1: "We'll prepare your order",
      step2: "You'll receive notifications",
      step3: "Pick up when ready",
      poweredBy: "Powered by VIATABLE"
    },
    ko: { 
      title: "주문 완료!", 
      thankYou: "주문 감사합니다", 
      orderNumber: "주문번호", 
      confirmation: "주문이 확정되었습니다", 
      estimatedTime: "예상 완성 시간", 
      trackOrder: "주문 추적", 
      whatNext: "다음 단계", 
      newOrder: "새 주문",
      backToMenu: "메뉴로 돌아가기",
      orderDetails: "주문 상세",
      totalAmount: "총 금액",
      paymentMethod: "결제 방법",
      tableNumber: "테이블 번호",
      estimatedReady: "예상 완성 시간",
      minutes: "분",
      orderSummary: "주문 요약",
      items: "개 항목",
      loyaltyPoints: "적립된 포인트",
      points: "포인트",
      nextSteps: "다음 단계",
      step1: "주문을 준비하겠습니다",
      step2: "알림을 받으실 수 있습니다",
      step3: "준비되면 픽업하세요",
      poweredBy: "VIATABLE로 제공"
    }
  };

  const orderData = { 
    orderNumber: "VT-2024-001",
    total: { AUD: 74.55, KRW: 107625 },
    paymentMethod: "Credit Card",
    tableNumber: 12,
    estimatedTime: 15,
    itemCount: 4,
    loyaltyPoints: 75
  };

  const currentContent = content[language];
  const currencyCode = language === 'ko' ? 'KRW' : 'AUD';

  const nextSteps = [
    {
      icon: Clock,
      title: currentContent.step1,
      description: language === 'ko' ? '셰프들이 주문을 준비하고 있습니다' : 'Our chefs are preparing your order'
    },
    {
      icon: Bell,
      title: currentContent.step2,
      description: language === 'ko' ? '주문 상태 업데이트를 받으실 수 있습니다' : 'You\'ll receive order status updates'
    },
    {
      icon: CheckCircle,
      title: currentContent.step3,
      description: language === 'ko' ? '준비되면 알림을 받고 픽업하세요' : 'Pick up your order when it\'s ready'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-primary-50">
      {/* Mobile Header */}
      <MobileHeader
        title={currentContent.title}
        showBackButton={false}
        rightElement={
          <LanguageToggle
            language={language}
            onLanguageChange={setLanguage}
            size="sm"
          />
        }
      />

      {/* Success Header */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 text-center">
        <CheckCircle className="w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">{currentContent.title}</h1>
        <p className="text-green-100">{currentContent.thankYou}</p>
      </div>

      {/* Mobile Content */}
      <div className="p-4 space-y-6 -mt-24">

        {/* Order Info Card */}
        <AnimatedContainer animation="slideUp">
          <Card className="p-6 shadow-lg">
            <div className="text-center mb-6">
              <div className="text-sm text-gray-500 mb-1">{currentContent.orderNumber}</div>
              <div className="text-3xl font-bold text-gray-900 font-mono">#{orderData.orderNumber}</div>
              <p className="text-gray-600 mt-2">{currentContent.confirmation}</p>
            </div>

            {/* Order Details */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{currentContent.totalAmount}</span>
                <span className="font-semibold text-gray-900">
                  {currencyCode === 'KRW' 
                    ? `₩${orderData.total.KRW.toLocaleString()}` 
                    : `$${orderData.total.AUD}`
                  }
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{currentContent.paymentMethod}</span>
                <span className="text-gray-900">{orderData.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{currentContent.tableNumber}</span>
                <span className="text-gray-900">#{orderData.tableNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{currentContent.estimatedReady}</span>
                <span className="text-gray-900">{orderData.estimatedTime} {currentContent.minutes}</span>
              </div>
            </div>

            {/* Loyalty Points */}
            <div className="mt-4 p-3 bg-primary-50 rounded-lg border border-primary-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-primary-600" />
                  <span className="text-sm text-primary-800">{currentContent.loyaltyPoints}</span>
                </div>
                <Badge variant="primary" size="sm">
                  +{orderData.loyaltyPoints} {currentContent.points}
                </Badge>
              </div>
            </div>
          </Card>
        </AnimatedContainer>

        {/* Next Steps */}
        <AnimatedContainer animation="slideUp" delay={100}>
          <Card className="p-4">
            <h2 className="font-semibold text-gray-900 mb-4">{currentContent.nextSteps}</h2>
            <StaggeredContainer animation="slideUp" staggerDelay={100} className="space-y-3">
              {nextSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-4 h-4 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">{step.title}</h3>
                    <p className="text-xs text-gray-600 mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </StaggeredContainer>
          </Card>
        </AnimatedContainer>

        {/* Quick Actions */}
        <AnimatedContainer animation="slideUp" delay={200}>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="lg"
              leftIcon={<RotateCcw className="w-4 h-4" />}
              onClick={() => window.location.href = '/qo-c-002'}
            >
              {currentContent.newOrder}
            </Button>
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Home className="w-4 h-4" />}
              onClick={() => window.location.href = '/qo-c-007'}
            >
              {currentContent.trackOrder}
            </Button>
          </div>
        </AnimatedContainer>

        {/* QR Code for Order Tracking */}
        <AnimatedContainer animation="slideUp" delay={300}>
          <Card className="p-4 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <QrCode className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              {language === 'ko' ? '주문 추적 QR 코드' : 'Order Tracking QR Code'}
            </h3>
            <p className="text-xs text-gray-600">
              {language === 'ko' 
                ? '이 QR 코드를 스캔하여 주문 상태를 확인하세요'
                : 'Scan this QR code to track your order status'
              }
            </p>
          </Card>
        </AnimatedContainer>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 pt-4">
          <p>{currentContent.poweredBy}</p>
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

export default QOOrderConfirmation;