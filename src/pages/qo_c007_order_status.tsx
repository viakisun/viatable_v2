import { useState, useEffect } from 'react';
import { Clock, CheckCircle, Phone, MessageSquare, Bell, BellOff } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { useLanguage } from '../contexts/useLanguage';

const QOOrderStatus = () => {
  const { language } = useLanguage();
  const [orderStatus] = useState('preparing');
  const [estimatedTime] = useState(12);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const content = {
    en: { title: "Order Status", orderConfirmed: "Confirmed", preparing: "Preparing", ready: "Ready", minutesLeft: "min left", orderTimeline: "Order Timeline", orderItems: "Order Items", callStaff: "Call Staff", sendMessage: "Send Message" },
    ko: { title: "주문 현황", orderConfirmed: "주문 확인", preparing: "조리 중", ready: "준비 완료", minutesLeft: "분 남음", orderTimeline: "주문 진행상황", orderItems: "주문 내역", callStaff: "직원 호출", sendMessage: "메시지" }
  };

  const currentContent = content[language];
  const statusSteps = [ { id: 'confirmed', label: currentContent.orderConfirmed }, { id: 'preparing', label: currentContent.preparing }, { id: 'ready', label: currentContent.ready } ];
  const getCurrentStepIndex = () => statusSteps.findIndex(step => step.id === orderStatus);

  useEffect(() => { /* ... timer logic ... */ }, [estimatedTime, orderStatus]);

  const NotificationButton = () => (
    <button onClick={() => setNotificationsEnabled(!notificationsEnabled)} className={`p-2 rounded-full transition-colors ${notificationsEnabled ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
      {notificationsEnabled ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
    </button>
  );

  return (
    <PageLayout title={currentContent.title} backLink="/" headerActions={<NotificationButton />}>
      <div className="space-y-6">
        {/* Status Progress */}
        <div className="bg-white rounded-xl p-6">
          <h2 className="font-semibold text-slate-900 mb-6">{currentContent.orderTimeline}</h2>
          <div className="flex justify-between items-center relative">
            {statusSteps.map((step, index) => {
              const isCompleted = index <= getCurrentStepIndex();
              return (
                <div key={step.id} className="z-10 flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${isCompleted ? 'bg-green-100 border-green-500' : 'bg-slate-100 border-slate-300'}`}>
                    {isCompleted ? <CheckCircle className="w-5 h-5 text-green-600" /> : <Clock className="w-5 h-5 text-slate-400" />}
                  </div>
                  <span className={`mt-2 text-xs font-medium ${isCompleted ? 'text-slate-700' : 'text-slate-400'}`}>{step.label}</span>
                </div>
              );
            })}
            <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-200">
              <div className="h-full bg-green-500" style={{ width: `${(getCurrentStepIndex() / (statusSteps.length - 1)) * 100}%` }}></div>
            </div>
          </div>
          {orderStatus === 'preparing' && (
            <div className="mt-4 text-center text-blue-600 font-medium">
              ~{Math.ceil(estimatedTime)} {currentContent.minutesLeft}
            </div>
          )}
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-xl p-4">
          <h2 className="font-semibold text-slate-900 mb-4">{currentContent.orderItems}</h2>
          {/* ... order items list ... */}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center space-x-2 bg-white border border-slate-200 rounded-xl py-3"><Phone className="w-4 h-4" /><span>{currentContent.callStaff}</span></button>
          <button className="flex items-center justify-center space-x-2 bg-white border border-slate-200 rounded-xl py-3"><MessageSquare className="w-4 h-4" /><span>{currentContent.sendMessage}</span></button>
        </div>
      </div>
    </PageLayout>
  );
};

export default QOOrderStatus;