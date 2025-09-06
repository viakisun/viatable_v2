import { useState, useEffect } from 'react';
import { Bell, Settings, LogOut } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';

const QOStaffDashboard = () => {
  const { language } = useLanguage();
  const [, setCurrentTime] = useState(new Date());
  const [, setIsOnShift] = useState(true);

  const content = {
    en: { title: "Dashboard", welcome: "Welcome back", shiftStatus: "Shift Status", clockOut: "Clock Out", todayStats: "Today's Overview", totalOrders: "Total Orders", totalRevenue: "Revenue", quickActions: "Quick Actions", viewOrders: "View Orders" },
    ko: { title: "대시보드", welcome: "안녕하세요", shiftStatus: "근무 상태", clockOut: "퇴근", todayStats: "오늘 현황", totalOrders: "총 주문", totalRevenue: "매출", quickActions: "빠른 작업", viewOrders: "주문 보기" }
  };

  const staffInfo = { name: "Sarah Johnson", avatar: "👩‍💼" };
  const todaysStats = { totalOrders: 127, totalRevenue: { AUD: 2847.50, KRW: 4100000 } };
  const currentContent = content[language];
  const currencySymbol = language === 'ko' ? '' : '$';
  const currencyCode = language === 'ko' ? 'KRW' : 'AUD';

  useEffect(() => { const timer = setInterval(() => setCurrentTime(new Date()), 1000); return () => clearInterval(timer); }, []);

  const HeaderActions = () => (
    <div className="flex items-center space-x-2">
      <button className="p-2 rounded-full bg-slate-100 text-slate-600"><Bell className="w-5 h-5" /></button>
      <button className="p-2 rounded-full bg-slate-100 text-slate-600"><Settings className="w-5 h-5" /></button>
      <button className="p-2 rounded-full bg-slate-100 text-slate-600"><LogOut className="w-5 h-5" /></button>
    </div>
  );

  return (
    <PageLayout title={currentContent.title} backLink={undefined} headerActions={<HeaderActions />}>
      <div className="space-y-6">
        {/* Welcome and Shift Status */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-slate-600">{currentContent.welcome}</p>
              <h2 className="text-xl font-bold text-slate-900">{staffInfo.name} {staffInfo.avatar}</h2>
            </div>
            <button onClick={() => setIsOnShift(false)} className="px-4 py-2 rounded-xl font-semibold bg-red-100 text-red-600">
              {currentContent.clockOut}
            </button>
          </div>
        </div>

        {/* Today's Stats */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="font-semibold text-slate-900 mb-4">{currentContent.todayStats}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-sm font-medium text-blue-800">{currentContent.totalOrders}</div>
              <div className="text-2xl font-bold text-blue-900">{todaysStats.totalOrders}</div>
            </div>
            <div className="bg-emerald-50 rounded-lg p-3">
              <div className="text-sm font-medium text-emerald-800">{currentContent.totalRevenue}</div>
              <div className="text-2xl font-bold text-emerald-900">{currencySymbol}{todaysStats.totalRevenue[currencyCode].toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Quick Actions and Recent Activity can be added here */}
      </div>
    </PageLayout>
  );
};

export default QOStaffDashboard;