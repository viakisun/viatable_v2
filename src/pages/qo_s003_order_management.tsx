import React, { useState, useEffect } from 'react';
import { Filter, Search, Clock, CheckCircle, RefreshCw, Bell } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';

const QOOrderManagement = () => {
  const { language } = useLanguage();
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);

  const content = {
    en: { title: "Order Management", searchPlaceholder: "Search orders...", tabs: { all: "All", new: "New", preparing: "Preparing", ready: "Ready" }, orderStatuses: { new: "New", preparing: "Preparing", ready: "Ready", completed: "Completed" }, orderInfo: { orderNumber: "Order #", time: "Time", total: "Total" }, currency: "AUD" },
    ko: { title: "주문 관리", searchPlaceholder: "주문 검색...", tabs: { all: "전체", new: "신규", preparing: "조리중", ready: "준비완료" }, orderStatuses: { new: "신규", preparing: "조리중", ready: "준비완료", completed: "완료" }, orderInfo: { orderNumber: "주문번호 #", time: "시간", total: "총액" }, currency: "원" }
  };

  const [orders, setOrders] = useState([
    { id: "128", status: "new", total: { AUD: 42.20, KRW: 62000 }, placedAt: new Date(Date.now() - 2 * 60000) },
    { id: "127", status: "preparing", total: { AUD: 29.80, KRW: 43500 }, placedAt: new Date(Date.now() - 18 * 60000) },
    { id: "126", status: "ready", total: { AUD: 28.50, KRW: 42000 }, placedAt: new Date(Date.now() - 25 * 60000) },
  ]);

  const currentContent = content[language];
  const currencySymbol = language === 'ko' ? '' : '$';
  const currencyCode = language === 'ko' ? 'KRW' : 'AUD';

  const filteredOrders = orders.filter(order => (selectedTab === 'all' || order.status === selectedTab));

  const HeaderActions = () => (
    <div className="flex items-center space-x-2">
      <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-full ${soundEnabled ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}><Bell className="w-5 h-5" /></button>
      <button className="p-2 rounded-full bg-slate-100 text-slate-600"><RefreshCw className="w-5 h-5" /></button>
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
            {Object.entries(currentContent.tabs).map(([key, label]) => (
              <button key={key} onClick={() => setSelectedTab(key)} className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium ${selectedTab === key ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
                {label} ({key === 'all' ? orders.length : orders.filter(o => o.status === key).length})
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-slate-900">{currentContent.orderInfo.orderNumber}{order.id}</h3>
                <div className="text-lg font-bold">{currencySymbol}{order.total[currencyCode].toLocaleString()}</div>
              </div>
              {/* Simplified for brevity */}
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default QOOrderManagement;