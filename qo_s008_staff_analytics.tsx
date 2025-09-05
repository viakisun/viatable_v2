import React, { useState, useEffect } from 'react';
import { ChevronLeft, TrendingUp, TrendingDown, Clock, Star, Users, DollarSign, Target, Award, Calendar, BarChart3, PieChart, Activity, CheckCircle, AlertTriangle } from 'lucide-react';

const QOStaffAnalytics = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedView, setSelectedView] = useState('personal'); // personal, team, comparison
  const [currentTime, setCurrentTime] = useState(new Date());

  const content = {
    en: {
      title: "Staff Analytics",
      backToDashboard: "Dashboard",
      periods: {
        today: "Today",
        week: "This Week",
        month: "This Month",
        quarter: "This Quarter"
      },
      views: {
        personal: "Personal Performance",
        team: "Team Performance", 
        comparison: "Team Comparison"
      },
      metrics: {
        ordersProcessed: "Orders Processed",
        avgOrderTime: "Avg Order Time",
        customerRating: "Customer Rating",
        revenue: "Revenue Generated",
        efficiency: "Efficiency Score",
        responseTime: "Response Time",
        completionRate: "Completion Rate",
        errorRate: "Error Rate",
        upselling: "Upselling Success",
        teamwork: "Teamwork Score"
      },
      performance: {
        excellent: "Excellent",
        good: "Good",
        average: "Average",
        needsImprovement: "Needs Improvement"
      },
      goals: {
        title: "Performance Goals",
        daily: "Daily Goals",
        weekly: "Weekly Goals",
        monthly: "Monthly Goals",
        achieved: "Achieved",
        inProgress: "In Progress",
        notStarted: "Not Started"
      },
      achievements: {
        title: "Recent Achievements",
        speedyService: "Speedy Service",
        customerFavorite: "Customer Favorite",
        teamPlayer: "Team Player",
        salesStar: "Sales Star",
        perfectDay: "Perfect Day",
        innovator: "Innovator"
      },
      trends: {
        title: "Performance Trends",
        improvement: "Improvement",
        stable: "Stable",
        decline: "Decline"
      },
      teamStats: {
        totalStaff: "Total Staff",
        onShift: "On Shift",
        topPerformer: "Top Performer",
        avgTeamRating: "Avg Team Rating"
      },
      minutes: "min",
      hours: "hours",
      currency: "AUD",
      percentage: "%",
      vs: "vs",
      lastPeriod: "last period",
      rank: "Rank",
      outOf: "out of"
    },
    ko: {
      title: "직원 분석",
      backToDashboard: "대시보드",
      periods: {
        today: "오늘",
        week: "이번 주",
        month: "이번 달",
        quarter: "이번 분기"
      },
      views: {
        personal: "개인 성과",
        team: "팀 성과",
        comparison: "팀 비교"
      },
      metrics: {
        ordersProcessed: "처리한 주문",
        avgOrderTime: "평균 주문시간",
        customerRating: "고객 평점",
        revenue: "생성한 매출",
        efficiency: "효율성 점수",
        responseTime: "응답 시간",
        completionRate: "완료율",
        errorRate: "오류율",
        upselling: "업셀링 성공률",
        teamwork: "팀워크 점수"
      },
      performance: {
        excellent: "우수",
        good: "양호",
        average: "보통",
        needsImprovement: "개선 필요"
      },
      goals: {
        title: "성과 목표",
        daily: "일일 목표",
        weekly: "주간 목표", 
        monthly: "월간 목표",
        achieved: "달성",
        inProgress: "진행 중",
        notStarted: "시작 안함"
      },
      achievements: {
        title: "최근 성과",
        speedyService: "신속한 서비스",
        customerFavorite: "고객 선호",
        teamPlayer: "팀 플레이어",
        salesStar: "판매 스타",
        perfectDay: "완벽한 하루",
        innovator: "혁신가"
      },
      trends: {
        title: "성과 추세",
        improvement: "개선",
        stable: "안정",
        decline: "하락"
      },
      teamStats: {
        totalStaff: "전체 직원",
        onShift: "근무 중",
        topPerformer: "최고 성과자",
        avgTeamRating: "평균 팀 평점"
      },
      minutes: "분",
      hours: "시간",
      currency: "원",
      percentage: "%",
      vs: "대비",
      lastPeriod: "지난 기간",
      rank: "순위",
      outOf: "명 중"
    }
  };

  const personalMetrics = {
    today: {
      ordersProcessed: 23,
      avgOrderTime: 12.5,
      customerRating: 4.8,
      revenue: { AUD: 487.50, KRW: 702500 },
      efficiency: 94,
      responseTime: 2.3,
      completionRate: 98,
      errorRate: 1.2,
      upselling: 35,
      teamwork: 92,
      trend: {
        ordersProcessed: 8.7,
        avgOrderTime: -5.2,
        customerRating: 2.1,
        revenue: 12.3,
        efficiency: 1.8,
        responseTime: -12.5,
        completionRate: 0.8,
        errorRate: -15.3,
        upselling: 5.4,
        teamwork: 3.2
      }
    },
    week: {
      ordersProcessed: 147,
      avgOrderTime: 13.2,
      customerRating: 4.7,
      revenue: { AUD: 3245.80, KRW: 4680000 },
      efficiency: 91,
      responseTime: 2.8,
      completionRate: 96,
      errorRate: 2.1,
      upselling: 32,
      teamwork: 89
    }
  };

  const teamMetrics = {
    totalStaff: 12,
    onShift: 8,
    topPerformer: "Emma Wilson",
    avgTeamRating: 4.6,
    teamComparison: [
      { name: "Sarah Johnson", role: "Manager", ordersProcessed: 23, rating: 4.8, efficiency: 94, rank: 1 },
      { name: "Emma Wilson", role: "Server", ordersProcessed: 28, rating: 4.9, efficiency: 96, rank: 2 },
      { name: "Tom Rodriguez", role: "Server", ordersProcessed: 19, rating: 4.6, efficiency: 88, rank: 3 },
      { name: "Mike Chen", role: "Chef", ordersProcessed: 45, rating: 4.7, efficiency: 92, rank: 4 },
      { name: "Lisa Park", role: "Server", ordersProcessed: 16, rating: 4.5, efficiency: 85, rank: 5 }
    ]
  };

  const achievements = [
    {
      id: 1,
      type: 'speedyService',
      title: { en: 'Speedy Service Award', ko: '신속 서비스상' },
      description: { en: 'Processed 20+ orders with avg time under 15 min', ko: '15분 이내 평균 시간으로 20개 이상 주문 처리' },
      achievedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      icon: '🚀',
      points: 50
    },
    {
      id: 2,
      type: 'customerFavorite',
      title: { en: 'Customer Favorite', ko: '고객 선호상' },
      description: { en: 'Maintained 4.8+ rating for the week', ko: '주간 4.8점 이상 평점 유지' },
      achievedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      icon: '⭐',
      points: 75
    },
    {
      id: 3,
      type: 'teamPlayer',
      title: { en: 'Team Player Award', ko: '팀 플레이어상' },
      description: { en: 'Helped colleagues during peak hours', ko: '피크 시간 동안 동료들을 도움' },
      achievedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      icon: '🤝',
      points: 40
    }
  ];

  const goals = {
    daily: [
      { id: 1, title: { en: 'Process 25 orders', ko: '25개 주문 처리' }, target: 25, current: 23, status: 'inProgress' },
      { id: 2, title: { en: 'Maintain 4.7+ rating', ko: '4.7점 이상 평점 유지' }, target: 4.7, current: 4.8, status: 'achieved' },
      { id: 3, title: { en: 'Keep avg time under 13 min', ko: '평균 시간 13분 이하 유지' }, target: 13, current: 12.5, status: 'achieved' }
    ],
    weekly: [
      { id: 4, title: { en: 'Generate $3000+ revenue', ko: '3000달러 이상 매출 창출' }, target: 3000, current: 3245.80, status: 'achieved' },
      { id: 5, title: { en: 'Complete training module', ko: '교육 모듈 완료' }, target: 1, current: 0, status: 'notStarted' },
      { id: 6, title: { en: 'Zero customer complaints', ko: '고객 불만 제로' }, target: 0, current: 0, status: 'achieved' }
    ]
  };

  const currentContent = content[selectedLanguage];
  const currencySymbol = selectedLanguage === 'ko' ? '' : '$';
  const currencyCode = selectedLanguage === 'ko' ? 'KRW' : 'AUD';
  const currentMetrics = personalMetrics[selectedPeriod] || personalMetrics.today;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getPerformanceLevel = (score) => {
    if (score >= 90) return { level: 'excellent', color: 'text-green-600' };
    if (score >= 80) return { level: 'good', color: 'text-blue-600' };
    if (score >= 70) return { level: 'average', color: 'text-yellow-600' };
    return { level: 'needsImprovement', color: 'text-red-600' };
  };

  const getTrendIcon = (trend) => {
    if (trend > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend < 0) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Activity className="w-4 h-4 text-slate-600" />;
  };

  const getGoalStatus = (goal) => {
    if (goal.status === 'achieved') return { color: 'bg-green-100 text-green-800', icon: <CheckCircle className="w-4 h-4" /> };
    if (goal.status === 'inProgress') return { color: 'bg-blue-100 text-blue-800', icon: <Clock className="w-4 h-4" /> };
    return { color: 'bg-slate-100 text-slate-600', icon: <AlertTriangle className="w-4 h-4" /> };
  };

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const PersonalView = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-slate-600">{currentContent.metrics.ordersProcessed}</div>
            {currentMetrics.trend && getTrendIcon(currentMetrics.trend.ordersProcessed)}
          </div>
          <div className="text-2xl font-bold text-slate-900">{currentMetrics.ordersProcessed}</div>
          {currentMetrics.trend && (
            <div className="text-xs text-slate-500">
              {currentMetrics.trend.ordersProcessed > 0 ? '+' : ''}{currentMetrics.trend.ordersProcessed}% {currentContent.vs} {currentContent.lastPeriod}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-slate-600">{currentContent.metrics.avgOrderTime}</div>
            {currentMetrics.trend && getTrendIcon(currentMetrics.trend.avgOrderTime)}
          </div>
          <div className="text-2xl font-bold text-slate-900">{currentMetrics.avgOrderTime}{currentContent.minutes}</div>
          {currentMetrics.trend && (
            <div className="text-xs text-slate-500">
              {currentMetrics.trend.avgOrderTime > 0 ? '+' : ''}{currentMetrics.trend.avgOrderTime}% {currentContent.vs} {currentContent.lastPeriod}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-slate-600">{currentContent.metrics.customerRating}</div>
            {currentMetrics.trend && getTrendIcon(currentMetrics.trend.customerRating)}
          </div>
          <div className="text-2xl font-bold text-slate-900">{currentMetrics.customerRating}</div>
          {currentMetrics.trend && (
            <div className="text-xs text-slate-500">
              {currentMetrics.trend.customerRating > 0 ? '+' : ''}{currentMetrics.trend.customerRating}% {currentContent.vs} {currentContent.lastPeriod}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-slate-600">{currentContent.metrics.revenue}</div>
            {currentMetrics.trend && getTrendIcon(currentMetrics.trend.revenue)}
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {currencySymbol}{currentMetrics.revenue[currencyCode].toLocaleString()}{selectedLanguage === 'ko' ? '원' : ''}
          </div>
          {currentMetrics.trend && (
            <div className="text-xs text-slate-500">
              {currentMetrics.trend.revenue > 0 ? '+' : ''}{currentMetrics.trend.revenue}% {currentContent.vs} {currentContent.lastPeriod}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-slate-600">{currentContent.metrics.efficiency}</div>
            {currentMetrics.trend && getTrendIcon(currentMetrics.trend.efficiency)}
          </div>
          <div className="text-2xl font-bold text-slate-900">{currentMetrics.efficiency}%</div>
          {currentMetrics.trend && (
            <div className="text-xs text-slate-500">
              {currentMetrics.trend.efficiency > 0 ? '+' : ''}{currentMetrics.trend.efficiency}% {currentContent.vs} {currentContent.lastPeriod}
            </div>
          )}
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-4">
          <h3 className="font-semibold text-slate-900 mb-4">Detailed Performance</h3>
          <div className="space-y-4">
            {[
              { key: 'responseTime', value: currentMetrics.responseTime, unit: currentContent.minutes, trend: currentMetrics.trend?.responseTime },
              { key: 'completionRate', value: currentMetrics.completionRate, unit: '%', trend: currentMetrics.trend?.completionRate },
              { key: 'errorRate', value: currentMetrics.errorRate, unit: '%', trend: currentMetrics.trend?.errorRate },
              { key: 'upselling', value: currentMetrics.upselling, unit: '%', trend: currentMetrics.trend?.upselling },
              { key: 'teamwork', value: currentMetrics.teamwork, unit: '%', trend: currentMetrics.trend?.teamwork }
            ].map((metric) => {
              const performance = getPerformanceLevel(metric.value);
              return (
                <div key={metric.key} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-slate-900">{currentContent.metrics[metric.key]}</div>
                    <div className={`text-sm ${performance.color}`}>
                      {currentContent.performance[performance.level]}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold">{metric.value}{metric.unit}</span>
                    {metric.trend && getTrendIcon(metric.trend)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl p-4">
          <h3 className="font-semibold text-slate-900 mb-4">{currentContent.achievements.title}</h3>
          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="font-medium text-slate-900">{achievement.title[selectedLanguage]}</div>
                  <div className="text-sm text-slate-600">{achievement.description[selectedLanguage]}</div>
                  <div className="text-xs text-slate-500">
                    {achievement.achievedAt.toLocaleDateString()} • +{achievement.points} points
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Goals */}
      <div className="bg-white rounded-xl p-4">
        <h3 className="font-semibold text-slate-900 mb-4">{currentContent.goals.title}</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-slate-700 mb-3">{currentContent.goals.daily}</h4>
            <div className="space-y-3">
              {goals.daily.map((goal) => {
                const status = getGoalStatus(goal);
                const progress = getProgressPercentage(goal.current, goal.target);
                return (
                  <div key={goal.id} className="bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-slate-900">{goal.title[selectedLanguage]}</div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${status.color}`}>
                        {status.icon}
                        <span>{currentContent.goals[goal.status]}</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">{goal.current} / {goal.target}</span>
                      <span className="font-medium">{progress.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                      <div 
                        className={`h-2 rounded-full transition-all ${
                          goal.status === 'achieved' ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-slate-700 mb-3">{currentContent.goals.weekly}</h4>
            <div className="space-y-3">
              {goals.weekly.map((goal) => {
                const status = getGoalStatus(goal);
                const progress = getProgressPercentage(goal.current, goal.target);
                return (
                  <div key={goal.id} className="bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-slate-900">{goal.title[selectedLanguage]}</div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${status.color}`}>
                        {status.icon}
                        <span>{currentContent.goals[goal.status]}</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">{goal.current} / {goal.target}</span>
                      <span className="font-medium">{progress.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                      <div 
                        className={`h-2 rounded-full transition-all ${
                          goal.status === 'achieved' ? 'bg-green-500' : 
                          goal.status === 'inProgress' ? 'bg-blue-500' : 'bg-slate-400'
                        }`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TeamView = () => (
    <div className="space-y-6">
      {/* Team Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4">
          <div className="text-sm text-slate-600">{currentContent.teamStats.totalStaff}</div>
          <div className="text-2xl font-bold text-slate-900">{teamMetrics.totalStaff}</div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="text-sm text-slate-600">{currentContent.teamStats.onShift}</div>
          <div className="text-2xl font-bold text-blue-600">{teamMetrics.onShift}</div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="text-sm text-slate-600">{currentContent.teamStats.topPerformer}</div>
          <div className="text-lg font-bold text-green-600">{teamMetrics.topPerformer}</div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="text-sm text-slate-600">{currentContent.teamStats.avgTeamRating}</div>
          <div className="text-2xl font-bold text-yellow-600">{teamMetrics.avgTeamRating}</div>
        </div>
      </div>

      {/* Team Comparison */}
      <div className="bg-white rounded-xl p-4">
        <h3 className="font-semibold text-slate-900 mb-4">Team Performance Ranking</h3>
        <div className="space-y-3">
          {teamMetrics.teamComparison.map((member, index) => (
            <div key={member.name} className={`flex items-center justify-between p-3 rounded-lg ${
              index === 0 ? 'bg-yellow-50 border border-yellow-200' : 'bg-slate-50'
            }`}>
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  index === 0 ? 'bg-yellow-500 text-white' :
                  index === 1 ? 'bg-slate-400 text-white' :
                  index === 2 ? 'bg-orange-500 text-white' :
                  'bg-slate-200 text-slate-600'
                }`}>
                  #{member.rank}
                </div>
                <div>
                  <div className="font-medium text-slate-900">{member.name}</div>
                  <div className="text-sm text-slate-600">{member.role}</div>
                </div>
                {index === 0 && (
                  <Award className="w-5 h-5 text-yellow-500" />
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-medium text-slate-900">{member.ordersProcessed}</div>
                  <div className="text-slate-500">Orders</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-slate-900">{member.rating}</div>
                  <div className="text-slate-500">Rating</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-slate-900">{member.efficiency}%</div>
                  <div className="text-slate-500">Efficiency</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

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

          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-slate-900">{currentContent.title}</h1>
            <div className="text-sm text-slate-500">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </header>

      {/* Controls */}
      <div className="p-4">
        <div className="bg-white rounded-xl p-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-3 lg:space-y-0">
            <div className="flex space-x-2 overflow-x-auto">
              {Object.entries(currentContent.views).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSelectedView(key)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedView === key
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex space-x-2 overflow-x-auto">
              {Object.entries(currentContent.periods).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSelectedPeriod(key)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedPeriod === key
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="p-4 pb-20">
        {selectedView === 'personal' && <PersonalView />}
        {selectedView === 'team' && <TeamView />}
        {selectedView === 'comparison' && <TeamView />}
      </main>
    </div>
  );
};

export default QOStaffAnalytics;