import { useState } from 'react';
import { CheckCircle, Home, RotateCcw, Clock, QrCode, Bell, MapPin } from 'lucide-react';
import { 
  Button, 
  Card, 
  AnimatedContainer
} from '../design-system';

const QOOrderConfirmation = () => {
  const [language] = useState<'en' | 'ko'>('en');

  const content = {
    en: { 
      title: "Order Confirmed!", 
      thankYou: "Thank you for your order", 
      orderNumber: "Order #",
      confirmation: "Your order has been confirmed and is being prepared",
      estimatedTime: "Estimated ready time",
      minutes: "minutes",
      orderDetails: "Order Details",
      totalAmount: "Total",
      paymentMethod: "Payment",
      tableNumber: "Table",
      items: "items",
      nextSteps: "What happens next?",
      step1: "Kitchen receives your order",
      step2: "We'll notify you when ready",
      step3: "Pick up at the counter",
      trackOrder: "Track Order",
      newOrder: "Order Again",
      backToMenu: "Back to Menu",
      poweredBy: "Powered by VIATABLE"
    },
    ko: { 
      title: "주문 완료!", 
      thankYou: "주문해주셔서 감사합니다", 
      orderNumber: "주문번호",
      confirmation: "주문이 확인되었으며 준비 중입니다",
      estimatedTime: "예상 완성 시간",
      minutes: "분",
      orderDetails: "주문 내역",
      totalAmount: "총 금액",
      paymentMethod: "결제 방법",
      tableNumber: "테이블",
      items: "개 항목",
      nextSteps: "다음 단계는?",
      step1: "주방에서 주문을 받았습니다",
      step2: "준비되면 알려드리겠습니다",
      step3: "카운터에서 픽업하세요",
      trackOrder: "주문 추적",
      newOrder: "다시 주문",
      backToMenu: "메뉴로 돌아가기",
      poweredBy: "VIATABLE로 제공"
    }
  };

  const orderData = { 
    orderNumber: "VT-2024-001",
    total: { AUD: 74.55, KRW: 107625 },
    paymentMethod: "Credit Card",
    tableNumber: 12,
    estimatedTime: 15,
    itemCount: 4
  };

  const currentContent = content[language];
  const currencyCode = language === 'ko' ? 'KRW' : 'AUD';

  const nextSteps = [
    {
      icon: Clock,
      title: currentContent.step1,
      time: "1-2 min"
    },
    {
      icon: Bell,
      title: currentContent.step2,
      time: "10-15 min"
    },
    {
      icon: CheckCircle,
      title: currentContent.step3,
      time: "Ready!"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-primary-50">
      {/* Success Header */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 text-center">
        <CheckCircle className="w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">{currentContent.title}</h1>
        <p className="text-green-100 text-sm">{currentContent.thankYou}</p>
      </div>

      {/* Mobile Content */}
      <div className="p-4 space-y-4 -mt-20">
        {/* Order Info Card */}
        <AnimatedContainer animation="slideUp">
          <Card className="p-6 shadow-lg">
            <div className="text-center mb-6">
              <div className="text-sm text-gray-500 mb-1">{currentContent.orderNumber}</div>
              <div className="text-2xl font-bold text-gray-900 font-mono">#{orderData.orderNumber}</div>
              <p className="text-gray-600 text-sm mt-2">{currentContent.confirmation}</p>
            </div>

            {/* Order Summary */}
            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">{currentContent.totalAmount}</span>
                <span className="font-semibold text-gray-900">
                  {currencyCode === 'KRW' 
                    ? `₩${orderData.total.KRW.toLocaleString()}` 
                    : `$${orderData.total.AUD}`
                  }
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">{currentContent.paymentMethod}</span>
                <span className="text-gray-900 text-sm">{orderData.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">{currentContent.tableNumber}</span>
                <span className="text-gray-900 text-sm">#{orderData.tableNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">{currentContent.estimatedTime}</span>
                <span className="text-gray-900 text-sm font-medium">
                  {orderData.estimatedTime} {currentContent.minutes}
                </span>
              </div>
            </div>
          </Card>
        </AnimatedContainer>

        {/* Next Steps */}
        <AnimatedContainer animation="slideUp" delay={100}>
          <Card className="p-4">
            <h2 className="font-semibold text-gray-900 mb-4 text-sm">{currentContent.nextSteps}</h2>
            <div className="space-y-3">
              {nextSteps.map((step, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm">{step.title}</h3>
                  </div>
                  <div className="text-xs text-gray-500 font-medium">{step.time}</div>
                </div>
              ))}
            </div>
          </Card>
        </AnimatedContainer>

        {/* Action Buttons */}
        <AnimatedContainer animation="slideUp" delay={200}>
          <div className="space-y-3">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              leftIcon={<Home className="w-4 h-4" />}
              onClick={() => window.location.href = '/qo-c-007'}
            >
              {currentContent.trackOrder}
            </Button>
            
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
                variant="outline"
                size="lg"
                leftIcon={<MapPin className="w-4 h-4" />}
                onClick={() => window.location.href = '/qo-c-001'}
              >
                {currentContent.backToMenu}
              </Button>
            </div>
          </div>
        </AnimatedContainer>

        {/* QR Code for Tracking */}
        <AnimatedContainer animation="slideUp" delay={300}>
          <Card className="p-4 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <QrCode className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1 text-sm">
              {language === 'ko' ? '주문 추적 QR' : 'Order Tracking QR'}
            </h3>
            <p className="text-xs text-gray-600">
              {language === 'ko' 
                ? 'QR 코드를 스캔하여 주문 상태를 확인하세요'
                : 'Scan QR code to track your order'
              }
            </p>
          </Card>
        </AnimatedContainer>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 pt-4">
          <p>{currentContent.poweredBy}</p>
        </div>
      </div>
    </div>
  );
};

export default QOOrderConfirmation;