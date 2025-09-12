import { useState } from 'react';
import { 
  CheckCircle, ChefHat, Truck, Utensils,
  ArrowLeft, RefreshCw, Phone, Share2, Download, Star
} from 'lucide-react';
import { 
  Button, 
  Input, 
  Card, 
  Badge, 
  Modal
} from '../design-system';
import { cn } from '../utils/cn';

const QOOrderStatusEnhanced = () => {
  const [currentStatus] = useState('preparing');
  const [estimatedTime] = useState(12);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ko'>('en');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState({ rating: 0, comment: '' });

  const orderData = {
    id: 'VT-2024-001',
    tableNumber: 12,
    restaurantName: { en: 'The Bistro', ko: '더 비스트로' },
    orderTime: '2024-01-15 14:30',
    estimatedReadyTime: '2024-01-15 14:42',
    items: [
      {
        id: 1,
        name: { en: 'Avocado Toast Supreme', ko: '슈프림 아보카도 토스트' },
        quantity: 2,
        price: { AUD: 18.50, KRW: 26500 },
        image: '🥑',
        status: 'preparing',
        estimatedTime: 8
      },
      {
        id: 2,
        name: { en: 'Oat Milk Latte', ko: '오트밀크 라떼' },
        quantity: 1,
        price: { AUD: 5.20, KRW: 7500 },
        image: '🥛',
        status: 'ready',
        estimatedTime: 3
      },
      {
        id: 3,
        name: { en: 'Chocolate Lava Cake', ko: '초콜릿 라바 케이크' },
        quantity: 1,
        price: { AUD: 12.00, KRW: 17200 },
        image: '🍫',
        status: 'preparing',
        estimatedTime: 6
      }
    ],
    total: { AUD: 56.10, KRW: 80420 },
    paymentMethod: { en: 'Credit Card', ko: '신용카드' },
    specialInstructions: 'No salt on the avocado toast'
  };

  const statusSteps = [
    {
      id: 'received',
      name: { en: 'Order Received', ko: '주문 접수' },
      description: { en: 'Your order has been received and confirmed', ko: '주문이 접수되고 확인되었습니다' },
      icon: CheckCircle,
      completed: true,
      time: '14:30'
    },
    {
      id: 'preparing',
      name: { en: 'Preparing', ko: '조리 중' },
      description: { en: 'Our chefs are preparing your delicious meal', ko: '셰프들이 맛있는 음식을 준비하고 있습니다' },
      icon: ChefHat,
      completed: currentStatus === 'preparing' || currentStatus === 'ready' || currentStatus === 'served',
      time: '14:32',
      current: currentStatus === 'preparing'
    },
    {
      id: 'ready',
      name: { en: 'Ready for Pickup', ko: '픽업 준비 완료' },
      description: { en: 'Your order is ready for pickup', ko: '주문이 픽업 준비가 완료되었습니다' },
      icon: Utensils,
      completed: currentStatus === 'ready' || currentStatus === 'served',
      time: '14:42',
      current: currentStatus === 'ready'
    },
    {
      id: 'served',
      name: { en: 'Served', ko: '서빙 완료' },
      description: { en: 'Your order has been served to your table', ko: '주문이 테이블에 서빙되었습니다' },
      icon: Truck,
      completed: currentStatus === 'served',
      time: '14:45',
      current: currentStatus === 'served'
    }
  ];

  const currentContent = {
    title: language === 'ko' ? '주문 상태' : 'Order Status',
    back: language === 'ko' ? '뒤로' : 'Back',
    orderNumber: language === 'ko' ? '주문번호' : 'Order Number',
    tableNumber: language === 'ko' ? '테이블 번호' : 'Table Number',
    estimatedTime: language === 'ko' ? '예상 시간' : 'Estimated Time',
    minutes: language === 'ko' ? '분' : 'min',
    orderDetails: language === 'ko' ? '주문 상세' : 'Order Details',
    total: language === 'ko' ? '총계' : 'Total',
    paymentMethod: language === 'ko' ? '결제 방법' : 'Payment Method',
    specialInstructions: language === 'ko' ? '특별 요청사항' : 'Special Instructions',
    refresh: language === 'ko' ? '새로고침' : 'Refresh',
    refreshing: language === 'ko' ? '새로고침 중...' : 'Refreshing...',
    contactRestaurant: language === 'ko' ? '레스토랑 연락' : 'Contact Restaurant',
    shareOrder: language === 'ko' ? '주문 공유' : 'Share Order',
    downloadReceipt: language === 'ko' ? '영수증 다운로드' : 'Download Receipt',
    leaveFeedback: language === 'ko' ? '피드백 남기기' : 'Leave Feedback',
    orderComplete: language === 'ko' ? '주문 완료' : 'Order Complete',
    thankYou: language === 'ko' ? '주문해주셔서 감사합니다!' : 'Thank you for your order!',
    backToMenu: language === 'ko' ? '메뉴로 돌아가기' : 'Back to Menu',
    orderItems: language === 'ko' ? '주문 항목' : 'Order Items',
    status: language === 'ko' ? '상태' : 'Status',
    preparing: language === 'ko' ? '조리 중' : 'Preparing',
    ready: language === 'ko' ? '준비 완료' : 'Ready',
    completed: language === 'ko' ? '완료' : 'Completed',
    feedback: language === 'ko' ? '피드백' : 'Feedback',
    rating: language === 'ko' ? '평점' : 'Rating',
    comment: language === 'ko' ? '댓글' : 'Comment',
    submitFeedback: language === 'ko' ? '피드백 제출' : 'Submit Feedback',
    close: language === 'ko' ? '닫기' : 'Close'
  };

  const currencyCode = language === 'ko' ? 'KRW' : 'AUD';

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
    console.log('Order status refreshed');
  };

  const handleFeedbackSubmit = () => {
    console.log('Feedback submitted:', feedback);
    setShowFeedbackModal(false);
    setFeedback({ rating: 0, comment: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing': return 'text-yellow-600 bg-yellow-100';
      case 'ready': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'preparing': return currentContent.preparing;
      case 'ready': return currentContent.ready;
      case 'completed': return currentContent.completed;
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.history.back()}
                className="w-8 h-8"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-gray-900">{currentContent.title}</h1>
                <p className="text-xs text-gray-500">{orderData.restaurantName[language]}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRefresh}
                loading={isRefreshing}
                className="w-8 h-8"
              >
                <RefreshCw className={cn('w-4 h-4', isRefreshing && 'animate-spin')} />
              </Button>
              <div className="flex bg-gray-100 rounded-md p-0.5">
                <button
                  onClick={() => setLanguage('en')}
                  className={cn(
                    'px-2 py-1 text-xs font-medium rounded-sm transition-all',
                    language === 'en' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'
                  )}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('ko')}
                  className={cn(
                    'px-2 py-1 text-xs font-medium rounded-sm transition-all',
                    language === 'ko' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'
                  )}
                >
                  KO
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Content */}
      <div className="p-4 space-y-4">
        {/* Order Info */}
        <Card className="p-4">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ChefHat className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">{currentContent.orderNumber}</h2>
            <p className="text-2xl font-mono font-bold text-primary-600">{orderData.id}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-sm text-gray-600">{currentContent.tableNumber}</div>
              <div className="text-lg font-bold text-gray-900">{orderData.tableNumber}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">{currentContent.estimatedTime}</div>
              <div className="text-lg font-bold text-gray-900">{estimatedTime}{currentContent.minutes}</div>
            </div>
          </div>
        </Card>

        {/* Status Progress */}
        <Card className="p-4">
          <h3 className="font-medium text-gray-900 mb-4">{currentContent.status}</h3>
          <div className="space-y-4">
            {statusSteps.map((step) => (
              <div key={step.id} className="flex items-start space-x-3">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                  step.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
                )}>
                  {step.completed ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <step.icon className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className={cn(
                      'font-medium text-sm',
                      step.completed ? 'text-gray-900' : 'text-gray-600'
                    )}>
                      {step.name[language]}
                    </h4>
                    <span className="text-xs text-gray-500">{step.time}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{step.description[language]}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Order Items */}
        <Card className="p-4">
          <h3 className="font-medium text-gray-900 mb-4">{currentContent.orderItems}</h3>
          <div className="space-y-3">
            {orderData.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                  {item.image}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900 text-sm">{item.name[language]}</h4>
                    <Badge 
                      variant="secondary" 
                      size="sm"
                      className={cn('text-xs', getStatusColor(item.status))}
                    >
                      {getStatusText(item.status)}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-600">Qty: {item.quantity}</span>
                    <span className="text-sm font-medium text-gray-900">
                      {currencyCode === 'KRW' ? `₩${(item.price.KRW * item.quantity).toLocaleString()}` : `$${(item.price.AUD * item.quantity).toFixed(2)}`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Order Summary */}
        <Card className="p-4">
          <h3 className="font-medium text-gray-900 mb-3">{currentContent.orderDetails}</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{currentContent.total}</span>
              <span className="font-medium text-gray-900">
                {currencyCode === 'KRW' ? `₩${orderData.total.KRW.toLocaleString()}` : `$${orderData.total.AUD}`}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{currentContent.paymentMethod}</span>
              <span className="text-gray-900">{orderData.paymentMethod[language]}</span>
            </div>
            {orderData.specialInstructions && (
              <div className="pt-2 border-t border-gray-200">
                <div className="text-sm text-gray-600">{currentContent.specialInstructions}</div>
                <div className="text-sm text-gray-900 mt-1">{orderData.specialInstructions}</div>
              </div>
            )}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Phone className="w-4 h-4" />}
            fullWidth
          >
            {currentContent.contactRestaurant}
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Share2 className="w-4 h-4" />}
            fullWidth
          >
            {currentContent.shareOrder}
          </Button>
        </div>

        <Button
          variant="outline"
          size="sm"
          leftIcon={<Download className="w-4 h-4" />}
          fullWidth
        >
          {currentContent.downloadReceipt}
        </Button>

        {currentStatus === 'served' && (
          <Button
            variant="primary"
            size="lg"
            leftIcon={<Star className="w-4 h-4" />}
            fullWidth
            onClick={() => setShowFeedbackModal(true)}
          >
            {currentContent.leaveFeedback}
          </Button>
        )}

        {/* Success Message */}
        {currentStatus === 'served' && (
          <Card className="p-4 bg-green-50 border-green-200">
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-green-800 mb-2">{currentContent.orderComplete}</h3>
              <p className="text-green-700 text-sm mb-4">{currentContent.thankYou}</p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => window.location.href = '/menu'}
              >
                {currentContent.backToMenu}
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Feedback Modal */}
      <Modal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        title={currentContent.feedback}
        size="sm"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {currentContent.rating}
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setFeedback(prev => ({ ...prev, rating }))}
                  className="p-1"
                >
                  <Star
                    className={cn(
                      'w-6 h-6',
                      rating <= feedback.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {currentContent.comment}
            </label>
            <Input
              value={feedback.comment}
              onChange={(e) => setFeedback(prev => ({ ...prev, comment: e.target.value }))}
              placeholder={language === 'ko' ? '리뷰를 작성해주세요...' : 'Write your review...'}
              rows={3}
              size="sm"
            />
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFeedbackModal(false)}
              className="flex-1"
            >
              {currentContent.close}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleFeedbackSubmit}
              className="flex-1"
            >
              {currentContent.submitFeedback}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default QOOrderStatusEnhanced;