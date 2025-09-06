import React, { useState } from 'react';
import { Star, Clock, Leaf, Plus, Minus, Heart, Info, Users } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';

const QOItemDetails = () => {
  const { language } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState({});
  const [specialNotes, setSpecialNotes] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);

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

  const customizationOptions = {
    en: { 'Bread Type': { options: ['Sourdough', 'Multigrain (+$1)'], prices: [0, 1] }, 'Egg Style': { options: ['Poached', 'Fried'], prices: [0, 0] } },
    ko: { '빵 종류': { options: ['사워도우', '멀티그레인 (+1천원)'], prices: [0, 1500] }, '계란 스타일': { options: ['수란', '후라이'], prices: [0, 0] } }
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

            {/* Customizations, Notes, etc. */}
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