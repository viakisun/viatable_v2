import React, { useState } from 'react';
import {
  MapPin, Store, Plus, Wifi, Power,
  Search, MoreVertical, Eye, Settings, TrendingUp, TrendingDown,
  CheckCircle, XCircle, AlertTriangle
} from 'lucide-react';

const MultiLocationManagement = () => {
  const [selectedView, setSelectedView] = useState('grid');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRegion, setFilterRegion] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for locations
  const locations = [
    {
      id: 'LOC-001',
      name: 'Seoul Gangnam',
      address: '123 Gangnam-daero, Gangnam-gu, Seoul',
      country: 'South Korea',
      region: 'Korea',
      status: 'active',
      manager: 'Kim Minsoo',
      phone: '+82-2-1234-5678',
      email: 'gangnam@qrorder.com',
      tables: 24,
      staff: 12,
      revenue: '$12,450',
      orders: 342,
      avgWaitTime: '8 min',
      customerSatisfaction: 4.8,
      lastOnline: '2 min ago',
      openingHours: '11:00 - 22:00',
      features: ['wifi', 'payment', 'kitchen_display'],
      growth: '+15.2%',
      isGrowthPositive: true
    },
    {
      id: 'LOC-002',
      name: 'Sydney CBD',
      address: '456 George Street, Sydney NSW 2000',
      country: 'Australia',
      region: 'Australia',
      status: 'active',
      manager: 'Sarah Johnson',
      phone: '+61-2-9876-5432',
      email: 'sydney@qrorder.com',
      tables: 18,
      staff: 8,
      revenue: '$11,280',
      orders: 298,
      avgWaitTime: '12 min',
      customerSatisfaction: 4.6,
      lastOnline: '1 min ago',
      openingHours: '10:00 - 23:00',
      features: ['wifi', 'payment'],
      growth: '+8.7%',
      isGrowthPositive: true
    },
    {
      id: 'LOC-003',
      name: 'Seoul Hongdae',
      address: '789 Hongik-ro, Mapo-gu, Seoul',
      country: 'South Korea',
      region: 'Korea',
      status: 'maintenance',
      manager: 'Lee Jihoon',
      phone: '+82-2-9876-5432',
      email: 'hongdae@qrorder.com',
      tables: 20,
      staff: 10,
      revenue: '$9,870',
      orders: 267,
      avgWaitTime: '18 min',
      customerSatisfaction: 4.4,
      lastOnline: '45 min ago',
      openingHours: '12:00 - 02:00',
      features: ['wifi'],
      growth: '+12.1%',
      isGrowthPositive: true
    },
    {
      id: 'LOC-004',
      name: 'Melbourne',
      address: '321 Collins Street, Melbourne VIC 3000',
      country: 'Australia',
      region: 'Australia',
      status: 'active',
      manager: 'James Wilson',
      phone: '+61-3-1234-5678',
      email: 'melbourne@qrorder.com',
      tables: 16,
      staff: 7,
      revenue: '$8,920',
      orders: 234,
      avgWaitTime: '10 min',
      customerSatisfaction: 4.7,
      lastOnline: '3 min ago',
      openingHours: '11:00 - 22:30',
      features: ['wifi', 'payment', 'kitchen_display'],
      growth: '+5.3%',
      isGrowthPositive: true
    },
    {
      id: 'LOC-005',
      name: 'Brisbane',
      address: '654 Queen Street, Brisbane QLD 4000',
      country: 'Australia',
      region: 'Australia',
      status: 'inactive',
      manager: 'Emma Davis',
      phone: '+61-7-8765-4321',
      email: 'brisbane@qrorder.com',
      tables: 14,
      staff: 6,
      revenue: '$6,010',
      orders: 156,
      avgWaitTime: '15 min',
      customerSatisfaction: 4.2,
      lastOnline: '2 days ago',
      openingHours: '10:30 - 21:30',
      features: ['wifi'],
      growth: '+18.9%',
      isGrowthPositive: true
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'maintenance': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'inactive': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'maintenance': return <AlertTriangle className="w-4 h-4" />;
      case 'inactive': return <XCircle className="w-4 h-4" />;
      default: return <Power className="w-4 h-4" />;
    }
  };

  const getFeatureIcon = (feature) => {
    switch (feature) {
      case 'wifi': return <Wifi className="w-4 h-4" />;
      case 'payment': return <CheckCircle className="w-4 h-4" />;
      case 'kitchen_display': return <Eye className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.manager.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || location.status === filterStatus;
    const matchesRegion = filterRegion === 'all' || location.region === filterRegion;

    return matchesSearch && matchesStatus && matchesRegion;
  });

  const LocationCard = ({ location }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Store className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{location.name}</h3>
            <p className="text-sm text-gray-500 flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {location.address}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(location.status)}`}>
            {getStatusIcon(location.status)}
            <span className="capitalize">{location.status}</span>
          </div>
          <button className="p-1 text-gray-400 hover:text-gray-600">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-lg font-bold text-gray-900">{location.revenue}</p>
          <p className="text-xs text-gray-500">Today's Revenue</p>
          <div className={`flex items-center justify-center space-x-1 text-xs font-medium mt-1 ${
            location.isGrowthPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {location.isGrowthPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>{location.growth}</span>
          </div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-lg font-bold text-gray-900">{location.orders}</p>
          <p className="text-xs text-gray-500">Orders</p>
          <p className="text-xs text-gray-500 mt-1">Avg wait: {location.avgWaitTime}</p>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Manager:</span>
          <span className="font-medium text-gray-900">{location.manager}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Tables:</span>
          <span className="font-medium text-gray-900">{location.tables}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Staff:</span>
          <span className="font-medium text-gray-900">{location.staff}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Rating:</span>
          <div className="flex items-center space-x-1">
            <span className="font-medium text-gray-900">{location.customerSatisfaction}</span>
            <span className="text-yellow-400">★</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Last Online:</span>
          <span className="font-medium text-gray-900">{location.lastOnline}</span>
        </div>
      </div>

      {/* Features */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Features:</span>
          <div className="flex items-center space-x-2">
            {location.features.map((feature, index) => (
              <div key={index} className="p-1 bg-blue-50 rounded text-blue-600" title={feature}>
                {getFeatureIcon(feature)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex space-x-2">
        <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Manage
        </button>
        <button className="px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          View Details
        </button>
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
              <h1 className="text-2xl font-bold text-gray-900">Location Management</h1>
              <p className="text-sm text-gray-500 mt-1">Manage all your restaurant locations</p>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Location</span>
            </button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search locations, managers, addresses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Regions</option>
            <option value="Korea">Korea</option>
            <option value="Australia">Australia</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="maintenance">Maintenance</option>
            <option value="inactive">Inactive</option>
          </select>

          <div className="flex border border-gray-300 rounded-lg">
            <button
              onClick={() => setSelectedView('grid')}
              className={`px-3 py-2 text-sm font-medium ${
                selectedView === 'grid'
                  ? 'bg-blue-50 text-blue-600 border-r border-gray-300'
                  : 'text-gray-500 hover:text-gray-700 border-r border-gray-300'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setSelectedView('list')}
              className={`px-3 py-2 text-sm font-medium ${
                selectedView === 'list'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              List
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Store className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Locations</p>
                <p className="text-2xl font-bold text-gray-900">{locations.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {locations.filter(l => l.status === 'active').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Maintenance</p>
                <p className="text-2xl font-bold text-gray-900">
                  {locations.filter(l => l.status === 'maintenance').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Inactive</p>
                <p className="text-2xl font-bold text-gray-900">
                  {locations.filter(l => l.status === 'inactive').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Locations Grid/List */}
        {selectedView === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLocations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manager</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Online</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLocations.map((location) => (
                  <tr key={location.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg mr-3">
                          <Store className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{location.name}</div>
                          <div className="text-sm text-gray-500">{location.country}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(location.status)}`}>
                        {getStatusIcon(location.status)}
                        <span className="capitalize">{location.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {location.manager}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{location.revenue}</div>
                      <div className={`text-xs ${location.isGrowthPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {location.growth}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {location.lastOnline}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">Edit</button>
                        <button className="text-gray-600 hover:text-gray-900">View</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiLocationManagement;