import React, { useState, useEffect } from 'react';
import { ChevronLeft, Clock, CheckCircle, AlertCircle, Phone, MessageSquare, Star, Receipt, Share, Bell, BellOff, ChefHat, Utensils, Package } from 'lucide-react';

const QOOrderStatus = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [orderStatus, setOrderStatus] = useState('preparing'); // confirmed, preparing, ready, completed
  const [estimatedTime, setEstimatedTime] = useState(12); // minutes remaining
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);

  const content = {
    en: {
      title: "Order Status",
      backToMenu: "Back to Menu",
      orderNumber: "Order #2024-001",
      tableNumber: "Table 12",
      orderConfirmed: "Order Confirmed",
      preparing: "Being Prepared",
      ready: "Ready for Pickup",
      completed: "Completed",
      estimatedTime: "Estimated time",
      actualTime: "Actual time",
      minutesLeft: "minutes left",
      orderReady: "Your order is ready!",
      thankYou: "Thank you for your order",
      orderItems: "Order Items",
      callStaff: "Call Staff",
      sendMessage: "Message",
      notifications: "Notifications",
      notificationsOn: "On",
      notificationsOff: "Off",
      viewReceipt: "View Receipt",
      shareOrder: "Share Order",
      reorder: "Reorder",
      rateExperience: "Rate your experience",
      submitRating: "Submit Rating",
      specialRequests: "Special Requests",
      kitchenNotes: "Kitchen received your special requests",
      orderTimeline: "Order Timeline",
      placedAt: "Placed at",
      confirmedAt: "Confirmed at",
      preparingAt: "Started preparing at",
      readyAt: "Ready at",
      currency: "AUD",
      orderTotal: "Order Total",
      paymentMethod: "Payment Method",
      creditCard: "Credit Card",
      contactRestaurant: "Contact Restaurant"
    },
    ko: {
      title: "주문 현황",
      backToMenu: "메뉴로",
      orderNumber: "주문번호 #2024-001",
      tableNumber: "테이블 12",
      orderConfirmed: "주문 확인됨",
      preparing: "조리 중",
      ready: "픽업 대기",
      completed: "완료",
      estimatedTime: "예상 시간",
      actualTime: "실제 시간",
      minutesLeft: "분 남음",
      orderReady: "주문이 준비되었습니다!",
      thankYou: "주문해 주셔서 감사합니다",
      orderItems: "주문 항목",
      callStaff: "직원 호출",
      sendMessage: "메시지",
      notifications: "알림",
      notificationsOn: "켜짐",
      notificationsOff: "꺼짐",
      viewReceipt: "영수증 보기",
      shareOrder: "주문 공유",
      reorder: "재주문",
      rateExperience: "서비스를 평가해주세요",
      submitRating: "평가 제출",
      specialRequests: "특별 요청사항",
      kitchenNotes: "주방에서 특별 요청사항을 확인했습니다",
      orderTimeline: "주문 진행상황",
      placedAt: "주문 시간",
      confirmedAt: "확인 시간",
      preparingAt: "조리 시작",
      readyAt: "완성 시간",
      currency: "원",
      orderTotal: "주문 총액",
      paymentMethod: "결제 방법",
      creditCard: "신용카드",
      contactRestaurant: "레스토랑 연락"
    }
  };

  const orderData = {
    orderNumber: "2024-001",
    tableNumber: "12",
    placedAt: "14:25",
    confirmedAt: "14:26",
    preparingAt: "14:28",
    readyAt: orderStatus === 'ready' ? "14:40" : null,
    items: [
      { 
        name: { en: 'Avocado Toast Supreme', ko: '슈프림 아보카도 토스트' }, 
        quantity: 2, 
        price: { AUD: 45.00, KRW: 65000 },
        status: 'preparing',
        specialNotes: 'No onions please'
      },
      { 
        name: { en: 'Oat Milk Latte', ko: '오트밀크 라떼' }, 
        quantity: 1, 
        price: { AUD: 7.20, KRW: 10500 },
        status: 'ready',
        specialNotes: 'Extra hot'
      },
      { 
        name: { en: 'Pancake Stack', ko: '팬케이크 스택' }, 
        quantity: 1, 
        price: { AUD: 18.80, KRW: 27000 },
        status: 'confirmed',
        specialNotes: ''
      }
    ],
    total: { AUD: 74.55, KRW: 107625 },
    paymentMethod: 'Credit Card ****1234',
    specialRequests: 'No nuts, extra napkins please'
  };

  const currentContent = content[selectedLanguage];
  const currencySymbol = selectedLanguage === 'ko' ? '' : '$';
  const currencyCode = selectedLanguage === 'ko' ? 'KRW' : 'AUD';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (estimatedTime > 0 && orderStatus === 'preparing') {
        setEstimatedTime(prev => Math.max(0, prev - 0.017)); // Approximate countdown
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [estimatedTime, orderStatus]);

  useEffect(() => {
    // Simulate order status progression
    const progressTimer = setTimeout(() => {
      if (orderStatus === 'confirmed') {
        setOrderStatus('preparing');
        setEstimatedTime(12);
      } else if (orderStatus === 'preparing' && estimatedTime <= 0) {
        setOrderStatus('ready');
        setShowRating(true);
      }
    }, 5000);

    return () => clearTimeout(progressTimer);
  }, [orderStatus, estimatedTime]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'preparing':
        return <ChefHat className="w-5 h-5 text-blue-600" />;
      case 'ready':
        return <Package className="w-5 h-5 text-orange-600" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'preparing':
        return 'bg-blue-100 text-blue-800';
      case 'ready':
        return 'bg-orange-100 text-orange-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  const statusSteps = [
    { id: 'confirmed', label: currentContent.orderConfirmed, time: orderData.confirmedAt },
    { id: 'preparing', label: currentContent.preparing, time: orderData.preparingAt },
    { id: 'ready', label: currentContent.ready, time: orderData.readyAt },
  ];

  const getCurrentStepIndex = () => {
    return statusSteps.findIndex(step => step.id === orderStatus);
  };

  const handleRating = (value) => {
    setRating(value);
  };

  const submitRating = () => {
    if (rating > 0) {
      alert(`Thank you for your ${rating}-star rating!`);
      setShowRating(false);
      setOrderStatus('completed');
    }
  };

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
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`p-2 rounded-full transition-colors ${
                  notificationsEnabled ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'
                }`}
              >
                {notificationsEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
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
          </div>
          
          <div>
            <h1 className="text-xl font-bold text-slate-900">{currentContent.title}</h1>
            <p className="text-sm text-slate-500">{currentContent.orderNumber} • {currentContent.tableNumber}</p>
          </div>
        </div>
      </header>

      {/* Order Status Alert */}
      {orderStatus === 'ready' && (
        <div className="mx-4 mt-4 bg-orange-50 border-l-4 border-orange-500 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-orange-600" />
            <div>
              <p className="font-semibold text-orange-800">{currentContent.orderReady}</p>
              <p className="text-sm text-orange-700">Please collect from the counter</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="p-4 space-y-6">
        {/* Status Progress */}
        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-slate-900">{currentContent.orderTimeline}</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(orderStatus)}`}>
              {statusSteps.find(step => step.id === orderStatus)?.label}
            </span>
          </div>

          <div className="space-y-4">
            {statusSteps.map((step, index) => {
              const isCompleted = index <= getCurrentStepIndex();
              const isCurrent = index === getCurrentStepIndex();
              
              return (
                <div key={step.id} className="flex items-center space-x-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted 
                      ? 'bg-green-100 border-2 border-green-500' 
                      : 'bg-slate-100 border-2 border-slate-300'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${
                        isCompleted ? 'text-slate-900' : 'text-slate-500'
                      }`}>
                        {step.label}
                      </span>
                      {step.time && (
                        <span className="text-sm text-slate-500">{step.time}</span>
                      )}
                    </div>
                    
                    {isCurrent && orderStatus === 'preparing' && (
                      <div className="mt-1">
                        <div className="flex items-center space-x-2 text-sm text-blue-600">
                          <Clock className="w-4 h-4" />
                          <span>
                            {Math.ceil(estimatedTime)} {currentContent.minutesLeft}
                          </span>
                        </div>
                        <div className="mt-2 w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${Math.max(10, (12 - estimatedTime) / 12 * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-xl p-4">
          <h2 className="font-semibold text-slate-900 mb-4">{currentContent.orderItems}</h2>
          <div className="space-y-3">
            {orderData.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-slate-900">
                      {item.name[selectedLanguage]} × {item.quantity}
                    </span>
                    {getStatusIcon(item.status)}
                  </div>
                  {item.specialNotes && (
                    <p className="text-xs text-orange-600 mt-1">
                      Note: {item.specialNotes}
                    </p>
                  )}
                </div>
                <span className="font-semibold text-slate-900">
                  {currencySymbol}{item.price[currencyCode].toLocaleString()}{selectedLanguage === 'ko' ? '원' : ''}
                </span>
              </div>
            ))}
          </div>
          
          <div className="border-t mt-4 pt-4 flex justify-between items-center">
            <span className="font-semibold text-slate-900">{currentContent.orderTotal}</span>
            <span className="text-lg font-bold text-slate-900">
              {currencySymbol}{orderData.total[currencyCode].toLocaleString()}{selectedLanguage === 'ko' ? '원' : ''}
            </span>
          </div>
        </div>

        {/* Special Requests */}
        {orderData.specialRequests && (
          <div className="bg-blue-50 rounded-xl p-4">
            <h3 className="font-semibold text-blue-900 mb-2">{currentContent.specialRequests}</h3>
            <p className="text-blue-800 mb-2">"{orderData.specialRequests}"</p>
            <div className="flex items-center space-x-1 text-sm text-blue-600">
              <CheckCircle className="w-4 h-4" />
              <span>{currentContent.kitchenNotes}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center space-x-2 bg-white border border-slate-200 rounded-xl py-3 hover:bg-slate-50 transition-colors">
            <Phone className="w-4 h-4 text-slate-600" />
            <span className="font-medium text-slate-700">{currentContent.callStaff}</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 bg-white border border-slate-200 rounded-xl py-3 hover:bg-slate-50 transition-colors">
            <MessageSquare className="w-4 h-4 text-slate-600" />
            <span className="font-medium text-slate-700">{currentContent.sendMessage}</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 bg-white border border-slate-200 rounded-xl py-3 hover:bg-slate-50 transition-colors">
            <Receipt className="w-4 h-4 text-slate-600" />
            <span className="font-medium text-slate-700">{currentContent.viewReceipt}</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 bg-white border border-slate-200 rounded-xl py-3 hover:bg-slate-50 transition-colors">
            <Share className="w-4 h-4 text-slate-600" />
            <span className="font-medium text-slate-700">{currentContent.shareOrder}</span>
          </button>
        </div>

        {/* Rating Modal */}
        {showRating && (
          <div className="bg-white rounded-xl p-6 border-2 border-yellow-200">
            <h3 className="font-semibold text-slate-900 mb-4">{currentContent.rateExperience}</h3>
            <div className="flex justify-center space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(star)}
                  className={`p-1 transition-colors ${
                    star <= rating ? 'text-yellow-400' : 'text-slate-300'
                  }`}
                >
                  <Star className={`w-8 h-8 ${star <= rating ? 'fill-current' : ''}`} />
                </button>
              ))}
            </div>
            <button
              onClick={submitRating}
              disabled={rating === 0}
              className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentContent.submitRating}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default QOOrderStatus;