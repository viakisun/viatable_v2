import { useState } from 'react';
import { 
  Plus, Minus, Heart, Star, Clock, Users, MessageSquare, 
  Leaf, AlertTriangle, ArrowLeft, Share2,
  Check, Info,
  ShoppingCart
} from 'lucide-react';
import { 
  Button, 
  Input, 
  Badge, 
  Modal
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
  const [language, setLanguage] = useState<'en' | 'ko'>('en');

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
        comment: { en: 'Perfect for brunch! The combination of flavors is incredible.', ko: '브런치에 완벽해요! 맛의 조합이 정말 놀라워요.' },
        helpful: 15
      }
    ]
  };

  const tabs = [
    { id: 'overview', name: { en: 'Overview', ko: '개요' }, icon: Info },
    { id: 'ingredients', name: { en: 'Ingredients', ko: '재료' }, icon: Leaf },
    { id: 'nutrition', name: { en: 'Nutrition', ko: '영양정보' }, icon: Users },
    { id: 'reviews', name: { en: 'Reviews', ko: '리뷰' }, icon: MessageSquare }
  ];

  const currentContent = {
    back: language === 'ko' ? '뒤로' : 'Back',
    addToCart: language === 'ko' ? '장바구니에 추가' : 'Add to Cart',
    adding: language === 'ko' ? '추가 중...' : 'Adding...',
    share: language === 'ko' ? '공유' : 'Share',
    bookmark: language === 'ko' ? '북마크' : 'Bookmark',
    prepTime: language === 'ko' ? '조리시간' : 'Prep Time',
    minutes: language === 'ko' ? '분' : 'min',
    servings: language === 'ko' ? '인분' : 'servings',
    calories: language === 'ko' ? '칼로리' : 'calories',
    rating: language === 'ko' ? '평점' : 'rating',
    reviews: language === 'ko' ? '리뷰' : 'reviews',
    specialNotes: language === 'ko' ? '특별 요청사항' : 'Special Notes',
    specialNotesPlaceholder: language === 'ko' ? '특별한 요청사항이 있으시면 입력해주세요...' : 'Any special requests...',
    allergens: language === 'ko' ? '알레르기 정보' : 'Allergens',
    contains: language === 'ko' ? '포함' : 'Contains',
    ingredients: language === 'ko' ? '재료' : 'Ingredients',
    nutrition: language === 'ko' ? '영양정보' : 'Nutrition',
    protein: language === 'ko' ? '단백질' : 'Protein',
    carbs: language === 'ko' ? '탄수화물' : 'Carbs',
    fat: language === 'ko' ? '지방' : 'Fat',
    fiber: language === 'ko' ? '식이섬유' : 'Fiber',
    sugar: language === 'ko' ? '당분' : 'Sugar',
    helpful: language === 'ko' ? '도움됨' : 'Helpful',
    required: language === 'ko' ? '필수' : 'Required',
    optional: language === 'ko' ? '선택' : 'Optional'
  };

  const currencyCode = language === 'ko' ? 'KRW' : 'AUD';

  const calculateTotalPrice = () => {
    let total = itemData.price[currencyCode];
    
    // Add option prices
    Object.values(itemData.options).forEach(option => {
      const selectedChoice = option.choices.find(choice => 
        selectedOptions[option.name[language]] === choice.id
      );
      if (selectedChoice) {
        total += selectedChoice.price;
      }
    });
    
    return total * quantity;
  };

  const handleAddToCart = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    console.log('Added to cart:', { item: itemData.name[language], quantity, options: selectedOptions });
  };

  const handleOptionChange = (optionName: string, choiceId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: choiceId
    }));
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
              <h1 className="text-lg font-bold text-gray-900">{currentContent.back}</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
                className="w-8 h-8"
              >
                <Heart className={cn('w-4 h-4', isFavorite ? 'text-red-500 fill-current' : 'text-gray-400')} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowImageModal(true)}
                className="w-8 h-8"
              >
                <Share2 className="w-4 h-4 text-gray-400" />
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
      <div className="space-y-4">
        {/* Image Gallery - Mobile */}
        <div className="bg-white">
          <div className="relative">
            <div className="flex overflow-x-auto snap-x snap-mandatory">
              {itemData.images.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full h-64 flex items-center justify-center text-8xl bg-gray-100 snap-center"
                  onClick={() => setCurrentImageIndex(index)}
                >
                  {image}
                </div>
              ))}
            </div>
            
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
        </div>

        {/* Item Info */}
        <div className="p-4 space-y-4">
          {/* Title and Rating */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-xl font-bold text-gray-900 flex-1">
                {itemData.name[language]}
              </h1>
              <div className="flex items-center space-x-1 ml-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-gray-900">{itemData.rating}</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {itemData.description[language]}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {itemData.tags.map((tag) => (
              <Badge key={tag} variant="secondary" size="sm">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Price and Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">
                {currencyCode === 'KRW' ? `₩${itemData.price.KRW.toLocaleString()}` : `$${itemData.price.AUD}`}
              </span>
              {itemData.originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  {currencyCode === 'KRW' ? `₩${itemData.originalPrice.KRW.toLocaleString()}` : `$${itemData.originalPrice.AUD}`}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{itemData.prepTime}{currentContent.minutes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{itemData.servings}{currentContent.servings}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 py-3 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{itemData.calories}</div>
              <div className="text-xs text-gray-600">{currentContent.calories}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{itemData.rating}</div>
              <div className="text-xs text-gray-600">{currentContent.rating}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{itemData.reviewsCount}</div>
              <div className="text-xs text-gray-600">{currentContent.reviews}</div>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {Object.entries(itemData.options).map(([key, option]) => (
              <div key={key}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{option.name[language]}</h3>
                  <Badge variant={option.required ? 'error' : 'secondary'} size="sm">
                    {option.required ? currentContent.required : currentContent.optional}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {option.choices.map((choice) => (
                    <button
                      key={choice.id}
                      onClick={() => handleOptionChange(option.name[language], choice.id)}
                      className={cn(
                        'w-full flex items-center justify-between p-3 border-2 rounded-lg transition-all',
                        selectedOptions[option.name[language]] === choice.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      )}
                    >
                      <span className="font-medium text-gray-900">{choice.name[language]}</span>
                      {choice.price !== 0 && (
                        <span className={cn(
                          'text-sm font-medium',
                          choice.price > 0 ? 'text-gray-900' : 'text-green-600'
                        )}>
                          {choice.price > 0 ? '+' : ''}
                          {currencyCode === 'KRW' ? `₩${(choice.price * 1000).toLocaleString()}` : `$${choice.price}`}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Special Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {currentContent.specialNotes}
            </label>
            <Input
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder={currentContent.specialNotesPlaceholder}
              rows={3}
              size="sm"
            />
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8"
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8"
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">
                {currencyCode === 'KRW' ? `₩${calculateTotalPrice().toLocaleString()}` : `$${calculateTotalPrice().toFixed(2)}`}
              </div>
            </div>
          </div>

          <Button
            onClick={handleAddToCart}
            loading={isLoading}
            size="lg"
            variant="primary"
            fullWidth
            leftIcon={<ShoppingCart className="w-4 h-4" />}
          >
            {isLoading ? currentContent.adding : currentContent.addToCart}
          </Button>
        </div>

        {/* Tabs - Mobile */}
        <div className="bg-white">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-all',
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  )}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.name[language]}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-4">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">{currentContent.allergens}</h3>
                  <div className="flex flex-wrap gap-2">
                    {itemData.allergens[language].map((allergen) => (
                      <Badge key={allergen} variant="error" size="sm">
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
                <h3 className="font-medium text-gray-900 mb-3">{currentContent.ingredients}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {itemData.ingredients[language].map((ingredient, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                      <Leaf className="w-3 h-3 text-green-600" />
                      <span className="text-sm text-gray-700">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div>
                <h3 className="font-medium text-gray-900 mb-3">{currentContent.nutrition}</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <div className="text-lg font-bold text-gray-900">{itemData.nutrition.calories}</div>
                    <div className="text-xs text-gray-600">{currentContent.calories}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <div className="text-lg font-bold text-gray-900">{itemData.nutrition.protein}g</div>
                    <div className="text-xs text-gray-600">{currentContent.protein}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <div className="text-lg font-bold text-gray-900">{itemData.nutrition.carbs}g</div>
                    <div className="text-xs text-gray-600">{currentContent.carbs}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <div className="text-lg font-bold text-gray-900">{itemData.nutrition.fat}g</div>
                    <div className="text-xs text-gray-600">{currentContent.fat}</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {itemData.reviews.map((review) => (
                  <div key={review.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{review.name}</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                'w-3 h-3',
                                i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{review.comment[language]}</p>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Check className="w-3 h-3" />
                      <span>{review.helpful} {currentContent.helpful}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <Modal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        title=""
        size="full"
      >
        <div className="relative h-96">
          <div className="flex items-center justify-center h-full text-8xl bg-gray-100">
            {itemData.images[currentImageIndex]}
          </div>
          <button
            onClick={() => setShowImageModal(false)}
            className="absolute top-4 right-4 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center"
          >
            ×
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default QOItemDetailsEnhanced;