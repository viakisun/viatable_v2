import React, { useState } from 'react';
import { 
  BarChart3, ShoppingCart, DollarSign,
  Bell, Settings, Search, Store, Globe,
  ArrowUpRight, ArrowDownRight, Star, AlertTriangle
} from 'lucide-react';

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Mock data
  const stats = {
    totalRevenue: { value: '$48,532', change: '+12.5%', isPositive: true },
    totalOrders: { value: '1,247', change: '+8.2%', isPositive: true },
    avgOrderValue: { value: '$38.94', change: '-2.1%', isPositive: false },
    activeLocations: { value: '12', change: '+1', isPositive: true }
  };

  const recentOrders = [
    { id: '#ORD-2024-001', table: 'T-05', amount: '$45.80', status: 'completed', time: '2 min ago', location: 'Seoul Gangnam' },
    { id: '#ORD-2024-002', table: 'T-12', amount: '$72.30', status: 'preparing', time: '5 min ago', location: 'Sydney CBD' },
    { id: '#ORD-2024-003', table: 'T-08', amount: '$28.90', status: 'pending', time: '8 min ago', location: 'Seoul Hongdae' },
    { id: '#ORD-2024-004', table: 'T-15', amount: '$91.20', status: 'completed', time: '12 min ago', location: 'Melbourne' },
    { id: '#ORD-2024-005', table: 'T-03', amount: '$56.40', status: 'cancelled', time: '15 min ago', location: 'Sydney CBD' }
  ];

  const topLocations = [
    { name: 'Seoul Gangnam', revenue: '$12,450', orders: 342, growth: '+15.2%' },
    { name: 'Sydney CBD', revenue: '$11,280', orders: 298, growth: '+8.7%' },
    { name: 'Seoul Hongdae', revenue: '$9,870', orders: 267, growth: '+12.1%' },
    { name: 'Melbourne', revenue: '$8,920', orders: 234, growth: '+5.3%' },
    { name: 'Brisbane', revenue: '$6,010', orders: 156, growth: '+18.9%' }
  ];

  const alerts = [
    { type: 'warning', message: 'Seoul Hongdae: High wait times detected', time: '5 min ago' },
    { type: 'info', message: 'Sydney CBD: New payment method configured', time: '15 min ago' },
    { type: 'success', message: 'Melbourne: Daily revenue target achieved', time: '1 hour ago' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'preparing': return 'text-blue-600 bg-blue-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'info': return <Bell className="w-4 h-4 text-blue-500" />;
      case 'success': return <Star className="w-4 h-4 text-green-500" />;
      default: return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">QR Order Admin</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Globe className="w-4 h-4" />
                <span>Global Dashboard</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders, locations..."
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Locations</option>
                <option value="seoul">Seoul</option>
                <option value="sydney">Sydney</option>
                <option value="melbourne">Melbourne</option>
                <option value="brisbane">Brisbane</option>
              </select>
              
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
              
              <button className="p-2 text-gray-500 hover:text-gray-700 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalRevenue.value}</p>
                </div>
              </div>
              <div className={`flex items-center space-x-1 text-sm font-medium ${
                stats.totalRevenue.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {stats.totalRevenue.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                <span>{stats.totalRevenue.change}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ShoppingCart className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalOrders.value}</p>
                </div>
              </div>
              <div className={`flex items-center space-x-1 text-sm font-medium ${
                stats.totalOrders.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {stats.totalOrders.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                <span>{stats.totalOrders.change}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.avgOrderValue.value}</p>
                </div>
              </div>
              <div className={`flex items-center space-x-1 text-sm font-medium ${
                stats.avgOrderValue.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {stats.avgOrderValue.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                <span>{stats.avgOrderValue.change}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Store className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Locations</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeLocations.value}</p>
                </div>
              </div>
              <div className={`flex items-center space-x-1 text-sm font-medium ${
                stats.activeLocations.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {stats.activeLocations.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                <span>{stats.activeLocations.change}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View All
                </button>
              </div>
            </div>
            <div className="overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Table</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.table}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Alerts & Top Locations */}
          <div className="space-y-6">
            {/* Alerts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {alerts.map((alert, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Locations */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Top Locations</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {topLocations.map((location, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{location.name}</p>
                          <p className="text-xs text-gray-500">{location.orders} orders</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{location.revenue}</p>
                        <p className="text-xs text-green-600">{location.growth}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;