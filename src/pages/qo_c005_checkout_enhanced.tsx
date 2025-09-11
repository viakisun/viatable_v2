import { useState } from 'react';
import { 
  CreditCard, Smartphone, Gift, ArrowLeft, CheckCircle, 
  Shield, Lock, Wallet, Banknote,
  Zap, Star, Globe, Building2
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
    { 
      id: 'card', 
      name: { en: 'Credit Card', ko: '신용카드' }, 
      icon: CreditCard, 
      popular: true,
      description: { en: 'Visa, Mastercard, Amex', ko: '비자, 마스터카드, 아멕스' },
      color: 'bg-blue-50 border-blue-200 text-blue-700'
    },
    { 
      id: 'apple', 
      name: { en: 'Apple Pay', ko: '애플페이' }, 
      icon: Smartphone, 
      popular: true,
      description: { en: 'Touch ID or Face ID', ko: '터치 ID 또는 페이스 ID' },
      color: 'bg-black border-gray-800 text-white'
    },
    { 
      id: 'google', 
      name: { en: 'Google Pay', ko: '구글페이' }, 
      icon: Smartphone, 
      popular: true,
      description: { en: 'Quick & secure', ko: '빠르고 안전한' },
      color: 'bg-blue-50 border-blue-200 text-blue-700'
    },
    { 
      id: 'paypal', 
      name: { en: 'PayPal', ko: '페이팔' }, 
      icon: Gift, 
      popular: false,
      description: { en: 'Pay with PayPal balance', ko: '페이팔 잔액으로 결제' },
      color: 'bg-yellow-50 border-yellow-200 text-yellow-700'
    },
    { 
      id: 'samsung', 
      name: { en: 'Samsung Pay', ko: '삼성페이' }, 
      icon: Smartphone, 
      popular: false,
      description: { en: 'Samsung device payment', ko: '삼성 기기 결제' },
      color: 'bg-blue-50 border-blue-200 text-blue-700'
    },
    { 
      id: 'kakao', 
      name: { en: 'Kakao Pay', ko: '카카오페이' }, 
      icon: Wallet, 
      popular: true,
      description: { en: 'Korea\'s popular payment', ko: '한국의 인기 결제' },
      color: 'bg-yellow-50 border-yellow-200 text-yellow-700'
    },
    { 
      id: 'toss', 
      name: { en: 'Toss', ko: '토스' }, 
      icon: Zap, 
      popular: true,
      description: { en: 'Simple & fast payment', ko: '간편하고 빠른 결제' },
      color: 'bg-blue-50 border-blue-200 text-blue-700'
    },
    { 
      id: 'naver', 
      name: { en: 'Naver Pay', ko: '네이버페이' }, 
      icon: Globe, 
      popular: false,
      description: { en: 'Naver integrated payment', ko: '네이버 통합 결제' },
      color: 'bg-green-50 border-green-200 text-green-700'
    },
    { 
      id: 'bank', 
      name: { en: 'Bank Transfer', ko: '계좌이체' }, 
      icon: Building2, 
      popular: false,
      description: { en: 'Direct bank transfer', ko: '직접 계좌이체' },
      color: 'bg-gray-50 border-gray-200 text-gray-700'
    },
    { 
      id: 'cash', 
      name: { en: 'Cash on Delivery', ko: '현금 결제' }, 
      icon: Banknote, 
      popular: false,
      description: { en: 'Pay when delivered', ko: '배송 시 현금 결제' },
      color: 'bg-green-50 border-green-200 text-green-700'
    }
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
                    
                    {/* Popular Payment Methods */}
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-neutral-700 mb-3 flex items-center">
                        <Star className="w-4 h-4 mr-2 text-yellow-500" />
                        Popular Methods
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                        {paymentMethods.filter(method => method.popular).map((method) => (
                          <button
                            key={method.id}
                            onClick={() => setPaymentMethod(method.id)}
                            className={cn(
                              'flex flex-col items-center p-4 border-2 rounded-xl transition-all hover:shadow-md',
                              paymentMethod === method.id
                                ? 'border-primary-500 bg-primary-50 shadow-md'
                                : 'border-neutral-200 hover:border-neutral-300 bg-white'
                            )}
                          >
                            <div className={cn(
                              'w-12 h-12 rounded-full flex items-center justify-center mb-3',
                              method.color
                            )}>
                              <method.icon className="w-6 h-6" />
                            </div>
                            <span className="text-sm font-medium text-neutral-900 text-center">
                              {method.name[language]}
                            </span>
                            <span className="text-xs text-neutral-500 mt-1">
                              {method.description[language]}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* All Payment Methods */}
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-neutral-700 mb-3">
                        All Payment Methods
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {paymentMethods.map((method) => (
                          <button
                            key={method.id}
                            onClick={() => setPaymentMethod(method.id)}
                            className={cn(
                              'flex items-center justify-between p-4 border-2 rounded-lg transition-all hover:shadow-sm',
                              paymentMethod === method.id
                                ? 'border-primary-500 bg-primary-50 shadow-sm'
                                : 'border-neutral-200 hover:border-neutral-300 bg-white'
                            )}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={cn(
                                'w-10 h-10 rounded-lg flex items-center justify-center',
                                method.color
                              )}>
                                <method.icon className="w-5 h-5" />
                              </div>
                              <div className="text-left">
                                <span className="font-medium text-neutral-900 block">
                                  {method.name[language]}
                                </span>
                                <span className="text-xs text-neutral-500">
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
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                          <div className="flex items-center space-x-2 text-blue-700">
                            <Shield className="w-5 h-5" />
                            <span className="text-sm font-medium">Secure Payment</span>
                          </div>
                          <p className="text-sm text-blue-600 mt-1">
                            Your payment information is encrypted and secure
                          </p>
                        </div>
                        
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

                    {/* Apple Pay */}
                    {paymentMethod === 'apple' && (
                      <div className="space-y-4">
                        <div className="bg-black text-white rounded-lg p-6 text-center">
                          <Smartphone className="w-12 h-12 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold mb-2">Apple Pay</h3>
                          <p className="text-gray-300 text-sm mb-4">
                            Use Touch ID or Face ID to complete your payment
                          </p>
                          <div className="bg-gray-800 rounded-lg p-4">
                            <div className="flex items-center justify-between text-sm">
                              <span>Total Amount</span>
                              <span className="font-semibold">${orderSummary.total.AUD}</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-center space-x-2 text-green-700">
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm font-medium">Secure & Fast</span>
                          </div>
                          <p className="text-sm text-green-600 mt-1">
                            Your payment is processed securely through Apple Pay
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Google Pay */}
                    {paymentMethod === 'google' && (
                      <div className="space-y-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                          <Smartphone className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                          <h3 className="text-lg font-semibold mb-2 text-blue-900">Google Pay</h3>
                          <p className="text-blue-700 text-sm mb-4">
                            Quick and secure payment with Google Pay
                          </p>
                          <div className="bg-white rounded-lg p-4 border border-blue-200">
                            <div className="flex items-center justify-between text-sm">
                              <span>Total Amount</span>
                              <span className="font-semibold">${orderSummary.total.AUD}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Kakao Pay */}
                    {paymentMethod === 'kakao' && (
                      <div className="space-y-4">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                          <Wallet className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
                          <h3 className="text-lg font-semibold mb-2 text-yellow-900">Kakao Pay</h3>
                          <p className="text-yellow-700 text-sm mb-4">
                            Korea's most popular payment method
                          </p>
                          <div className="bg-white rounded-lg p-4 border border-yellow-200">
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
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                          <Zap className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                          <h3 className="text-lg font-semibold mb-2 text-blue-900">Toss</h3>
                          <p className="text-blue-700 text-sm mb-4">
                            Simple and fast payment experience
                          </p>
                          <div className="bg-white rounded-lg p-4 border border-blue-200">
                            <div className="flex items-center justify-between text-sm">
                              <span>Total Amount</span>
                              <span className="font-semibold">₩{orderSummary.total.KRW.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* PayPal */}
                    {paymentMethod === 'paypal' && (
                      <div className="space-y-4">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                          <Gift className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
                          <h3 className="text-lg font-semibold mb-2 text-yellow-900">PayPal</h3>
                          <p className="text-yellow-700 text-sm mb-4">
                            Pay with your PayPal balance or linked cards
                          </p>
                          <div className="bg-white rounded-lg p-4 border border-yellow-200">
                            <div className="flex items-center justify-between text-sm">
                              <span>Total Amount</span>
                              <span className="font-semibold">${orderSummary.total.AUD}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bank Transfer */}
                    {paymentMethod === 'bank' && (
                      <div className="space-y-4">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                          <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                          <h3 className="text-lg font-semibold mb-2 text-center text-gray-900">Bank Transfer</h3>
                          <div className="space-y-3">
                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                              <div className="text-sm text-gray-600 mb-2">Bank Details:</div>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span>Bank:</span>
                                  <span className="font-medium">Viatable Bank</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Account:</span>
                                  <span className="font-medium">123-456-789</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Amount:</span>
                                  <span className="font-medium">₩{orderSummary.total.KRW.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 text-center">
                              Please include your order number in the transfer memo
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Cash on Delivery */}
                    {paymentMethod === 'cash' && (
                      <div className="space-y-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                          <Banknote className="w-12 h-12 mx-auto mb-4 text-green-600" />
                          <h3 className="text-lg font-semibold mb-2 text-green-900">Cash on Delivery</h3>
                          <p className="text-green-700 text-sm mb-4">
                            Pay with cash when your order is delivered
                          </p>
                          <div className="bg-white rounded-lg p-4 border border-green-200">
                            <div className="flex items-center justify-between text-sm">
                              <span>Amount to Pay</span>
                              <span className="font-semibold">₩{orderSummary.total.KRW.toLocaleString()}</span>
                            </div>
                          </div>
                          <p className="text-xs text-green-600 mt-2">
                            Please have exact change ready for the delivery driver
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Other payment methods */}
                    {!['card', 'apple', 'google', 'kakao', 'toss', 'paypal', 'bank', 'cash'].includes(paymentMethod) && (
                      <div className="space-y-4">
                        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 text-center">
                          <Smartphone className="w-12 h-12 mx-auto mb-4 text-neutral-600" />
                          <h3 className="text-lg font-semibold mb-2 text-neutral-900">
                            {paymentMethods.find(m => m.id === paymentMethod)?.name[language]}
                          </h3>
                          <p className="text-neutral-700 text-sm mb-4">
                            {paymentMethods.find(m => m.id === paymentMethod)?.description[language]}
                          </p>
                          <div className="bg-white rounded-lg p-4 border border-neutral-200">
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
