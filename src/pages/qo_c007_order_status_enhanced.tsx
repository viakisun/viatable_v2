import { useState } from 'react';
import { 
  Clock, CheckCircle, ChefHat, Truck, Utensils,
  ArrowLeft, RefreshCw, Phone, Share2, Download, Star
} from 'lucide-react';
import { 
  Button, 
  Input, 
  Card, 
  Badge, 
  Modal,
  AnimatedContainer, 
  StaggeredContainer
} from '../design-system';
import { cn } from '../utils/cn';

const QOOrderStatusEnhanced = () => {
  const [currentStatus, setCurrentStatus] = useState('preparing');
  const [estimatedTime, setEstimatedTime] = useState(12);
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
    orderNumber: language === 'ko' ? '주문 번호' : 'Order Number',
    tableNumber: language === 'ko' ? '테이블 번호' : 'Table Number',
    orderTime: language === 'ko' ? '주문 시간' : 'Order Time',
    estimatedReady: language === 'ko' ? '예상 완료 시간' : 'Estimated Ready Time',
    refresh: language === 'ko' ? '새로고침' : 'Refresh',
    orderDetails: language === 'ko' ? '주문 상세' : 'Order Details',
    paymentMethod: language === 'ko' ? '결제 방법' : 'Payment Method',
    specialInstructions: language === 'ko' ? '특별 지시사항' : 'Special Instructions',
    total: language === 'ko' ? '총계' : 'Total',
    estimatedTime: language === 'ko' ? '예상 조리시간' : 'Estimated Prep Time',
    minutes: language === 'ko' ? '분' : 'min',
    status: language === 'ko' ? '상태' : 'Status',
    preparing: language === 'ko' ? '조리 중' : 'Preparing',
    ready: language === 'ko' ? '준비 완료' : 'Ready',
    served: language === 'ko' ? '서빙 완료' : 'Served',
    contactRestaurant: language === 'ko' ? '레스토랑 연락' : 'Contact Restaurant',
    giveFeedback: language === 'ko' ? '피드백 주기' : 'Give Feedback',
    shareOrder: language === 'ko' ? '주문 공유' : 'Share Order',
    downloadReceipt: language === 'ko' ? '영수증 다운로드' : 'Download Receipt',
    orderTracking: language === 'ko' ? '주문 추적' : 'Order Tracking',
    currentStatus: language === 'ko' ? '현재 상태' : 'Current Status',
    nextUpdate: language === 'ko' ? '다음 업데이트' : 'Next Update',
    inMinutes: language === 'ko' ? '분 후' : 'minutes',
    liveUpdates: language === 'ko' ? '실시간 업데이트' : 'Live Updates',
    notifications: language === 'ko' ? '알림' : 'Notifications',
    feedbackTitle: language === 'ko' ? '주문 피드백' : 'Order Feedback',
    rating: language === 'ko' ? '평점' : 'Rating',
    comment: language === 'ko' ? '댓글' : 'Comment',
    submitFeedback: language === 'ko' ? '피드백 제출' : 'Submit Feedback',
    thankYou: language === 'ko' ? '피드백을 주셔서 감사합니다!' : 'Thank you for your feedback!',
    backToMenu: language === 'ko' ? '메뉴로 돌아가기' : 'Back to Menu'
  };

  const currencyCode = language === 'ko' ? 'KRW' : 'AUD';

  const formatPrice = (amount: number) => {
    if (currencyCode === 'KRW') {
      return `${amount.toLocaleString()}원`;
    }
    return `$${amount.toFixed(2)}`;
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
    
    // Simulate status progression
    if (currentStatus === 'preparing') {
      setCurrentStatus('ready');
      setEstimatedTime(0);
    } else if (currentStatus === 'ready') {
      setCurrentStatus('served');
    }
  };

  const handleFeedbackSubmit = () => {
    console.log('Feedback submitted:', feedback);
    setShowFeedbackModal(false);
    setFeedback({ rating: 0, comment: '' });
  };


  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'preparing': return ChefHat;
      case 'ready': return CheckCircle;
      case 'served': return Truck;
      default: return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-neutral-900">{currentContent.title}</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                loading={isRefreshing}
                leftIcon={<RefreshCw className="w-4 h-4" />}
              >
                {currentContent.refresh}
              </Button>
              
              <div className="flex bg-neutral-100 rounded-lg p-1">
                <button
                  onClick={() => setLanguage('en')}
                  className={cn(
                    'px-3 py-1 text-sm font-medium rounded-md transition-all',
                    language === 'en' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-600'
                  )}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('ko')}
                  className={cn(
                    'px-3 py-1 text-sm font-medium rounded-md transition-all',
                    language === 'ko' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-600'
                  )}
                >
                  KO
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Order Header */}
          <AnimatedContainer animation="slideUp">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-neutral-900">
                    {currentContent.orderNumber}: {orderData.id}
                  </h2>
                  <p className="text-neutral-600">
                    {currentContent.tableNumber} {orderData.tableNumber} • {orderData.restaurantName[language]}
                  </p>
                </div>
                <Badge variant="primary" size="lg">
                  {currentContent[currentStatus as keyof typeof currentContent]}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-neutral-600">{currentContent.orderTime}:</span>
                  <div className="font-medium">{formatTime(orderData.orderTime)}</div>
                </div>
                <div>
                  <span className="text-neutral-600">{currentContent.estimatedReady}:</span>
                  <div className="font-medium">{formatTime(orderData.estimatedReadyTime)}</div>
                </div>
                <div>
                  <span className="text-neutral-600">{currentContent.estimatedTime}:</span>
                  <div className="font-medium">{estimatedTime} {currentContent.minutes}</div>
                </div>
              </div>
            </Card>
          </AnimatedContainer>

          {/* Status Timeline */}
          <AnimatedContainer animation="slideUp" delay={200}>
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-6">
                {currentContent.orderTracking}
              </h3>
              
              <div className="space-y-4">
                {statusSteps.map((step, index) => (
                  <div key={step.id} className="flex items-start space-x-4">
                    <div className={cn(
                      'flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all',
                      step.completed
                        ? 'bg-primary-500 border-primary-500 text-white'
                        : step.current
                        ? 'bg-warning-500 border-warning-500 text-white animate-pulse'
                        : 'bg-white border-neutral-300 text-neutral-400'
                    )}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={cn(
                          'font-medium',
                          step.completed || step.current ? 'text-neutral-900' : 'text-neutral-400'
                        )}>
                          {step.name[language]}
                        </h4>
                        <span className="text-sm text-neutral-500">{step.time}</span>
                      </div>
                      <p className={cn(
                        'text-sm',
                        step.completed || step.current ? 'text-neutral-600' : 'text-neutral-400'
                      )}>
                        {step.description[language]}
                      </p>
                    </div>
                    
                    {index < statusSteps.length - 1 && (
                      <div className={cn(
                        'w-0.5 h-8 ml-6 transition-all',
                        step.completed ? 'bg-primary-500' : 'bg-neutral-300'
                      )} />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </AnimatedContainer>

          {/* Order Items */}
          <AnimatedContainer animation="slideUp" delay={300}>
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-6">
                {currentContent.orderDetails}
              </h3>
              
              <div className="space-y-4">
                {orderData.items.map((item) => {
                  const StatusIcon = getStatusIcon(item.status);
                  return (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-neutral-50 rounded-lg">
                      <div className="w-16 h-16 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl flex items-center justify-center text-2xl">
                        {item.image}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-neutral-900">
                            {item.name[language]}
                          </h4>
                          <Badge 
                            variant={item.status === 'ready' ? 'success' : item.status === 'preparing' ? 'warning' : 'primary'}
                            size="sm"
                          >
                            {currentContent[item.status as keyof typeof currentContent]}
                          </Badge>
                        </div>
                        <p className="text-sm text-neutral-600">
                          {language === 'ko' ? '수량' : 'Quantity'}: {item.quantity} • {formatPrice(item.price[currencyCode])}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <StatusIcon className={cn(
                          'w-5 h-5',
                          item.status === 'ready' ? 'text-success-500' : 
                          item.status === 'preparing' ? 'text-warning-500' : 'text-primary-500'
                        )} />
                        {item.status === 'preparing' && (
                          <span className="text-sm text-neutral-600">
                            {item.estimatedTime} {currentContent.minutes}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </AnimatedContainer>

          {/* Order Summary */}
          <AnimatedContainer animation="slideUp" delay={400}>
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                {language === 'ko' ? '주문 요약' : 'Order Summary'}
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">{currentContent.paymentMethod}:</span>
                  <span className="font-medium">{orderData.paymentMethod[language]}</span>
                </div>
                
                {orderData.specialInstructions && (
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">{currentContent.specialInstructions}:</span>
                    <span className="font-medium">{orderData.specialInstructions}</span>
                  </div>
                )}
                
                <div className="border-t border-neutral-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-neutral-900">{currentContent.total}:</span>
                    <span className="text-xl font-bold text-neutral-900">
                      {formatPrice(orderData.total[currencyCode])}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </AnimatedContainer>

          {/* Action Buttons */}
          <StaggeredContainer animation="slideUp" staggerDelay={100} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Phone className="w-5 h-5" />}
              fullWidth
            >
              {currentContent.contactRestaurant}
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Star className="w-5 h-5" />}
              onClick={() => setShowFeedbackModal(true)}
              fullWidth
            >
              {currentContent.giveFeedback}
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Share2 className="w-5 h-5" />}
              fullWidth
            >
              {currentContent.shareOrder}
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Download className="w-5 h-5" />}
              fullWidth
            >
              {currentContent.downloadReceipt}
            </Button>
          </StaggeredContainer>

          {/* Live Updates Banner */}
          <AnimatedContainer animation="slideUp" delay={600}>
            <Card className="p-4 bg-primary-50 border-primary-200">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-primary-700">
                  {currentContent.liveUpdates}
                </span>
                <Badge variant="primary" size="sm">
                  {currentContent.notifications}
                </Badge>
              </div>
            </Card>
          </AnimatedContainer>
        </div>
      </div>

      {/* Feedback Modal */}
      <Modal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        title={currentContent.feedbackTitle}
        size="md"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              {currentContent.rating}
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setFeedback(prev => ({ ...prev, rating: star }))}
                  className={cn(
                    'p-2 rounded-lg transition-colors',
                    star <= feedback.rating
                      ? 'text-warning-500 bg-warning-50'
                      : 'text-neutral-300 hover:text-warning-400'
                  )}
                >
                  <Star className={cn('w-6 h-6', star <= feedback.rating && 'fill-current')} />
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {currentContent.comment}
            </label>
            <Input
              placeholder={language === 'ko' ? '주문에 대한 의견을 남겨주세요...' : 'Share your thoughts about the order...'}
              value={feedback.comment}
              onChange={(e) => setFeedback(prev => ({ ...prev, comment: e.target.value }))}
              rows={4}
            />
          </div>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowFeedbackModal(false)}
              fullWidth
            >
              {language === 'ko' ? '취소' : 'Cancel'}
            </Button>
            <Button
              onClick={handleFeedbackSubmit}
              disabled={feedback.rating === 0}
              fullWidth
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
