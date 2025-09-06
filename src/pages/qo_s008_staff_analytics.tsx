import { useState } from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';

type Period = 'today' | 'week' | 'month';

interface Trend {
  ordersProcessed: number;
  avgOrderTime: number;
  customerRating: number;
}

interface Metrics {
  ordersProcessed: number;
  avgOrderTime: number;
  customerRating: number;
  trend: Trend;
}

const QOStaffAnalytics = () => {
  const { language } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('today');

  const content = {
    en: { title: "Staff Analytics", periods: { today: "Today", week: "This Week", month: "This Month" }, metrics: { ordersProcessed: "Orders Processed", avgOrderTime: "Avg Order Time", customerRating: "Customer Rating" }, vs: "vs last period" },
    ko: { title: "직원 분석", periods: { today: "오늘", week: "이번 주", month: "이번 달" }, metrics: { ordersProcessed: "처리 주문", avgOrderTime: "평균 주문시간", customerRating: "고객 평점" }, vs: "지난 기간 대비" }
  };

  const personalMetrics: Record<Period, Metrics> = {
    today: { ordersProcessed: 23, avgOrderTime: 12.5, customerRating: 4.8, trend: { ordersProcessed: 8.7, avgOrderTime: -5.2, customerRating: 2.1 } },
    week: { ordersProcessed: 147, avgOrderTime: 13.2, customerRating: 4.7, trend: { ordersProcessed: 2.1, avgOrderTime: 1.5, customerRating: -1.1 } },
    month: { ordersProcessed: 612, avgOrderTime: 13.8, customerRating: 4.6, trend: { ordersProcessed: 5.2, avgOrderTime: 0.5, customerRating: 0.5 } }
  };

  const currentContent = content[language];
  const currentMetrics = personalMetrics[selectedPeriod];

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend < 0) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Activity className="w-4 h-4 text-slate-600" />;
  };

  return (
    <PageLayout title={currentContent.title} backLink="/qo-s-002">
      <div className="space-y-6">
        {/* Period Filters */}
        <div className="bg-white rounded-xl p-2">
          <div className="flex space-x-1">
            {Object.entries(currentContent.periods).map(([key, label]) => (
              <button key={key} onClick={() => setSelectedPeriod(key as Period)} className={`flex-1 py-2 rounded-lg text-sm font-medium ${selectedPeriod === key ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-2"><div className="text-sm text-slate-600">{currentContent.metrics.ordersProcessed}</div>{getTrendIcon(currentMetrics.trend.ordersProcessed)}</div>
            <div className="text-2xl font-bold text-slate-900">{currentMetrics.ordersProcessed}</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-2"><div className="text-sm text-slate-600">{currentContent.metrics.avgOrderTime}</div>{getTrendIcon(currentMetrics.trend.avgOrderTime)}</div>
            <div className="text-2xl font-bold text-slate-900">{currentMetrics.avgOrderTime} min</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-2"><div className="text-sm text-slate-600">{currentContent.metrics.customerRating}</div>{getTrendIcon(currentMetrics.trend.customerRating)}</div>
            <div className="text-2xl font-bold text-slate-900">{currentMetrics.customerRating}</div>
          </div>
        </div>

        {/* Placeholder for more charts/data */}
        <div className="bg-white rounded-xl p-4 text-center">
          <p className="text-slate-500">More detailed charts and analytics would be displayed here.</p>
        </div>
      </div>
    </PageLayout>
  );
};

export default QOStaffAnalytics;