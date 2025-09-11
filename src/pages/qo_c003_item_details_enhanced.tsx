import { useState } from 'react';
import { 
  Plus, Minus, Heart, Star, Clock, Users, MessageSquare, 
  Leaf, AlertTriangle, ArrowLeft, Share2, Bookmark,
  Camera, ChevronLeft, ChevronRight, Check, Info,
  ShoppingCart
} from 'lucide-react';
import { 
  Button, 
  Input, 
  Card, 
  Badge, 
  Modal,
  AnimatedContainer, 
} from '../design-system';
import { cn } from '../utils/cn';

const QOItemDetailsEnhanced = () => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [specialNotes, setSpecialNotes] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [language] = useState<'en' | 'ko'>('en');

  // Enhanced item data
  const itemData = {
    id: 3,
    name: { en: 'Avocado Toast Supreme', ko: '슈프림 아보카도 토스트' },
    description: { en: 'Our signature avocado toast with perfectly ripe avocados, artisanal sourdough, and premium toppings', ko: '완벽하게 익은 아보카도와 아티산 사워도우, 프리미엄 토핑이 들어간 시그니처 아보카도 토스트' },
    price: { AUD: 18.50, KRW: 26500 },
    originalPrice: { AUD: 22.00, KRW: 31500 },
    prepTime: 12,
    servings: 1,
    rating: 4.9,
    reviewsCount: 203,
    calories: 450,
    tags: ['popular', 'vegetarian', 'healthy', 'signature'],
    allergens: { en: ['Gluten', 'Dairy', 'Eggs'], ko: ['글루텐', '유제품', '달걀'] },
    ingredients: { en: ['Sourdough bread', 'Ripe avocado', 'Poached egg', 'Feta cheese', 'Microgreens', 'Lemon', 'Sea salt', 'Black pepper'], ko: ['사워도우 빵', '익은 아보카도', '수란', '페타치즈', '마이크로그린', '레몬', '바다소금', '후추'] },
    nutrition: {
      calories: 450,
      protein: 18,
      carbs: 35,
      fat: 28,
      fiber: 12,
      sugar: 4
    },
    images: ['🥑', '🍞', '🥚', '🧀', '🌿'],
    options: {
      bread: {
        name: { en: 'Bread Type', ko: '빵 종류' },
        required: true,
        choices: [
          { id: 'sourdough', name: { en: 'Sourdough', ko: '사워도우' }, price: 0 },
          { id: 'wholegrain', name: { en: 'Whole Grain', ko: '통밀빵' }, price: 1.50 },
          { id: 'gluten-free', name: { en: 'Gluten Free', ko: '글루텐프리' }, price: 2.00 }
        ]
      },
      egg: {
        name: { en: 'Egg Style', ko: '계란 스타일' },
        required: true,
        choices: [
          { id: 'poached', name: { en: 'Poached', ko: '수란' }, price: 0 },
          { id: 'fried', name: { en: 'Fried', ko: '프라이' }, price: 0 },
          { id: 'scrambled', name: { en: 'Scrambled', ko: '스크램블' }, price: 0 },
          { id: 'none', name: { en: 'No Egg', ko: '계란 없음' }, price: -2.00 }
        ]
      },
      extras: {
        name: { en: 'Extra Toppings', ko: '추가 토핑' },
        required: false,
        choices: [
          { id: 'bacon', name: { en: 'Crispy Bacon', ko: '바삭한 베이컨' }, price: 3.50 },
          { id: 'salmon', name: { en: 'Smoked Salmon', ko: '훈제 연어' }, price: 5.00 },
          { id: 'cheese', name: { en: 'Extra Cheese', ko: '추가 치즈' }, price: 2.00 },
          { id: 'avocado', name: { en: 'Extra Avocado', ko: '추가 아보카도' }, price: 2.50 }
        ]
      }
    },
    reviews: [
      {
        id: 1,
        name: 'Sarah Kim',
        rating: 5,
        date: '2024-01-15',
        comment: { en: 'Absolutely delicious! The avocado was perfectly ripe and the sourdough was amazing.', ko: '정말 맛있어요! 아보카도가 완벽하게 익었고 사워도우도 훌륭했어요.' },
        helpful: 12
      },
      {
        id: 2,
        name: 'Mike Chen',
        rating: 4,
        date: '2024-01-12',
        comment: { en: 'Great taste but a bit pricey. Worth it for the quality though.', ko: '맛은 좋지만 조금 비싸네요. 품질을 생각하면 그럴 만해요.' },
        helpful: 8
      },
      {
        id: 3,
        name: 'Emma Wilson',
        rating: 5,
        date: '2024-01-10',
        comment: { en: 'My go-to breakfast! Always fresh and beautifully presented.', ko: '제가 자주 먹는 아침식사예요! 항상 신선하고 예쁘게 나와요.' },
        helpful: 15
      }
    ],
    similarItems: [
      { id: 1, name: { en: 'Classic Avocado Toast', ko: '클래식 아보카도 토스트' }, price: { AUD: 14.50, KRW: 20800 }, image: '🥑', rating: 4.7 },
      { id: 2, name: { en: 'Smoked Salmon Toast', ko: '훈제 연어 토스트' }, price: { AUD: 19.50, KRW: 27900 }, image: '🐟', rating: 4.8 },
      { id: 4, name: { en: 'Pancake Stack', ko: '팬케이크 스택' }, price: { AUD: 16.80, KRW: 24000 }, image: '🥞', rating: 4.7 }
    ]
  };

  const currentContent = {
    addToCart: language === 'ko' ? '장바구니 담기' : 'Add to Cart',
    quantity: language === 'ko' ? '수량' : 'Quantity',
    customizations: language === 'ko' ? '커스터마이징' : 'Customizations',
    specialNotes: language === 'ko' ? '특별 요청사항' : 'Special Notes',
    notesPlaceholder: language === 'ko' ? '특별한 요청사항...' : 'Any special requests?',
    ingredients: language === 'ko' ? '재료' : 'Ingredients',
    nutrition: language === 'ko' ? '영양 정보' : 'Nutrition Info',
    allergens: language === 'ko' ? '알레르기 정보' : 'Allergens',
    reviews: language === 'ko' ? '리뷰' : 'Reviews',
    similar: language === 'ko' ? '비슷한 메뉴' : 'Similar Items',
    overview: language === 'ko' ? '개요' : 'Overview',
    required: language === 'ko' ? '필수' : 'Required',
    optional: language === 'ko' ? '선택' : 'Optional',
    back: language === 'ko' ? '뒤로' : 'Back',
    share: language === 'ko' ? '공유' : 'Share',
    save: language === 'ko' ? '저장' : 'Save',
    prepTime: language === 'ko' ? '조리시간' : 'Prep Time',
    servings: language === 'ko' ? '인분' : 'Servings',
    calories: language === 'ko' ? '칼로리' : 'Calories',
    rating: language === 'ko' ? '평점' : 'Rating',
    helpful: language === 'ko' ? '도움됨' : 'Helpful',
  };

  const currencyCode = language === 'ko' ? 'KRW' : 'AUD';

  const formatPrice = (amount: number) => {
    if (currencyCode === 'KRW') {
      return `${amount.toLocaleString()}원`;
    }
    return `$${amount.toFixed(2)}`;
  };

  const calculateTotalPrice = () => {
    let total = itemData.price[currencyCode] * quantity;
    
    // Add option prices
    Object.entries(selectedOptions).forEach(([optionKey, choiceId]) => {
      const option = itemData.options[optionKey as keyof typeof itemData.options];
      if (option) {
        const choice = option.choices.find(c => c.id === choiceId);
        if (choice && choice.price > 0) {
          total += choice.price * quantity;
        }
      }
    });
    
    return total;
  };

  const handleAddToCart = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    console.log('Added to cart:', { item: itemData.id, quantity, options: selectedOptions, notes: specialNotes });
  };

  const handleOptionChange = (optionKey: string, choiceId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionKey]: choiceId
    }));
  };

  const tabs = [
    { id: 'overview', name: currentContent.overview, icon: Info },
    { id: 'ingredients', name: currentContent.ingredients, icon: Leaf },
    { id: 'nutrition', name: currentContent.nutrition, icon: Leaf },
    { id: 'reviews', name: currentContent.reviews, icon: MessageSquare },
  ];

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
              <h1 className="text-xl font-semibold text-neutral-900">
                {itemData.name[language]}
              </h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowImageModal(true)}
              >
                <Camera className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={cn('w-5 h-5', isFavorite && 'fill-current text-red-500')} />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Bookmark className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Images and Info */}
            <div className="space-y-6">
              {/* Image Gallery */}
              <AnimatedContainer animation="slideUp">
                <Card className="overflow-hidden">
                  <div className="relative aspect-square bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center text-8xl">
                    {itemData.images[currentImageIndex]}
                    
                    {/* Image Navigation */}
                    {itemData.images.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentImageIndex((prev) => 
                            prev === 0 ? itemData.images.length - 1 : prev - 1
                          )}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setCurrentImageIndex((prev) => 
                            prev === itemData.images.length - 1 ? 0 : prev + 1
                          )}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    
                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {itemData.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={cn(
                            'w-2 h-2 rounded-full transition-all',
                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </Card>
              </AnimatedContainer>

              {/* Quick Info */}
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 text-center">
                    <Clock className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-neutral-900">{itemData.prepTime}</div>
                    <div className="text-sm text-neutral-600">{currentContent.prepTime}</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <Users className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-neutral-900">{itemData.servings}</div>
                    <div className="text-sm text-neutral-600">{currentContent.servings}</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <Leaf className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-neutral-900">{itemData.calories}</div>
                    <div className="text-sm text-neutral-600">{currentContent.calories}</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <Star className="w-6 h-6 text-warning-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-neutral-900">{itemData.rating}</div>
                    <div className="text-sm text-neutral-600">{currentContent.rating}</div>
                  </Card>
                </div>
              </div>
            </div>

            {/* Right Column - Details and Order */}
            <div className="space-y-6">
              {/* Title and Price */}
              <AnimatedContainer animation="slideUp" delay={200}>
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                        {itemData.name[language]}
                      </h1>
                      <p className="text-lg text-neutral-600 leading-relaxed">
                        {itemData.description[language]}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-bold text-neutral-900">
                        {formatPrice(itemData.price[currencyCode])}
                      </span>
                      {itemData.originalPrice && (
                        <span className="text-lg text-neutral-500 line-through">
                          {formatPrice(itemData.originalPrice[currencyCode])}
                        </span>
                      )}
                    </div>
                    <Badge variant="error" size="lg">
                      {language === 'ko' ? '특가' : 'Special'}
                    </Badge>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {itemData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </AnimatedContainer>

              {/* Customization Options */}
              <AnimatedContainer animation="slideUp" delay={300}>
                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                    {currentContent.customizations}
                  </h3>
                  
                  <div className="space-y-6">
                    {Object.entries(itemData.options).map(([optionKey, option]) => (
                      <div key={optionKey}>
                        <div className="flex items-center justify-between mb-3">
                          <label className="text-sm font-medium text-neutral-700">
                            {option.name[language]}
                          </label>
                          <Badge 
                            variant={option.required ? 'error' : 'secondary'} 
                            size="sm"
                          >
                            {option.required ? currentContent.required : currentContent.optional}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-2">
                          {option.choices.map((choice) => (
                            <label
                              key={choice.id}
                              className={cn(
                                'flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all hover:bg-neutral-50',
                                selectedOptions[optionKey] === choice.id
                                  ? 'border-primary-500 bg-primary-50'
                                  : 'border-neutral-200'
                              )}
                            >
                              <div className="flex items-center space-x-3">
                                <input
                                  type="radio"
                                  name={optionKey}
                                  value={choice.id}
                                  checked={selectedOptions[optionKey] === choice.id}
                                  onChange={() => handleOptionChange(optionKey, choice.id)}
                                  className="w-4 h-4 text-primary-600"
                                />
                                <span className="text-sm font-medium text-neutral-900">
                                  {choice.name[language]}
                                </span>
                              </div>
                              {choice.price !== 0 && (
                                <span className="text-sm font-medium text-neutral-600">
                                  {choice.price > 0 ? '+' : ''}{formatPrice(Math.abs(choice.price))}
                                </span>
                              )}
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </AnimatedContainer>

              {/* Special Notes */}
              <AnimatedContainer animation="slideUp" delay={400}>
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                    {currentContent.specialNotes}
                  </h3>
                  <Input
                    placeholder={currentContent.notesPlaceholder}
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    rows={3}
                  />
                </Card>
              </AnimatedContainer>

              {/* Quantity and Add to Cart */}
              <AnimatedContainer animation="slideUp" delay={500}>
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-medium text-neutral-700">
                      {currentContent.quantity}
                    </span>
                    <div className="flex items-center border border-neutral-300 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 hover:bg-neutral-100 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-3 text-lg font-medium min-w-[3rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-3 hover:bg-neutral-100 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-lg font-medium text-neutral-700">Total:</span>
                    <span className="text-2xl font-bold text-neutral-900">
                      {formatPrice(calculateTotalPrice())}
                    </span>
                  </div>
                  
                  <Button
                    onClick={handleAddToCart}
                    loading={isLoading}
                    size="lg"
                    variant="gradient"
                    fullWidth
                    leftIcon={<ShoppingCart className="w-5 h-5" />}
                  >
                    {isLoading ? 'Adding...' : currentContent.addToCart}
                  </Button>
                </Card>
              </AnimatedContainer>
            </div>
          </div>

          {/* Tabs Section */}
          <AnimatedContainer animation="slideUp" delay={600} className="mt-12">
            <Card className="p-6">
              {/* Tab Navigation */}
              <div className="flex border-b border-neutral-200 mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'flex items-center space-x-2 px-4 py-3 font-medium text-sm transition-colors border-b-2',
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-neutral-600 hover:text-neutral-900'
                    )}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[300px]">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                        {language === 'ko' ? '상품 정보' : 'Product Information'}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed">
                        {itemData.description[language]}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                        {language === 'ko' ? '알레르기 정보' : 'Allergen Information'}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {itemData.allergens[language].map((allergen, index) => (
                          <Badge key={index} variant="warning" size="sm">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            {allergen}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'ingredients' && (
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                      {language === 'ko' ? '주요 재료' : 'Ingredients'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {itemData.ingredients[language].map((ingredient, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
                          <Check className="w-4 h-4 text-success-500" />
                          <span className="text-neutral-700">{ingredient}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'nutrition' && (
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                      {language === 'ko' ? '영양 성분 (1인분 기준)' : 'Nutrition Facts (per serving)'}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {Object.entries(itemData.nutrition).map(([key, value]) => (
                        <div key={key} className="text-center p-4 bg-neutral-50 rounded-lg">
                          <div className="text-2xl font-bold text-neutral-900">{value}</div>
                          <div className="text-sm text-neutral-600 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-neutral-900">
                        {language === 'ko' ? '고객 리뷰' : 'Customer Reviews'}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 fill-warning-400 text-warning-400" />
                        <span className="font-medium">{itemData.rating}</span>
                        <span className="text-neutral-600">({itemData.reviewsCount} {currentContent.reviews})</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {itemData.reviews.map((review) => (
                        <Card key={review.id} variant="outlined" className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="font-medium text-neutral-900">{review.name}</div>
                              <div className="flex items-center space-x-2">
                                <div className="flex">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={cn(
                                        'w-4 h-4',
                                        i < review.rating ? 'fill-warning-400 text-warning-400' : 'text-neutral-300'
                                      )}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-neutral-500">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-neutral-700 mb-3">{review.comment[language]}</p>
                          <div className="flex items-center space-x-4 text-sm text-neutral-500">
                            <button className="flex items-center space-x-1 hover:text-neutral-700">
                              <Heart className="w-4 h-4" />
                              <span>{currentContent.helpful} ({review.helpful})</span>
                            </button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </AnimatedContainer>

          {/* Similar Items */}
          <AnimatedContainer animation="slideUp" delay={700} className="mt-12">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-neutral-900 mb-6">
                {currentContent.similar}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {itemData.similarItems.map((item) => (
                  <Card key={item.id} variant="outlined" className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                    <div className="text-center">
                      <div className="text-4xl mb-3">{item.image}</div>
                      <h4 className="font-medium text-neutral-900 mb-1">{item.name[language]}</h4>
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Star className="w-4 h-4 fill-warning-400 text-warning-400" />
                        <span className="text-sm text-neutral-600">{item.rating}</span>
                      </div>
                      <div className="font-semibold text-neutral-900">
                        {formatPrice(item.price[currencyCode])}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </AnimatedContainer>
        </div>
      </div>

      {/* Image Modal */}
      <Modal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        size="xl"
        title={itemData.name[language]}
      >
        <div className="aspect-square bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center text-9xl">
          {itemData.images[currentImageIndex]}
        </div>
      </Modal>
    </div>
  );
};

export default QOItemDetailsEnhanced;
