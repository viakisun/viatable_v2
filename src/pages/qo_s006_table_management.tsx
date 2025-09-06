import { useState } from 'react';
import { QrCode, Users, Plus } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';

type TableStatus = 'available' | 'occupied' | 'reserved';

interface Table {
  id: number;
  tableNumber: string;
  capacity: number;
  area: string;
  status: TableStatus;
}

const QOTableManagement = () => {
  const { language } = useLanguage();
  const [selectedArea, setSelectedArea] = useState('all');

  const content = {
    en: { title: "Table Management", areas: { all: "All", indoor: "Indoor", outdoor: "Outdoor" }, tableStatus: { available: "Available", occupied: "Occupied", reserved: "Reserved" }, people: "people", actions: { addTable: "Add Table" } },
    ko: { title: "테이블 관리", areas: { all: "전체", indoor: "실내", outdoor: "야외" }, tableStatus: { available: "이용 가능", occupied: "사용 중", reserved: "예약됨" }, people: "명", actions: { addTable: "테이블 추가" } }
  };

  const [tables] = useState<Table[]>([
    { id: 1, tableNumber: "1", capacity: 2, area: "indoor", status: "occupied" },
    { id: 2, tableNumber: "2", capacity: 4, area: "indoor", status: "available" },
    { id: 5, tableNumber: "5", capacity: 4, area: "outdoor", status: "occupied" },
    { id: 8, tableNumber: "P1", capacity: 8, area: "private", status: "reserved" },
  ]);

  const currentContent = content[language];
  const filteredTables = tables.filter(table => selectedArea === 'all' || table.area === selectedArea);

  const getStatusColor = (status: TableStatus) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'occupied': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'reserved': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const HeaderActions = () => (
    <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
      <Plus className="w-4 h-4" />
      <span>{currentContent.actions.addTable}</span>
    </button>
  );

  return (
    <PageLayout title={currentContent.title} backLink="/qo-s-002" headerActions={<HeaderActions />}>
      <div className="space-y-4">
        {/* Area Filters */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex space-x-2 overflow-x-auto">
            {Object.entries(currentContent.areas).map(([key, label]) => (
              <button key={key} onClick={() => setSelectedArea(key)} className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium ${selectedArea === key ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTables.map((table) => (
            <div key={table.id} className={`bg-white rounded-xl p-4 shadow-sm border-2 ${getStatusColor(table.status).split(' ')[2]}`}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-slate-900">#{table.tableNumber}</h3>
                <button className="p-1 hover:bg-slate-200 rounded-full"><QrCode className="w-4 h-4 text-slate-600" /></button>
              </div>
              <div className="mb-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center w-fit ${getStatusColor(table.status)}`}>
                  <span>{currentContent.tableStatus[table.status]}</span>
                </span>
              </div>
              <div className="text-sm text-slate-600 flex items-center"><Users className="w-4 h-4 mr-1" /><span>{table.capacity} {currentContent.people}</span></div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default QOTableManagement;