import { useState } from 'react';
import { 
  CreditCard, Smartphone, Gift, ArrowLeft, CheckCircle, 
  Shield, Lock
} from 'lucide-react';
import { 
  Button, 
  Input, 
  Card, 
  Badge, 
  AnimatedContainer, 
} from '../design-system';
import { cn } from '../utils/cn';

const QOCheckoutEnhanced = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ko'>('en');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    billingAddress: '',
    city: '',
    postalCode: '',
    specialInstructions: ''
  });

  const steps = [
    { id: 1, name: { en: 'Payment', ko: '결제' }, icon: CreditCard },
    { id: 2, name: { en: 'Review', ko: '검토' }, icon: CheckCircle },
    { id: 3, name: { en: 'Confirmation', ko: '확인' }, icon: Shield }
  ];

  const paymentMethods = [
    { id: 'card', name: { en: 'Credit Card', ko: '신용카드' }, icon: CreditCard, popular: true },
    { id: 'apple', name: { en: 'Apple Pay', ko: '애플페이' }, icon: Smartphone, popular: false },
    { id: 'google', name: { en: 'Google Pay', ko: '구글페이' }, icon: Smartphone, popular: false },
    { id: 'paypal', name: { en: 'PayPal', ko: '페이팔' }, icon: Gift, popular: false }
  ];

  const orderSummary = {
    items: [
      { name: { en: 'Avocado Toast Supreme', ko: '슈프림 아보카도 토스트' }, quantity: 2, price: { AUD: 18.50, KRW: 26500 } },
      { name: { en: 'Oat Milk Latte', ko: '오트밀크 라떼' }, quantity: 1, price: { AUD: 5.20, KRW: 7500 } },
      { name: { en: 'Chocolate Lava Cake', ko: '초콜릿 라바 케이크' }, quantity: 1, price: { AUD: 12.00, KRW: 17200 } }
    ],
    subtotal: { AUD: 54.20, KRW: 77700 },
    discount: { AUD: 5.42, KRW: 7770 },
    tax: { AUD: 4.88, KRW: 6993 },
    serviceFee: { AUD: 2.44, KRW: 3497 },
    total: { AUD: 56.10, KRW: 80420 }
  };

  const currentContent = {
    title: language === 'ko' ? '결제' : 'Checkout',
    back: language === 'ko' ? '뒤로' : 'Back',
    paymentMethod: language === 'ko' ? '결제 방법' : 'Payment Method',
    billingInfo: language === 'ko' ? '청구 정보' : 'Billing Information',
    orderSummary: language === 'ko' ? '주문 요약' : 'Order Summary',
    placeOrder: language === 'ko' ? '주문하기' : 'Place Order',
    processing: language === 'ko' ? '처리 중...' : 'Processing...',
    firstName: language === 'ko' ? '이름' : 'First Name',
    lastName: language === 'ko' ? '성' : 'Last Name',
    email: language === 'ko' ? '이메일' : 'Email',
    phone: language === 'ko' ? '전화번호' : 'Phone',
    cardNumber: language === 'ko' ? '카드 번호' : 'Card Number',
    expiryDate: language === 'ko' ? '만료일' : 'Expiry Date',
    cvv: language === 'ko' ? 'CVV' : 'CVV',
    nameOnCard: language === 'ko' ? '카드 소유자명' : 'Name on Card',
    billingAddress: language === 'ko' ? '청구 주소' : 'Billing Address',
    city: language === 'ko' ? '도시' : 'City',
    postalCode: language === 'ko' ? '우편번호' : 'Postal Code',
    specialInstructions: language === 'ko' ? '특별 지시사항' : 'Special Instructions',
    securePayment: language === 'ko' ? '보안 결제' : 'Secure Payment',
    sslEncrypted: language === 'ko' ? 'SSL 암호화' : 'SSL Encrypted',
    popular: language === 'ko' ? '인기' : 'Popular',
    subtotal: language === 'ko' ? '소계' : 'Subtotal',
    discount: language === 'ko' ? '할인' : 'Discount',
    tax: language === 'ko' ? '세금' : 'Tax',
    serviceFee: language === 'ko' ? '서비스 수수료' : 'Service Fee',
    total: language === 'ko' ? '총계' : 'Total',
    tableInfo: language === 'ko' ? '테이블 12 • 더 비스트로' : 'Table 12 • The Bistro',
    estimatedTime: language === 'ko' ? '예상 조리시간' : 'Estimated Prep Time',
    minutes: language === 'ko' ? '분' : 'min',
    items: language === 'ko' ? '개 항목' : 'items',
    orderConfirmed: language === 'ko' ? '주문이 확인되었습니다!' : 'Order Confirmed!',
    orderNumber: language === 'ko' ? '주문 번호' : 'Order Number',
    thankYou: language === 'ko' ? '주문해주셔서 감사합니다!' : 'Thank you for your order!',
    trackOrder: language === 'ko' ? '주문 추적' : 'Track Order',
    backToMenu: language === 'ko' ? '메뉴로 돌아가기' : 'Back to Menu'
  };

  const currencyCode = language === 'ko' ? 'KRW' : 'AUD';

  const formatPrice = (amount: number) => {
    if (currencyCode === 'KRW') {
      return `${amount.toLocaleString()}원`;
    }
    return `$${amount.toFixed(2)}`;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsProcessing(false);
    setShowSuccess(true);
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handlePayment();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-success-50 to-primary-50 flex items-center justify-center">
        <AnimatedContainer animation="bounceIn" className="text-center max-w-md mx-auto">
          <Card className="p-8">
            <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-success-500" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              {currentContent.orderConfirmed}
            </h2>
            <p className="text-neutral-600 mb-6">
              {currentContent.thankYou}
            </p>
            <div className="bg-neutral-50 rounded-lg p-4 mb-6">
              <div className="text-sm text-neutral-600 mb-1">{currentContent.orderNumber}</div>
              <div className="text-lg font-mono font-bold text-neutral-900">#VT-2024-001</div>
            </div>
            <div className="space-y-3">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => window.location.href = '/order-tracking'}
              >
                {currentContent.trackOrder}
              </Button>
              <Button
                variant="outline"
                size="lg"
                fullWidth
                onClick={() => window.location.href = '/menu'}
              >
                {currentContent.backToMenu}
              </Button>
            </div>
          </Card>
        </AnimatedContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-neutral-900">{currentContent.title}</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex bg-neutral-100 rounded-lg p-1">
                <button
                  onClick={() => setLanguage('en')}
                  className={cn(
                    'px-3 py-1 text-sm font-medium rounded-md transition-all',
                    language === 'en' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-600'
                  )}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('ko')}
                  className={cn(
                    'px-3 py-1 text-sm font-medium rounded-md transition-all',
                    language === 'ko' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-600'
                  )}
                >
                  KO
                </button>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={cn(
                    'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all',
                    currentStep >= step.id
                      ? 'bg-primary-500 border-primary-500 text-white'
                      : 'bg-white border-neutral-300 text-neutral-400'
                  )}>
                    {currentStep > step.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={cn(
                    'ml-2 text-sm font-medium',
                    currentStep >= step.id ? 'text-primary-600' : 'text-neutral-400'
                  )}>
                    {step.name[language]}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      'w-16 h-0.5 mx-4 transition-all',
                      currentStep > step.id ? 'bg-primary-500' : 'bg-neutral-300'
                    )} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {currentStep === 1 && (
                <AnimatedContainer animation="slideUp">
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                      {currentContent.paymentMethod}
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={cn(
                            'flex items-center justify-between p-4 border-2 rounded-lg transition-all',
                            paymentMethod === method.id
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-neutral-200 hover:border-neutral-300'
                          )}
                        >
                          <div className="flex items-center space-x-3">
                            <method.icon className="w-6 h-6 text-neutral-600" />
                            <span className="font-medium text-neutral-900">
                              {method.name[language]}
                            </span>
                          </div>
                          {method.popular && (
                            <Badge variant="error" size="sm">
                              {currentContent.popular}
                            </Badge>
                          )}
                        </button>
                      ))}
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Input
                            label={currentContent.firstName}
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            required
                          />
                          <Input
                            label={currentContent.lastName}
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            required
                          />
                        </div>
                        
                        <Input
                          label={currentContent.email}
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                        
                        <Input
                          label={currentContent.phone}
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                        />
                        
                        <Input
                          label={currentContent.cardNumber}
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          leftIcon={<CreditCard className="w-5 h-5" />}
                          required
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            label={currentContent.expiryDate}
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                            required
                          />
                          <Input
                            label={currentContent.cvv}
                            placeholder="123"
                            value={formData.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                            required
                          />
                        </div>
                        
                        <Input
                          label={currentContent.nameOnCard}
                          value={formData.nameOnCard}
                          onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                          required
                        />
                      </div>
                    )}
                  </Card>
                </AnimatedContainer>
              )}

              {currentStep === 2 && (
                <AnimatedContainer animation="slideUp">
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                      {currentContent.billingInfo}
                    </h2>
                    
                    <div className="space-y-4">
                      <Input
                        label={currentContent.billingAddress}
                        value={formData.billingAddress}
                        onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                        required
                      />
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label={currentContent.city}
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          required
                        />
                        <Input
                          label={currentContent.postalCode}
                          value={formData.postalCode}
                          onChange={(e) => handleInputChange('postalCode', e.target.value)}
                          required
                        />
                      </div>
                      
                      <Input
                        label={currentContent.specialInstructions}
                        value={formData.specialInstructions}
                        onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                        rows={3}
                      />
                    </div>
                  </Card>
                </AnimatedContainer>
              )}

              {currentStep === 3 && (
                <AnimatedContainer animation="slideUp">
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                      {language === 'ko' ? '주문 검토' : 'Review Order'}
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="bg-neutral-50 rounded-lg p-4">
                        <h3 className="font-medium text-neutral-900 mb-3">
                          {language === 'ko' ? '주문 항목' : 'Order Items'}
                        </h3>
                        {orderSummary.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center py-2">
                            <div>
                              <span className="font-medium">{item.name[language]}</span>
                              <span className="text-neutral-600 ml-2">x{item.quantity}</span>
                            </div>
                            <span className="font-medium">
                              {formatPrice(item.price[currencyCode] * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-neutral-50 rounded-lg p-4">
                        <h3 className="font-medium text-neutral-900 mb-3">
                          {language === 'ko' ? '결제 정보' : 'Payment Information'}
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-neutral-600">{currentContent.paymentMethod}:</span>
                            <span>{paymentMethods.find(p => p.id === paymentMethod)?.name[language]}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600">{currentContent.tableInfo}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </AnimatedContainer>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="space-y-6">
              <AnimatedContainer animation="slideUp" delay={200}>
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                    {currentContent.orderSummary}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">{currentContent.subtotal}</span>
                      <span className="font-medium">{formatPrice(orderSummary.subtotal[currencyCode])}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm text-success-600">
                      <span>{currentContent.discount}</span>
                      <span className="font-medium">-{formatPrice(orderSummary.discount[currencyCode])}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">{currentContent.tax}</span>
                      <span className="font-medium">{formatPrice(orderSummary.tax[currencyCode])}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">{currentContent.serviceFee}</span>
                      <span className="font-medium">{formatPrice(orderSummary.serviceFee[currencyCode])}</span>
                    </div>
                    
                    <div className="border-t border-neutral-200 pt-3">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold text-neutral-900">{currentContent.total}</span>
                        <span className="text-xl font-bold text-neutral-900">
                          {formatPrice(orderSummary.total[currencyCode])}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </AnimatedContainer>

              {/* Security Info */}
              <AnimatedContainer animation="slideUp" delay={300}>
                <Card className="p-6 bg-success-50 border-success-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <Shield className="w-5 h-5 text-success-500" />
                    <span className="text-sm font-medium text-success-700">
                      {currentContent.securePayment}
                    </span>
                  </div>
                  <p className="text-xs text-success-600">
                    {currentContent.sslEncrypted}
                  </p>
                </Card>
              </AnimatedContainer>

              {/* Navigation Buttons */}
              <AnimatedContainer animation="slideUp" delay={400}>
                <div className="flex space-x-3">
                  {currentStep > 1 && (
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handlePrevStep}
                      fullWidth
                    >
                      {language === 'ko' ? '이전' : 'Previous'}
                    </Button>
                  )}
                  <Button
                    onClick={handleNextStep}
                    loading={isProcessing}
                    size="lg"
                    variant="gradient"
                    fullWidth
                    leftIcon={isProcessing ? undefined : <Lock className="w-5 h-5" />}
                  >
                    {isProcessing ? currentContent.processing : currentContent.placeOrder}
                  </Button>
                </div>
              </AnimatedContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QOCheckoutEnhanced;
