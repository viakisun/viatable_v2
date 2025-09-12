import React, { useState } from 'react';
import { Lock, CheckCircle, AlertCircle, CreditCard, Shield, Clock } from 'lucide-react';
import { 
  Button, 
  Input, 
  Card, 
  AnimatedContainer
} from '../design-system';
import MobileHeader from '../components/MobileHeader';
import LanguageToggle from '../components/LanguageToggle';

type PaymentStatusType = 'input' | 'processing' | 'success' | 'failed';

const QOPayment = () => {
  const [language, setLanguage] = useState<'en' | 'ko'>('en');
  const [paymentStep, setPaymentStep] = useState<PaymentStatusType>('input');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');

  const content = {
    en: { 
      title: "Secure Payment", 
      totalAmount: "Total Amount", 
      payNow: "Pay Now", 
      processing: "Processing...", 
      paymentSuccessful: "Payment Successful!", 
      paymentFailed: "Payment Failed", 
      tryAgain: "Try Again", 
      currency: "AUD",
      cardNumber: "Card Number",
      expiryDate: "Expiry Date",
      cvv: "CVV",
      cardName: "Name on Card",
      securePayment: "Secure Payment",
      encrypted: "Your payment information is encrypted and secure",
      processingTime: "Processing time: 2-3 seconds"
    },
    ko: { 
      title: "안전 결제", 
      totalAmount: "총 결제금액", 
      payNow: "결제하기", 
      processing: "처리 중...", 
      paymentSuccessful: "결제 성공!", 
      paymentFailed: "결제 실패", 
      tryAgain: "다시 시도", 
      currency: "원",
      cardNumber: "카드 번호",
      expiryDate: "만료일",
      cvv: "CVV",
      cardName: "카드 소유자명",
      securePayment: "안전한 결제",
      encrypted: "결제 정보가 암호화되어 안전하게 처리됩니다",
      processingTime: "처리 시간: 2-3초"
    }
  };

  const orderData = { total: { AUD: 74.55, KRW: 107625 } };
  const currentContent = content[language];
  const currencyCode = language === 'ko' ? 'KRW' : 'AUD';

  const processPayment = () => {
    setPaymentStep('processing');
    setTimeout(() => {
      setPaymentStep(Math.random() > 0.1 ? 'success' : 'failed');
    }, 2000);
  };

  const PaymentStatus = ({ status }: { status: PaymentStatusType }) => {
    const statuses: Record<PaymentStatusType, { 
      icon: React.ReactNode; 
      title: string; 
      color: string;
      bgColor: string;
      textColor: string;
    }> = {
      input: { 
        icon: <div></div>, 
        title: '', 
        color: '',
        bgColor: '',
        textColor: ''
      },
      processing: { 
        icon: <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>, 
        title: currentContent.processing, 
        color: 'primary',
        bgColor: 'bg-primary-50',
        textColor: 'text-primary-600'
      },
      success: { 
        icon: <CheckCircle className="w-12 h-12 text-green-500" />, 
        title: currentContent.paymentSuccessful, 
        color: 'green',
        bgColor: 'bg-green-50',
        textColor: 'text-green-600'
      },
      failed: { 
        icon: <AlertCircle className="w-12 h-12 text-red-500" />, 
        title: currentContent.paymentFailed, 
        color: 'red',
        bgColor: 'bg-red-50',
        textColor: 'text-red-600'
      }
    };
    
    const currentStatus = statuses[status];
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-sm w-full">
          <div className={`w-20 h-20 ${currentStatus.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
            {currentStatus.icon}
          </div>
          <h2 className={`text-2xl font-bold text-gray-900 mb-4`}>{currentStatus.title}</h2>
          {status === 'success' && (
            <div className="space-y-4">
              <p className="text-gray-600">
                {language === 'ko' 
                  ? '결제가 성공적으로 완료되었습니다!'
                  : 'Your payment has been processed successfully!'
                }
              </p>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => window.location.href = '/qo-c-007'}
              >
                {language === 'ko' ? '주문 상태 확인' : 'Check Order Status'}
              </Button>
            </div>
          )}
          {status === 'failed' && (
            <div className="space-y-4">
              <p className="text-gray-600">
                {language === 'ko' 
                  ? '결제 처리 중 오류가 발생했습니다.'
                  : 'An error occurred while processing your payment.'
                }
              </p>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => setPaymentStep('input')}
              >
                {currentContent.tryAgain}
              </Button>
            </div>
          )}
        </Card>
      </div>
    );
  };

  if (paymentStep !== 'input') {
    return <PaymentStatus status={paymentStep} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <MobileHeader
        title={currentContent.title}
        showBackButton={true}
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
        {/* Brand Text */}
        <div className="text-center pt-4">
          <h2 className="text-lg font-bold text-neutral-900">VIATABLE</h2>
        </div>

        {/* Security Badge */}
        <AnimatedContainer animation="slideUp">
          <Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-green-800 text-sm">
                  {currentContent.securePayment}
                </h3>
                <p className="text-xs text-green-600">
                  {currentContent.encrypted}
                </p>
              </div>
            </div>
          </Card>
        </AnimatedContainer>

        {/* Order Summary */}
        <AnimatedContainer animation="slideUp" delay={100}>
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">{currentContent.totalAmount}</h3>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">
                {language === 'ko' ? '총 결제 금액' : 'Total Payment Amount'}
              </span>
              <span className="text-2xl font-bold text-gray-900">
                {currencyCode === 'KRW' 
                  ? `₩${orderData.total.KRW.toLocaleString()}` 
                  : `$${orderData.total.AUD}`
                }
              </span>
            </div>
            <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{currentContent.processingTime}</span>
            </div>
          </Card>
        </AnimatedContainer>

        {/* Payment Form */}
        <AnimatedContainer animation="slideUp" delay={200}>
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">
              {language === 'ko' ? '결제 정보 입력' : 'Payment Information'}
            </h3>
            
            <div className="space-y-4">
              <Input
                label={currentContent.cardNumber}
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                leftIcon={<CreditCard className="w-4 h-4" />}
                size="sm"
              />
              
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label={currentContent.expiryDate}
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  size="sm"
                />
                <Input
                  label={currentContent.cvv}
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  size="sm"
                />
              </div>
              
              <Input
                label={currentContent.cardName}
                placeholder={language === 'ko' ? '홍길동' : 'John Doe'}
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                size="sm"
              />
            </div>
          </Card>
        </AnimatedContainer>

        {/* Payment Button */}
        <AnimatedContainer animation="slideUp" delay={300}>
          <Button
            variant="gradient"
            size="lg"
            fullWidth
            onClick={processPayment}
            leftIcon={<Lock className="w-4 h-4" />}
            className="text-lg font-semibold py-4"
          >
            {currentContent.payNow}
          </Button>
        </AnimatedContainer>

        {/* Security Notice */}
        <div className="text-center text-xs text-gray-500">
          <p>
            {language === 'ko' 
              ? '256비트 SSL 암호화로 보호되는 안전한 결제 시스템'
              : 'Secure payment system protected by 256-bit SSL encryption'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default QOPayment;