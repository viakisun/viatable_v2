import React, { useState, useEffect } from 'react';
import { ChevronLeft, Filter, Search, Clock, CheckCircle, AlertTriangle, Package, Play, Pause, MoreVertical, Phone, MessageSquare, Printer, Eye, Edit, Trash2, RefreshCw, Bell, ChefHat, Utensils } from 'lucide-react';

const QOOrderManagement = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState('all'); // all, new, preparing, ready, completed
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const content = {
    en: {
      title: "Order Management",
      backToDashboard: "Dashboard",
      searchPlaceholder: "Search orders, tables, or customers...",
      filters: "Filters",
      tabs: {
        all: "All Orders",
        new: "New",
        preparing: "Preparing",
        ready: "Ready",
        completed: "Completed"
      },
      orderStatuses: {
        confirmed: "Confirmed",
        preparing: "Preparing",
        ready: "Ready",
        completed: "Completed",
        cancelled: "Cancelled"
      },
      actions: {
        view: "View Details",
        edit: "Edit Order",
        print: "Print",
        call: "Call Customer",
        message: "Send Message",
        cancel: "Cancel Order",
        markReady: "Mark as Ready",
        markCompleted: "Mark as Completed",
        startPreparing: "Start Preparing"
      },
      orderInfo: {
        orderNumber: "Order #",
        table: "Table",
        customer: "Customer",
        items: "Items",
        total: "Total",
        time: "Time",
        prepTime: "Prep Time",
        specialNotes: "Special Notes",
        paymentMethod: "Payment"
      },
      quickStats: {
        totalOrders: "Total Orders",
        newOrders: "New Orders",
        inProgress: "In Progress",
        avgPrepTime: "Avg Prep Time"
      },
      bulkActions: "Bulk Actions",
      selectAll: "Select All",
      selectedCount: "selected",
      refreshData: "Refresh",
      autoRefresh: "Auto-refresh",
      soundAlerts: "Sound Alerts",
      minutes: "min",
      minutesAgo: "min ago",
      justNow: "just now",
      currency: "AUD"
    },
    ko: {
      title: "주문 관리",
      backToDashboard: "대시보드",
      searchPlaceholder: "주문, 테이블, 고객 검색...",
      filters: "필터",
      tabs: {
        all: "전체 주문",
        new: "신규",
        preparing: "조리중",
        ready: "준비완료",
        completed: "완료"
      },
      orderStatuses: {
        confirmed: "확인됨",
        preparing: "조리중",
        ready: "준비완료",
        completed: "완료",
        cancelled: "취소됨"
      },
      actions: {
        view: "상세보기",
        edit: "주문 수정",
        print: "출력",
        call: "고객 통화",
        message: "메시지 전송",
        cancel: "주문 취소",
        markReady: "준비완료 처리",
        markCompleted: "완료 처리",
        startPreparing: "조리 시작"
      },
      orderInfo: {
        orderNumber: "주문번호 #",
        table: "테이블",
        customer: "고객",
        items: "항목",
        total: "총액",
        time: "시간",
        prepTime: "조리시간",
        specialNotes: "특별요청",
        paymentMethod: "결제방법"
      },
      quickStats: {
        totalOrders: "총 주문",
        newOrders: "신규 주문",
        inProgress: "진행중",
        avgPrepTime: "평균 조리시간"
      },
      bulkActions: "일괄 작업",
      selectAll: "전체 선택",
      selectedCount: "개 선택됨",
      refreshData: "새로고침",
      autoRefresh: "자동 새로고침",
      soundAlerts: "소리 알림",
      minutes: "분",
      minutesAgo: "분 전",
      justNow: "방금 전",
      currency: "원"
    }
  };

  const [orders, setOrders] = useState([
    {
      id: "2024-128",
      tableNumber: "12",
      customer: "John Smith",
      items: [
        { name: { en: 'Avocado Toast Supreme', ko: '슈프림 아보카도 토스트' }, quantity: 2, price: 37.00 },
        { name: { en: 'Oat Milk Latte', ko: '오트밀크 라떼' }, quantity: 1, price: 5.20 }
      ],
      total: { AUD: 42.20, KRW: 62000 },
      status: "new",
      placedAt: new Date(Date.now() - 2 * 60000),
      estimatedTime: 15,
      specialNotes: "No onions, extra avocado",
      paymentMethod: "Card",
      priority: "normal",
      serviceType: "dine-in"
    },
    {
      id: "2024-127",
      tableNumber: "8",
      customer: "Sarah Johnson",
      items: [
        { name: { en: 'Pancake Stack', ko: '팬케이크 스택' }, quantity: 1, price: 16.80 },
        { name: { en: 'Fresh Orange Juice', ko: '생오렌지 주스' }, quantity: 2, price: 13.00 }
      ],
      total: { AUD: 29.80, KRW: 43500 },
      status: "preparing",
      placedAt: new Date(Date.now() - 18 * 60000),
      estimatedTime: 12,
      actualPrepTime: 8,
      specialNotes: "Light syrup please",
      paymentMethod: "Cash",
      priority: "normal",
      serviceType: "dine-in"
    },
    {
      id: "2024-126",
      tableNumber: "15",
      customer: "Mike Chen",
      items: [
        { name: { en: 'Signature Espresso', ko: '시그니처 에스프레소' }, quantity: 2, price: 9.00 },
        { name: { en: 'Breakfast Bowl', ko: '브렉퍼스트 보울' }, quantity: 1, price: 19.50 }
      ],
      total: { AUD: 28.50, KRW: 42000 },
      status: "ready",
      placedAt: new Date(Date.now() - 25 * 60000),
      estimatedTime: 10,
      actualPrepTime: 12,
      specialNotes: "",
      paymentMethod: "Card",
      priority: "normal",
      serviceType: "dine-in"
    },
    {
      id: "2024-125",
      tableNumber: "Takeaway",
      customer: "Emma Wilson",
      items: [
        { name: { en: 'Oat Milk Latte', ko: '오트밀크 라떼' }, quantity: 3, price: 15.60 }
      ],
      total: { AUD: 15.60, KRW: 23000 },
      status: "completed",
      placedAt: new Date(Date.now() - 45 * 60000),
      estimatedTime: 5,
      actualPrepTime: 4,
      specialNotes: "Large size, extra hot",
      paymentMethod: "Apple Pay",
      priority: "normal",
      serviceType: "takeaway"
    }
  ]);

  const currentContent = content[selectedLanguage];
  const currencySymbol = selectedLanguage === 'ko' ? '' : '$';
  const currencyCode = selectedLanguage === 'ko' ? 'KRW' : 'AUD';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesTab = selectedTab === 'all' || 
                     (selectedTab === 'new' && order.status === 'new') ||
                     (selectedTab === 'preparing' && order.status === 'preparing') ||
                     (selectedTab === 'ready' && order.status === 'ready') ||
                     (selectedTab === 'completed' && order.status === 'completed');
    
    const matchesSearch = searchQuery === '' ||
                         order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.tableNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-orange-100 text-orange-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-slate-100 text-slate-600';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new': return <Clock className="w-4 h-4" />;
      case 'preparing': return <ChefHat className="w-4 h-4" />;
      case 'ready': return <Package className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getTimeAgo = (date) => {
    const diff = currentTime.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return currentContent.justNow;
    return `${minutes} ${currentContent.minutesAgo}`;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus }
        : order
    ));
    
    if (soundEnabled) {
      // Simulate sound notification
      console.log(`🔔 Order ${orderId} status updated to ${newStatus}`);
    }
  };

  const getQuickStats = () => {
    const totalOrders = orders.length;
    const newOrders = orders.filter(o => o.status === 'new').length;
    const inProgress = orders.filter(o => o.status === 'preparing').length;
    const completedOrders = orders.filter(o => o.status === 'completed');
    const avgPrepTime = completedOrders.length > 0 
      ? Math.round(completedOrders.reduce((sum, o) => sum + o.actualPrepTime, 0) / completedOrders.length)
      : 0;

    return { totalOrders, newOrders, inProgress, avgPrepTime };
  };

  const stats = getQuickStats();

  const handleBulkAction = (action) => {
    if (selectedOrders.length === 0) return;
    
    if (action === 'markReady') {
      selectedOrders.forEach(orderId => {
        updateOrderStatus(orderId, 'ready');
      });
    } else if (action === 'print') {
      alert(`Printing ${selectedOrders.length} orders...`);
    }
    
    setSelectedOrders([]);
  };

  const toggleOrderSelection = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 text-slate-600 hover:text-slate-900">
                <ChevronLeft className="w-5 h-5" />
                <span className="font-medium">{currentContent.backToDashboard}</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-full ${soundEnabled ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}
              >
                <Bell className="w-4 h-4" />
              </button>
              
              <button className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200">
                <RefreshCw className="w-4 h-4" />
              </button>
              
              <div className="flex bg-slate-100 rounded-full p-1">
                <button
                  onClick={() => setSelectedLanguage('en')}
                  className={`px-2 py-1 rounded-full text-xs font-medium transition-all ${
                    selectedLanguage === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setSelectedLanguage('ko')}
                  className={`px-2 py-1 rounded-full text-xs font-medium transition-all ${
                    selectedLanguage === 'ko' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  한국어
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-slate-900">{currentContent.title}</h1>
            <div className="text-sm text-slate-500">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="p-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-3">
            <div className="text-sm text-slate-600">{currentContent.quickStats.totalOrders}</div>
            <div className="text-2xl font-bold text-slate-900">{stats.totalOrders}</div>
          </div>
          
          <div className="bg-white rounded-lg p-3">
            <div className="text-sm text-slate-600">{currentContent.quickStats.newOrders}</div>
            <div className="text-2xl font-bold text-blue-600">{stats.newOrders}</div>
          </div>
          
          <div className="bg-white rounded-lg p-3">
            <div className="text-sm text-slate-600">{currentContent.quickStats.inProgress}</div>
            <div className="text-2xl font-bold text-orange-600">{stats.inProgress}</div>
          </div>
          
          <div className="bg-white rounded-lg p-3">
            <div className="text-sm text-slate-600">{currentContent.quickStats.avgPrepTime}</div>
            <div className="text-2xl font-bold text-green-600">{stats.avgPrepTime}{currentContent.minutes}</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="px-4 pb-4">
        <div className="bg-white rounded-xl p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0 mb-4">
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
            
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200">
                <Filter className="w-4 h-4" />
                <span className="text-sm">{currentContent.filters}</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 overflow-x-auto">
            {Object.entries(currentContent.tabs).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedTab(key)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTab === key
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedOrders.length > 0 && (
        <div className="px-4 pb-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-800">
                {selectedOrders.length} {currentContent.selectedCount}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleBulkAction('markReady')}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  {currentContent.actions.markReady}
                </button>
                <button
                  onClick={() => handleBulkAction('print')}
                  className="px-3 py-1 bg-slate-600 text-white rounded-lg text-sm font-medium hover:bg-slate-700"
                >
                  {currentContent.actions.print}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Orders List */}
      <main className="p-4 pb-20">
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  checked={selectedOrders.includes(order.id)}
                  onChange={() => toggleOrderSelection(order.id)}
                  className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-600"
                />
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-slate-900">
                        {currentContent.orderInfo.orderNumber}{order.id}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span>{currentContent.orderStatuses[order.status]}</span>
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-slate-900">
                        {currencySymbol}{order.total[currencyCode].toLocaleString()}{selectedLanguage === 'ko' ? '원' : ''}
                      </span>
                      <button className="p-1 hover:bg-slate-100 rounded-full">
                        <MoreVertical className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3 text-sm">
                    <div>
                      <span className="text-slate-500">{currentContent.orderInfo.table}: </span>
                      <span className="font-medium">{order.tableNumber}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">{currentContent.orderInfo.customer}: </span>
                      <span className="font-medium">{order.customer}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">{currentContent.orderInfo.time}: </span>
                      <span className="font-medium">{getTimeAgo(order.placedAt)}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">{currentContent.orderInfo.prepTime}: </span>
                      <span className="font-medium">
                        {order.actualPrepTime || order.estimatedTime}{currentContent.minutes}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-sm text-slate-500 mb-1">{currentContent.orderInfo.items}:</div>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="text-sm text-slate-700">
                          {item.name[selectedLanguage]} × {item.quantity}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {order.specialNotes && (
                    <div className="mb-3 p-2 bg-orange-50 rounded-lg">
                      <div className="text-xs text-orange-600 font-medium">{currentContent.orderInfo.specialNotes}:</div>
                      <div className="text-sm text-orange-800">{order.specialNotes}</div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-slate-500">
                      <span>{order.paymentMethod}</span>
                      <span className="capitalize">{order.serviceType}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {order.status === 'new' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'preparing')}
                          className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                        >
                          {currentContent.actions.startPreparing}
                        </button>
                      )}
                      
                      {order.status === 'preparing' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'ready')}
                          className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
                        >
                          {currentContent.actions.markReady}
                        </button>
                      )}
                      
                      {order.status === 'ready' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'completed')}
                          className="px-3 py-1 bg-slate-600 text-white rounded-lg text-sm font-medium hover:bg-slate-700"
                        >
                          {currentContent.actions.markCompleted}
                        </button>
                      )}
                      
                      <button className="p-1 hover:bg-slate-100 rounded-full">
                        <Phone className="w-4 h-4 text-slate-600" />
                      </button>
                      
                      <button className="p-1 hover:bg-slate-100 rounded-full">
                        <MessageSquare className="w-4 h-4 text-slate-600" />
                      </button>
                      
                      <button className="p-1 hover:bg-slate-100 rounded-full">
                        <Printer className="w-4 h-4 text-slate-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No orders found</h3>
              <p className="text-slate-600">No orders match your current filters</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default QOOrderManagement;