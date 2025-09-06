import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, QrCode, Star, Phone, MessageSquare, Receipt, Share, Home, RotateCcw, Calendar, MapPin, CreditCard, Mail } from 'lucide-react';
import AppHeader from '../components/AppHeader';

const QOOrderConfirmation = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showQRCode, setShowQRCode] = useState(false);
  const [estimatedReadyTime, setEstimatedReadyTime] = useState(new Date(Date.now() + 15 * 60000));

  const content = {
    en: { title: "Order Confirmed!", thankYou: "Thank you for your order", orderNumber: "Order Number", confirmation: "Your order has been confirmed and sent to the kitchen", estimatedTime: "Estimated ready time", minutes: "minutes", trackOrder: "Track Your Order", qrTitle: "Order Tracking QR Code", qrDescription: "Scan this QR code anytime to check your order status", qrSavePrompt: "Save this QR code or take a screenshot", orderSummary: "Order Summary", tableNumber: "Table Number", serviceType: "Service Type", dineIn: "Dine In", takeaway: "Takeaway", paymentMethod: "Payment Method", total: "Total Paid", specialRequests: "Special Requests", whatNext: "What's Next?", step1: "Your order is being prepared by our kitchen team", step2: "You'll receive notifications about your order progress", step3: "Pick up your order when ready or wait at your table", quickActions: "Quick Actions", viewStatus: "View Order Status", callStaff: "Call Staff", sendMessage: "Send Message", viewReceipt: "View Receipt", shareOrder: "Share Order", newOrder: "New Order", backToMenu: "Back to Menu", orderAgain: "Order Again", bookTable: "Book Table", contactInfo: "Contact Information", phone: "Phone", email: "Email", address: "Address", openHours: "Opening Hours", currency: "AUD", receiptSent: "Receipt sent to", loyaltyPoints: "Loyalty Points Earned", points: "points", nextReward: "Next reward at" },
    ko: { title: "주문 완료!", thankYou: "주문해 주셔서 감사합니다", orderNumber: "주문번호", confirmation: "주문이 확인되어 주방에 전달되었습니다", estimatedTime: "예상 완성 시간", minutes: "분", trackOrder: "주문 추적하기", qrTitle: "주문 추적 QR 코드", qrDescription: "언제든지 이 QR 코드를 스캔하여 주문 상태를 확인하세요", qrSavePrompt: "이 QR 코드를 저장하거나 스크린샷을 찍어두세요", orderSummary: "주문 요약", tableNumber: "테이블 번호", serviceType: "서비스 유형", dineIn: "매장 식사", takeaway: "포장 주문", paymentMethod: "결제 방법", total: "총 결제금액", specialRequests: "특별 요청사항", whatNext: "다음 단계", step1: "주방팀이 고객님의 주문을 준비하고 있습니다", step2: "주문 진행 상황에 대한 알림을 받으실 수 있습니다", step3: "준비가 완료되면 픽업하시거나 테이블에서 기다려 주세요", quickActions: "빠른 액션", viewStatus: "주문 상태 보기", callStaff: "직원 호출", sendMessage: "메시지 보내기", viewReceipt: "영수증 보기", shareOrder: "주문 공유", newOrder: "새 주문", backToMenu: "메뉴로", orderAgain: "재주문", bookTable: "테이블 예약", contactInfo: "연락처 정보", phone: "전화번호", email: "이메일", address: "주소", openHours: "운영시간", currency: "원", receiptSent: "영수증 발송", loyaltyPoints: "적립 포인트", points: "포인트", nextReward: "다음 리워드" }
  };

  const orderData = { orderNumber: "2024-001", tableNumber: "12", serviceType: "dine-in", paymentMethod: "Credit Card ****1234", customerEmail: "john@example.com", items: [ { name: { en: 'Avocado Toast Supreme', ko: '슈프림 아보카도 토스트' }, quantity: 2, price: { AUD: 45.00, KRW: 65000 } }, { name: { en: 'Oat Milk Latte', ko: '오트밀크 라떼' }, quantity: 1, price: { AUD: 7.20, KRW: 10500 } }, { name: { en: 'Pancake Stack', ko: '팬케이크 스택' }, quantity: 1, price: { AUD: 18.80, KRW: 27000 } } ], total: { AUD: 74.55, KRW: 107625 }, specialRequests: "No nuts, extra napkins please", loyaltyPoints: 75, nextRewardAt: 500, placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
  const restaurantInfo = { name: "The Bistro", phone: "+61 2 9876 5432", email: "hello@thebistro.com.au", address: "123 Collins Street, Melbourne VIC 3000", hours: "7:00 AM - 10:00 PM", website: "www.thebistro.com.au" };
  const currentContent = content[selectedLanguage];
  const currencySymbol = selectedLanguage === 'ko' ? '' : '$';
  const currencyCode = selectedLanguage === 'ko' ? 'KRW' : 'AUD';

  const getTimeRemaining = () => { const diff = estimatedReadyTime.getTime() - new Date().getTime(); return Math.max(0, Math.ceil(diff / 60000)); };
  const formatTime = (date) => date.toLocaleTimeString(selectedLanguage === 'ko' ? 'ko-KR' : 'en-AU', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-full bg-slate-50">
      <AppHeader />

      <div className="pt-16">
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="p-6 text-center">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12" />
            </div>
            <h1 className="text-2xl font-bold mb-2">{currentContent.title}</h1>
            <p className="text-green-100">{currentContent.thankYou}</p>
          </div>
        </div>

        <div className="p-4 -mt-16">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center mb-6">
              <div className="text-sm text-slate-500 mb-1">{currentContent.orderNumber}</div>
              <div className="text-3xl font-bold text-slate-900">#{orderData.orderNumber}</div>
              <p className="text-slate-600 mt-2">{currentContent.confirmation}</p>
            </div>
            {/* ... rest of the component JSX is unchanged */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default QOOrderConfirmation;