import { useState } from 'react';
import { Plus, BarChart3, Search, Eye, EyeOff } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';

const QOMenuManagement = () => {
  const { language } = useLanguage();
  const [searchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const content = {
    en: { title: "Menu Management", searchPlaceholder: "Search items...", categories: { all: "All", coffee: "Coffee", brunch: "Brunch" }, itemStatus: { available: "Available", unavailable: "Unavailable" }, currency: "AUD" },
    ko: { title: "메뉴 관리", searchPlaceholder: "아이템 검색...", categories: { all: "전체", coffee: "커피", brunch: "브런치" }, itemStatus: { available: "판매중", unavailable: "판매중지" }, currency: "원" }
  };

  const [menuItems, setMenuItems] = useState([
    { id: 1, name: { en: 'Signature Espresso', ko: '시그니처 에스프레소' }, category: 'coffee', price: { AUD: 4.50, KRW: 6500 }, availability: 'available', image: '☕' },
    { id: 3, name: { en: 'Avocado Toast', ko: '아보카도 토스트' }, category: 'brunch', price: { AUD: 18.50, KRW: 26500 }, availability: 'available', image: '🥑' },
    { id: 5, name: { en: 'Orange Juice', ko: '오렌지 주스' }, category: 'beverages', price: { AUD: 6.50, KRW: 9500 }, availability: 'unavailable', image: '🍊' },
  ]);

  const currentContent = content[language];
  const currencySymbol = language === 'ko' ? '' : '$';
  const currencyCode = language === 'ko' ? 'KRW' : 'AUD';

  const filteredItems = menuItems.filter(item => (selectedCategory === 'all' || item.category === selectedCategory) && (searchQuery === '' || item.name[language].toLowerCase().includes(searchQuery.toLowerCase())));

  const toggleAvailability = (id: number) => {
    setMenuItems(items => items.map(item => item.id === id ? { ...item, availability: item.availability === 'available' ? 'unavailable' : 'available' } : item));
  };

  const HeaderActions = () => (
    <div className="flex items-center space-x-2">
      <button className="p-2 rounded-full bg-slate-100 text-slate-600"><BarChart3 className="w-5 h-5" /></button>
      <button className="p-2 rounded-full bg-blue-600 text-white"><Plus className="w-5 h-5" /></button>
    </div>
  );

  return (
    <PageLayout title={currentContent.title} backLink="/qo-s-002" headerActions={<HeaderActions />}>
      <div className="space-y-4">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder={currentContent.searchPlaceholder} className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-lg" />
          </div>
          <div className="flex space-x-1 overflow-x-auto">
            {Object.entries(currentContent.categories).map(([key, label]) => (
              <button key={key} onClick={() => setSelectedCategory(key)} className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium ${selectedCategory === key ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{item.image}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{item.name[language]}</h3>
                  <p className="text-slate-600">{currencySymbol}{item.price[currencyCode].toLocaleString()}</p>
                </div>
                <button onClick={() => toggleAvailability(item.id)} className={`p-2 rounded-full ${item.availability === 'available' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {item.availability === 'available' ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default QOMenuManagement;