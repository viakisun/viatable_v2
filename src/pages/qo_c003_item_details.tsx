import { useState } from 'react';
import { Plus, Minus, Heart, Star, Clock, Users, MessageSquare, Leaf, Flame, AlertTriangle } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { useLanguage } from '../contexts/useLanguage';

const QOItemDetails = () => {
  const { language } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('ingredients');

  const content = {
    en: { addToCart: "Add to Cart", quantity: "Quantity", customizations: "Customizations", specialNotes: "Special Notes", notesPlaceholder: "Any special requests?", ingredients: "Ingredients", nutrition: "Nutrition Info", allergens: "Contains", currency: "AUD" },
    ko: { addToCart: "장바구니 담기", quantity: "수량", customizations: "커스터마이징", specialNotes: "특별 요청사항", notesPlaceholder: "특별한 요청사항...", ingredients: "재료", nutrition: "영양 정보", allergens: "알레르기 정보", currency: "원" }
  };

  const itemData = {
    id: 3, name: { en: 'Avocado Toast Supreme', ko: '슈프림 아보카도 토스트' },
    description: { en: 'Our signature avocado toast...', ko: '시그니처 아보카도 토스트...' },
    price: { AUD: 18.50, KRW: 26500 }, prepTime: 12, servings: 1, rating: 4.9, reviews: 203, calories: 450, tags: ['popular', 'vegetarian'],
    allergens: { en: ['Gluten', 'Dairy', 'Eggs'], ko: ['글루텐', '유제품', '달걀'] },
    ingredients: { en: ['Sourdough', 'Avocado', 'Egg', 'Feta'], ko: ['사워도우', '아보카도', '계란', '페타치즈'] }
  };

  const currentContent = content[language];
  const currencySymbol = language === 'ko' ? '' : '$';
  const currencyCode = language === 'ko' ? 'KRW' : 'AUD';

  const calculateTotalPrice = () => { /* ... calculation logic ... */ return (itemData.price[currencyCode] * quantity); };

  const FavoriteButton = () => (
    <button onClick={() => setIsFavorite(!isFavorite)} className={`p-2 rounded-full transition-colors ${isFavorite ? 'bg-red-100 text-red-500' : 'bg-slate-100 text-slate-400'}`}>
      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
    </button>
  );

  const TabButton = ({ id, title }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`-mb-px px-4 py-3 font-semibold text-sm transition-colors focus:outline-none ${
        activeTab === id
          ? 'border-b-2 border-slate-900 text-slate-900'
          : 'text-slate-500 hover:text-slate-700 border-b-2 border-transparent'
      }`}
    >
      {title}
    </button>
  );

  return (
    <PageLayout title={itemData.name[language]} backLink="/qo-c-002" headerActions={<FavoriteButton />} removeMainPadding={true}>
      <div className="flex flex-col h-full">
        <main className="flex-1 overflow-y-auto">
          {/* Item Image */}
          <div className="relative h-64 bg-gradient-to-br from-green-100 to-yellow-50 flex items-center justify-center text-8xl">🥑</div>

          {/* Content */}
          <div className="p-4 space-y-6">
            {/* Item Info */}
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">{itemData.name[language]}</h1>
              <p className="text-slate-600 leading-relaxed mb-4">{itemData.description[language]}</p>
              <div className="flex items-center justify-between"><div className="text-2xl font-bold text-slate-900">{currencySymbol}{itemData.price[currencyCode].toLocaleString()}{language === 'ko' ? '원' : ''}</div></div>

              {/* Item Metadata */}
              <div className="flex items-center space-x-4 text-sm text-slate-500 pt-4 border-t border-slate-100 mt-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{itemData.rating}</span>
                  <span className="text-slate-400">({itemData.reviews})</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{itemData.prepTime} min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{itemData.servings} serving{itemData.servings > 1 ? 's' : ''}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {itemData.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full capitalize">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="bg-white rounded-xl p-4">
              <h3 className="font-semibold text-slate-900 mb-3">{currentContent.quantity}</h3>
              <div className="flex items-center space-x-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center"><Minus className="w-4 h-4" /></button>
                <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center"><Plus className="w-4 h-4" /></button>
              </div>
            </div>

            {/* Special Notes */}
            <div className="bg-white rounded-xl p-4">
              <h3 className="font-semibold text-slate-900 mb-3">{currentContent.specialNotes}</h3>
              <div className="relative">
                <MessageSquare className="w-4 h-4 absolute top-3.5 left-3 text-slate-400" />
                <textarea
                  className="w-full border border-slate-200 rounded-lg py-2 pr-3 pl-9 focus:ring-1 focus:ring-slate-400 focus:outline-none resize-none"
                  rows={3}
                  placeholder={currentContent.notesPlaceholder}
                ></textarea>
              </div>
            </div>

            {/* Detailed Info Tabs */}
            <div className="bg-white rounded-xl">
              <div className="flex border-b border-slate-200 px-4">
                <TabButton id="ingredients" title={currentContent.ingredients} />
                <TabButton id="nutrition" title={currentContent.nutrition} />
                <TabButton id="allergens" title={currentContent.allergens} />
              </div>
              <div className="p-4 text-slate-600 space-y-4 text-sm">
                {activeTab === 'ingredients' && (
                  <div>
                    <ul className="space-y-2">
                      {itemData.ingredients[language].map((item, index) => (
                        <li key={index} className="flex items-center">
                          <Leaf className="w-4 h-4 mr-2 text-green-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {activeTab === 'nutrition' && (
                  <div>
                    <div className="flex items-center">
                      <Flame className="w-4 h-4 mr-2 text-orange-500" />
                      <span>{itemData.calories} kcal per serving</span>
                    </div>
                  </div>
                )}
                {activeTab === 'allergens' && (
                  <div>
                    <ul className="space-y-2">
                      {itemData.allergens[language].map((item, index) => (
                        <li key={index} className="flex items-center">
                          <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Add to Cart Button */}
        <footer className="p-4 bg-white border-t border-slate-200">
          <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold text-lg">
            <span>{currentContent.addToCart}</span> • <span>{currencySymbol}{calculateTotalPrice().toLocaleString()}{language === 'ko' ? '원' : ''}</span>
          </button>
        </footer>
      </div>
    </PageLayout>
  );
};

export default QOItemDetails;