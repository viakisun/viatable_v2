import { useState } from 'react';
import {
  Plus, Search, Edit, Copy, Eye, EyeOff,
  Upload, Download, Clock,
  ChefHat, Star, AlertTriangle, CheckCircle,
  MoreVertical, Users, TrendingUp
} from 'lucide-react';

const GlobalMenuManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [, setShowAddModal] = useState(false);

  // Mock data for menu items
  const menuItems = [
    {
      id: 'MENU-001',
      name: 'Korean BBQ Bulgogi',
      nameKr: '불고기',
      category: 'Main Course',
      description: 'Marinated beef with Korean spices, served with rice and vegetables',
      descriptionKr: '한국식 양념으로 재운 소고기, 밥과 채소와 함께 제공',
      price: { kr: '₩18,000', au: '$24.50' },
      image: '/api/placeholder/300/200',
      status: 'active',
      availability: {
        'Seoul Gangnam': true,
        'Seoul Hongdae': true,
        'Sydney CBD': true,
        'Melbourne': false,
        'Brisbane': true
      },
      tags: ['popular', 'signature', 'korean'],
      allergens: ['soy', 'gluten'],
      dietary: ['gluten-free-option'],
      prepTime: '15 min',
      popularity: 4.8,
      salesCount: 1247,
      revenue: '$30,352',
      lastUpdated: '2 hours ago',
      createdBy: 'Chef Kim'
    },
    {
      id: 'MENU-002',
      name: 'Aussie Meat Pie',
      nameKr: '호주식 미트파이',
      category: 'Main Course',
      description: 'Traditional Australian meat pie with beef mince and gravy',
      descriptionKr: '소고기 다짐육과 그레이비가 들어간 전통 호주식 미트파이',
      price: { kr: '₩12,000', au: '$16.50' },
      image: '/api/placeholder/300/200',
      status: 'active',
      availability: {
        'Seoul Gangnam': false,
        'Seoul Hongdae': false,
        'Sydney CBD': true,
        'Melbourne': true,
        'Brisbane': true
      },
      tags: ['australian', 'comfort-food'],
      allergens: ['gluten', 'egg'],
      dietary: [],
      prepTime: '12 min',
      popularity: 4.3,
      salesCount: 892,
      revenue: '$14,718',
      lastUpdated: '1 day ago',
      createdBy: 'Chef Wilson'
    },
    {
      id: 'MENU-003',
      name: 'Kimchi Fried Rice',
      nameKr: '김치볶음밥',
      category: 'Rice & Noodles',
      description: 'Spicy kimchi fried rice with vegetables and choice of protein',
      descriptionKr: '매콤한 김치볶음밥, 야채와 선택 가능한 단백질 포함',
      price: { kr: '₩14,000', au: '$19.00' },
      image: '/api/placeholder/300/200',
      status: 'draft',
      availability: {
        'Seoul Gangnam': true,
        'Seoul Hongdae': true,
        'Sydney CBD': false,
        'Melbourne': false,
        'Brisbane': false
      },
      tags: ['korean', 'spicy', 'vegetarian-option'],
      allergens: ['soy'],
      dietary: ['vegetarian', 'vegan-option'],
      prepTime: '10 min',
      popularity: 4.6,
      salesCount: 756,
      revenue: '$10,584',
      lastUpdated: '3 hours ago',
      createdBy: 'Chef Lee'
    },
    {
      id: 'MENU-004',
      name: 'Fish & Chips',
      nameKr: '피쉬 앤 칩스',
      category: 'Main Course',
      description: 'Beer-battered fish with crispy chips and mushy peas',
      descriptionKr: '맥주 반죽으로 튀긴 생선과 바삭한 감자튀김, 으깬 완두콩',
      price: { kr: '₩16,000', au: '$22.00' },
      image: '/api/placeholder/300/200',
      status: 'inactive',
      availability: {
        'Seoul Gangnam': false,
        'Seoul Hongdae': false,
        'Sydney CBD': true,
        'Melbourne': true,
        'Brisbane': true
      },
      tags: ['australian', 'seafood'],
      allergens: ['fish', 'gluten'],
      dietary: [],
      prepTime: '18 min',
      popularity: 4.1,
      salesCount: 634,
      revenue: '$13,948',
      lastUpdated: '1 week ago',
      createdBy: 'Chef Johnson'
    },
    {
      id: 'MENU-005',
      name: 'Bibimbap',
      nameKr: '비빔밥',
      category: 'Rice & Noodles',
      description: 'Mixed rice bowl with assorted vegetables, meat, and gochujang',
      descriptionKr: '다양한 채소와 고기, 고추장이 들어간 비빔밥',
      price: { kr: '₩15,000', au: '$20.50' },
      image: '/api/placeholder/300/200',
      status: 'active',
      availability: {
        'Seoul Gangnam': true,
        'Seoul Hongdae': true,
        'Sydney CBD': true,
        'Melbourne': true,
        'Brisbane': false
      },
      tags: ['korean', 'healthy', 'colorful'],
      allergens: ['soy', 'sesame'],
      dietary: ['vegetarian-option', 'gluten-free-option'],
      prepTime: '13 min',
      popularity: 4.7,
      salesCount: 1056,
      revenue: '$21,648',
      lastUpdated: '6 hours ago',
      createdBy: 'Chef Park'
    }
  ];

  const categories = ['All', 'Main Course', 'Rice & Noodles', 'Appetizers', 'Desserts', 'Beverages'];
  const locations = ['All', 'Seoul Gangnam', 'Seoul Hongdae', 'Sydney CBD', 'Melbourne', 'Brisbane'];
  const statuses = ['All', 'Active', 'Draft', 'Inactive'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'draft': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'inactive': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'draft': return <Edit className="w-4 h-4" />;
      case 'inactive': return <EyeOff className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.nameKr.includes(searchQuery) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesLocation = selectedLocation === 'all' || (item.availability as any)[selectedLocation];

    return matchesSearch && matchesCategory && matchesStatus && matchesLocation;
  });

  const MenuCard = ({ item }: { item: any }) => {
    const availableLocations = Object.entries(item.availability as any).filter(([, available]) => available).length;

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        {/* Image */}
        <div className="relative h-48 bg-gray-100">
          <img
            src={item.image as any}
            alt={item.name as any}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(item.status as any)}`}>
              {getStatusIcon(item.status as any)}
              <span className="capitalize">{item.status as any}</span>
            </div>
          </div>
          <div className="absolute top-3 right-3">
            <button className="p-1 bg-white rounded-full shadow-sm text-gray-600 hover:text-gray-800">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title and Category */}
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-gray-900">{item.name as any}</h3>
            <p className="text-sm text-gray-500">{item.nameKr as any}</p>
            <span className="inline-block px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-full mt-1">
              {item.category as any}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description as any}</p>

          {/* Price and Stats */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <p className="text-sm font-bold text-gray-900">{(item.price as any).kr}</p>
              <p className="text-xs text-gray-500">Korea</p>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <p className="text-sm font-bold text-gray-900">{(item.price as any).au}</p>
              <p className="text-xs text-gray-500">Australia</p>
            </div>
          </div>

          {/* Performance */}
          <div className="flex items-center justify-between mb-3 text-sm">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-medium">{item.popularity as any}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <Users className="w-4 h-4" />
              <span>{item.salesCount as any}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{item.prepTime as any}</span>
            </div>
          </div>

          {/* Availability */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-500">Available at:</span>
              <span className="font-medium text-gray-900">{availableLocations}/5 locations</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {Object.entries(item.availability as any).map(([location, available]) => (
                <span
                  key={location}
                  className={`text-xs px-2 py-1 rounded-full ${
                    available
                      ? 'bg-green-50 text-green-600'
                      : 'bg-gray-50 text-gray-400'
                  }`}
                >
                  {location.split(' ')[0]}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {(item.tags as any).slice(0, 3).map((tag: string, index: number) => (
                <span key={index} className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                  #{tag}
                </span>
              ))}
              {(item.tags as any).length > 3 && (
                <span className="text-xs px-2 py-1 bg-gray-50 text-gray-500 rounded-full">
                  +{(item.tags as any).length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Edit
            </button>
            <button className="px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Copy className="w-4 h-4" />
            </button>
            <button className="px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Global Menu Management</h1>
              <p className="text-sm text-gray-500 mt-1">Manage menu items across all locations</p>
            </div>

            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Upload className="w-4 h-4" />
                <span>Import</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Item</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Filters and Search */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat.toLowerCase()}>{cat}</option>
            ))}
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {locations.map(loc => (
              <option key={loc} value={loc === 'All' ? 'all' : loc}>{loc}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {statuses.map(status => (
              <option key={status} value={status.toLowerCase()}>{status}</option>
            ))}
          </select>

          <div className="flex border border-gray-300 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex-1 px-3 py-2 text-sm font-medium ${
                viewMode === 'grid'
                  ? 'bg-blue-50 text-blue-600 border-r border-gray-300'
                  : 'text-gray-500 hover:text-gray-700 border-r border-gray-300'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex-1 px-3 py-2 text-sm font-medium ${
                viewMode === 'table'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Table
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ChefHat className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{menuItems.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {menuItems.filter(item => item.status === 'active').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Edit className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Draft</p>
                <p className="text-2xl font-bold text-gray-900">
                  {menuItems.filter(item => item.status === 'draft').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(menuItems.reduce((sum, item) => sum + item.popularity, 0) / menuItems.length).toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img className="h-10 w-10 rounded-lg object-cover mr-3" src={item.image as any} alt={item.name as any} />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.name as any}</div>
                          <div className="text-sm text-gray-500">{item.nameKr as any}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-block px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-full">
                        {item.category as any}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>{(item.price as any).kr}</div>
                      <div className="text-gray-500">{(item.price as any).au}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(item.status as any)}`}>
                        {getStatusIcon(item.status as any)}
                        <span className="capitalize">{item.status as any}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {Object.entries(item.availability as any).filter(([, available]) => available).length}/5 locations
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span>{item.popularity as any}</span>
                      </div>
                      <div className="text-gray-500">{item.salesCount as any} orders</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">Edit</button>
                        <button className="text-gray-600 hover:text-gray-900">Copy</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
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

export default GlobalMenuManagement;
