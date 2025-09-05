import React, { useState, useEffect } from 'react';
import { ChevronLeft, CreditCard, Smartphone, QrCode, Lock, Shield, CheckCircle, AlertCircle, Eye, EyeOff, Fingerprint } from 'lucide-react';

const QOPayment = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState('input'); // input, processing, success, failed
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [biometricAvailable, setBiometricAvailable] = useState(true);
  const [countdown, setCountdown] = useState(0);

  const content = {
    en: {
      title: "Secure Payment",
      backToCheckout: "Back to Checkout",
      paymentMethod: "Payment Method",
      changeMethod: "Change",
      cardNumber: "Card Number",
      expiryDate: "MM/YY",
      cvv: "CVV",
      cardholderName: "Cardholder Name",
      saveCard: "Save card for future orders",
      totalAmount: "Total Amount",
      payNow: "Pay Now",
      processing: "Processing Payment...",
      verifyingPayment: "Verifying your payment",
      paymentSuccessful: "Payment Successful!",
      paymentFailed: "Payment Failed",
      orderConfirmed: "Your order has been confirmed",
      tryAgain: "Try Again",
      securePayment: "256-bit SSL Encrypted",
      biometricPrompt: "Use Touch ID to confirm payment",
      useBiometric: "Use Touch/Face ID",
      enterManually: "Enter card details",
      qrInstructions: "Scan this QR code with your payment app",
      applePayPrompt: "Double-click side button to pay with Apple Pay",
      googlePayPrompt: "Tap to pay with Google Pay",
      waitingForPayment: "Waiting for payment confirmation...",
      orderNumber: "Order #2024-001",
      estimatedTime: "Estimated prep time: 15 minutes",
      receiptSent: "Receipt sent to your email",
      viewOrder: "View Order Status",
      currency: "AUD"
    },
    ko: {
      title: "안전한 결제",
      backToCheckout: "체크아웃으로",
      paymentMethod: "결제 방법",
      changeMethod: "변경",
      cardNumber: "카드 번호",
      expiryDate: "MM/YY",
      cvv: "CVV",
      cardholderName: "카드 소유자명",
      saveCard: "향후 주문을 위해 카드 저장",
      totalAmount: "총 결제금액",
      payNow: "결제하기",
      processing: "결제 처리 중...",
      verifyingPayment: "결제를 확인하고 있습니다",
      paymentSuccessful: "결제 완료!",
      paymentFailed: "결제 실패",
      orderConfirmed: "주문이 확정되었습니다",
      tryAgain: "다시 시도",
      securePayment: "256비트 SSL 암호화",
      biometricPrompt: "지문인식으로 결제를 확인해주세요",
      useBiometric: "지문/얼굴 인식 사용",
      enterManually: "카드 정보 직접 입력",
      qrInstructions: "결제 앱으로 이 QR 코드를 스캔해주세요",
      applePayPrompt: "Apple Pay로 결제하려면 사이드 버튼을 두 번 클릭하세요",
      googlePayPrompt: "Google Pay로 결제하려면 탭하세요",
      waitingForPayment: "결제 승인을 기다리고 있습니다...",
      orderNumber: "주문번호 #2024-001",
      estimatedTime: "예상 조리시간: 15분",
      receiptSent: "영수증이 이메일로 발송되었습니다",
      viewOrder: "주문 상태 보기",
      currency: "원"
    }
  };

  const orderData = {
    total: { AUD: 74.55, KRW: 107625 },
    orderNumber: "2024-001",
    customerEmail: "john@example.com"
  };

  const currentContent = content[selectedLanguage];
  const currencySymbol = selectedLanguage === 'ko' ? '' : '$';
  const currencyCode = selectedLanguage === 'ko' ? 'KRW' : 'AUD';

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardInput = (field, value) => {
    let formattedValue = value;
    
    if (field === 'number') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiry') {
      formattedValue = formatExpiry(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 3);
    }
    
    setCardDetails(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  const processPayment = async () => {
    setIsProcessing(true);
    setPaymentStep('processing');
    setCountdown(3);
    
    // Simulate payment processing
    setTimeout(() => {
      // Simulate 90% success rate
      if (Math.random() > 0.1) {
        setPaymentStep('success');
      } else {
        setPaymentStep('failed');
      }
      setIsProcessing(false);
    }, 3000);
  };

  const handleBiometricPayment = () => {
    setPaymentStep('processing');
    setCountdown(2);
    setTimeout(() => {
      setPaymentStep('success');
    }, 2000);
  };

  const renderPaymentInput = () => {
    switch (paymentMethod) {
      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {currentContent.cardNumber}
              </label>
              <div className="relative">
                <input
                  type={showCardNumber ? 'text' : 'password'}
                  value={cardDetails.number}
                  onChange={(e) => handleCardInput('number', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border-0 focus:ring-2 focus:ring-slate-900 pr-10"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
                <button
                  type="button"
                  onClick={() => setShowCardNumber(!showCardNumber)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showCardNumber ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {currentContent.expiryDate}
                </label>
                <input
                  type="text"
                  value={cardDetails.expiry}
                  onChange={(e) => handleCardInput('expiry', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border-0 focus:ring-2 focus:ring-slate-900"
                  placeholder="12/28"
                  maxLength={5}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {currentContent.cvv}
                </label>
                <input
                  type="password"
                  value={cardDetails.cvv}
                  onChange={(e) => handleCardInput('cvv', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border-0 focus:ring-2 focus:ring-slate-900"
                  placeholder="123"
                  maxLength={3}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {currentContent.cardholderName}
              </label>
              <input
                type="text"
                value={cardDetails.name}
                onChange={(e) => handleCardInput('name', e.target.value.toUpperCase())}
                className="w-full px-4 py-3 bg-slate-50 rounded-xl border-0 focus:ring-2 focus:ring-slate-900"
                placeholder="JOHN SMITH"
              />
            </div>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="w-4 h-4 text-slate-900 focus:ring-slate-900"
              />
              <span className="text-sm text-slate-600">{currentContent.saveCard}</span>
            </label>

            {biometricAvailable && (
              <div className="border-t pt-4">
                <button
                  onClick={handleBiometricPayment}
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-slate-100 rounded-xl text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  <Fingerprint className="w-5 h-5" />
                  <span className="font-medium">{currentContent.useBiometric}</span>
                </button>
              </div>
            )}
          </div>
        );
        
      case 'apple':
        return (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
              <Smartphone className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Apple Pay</h3>
            <p className="text-slate-600 mb-6">{currentContent.applePayPrompt}</p>
            <button
              onClick={processPayment}
              className="bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
            >
              Pay with Apple Pay
            </button>
          </div>
        );
        
      case 'qr':
        return (
          <div className="text-center py-8">
            <div className="w-48 h-48 bg-white rounded-xl border-2 border-slate-200 flex items-center justify-center mx-auto mb-6">
              <QrCode className="w-32 h-32 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">QR Payment</h3>
            <p className="text-slate-600 mb-4">{currentContent.qrInstructions}</p>
            <p className="text-sm text-slate-500">{currentContent.waitingForPayment}</p>
          </div>
        );
        
      default:
        return (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CreditCard className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">{currentContent.paymentMethod}</h3>
            <button
              onClick={processPayment}
              className="bg-slate-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors"
            >
              {currentContent.payNow}
            </button>
          </div>
        );
    }
  };

  const renderPaymentStatus = () => {
    switch (paymentStep) {
      case 'processing':
        return (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{currentContent.processing}</h2>
            <p className="text-slate-600 mb-4">{currentContent.verifyingPayment}</p>
            {countdown > 0 && (
              <div className="text-sm text-slate-500">
                Please wait {countdown} seconds...
              </div>
            )}
          </div>
        );
        
      case 'success':
        return (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{currentContent.paymentSuccessful}</h2>
            <p className="text-slate-600 mb-6">{currentContent.orderConfirmed}</p>
            
            <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Order Number:</span>
                  <span className="font-semibold">{currentContent.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Amount Paid:</span>
                  <span className="font-semibold">
                    {currencySymbol}{orderData.total[currencyCode].toLocaleString()}{selectedLanguage === 'ko' ? '원' : ''}
                  </span>
                </div>
                <div className="text-slate-600">{currentContent.estimatedTime}</div>
                <div className="text-slate-600">{currentContent.receiptSent}</div>
              </div>
            </div>
            
            <button 
              onClick={() => alert('Navigate to QO-C007')}
              className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors"
            >
              {currentContent.viewOrder}
            </button>
          </div>
        );
        
      case 'failed':
        return (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-12 h-12 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{currentContent.paymentFailed}</h2>
            <p className="text-slate-600 mb-6">Please check your payment information and try again.</p>
            
            <button 
              onClick={() => setPaymentStep('input')}
              className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors"
            >
              {currentContent.tryAgain}
            </button>
          </div>
        );
        
      default:
        return renderPaymentInput();
    }
  };

  if (paymentStep === 'success') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        {renderPaymentStatus()}
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
              <span className="font-medium">{currentContent.backToCheckout}</span>
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
          
          <h1 className="text-xl font-bold text-slate-900">{currentContent.title}</h1>
        </div>
      </header>

      {/* Content */}
      <main className="p-4 pb-32">
        {paymentStep === 'processing' || paymentStep === 'failed' ? renderPaymentStatus() : (
          <>
            {/* Payment Method Header */}
            <div className="bg-white rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-slate-900">{currentContent.paymentMethod}</h2>
                <button className="text-slate-600 text-sm hover:text-slate-900">
                  {currentContent.changeMethod}
                </button>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                <div className="text-slate-600">
                  {paymentMethod === 'card' && <CreditCard className="w-5 h-5" />}
                  {paymentMethod === 'apple' && <Smartphone className="w-5 h-5" />}
                  {paymentMethod === 'qr' && <QrCode className="w-5 h-5" />}
                </div>
                <span className="font-medium text-slate-900">
                  {paymentMethod === 'card' && 'Credit/Debit Card'}
                  {paymentMethod === 'apple' && 'Apple Pay'}
                  {paymentMethod === 'qr' && 'QR Payment'}
                </span>
              </div>
            </div>

            {/* Amount Summary */}
            <div className="bg-white rounded-xl p-4 mb-6">
              <h2 className="font-semibold text-slate-900 mb-3">{currentContent.totalAmount}</h2>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Order Total</span>
                <span className="text-2xl font-bold text-slate-900">
                  {currencySymbol}{orderData.total[currencyCode].toLocaleString()}{selectedLanguage === 'ko' ? '원' : ''}
                </span>
              </div>
            </div>

            {/* Payment Input */}
            <div className="bg-white rounded-xl p-4 mb-6">
              {renderPaymentInput()}
            </div>

            {/* Security Info */}
            <div className="bg-green-50 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">{currentContent.securePayment}</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Your payment information is encrypted and secure.
              </p>
            </div>
          </>
        )}
      </main>

      {/* Pay Now Button */}
      {paymentStep === 'input' && paymentMethod === 'card' && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200">
          <button
            onClick={processPayment}
            disabled={isProcessing || !cardDetails.number || !cardDetails.expiry || !cardDetails.cvv}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
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