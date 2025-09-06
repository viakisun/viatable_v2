import { CheckCircle, Home, RotateCcw } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';

const QOOrderConfirmation = () => {
  const { language } = useLanguage();

  const content = {
    en: { title: "Order Confirmed!", thankYou: "Thank you for your order", orderNumber: "Order Number", confirmation: "Your order is confirmed", estimatedTime: "Estimated ready time", trackOrder: "Track Your Order", whatNext: "What's Next?", newOrder: "New Order" },
    ko: { title: "주문 완료!", thankYou: "주문 감사합니다", orderNumber: "주문번호", confirmation: "주문이 확정되었습니다", estimatedTime: "예상 완성 시간", trackOrder: "주문 추적", whatNext: "다음 단계", newOrder: "새 주문" }
  };

  const orderData = { orderNumber: "2024-001" };
  const currentContent = content[language];

  return (
    <PageLayout title={currentContent.title} backLink={undefined} removeMainPadding={true}>
      <div className="flex flex-col h-full">
        {/* Success Header */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-2xl font-bold">{currentContent.title}</h1>
          <p className="text-green-100">{currentContent.thankYou}</p>
        </div>

        <main className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Order Info Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 -mt-24">
            <div className="text-center mb-6">
              <div className="text-sm text-slate-500 mb-1">{currentContent.orderNumber}</div>
              <div className="text-3xl font-bold text-slate-900">#{orderData.orderNumber}</div>
              <p className="text-slate-600 mt-2">{currentContent.confirmation}</p>
            </div>
            {/* ... other details ... */}
          </div>

          {/* What's Next */}
          <div className="bg-white rounded-xl p-4">
            <h2 className="font-semibold text-slate-900 mb-4">{currentContent.whatNext}</h2>
            {/* ... next steps info ... */}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center space-x-2 bg-slate-900 text-white rounded-xl py-3"><RotateCcw className="w-4 h-4" /><span>{currentContent.newOrder}</span></button>
            <button className="flex items-center justify-center space-x-2 bg-white border rounded-xl py-3"><Home className="w-4 h-4" /><span>{currentContent.trackOrder}</span></button>
          </div>
        </main>
      </div>
    </PageLayout>
  );
};

export default QOOrderConfirmation;