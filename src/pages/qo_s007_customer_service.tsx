import { useState } from 'react';
import { Search, Bell, BellOff, MessageSquare, ThumbsUp } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';

type RequestStatus = 'pending' | 'resolved';
type RequestType = 'assistance' | 'complaint' | 'compliment';

interface Request {
  id: number;
  customer: string;
  type: RequestType;
  status: RequestStatus;
  title: string;
}

const QOCustomerService = () => {
  const { language } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [soundEnabled, setSoundEnabled] = useState(true);

  const content = {
    en: { title: "Customer Service", searchPlaceholder: "Search requests...", filters: { all: "All", pending: "Pending", resolved: "Resolved" }, requestTypes: { assistance: "Assistance", complaint: "Complaint" }, status: { pending: "Pending", resolved: "Resolved" } },
    ko: { title: "고객 서비스", searchPlaceholder: "요청 검색...", filters: { all: "전체", pending: "대기중", resolved: "해결됨" }, requestTypes: { assistance: "도움", complaint: "불만" }, status: { pending: "대기중", resolved: "해결됨" } }
  };

  const [requests] = useState<Request[]>([
    { id: 1, customer: "John Smith", type: "assistance", status: "pending", title: "Need extra napkins" },
    { id: 2, customer: "Sarah Johnson", type: "complaint", status: "pending", title: "Food is taking too long" },
    { id: 3, customer: "Mike Chen", type: "compliment", status: "resolved", title: "Excellent service!" },
  ]);

  const currentContent = content[language];
  const filteredRequests = requests.filter(req => selectedFilter === 'all' || req.status === selectedFilter);

  const getTypeIcon = (type: RequestType) => {
    if (type === 'compliment') return <ThumbsUp className="w-4 h-4 text-green-600" />;
    return <MessageSquare className="w-4 h-4 text-blue-600" />;
  };

  const HeaderActions = () => (
    <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-full ${soundEnabled ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
      {soundEnabled ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
    </button>
  );

  return (
    <PageLayout title={currentContent.title} backLink="/qo-s-002" headerActions={<HeaderActions />}>
      <div className="space-y-4">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder={currentContent.searchPlaceholder} className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-lg" />
          </div>
          <div className="flex space-x-1 overflow-x-auto">
            {Object.entries(currentContent.filters).map(([key, label]) => (
              <button key={key} onClick={() => setSelectedFilter(key)} className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium ${selectedFilter === key ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
                {label} ({key === 'all' ? requests.length : requests.filter(r => r.status === key).length})
              </button>
            ))}
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.map(request => (
            <div key={request.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-full bg-blue-100">{getTypeIcon(request.type)}</div>
                  <div>
                    <h3 className="font-semibold">{request.title}</h3>
                    <p className="text-sm text-slate-600">From: {request.customer}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${request.status === 'pending' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                  {currentContent.status[request.status as RequestStatus]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default QOCustomerService;