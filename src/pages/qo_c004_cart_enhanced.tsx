import { useState } from 'react';
import { 
  ShoppingCart, Plus, Minus, Trash2, Heart, ArrowLeft, 
  CreditCard, Clock, Shield,
  CheckCircle, MapPin,
  ChevronDown, ChevronUp, X
} from 'lucide-react';
import { 
  Button, 
  Input, 
  Card, 
  Badge, 
  Modal,
  AnimatedContainer, 
  StaggeredContainer
} from '../design-system';
import { cn } from '../utils/cn';

const QOCartEnhanced = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: { en: 'Avocado Toast Supreme', ko: '슈프림 아보카도 토스트' },
      description: { en: 'Sourdough, avocado, poached egg, feta', ko: '사워도우, 아보카도, 수란, 페타치즈' },
      price: { AUD: 18.50, KRW: 26500 },
      image: '🥑',
      quantity: 2,
      options: {
        bread: 'Sourdough',
        egg: 'Poached',
        extras: ['Extra Avocado']
      },
      specialNotes: 'No salt please',
      isFavorite: false
    },
    {
      id: 2,
      name: { en: 'Oat Milk Latte', ko: '오트밀크 라떼' },
      description: { en: 'Creamy oat milk with vanilla', ko: '바닐라 오트밀크' },
      price: { AUD: 5.20, KRW: 7500 },
      image: '🥛',
      quantity: 1,
      options: {
        size: 'Large',
        milk: 'Oat Milk'
      },
      specialNotes: '',
      isFavorite: true
    },
    {
      id: 3,
      name: { en: 'Chocolate Lava Cake', ko: '초콜릿 라바 케이크' },
      description: { en: 'Warm chocolate cake with ice cream', ko: '따뜻한 초콜릿 케이크와 아이스크림' },
      price: { AUD: 12.00, KRW: 17200 },
      image: '🍫',
      quantity: 1,
      options: {},
      specialNotes: '',
      isFavorite: false
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{code: string, discount: number, type: 'percentage' | 'fixed'} | null>(null);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ko'>('en');
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const availablePromoCodes = [
    { code: 'WELCOME10', discount: 10, type: 'percentage' as const, description: { en: '10% off first order', ko: '첫 주문 10% 할인' } },
    { code: 'SAVE5', discount: 5, type: 'fixed' as const, description: { en: '$5 off', ko: '5달러 할인' } },
    { code: 'STUDENT15', discount: 15, type: 'percentage' as const, description: { en: '15% off for students', ko: '학생 15% 할인' } },
  ];

  const currentContent = {
    title: language === 'ko' ? '장바구니' : 'Shopping Cart',
    back: language === 'ko' ? '뒤로' : 'Back',
    empty: language === 'ko' ? '장바구니가 비어있습니다' : 'Your cart is empty',
    continueShopping: language === 'ko' ? '쇼핑 계속하기' : 'Continue Shopping',
    quantity: language === 'ko' ? '수량' : 'Quantity',
    remove: language === 'ko' ? '삭제' : 'Remove',
    addToFavorites: language === 'ko' ? '즐겨찾기 추가' : 'Add to Favorites',
    removeFromFavorites: language === 'ko' ? '즐겨찾기에서 제거' : 'Remove from Favorites',
    specialNotes: language === 'ko' ? '특별 요청사항' : 'Special Notes',
    promoCode: language === 'ko' ? '프로모 코드' : 'Promo Code',
    applyPromo: language === 'ko' ? '적용' : 'Apply',
    removePromo: language === 'ko' ? '제거' : 'Remove',
    subtotal: language === 'ko' ? '소계' : 'Subtotal',
    discount: language === 'ko' ? '할인' : 'Discount',
    tax: language === 'ko' ? '세금' : 'Tax',
    serviceFee: language === 'ko' ? '서비스 수수료' : 'Service Fee',
    total: language === 'ko' ? '총계' : 'Total',
    checkout: language === 'ko' ? '결제하기' : 'Checkout',
    estimatedTime: language === 'ko' ? '예상 조리시간' : 'Estimated Prep Time',
    minutes: language === 'ko' ? '분' : 'min',
    tableInfo: language === 'ko' ? '테이블 12 • 더 비스트로' : 'Table 12 • The Bistro',
    orderSummary: language === 'ko' ? '주문 요약' : 'Order Summary',
    items: language === 'ko' ? '개 항목' : 'items',
    secureCheckout: language === 'ko' ? '보안 결제' : 'Secure Checkout',
    sslEncrypted: language === 'ko' ? 'SSL 암호화' : 'SSL Encrypted',
    freeDelivery: language === 'ko' ? '무료 배송' : 'Free Delivery',
    availablePromos: language === 'ko' ? '사용 가능한 프로모 코드' : 'Available Promo Codes',
    applyCode: language === 'ko' ? '코드 적용' : 'Apply Code',
    invalidCode: language === 'ko' ? '유효하지 않은 코드입니다' : 'Invalid promo code',
    codeApplied: language === 'ko' ? '프로모 코드가 적용되었습니다' : 'Promo code applied successfully',
  };

  const currencyCode = language === 'ko' ? 'KRW' : 'AUD';

  const formatPrice = (amount: number) => {
    if (currencyCode === 'KRW') {
      return `${amount.toLocaleString()}원`;
    }
    return `$${amount.toFixed(2)}`;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price[currencyCode] * item.quantity), 0);
  };

  const calculateDiscount = () => {
    if (!appliedPromo) return 0;
    const subtotal = calculateSubtotal();
    if (appliedPromo.type === 'percentage') {
      return (subtotal * appliedPromo.discount) / 100;
    }
    return appliedPromo.discount;
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    return (subtotal - discount) * 0.1; // 10% tax
  };

  const calculateServiceFee = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    return (subtotal - discount) * 0.05; // 5% service fee
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const tax = calculateTax();
    const serviceFee = calculateServiceFee();
    return subtotal - discount + tax + serviceFee;
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleFavorite = (id: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    ));
  };

  const toggleExpanded = (id: number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const applyPromoCode = () => {
    const promo = availablePromoCodes.find(p => p.code.toLowerCase() === promoCode.toLowerCase());
    if (promo) {
      setAppliedPromo(promo);
      setPromoCode('');
      setShowPromoModal(false);
    } else {
      alert(currentContent.invalidCode);
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    console.log('Proceeding to checkout...');
  };

  const estimatedPrepTime = Math.max(...cartItems.map(item => item.quantity * 5)); // 5 min per item

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50 flex items-center justify-center">
        <AnimatedContainer animation="fadeIn" className="text-center">
          <div className="w-32 h-32 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-16 h-16 text-neutral-400" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">{currentContent.empty}</h2>
          <p className="text-neutral-600 mb-8">
            {language === 'ko' ? '맛있는 음식을 장바구니에 담아보세요!' : 'Add some delicious items to your cart!'}
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => window.history.back()}
            leftIcon={<ArrowLeft className="w-5 h-5" />}
          >
            {currentContent.continueShopping}
          </Button>
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
              <Badge variant="secondary">
                {cartItems.length} {currentContent.items}
              </Badge>
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
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <StaggeredContainer animation="slideUp" staggerDelay={100}>
                {cartItems.map((item) => (
                  <Card key={item.id} className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Item Image */}
                      <div className="w-20 h-20 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                        {item.image}
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                              {item.name[language]}
                            </h3>
                            <p className="text-sm text-neutral-600 mb-2">
                              {item.description[language]}
                            </p>
                            
                            {/* Options */}
                            {Object.keys(item.options).length > 0 && (
                              <div className="mb-2">
                                <button
                                  onClick={() => toggleExpanded(item.id)}
                                  className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700"
                                >
                                  <span>
                                    {language === 'ko' ? '옵션 보기' : 'View Options'}
                                  </span>
                                  {expandedItems.has(item.id) ? 
                                    <ChevronUp className="w-4 h-4" /> : 
                                    <ChevronDown className="w-4 h-4" />
                                  }
                                </button>
                                
                                {expandedItems.has(item.id) && (
                                  <div className="mt-2 p-3 bg-neutral-50 rounded-lg">
                                    {Object.entries(item.options).map(([key, value]) => (
                                      <div key={key} className="text-sm text-neutral-700">
                                        <span className="font-medium capitalize">{key}:</span> {value}
                                      </div>
                                    ))}
                                    {item.specialNotes && (
                                      <div className="text-sm text-neutral-700 mt-2">
                                        <span className="font-medium">{currentContent.specialNotes}:</span> {item.specialNotes}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Price */}
                            <div className="text-lg font-bold text-neutral-900">
                              {formatPrice(item.price[currencyCode] * item.quantity)}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col items-end space-y-2">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => toggleFavorite(item.id)}
                                className={cn(
                                  'p-2 rounded-lg transition-colors',
                                  item.isFavorite 
                                    ? 'bg-red-100 text-red-500' 
                                    : 'bg-neutral-100 text-neutral-400 hover:bg-red-100 hover:text-red-500'
                                )}
                              >
                                <Heart className={cn('w-4 h-4', item.isFavorite && 'fill-current')} />
                              </button>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="p-2 rounded-lg bg-neutral-100 text-neutral-400 hover:bg-red-100 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center border border-neutral-300 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-neutral-100 transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-3 py-2 text-sm font-medium min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-neutral-100 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </StaggeredContainer>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Promo Code */}
              <AnimatedContainer animation="slideUp" delay={200}>
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                    {currentContent.promoCode}
                  </h3>
                  
                  {appliedPromo ? (
                    <div className="flex items-center justify-between p-3 bg-success-50 border border-success-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-success-500" />
                        <span className="text-sm font-medium text-success-700">
                          {appliedPromo.code} - Promo Applied
                        </span>
                      </div>
                      <button
                        onClick={removePromoCode}
                        className="text-success-600 hover:text-success-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex space-x-2">
                        <Input
                          placeholder={language === 'ko' ? '코드 입력' : 'Enter code'}
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          size="sm"
                        />
                        <Button
                          onClick={applyPromoCode}
                          disabled={!promoCode.trim()}
                          size="sm"
                        >
                          {currentContent.applyPromo}
                        </Button>
                      </div>
                      <button
                        onClick={() => setShowPromoModal(true)}
                        className="text-sm text-primary-600 hover:text-primary-700"
                      >
                        {language === 'ko' ? '사용 가능한 코드 보기' : 'View available codes'}
                      </button>
                    </div>
                  )}
                </Card>
              </AnimatedContainer>

              {/* Order Summary */}
              <AnimatedContainer animation="slideUp" delay={300}>
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                    {currentContent.orderSummary}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">{currentContent.subtotal}</span>
                      <span className="font-medium">{formatPrice(calculateSubtotal())}</span>
                    </div>
                    
                    {appliedPromo && (
                      <div className="flex justify-between text-sm text-success-600">
                        <span>{currentContent.discount} ({appliedPromo.code})</span>
                        <span className="font-medium">-{formatPrice(calculateDiscount())}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">{currentContent.tax}</span>
                      <span className="font-medium">{formatPrice(calculateTax())}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">{currentContent.serviceFee}</span>
                      <span className="font-medium">{formatPrice(calculateServiceFee())}</span>
                    </div>
                    
                    <div className="border-t border-neutral-200 pt-3">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold text-neutral-900">{currentContent.total}</span>
                        <span className="text-xl font-bold text-neutral-900">{formatPrice(calculateTotal())}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </AnimatedContainer>

              {/* Order Info */}
              <AnimatedContainer animation="slideUp" delay={400}>
                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-primary-500" />
                      <div>
                        <div className="text-sm font-medium text-neutral-900">
                          {currentContent.estimatedTime}
                        </div>
                        <div className="text-sm text-neutral-600">
                          {estimatedPrepTime} {currentContent.minutes}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-primary-500" />
                      <div>
                        <div className="text-sm font-medium text-neutral-900">
                          {currentContent.tableInfo}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </AnimatedContainer>

              {/* Security Info */}
              <AnimatedContainer animation="slideUp" delay={500}>
                <Card className="p-6 bg-success-50 border-success-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <Shield className="w-5 h-5 text-success-500" />
                    <span className="text-sm font-medium text-success-700">
                      {currentContent.secureCheckout}
                    </span>
                  </div>
                  <p className="text-xs text-success-600">
                    {currentContent.sslEncrypted}
                  </p>
                </Card>
              </AnimatedContainer>

              {/* Checkout Button */}
              <AnimatedContainer animation="slideUp" delay={600}>
                <Button
                  onClick={handleCheckout}
                  loading={isLoading}
                  size="lg"
                  variant="gradient"
                  fullWidth
                  leftIcon={<CreditCard className="w-5 h-5" />}
                >
                  {isLoading ? 'Processing...' : currentContent.checkout}
                </Button>
              </AnimatedContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Codes Modal */}
      <Modal
        isOpen={showPromoModal}
        onClose={() => setShowPromoModal(false)}
        title={currentContent.availablePromos}
        size="md"
      >
        <div className="space-y-4">
          {availablePromoCodes.map((promo) => (
            <Card key={promo.code} variant="outlined" className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-neutral-900">{promo.code}</div>
                  <div className="text-sm text-neutral-600">{promo.description[language]}</div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setPromoCode(promo.code);
                    setShowPromoModal(false);
                  }}
                >
                  {currentContent.applyCode}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default QOCartEnhanced;
