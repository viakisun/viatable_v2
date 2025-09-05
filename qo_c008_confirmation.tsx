import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, QrCode, Star, Phone, MessageSquare, Receipt, Share, Home, RotateCcw, Calendar, MapPin, CreditCard, Mail } from 'lucide-react';

const QOOrderConfirmation = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showQRCode, setShowQRCode] = useState(false);
  const [estimatedReadyTime, setEstimatedReadyTime] = useState(new Date(Date.now() + 15 * 60000)); // 15 minutes from now

  const content = {
    en: {
      title: "Order Confirmed!",
      thankYou: "Thank you for your order",
      orderNumber: "Order Number",
      confirmation: "Your order has been confirmed and sent to the kitchen",
      estimatedTime: "Estimated ready time",
      minutes: "minutes",
      trackOrder: "Track Your Order",
      qrTitle: "Order Tracking QR Code",
      qrDescription: "Scan this QR code anytime to check your order status",
      qrSavePrompt: "Save this QR code or take a screenshot",
      orderSummary: "Order Summary",
      tableNumber: "Table Number",
      serviceType: "Service Type",
      dineIn: "Dine In",
      takeaway: "Takeaway",
      paymentMethod: "Payment Method",
      total: "Total Paid",
      specialRequests: "Special Requests",
      whatNext: "What's Next?",
      step1: "Your order is being prepared by our kitchen team",
      step2: "You'll receive notifications about your order progress",
      step3: "Pick up your order when ready or wait at your table",
      quickActions: "Quick Actions",
      viewStatus: "View Order Status",
      callStaff: "Call Staff",
      sendMessage: "Send Message",
      viewReceipt: "View Receipt",
      shareOrder: "Share Order",
      newOrder: "New Order",
      backToMenu: "Back to Menu",
      orderAgain: "Order Again",
      bookTable: "Book Table",
      contactInfo: "Contact Information",
      phone: "Phone",
      email: "Email",
      address: "Address",
      openHours: "Opening Hours",
      currency: "AUD",
      receiptSent: "Receipt sent to",
      loyaltyPoints: "Loyalty Points Earned",
      points: "points",
      nextReward: "Next reward at"
    },
    ko: {
      title: "주문 완료!",
      thankYou: "주문해 주셔서 감사합니다",
      orderNumber: "주문번호",
      confirmation: "주문이 확인되어 주방에 전달되었습니다",
      estimatedTime: "예상 완성 시간",
      minutes: "분",
      trackOrder: "주문 추적하기",
      qrTitle: "주문 추적 QR 코드",
      qrDescription: "언제든지 이 QR 코드를 스캔하여 주문 상태를 확인하세요",
      qrSavePrompt: "이 QR 코드를 저장하거나 스크린샷을 찍어두세요",
      orderSummary: "주문 요약",
      tableNumber: "테이블 번호",
      serviceType: "서비스 유형",
      dineIn: "매장 식사",
      takeaway: "포장 주문",
      paymentMethod: "결제 방법",
      total: "총 결제금액",
      specialRequests: "특별 요청사항",
      whatNext: "다음 단계",
      step1: "주방팀이 고객님의 주문을 준비하고 있습니다",
      step2: "주문 진행 상황에 대한 알림을 받으실 수 있습니다",
      step3: "준비가 완료되면 픽업하시거나 테이블에서 기다려 주세요",
      quickActions: "빠른 액션",
      viewStatus: "주문 상태 보기",
      callStaff: "직원 호출",
      sendMessage: "메시지 보내기",
      viewReceipt: "영수증 보기",
      shareOrder: "주문 공유",
      newOrder: "새 주문",
      backToMenu: "메뉴로",
      orderAgain: "재주문",
      bookTable: "테이블 예약",
      contactInfo: "연락처 정보",
      phone: "전화번호",
      email: "이메일",
      address: "주소",
      openHours: "운영시간",
      currency: "원",
      receiptSent: "영수증 발송",
      loyaltyPoints: "적립 포인트",
      points: "포인트",
      nextReward: "다음 리워드"
    }
  };

  const orderData = {
    orderNumber: "2024-001",
    tableNumber: "12",
    serviceType: "dine-in",
    paymentMethod: "Credit Card ****1234",
    customerEmail: "john@example.com",
    items: [
      { 
        name: { en: 'Avocado Toast Supreme', ko: '슈프림 아보카도 토스트' }, 
        quantity: 2, 
        price: { AUD: 45.00, KRW: 65000 }
      },
      { 
        name: { en: 'Oat Milk Latte', ko: '오트밀크 라떼' }, 
        quantity: 1, 
        price: { AUD: 7.20, KRW: 10500 }
      },
      { 
        name: { en: 'Pancake Stack', ko: '팬케이크 스택' }, 
        quantity: 1, 
        price: { AUD: 18.80, KRW: 27000 }
      }
    ],
    total: { AUD: 74.55, KRW: 107625 },
    specialRequests: "No nuts, extra napkins please",
    loyaltyPoints: 75,
    nextRewardAt: 500,
    placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  const restaurantInfo = {
    name: "The Bistro",
    phone: "+61 2 9876 5432",
    email: "hello@thebistro.com.au",
    address: "123 Collins Street, Melbourne VIC 3000",
    hours: "7:00 AM - 10:00 PM",
    website: "www.thebistro.com.au"
  };

  const currentContent = content[selectedLanguage];
  const currencySymbol = selectedLanguage === 'ko' ? '' : '$';
  const currencyCode = selectedLanguage === 'ko' ? 'KRW' : 'AUD';

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getTimeRemaining = () => {
    const now = new Date();
    const diff = estimatedReadyTime.getTime() - now.getTime();
    const minutes = Math.max(0, Math.ceil(diff / (1000 * 60)));
    return minutes;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString(selectedLanguage === 'ko' ? 'ko-KR' : 'en-AU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Success Header */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white">
        <div className="p-6 text-center">
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12" />
          </div>
          <h1 className="text-2xl font-bold mb-2">{currentContent.title}</h1>
          <p className="text-green-100">{currentContent.thankYou}</p>
          
          {/* Language Toggle */}
          <div className="flex justify-center mt-4">
            <div className="flex bg-white bg-opacity-20 rounded-full p-1">
              <button
                onClick={() => setSelectedLanguage('en')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedLanguage === 'en' ? 'bg-white text-green-600 shadow-sm' : 'text-green-100'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setSelectedLanguage('ko')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedLanguage === 'ko' ? 'bg-white text-green-600 shadow-sm' : 'text-green-100'
                }`}
              >
                한국어
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Order Info Card */}
      <div className="p-4 -mt-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-center mb-6">
            <div className="text-sm text-slate-500 mb-1">{currentContent.orderNumber}</div>
            <div className="text-3xl font-bold text-slate-900">#{orderData.orderNumber}</div>
            <p className="text-slate-600 mt-2">{currentContent.confirmation}</p>
          </div>

          {/* Estimated Time */}
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-800">{currentContent.estimatedTime}</span>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-800">{formatTime(estimatedReadyTime)}</div>
              <div className="text-sm text-blue-600">
                {getTimeRemaining()} {currentContent.minutes} from now
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="text-center mb-6">
            <button
              onClick={() => setShowQRCode(!showQRCode)}
              className="bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 mx-auto hover:bg-slate-800 transition-colors"
            >
              <QrCode className="w-5 h-5" />
              <span>{currentContent.trackOrder}</span>
            </button>
            
            {showQRCode && (
              <div className="mt-4 bg-slate-50 rounded-xl p-6">
                <div className="w-32 h-32 bg-white border-2 border-slate-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-20 h-20 text-slate-400" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{currentContent.qrTitle}</h3>
                <p className="text-sm text-slate-600 mb-2">{currentContent.qrDescription}</p>
                <p className="text-xs text-slate-500">{currentContent.qrSavePrompt}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-4 space-y-6">
        {/* Order Summary */}
        <div className="bg-white rounded-xl p-4">
          <h2 className="font-semibold text-slate-900 mb-4">{currentContent.orderSummary}</h2>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">{currentContent.tableNumber}</span>
              <span className="font-medium">#{orderData.tableNumber}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">{currentContent.serviceType}</span>
              <span className="font-medium">{currentContent.dineIn}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">{currentContent.paymentMethod}</span>
              <span className="font-medium">{orderData.paymentMethod}</span>
            </div>
          </div>

          <div className="border-t pt-4 space-y-2">
            {orderData.items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-slate-700">
                  {item.name[selectedLanguage]} × {item.quantity}
                </span>
                <span className="font-medium">
                  {currencySymbol}{item.price[currencyCode].toLocaleString()}{selectedLanguage === 'ko' ? '원' : ''}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t pt-3 mt-3">
            <div className="flex justify-between font-bold text-lg">
              <span>{currentContent.total}</span>
              <span className="text-green-600">
                {currencySymbol}{orderData.total[currencyCode].toLocaleString()}{selectedLanguage === 'ko' ? '원' : ''}
              </span>
            </div>
          </div>

          {orderData.specialRequests && (
            <div className="mt-4 p-3 bg-orange-50 rounded-lg">
              <h4 className="font-medium text-orange-800 mb-1">{currentContent.specialRequests}</h4>
              <p className="text-sm text-orange-700">"{orderData.specialRequests}"</p>
            </div>
          )}
        </div>

        {/* Loyalty Points */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">{currentContent.loyaltyPoints}</h3>
              <p className="text-lg font-bold">+{orderData.loyaltyPoints} {currentContent.points}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-purple-100">{currentContent.nextReward}</p>
              <p className="font-semibold">{orderData.nextRewardAt} {currentContent.points}</p>
            </div>
          </div>
          <div className="mt-3 bg-white bg-opacity-20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-1000" 
              style={{ width: `${(orderData.loyaltyPoints / orderData.nextRewardAt) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-white rounded-xl p-4">
          <h2 className="font-semibold text-slate-900 mb-4">{currentContent.whatNext}</h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-blue-600">1</span>
              </div>
              <p className="text-slate-700">{currentContent.step1}</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-blue-600">2</span>
              </div>
              <p className="text-slate-700">{currentContent.step2}</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-blue-600">3</span>
              </div>
              <p className="text-slate-700">{currentContent.step3}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-4">
          <h2 className="font-semibold text-slate-900 mb-4">{currentContent.quickActions}</h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button className="flex items-center justify-center space-x-2 bg-blue-500 text-white rounded-xl py-3 hover:bg-blue-600 transition-colors">
              <Clock className="w-4 h-4" />
              <span className="font-medium text-sm">{currentContent.viewStatus}</span>
            </button>
            
            <button className="flex items-center justify-center space-x-2 bg-slate-100 text-slate-700 rounded-xl py-3 hover:bg-slate-200 transition-colors">
              <Phone className="w-4 h-4" />
              <span className="font-medium text-sm">{currentContent.callStaff}</span>
            </button>
            
            <button className="flex items-center justify-center space-x-2 bg-slate-100 text-slate-700 rounded-xl py-3 hover:bg-slate-200 transition-colors">
              <Receipt className="w-4 h-4" />
              <span className="font-medium text-sm">{currentContent.viewReceipt}</span>
            </button>
            
            <button className="flex items-center justify-center space-x-2 bg-slate-100 text-slate-700 rounded-xl py-3 hover:bg-slate-200 transition-colors">
              <Share className="w-4 h-4" />
              <span className="font-medium text-sm">{currentContent.shareOrder}</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <button className="flex items-center justify-center space-x-2 bg-slate-900 text-white rounded-xl py-3 hover:bg-slate-800 transition-colors">
              <RotateCcw className="w-4 h-4" />
              <span className="font-medium">{currentContent.orderAgain}</span>
            </button>
            
            <button className="flex items-center justify-center space-x-2 bg-white border border-slate-200 text-slate-700 rounded-xl py-3 hover:bg-slate-50 transition-colors">
              <Home className="w-4 h-4" />
              <span className="font-medium">{currentContent.backToMenu}</span>
            </button>
          </div>
        </div>

        {/* Restaurant Contact Info */}
        <div className="bg-white rounded-xl p-4">
          <h2 className="font-semibold text-slate-900 mb-4">{currentContent.contactInfo}</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-slate-400" />
              <div>
                <span className="text-slate-600">{currentContent.phone}: </span>
                <a href={`tel:${restaurantInfo.phone}`} className="font-medium text-blue-600 hover:underline">
                  {restaurantInfo.phone}
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-slate-400" />
              <div>
                <span className="text-slate-600">{currentContent.email}: </span>
                <a href={`mailto:${restaurantInfo.email}`} className="font-medium text-blue-600 hover:underline">
                  {restaurantInfo.email}
                </a>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
              <div>
                <span className="text-slate-600">{currentContent.address}: </span>
                <span className="font-medium">{restaurantInfo.address}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Clock className="w-4 h-4 text-slate-400" />
              <div>
                <span className="text-slate-600">{currentContent.openHours}: </span>
                <span className="font-medium">{restaurantInfo.hours}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t text-center">
            <p className="text-xs text-slate-500 mb-2">
              {currentContent.receiptSent}: {orderData.customerEmail}
            </p>
            <p className="text-xs text-slate-400">
              Order placed at {orderData.placedAt}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QOOrderConfirmation;