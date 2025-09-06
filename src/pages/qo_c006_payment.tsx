import React, { useState, useEffect } from 'react';
import { CreditCard, Smartphone, QrCode, Lock, Shield, CheckCircle, AlertCircle, Eye, EyeOff, Fingerprint } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';

const QOPayment = () => {
  const { language } = useLanguage();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentStep, setPaymentStep] = useState('input');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });

  const content = {
    en: { title: "Secure Payment", totalAmount: "Total Amount", payNow: "Pay Now", processing: "Processing...", paymentSuccessful: "Payment Successful!", paymentFailed: "Payment Failed", tryAgain: "Try Again", currency: "AUD" },
    ko: { title: "안전 결제", totalAmount: "총 결제금액", payNow: "결제하기", processing: "처리 중...", paymentSuccessful: "결제 성공!", paymentFailed: "결제 실패", tryAgain: "다시 시도", currency: "원" }
  };

  const orderData = { total: { AUD: 74.55, KRW: 107625 } };
  const currentContent = content[language];
  const currencySymbol = language === 'ko' ? '' : '$';
  const currencyCode = language === 'ko' ? 'KRW' : 'AUD';

  const processPayment = () => {
    setPaymentStep('processing');
    setTimeout(() => {
      setPaymentStep(Math.random() > 0.1 ? 'success' : 'failed');
    }, 2000);
  };

  const PaymentStatus = ({ status }) => {
    const statuses = {
      processing: { icon: <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>, title: currentContent.processing, color: 'blue' },
      success: { icon: <CheckCircle className="w-12 h-12 text-green-500" />, title: currentContent.paymentSuccessful, color: 'green' },
      failed: { icon: <AlertCircle className="w-12 h-12 text-red-500" />, title: currentContent.paymentFailed, color: 'red' }
    };
    const currentStatus = statuses[status];
    return (
      <div className="flex flex-col items-center justify-center text-center h-full">
        <div className={`w-20 h-20 bg-${currentStatus.color}-100 rounded-full flex items-center justify-center mb-6`}>{currentStatus.icon}</div>
        <h2 className={`text-2xl font-bold text-slate-900`}>{currentStatus.title}</h2>
        {status === 'failed' && <button onClick={() => setPaymentStep('input')} className="mt-6 bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold">{currentContent.tryAgain}</button>}
      </div>
    );
  };

  return (
    <PageLayout title={currentContent.title} backLink="/qo-c-005" removeMainPadding={paymentStep !== 'input'}>
      {paymentStep === 'input' ? (
        <div className="flex flex-col h-full">
          <main className="flex-1 overflow-y-auto p-4 space-y-6">
            <div className="bg-white rounded-xl p-4">
              <h2 className="font-semibold text-slate-900 mb-3">{currentContent.totalAmount}</h2>
              <div className="text-3xl font-bold text-slate-900">{currencySymbol}{orderData.total[currencyCode].toLocaleString()}{language === 'ko' ? '원' : ''}</div>
            </div>
            <div className="bg-white rounded-xl p-4">
              {/* Card input form would go here */}
              <p className="text-slate-500 text-center">Card input form placeholder</p>
            </div>
          </main>
          <footer className="p-4 bg-white border-t">
            <button onClick={processPayment} className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center">
              <Lock className="w-5 h-5 mr-2" />
              <span>{currentContent.payNow}</span>
            </button>
          </footer>
        </div>
      ) : (
        <PaymentStatus status={paymentStep} />
      )}
    </PageLayout>
  );
};

export default QOPayment;