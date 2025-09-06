import React, { useState } from 'react';
import { ChevronLeft, Clock, CreditCard, Smartphone, QrCode, User, Mail, Phone, MapPin, AlertCircle, CheckCircle, ArrowRight, Edit3 } from 'lucide-react';
import AppHeader from '../components/AppHeader';

const QOCheckout = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', phone: '', isGuest: true });
  const [serviceType, setServiceType] = useState('dine-in');
  const [tableNumber, setTableNumber] = useState('12');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const content = {
    en: { title: "Checkout", backToCart: "Back to Cart", orderSummary: "Order Summary", customerInfo: "Customer Information", guestCheckout: "Continue as Guest", createAccount: "Create Account", name: "Full Name", email: "Email Address", phone: "Phone Number", serviceType: "Service Type", dineIn: "Dine In", takeaway: "Takeaway", tableNumber: "Table Number", paymentMethod: "Payment Method", creditCard: "Credit/Debit Card", applePay: "Apple Pay", googlePay: "Google Pay", paypal: "PayPal", qrPayment: "QR Payment", orderNotes: "Order Notes", notesPlaceholder: "Special instructions for your order...", terms: "Terms & Conditions", privacy: "Privacy Policy", agreeTerms: "I agree to the Terms & Conditions and Privacy Policy", placeOrder: "Place Order", processing: "Processing...", estimatedTime: "Est. prep time", minutes: "min", total: "Total", items: "items", currency: "AUD", required: "Required", invalidEmail: "Please enter a valid email", invalidPhone: "Please enter a valid phone number" },
    ko: { title: "결제하기", backToCart: "장바구니로", orderSummary: "주문 요약", customerInfo: "고객 정보", guestCheckout: "비회원으로 계속", createAccount: "계정 만들기", name: "성함", email: "이메일 주소", phone: "전화번호", serviceType: "서비스 유형", dineIn: "매장 식사", takeaway: "포장 주문", tableNumber: "테이블 번호", paymentMethod: "결제 방법", creditCard: "신용/체크카드", applePay: "Apple Pay", googlePay: "Google Pay", paypal: "PayPal", qrPayment: "QR 결제", orderNotes: "주문 메모", notesPlaceholder: "주문에 대한 특별 요청사항...", terms: "이용약관", privacy: "개인정보처리방침", agreeTerms: "이용약관 및 개인정보처리방침에 동의합니다", placeOrder: "주문하기", processing: "처리 중...", estimatedTime: "예상 조리시간", minutes: "분", total: "총합계", items: "개", currency: "원", required: "필수", invalidEmail: "올바른 이메일 주소를 입력해주세요", invalidPhone: "올바른 전화번호를 입력해주세요" }
  };

  const orderData = {
    items: [ { name: { en: 'Avocado Toast Supreme', ko: '슈프림 아보카도 토스트' }, quantity: 2, price: { AUD: 45.00, KRW: 65000 } }, { name: { en: 'Oat Milk Latte', ko: '오트밀크 라떼' }, quantity: 1, price: { AUD: 7.20, KRW: 10500 } }, { name: { en: 'Pancake Stack', ko: '팬케이크 스택' }, quantity: 1, price: { AUD: 18.80, KRW: 27000 } } ],
    subtotal: { AUD: 71.00, KRW: 102500 }, tax: { AUD: 7.10, KRW: 10250 }, serviceCharge: { AUD: 3.55, KRW: 5125 }, discount: { AUD: 7.10, KRW: 10250 }, total: { AUD: 74.55, KRW: 107625 }, estimatedTime: 15
  };

  const currentContent = content[selectedLanguage];
  const currencySymbol = selectedLanguage === 'ko' ? '' : '$';
  const currencyCode = selectedLanguage === 'ko' ? 'KRW' : 'AUD';

  const paymentMethods = [
    { id: 'card', name: currentContent.creditCard, icon: <CreditCard className="w-5 h-5" />, popular: true },
    { id: 'apple', name: currentContent.applePay, icon: <Smartphone className="w-5 h-5" />, available: true },
    { id: 'google', name: currentContent.googlePay, icon: <Smartphone className="w-5 h-5" />, available: true },
    { id: 'paypal', name: currentContent.paypal, icon: <CreditCard className="w-5 h-5" />, available: true },
    { id: 'qr', name: currentContent.qrPayment, icon: <QrCode className="w-5 h-5" />, available: selectedLanguage === 'ko' }
  ].filter(method => method.available !== false);

  const validateForm = () => {
    const newErrors = {};
    if (!customerInfo.name.trim()) { newErrors.name = currentContent.required; }
    if (!customerInfo.email.trim()) { newErrors.email = currentContent.required; }
    else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) { newErrors.email = currentContent.invalidEmail; }
    if (!customerInfo.phone.trim()) { newErrors.phone = currentContent.required; }
    else if (!/^[\+]?[0-9\s\-\(\)]+$/.test(customerInfo.phone)) { newErrors.phone = currentContent.invalidPhone; }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
    setIsProcessing(true);
    setTimeout(() => { alert('Order placed successfully! (Navigate to QO-C006)'); setIsProcessing(false); }, 2000);
  };

  const updateCustomerInfo = (field, value) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
    if (errors[field]) { setErrors(prev => ({ ...prev, [field]: '' })); }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />

      <header className="sticky top-0 z-10 bg-white border-b border-slate-200 pt-16">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <button className="flex items-center space-x-2 text-slate-600 hover:text-slate-900">
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">{currentContent.backToCart}</span>
            </button>
          </div>
          <h1 className="text-xl font-bold text-slate-900">{currentContent.title}</h1>
        </div>
      </header>

      <main className="p-4 pb-32 space-y-6">
        {/* Order Summary, Service Type, Customer Info, etc. */}
        <div className="bg-white rounded-xl p-4">
          <h2 className="font-semibold text-slate-900 mb-3">{currentContent.orderSummary}</h2>
          <div className="space-y-2 mb-4">
            {orderData.items.map((item, index) => ( <div key={index} className="flex justify-between text-sm"><span className="text-slate-600">{item.name[selectedLanguage]} × {item.quantity}</span><span className="font-medium">{currencySymbol}{item.price[currencyCode].toLocaleString()}{selectedLanguage === 'ko' ? '원' : ''}</span></div>))}
          </div>
          <div className="border-t pt-2 space-y-1">
            <div className="flex justify-between text-sm text-slate-600"><span>Subtotal</span><span>{currencySymbol}{orderData.subtotal[currencyCode].toLocaleString()}{selectedLanguage === 'ko' ? '원' : ''}</span></div>
            <div className="flex justify-between text-sm text-green-600"><span>Discount</span><span>-{currencySymbol}{orderData.discount[currencyCode].toLocaleString()}{selectedLanguage === 'ko' ? '원' : ''}</span></div>
            <div className="flex justify-between font-bold text-slate-900 pt-1 border-t"><span>{currentContent.total}</span><span>{currencySymbol}{orderData.total[currencyCode].toLocaleString()}{selectedLanguage === 'ko' ? '원' : ''}</span></div>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm text-slate-500 bg-slate-50 rounded-lg p-2"><div className="flex items-center space-x-1"><Clock className="w-4 h-4" /><span>{currentContent.estimatedTime}: {orderData.estimatedTime} {currentContent.minutes}</span></div><span>{orderData.items.reduce((sum, item) => sum + item.quantity, 0)} {currentContent.items}</span></div>
        </div>

        <div className="bg-white rounded-xl p-4">
          <h2 className="font-semibold text-slate-900 mb-3">{currentContent.serviceType}</h2>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setServiceType('dine-in')} className={`p-3 rounded-lg border-2 transition-all ${serviceType === 'dine-in' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 hover:border-slate-300'}`}><MapPin className="w-5 h-5 mx-auto mb-1" /><div className="text-sm font-medium">{currentContent.dineIn}</div></button>
            <button onClick={() => setServiceType('takeaway')} className={`p-3 rounded-lg border-2 transition-all ${serviceType === 'takeaway' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 hover:border-slate-300'}`}><ArrowRight className="w-5 h-5 mx-auto mb-1" /><div className="text-sm font-medium">{currentContent.takeaway}</div></button>
          </div>
          {serviceType === 'dine-in' && (<div className="mt-3"><label className="block text-sm font-medium text-slate-700 mb-1">{currentContent.tableNumber}</label><div className="flex items-center space-x-2"><input type="text" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} className="flex-1 px-3 py-2 bg-slate-50 rounded-lg border-0 focus:ring-2 focus:ring-slate-900" placeholder="12" /><button className="p-2 text-slate-400 hover:text-slate-600"><Edit3 className="w-4 h-4" /></button></div></div>)}
        </div>

        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center justify-between mb-4"><h2 className="font-semibold text-slate-900">{currentContent.customerInfo}</h2><div className="flex space-x-2"><button onClick={() => setCustomerInfo(prev => ({ ...prev, isGuest: true }))} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${customerInfo.isGuest ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{currentContent.guestCheckout}</button><button onClick={() => setCustomerInfo(prev => ({ ...prev, isGuest: false }))} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${!customerInfo.isGuest ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{currentContent.createAccount}</button></div></div>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-slate-700 mb-1">{currentContent.name} *</label><div className="relative"><User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="text" value={customerInfo.name} onChange={(e) => updateCustomerInfo('name', e.target.value)} className={`w-full pl-10 pr-3 py-2 bg-slate-50 rounded-lg border-0 focus:ring-2 focus:ring-slate-900 ${errors.name ? 'ring-2 ring-red-500' : ''}`} placeholder="John Smith" /></div>{errors.name && (<div className="mt-1 flex items-center space-x-1 text-red-600 text-xs"><AlertCircle className="w-3 h-3" /><span>{errors.name}</span></div>)}</div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">{currentContent.email} *</label><div className="relative"><Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="email" value={customerInfo.email} onChange={(e) => updateCustomerInfo('email', e.target.value)} className={`w-full pl-10 pr-3 py-2 bg-slate-50 rounded-lg border-0 focus:ring-2 focus:ring-slate-900 ${errors.email ? 'ring-2 ring-red-500' : ''}`} placeholder="john@example.com" /></div>{errors.email && (<div className="mt-1 flex items-center space-x-1 text-red-600 text-xs"><AlertCircle className="w-3 h-3" /><span>{errors.email}</span></div>)}</div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">{currentContent.phone} *</label><div className="relative"><Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="tel" value={customerInfo.phone} onChange={(e) => updateCustomerInfo('phone', e.target.value)} className={`w-full pl-10 pr-3 py-2 bg-slate-50 rounded-lg border-0 focus:ring-2 focus:ring-slate-900 ${errors.phone ? 'ring-2 ring-red-500' : ''}`} placeholder={selectedLanguage === 'ko' ? '010-1234-5678' : '+61 400 000 000'} /></div>{errors.phone && (<div className="mt-1 flex items-center space-x-1 text-red-600 text-xs"><AlertCircle className="w-3 h-3" /><span>{errors.phone}</span></div>)}</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4">
          <h2 className="font-semibold text-slate-900 mb-3">{currentContent.paymentMethod}</h2>
          <div className="space-y-2">{paymentMethods.map((method) => (<button key={method.id} onClick={() => setSelectedPaymentMethod(method.id)} className={`w-full flex items-center space-x-3 p-3 rounded-lg border-2 transition-all ${selectedPaymentMethod === method.id ? 'border-slate-900 bg-slate-50' : 'border-slate-200 hover:border-slate-300'}`}><div className="text-slate-600">{method.icon}</div><span className="flex-1 text-left font-medium text-slate-700">{method.name}</span>{method.popular && (<span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full font-medium">Popular</span>)}<div className={`w-4 h-4 rounded-full border-2 ${selectedPaymentMethod === method.id ? 'bg-slate-900 border-slate-900' : 'border-slate-300'}`}>{selectedPaymentMethod === method.id && (<CheckCircle className="w-4 h-4 text-white -m-0.5" />)}</div></button>))}</div>
        </div>

        <div className="bg-white rounded-xl p-4">
          <label className="flex items-start space-x-3"><input type="checkbox" className="w-4 h-4 text-slate-900 focus:ring-slate-900 mt-0.5" required /><span className="text-sm text-slate-600 leading-relaxed">{currentContent.agreeTerms}<div className="mt-1"><a href="#" className="text-slate-900 underline hover:no-underline">{currentContent.terms}</a>{' • '}<a href="#" className="text-slate-900 underline hover:no-underline">{currentContent.privacy}</a></div></span></label>
        </div>
      </main>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[414px] p-4 bg-white border-t border-slate-200">
        <button onClick={handlePlaceOrder} disabled={isProcessing} className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-slate-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
          {isProcessing ? (<><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div><span>{currentContent.processing}</span></>) : (<><span>{currentContent.placeOrder}</span><span>•</span><span>{currencySymbol}{orderData.total[currencyCode].toLocaleString()}{selectedLanguage === 'ko' ? '원' : ''}</span></>)}
        </button>
      </div>
    </div>
  );
};

export default QOCheckout;