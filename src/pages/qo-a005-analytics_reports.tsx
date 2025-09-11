import React, { useState } from 'react';
import {
  BarChart3, DollarSign, Clock,
  Download, RefreshCw, Share,
  Activity, Award, MapPin, ShoppingCart,
  Star, Utensils, ArrowUpRight,
  ArrowDownRight, AlertTriangle
} from 'lucide-react';

const AnalyticsReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedReport, setSelectedReport] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for analytics
  const analyticsData = {
    overview: {
      totalRevenue: { value: '$248,532', change: '+12.5%', isPositive: true },
      totalOrders: { value: '8,247', change: '+8.2%', isPositive: true },
      avgOrderValue: { value: '$30.14', change: '-2.1%', isPositive: false },
      customerSatisfaction: { value: '4.6', change: '+0.3', isPositive: true }
    },
    revenueChart: [
      { date: '2024-01-01', revenue: 12450, orders: 342 },
      { date: '2024-01-02', revenue: 13280, orders: 365 },
      { date: '2024-01-03', revenue: 11870, orders: 298 },
      { date: '2024-01-04', revenue: 15420, orders: 412 },
      { date: '2024-01-05', revenue: 14630, orders: 387 },
      { date: '2024-01-06', revenue: 16890, orders: 445 },
      { date: '2024-01-07', revenue: 18920, orders: 478 }
    ],
    topLocations: [
      { name: 'Seoul Gangnam', revenue: '$52,450', orders: 1342, growth: '+15.2%', efficiency: 95 },
      { name: 'Sydney CBD', revenue: '$48,280', orders: 1298, growth: '+8.7%', efficiency: 92 },
      { name: 'Seoul Hongdae', revenue: '$42,870', orders: 1167, growth: '+12.1%', efficiency: 88 },
      { name: 'Melbourne', revenue: '$38,920', orders: 1034, growth: '+5.3%', efficiency: 85 },
      { name: 'Brisbane', revenue: '$26,010', orders: 756, growth: '+18.9%', efficiency: 82 }
    ],
    topMenuItems: [
      { name: 'Korean BBQ Bulgogi', sales: 1247, revenue: '$30,352', rating: 4.8, trend: '+12%' },
      { name: 'Bibimbap', sales: 1056, revenue: '$21,648', rating: 4.7, trend: '+8%' },
      { name: 'Aussie Meat Pie', sales: 892, revenue: '$14,718', rating: 4.3, trend: '+5%' },
      { name: 'Kimchi Fried Rice', sales: 756, revenue: '$10,584', rating: 4.6, trend: '+15%' },
      { name: 'Fish & Chips', sales: 634, revenue: '$13,948', rating: 4.1, trend: '-3%' }
    ],
    customerMetrics: {
      newCustomers: { value: '1,247', change: '+23%', isPositive: true },
      returningCustomers: { value: '3,892', change: '+15%', isPositive: true },
      avgSessionTime: { value: '24 min', change: '+5%', isPositive: true },
      bounceRate: { value: '12%', change: '-8%', isPositive: true }
    },
    peakHours: [
      { hour: '11:00', orders: 45, efficiency: 85 },
      { hour: '12:00', orders: 78, efficiency: 92 },
      { hour: '13:00', orders: 95, efficiency: 88 },
      { hour: '18:00', orders: 112, efficiency: 94 },
      { hour: '19:00', orders: 134, efficiency: 96 },
      { hour: '20:00', orders: 98, efficiency: 91 }
    ]
  };

  const reportTypes = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'revenue', name: 'Revenue Analysis', icon: DollarSign },
    { id: 'customer', name: 'Customer Insights', icon: Users },
    { id: 'menu', name: 'Menu Performance', icon: Utensils },
    { id: 'operational', name: 'Operational Metrics', icon: Activity },
    { id: 'comparative', name: 'Location Comparison', icon: MapPin }
  ];

  const periods = [
    { value: '24hours', label: 'Last 24 Hours' },
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const locations = [
    { value: 'all', label: 'All Locations' },
    { value: 'seoul', label: 'Seoul (All)' },
    { value: 'australia', label: 'Australia (All)' },
    { value: 'seoul_gangnam', label: 'Seoul Gangnam' },
    { value: 'seoul_hongdae', label: 'Seoul Hongdae' },
    { value: 'sydney_cbd', label: 'Sydney CBD' },
    { value: 'melbourne', label: 'Melbourne' },
    { value: 'brisbane', label: 'Brisbane' }
  ];

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const MetricCard = ({ title, value, change, icon: Icon, isPositive }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Icon className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-1 text-sm font-medium ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          <span>{change}</span>
        </div>
      </div>
    </div>
  );

  const RevenueChart = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Revenue</span>
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <span className="text-sm text-gray-500">Orders</span>
          <div className="w-3 h-3 bg-green-600 rounded-full"></div>
        </div>
      </div>
      <div className="h-64 relative">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {/* Revenue line */}
          <polyline
            fill="none"
            stroke="#2563eb"
            strokeWidth="3"
            points="20,150 80,130 140,160 200,100 260,110 320,80 380,60"
          />
          {/* Orders line */}
          <polyline
            fill="none"
            stroke="#16a34a"
            strokeWidth="3"
            points="20,120 80,110 140,130 200,85 260,95 320,70 380,50"
          />
          {/* Data points */}
          {analyticsData.revenueChart.map((point, index) => (
            <g key={index}>
              <circle cx={20 + index * 60} cy={150 - (point.revenue / 200)} r="4" fill="#2563eb" />
              <circle cx={20 + index * 60} cy={120 - (point.orders / 5)} r="4" fill="#16a34a" />
            </g>
          ))}
        </svg>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 px-2">
          {analyticsData.revenueChart.map((point, index) => (
            <span key={index}>{new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          ))}
        </div>
      </div>
    </div>
  );

  const TopLocationsTable = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Location Performance</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efficiency</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {analyticsData.topLocations.map((location, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{location.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {location.revenue}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {location.orders}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-green-600">{location.growth}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${location.efficiency}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-900">{location.efficiency}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const TopMenuItems = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Top Menu Items</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
      </div>
      <div className="space-y-4">
        {analyticsData.topMenuItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-blue-600">{index + 1}</span>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                <div className="text-xs text-gray-500">{item.sales} orders • {item.revenue}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 text-sm">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-gray-900">{item.rating}</span>
              </div>
              <div className={`text-xs font-medium ${
                item.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {item.trend}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CustomerMetrics = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer Insights</h3>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(analyticsData.customerMetrics).map(([key, metric]) => (
          <div key={key} className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold text-gray-900">{metric.value}</p>
            <p className="text-xs text-gray-500 capitalize mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
            <div className={`text-xs font-medium ${
              metric.isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {metric.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const PeakHoursChart = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Peak Hours Analysis</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Orders per hour</span>
        </div>
      </div>
      <div className="space-y-3">
        {analyticsData.peakHours.map((hour, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-900 w-12">{hour.hour}</span>
              <div className="flex-1 w-32">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(hour.orders / 134) * 100}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-sm text-gray-600 w-8">{hour.orders}</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-500">Efficiency: {hour.efficiency}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
              <p className="text-sm text-gray-500 mt-1">Comprehensive business insights and performance analytics</p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex items-center space-x-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Share className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Filters and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {periods.map(period => (
                <option key={period.value} value={period.value}>{period.label}</option>
              ))}
            </select>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {locations.map(location => (
                <option key={location.value} value={location.value}>{location.label}</option>
              ))}
            </select>
          </div>

          <div className="flex space-x-2 overflow-x-auto">
            {reportTypes.map(report => (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedReport === report.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <report.icon className="w-4 h-4" />
                <span>{report.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            value={analyticsData.overview.totalRevenue.value}
            change={analyticsData.overview.totalRevenue.change}
            icon={DollarSign}
            isPositive={analyticsData.overview.totalRevenue.isPositive}
          />
          <MetricCard
            title="Total Orders"
            value={analyticsData.overview.totalOrders.value}
            change={analyticsData.overview.totalOrders.change}
            icon={ShoppingCart}
            isPositive={analyticsData.overview.totalOrders.isPositive}
          />
          <MetricCard
            title="Avg Order Value"
            value={analyticsData.overview.avgOrderValue.value}
            change={analyticsData.overview.avgOrderValue.change}
            icon={Target}
            isPositive={analyticsData.overview.avgOrderValue.isPositive}
          />
          <MetricCard
            title="Customer Rating"
            value={analyticsData.overview.customerSatisfaction.value}
            change={analyticsData.overview.customerSatisfaction.change}
            icon={Star}
            isPositive={analyticsData.overview.customerSatisfaction.isPositive}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <div className="space-y-6">
            <CustomerMetrics />
            <PeakHoursChart />
          </div>
        </div>

        {/* Secondary Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopLocationsTable />
          <TopMenuItems />
        </div>

        {/* Additional Insights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Growth Insights</h3>
                <p className="text-sm text-gray-500">Week over week performance</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Revenue Growth</span>
                <span className="text-sm font-medium text-green-600">+12.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">New Customers</span>
                <span className="text-sm font-medium text-green-600">+23.1%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Order Frequency</span>
                <span className="text-sm font-medium text-green-600">+8.3%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Attention Needed</h3>
                <p className="text-sm text-gray-500">Areas requiring focus</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Brisbane efficiency</span>
                <span className="text-sm font-medium text-yellow-600">82%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Fish & Chips trend</span>
                <span className="text-sm font-medium text-red-600">-3%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Peak hour wait</span>
                <span className="text-sm font-medium text-yellow-600">18 min</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Award className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Top Performers</h3>
                <p className="text-sm text-gray-500">Best performing areas</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Seoul Gangnam</span>
                <span className="text-sm font-medium text-blue-600">95% efficiency</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Bulgogi rating</span>
                <span className="text-sm font-medium text-blue-600">4.8★</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Brisbane growth</span>
                <span className="text-sm font-medium text-blue-600">+18.9%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReports;