import React, { useState, useEffect } from 'react';
import { ChevronLeft, QrCode, Users, Clock, CheckCircle, AlertTriangle, RefreshCw, Edit3, Eye, Printer, Settings, Plus, Trash2, MapPin, Wifi, Phone, MessageSquare } from 'lucide-react';

const QOTableManagement = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedArea, setSelectedArea] = useState('all');
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [editingTable, setEditingTable] = useState(null);

  const content = {
    en: {
      title: "Table Management",
      backToDashboard: "Dashboard",
      areas: {
        all: "All Areas",
        indoor: "Indoor Dining",
        outdoor: "Outdoor Patio",
        bar: "Bar Area",
        private: "Private Rooms"
      },
      tableStatus: {
        available: "Available",
        occupied: "Occupied",
        reserved: "Reserved",
        cleaning: "Cleaning",
        outOfOrder: "Out of Order"
      },
      actions: {
        viewQR: "View QR Code",
        printQR: "Print QR",
        editTable: "Edit Table",
        markCleaning: "Mark for Cleaning",
        markAvailable: "Mark Available",
        markOutOfOrder: "Mark Out of Order",
        addTable: "Add New Table",
        deleteTable: "Delete Table",
        callCustomer: "Call Customer",
        sendMessage: "Send Message"
      },
      tableInfo: {
        tableNumber: "Table",
        capacity: "Capacity",
        area: "Area",
        status: "Status",
        occupiedSince: "Occupied Since",
        currentOrder: "Current Order",
        estimatedTime: "Est. Completion",
        customerCount: "Customers",
        totalAmount: "Total Amount"
      },
      stats: {
        totalTables: "Total Tables",
        available: "Available",
        occupied: "Occupied", 
        outOfOrder: "Out of Order",
        occupancyRate: "Occupancy Rate",
        avgTurnover: "Avg Turnover"
      },
      qrModal: {
        title: "QR Code",
        description: "Customers can scan this QR code to access the menu and place orders",
        tableInfo: "Table Information",
        downloadQR: "Download QR Code",
        printQR: "Print QR Code",
        regenerateQR: "Regenerate QR Code",
        close: "Close"
      },
      editModal: {
        title: "Edit Table",
        tableNumber: "Table Number",
        capacity: "Capacity (People)",
        area: "Area",
        notes: "Notes",
        save: "Save Changes",
        cancel: "Cancel"
      },
      minutes: "min",
      people: "people",
      currency: "AUD",
      ago: "ago",
      turnoverTime: "Turnover Time"
    },
    ko: {
      title: "테이블 관리",
      backToDashboard: "대시보드",
      areas: {
        all: "전체 구역",
        indoor: "실내 다이닝",
        outdoor: "야외 테라스",
        bar: "바 구역",
        private: "프라이빗 룸"
      },
      tableStatus: {
        available: "이용 가능",
        occupied: "사용 중",
        reserved: "예약됨",
        cleaning: "청소 중",
        outOfOrder: "사용 불가"
      },
      actions: {
        viewQR: "QR 코드 보기",
        printQR: "QR 코드 출력",
        editTable: "테이블 편집",
        markCleaning: "청소 중으로 변경",
        markAvailable: "이용 가능으로 변경",
        markOutOfOrder: "사용 불가로 변경",
        addTable: "새 테이블 추가",
        deleteTable: "테이블 삭제",
        callCustomer: "고객 통화",
        sendMessage: "메시지 전송"
      },
      tableInfo: {
        tableNumber: "테이블",
        capacity: "수용인원",
        area: "구역",
        status: "상태",
        occupiedSince: "이용 시작",
        currentOrder: "현재 주문",
        estimatedTime: "완료 예정",
        customerCount: "고객 수",
        totalAmount: "총 금액"
      },
      stats: {
        totalTables: "총 테이블",
        available: "이용 가능",
        occupied: "사용 중",
        outOfOrder: "사용 불가",
        occupancyRate: "점유율",
        avgTurnover: "평균 회전율"
      },
      qrModal: {
        title: "QR 코드",
        description: "고객이 이 QR 코드를 스캔하여 메뉴를 확인하고 주문할 수 있습니다",
        tableInfo: "테이블 정보",
        downloadQR: "QR 코드 다운로드",
        printQR: "QR 코드 출력",
        regenerateQR: "QR 코드 재생성",
        close: "닫기"
      },
      editModal: {
        title: "테이블 편집",
        tableNumber: "테이블 번호",
        capacity: "수용인원 (명)",
        area: "구역",
        notes: "메모",
        save: "변경사항 저장",
        cancel: "취소"
      },
      minutes: "분",
      people: "명",
      currency: "원",
      ago: "전",
      turnoverTime: "회전 시간"
    }
  };

  const [tables, setTables] = useState([
    {
      id: 1,
      tableNumber: "1",
      capacity: 2,
      area: "indoor",
      status: "occupied",
      occupiedSince: new Date(Date.now() - 45 * 60000),
      currentOrder: "2024-128",
      estimatedCompletion: new Date(Date.now() + 10 * 60000),
      customerCount: 2,
      totalAmount: { AUD: 42.20, KRW: 62000 },
      qrCode: "QR_TABLE_001",
      notes: "Window seat, preferred by regulars"
    },
    {
      id: 2,
      tableNumber: "2",
      capacity: 4,
      area: "indoor", 
      status: "available",
      lastCleaned: new Date(Date.now() - 15 * 60000),
      qrCode: "QR_TABLE_002",
      notes: ""
    },
    {
      id: 3,
      tableNumber: "3",
      capacity: 2,
      area: "indoor",
      status: "cleaning",
      cleaningStarted: new Date(Date.now() - 8 * 60000),
      qrCode: "QR_TABLE_003",
      notes: "Near kitchen, can be noisy during peak hours"
    },
    {
      id: 4,
      tableNumber: "4", 
      capacity: 6,
      area: "indoor",
      status: "reserved",
      reservationTime: new Date(Date.now() + 30 * 60000),
      customerName: "Johnson Party",
      qrCode: "QR_TABLE_004",
      notes: "Large table for groups"
    },
    {
      id: 5,
      tableNumber: "5",
      capacity: 4,
      area: "outdoor",
      status: "occupied",
      occupiedSince: new Date(Date.now() - 25 * 60000),
      currentOrder: "2024-127", 
      estimatedCompletion: new Date(Date.now() + 15 * 60000),
      customerCount: 3,
      totalAmount: { AUD: 29.80, KRW: 43500 },
      qrCode: "QR_TABLE_005",
      notes: "Patio table, weather dependent"
    },
    {
      id: 6,
      tableNumber: "6",
      capacity: 2,
      area: "outdoor",
      status: "outOfOrder",
      issueReported: new Date(Date.now() - 120 * 60000),
      issue: "Wobbly table leg",
      qrCode: "QR_TABLE_006",
      notes: "Needs maintenance"
    },
    {
      id: 7,
      tableNumber: "B1",
      capacity: 3,
      area: "bar",
      status: "occupied",
      occupiedSince: new Date(Date.now() - 60 * 60000),
      currentOrder: "2024-126",
      estimatedCompletion: new Date(Date.now() + 5 * 60000),
      customerCount: 2,
      totalAmount: { AUD: 28.50, KRW: 42000 },
      qrCode: "QR_TABLE_B01",
      notes: "Bar counter seating"
    },
    {
      id: 8,
      tableNumber: "P1",
      capacity: 8,
      area: "private",
      status: "available",
      lastCleaned: new Date(Date.now() - 30 * 60000),
      qrCode: "QR_TABLE_P01",
      notes: "Private room, requires booking"
    }
  ]);

  const currentContent = content[selectedLanguage];
  const currencySymbol = selectedLanguage === 'ko' ? '' : '$';
  const currencyCode = selectedLanguage === 'ko' ? 'KRW' : 'AUD';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredTables = tables.filter(table => {
    return selectedArea === 'all' || table.area === selectedArea;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'occupied': return 'bg-blue-100 text-blue-800';
      case 'reserved': return 'bg-purple-100 text-purple-800';
      case 'cleaning': return 'bg-yellow-100 text-yellow-800';
      case 'outOfOrder': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return <CheckCircle className="w-4 h-4" />;
      case 'occupied': return <Users className="w-4 h-4" />;
      case 'reserved': return <Clock className="w-4 h-4" />;
      case 'cleaning': return <RefreshCw className="w-4 h-4" />;
      case 'outOfOrder': return <AlertTriangle className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getTimeAgo = (date) => {
    const diff = currentTime.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}${currentContent.minutes} ${currentContent.ago}`;
    return `${hours}h ${minutes % 60}${currentContent.minutes} ${currentContent.ago}`;
  };

  const getTimeUntil = (date) => {
    const diff = date.getTime() - currentTime.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return 'Now';
    if (minutes < 60) return `${minutes}${currentContent.minutes}`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}${currentContent.minutes}`;
  };

  const updateTableStatus = (tableId, newStatus) => {
    setTables(tables.map(table => {
      if (table.id === tableId) {
        const now = new Date();
        const updates = { status: newStatus };
        
        if (newStatus === 'cleaning') {
          updates.cleaningStarted = now;
        } else if (newStatus === 'available') {
          updates.lastCleaned = now;
          updates.occupiedSince = null;
          updates.currentOrder = null;
          updates.customerCount = null;
          updates.totalAmount = null;
        }
        
        return { ...table, ...updates };
      }
      return table;
    }));
  };

  const showQRCode = (table) => {
    setSelectedTable(table);
    setShowQRModal(true);
  };

  const getTableStats = () => {
    const totalTables = tables.length;
    const available = tables.filter(t => t.status === 'available').length;
    const occupied = tables.filter(t => t.status === 'occupied').length;
    const outOfOrder = tables.filter(t => t.status === 'outOfOrder').length;
    const occupancyRate = Math.round((occupied / (totalTables - outOfOrder)) * 100);
    
    return { totalTables, available, occupied, outOfOrder, occupancyRate };
  };

  const stats = getTableStats();

  const QRModal = () => {
    if (!showQRModal || !selectedTable) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900">{currentContent.qrModal.title}</h2>
            <button 
              onClick={() => setShowQRModal(false)}
              className="p-2 hover:bg-slate-100 rounded-full"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>

          <div className="text-center mb-6">
            <div className="w-48 h-48 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <QrCode className="w-32 h-32 text-slate-400" />
            </div>
            <div className="text-sm text-slate-600 mb-2">
              {currentContent.qrModal.description}
            </div>
            <div className="text-xs text-slate-500">
              QR Code: {selectedTable.qrCode}
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-slate-900 mb-2">{currentContent.qrModal.tableInfo}</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">{currentContent.tableInfo.tableNumber}:</span>
                <span className="font-medium">#{selectedTable.tableNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">{currentContent.tableInfo.capacity}:</span>
                <span className="font-medium">{selectedTable.capacity} {currentContent.people}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">{currentContent.tableInfo.area}:</span>
                <span className="font-medium capitalize">{currentContent.areas[selectedTable.area]}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center space-x-2 py-2 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Printer className="w-4 h-4" />
              <span className="text-sm">{currentContent.qrModal.printQR}</span>
            </button>
            <button className="flex items-center justify-center space-x-2 py-2 px-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors">
              <RefreshCw className="w-4 h-4" />
              <span className="text-sm">{currentContent.qrModal.regenerateQR}</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const EditModal = () => {
    if (!editingTable) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900">{currentContent.editModal.title}</h2>
            <button 
              onClick={() => setEditingTable(null)}
              className="p-2 hover:bg-slate-100 rounded-full"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {currentContent.editModal.tableNumber}
              </label>
              <input
                type="text"
                value={editingTable.tableNumber}
                onChange={(e) => setEditingTable({...editingTable, tableNumber: e.target.value})}
                className="w-full px-3 py-2 bg-slate-50 rounded-lg border-0 focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {currentContent.editModal.capacity}
              </label>
              <input
                type="number"
                value={editingTable.capacity}
                onChange={(e) => setEditingTable({...editingTable, capacity: parseInt(e.target.value)})}
                className="w-full px-3 py-2 bg-slate-50 rounded-lg border-0 focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {currentContent.editModal.area}
              </label>
              <select
                value={editingTable.area}
                onChange={(e) => setEditingTable({...editingTable, area: e.target.value})}
                className="w-full px-3 py-2 bg-slate-50 rounded-lg border-0 focus:ring-2 focus:ring-blue-600"
              >
                <option value="indoor">{currentContent.areas.indoor}</option>
                <option value="outdoor">{currentContent.areas.outdoor}</option>
                <option value="bar">{currentContent.areas.bar}</option>
                <option value="private">{currentContent.areas.private}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {currentContent.editModal.notes}
              </label>
              <textarea
                value={editingTable.notes}
                onChange={(e) => setEditingTable({...editingTable, notes: e.target.value})}
                className="w-full px-3 py-2 bg-slate-50 rounded-lg border-0 focus:ring-2 focus:ring-blue-600 resize-none"
                rows="3"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              onClick={() => setEditingTable(null)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {currentContent.editModal.cancel}
            </button>
            <button
              onClick={() => {
                setTables(tables.map(t => t.id === editingTable.id ? editingTable : t));
                setEditingTable(null);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {currentContent.editModal.save}
            </button>
          </div>
        </div>
      </div>
    );
  };

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
              <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span className="text-sm">{currentContent.actions.addTable}</span>
              </button>

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

          <h1 className="text-xl font-bold text-slate-900">{currentContent.title}</h1>
        </div>
      </header>

      {/* Stats */}
      <div className="p-4">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          <div className="bg-white rounded-lg p-3">
            <div className="text-sm text-slate-600">{currentContent.stats.totalTables}</div>
            <div className="text-2xl font-bold text-slate-900">{stats.totalTables}</div>
          </div>
          
          <div className="bg-white rounded-lg p-3">
            <div className="text-sm text-slate-600">{currentContent.stats.available}</div>
            <div className="text-2xl font-bold text-green-600">{stats.available}</div>
          </div>
          
          <div className="bg-white rounded-lg p-3">
            <div className="text-sm text-slate-600">{currentContent.stats.occupied}</div>
            <div className="text-2xl font-bold text-blue-600">{stats.occupied}</div>
          </div>
          
          <div className="bg-white rounded-lg p-3">
            <div className="text-sm text-slate-600">{currentContent.stats.outOfOrder}</div>
            <div className="text-2xl font-bold text-red-600">{stats.outOfOrder}</div>
          </div>
          
          <div className="bg-white rounded-lg p-3">
            <div className="text-sm text-slate-600">{currentContent.stats.occupancyRate}</div>
            <div className="text-2xl font-bold text-purple-600">{stats.occupancyRate}%</div>
          </div>
        </div>

        {/* Area Filters */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex space-x-2 overflow-x-auto">
            {Object.entries(currentContent.areas).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedArea(key)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedArea === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tables Grid */}
      <main className="p-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTables.map((table) => (
            <div key={table.id} className={`bg-white rounded-xl p-4 shadow-sm border-2 transition-all ${
              table.status === 'occupied' ? 'border-blue-200 bg-blue-50' :
              table.status === 'available' ? 'border-green-200 bg-green-50' :
              table.status === 'reserved' ? 'border-purple-200 bg-purple-50' :
              table.status === 'cleaning' ? 'border-yellow-200 bg-yellow-50' :
              'border-red-200 bg-red-50'
            }`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">#{table.tableNumber}</h3>
                  <div className="text-sm text-slate-600 flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{table.capacity} {currentContent.people}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => showQRCode(table)}
                    className="p-1 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <QrCode className="w-4 h-4 text-slate-600" />
                  </button>
                  <button
                    onClick={() => setEditingTable(table)}
                    className="p-1 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <Edit3 className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 w-fit ${getStatusColor(table.status)}`}>
                  {getStatusIcon(table.status)}
                  <span>{currentContent.tableStatus[table.status]}</span>
                </span>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">{currentContent.tableInfo.area}:</span>
                  <span className="font-medium">{currentContent.areas[table.area]}</span>
                </div>

                {table.status === 'occupied' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-slate-500">{currentContent.tableInfo.occupiedSince}:</span>
                      <span className="font-medium">{getTimeAgo(table.occupiedSince)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">{currentContent.tableInfo.currentOrder}:</span>
                      <span className="font-medium">#{table.currentOrder}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">{currentContent.tableInfo.estimatedTime}:</span>
                      <span className="font-medium">{getTimeUntil(table.estimatedCompletion)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">{currentContent.tableInfo.totalAmount}:</span>
                      <span className="font-bold text-green-600">
                        {currencySymbol}{table.totalAmount[currencyCode].toLocaleString()}{selectedLanguage === 'ko' ? '원' : ''}
                      </span>
                    </div>
                  </>
                )}

                {table.status === 'reserved' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Customer:</span>
                      <span className="font-medium">{table.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Reservation:</span>
                      <span className="font-medium">{getTimeUntil(table.reservationTime)}</span>
                    </div>
                  </>
                )}

                {table.status === 'cleaning' && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Cleaning since:</span>
                    <span className="font-medium">{getTimeAgo(table.cleaningStarted)}</span>
                  </div>
                )}

                {table.status === 'outOfOrder' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Issue:</span>
                      <span className="font-medium text-red-600">{table.issue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Reported:</span>
                      <span className="font-medium">{getTimeAgo(table.issueReported)}</span>
                    </div>
                  </>
                )}
              </div>

              {table.notes && (
                <div className="mb-4 p-2 bg-slate-100 rounded-lg">
                  <div className="text-xs text-slate-500 mb-1">Notes:</div>
                  <div className="text-xs text-slate-700">{table.notes}</div>
                </div>
              )}

              <div className="flex justify-between space-x-2">
                {table.status === 'occupied' && (
                  <>
                    <button
                      onClick={() => updateTableStatus(table.id, 'cleaning')}
                      className="flex-1 py-2 px-3 bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors"
                    >
                      Clean
                    </button>
                    <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </>
                )}

                {table.status === 'cleaning' && (
                  <button
                    onClick={() => updateTableStatus(table.id, 'available')}
                    className="flex-1 py-2 px-3 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    {currentContent.actions.markAvailable}
                  </button>
                )}

                {(table.status === 'available' || table.status === 'reserved') && (
                  <button
                    onClick={() => updateTableStatus(table.id, 'cleaning')}
                    className="flex-1 py-2 px-3 bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors"
                  >
                    {currentContent.actions.markCleaning}
                  </button>
                )}

                {table.status === 'outOfOrder' && (
                  <button
                    onClick={() => updateTableStatus(table.id, 'available')}
                    className="flex-1 py-2 px-3 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    {currentContent.actions.markAvailable}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredTables.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🪑</div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No tables found</h3>
            <p className="text-slate-600">No tables in the selected area</p>
          </div>
        )}
      </main>

      <QRModal />
      <EditModal />
    </div>
  );
};

export default QOTableManagement;