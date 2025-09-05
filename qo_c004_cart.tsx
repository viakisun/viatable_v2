import React, { useState } from 'react';
import { ChevronLeft, Plus, Minus, Trash2, Clock, Edit3, AlertCircle, Tag, ArrowRight } from 'lucide-react';

const QOShoppingCart = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [specialNotes, setSpecialNotes] = useState('');

  const content = {
    en: {
      title: "Your Order",
      backToMenu: "Continue Shopping",
      emptyCart: "Your cart is empty",
      emptyCartSubtext: "Add some delicious items from our menu",
      browseMenu: "Browse Menu",
      quantity: "Qty",
      remove: "Remove",
      edit: "Edit",
      orderSummary: "Order Summary",
      subtotal: "Subtotal",
      tax: "Tax (10%)",
      serviceCharge: "Service Charge (5%)",
      total: "Total",
      estimatedTime: "Estimated prep time",
      minutes: "minutes",
      promoCode: "Promo Code",
      applyPromo: "Apply",
      promoApplied: "Discount applied!",
      specialNotes: "Special Notes for Kitchen",
      notesPlaceholder: "Any special requests? (allergies, preferences, etc.)",
      proceedToCheckout: "Proceed to Checkout",
      tableInfo: "Table 12 • The Bistro",
      currency: "AUD",
      save: "Save"
    },
    ko: {
      title: "주문 내역",
      backToMenu: "쇼핑 계속하기",
      emptyCart: "장바구니가 비어있습니다",
      emptyCartSubtext: "메뉴에서 맛있는 음식을 추가해보세요",
      browseMenu: "메뉴 보기",
      quantity: "수량",
      remove: "삭제",
      edit: "수정",
      orderSummary: "주문 요약",
      subtotal: "소계",
      tax: "세금 (10%)",
      serviceCharge: "서비스 요금 (5%)",
      total: "총합계",
      estimatedTime: "예상 조리시간",
      minutes: "분",
      promoCode: "프로모 코드",
      applyPromo: "적용",
      promoApplied: "할인이 적용되었습니다!",
      specialNotes: "주방 전달사항",
      notesPlaceholder: "특별한 요청사항이 있으시면 적어주세요 (알레르기, 선호도 등)",
      proceedToCheckout: "결제하기",
      tableInfo: "테이블 12 • 더 비스트로",
      currency: "원",
      save: "저장"
    }
  };

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: { en: 'Avocado Toast Supreme', ko: '슈프림 아보카도 토스트' },
      basePrice: { AUD: 18.50, KRW: 26500 },
      quantity: 2,
      customizations: {
        en: ['Multigrain bread (+$1)', 'Extra avocado (+$3)'],
        ko: ['멀티그레인 빵 (+1천원)', '아보카도 추가 (+3천원)']
      },
      customizationPrice: { AUD: 4, KRW: 6000 },
      image: '🥑',
      prepTime: 12,
      specialNotes: 'No onions please'
    },
    {
      id: 2,
      name: { en: 'Oat Milk Latte', ko: '오트밀크 라떼' },
      basePrice: { AUD: 5.20, KRW: 7500 },
      quantity: 1,
      customizations: {
        en: ['Large size (+$1)', 'Extra shot (+$1)'],
        ko: ['라지 사이즈 (+1천원)', '샷 추가 (+1천원)']
      },
      customizationPrice: { AUD: 2, KRW: 3000 },
      image: '☕',
      prepTime: 4,
      specialNotes: ''
    },
    {
      id: 3,
      name: { en: 'Pancake Stack', ko: '팬케이크 스택' },
      basePrice: { AUD: 16.80, KRW: 24000 },
      quantity: 1,
      customizations: {
        en: ['Extra berries (+$2)'],
        ko: ['베리 추가 (+2천원)']
      },
      customizationPrice: { AUD: 2, KRW: 3000 },
      image: '🥞',
      prepTime: 15,
      specialNotes: 'Light syrup please'
    }
  ]);

  const currentContent = content[selectedLanguage];
  const currencySymbol = selectedLanguage === 'ko' ? '' : '$';
  const currencyCode = selectedLanguage === 'ko' ? 'KRW' : 'AUD';

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const calculateItemTotal = (item) => {
    return (item.basePrice[currencyCode] + item.customizationPrice[currencyCode]) * item.quantity;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.10;
  };

  const calculateServiceCharge = () => {
    return calculateSubtotal() * 0.05;
  };

  const calculateDiscount = () => {
    if (appliedPromo?.type === 'percentage') {
      return calculateSubtotal() * (appliedPromo.value / 100);
    }
    if (appliedPromo?.type === 'fixed') {
      return appliedPromo.value;
    }
    return 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateServiceCharge() - calculateDiscount();
  };

  const calculateTotalPrepTime = () => {
    return Math.max(...cartItems.map(item => item.prepTime));
  };

  const applyPromoCode = () => {
    const validPromos = {
      'WELCOME10': { type: 'percentage', value: 10, name: 'Welcome Discount (10%)' },
      'SAVE5': { type: 'fixed', value: currencyCode === 'AUD' ? 5 : 5000, name: `${currencySymbol}5 Off` }
    };

    if (validPromos[promoCode.toUpperCase()]) {
      setAppliedPromo(validPromos[promoCode.toUpperCase()]);
      setPromoCode('');
    } else {
      alert('Invalid promo code');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <header className="bg-white border-b border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <button className="flex items-center space-x-2 text-slate-600 hover:text-slate-900">
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">{currentContent.backToMenu}</span>
            </button>
            
            <div className="flex bg-slate-100 rounded-full p-1">
              <button
                onClick={() => setSelectedLanguage('en')}
                className={`px-2 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedLanguage === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setSelectedLanguage('ko')}
                className={`px-2 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedLanguage === 'ko' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                한국어
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{currentContent.emptyCart}</h2>
          <p className="text-slate-600 mb-8">{currentContent.emptyCartSubtext}</p>
          <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors">
            {currentContent.browseMenu}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <button className="flex items-center space-x-2 text-slate-600 hover:text-slate-900">
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">{currentContent.backToMenu}</span>
            </button>
            
            <div className="flex bg-slate-100 rounded-full p-1">
              <button
                onClick={() => setSelectedLanguage('en')}
                className={`px-2 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedLanguage === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setSelectedLanguage('ko')}
                className={`px-2 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedLanguage === 'ko' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                한국어
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900">{currentContent.title}</h1>
              <p className="text-sm text-slate-500">{currentContent.tableInfo}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-500">{currentContent.estimatedTime}</div>
              <div className="flex items-center text-slate-700">
                <Clock className="w-4 h-4 mr-1" />
                <span className="font-semibold">{calculateTotalPrepTime()} {currentContent.minutes}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Items */}
      <main className="p-4 pb-32">
        <div className="space-y-4 mb-6">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
              <div className="flex space-x-4">
                <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center text-2xl">
                  {item.image}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-slate-900">{item.name[selectedLanguage]}</h3>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {item.customizations[selectedLanguage].length > 0 && (
                    <div className="mb-2">
                      {item.customizations[selectedLanguage].map((customization, index) => (
                        <div key={index} className="text-xs text-slate-600">
                          • {customization}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {item.specialNotes && (
                    <div className="mb-2 text-xs text-orange-600 bg-orange-50 rounded p-2">
                      <AlertCircle className="w-3 h-3 inline mr-1" />
                      {item.specialNotes}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-medium w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-slate-900">
                        {currencySymbol}{calculateItemTotal(item).toLocaleString()}{selectedLanguage === 'ko' ? '원' : ''}
                      </div>
                      <div className="text-xs text-slate-500">
                        {currencySymbol}{(item.basePrice[currencyCode] + item.customizationPrice[currencyCode]).toLocaleString()}{selectedLanguage === 'ko' ? '원' : ''} each
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Promo Code */}
        <div className="bg-white rounded-xl p-4 mb-4">
          <h3 className="font-semibold text-slate-900 mb-3">{currentContent.promoCode}</h3>
          {appliedPromo ? (
            <div className="flex items-center space-x-2 text-green-600 bg-green-50 rounded-lg p-3">
              <Tag className="w-4 h-4" />
              <span className="text-sm font-medium">{currentContent.promoApplied}</span>
              <span className="text-sm">{appliedPromo.name}</span>
            </div>
          ) : (
            <div className="flex space-x-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                placeholder="WELCOME10"
                className="flex-1 px-3 py-2 bg-slate-50 rounded-lg border-0 focus:ring-2 focus:ring-slate-900"
              />
              <button
                onClick={applyPromoCode}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
              >
                {currentContent.applyPromo}
              </button>
            </div>
          )}
        </div>

        {/* Special Notes */}
        <div className="bg-white rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-slate-900 mb-3">{currentContent.specialNotes}</h3>
          <textarea
            value={specialNotes}
            onChange={(e) => setSpecialNotes(e.target.value)}
            placeholder={currentContent.notesPlaceholder}
            className="w-full p-3 bg-slate-50 rounded-lg border-0 focus:ring-2 focus:ring-slate-900 resize-none"
            rows="3"
          />
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="font-semibold text-slate-900 mb-4">{currentContent.orderSummary}</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between text-slate-600">
              <span>{currentContent.subtotal}</span>
              <span>{currencySymbol}{calculateSubtotal().toLocaleString()}{selectedLanguage === 'ko' ? '원' : ''}</span>
            </div>
            
            <div className="flex justify-between text-slate-600">
              <span>{currentContent.tax}</span>
              <span>{currencySymbol}{calculateTax().toLocaleString()}{selectedLanguage === 'ko' ? '원' : ''}</span>
            </div>
            
            <div className="flex justify-between text-slate-600">
              <span>{currentContent.serviceCharge}</span>
              <span>{currencySymbol}{calculateServiceCharge().toLocaleString()}{selectedLanguage === 'ko' ? '원' : ''}</span>
            </div>
            
            {appliedPromo && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-{currencySymbol}{calculateDiscount().toLocaleString()}{selectedLanguage === 'ko' ? '원' : ''}</span>
              </div>
            )}
            
            <hr className="my-2" />
            
            <div className="flex justify-between font-bold text-lg text-slate-900">
              <span>{currentContent.total}</span>
              <span>{currencySymbol}{calculateTotal().toLocaleString()}{selectedLanguage === 'ko' ? '원' : ''}</span>
            </div>
          </div>
        </div>
      </main>

      {/* Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200">
        <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-slate-800 transition-colors">
          <span>{currentContent.proceedToCheckout}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default QOShoppingCart;