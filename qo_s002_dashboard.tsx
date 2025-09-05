import React, { useState, useEffect } from 'react';
import { Bell, BellOff, Settings, LogOut, Clock, TrendingUp, Users, ShoppingBag, AlertTriangle, CheckCircle, Package, ChefHat, Utensils, MessageSquare, Star, Eye, MoreHorizontal, Play, Pause } from 'lucide-react';

const QOStaffDashboard = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnShift, setIsOnShift] = useState(true);
  const [shiftStart, setShiftStart] = useState(new Date(Date.now() - 4 * 60 * 60 * 1000)); // 4 hours ago
  const [notifications, setNotifications] = useState(true);
  const [newOrders, setNewOrders] = useState(3);

  const content = {
    en: {
      title: "Staff Dashboard",
      welcome: "Welcome back",
      shiftStatus: "Shift Status",
      shiftTime: "Shift Time",
      clockIn: "Clock In",
      clockOut: "Clock Out",
      breakTime: "Break",
      todayStats: "Today's Overview",
      totalOrders: "Total Orders",
      completedOrders: "Completed",
      pendingOrders: "Pending",
      avgOrderTime: "Avg. Order Time",
      totalRevenue: "Revenue",
      customerRating: "Rating",
      quickActions: "Quick Actions",
      viewOrders: "View Orders",
      menuManagement: "Menu",
      customerService: "Customer Service",
      reports: "Reports",
      recentActivity: "Recent Activity",
      newOrder: "New Order",
      orderReady: "Order Ready",
      customerRequest: "Customer Request",
      minutes: "min",
      minutesAgo: "minutes ago",
      notifications: "Notifications",
      settings: "Settings",
      logout: "Logout",
      orderQueue: "Order Queue",
      priorityOrders: "Priority Orders",
      specialRequests: "Special Requests",
      kitchenStatus: "Kitchen Status",
      staffOnline: "Staff Online",
      systemAlerts: "System Alerts"
    },
    ko: {
      title: "직원 대시보드",
      welcome: "안녕하세요",
      shiftStatus: "근무 상태",
      shiftTime: "근무 시간",
      clockIn: "출근",
      clockOut: "퇴근",
      breakTime: "휴게",
      todayStats: "오늘 현황",
      totalOrders: "총 주문",
      completedOrders: "완료",
      pendingOrders: "대기",
      avgOrderTime: "평균 주문시간",
      totalRevenue: "매출",
      customerRating: "고객 평점",
      quickActions: "빠른 작업",
      viewOrders: "주문 보기",
      menuManagement: "메뉴",
      customerService: "고객 서비스",
      reports: "리포트",
      recentActivity: "최근 활동",
      newOrder: "새 주문",
      orderReady: "주문 완료",
      customerRequest: "고객 요청",
      minutes: "분",
      minutesAgo: "분 전",
      notifications: "알림",
      settings: "설정",
      logout: "로그아웃",
      orderQueue: "주문 대기열",
      priorityOrders: "우선 주문",
      specialRequests: "특별 요청",
      kitchenStatus: "주방 상태",
      staffOnline: "온라인 직원",
      systemAlerts: "시스템 알림"
    }
  };

  const staffInfo = {
    name: "Sarah Johnson",
    role: "Manager",
    avatar: "👩‍💼",
    employeeId: "EMP001"
  };

  const todaysStats = {
    totalOrders: 127,
    completedOrders: 98,
    pendingOrders: 29,
    avgOrderTime: 14,
    totalRevenue: { AUD: 2847.50, KRW: 4100000 },
    customerRating: 4.8,
    peakHours: "12:00 - 14:00"
  };

  const recentActivities = [
    { id: 1, type: 'order', message: { en: 'New order #2024-128', ko: '새 주문 #2024-128' }, time: 2, priority: 'high' },
    { id: 2, type: 'ready', message: { en: 'Order #2024-125 ready for pickup', ko: '주문 #2024-125 픽업 준비' }, time: 5, priority: 'medium' },
    { id: 3, type: 'request', message: { en: 'Table 8 requested assistance', ko: '테이블 8 도움 요청' }, time: 8, priority: 'high' },
    { id: 4, type: 'complete', message: { en: 'Order #2024-124 completed', ko: '주문 #2024-124 완료' }, time: 12, priority: 'low' },
    { id: 5, type: 'order', message: { en: 'New order #2024-127', ko: '새 주문 #2024-127' }, time: 15, priority: 'medium' }
  ];

  const currentContent = content[selectedLanguage];
  const currencySymbol = selectedLanguage === 'ko' ? '' : '$';
  const currencyCode = selectedLanguage === 'ko' ? 'KRW' : 'AUD';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getShiftDuration = () => {
    if (!isOnShift) return "00:00:00";
    
    const now = currentTime;
    const diff = now.getTime() - shiftStart.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'order': return <ShoppingBag className="w-4 h-4 text-blue-600" />;
      case 'ready': return <Package className="w-4 h-4 text-green-600" />;
      case 'request': return <MessageSquare className="w-4 h-4 text-orange-600" />;
      case 'complete': return <CheckCircle className="w-4 h-4 text-green-600" />;
      default: return <Bell className="w-4 h-4 text-slate-600" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-orange-500 bg-orange-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-slate-500 bg-slate-50';
    }
  };

  const handleClockToggle = () => {
    if (isOnShift) {
      setIsOnShift(false);
      alert('Clocked out successfully');
    } else {
      setIsOnShift(true);
      setShiftStart(new Date());
      alert('Clocked in successfully');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">{staffInfo.avatar}</div>
              <div>
                <h1 className="font-bold text-slate-900">{currentContent.welcome}, {staffInfo.name}</h1>
                <p className="text-sm text-slate-600">{staffInfo.role} • ID: {staffInfo.employeeId}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {newOrders > 0 && (
                <div className="relative">
                  <Bell className="w-6 h-6 text-slate-600" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {newOrders}
                  </div>
                </div>
              )}
              
              <button
                onClick={() => setNotifications(!notifications)}
                className={`p-2 rounded-full ${notifications ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}
              >
                {notifications ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
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
              
              <button className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6">
        {/* Shift Status */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">{currentContent.shiftStatus}</h2>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              isOnShift ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'
            }`}>
              {isOnShift ? 'On Shift' : 'Off Shift'}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 font-mono">
                {getShiftDuration()}
              </div>
              <p className="text-sm text-slate-600">{currentContent.shiftTime}</p>
            </div>
            
            <div className="text-center">
              <button
                onClick={handleClockToggle}
                className={`px-4 py-2 rounded-xl font-semibold transition-colors ${
                  isOnShift 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                {isOnShift ? currentContent.clockOut : currentContent.clockIn}
              </button>
            </div>
          </div>
        </div>

        {/* Today's Stats */}
        <div className="bg-white rounded-xl p-4">
          <h2 className="font-semibold text-slate-900 mb-4">{currentContent.todayStats}</h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <ShoppingBag className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">{currentContent.totalOrders}</span>
              </div>
              <div className="text-2xl font-bold text-blue-900">{todaysStats.totalOrders}</div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">{currentContent.completedOrders}</span>
              </div>
              <div className="text-2xl font-bold text-green-900">{todaysStats.completedOrders}</div>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">{currentContent.pendingOrders}</span>
              </div>
              <div className="text-2xl font-bold text-orange-900">{todaysStats.pendingOrders}</div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">{currentContent.avgOrderTime}</span>
              </div>
              <div className="text-2xl font-bold text-purple-900">{todaysStats.avgOrderTime}{currentContent.minutes}</div>
            </div>
            
            <div className="bg-emerald-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-800">{currentContent.totalRevenue}</span>
              </div>
              <div className="text-2xl font-bold text-emerald-900">
                {currencySymbol}{todaysStats.totalRevenue[currencyCode].toLocaleString()}{selectedLanguage === 'ko' ? '원' : ''}
              </div>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">{currentContent.customerRating}</span>
              </div>
              <div className="text-2xl font-bold text-yellow-900">{todaysStats.customerRating}</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-4">
          <h2 className="font-semibold text-slate-900 mb-4">{currentContent.quickActions}</h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <button className="flex flex-col items-center space-y-2 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
              <Eye className="w-6 h-6 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">{currentContent.viewOrders}</span>
            </button>
            
            <button className="flex flex-col items-center space-y-2 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
              <Utensils className="w-6 h-6 text-green-600" />
              <span className="text-sm font-medium text-green-800">{currentContent.menuManagement}</span>
            </button>
            
            <button className="flex flex-col items-center space-y-2 p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
              <MessageSquare className="w-6 h-6 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">{currentContent.customerService}</span>
            </button>
            
            <button className="flex flex-col items-center space-y-2 p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors">
              <TrendingUp className="w-6 h-6 text-orange-600" />
              <span className="text-sm font-medium text-orange-800">{currentContent.reports}</span>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">{currentContent.recentActivity}</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className={`flex items-center space-x-3 p-3 rounded-lg border-l-4 ${getPriorityColor(activity.priority)}`}
              >
                {getActivityIcon(activity.type)}
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">
                    {activity.message[selectedLanguage]}
                  </p>
                  <p className="text-xs text-slate-500">
                    {activity.time} {currentContent.minutesAgo}
                  </p>
                </div>
                <button className="p-1 hover:bg-slate-200 rounded-full">
                  <MoreHorizontal className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4">
            <h3 className="font-semibold text-slate-900 mb-3">{currentContent.kitchenStatus}</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Active Orders</span>
                <span className="font-semibold text-slate-900">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Avg. Prep Time</span>
                <span className="font-semibold text-slate-900">8 min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Kitchen Load</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-slate-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">65%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4">
            <h3 className="font-semibold text-slate-900 mb-3">{currentContent.staffOnline}</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-slate-600">Kitchen Staff: 3/3</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-slate-600">Servers: 4/5</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-slate-600">Managers: 1/2</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QOStaffDashboard;