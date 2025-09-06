import React, { useState, useEffect } from 'react';
import { ChevronLeft, CreditCard, Smartphone, QrCode, Lock, Shield, CheckCircle, AlertCircle, Eye, EyeOff, Fingerprint } from 'lucide-react';
import AppHeader from '../components/AppHeader';

const QOPayment = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState('input'); // input, processing, success, failed
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [biometricAvailable, setBiometricAvailable] = useState(true);
  const [countdown, setCountdown] = useState(0);

  const content = {
    en: { title: "Secure Payment", backToCheckout: "Back to Checkout", paymentMethod: "Payment Method", changeMethod: "Change", cardNumber: "Card Number", expiryDate: "MM/YY", cvv: "CVV", cardholderName: "Cardholder Name", saveCard: "Save card for future orders", totalAmount: "Total Amount", payNow: "Pay Now", processing: "Processing Payment...", verifyingPayment: "Verifying your payment", paymentSuccessful: "Payment Successful!", paymentFailed: "Payment Failed", orderConfirmed: "Your order has been confirmed", tryAgain: "Try Again", securePayment: "256-bit SSL Encrypted", biometricPrompt: "Use Touch ID to confirm payment", useBiometric: "Use Touch/Face ID", enterManually: "Enter card details", qrInstructions: "Scan this QR code with your payment app", applePayPrompt: "Double-click side button to pay with Apple Pay", googlePayPrompt: "Tap to pay with Google Pay", waitingForPayment: "Waiting for payment confirmation...", orderNumber: "Order #2024-001", estimatedTime: "Estimated prep time: 15 minutes", receiptSent: "Receipt sent to your email", viewOrder: "View Order Status", currency: "AUD" },
    ko: { title: "안전한 결제", backToCheckout: "체크아웃으로", paymentMethod: "결제 방법", changeMethod: "변경", cardNumber: "카드 번호", expiryDate: "MM/YY", cvv: "CVV", cardholderName: "카드 소유자명", saveCard: "향후 주문을 위해 카드 저장", totalAmount: "총 결제금액", payNow: "결제하기", processing: "결제 처리 중...", verifyingPayment: "결제를 확인하고 있습니다", paymentSuccessful: "결제 완료!", paymentFailed: "결제 실패", orderConfirmed: "주문이 확정되었습니다", tryAgain: "다시 시도", securePayment: "256비트 SSL 암호화", biometricPrompt: "지문인식으로 결제를 확인해주세요", useBiometric: "지문/얼굴 인식 사용", enterManually: "카드 정보 직접 입력", qrInstructions: "결제 앱으로 이 QR 코드를 스캔해주세요", applePayPrompt: "Apple Pay로 결제하려면 사이드 버튼을 두 번 클릭하세요", googlePayPrompt: "Google Pay로 결제하려면 탭하세요", waitingForPayment: "결제 승인을 기다리고 있습니다...", orderNumber: "주문번호 #2024-001", estimatedTime: "예상 조리시간: 15분", receiptSent: "영수증이 이메일로 발송되었습니다", viewOrder: "주문 상태 보기", currency: "원" }
  };

  const orderData = { total: { AUD: 74.55, KRW: 107625 }, orderNumber: "2024-001", customerEmail: "john@example.com" };
  const currentContent = content[selectedLanguage];
  const currencySymbol = selectedLanguage === 'ko' ? '' : '$';
  const currencyCode = selectedLanguage === 'ko' ? 'KRW' : 'AUD';

  useEffect(() => { if (countdown > 0) { const timer = setTimeout(() => setCountdown(countdown - 1), 1000); return () => clearTimeout(timer); } }, [countdown]);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, ''); const matches = v.match(/\d{4,16}/g); const match = matches && matches[0] || ''; const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) { parts.push(match.substring(i, i + 4)); }
    return parts.length ? parts.join(' ') : v;
  };
  const formatExpiry = (value) => { const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, ''); return v.length >= 2 ? v.substring(0, 2) + '/' + v.substring(2, 4) : v; };
  const handleCardInput = (field, value) => {
    let formattedValue = value;
    if (field === 'number') formattedValue = formatCardNumber(value);
    else if (field === 'expiry') formattedValue = formatExpiry(value);
    else if (field === 'cvv') formattedValue = value.replace(/\D/g, '').substring(0, 3);
    setCardDetails(prev => ({ ...prev, [field]: formattedValue }));
  };
  const processPayment = async () => { setIsProcessing(true); setPaymentStep('processing'); setCountdown(3); setTimeout(() => { Math.random() > 0.1 ? setPaymentStep('success') : setPaymentStep('failed'); setIsProcessing(false); }, 3000); };
  const handleBiometricPayment = () => { setPaymentStep('processing'); setCountdown(2); setTimeout(() => { setPaymentStep('success'); }, 2000); };

  const renderPaymentInput = () => { /* ... unchanged ... */ };
  const renderPaymentStatus = () => { /* ... unchanged ... */ };

  if (paymentStep === 'success') {
    return (
      <div className="min-h-full bg-slate-50">
        <AppHeader />
        <main className="flex items-center justify-center p-4 pt-20">
          {/* ... success status JSX ... */}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-slate-50">
      <AppHeader />
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200 pt-16">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <button className="flex items-center space-x-2 text-slate-600 hover:text-slate-900">
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">{currentContent.backToCheckout}</span>
            </button>
          </div>
          <h1 className="text-xl font-bold text-slate-900">{currentContent.title}</h1>
        </div>
      </header>

      <main className="p-4 pb-32">
        {paymentStep === 'processing' || paymentStep === 'failed' ? renderPaymentStatus() : (
          <>
            <div className="bg-white rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-4"><h2 className="font-semibold text-slate-900">{currentContent.paymentMethod}</h2><button className="text-slate-600 text-sm hover:text-slate-900">{currentContent.changeMethod}</button></div>
              <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg"><div className="text-slate-600">{paymentMethod === 'card' && <CreditCard className="w-5 h-5" />}{paymentMethod === 'apple' && <Smartphone className="w-5 h-5" />}{paymentMethod === 'qr' && <QrCode className="w-5 h-5" />}</div><span className="font-medium text-slate-900">{paymentMethod === 'card' && 'Credit/Debit Card'}{paymentMethod === 'apple' && 'Apple Pay'}{paymentMethod === 'qr' && 'QR Payment'}</span></div>
            </div>
            <div className="bg-white rounded-xl p-4 mb-6">
              <h2 className="font-semibold text-slate-900 mb-3">{currentContent.totalAmount}</h2>
              <div className="flex justify-between items-center"><span className="text-slate-600">Order Total</span><span className="text-2xl font-bold text-slate-900">{currencySymbol}{orderData.total[currencyCode].toLocaleString()}{selectedLanguage === 'ko' ? '원' : ''}</span></div>
            </div>
            <div className="bg-white rounded-xl p-4 mb-6">{renderPaymentInput()}</div>
            <div className="bg-green-50 rounded-xl p-4 mb-6"><div className="flex items-center space-x-2"><Shield className="w-5 h-5 text-green-600" /><span className="font-medium text-green-800">{currentContent.securePayment}</span></div><p className="text-sm text-green-700 mt-1">Your payment information is encrypted and secure.</p></div>
          </>
        )}
      </main>

      {paymentStep === 'input' && paymentMethod === 'card' && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[414px] p-4 bg-white border-t border-slate-200">
          <button onClick={processPayment} disabled={isProcessing || !cardDetails.number || !cardDetails.expiry || !cardDetails.cvv} className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <Lock className="w-5 h-5" />
            <span>{currentContent.payNow}</span>
            <span>•</span>
            <span>{currencySymbol}{orderData.total[currencyCode].toLocaleString()}{selectedLanguage === 'ko' ? '원' : ''}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default QOPayment;