import { useState } from 'react';
import { Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';

const QOShoppingCart = () => {
  const { language } = useLanguage();
  const [cartItems] = useState([
    { id: 1, name: { en: 'Avocado Toast Supreme', ko: '슈프림 아보카도 토스트' }, price: { AUD: 22.50, KRW: 32500 }, quantity: 2, image: '🥑' },
    { id: 2, name: { en: 'Oat Milk Latte', ko: '오트밀크 라떼' }, price: { AUD: 7.20, KRW: 10500 }, quantity: 1, image: '☕' },
  ]);

  const content = {
    en: { title: "Your Cart", backToMenu: "Menu", emptyCart: "Your cart is empty", browseMenu: "Browse Menu", orderSummary: "Order Summary", subtotal: "Subtotal", total: "Total", promoCode: "Promo Code", applyPromo: "Apply", proceedToCheckout: "Proceed to Checkout", currency: "AUD" },
    ko: { title: "장바구니", backToMenu: "메뉴", emptyCart: "장바구니가 비었습니다", browseMenu: "메뉴 보기", orderSummary: "주문 요약", subtotal: "소계", total: "총계", promoCode: "프로모 코드", applyPromo: "적용", proceedToCheckout: "결제하기", currency: "원" }
  };

  const currentContent = content[language];
  const currencySymbol = language === 'ko' ? '' : '$';
  const currencyCode = language === 'ko' ? 'KRW' : 'AUD';

  const calculateSubtotal = () => cartItems.reduce((sum, item) => sum + (item.price[currencyCode] * item.quantity), 0);
  const total = calculateSubtotal(); // simplified for demo

  if (cartItems.length === 0) {
    return (
      <PageLayout title={currentContent.title} backLink="/qo-c-002">
        <div className="flex flex-col items-center justify-center text-center h-full pt-16">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{currentContent.emptyCart}</h2>
          <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold">{currentContent.browseMenu}</button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={currentContent.title} backLink="/qo-c-002" removeMainPadding={true}>
      <div className="flex flex-col h-full">
        <main className="flex-1 overflow-y-auto p-4">
          {/* Cart Items */}
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center space-x-4">
                <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center text-2xl">{item.image}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{item.name[language]}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-3">
                      <button className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center"><Minus className="w-3 h-3" /></button>
                      <span>{item.quantity}</span>
                      <button className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center"><Plus className="w-3 h-3" /></button>
                    </div>
                    <div className="font-bold text-slate-900">{currencySymbol}{item.price[currencyCode].toLocaleString()}{language === 'ko' ? '원' : ''}</div>
                  </div>
                </div>
                <button className="p-1 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>

          {/* Promo Code */}
          <div className="bg-white rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-slate-900 mb-3">{currentContent.promoCode}</h3>
            <div className="flex space-x-2">
              <input type="text" placeholder="WELCOME10" className="flex-1 px-3 py-2 bg-slate-50 rounded-lg border focus:ring-2" />
              <button className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium">{currentContent.applyPromo}</button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl p-4">
            <h3 className="font-semibold text-slate-900 mb-4">{currentContent.orderSummary}</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-slate-600"><span>{currentContent.subtotal}</span><span>{currencySymbol}{total.toLocaleString()}{language === 'ko' ? '원' : ''}</span></div>
              <div className="flex justify-between font-bold text-lg text-slate-900 mt-2 pt-2 border-t"><span>{currentContent.total}</span><span>{currencySymbol}{total.toLocaleString()}{language === 'ko' ? '원' : ''}</span></div>
            </div>
          </div>
        </main>

        {/* Checkout Button */}
        <footer className="p-4 bg-white border-t">
          <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center">
            <span>{currentContent.proceedToCheckout}</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </footer>
      </div>
    </PageLayout>
  );
};

export default QOShoppingCart;