import React, { useState } from 'react';
import { 
  Users, Search, Eye, EyeOff,
  Shield, Crown, User, Clock,
  TrendingUp, AlertTriangle, CheckCircle,
  MoreVertical, Key, UserPlus, Download, Upload
} from 'lucide-react';

const StaffManagement = () => {
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [, setShowAddModal] = useState(false);

  // Mock data for staff members
  const staffMembers = [
    {
      id: 'STAFF-001',
      name: 'Kim Minsoo',
      nameKr: '김민수',
      email: 'minsoo.kim@qrorder.com',
      phone: '+82-10-1234-5678',
      role: 'manager',
      location: 'Seoul Gangnam',
      status: 'active',
      avatar: '/api/placeholder/80/80',
      hireDate: '2023-01-15',
      lastLogin: '2 hours ago',
      permissions: ['order_management', 'menu_edit', 'staff_view', 'analytics_view'],
      performance: {
        ordersHandled: 1247,
        avgResponseTime: '2.3 min',
        customerRating: 4.8,
        efficiency: 95
      },
      workHours: '09:00 - 18:00',
      department: 'Operations',
      salary: '₩4,200,000',
      emergencyContact: '+82-10-9876-5432'
    },
    {
      id: 'STAFF-002',
      name: 'Sarah Johnson',
      nameKr: '사라 존슨',
      email: 'sarah.johnson@qrorder.com',
      phone: '+61-4-1234-5678',
      role: 'admin',
      location: 'Sydney CBD',
      status: 'active',
      avatar: '/api/placeholder/80/80',
      hireDate: '2022-08-20',
      lastLogin: '30 min ago',
      permissions: ['full_access'],
      performance: {
        ordersHandled: 0,
        avgResponseTime: '0 min',
        customerRating: 0,
        efficiency: 100
      },
      workHours: '08:00 - 17:00',
      department: 'Administration',
      salary: '$75,000',
      emergencyContact: '+61-4-9876-5432'
    },
    {
      id: 'STAFF-003',
      name: 'Lee Jihoon',
      nameKr: '이지훈',
      email: 'jihoon.lee@qrorder.com',
      phone: '+82-10-2345-6789',
      role: 'staff',
      location: 'Seoul Hongdae',
      status: 'active',
      avatar: '/api/placeholder/80/80',
      hireDate: '2023-06-10',
      lastLogin: '1 hour ago',
      permissions: ['order_management', 'customer_service'],
      performance: {
        ordersHandled: 892,
        avgResponseTime: '3.1 min',
        customerRating: 4.6,
        efficiency: 88
      },
      workHours: '14:00 - 23:00',
      department: 'Service',
      salary: '₩3,200,000',
      emergencyContact: '+82-10-8765-4321'
    },
    {
      id: 'STAFF-004',
      name: 'James Wilson',
      nameKr: '제임스 윌슨',
      email: 'james.wilson@qrorder.com',
      phone: '+61-4-3456-7890',
      role: 'manager',
      location: 'Melbourne',
      status: 'inactive',
      avatar: '/api/placeholder/80/80',
      hireDate: '2022-11-05',
      lastLogin: '3 days ago',
      permissions: ['order_management', 'menu_edit', 'staff_view', 'analytics_view'],
      performance: {
        ordersHandled: 756,
        avgResponseTime: '2.8 min',
        customerRating: 4.4,
        efficiency: 82
      },
      workHours: '10:00 - 19:00',
      department: 'Operations',
      salary: '$68,000',
      emergencyContact: '+61-4-7654-3210'
    },
    {
      id: 'STAFF-005',
      name: 'Emma Davis',
      nameKr: '엠마 데이비스',
      email: 'emma.davis@qrorder.com',
      phone: '+61-4-4567-8901',
      role: 'staff',
      location: 'Brisbane',
      status: 'on_leave',
      avatar: '/api/placeholder/80/80',
      hireDate: '2023-03-22',
      lastLogin: '1 week ago',
      permissions: ['order_management', 'customer_service'],
      performance: {
        ordersHandled: 634,
        avgResponseTime: '3.5 min',
        customerRating: 4.2,
        efficiency: 78
      },
      workHours: '11:00 - 20:00',
      department: 'Service',
      salary: '$52,000',
      emergencyContact: '+61-4-6543-2109'
    }
  ];

  const roles = ['All', 'Admin', 'Manager', 'Staff'];
  const locations = ['All', 'Seoul Gangnam', 'Seoul Hongdae', 'Sydney CBD', 'Melbourne', 'Brisbane'];
  const statuses = ['All', 'Active', 'Inactive', 'On Leave'];

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'manager': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'staff': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <Crown className="w-4 h-4" />;
      case 'manager': return <Shield className="w-4 h-4" />;
      case 'staff': return <User className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'inactive': return 'text-red-600 bg-red-50 border-red-200';
      case 'on_leave': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'inactive': return <EyeOff className="w-4 h-4" />;
      case 'on_leave': return <Clock className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         staff.nameKr.includes(searchQuery) ||
                         staff.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || staff.role === selectedRole.toLowerCase();
    const matchesLocation = selectedLocation === 'all' || staff.location === selectedLocation;
    const matchesStatus = selectedStatus === 'all' || staff.status === selectedStatus.toLowerCase().replace(' ', '_');
    
    return matchesSearch && matchesRole && matchesLocation && matchesStatus;
  });

  const StaffCard = ({ staff }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <img 
            src={staff.avatar} 
            alt={staff.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{staff.name}</h3>
            <p className="text-sm text-gray-500">{staff.nameKr}</p>
            <p className="text-sm text-gray-500">{staff.email}</p>
          </div>
        </div>
        <button className="p-1 text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* Role and Status */}
      <div className="flex items-center space-x-2 mb-4">
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border text-xs font-medium ${getRoleColor(staff.role)}`}>
          {getRoleIcon(staff.role)}
          <span className="capitalize">{staff.role}</span>
        </div>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(staff.status)}`}>
          {getStatusIcon(staff.status)}
          <span className="capitalize">{staff.status.replace('_', ' ')}</span>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-lg font-bold text-gray-900">{staff.performance.ordersHandled}</p>
          <p className="text-xs text-gray-500">Orders Handled</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-lg font-bold text-gray-900">{staff.performance.customerRating}</p>
          <p className="text-xs text-gray-500">Rating</p>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm mb-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Location:</span>
          <span className="font-medium text-gray-900">{staff.location}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Department:</span>
          <span className="font-medium text-gray-900">{staff.department}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Work Hours:</span>
          <span className="font-medium text-gray-900">{staff.workHours}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Hire Date:</span>
          <span className="font-medium text-gray-900">{new Date(staff.hireDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Last Login:</span>
          <span className="font-medium text-gray-900">{staff.lastLogin}</span>
        </div>
      </div>

      {/* Performance Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-gray-500">Efficiency</span>
          <span className="font-medium text-gray-900">{staff.performance.efficiency}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${staff.performance.efficiency}%` }}
          ></div>
        </div>
      </div>

      {/* Permissions */}
      <div className="mb-4">
        <span className="text-sm text-gray-500 mb-2 block">Permissions:</span>
        <div className="flex flex-wrap gap-1">
          {staff.permissions.slice(0, 3).map((permission, index) => (
            <span key={index} className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
              {permission.replace('_', ' ')}
            </span>
          ))}
          {staff.permissions.length > 3 && (
            <span className="text-xs px-2 py-1 bg-gray-50 text-gray-500 rounded-full">
              +{staff.permissions.length - 3}
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
          <Eye className="w-4 h-4" />
        </button>
        <button className="px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          <Key className="w-4 h-4" />
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
              <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
              <p className="text-sm text-gray-500 mt-1">Manage staff accounts and permissions</p>
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
                <UserPlus className="w-4 h-4" />
                <span>Add Staff</span>
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
              placeholder="Search staff members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select 
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {roles.map(role => (
              <option key={role} value={role.toLowerCase()}>{role}</option>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Staff</p>
                <p className="text-2xl font-bold text-gray-900">{staffMembers.length}</p>
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
                  {staffMembers.filter(s => s.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Crown className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Admins</p>
                <p className="text-2xl font-bold text-gray-900">
                  {staffMembers.filter(s => s.role === 'admin').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Shield className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Managers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {staffMembers.filter(s => s.role === 'manager').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Efficiency</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(staffMembers.reduce((sum, s) => sum + s.performance.efficiency, 0) / staffMembers.length)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Staff Members */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStaff.map((staff) => (
              <StaffCard key={staff.id} staff={staff} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStaff.map((staff) => (
                  <tr key={staff.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img className="h-10 w-10 rounded-full object-cover mr-3" src={staff.avatar} alt={staff.name} />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                          <div className="text-sm text-gray-500">{staff.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border text-xs font-medium ${getRoleColor(staff.role)}`}>
                        {getRoleIcon(staff.role)}
                        <span className="capitalize">{staff.role}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {staff.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(staff.status)}`}>
                        {getStatusIcon(staff.status)}
                        <span className="capitalize">{staff.status.replace('_', ' ')}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>{staff.performance.efficiency}%</div>
                      <div className="text-gray-500">{staff.performance.customerRating}★</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {staff.lastLogin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">Edit</button>
                        <button className="text-gray-600 hover:text-gray-900">View</button>
                        <button className="text-orange-600 hover:text-orange-900">Permissions</button>
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

export default StaffManagement;