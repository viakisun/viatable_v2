import { useState } from 'react';
import { 
  CreditCard, Smartphone, Gift, ArrowLeft, CheckCircle, 
  Shield, Wallet, Banknote,
  Zap, Star, Globe, Building2, ChevronRight
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
  // Enhanced version with multiple payment methods - Apple Pay, Google Pay, Kakao Pay, Toss, etc.
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
    { 
      id: 'apple', 
      name: { en: 'Apple Pay', ko: '애플페이' }, 
      icon: Smartphone, 
      popular: true,
      description: { en: 'Touch ID or Face ID', ko: '터치 ID 또는 페이스 ID' },
      color: 'bg-black text-white',
      iconColor: 'text-white'
    },
    { 
      id: 'kakao', 
      name: { en: 'Kakao Pay', ko: '카카오페이' }, 
      icon: Wallet, 
      popular: true,
      description: { en: 'Korea\'s popular payment', ko: '한국의 인기 결제' },
      color: 'bg-yellow-400 text-black',
      iconColor: 'text-black'
    },
    { 
      id: 'toss', 
      name: { en: 'Toss', ko: '토스' }, 
      icon: Zap, 
      popular: true,
      description: { en: 'Simple & fast payment', ko: '간편하고 빠른 결제' },
      color: 'bg-blue-500 text-white',
      iconColor: 'text-white'
    },
    { 
      id: 'google', 
      name: { en: 'Google Pay', ko: '구글페이' }, 
      icon: Smartphone, 
      popular: true,
      description: { en: 'Quick & secure', ko: '빠르고 안전한' },
      color: 'bg-blue-600 text-white',
      iconColor: 'text-white'
    },
    { 
      id: 'card', 
      name: { en: 'Credit Card', ko: '신용카드' }, 
      icon: CreditCard, 
      popular: false,
      description: { en: 'Visa, Mastercard, Amex', ko: '비자, 마스터카드, 아멕스' },
      color: 'bg-gray-100 text-gray-800',
      iconColor: 'text-gray-600'
    },
    { 
      id: 'samsung', 
      name: { en: 'Samsung Pay', ko: '삼성페이' }, 
      icon: Smartphone, 
      popular: false,
      description: { en: 'Samsung device payment', ko: '삼성 기기 결제' },
      color: 'bg-blue-50 text-blue-800',
      iconColor: 'text-blue-600'
    },
    { 
      id: 'naver', 
      name: { en: 'Naver Pay', ko: '네이버페이' }, 
      icon: Globe, 
      popular: false,
      description: { en: 'Naver integrated payment', ko: '네이버 통합 결제' },
      color: 'bg-green-50 text-green-800',
      iconColor: 'text-green-600'
    },
    { 
      id: 'paypal', 
      name: { en: 'PayPal', ko: '페이팔' }, 
      icon: Gift, 
      popular: false,
      description: { en: 'Pay with PayPal balance', ko: '페이팔 잔액으로 결제' },
      color: 'bg-yellow-50 text-yellow-800',
      iconColor: 'text-yellow-600'
    },
    { 
      id: 'bank', 
      name: { en: 'Bank Transfer', ko: '계좌이체' }, 
      icon: Building2, 
      popular: false,
      description: { en: 'Direct bank transfer', ko: '직접 계좌이체' },
      color: 'bg-gray-50 text-gray-800',
      iconColor: 'text-gray-600'
    },
    { 
      id: 'cash', 
      name: { en: 'Cash on Delivery', ko: '현금 결제' }, 
      icon: Banknote, 
      popular: false,
      description: { en: 'Pay when delivered', ko: '배송 시 현금 결제' },
      color: 'bg-green-50 text-green-800',
      iconColor: 'text-green-600'
    }
  ];

  const orderSummary = {
    items: [
      { name: { en: 'Avocado Toast Supreme', ko: '슈프림 아보카도 토스트' }, quantity: 2, price: { AUD: 18.50, KRW: 26500 } },
      { name: { en: 'Oat Milk Latte', ko: '오트밀크 라떼' }, quantity: 1, price: { AUD: 5.20, KRW: 7500 } },
      { name: { en: 'Fresh Orange Juice', ko: '신선한 오렌지 주스' }, quantity: 1, price: { AUD: 4.50, KRW: 6500 } }
    ],
    subtotal: { AUD: 46.70, KRW: 67000 },
    tax: { AUD: 4.67, KRW: 6700 },
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
    specialInstructions: language === 'ko' ? '특별 요청사항' : 'Special Instructions',
    popular: language === 'ko' ? '인기' : 'Popular',
    orderConfirmed: language === 'ko' ? '주문이 확인되었습니다!' : 'Order Confirmed!',
    thankYou: language === 'ko' ? '주문해주셔서 감사합니다. 곧 준비해드리겠습니다.' : 'Thank you for your order. We\'ll prepare it shortly.',
    orderNumber: language === 'ko' ? '주문번호' : 'Order Number',
    trackOrder: language === 'ko' ? '주문 추적' : 'Track Order',
    backToMenu: language === 'ko' ? '메뉴로 돌아가기' : 'Back to Menu'
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate different payment processing times based on method
    const processingTimes = {
      'apple': 1000,
      'google': 1200,
      'samsung': 1500,
      'kakao': 2000,
      'toss': 1800,
      'naver': 2200,
      'paypal': 2500,
      'bank': 3000,
      'cash': 500,
      'card': 3000
    };
    
    const processingTime = processingTimes[paymentMethod as keyof typeof processingTimes] || 3000;
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, processingTime));
    
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <AnimatedContainer animation="bounceIn" className="w-full max-w-sm">
          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              {currentContent.orderConfirmed}
            </h2>
            <p className="text-gray-600 mb-4 text-sm">
              {currentContent.thankYou}
            </p>
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <div className="text-xs text-gray-600 mb-1">{currentContent.orderNumber}</div>
              <div className="text-lg font-mono font-bold text-gray-900">#VT-2024-001</div>
            </div>
            <div className="space-y-2">
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
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.history.back()}
                className="w-8 h-8"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-lg font-bold text-gray-900">{currentContent.title}</h1>
            </div>
            
            <div className="flex items-center space-x-1">
              <div className="flex bg-gray-100 rounded-md p-0.5">
                <button
                  onClick={() => setLanguage('en')}
                  className={cn(
                    'px-2 py-1 text-xs font-medium rounded-sm transition-all',
                    language === 'en' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'
                  )}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('ko')}
                  className={cn(
                    'px-2 py-1 text-xs font-medium rounded-sm transition-all',
                    language === 'ko' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'
                  )}
                >
                  KO
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Progress Steps */}
          <div className="mt-4">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium',
                    currentStep >= step.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  )}>
                    {currentStep > step.id ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <step.icon className="w-4 h-4" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      'w-8 h-0.5 mx-2',
                      currentStep > step.id ? 'bg-blue-500' : 'bg-gray-200'
                    )} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {steps.map((step) => (
                <span key={step.id} className="text-xs text-gray-500 text-center flex-1">
                  {step.name[language]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Content */}
      <div className="p-4 space-y-4">
        {currentStep === 1 && (
          <AnimatedContainer animation="slideUp">
            <Card className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {currentContent.paymentMethod}
              </h2>
              
              {/* Popular Payment Methods - Mobile Grid */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Star className="w-4 h-4 mr-2 text-yellow-500" />
                  Popular Methods
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {paymentMethods.filter(method => method.popular).map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={cn(
                        'flex flex-col items-center p-4 border-2 rounded-xl transition-all',
                        paymentMethod === method.id
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      )}
                    >
                      <div className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center mb-2',
                        method.color
                      )}>
                        <method.icon className={cn('w-5 h-5', method.iconColor)} />
                      </div>
                      <span className="text-sm font-medium text-gray-900 text-center">
                        {method.name[language]}
                      </span>
                      <span className="text-xs text-gray-500 mt-1 text-center">
                        {method.description[language]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* All Payment Methods - Mobile List */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  All Payment Methods
                </h3>
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={cn(
                        'flex items-center justify-between p-3 border-2 rounded-lg transition-all w-full',
                        paymentMethod === method.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={cn(
                          'w-8 h-8 rounded-lg flex items-center justify-center',
                          method.color
                        )}>
                          <method.icon className={cn('w-4 h-4', method.iconColor)} />
                        </div>
                        <div className="text-left">
                          <span className="font-medium text-gray-900 block text-sm">
                            {method.name[language]}
                          </span>
                          <span className="text-xs text-gray-500">
                            {method.description[language]}
                          </span>
                        </div>
                      </div>
                      {method.popular && (
                        <Badge variant="error" size="sm">
                          {currentContent.popular}
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Method Specific Forms */}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center space-x-2 text-blue-700">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm font-medium">Secure Payment</span>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">
                      Your payment information is encrypted and secure
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label={currentContent.firstName}
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                      size="sm"
                    />
                    <Input
                      label={currentContent.lastName}
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                      size="sm"
                    />
                  </div>
                  
                  <Input
                    label={currentContent.email}
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    size="sm"
                  />
                  
                  <Input
                    label={currentContent.phone}
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                    size="sm"
                  />
                  
                  <Input
                    label={currentContent.cardNumber}
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    leftIcon={<CreditCard className="w-4 h-4" />}
                    required
                    size="sm"
                  />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label={currentContent.expiryDate}
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      required
                      size="sm"
                    />
                    <Input
                      label={currentContent.cvv}
                      placeholder="123"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      required
                      size="sm"
                    />
                  </div>
                  
                  <Input
                    label={currentContent.nameOnCard}
                    value={formData.nameOnCard}
                    onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                    required
                    size="sm"
                  />
                </div>
              )}

              {/* Apple Pay */}
              {paymentMethod === 'apple' && (
                <div className="space-y-4">
                  <div className="bg-black text-white rounded-lg p-4 text-center">
                    <Smartphone className="w-10 h-10 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold mb-2">Apple Pay</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      Use Touch ID or Face ID to complete your payment
                    </p>
                    <div className="bg-gray-800 rounded-lg p-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Total Amount</span>
                        <span className="font-semibold">${orderSummary.total.AUD}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Secure & Fast</span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">
                      Your payment is processed securely through Apple Pay
                    </p>
                  </div>
                </div>
              )}

              {/* Kakao Pay */}
              {paymentMethod === 'kakao' && (
                <div className="space-y-4">
                  <div className="bg-yellow-400 text-black rounded-lg p-4 text-center">
                    <Wallet className="w-10 h-10 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold mb-2">Kakao Pay</h3>
                    <p className="text-black text-sm mb-3">
                      Korea's most popular payment method
                    </p>
                    <div className="bg-white rounded-lg p-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Total Amount</span>
                        <span className="font-semibold">₩{orderSummary.total.KRW.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Toss */}
              {paymentMethod === 'toss' && (
                <div className="space-y-4">
                  <div className="bg-blue-500 text-white rounded-lg p-4 text-center">
                    <Zap className="w-10 h-10 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold mb-2">Toss</h3>
                    <p className="text-blue-100 text-sm mb-3">
                      Simple and fast payment experience
                    </p>
                    <div className="bg-blue-600 rounded-lg p-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Total Amount</span>
                        <span className="font-semibold">₩{orderSummary.total.KRW.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Other payment methods */}
              {!['card', 'apple', 'kakao', 'toss'].includes(paymentMethod) && (
                <div className="space-y-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                    <Smartphone className="w-10 h-10 mx-auto mb-3 text-gray-600" />
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">
                      {paymentMethods.find(m => m.id === paymentMethod)?.name[language]}
                    </h3>
                    <p className="text-gray-700 text-sm mb-3">
                      {paymentMethods.find(m => m.id === paymentMethod)?.description[language]}
                    </p>
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center justify-between text-sm">
                        <span>Total Amount</span>
                        <span className="font-semibold">
                          {language === 'ko' ? `₩${orderSummary.total.KRW.toLocaleString()}` : `$${orderSummary.total.AUD}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </AnimatedContainer>
        )}

        {currentStep === 2 && (
          <AnimatedContainer animation="slideUp">
            <Card className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {currentContent.billingInfo}
              </h2>
              
              <div className="space-y-3">
                <Input
                  label={currentContent.billingAddress}
                  value={formData.billingAddress}
                  onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                  required
                  size="sm"
                />
                
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label={currentContent.city}
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    required
                    size="sm"
                  />
                  <Input
                    label={currentContent.postalCode}
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    required
                    size="sm"
                  />
                </div>
                
                <Input
                  label={currentContent.specialInstructions}
                  value={formData.specialInstructions}
                  onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                  rows={3}
                  size="sm"
                />
              </div>
            </Card>
          </AnimatedContainer>
        )}

        {currentStep === 3 && (
          <AnimatedContainer animation="slideUp">
            <Card className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {currentContent.orderSummary}
              </h2>
              
              <div className="space-y-3">
                {orderSummary.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">
                        {item.name[language]}
                      </div>
                      <div className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {language === 'ko' ? `₩${item.price.KRW.toLocaleString()}` : `$${item.price.AUD}`}
                    </div>
                  </div>
                ))}
                
                <div className="pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">
                      {language === 'ko' ? `₩${orderSummary.subtotal.KRW.toLocaleString()}` : `$${orderSummary.subtotal.AUD}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900">
                      {language === 'ko' ? `₩${orderSummary.tax.KRW.toLocaleString()}` : `$${orderSummary.tax.AUD}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="text-gray-900">
                      {language === 'ko' ? `₩${orderSummary.serviceFee.KRW.toLocaleString()}` : `$${orderSummary.serviceFee.AUD}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>
                      {language === 'ko' ? `₩${orderSummary.total.KRW.toLocaleString()}` : `$${orderSummary.total.AUD}`}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </AnimatedContainer>
        )}

        {/* Mobile Navigation */}
        <div className="flex space-x-3 pt-4">
          {currentStep > 1 && (
            <Button
              variant="outline"
              size="lg"
              onClick={handlePrevStep}
              className="flex-1"
            >
              {currentContent.back}
            </Button>
          )}
          <Button
            variant="primary"
            size="lg"
            onClick={handleNextStep}
            disabled={isProcessing}
            className="flex-1"
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{currentContent.processing}</span>
              </div>
            ) : currentStep === 3 ? (
              currentContent.placeOrder
            ) : (
              <div className="flex items-center space-x-2">
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QOCheckoutEnhanced;