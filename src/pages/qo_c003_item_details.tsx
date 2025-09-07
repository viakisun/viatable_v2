import React, { useState } from 'react';
import { Star, Clock, Leaf, Plus, Minus, Heart, Info, Users } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { useLanguage } from '../hooks/useLanguage';

const QOItemDetails = () => {
  const { language } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState({});
  const [specialNotes, setSpecialNotes] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);

  const content = {
    en: {
      backToMenu: "Menu",
      addToCart: "Add to Cart",
      quantity: "Quantity",
      customizations: "Customizations",
      specialNotes: "Special Notes",
      notesPlaceholder: "Any special requests? (e.g., no onions, extra sauce)",
      ingredients: "Ingredients",
      nutrition: "Nutrition Info",
      reviews: "Reviews",
      similarItems: "You might also like",
      estimatedTime: "Prep time",
      servings: "Servings",
      calories: "Calories",
      allergens: "Contains",
      currency: "AUD"
    },
    ko: {
      backToMenu: "메뉴",
      addToCart: "장바구니 담기",
      quantity: "수량",
      customizations: "커스터마이징",
      specialNotes: "특별 요청사항",
      notesPlaceholder: "특별한 요청이 있으시면 적어주세요 (예: 양파 빼주세요, 소스 많이)",
      ingredients: "재료",
      nutrition: "영양 정보",
      reviews: "리뷰",
      similarItems: "이런 메뉴도 좋아요",
      estimatedTime: "조리 시간",
      servings: "제공량",
      calories: "칼로리",
      allergens: "알레르기 유발요소",
      currency: "원"
    }
  };

  const itemData = {
    id: 3,
    name: { en: 'Avocado Toast Supreme', ko: '슈프림 아보카도 토스트' },
    description: {
      en: 'Our signature avocado toast featuring thick-cut sourdough bread, perfectly ripened Hass avocados, a soft poached egg, creamy feta cheese, cherry tomatoes, and a drizzle of premium olive oil. Finished with everything bagel seasoning and microgreens.',
      ko: '두툼한 사워도우 빵에 완벽하게 익은 하스 아보카도, 부드러운 수란, 크리미한 페타치즈, 방울토마토, 프리미엄 올리브오일을 올린 시그니처 아보카도 토스트. 에브리띵 베이글 시즈닝과 마이크로그린으로 마무리했습니다.'
    },
    price: { AUD: 18.50, KRW: 26500 },
    prepTime: 12,
    servings: 1,
    rating: 4.9,
    reviews: 203,
    calories: 450,
    tags: ['popular', 'vegetarian'],
    allergens: { en: ['Gluten', 'Dairy', 'Eggs'], ko: ['글루텐', '유제품', '달걀'] },
    ingredients: {
      en: ['Sourdough bread', 'Hass avocado', 'Poached egg', 'Feta cheese', 'Cherry tomatoes', 'Olive oil', 'Everything seasoning', 'Microgreens'],
      ko: ['사워도우 빵', '하스 아보카도', '수란', '페타치즈', '방울토마토', '올리브오일', '에브리띵 시즈닝', '마이크로그린']
    }
  };

  const customizationOptions = {
    en: {
      'Bread Type': { options: ['Sourdough (default)', 'Multigrain (+$1)', 'Gluten-free (+$2)'], prices: [0, 1, 2] },
      'Egg Style': { options: ['Poached (default)', 'Fried', 'Scrambled', 'No egg (-$2)'], prices: [0, 0, 0, -2] },
      'Add Extras': { options: ['Avocado slice (+$3)', 'Bacon (+$4)', 'Smoked salmon (+$6)'], prices: [3, 4, 6], multiple: true }
    },
    ko: {
      '빵 종류': { options: ['사워도우 (기본)', '멀티그레인 (+1천원)', '글루텐프리 (+2천원)'], prices: [0, 1500, 3000] },
      '계란 스타일': { options: ['수란 (기본)', '후라이', '스크램블', '계란 빼기 (-2천원)'], prices: [0, 0, 0, -3000] },
      '추가 옵션': { options: ['아보카도 추가 (+3천원)', '베이컨 (+4천원)', '훈제연어 (+6천원)'], prices: [4500, 6000, 9000], multiple: true }
    }
  };

  const currentContent = content[language];
  const currencySymbol = language === 'ko' ? '' : '$';
  const currencyCode = language === 'ko' ? 'KRW' : 'AUD';

  const handleCustomizationChange = (category, optionIndex, isChecked = null) => {
    setSelectedCustomizations(prev => {
      const newCustomizations = { ...prev };
      const options = customizationOptions[language][category];

      if (options.multiple) {
        if (!newCustomizations[category]) {
          newCustomizations[category] = [];
        }
        if (isChecked) {
          newCustomizations[category].push(optionIndex);
        } else {
          newCustomizations[category] = newCustomizations[category].filter(i => i !== optionIndex);
        }
      } else {
        newCustomizations[category] = optionIndex;
      }

      return newCustomizations;
    });
  };

  const calculateTotalPrice = () => {
    let total = itemData.price[currencyCode];

    Object.entries(selectedCustomizations).forEach(([category, selection]) => {
      const options = customizationOptions[language][category];
      if (Array.isArray(selection)) {
        selection.forEach(index => {
          total += options.prices[index];
        });
      } else {
        total += options.prices[selection] || 0;
      }
    });

    return total * quantity;
  };

  const FavoriteButton = () => (
    <button
      onClick={() => setIsFavorite(!isFavorite)}
      className={`p-2 rounded-full transition-colors ${
        isFavorite ? 'bg-red-100 text-red-500' : 'bg-slate-100 text-slate-400'
      }`}
    >
      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
    </button>
  );

  return (
    <PageLayout title={itemData.name[language]} backLink="/qo-c-002" headerActions={<FavoriteButton />} removeMainPadding={true}>
      <div className="flex flex-col h-full bg-slate-50">
        <main className="flex-1 overflow-y-auto">
          {/* Item Image */}
          <div className="relative h-64 bg-gradient-to-br from-green-100 to-yellow-50 flex items-center justify-center">
            <div className="text-8xl">🥑</div>
            <div className="absolute top-4 left-4 flex space-x-2">
              {itemData.tags.includes('popular') && (
                <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full font-medium">
                  Popular
                </span>
              )}
              {itemData.tags.includes('vegetarian') && (
                <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full font-medium flex items-center space-x-1">
                  <Leaf className="w-3 h-3" />
                  <span>Vegetarian</span>
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-6">
            {/* Item Info */}
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">
                {itemData.name[language]}
              </h1>

              <div className="flex items-center space-x-4 mb-3">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{itemData.rating}</span>
                  <span className="text-slate-500">({itemData.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-1 text-slate-500">
                  <Clock className="w-4 h-4" />
                  <span>{itemData.prepTime} min</span>
                </div>
                <div className="flex items-center space-x-1 text-slate-500">
                  <Users className="w-4 h-4" />
                  <span>{itemData.servings} serving</span>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                {itemData.description[language]}
              </p>

              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-slate-900">
                  {currencySymbol}{itemData.price[currencyCode].toLocaleString()}{language === 'ko' ? '원' : ''}
                </div>
                <div className="text-sm text-slate-500">
                  {itemData.calories} {currentContent.calories}
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="bg-white rounded-xl p-4">
              <h3 className="font-semibold text-slate-900 mb-3">{currentContent.quantity}</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Customizations */}
            <div className="bg-white rounded-xl p-4">
              <h3 className="font-semibold text-slate-900 mb-3">{currentContent.customizations}</h3>
              <div className="space-y-4">
                {Object.entries(customizationOptions[language]).map(([category, data]) => (
                  <div key={category}>
                    <h4 className="font-medium text-slate-700 mb-2">{category}</h4>
                    <div className="space-y-2">
                      {data.options.map((option, index) => (
                        <label key={index} className="flex items-center space-x-3">
                          <input
                            type={data.multiple ? "checkbox" : "radio"}
                            name={category}
                            onChange={(e) => handleCustomizationChange(category, index, e.target.checked)}
                            className="w-4 h-4 text-slate-900 focus:ring-slate-900"
                          />
                          <span className="text-slate-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Notes */}
            <div className="bg-white rounded-xl p-4">
              <h3 className="font-semibold text-slate-900 mb-3">{currentContent.specialNotes}</h3>
              <textarea
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder={currentContent.notesPlaceholder}
                className="w-full p-3 bg-slate-50 rounded-lg border-0 focus:ring-2 focus:ring-slate-900 resize-none"
                rows="3"
              />
            </div>

            {/* Nutrition & Ingredients */}
            <div className="bg-white rounded-xl p-4">
              <button
                onClick={() => setShowNutrition(!showNutrition)}
                className="flex items-center justify-between w-full"
              >
                <h3 className="font-semibold text-slate-900">{currentContent.nutrition}</h3>
                <Info className="w-5 h-5 text-slate-400" />
              </button>

              {showNutrition && (
                <div className="mt-4 space-y-3">
                  <div>
                    <h4 className="font-medium text-slate-700 mb-2">{currentContent.ingredients}</h4>
                    <div className="flex flex-wrap gap-2">
                      {itemData.ingredients[language].map((ingredient, index) => (
                        <span key={index} className="px-2 py-1 bg-slate-100 text-slate-700 text-sm rounded-full">
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-slate-700 mb-2">{currentContent.allergens}</h4>
                    <div className="flex flex-wrap gap-2">
                      {itemData.allergens[language].map((allergen, index) => (
                        <span key={index} className="px-2 py-1 bg-red-100 text-red-700 text-sm rounded-full">
                          {allergen}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Add to Cart Button */}
        <footer className="sticky bottom-0 p-4 bg-white border-t border-slate-200">
          <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-slate-800 transition-colors">
            <span>{currentContent.addToCart}</span>
            <span>•</span>
            <span>{currencySymbol}{calculateTotalPrice().toLocaleString()}{language === 'ko' ? '원' : ''}</span>
          </button>
        </footer>
      </div>
    </PageLayout>
  );
};

export default QOItemDetails;