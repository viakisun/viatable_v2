import React, { useState, useEffect } from 'react';
import { ChevronLeft, Search, Filter, Plus, Edit3, Trash2, Eye, EyeOff, DollarSign, Clock, AlertTriangle, CheckCircle, Save, X, Upload, Star, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

const QOMenuManagement = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const content = {
    en: {
      title: "Menu Management",
      backToDashboard: "Dashboard",
      searchPlaceholder: "Search menu items...",
      categories: {
        all: "All Items",
        coffee: "Coffee",
        brunch: "Brunch", 
        beverages: "Beverages",
        desserts: "Desserts"
      },
      itemStatus: {
        available: "Available",
        unavailable: "Unavailable",
        lowStock: "Low Stock",
        outOfStock: "Out of Stock"
      },
      actions: {
        edit: "Edit",
        delete: "Delete",
        duplicate: "Duplicate",
        toggleAvailability: "Toggle Availability",
        saveChanges: "Save Changes",
        cancel: "Cancel",
        addNew: "Add New Item"
      },
      fields: {
        name: "Item Name",
        description: "Description",
        price: "Price",
        category: "Category",
        prepTime: "Prep Time",
        ingredients: "Ingredients",
        allergies: "Allergies",
        calories: "Calories",
        availability: "Availability",
        stockLevel: "Stock Level"
      },
      stats: {
        totalItems: "Total Items",
        available: "Available",
        unavailable: "Unavailable",
        lowStock: "Low Stock",
        popularItems: "Popular Items",
        salesTrend: "Sales Trend"
      },
      minutes: "min",
      currency: "AUD",
      lastUpdated: "Last updated",
      changesSaved: "Changes saved successfully",
      confirmDelete: "Are you sure you want to delete this item?",
      analytics: "Analytics",
      hideAnalytics: "Hide Analytics",
      todayOrders: "Today's Orders",
      revenue: "Revenue",
      trend: "Trend"
    },
    ko: {
      title: "메뉴 관리",
      backToDashboard: "대시보드",
      searchPlaceholder: "메뉴 아이템 검색...",
      categories: {
        all: "전체 아이템",
        coffee: "커피",
        brunch: "브런치",
        beverages: "음료",
        desserts: "디저트"
      },
      itemStatus: {
        available: "판매중",
        unavailable: "판매중지",
        lowStock: "재고부족",
        outOfStock: "품절"
      },
      actions: {
        edit: "수정",
        delete: "삭제",
        duplicate: "복제",
        toggleAvailability: "판매 상태 변경",
        saveChanges: "변경사항 저장",
        cancel: "취소",
        addNew: "신규 아이템 추가"
      },
      fields: {
        name: "아이템명",
        description: "설명",
        price: "가격",
        category: "카테고리",
        prepTime: "조리시간",
        ingredients: "재료",
        allergies: "알레르기",
        calories: "칼로리",
        availability: "판매 상태",
        stockLevel: "재고 수준"
      },
      stats: {
        totalItems: "전체 아이템",
        available: "판매중",
        unavailable: "판매중지",
        lowStock: "재고부족",
        popularItems: "인기 아이템",
        salesTrend: "판매 추이"
      },
      minutes: "분",
      currency: "원",
      lastUpdated: "마지막 업데이트",
      changesSaved: "변경사항이 저장되었습니다",
      confirmDelete: "정말로 이 아이템을 삭제하시겠습니까?",
      analytics: "분석",
      hideAnalytics: "분석 숨기기",
      todayOrders: "오늘 주문",
      revenue: "매출",
      trend: "추이"
    }
  };

  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: { en: 'Signature Espresso', ko: '시그니처 에스프레소' },
      description: { en: 'Rich, full-bodied espresso with caramel notes', ko: '카라멜 향이 풍부한 진한 에스프레소' },
      category: 'coffee',
      price: { AUD: 4.50, KRW: 6500 },
      prepTime: 3,
      calories: 5,
      availability: 'available',
      stockLevel: 85,
      ingredients: ['Espresso Beans', 'Water'],
      allergies: [],
      image: '☕',
      todayOrders: 24,
      revenue: { AUD: 108.00, KRW: 156000 },
      trend: 'up',
      rating: 4.8,
      lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 2,
      name: { en: 'Oat Milk Latte', ko: '오트밀크 라떼' },
      description: { en: 'Creamy oat milk latte with vanilla undertones', ko: '바닐라 향이 은은한 부드러운 오트밀크 라떼' },
      category: 'coffee',
      price: { AUD: 5.20, KRW: 7500 },
      prepTime: 4,
      calories: 120,
      availability: 'available',
      stockLevel: 45,
      ingredients: ['Espresso', 'Oat Milk', 'Vanilla Syrup'],
      allergies: [],
      image: '🥛',
      todayOrders: 18,
      revenue: { AUD: 93.60, KRW: 135000 },
      trend: 'up',
      rating: 4.6,
      lastUpdated: new Date(Date.now() - 1 * 60 * 60 * 1000)
    },
    {
      id: 3,
      name: { en: 'Avocado Toast Supreme', ko: '슈프림 아보카도 토스트' },
      description: { en: 'Sourdough toast, smashed avocado, poached egg, feta', ko: '사워도우 토스트, 으깬 아보카도, 수란, 페타치즈' },
      category: 'brunch',
      price: { AUD: 18.50, KRW: 26500 },
      prepTime: 12,
      calories: 450,
      availability: 'lowStock',
      stockLevel: 12,
      ingredients: ['Sourdough Bread', 'Avocado', 'Poached Egg', 'Feta Cheese', 'Cherry Tomatoes'],
      allergies: ['Gluten', 'Dairy', 'Eggs'],
      image: '🥑',
      todayOrders: 31,
      revenue: { AUD: 573.50, KRW: 821500 },
      trend: 'up',
      rating: 4.9,
      lastUpdated: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: 4,
      name: { en: 'Pancake Stack', ko: '팬케이크 스택' },
      description: { en: 'Fluffy buttermilk pancakes with maple syrup & berries', ko: '버터밀크 팬케이크와 메이플시럽, 베리' },
      category: 'brunch',
      price: { AUD: 16.80, KRW: 24000 },
      prepTime: 15,
      calories: 520,
      availability: 'available',
      stockLevel: 78,
      ingredients: ['Pancake Mix', 'Buttermilk', 'Maple Syrup', 'Mixed Berries'],
      allergies: ['Gluten', 'Dairy', 'Eggs'],
      image: '🥞',
      todayOrders: 15,
      revenue: { AUD: 252.00, KRW: 360000 },
      trend: 'down',
      rating: 4.7,
      lastUpdated: new Date(Date.now() - 4 * 60 * 60 * 1000)
    },
    {
      id: 5,
      name: { en: 'Fresh Orange Juice', ko: '생오렌지 주스' },
      description: { en: 'Freshly squeezed Valencia oranges', ko: '발렌시아 오렌지를 직접 짜낸 주스' },
      category: 'beverages',
      price: { AUD: 6.50, KRW: 9500 },
      prepTime: 2,
      calories: 110,
      availability: 'outOfStock',
      stockLevel: 0,
      ingredients: ['Fresh Valencia Oranges'],
      allergies: [],
      image: '🍊',
      todayOrders: 8,
      revenue: { AUD: 52.00, KRW: 76000 },
      trend: 'down',
      rating: 4.4,
      lastUpdated: new Date(Date.now() - 6 * 60 * 60 * 1000)
    }
  ]);

  const currentContent = content[selectedLanguage];
  const currencySymbol = selectedLanguage === 'ko' ? '' : '$';
  const currencyCode = selectedLanguage === 'ko' ? 'KRW' : 'AUD';

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.name[selectedLanguage].toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description[selectedLanguage].toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (availability, stockLevel) => {
    switch (availability) {
      case 'available':
        if (stockLevel < 20) return 'bg-yellow-100 text-yellow-800';
        return 'bg-green-100 text-green-800';
      case 'lowStock':
        return 'bg-yellow-100 text-yellow-800';
      case 'outOfStock':
        return 'bg-red-100 text-red-800';
      case 'unavailable':
        return 'bg-slate-100 text-slate-600';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  const getStatusIcon = (availability, stockLevel) => {
    switch (availability) {
      case 'available':
        if (stockLevel < 20) return <AlertTriangle className="w-4 h-4" />;
        return <CheckCircle className="w-4 h-4" />;
      case 'lowStock':
        return <AlertTriangle className="w-4 h-4" />;
      case 'outOfStock':
        return <X className="w-4 h-4" />;
      case 'unavailable':
        return <EyeOff className="w-4 h-4" />;
      default:
        return <Eye className="w-4 h-4" />;
    }
  };

  const toggleAvailability = (itemId) => {
    setMenuItems(items =>
      items.map(item => {
        if (item.id === itemId) {
          const newAvailability = item.availability === 'available' ? 'unavailable' : 'available';
          return { ...item, availability: newAvailability, lastUpdated: new Date() };
        }
        return item;
      })
    );
  };

  const startEditing = (item) => {
    setEditingItem({...item});
  };

  const saveChanges = () => {
    if (editingItem) {
      setMenuItems(items =>
        items.map(item =>
          item.id === editingItem.id 
            ? { ...editingItem, lastUpdated: new Date() }
            : item
        )
      );
      setEditingItem(null);
      alert(currentContent.changesSaved);
    }
  };

  const cancelEditing = () => {
    setEditingItem(null);
  };

  const deleteItem = (itemId) => {
    if (confirm(currentContent.confirmDelete)) {
      setMenuItems(items => items.filter(item => item.id !== itemId));
    }
  };

  const getMenuStats = () => {
    return {
      total: menuItems.length,
      available: menuItems.filter(item => item.availability === 'available').length,
      unavailable: menuItems.filter(item => item.availability === 'unavailable').length,
      lowStock: menuItems.filter(item => item.availability === 'lowStock' || item.stockLevel < 20).length,
      totalRevenue: menuItems.reduce((sum, item) => sum + item.revenue[currencyCode], 0),
      totalOrders: menuItems.reduce((sum, item) => sum + item.todayOrders, 0)
    };
  };

  const stats = getMenuStats();

  const EditModal = () => {
    if (!editingItem) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900">{currentContent.actions.edit}</h2>
            <button onClick={cancelEditing} className="p-2 hover:bg-slate-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {currentContent.fields.name} (EN)
                </label>
                <input
                  type="text"
                  value={editingItem.name.en}
                  onChange={(e) => setEditingItem({
                    ...editingItem,
                    name: { ...editingItem.name, en: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 rounded-lg border-0 focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {currentContent.fields.name} (KO)
                </label>
                <input
                  type="text"
                  value={editingItem.name.ko}
                  onChange={(e) => setEditingItem({
                    ...editingItem,
                    name: { ...editingItem.name, ko: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 rounded-lg border-0 focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {currentContent.fields.description} (EN)
              </label>
              <textarea
                value={editingItem.description.en}
                onChange={(e) => setEditingItem({
                  ...editingItem,
                  description: { ...editingItem.description, en: e.target.value }
                })}
                className="w-full px-3 py-2 bg-slate-50 rounded-lg border-0 focus:ring-2 focus:ring-blue-600 resize-none"
                rows="2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {currentContent.fields.description} (KO)
              </label>
              <textarea
                value={editingItem.description.ko}
                onChange={(e) => setEditingItem({
                  ...editingItem,
                  description: { ...editingItem.description, ko: e.target.value }
                })}
                className="w-full px-3 py-2 bg-slate-50 rounded-lg border-0 focus:ring-2 focus:ring-blue-600 resize-none"
                rows="2"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {currentContent.fields.price} (AUD)
                </label>
                <input
                  type="number"
                  step="0.50"
                  value={editingItem.price.AUD}
                  onChange={(e) => setEditingItem({
                    ...editingItem,
                    price: { ...editingItem.price, AUD: parseFloat(e.target.value) }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 rounded-lg border-0 focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {currentContent.fields.price} (KRW)
                </label>
                <input
                  type="number"
                  step="500"
                  value={editingItem.price.KRW}
                  onChange={(e) => setEditingItem({
                    ...editingItem,
                    price: { ...editingItem.price, KRW: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 rounded-lg border-0 focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {currentContent.fields.prepTime}
                </label>
                <input
                  type="number"
                  value={editingItem.prepTime}
                  onChange={(e) => setEditingItem({
                    ...editingItem,
                    prepTime: parseInt(e.target.value)
                  })}
                  className="w-full px-3 py-2 bg-slate-50 rounded-lg border-0 focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {currentContent.fields.stockLevel}
                </label>
                <input
                  type="number"
                  value={editingItem.stockLevel}
                  onChange={(e) => setEditingItem({
                    ...editingItem,
                    stockLevel: parseInt(e.target.value)
                  })}
                  className="w-full px-3 py-2 bg-slate-50 rounded-lg border-0 focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {currentContent.fields.availability}
              </label>
              <select
                value={editingItem.availability}
                onChange={(e) => setEditingItem({
                  ...editingItem,
                  availability: e.target.value
                })}
                className="w-full px-3 py-2 bg-slate-50 rounded-lg border-0 focus:ring-2 focus:ring-blue-600"
              >
                <option value="available">{currentContent.itemStatus.available}</option>
                <option value="unavailable">{currentContent.itemStatus.unavailable}</option>
                <option value="lowStock">{currentContent.itemStatus.lowStock}</option>
                <option value="outOfStock">{currentContent.itemStatus.outOfStock}</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              onClick={cancelEditing}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {currentContent.actions.cancel}
            </button>
            <button
              onClick={saveChanges}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{currentContent.actions.saveChanges}</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <button className="flex items-center space-x-2 text-slate-600 hover:text-slate-900">
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">{currentContent.backToDashboard}</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  showAnalytics ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <BarChart3 className="w-4 h-4 mr-1 inline" />
                {showAnalytics ? currentContent.hideAnalytics : currentContent.analytics}
              </button>

              <div className="flex bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setSelectedLanguage('en')}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                    selectedLanguage === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setSelectedLanguage('ko')}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                    selectedLanguage === 'ko' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  한국어
                </button>
              </div>
            </div>
          </div>

          <h1 className="text-xl font-bold text-slate-900">{currentContent.title}</h1>
        </div>
      </header>

      {/* Stats */}
      <div className="p-4">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          <div className="bg-white rounded-lg p-3">
            <div className="text-sm text-slate-600">{currentContent.stats.totalItems}</div>
            <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
          </div>
          
          <div className="bg-white rounded-lg p-3">
            <div className="text-sm text-slate-600">{currentContent.stats.available}</div>
            <div className="text-2xl font-bold text-green-600">{stats.available}</div>
          </div>
          
          <div className="bg-white rounded-lg p-3">
            <div className="text-sm text-slate-600">{currentContent.stats.lowStock}</div>
            <div className="text-2xl font-bold text-yellow-600">{stats.lowStock}</div>
          </div>
          
          <div className="bg-white rounded-lg p-3">
            <div className="text-sm text-slate-600">{currentContent.todayOrders}</div>
            <div className="text-2xl font-bold text-blue-600">{stats.totalOrders}</div>
          </div>
          
          <div className="bg-white rounded-lg p-3">
            <div className="text-sm text-slate-600">{currentContent.revenue}</div>
            <div className="text-2xl font-bold text-purple-600">
              {currencySymbol}{stats.totalRevenue.toLocaleString()}{selectedLanguage === 'ko' ? '원' : ''}
            </div>
          </div>
        </div>

        {/* Analytics Panel */}
        {showAnalytics && (
          <div className="bg-white rounded-xl p-4 mb-4">
            <h2 className="font-semibold text-slate-900 mb-4">{currentContent.stats.popularItems}</h2>
            <div className="space-y-3">
              {menuItems
                .sort((a, b) => b.todayOrders - a.todayOrders)
                .slice(0, 3)
                .map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{item.image}</div>
                      <div>
                        <div className="font-medium text-slate-900">{item.name[selectedLanguage]}</div>
                        <div className="text-sm text-slate-600">
                          {item.todayOrders} orders • {currencySymbol}{item.revenue[currencyCode].toLocaleString()}{selectedLanguage === 'ko' ? '원' : ''}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{item.rating}</span>
                      {item.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 mb-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-3 lg:space-y-0 mb-4">
            <div className="relative flex-1 lg:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={currentContent.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-lg border-0 focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>{currentContent.actions.addNew}</span>
            </button>
          </div>

          <div className="flex space-x-2 overflow-x-auto">
            {Object.entries(currentContent.categories).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <main className="p-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{item.image}</div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{item.name[selectedLanguage]}</h3>
                    <p className="text-sm text-slate-600 line-clamp-2">{item.description[selectedLanguage]}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => startEditing(item)}
                    className="p-1 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <Edit3 className="w-4 h-4 text-slate-600" />
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="p-1 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                <div>
                  <span className="text-slate-500">{currentContent.fields.price}: </span>
                  <span className="font-semibold">
                    {currencySymbol}{item.price[currencyCode].toLocaleString()}{selectedLanguage === 'ko' ? '원' : ''}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">{currentContent.fields.prepTime}: </span>
                  <span className="font-semibold">{item.prepTime}{currentContent.minutes}</span>
                </div>
                <div>
                  <span className="text-slate-500">{currentContent.todayOrders}: </span>
                  <span className="font-semibold">{item.todayOrders}</span>
                </div>
                <div>
                  <span className="text-slate-500">{currentContent.fields.stockLevel}: </span>
                  <span className={`font-semibold ${item.stockLevel < 20 ? 'text-red-600' : 'text-green-600'}`}>
                    {item.stockLevel}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(item.availability, item.stockLevel)}`}>
                  {getStatusIcon(item.availability, item.stockLevel)}
                  <span>{currentContent.itemStatus[item.availability]}</span>
                </span>
                
                <button
                  onClick={() => toggleAvailability(item.id)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    item.availability === 'available' 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {item.availability === 'available' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="mt-3 text-xs text-slate-500">
                {currentContent.lastUpdated}: {item.lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No menu items found</h3>
            <p className="text-slate-600">Try adjusting your search or filters</p>
          </div>
        )}
      </main>

      <EditModal />
    </div>
  );
};

export default QOMenuManagement;