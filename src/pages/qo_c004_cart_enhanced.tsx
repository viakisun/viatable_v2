import { useState } from 'react';
import { 
  ShoppingCart, Plus, Minus, Trash2, Heart, ArrowLeft, 
  CreditCard, Clock, Shield,
  CheckCircle,
  ChevronDown, ChevronUp, X
} from 'lucide-react';
import { 
  Button, 
  Input, 
  Card, 
  Modal
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
    promoApplied: language === 'ko' ? '프로모 적용됨' : 'Promo Applied',
    enterPromoCode: language === 'ko' ? '프로모 코드 입력' : 'Enter Promo Code',
    availablePromos: language === 'ko' ? '사용 가능한 프로모' : 'Available Promos',
    close: language === 'ko' ? '닫기' : 'Close',
    options: language === 'ko' ? '옵션' : 'Options',
    showDetails: language === 'ko' ? '상세보기' : 'Show Details',
    hideDetails: language === 'ko' ? '숨기기' : 'Hide Details'
  };

  const currencyCode = language === 'ko' ? 'KRW' : 'AUD';

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price[currencyCode] * item.quantity), 0);
  };

  const calculateDiscount = () => {
    if (!appliedPromo) return 0;
    const subtotal = calculateSubtotal();
    if (appliedPromo.type === 'percentage') {
      return (subtotal * appliedPromo.discount) / 100;
    } else {
      return appliedPromo.discount;
    }
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
    const promo = availablePromoCodes.find(p => p.code === promoCode.toUpperCase());
    if (promo) {
      setAppliedPromo(promo);
      setPromoCode('');
      setShowPromoModal(false);
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    console.log('Proceeding to checkout');
  };

  const getEstimatedTime = () => {
    // Simple estimation based on item count and complexity
    return Math.max(15, cartItems.length * 5);
  };

  if (cartItems.length === 0) {
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
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center h-96 px-4">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <ShoppingCart className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{currentContent.empty}</h2>
          <p className="text-gray-600 text-center mb-6">
            {language === 'ko' ? '맛있는 음식을 장바구니에 추가해보세요!' : 'Add some delicious items to your cart!'}
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => window.location.href = '/menu'}
          >
            {currentContent.continueShopping}
          </Button>
        </div>
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
              <div>
                <h1 className="text-lg font-bold text-gray-900">{currentContent.title}</h1>
                <p className="text-xs text-gray-500">{currentContent.tableInfo}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
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
        </div>
      </div>

      {/* Mobile Content */}
      <div className="p-4 space-y-4">
        {/* Cart Items */}
        <div className="space-y-3">
          {cartItems.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex items-start space-x-3">
                {/* Item Image */}
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                  {item.image}
                </div>

                {/* Item Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">{item.name[language]}</h3>
                      <p className="text-xs text-gray-600 mt-1">{item.description[language]}</p>
                      
                      {/* Options */}
                      {Object.keys(item.options).length > 0 && (
                        <div className="mt-2">
                          <button
                            onClick={() => toggleExpanded(item.id)}
                            className="flex items-center space-x-1 text-xs text-primary-600"
                          >
                            <span>{currentContent.options}</span>
                            {expandedItems.has(item.id) ? (
                              <ChevronUp className="w-3 h-3" />
                            ) : (
                              <ChevronDown className="w-3 h-3" />
                            )}
                          </button>
                          
                          {expandedItems.has(item.id) && (
                            <div className="mt-2 space-y-1">
                              {Object.entries(item.options).map(([key, value]) => (
                                <div key={key} className="text-xs text-gray-600">
                                  <span className="font-medium">{key}:</span> {Array.isArray(value) ? value.join(', ') : value}
                                </div>
                              ))}
                              {item.specialNotes && (
                                <div className="text-xs text-gray-600">
                                  <span className="font-medium">{currentContent.specialNotes}:</span> {item.specialNotes}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavorite(item.id)}
                        className="w-6 h-6"
                      >
                        <Heart className={cn('w-3 h-3', item.isFavorite ? 'text-red-500 fill-current' : 'text-gray-400')} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="w-6 h-6"
                      >
                        <Trash2 className="w-3 h-3 text-gray-400" />
                      </Button>
                    </div>
                  </div>

                  {/* Price and Quantity */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="text-sm font-bold text-gray-900">
                      {currencyCode === 'KRW' ? `₩${item.price.KRW.toLocaleString()}` : `$${item.price.AUD}`}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Promo Code */}
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Input
              placeholder={currentContent.enterPromoCode}
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              size="sm"
              className="flex-1"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPromoModal(true)}
            >
              {currentContent.applyPromo}
            </Button>
          </div>
          
          {appliedPromo && (
            <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-800">{currentContent.promoApplied}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={removePromoCode}
                className="text-green-600 hover:text-green-700"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          )}
        </Card>

        {/* Order Summary */}
        <Card className="p-4">
          <h3 className="font-medium text-gray-900 mb-3">{currentContent.orderSummary}</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{currentContent.subtotal}</span>
              <span className="text-gray-900">
                {currencyCode === 'KRW' ? `₩${calculateSubtotal().toLocaleString()}` : `$${calculateSubtotal().toFixed(2)}`}
              </span>
            </div>
            
            {appliedPromo && (
              <div className="flex justify-between text-sm">
                <span className="text-green-600">{currentContent.discount}</span>
                <span className="text-green-600">
                  -{currencyCode === 'KRW' ? `₩${calculateDiscount().toLocaleString()}` : `$${calculateDiscount().toFixed(2)}`}
                </span>
              </div>
            )}
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{currentContent.tax}</span>
              <span className="text-gray-900">
                {currencyCode === 'KRW' ? `₩${calculateTax().toLocaleString()}` : `$${calculateTax().toFixed(2)}`}
              </span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{currentContent.serviceFee}</span>
              <span className="text-gray-900">
                {currencyCode === 'KRW' ? `₩${calculateServiceFee().toLocaleString()}` : `$${calculateServiceFee().toFixed(2)}`}
              </span>
            </div>
            
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between text-lg font-bold">
                <span>{currentContent.total}</span>
                <span>
                  {currencyCode === 'KRW' ? `₩${calculateTotal().toLocaleString()}` : `$${calculateTotal().toFixed(2)}`}
                </span>
              </div>
            </div>
          </div>

          {/* Estimated Time */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-800">
                {currentContent.estimatedTime}: {getEstimatedTime()}{currentContent.minutes}
              </span>
            </div>
          </div>
        </Card>

        {/* Checkout Button */}
        <Button
          onClick={handleCheckout}
          loading={isLoading}
          size="lg"
          variant="primary"
          fullWidth
          leftIcon={<CreditCard className="w-4 h-4" />}
        >
          {isLoading ? 'Processing...' : currentContent.checkout}
        </Button>

        {/* Security Badge */}
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-600">
          <Shield className="w-3 h-3 text-green-500" />
          <span>{currentContent.secureCheckout}</span>
        </div>
      </div>

      {/* Promo Code Modal */}
      <Modal
        isOpen={showPromoModal}
        onClose={() => setShowPromoModal(false)}
        title={currentContent.availablePromos}
        size="sm"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            {availablePromoCodes.map((promo) => (
              <div key={promo.code} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{promo.code}</div>
                    <div className="text-sm text-gray-600">{promo.description[language]}</div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setPromoCode(promo.code);
                      applyPromoCode();
                    }}
                  >
                    {currentContent.applyPromo}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <Input
              placeholder={currentContent.enterPromoCode}
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              size="sm"
              className="flex-1"
            />
            <Button
              variant="primary"
              size="sm"
              onClick={applyPromoCode}
            >
              {currentContent.applyPromo}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default QOCartEnhanced;