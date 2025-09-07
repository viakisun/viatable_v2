import React, { useState } from 'react';
import { Search, Star, Plus, Clock, Leaf } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';

const QOMenuCatalog = () => {
  const { language, setLanguage } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);

  const content = {
    en: {
      title: "Menu",
      searchPlaceholder: "Search dishes...",
      categories: {
        all: "All",
        coffee: "Coffee",
        brunch: "Brunch",
        beverages: "Beverages",
        desserts: "Desserts"
      },
      currency: "AUD",
      addToCart: "Add to Cart",
      popular: "Popular",
      new: "New",
      vegetarian: "Vegetarian",
      estimatedTime: "mins",
      tableInfo: "Table 12 • The Bistro"
    },
    ko: {
      title: "메뉴",
      searchPlaceholder: "음식 검색...",
      categories: {
        all: "전체",
        coffee: "커피",
        brunch: "브런치",
        beverages: "음료",
        desserts: "디저트"
      },
      currency: "원",
      addToCart: "장바구니 담기",
      popular: "인기",
      new: "신메뉴",
      vegetarian: "채식",
      estimatedTime: "분",
      tableInfo: "테이블 12 • 더 비스트로"
    }
  };

  const menuItems = [
    { id: 1, category: 'coffee', name: { en: 'Signature Espresso', ko: '시그니처 에스프레소' }, description: { en: 'Rich, full-bodied espresso with caramel notes', ko: '카라멜 향이 풍부한 진한 에스프레소' }, price: { AUD: 4.50, KRW: 6500 }, image: '☕', prepTime: 3, tags: ['popular'], rating: 4.8, reviews: 124 },
    { id: 2, category: 'coffee', name: { en: 'Oat Milk Latte', ko: '오트밀크 라떼' }, description: { en: 'Creamy oat milk latte with vanilla undertones', ko: '바닐라 향이 은은한 부드러운 오트밀크 라떼' }, price: { AUD: 5.20, KRW: 7500 }, image: '🥛', prepTime: 4, tags: ['vegetarian', 'new'], rating: 4.6, reviews: 89 },
    { id: 3, category: 'brunch', name: { en: 'Avocado Toast Supreme', ko: '슈프림 아보카도 토스트' }, description: { en: 'Sourdough toast, smashed avocado, poached egg, feta', ko: '사워도우 토스트, 으깬 아보카도, 수란, 페타치즈' }, price: { AUD: 18.50, KRW: 26500 }, image: '🥑', prepTime: 12, tags: ['popular', 'vegetarian'], rating: 4.9, reviews: 203 },
    { id: 4, category: 'brunch', name: { en: 'Pancake Stack', ko: '팬케이크 스택' }, description: { en: 'Fluffy buttermilk pancakes with maple syrup & berries', ko: '버터밀크 팬케이크와 메이플시럽, 베리' }, price: { AUD: 16.80, KRW: 24000 }, image: '🥞', prepTime: 15, tags: ['popular'], rating: 4.7, reviews: 156 },
    { id: 5, category: 'brunch', name: { en: 'Breakfast Bowl', ko: '브렉퍼스트 보울' }, description: { en: 'Quinoa, roasted vegetables, poached egg, tahini dressing', ko: '퀴노아, 로스트 채소, 수란, 타히니 드레싱' }, price: { AUD: 19.50, KRW: 28000 }, image: '🍲', prepTime: 10, tags: ['new', 'vegetarian'], rating: 4.5, reviews: 67 },
    { id: 6, category: 'beverages', name: { en: 'Fresh Orange Juice', ko: '생오렌지 주스' }, description: { en: 'Freshly squeezed Valencia oranges', ko: '발렌시아 오렌지를 직접 짜낸 주스' }, price: { AUD: 6.50, KRW: 9500 }, image: '🍊', prepTime: 2, tags: ['vegetarian'], rating: 4.4, reviews: 45 }
  ];

  const currentContent = content[language];
  const currencySymbol = language === 'ko' ? '' : '$';
  const currencyCode = language === 'ko' ? 'KRW' : 'AUD';

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      item.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description[language].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  const HeaderActions = () => (
    <div className="flex items-center space-x-2">
      <div className="flex bg-slate-100 rounded-full p-1">
        <button onClick={() => setLanguage('en')} className={`px-2 py-1 rounded-full text-xs font-medium transition-all ${language === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}>EN</button>
        <button onClick={() => setLanguage('ko')} className={`px-2 py-1 rounded-full text-xs font-medium transition-all ${language === 'ko' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}>한국어</button>
      </div>
      <div className="relative">
        <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center">
          <span className="text-white font-medium">{cartCount}</span>
        </div>
      </div>
    </div>
  );

  return (
    <PageLayout title={currentContent.title} backLink="/qo-c-001" headerActions={<HeaderActions />}>
      {/* Search and Filters */}
      <div className="sticky top-0 bg-slate-50 py-4 z-10">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={currentContent.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 transition-all"
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {Object.entries(currentContent.categories).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === key
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <main className="space-y-4">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
            <div className="flex space-x-4">
              <div className="w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center text-3xl">{item.image}</div>
              <div className="flex-1 flex flex-col">
                <div className="flex-grow">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-slate-900">{item.name[language]}</h3>
                        {item.tags.includes('popular') && <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs rounded-full font-medium">{currentContent.popular}</span>}
                        {item.tags.includes('new') && <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full font-medium">{currentContent.new}</span>}
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.description[language]}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-slate-900">{currencySymbol}{item.price[currencyCode].toLocaleString()}{language === 'ko' ? '원' : ''}</span>
                      <div className="flex items-center space-x-1 text-xs text-slate-500"><Clock className="w-3 h-3" /><span>{item.prepTime}{currentContent.estimatedTime}</span></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /><span className="text-xs font-medium">{item.rating}</span><span className="text-xs text-slate-500">({item.reviews})</span></div>
                      {item.tags.includes('vegetarian') && <div className="flex items-center space-x-1"><Leaf className="w-3 h-3 text-green-500" /><span className="text-xs text-green-600">{currentContent.vegetarian}</span></div>}
                    </div>
                  </div>
                  <button onClick={handleAddToCart} className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center space-x-2 hover:bg-slate-800 transition-colors">
                    <Plus className="w-4 h-4" />
                    <span>{currentContent.addToCart}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No items found</h3>
            <p className="text-slate-600">Try adjusting your search or filters</p>
          </div>
        )}
      </main>
    </PageLayout>
  );
};

export default QOMenuCatalog;