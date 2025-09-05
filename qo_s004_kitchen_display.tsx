import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, CheckCircle, Flame, ChefHat, Timer, Bell, BellOff, Maximize, Settings, RefreshCw, Play, Pause, Volume2, VolumeX } from 'lucide-react';

const QOKitchenDisplay = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [displayMode, setDisplayMode] = useState('grid'); // grid, list
  const [autoAdvance, setAutoAdvance] = useState(true);

  const content = {
    en: {
      title: "Kitchen Display",
      newOrders: "New Orders",
      inProgress: "In Progress", 
      readyToServe: "Ready to Serve",
      orderNumber: "Order #",
      table: "Table",
      customer: "Customer",
      items: "Items",
      time: "Time",
      elapsed: "Elapsed",
      estimated: "Est.",
      priority: "Priority",
      specialNotes: "Special Notes",
      allergies: "Allergies",
      startCooking: "Start Cooking",
      markReady: "Mark Ready",
      completed: "Completed",
      minutes: "min",
      minutesAgo: "min ago",
      justNow: "just now",
      overdue: "OVERDUE",
      urgent: "URGENT",
      normal: "NORMAL",
      low: "LOW",
      kitchenStats: "Kitchen Stats",
      activeOrders: "Active Orders",
      avgCookTime: "Avg Cook Time",
      onTimeRate: "On Time Rate",
      efficiency: "Efficiency",
      soundAlerts: "Sound",
      fullscreen: "Fullscreen",
      settings: "Settings",
      refresh: "Refresh"
    },
    ko: {
      title: "주방 디스플레이",
      newOrders: "신규 주문",
      inProgress: "조리 중",
      readyToServe: "서빙 준비",
      orderNumber: "주문번호 #",
      table: "테이블",
      customer: "고객",
      items: "메뉴",
      time: "시간",
      elapsed: "경과시간",
      estimated: "예상",
      priority: "우선순위",
      specialNotes: "특별 요청",
      allergies: "알레르기",
      startCooking: "조리 시작",
      markReady: "완료 처리",
      completed: "완료됨",
      minutes: "분",
      minutesAgo: "분 전",
      justNow: "방금",
      overdue: "지연",
      urgent: "긴급",
      normal: "보통",
      low: "낮음",
      kitchenStats: "주방 현황",
      activeOrders: "진행 주문",
      avgCookTime: "평균 조리시간",
      onTimeRate: "정시 완료율",
      efficiency: "효율성",
      soundAlerts: "소리",
      fullscreen: "전체화면",
      settings: "설정",
      refresh: "새로고침"
    }
  };

  const [orders, setOrders] = useState([
    {
      id: "2024-128",
      tableNumber: "12",
      customer: "John S.",
      status: "new",
      placedAt: new Date(Date.now() - 1 * 60000), // 1 minute ago
      estimatedTime: 15,
      priority: "normal",
      items: [
        { 
          name: { en: 'Avocado Toast Supreme', ko: '슈프림 아보카도 토스트' }, 
          quantity: 2, 
          cookTime: 12,
          ingredients: ['Sourdough', 'Avocado', 'Poached Egg', 'Feta'],
          allergies: ['Gluten', 'Dairy', 'Eggs']
        },
        { 
          name: { en: 'Oat Milk Latte', ko: '오트밀크 라떼' }, 
          quantity: 1,
          cookTime: 3,
          ingredients: ['Espresso', 'Oat Milk'],
          allergies: []
        }
      ],
      specialNotes: "No onions, extra avocado",
      serviceType: "dine-in"
    },
    {
      id: "2024-129",
      tableNumber: "8", 
      customer: "Sarah J.",
      status: "preparing",
      placedAt: new Date(Date.now() - 8 * 60000), // 8 minutes ago
      startedAt: new Date(Date.now() - 5 * 60000), // started 5 minutes ago
      estimatedTime: 12,
      priority: "urgent",
      items: [
        { 
          name: { en: 'Pancake Stack', ko: '팬케이크 스택' },
          quantity: 1,
          cookTime: 10,
          ingredients: ['Pancake Mix', 'Berries', 'Maple Syrup'],
          allergies: ['Gluten', 'Dairy']
        },
        {
          name: { en: 'Fresh Orange Juice', ko: '생오렌지 주스' },
          quantity: 2,
          cookTime: 2,
          ingredients: ['Fresh Oranges'],
          allergies: []
        }
      ],
      specialNotes: "Light syrup, customer has diabetes",
      serviceType: "dine-in"
    },
    {
      id: "2024-130",
      tableNumber: "15",
      customer: "Mike C.",
      status: "preparing", 
      placedAt: new Date(Date.now() - 18 * 60000), // 18 minutes ago
      startedAt: new Date(Date.now() - 15 * 60000), // started 15 minutes ago
      estimatedTime: 10,
      priority: "urgent", // overdue
      items: [
        {
          name: { en: 'Signature Espresso', ko: '시그니처 에스프레소' },
          quantity: 2,
          cookTime: 3,
          ingredients: ['Espresso Beans'],
          allergies: []
        },
        {
          name: { en: 'Breakfast Bowl', ko: '브렉퍼스트 보울' },
          quantity: 1,
          cookTime: 8,
          ingredients: ['Quinoa', 'Roasted Vegetables', 'Poached Egg'],
          allergies: ['Eggs']
        }
      ],
      specialNotes: "",
      serviceType: "dine-in"
    },
    {
      id: "2024-131",
      tableNumber: "Takeaway",
      customer: "Emma W.",
      status: "ready",
      placedAt: new Date(Date.now() - 25 * 60000),
      startedAt: new Date(Date.now() - 20 * 60000),
      completedAt: new Date(Date.now() - 2 * 60000),
      estimatedTime: 5,
      actualTime: 18,
      priority: "normal",
      items: [
        {
          name: { en: 'Oat Milk Latte', ko: '오트밀크 라떼' },
          quantity: 3,
          cookTime: 4,
          ingredients: ['Espresso', 'Oat Milk'],
          allergies: []
        }
      ],
      specialNotes: "Large size, extra hot",
      serviceType: "takeaway"
    }
  ]);

  const currentContent = content[selectedLanguage];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Auto-advance overdue orders to urgent priority
    if (autoAdvance) {
      setOrders(prevOrders => 
        prevOrders.map(order => {
          if (order.status === 'preparing' && order.startedAt) {
            const elapsed = (currentTime.getTime() - order.startedAt.getTime()) / (1000 * 60);
            if (elapsed > order.estimatedTime && order.priority !== 'urgent') {
              return { ...order, priority: 'urgent' };
            }
          }
          return order;
        })
      );
    }
  }, [currentTime, autoAdvance]);

  const getElapsedTime = (startTime) => {
    if (!startTime) return 0;
    return Math.floor((currentTime.getTime() - startTime.getTime()) / (1000 * 60));
  };

  const getTimeFromOrder = (orderTime) => {
    const elapsed = Math.floor((currentTime.getTime() - orderTime.getTime()) / (1000 * 60));
    if (elapsed < 1) return currentContent.justNow;
    return `${elapsed} ${currentContent.minutesAgo}`;
  };

  const getPriorityColor = (priority, status, elapsed, estimated) => {
    if (status === 'preparing' && elapsed > estimated) {
      return 'border-red-500 bg-red-50 text-red-800';
    }
    switch (priority) {
      case 'urgent': return 'border-red-500 bg-red-50 text-red-800';
      case 'normal': return 'border-blue-500 bg-blue-50 text-blue-800';
      case 'low': return 'border-green-500 bg-green-50 text-green-800';
      default: return 'border-slate-500 bg-slate-50 text-slate-800';
    }
  };

  const getPriorityLabel = (priority, status, elapsed, estimated) => {
    if (status === 'preparing' && elapsed > estimated) {
      return currentContent.overdue;
    }
    switch (priority) {
      case 'urgent': return currentContent.urgent;
      case 'normal': return currentContent.normal; 
      case 'low': return currentContent.low;
      default: return currentContent.normal;
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        const now = new Date();
        if (newStatus === 'preparing') {
          return { ...order, status: newStatus, startedAt: now };
        } else if (newStatus === 'ready') {
          return { ...order, status: newStatus, completedAt: now };
        }
        return { ...order, status: newStatus };
      }
      return order;
    }));

    if (soundEnabled) {
      // Simulate sound notification
      console.log(`🔔 Order ${orderId} status updated to ${newStatus}`);
    }
  };

  const newOrders = orders.filter(o => o.status === 'new');
  const preparingOrders = orders.filter(o => o.status === 'preparing');
  const readyOrders = orders.filter(o => o.status === 'ready');

  const kitchenStats = {
    activeOrders: newOrders.length + preparingOrders.length,
    avgCookTime: 12,
    onTimeRate: 87,
    efficiency: 94
  };

  return (
    <div className={`min-h-screen bg-slate-900 text-white ${isFullscreen ? 'p-2' : 'p-4'}`}>
      {/* Header */}
      <header className="bg-slate-800 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <ChefHat className="w-8 h-8 text-orange-400" />
            <div>
              <h1 className="text-2xl font-bold">{currentContent.title}</h1>
              <div className="text-slate-400">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Kitchen Stats */}
            <div className="hidden lg:flex items-center space-x-6 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">{kitchenStats.activeOrders}</div>
                <div className="text-slate-400">{currentContent.activeOrders}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{kitchenStats.avgCookTime}{currentContent.minutes}</div>
                <div className="text-slate-400">{currentContent.avgCookTime}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{kitchenStats.onTimeRate}%</div>
                <div className="text-slate-400">{currentContent.onTimeRate}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{kitchenStats.efficiency}%</div>
                <div className="text-slate-400">{currentContent.efficiency}</div>
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-lg transition-colors ${
                  soundEnabled ? 'bg-orange-600 text-white' : 'bg-slate-700 text-slate-400'
                }`}
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600"
              >
                <Maximize className="w-5 h-5" />
              </button>
              
              <button className="p-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600">
                <RefreshCw className="w-5 h-5" />
              </button>
              
              <div className="flex bg-slate-700 rounded-lg p-1">
                <button
                  onClick={() => setSelectedLanguage('en')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                    selectedLanguage === 'en' ? 'bg-orange-600 text-white' : 'text-slate-300'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setSelectedLanguage('ko')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                    selectedLanguage === 'ko' ? 'bg-orange-600 text-white' : 'text-slate-300'
                  }`}
                >
                  한국어
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* New Orders */}
        <div className="bg-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-blue-400 flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>{currentContent.newOrders}</span>
            </h2>
            <div className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-bold">
              {newOrders.length}
            </div>
          </div>
          
          <div className="space-y-3">
            {newOrders.map((order) => (
              <div key={order.id} className="bg-slate-700 rounded-lg p-4 border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold text-lg">#{order.id}</div>
                  <div className="text-sm text-slate-400">{getTimeFromOrder(order.placedAt)}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                  <div>
                    <span className="text-slate-400">{currentContent.table}: </span>
                    <span className="font-medium">{order.tableNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">{currentContent.customer}: </span>
                    <span className="font-medium">{order.customer}</span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="bg-slate-600 rounded p-2">
                      <div className="font-medium">{item.name[selectedLanguage]} × {item.quantity}</div>
                      <div className="text-xs text-slate-300">
                        {currentContent.estimated}: {item.cookTime}{currentContent.minutes}
                      </div>
                      {item.allergies.length > 0 && (
                        <div className="text-xs text-red-300 mt-1">
                          <AlertTriangle className="w-3 h-3 inline mr-1" />
                          {item.allergies.join(', ')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {order.specialNotes && (
                  <div className="bg-orange-900 text-orange-200 p-2 rounded text-sm mb-3">
                    <strong>{currentContent.specialNotes}:</strong> {order.specialNotes}
                  </div>
                )}
                
                <button
                  onClick={() => updateOrderStatus(order.id, 'preparing')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold transition-colors"
                >
                  {currentContent.startCooking}
                </button>
              </div>
            ))}
          </div>
          
          {newOrders.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <div>No new orders</div>
            </div>
          )}
        </div>

        {/* In Progress */}
        <div className="bg-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-orange-400 flex items-center space-x-2">
              <Flame className="w-5 h-5" />
              <span>{currentContent.inProgress}</span>
            </h2>
            <div className="bg-orange-600 text-white px-2 py-1 rounded text-sm font-bold">
              {preparingOrders.length}
            </div>
          </div>
          
          <div className="space-y-3">
            {preparingOrders.map((order) => {
              const elapsed = getElapsedTime(order.startedAt);
              const isOverdue = elapsed > order.estimatedTime;
              
              return (
                <div key={order.id} className={`bg-slate-700 rounded-lg p-4 border-l-4 ${
                  isOverdue ? 'border-red-500' : 'border-orange-500'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold text-lg">#{order.id}</div>
                    <div className={`px-2 py-1 rounded text-xs font-bold ${
                      isOverdue ? 'bg-red-600 text-white' : 'bg-orange-600 text-white'
                    }`}>
                      {elapsed}{currentContent.minutes} / {order.estimatedTime}{currentContent.minutes}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                    <div>
                      <span className="text-slate-400">{currentContent.table}: </span>
                      <span className="font-medium">{order.tableNumber}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">{currentContent.priority}: </span>
                      <span className={`font-medium ${
                        isOverdue ? 'text-red-400' : 
                        order.priority === 'urgent' ? 'text-red-400' : 'text-orange-400'
                      }`}>
                        {getPriorityLabel(order.priority, order.status, elapsed, order.estimatedTime)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="bg-slate-600 rounded p-2">
                        <div className="font-medium">{item.name[selectedLanguage]} × {item.quantity}</div>
                        {item.allergies.length > 0 && (
                          <div className="text-xs text-red-300 mt-1">
                            <AlertTriangle className="w-3 h-3 inline mr-1" />
                            {item.allergies.join(', ')}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {order.specialNotes && (
                    <div className="bg-orange-900 text-orange-200 p-2 rounded text-sm mb-3">
                      <strong>{currentContent.specialNotes}:</strong> {order.specialNotes}
                    </div>
                  )}
                  
                  <button
                    onClick={() => updateOrderStatus(order.id, 'ready')}
                    className={`w-full py-2 px-4 rounded font-semibold transition-colors ${
                      isOverdue 
                        ? 'bg-red-600 hover:bg-red-700 text-white' 
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {currentContent.markReady}
                  </button>
                </div>
              );
            })}
          </div>
          
          {preparingOrders.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              <Flame className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <div>No orders in progress</div>
            </div>
          )}
        </div>

        {/* Ready to Serve */}
        <div className="bg-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-green-400 flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>{currentContent.readyToServe}</span>
            </h2>
            <div className="bg-green-600 text-white px-2 py-1 rounded text-sm font-bold">
              {readyOrders.length}
            </div>
          </div>
          
          <div className="space-y-3">
            {readyOrders.map((order) => (
              <div key={order.id} className="bg-slate-700 rounded-lg p-4 border-l-4 border-green-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold text-lg">#{order.id}</div>
                  <div className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                    {currentContent.completed}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                  <div>
                    <span className="text-slate-400">{currentContent.table}: </span>
                    <span className="font-medium">{order.tableNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">{currentContent.time}: </span>
                    <span className="font-medium">{order.actualTime}{currentContent.minutes}</span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="bg-slate-600 rounded p-2">
                      <div className="font-medium">{item.name[selectedLanguage]} × {item.quantity}</div>
                    </div>
                  ))}
                </div>
                
                {order.serviceType === 'takeaway' && (
                  <div className="bg-purple-900 text-purple-200 p-2 rounded text-sm">
                    <strong>TAKEAWAY ORDER</strong>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {readyOrders.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              <CheckCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <div>No orders ready</div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default QOKitchenDisplay;