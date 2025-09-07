import React from 'react';
import { Star, Plus, Clock, Leaf } from 'lucide-react';

export type MenuItemType = {
  id: number;
  category: string;
  name: { en: string; ko: string };
  description: { en: string; ko: string };
  price: { AUD: number; KRW: number };
  image: string;
  prepTime: number;
  tags: string[];
  rating: number;
  reviews: number;
};

export type MenuItemCardContent = {
  popular: string;
  new: string;
  vegetarian: string;
  estimatedTime: string;
  addToCart: string;
};

interface MenuItemCardProps {
  item: MenuItemType;
  currencySymbol: string;
  currencyCode: 'AUD' | 'KRW';
  language: 'en' | 'ko';
  content: MenuItemCardContent;
  onAddToCart: (item: MenuItemType) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  currencySymbol,
  currencyCode,
  language,
  content,
  onAddToCart,
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-col">
      <div className="flex space-x-4">
        <div className="w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">{item.image}</div>
        <div className="flex-1 flex flex-col">
          <div className="flex-grow">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center space-x-2 mb-1 flex-wrap">
                  <h3 className="font-semibold text-slate-900">{item.name[language]}</h3>
                  {item.tags.includes('popular') && <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs rounded-full font-medium">{content.popular}</span>}
                  {item.tags.includes('new') && <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full font-medium">{content.new}</span>}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description[language]}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-slate-900">{currencySymbol}{item.price[currencyCode].toLocaleString()}{language === 'ko' ? '원' : ''}</span>
                <div className="flex items-center space-x-1 text-xs text-slate-500"><Clock className="w-3 h-3" /><span>{item.prepTime}{content.estimatedTime}</span></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /><span className="text-xs font-medium">{item.rating}</span><span className="text-xs text-slate-500">({item.reviews})</span></div>
                {item.tags.includes('vegetarian') && <div className="flex items-center space-x-1"><Leaf className="w-3 h-3 text-green-500" /><span className="text-xs text-green-600">{content.vegetarian}</span></div>}
              </div>
            </div>
            <button onClick={() => onAddToCart(item)} className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center space-x-2 hover:bg-slate-800 transition-colors flex-shrink-0">
              <Plus className="w-4 h-4" />
              <span>{content.addToCart}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
