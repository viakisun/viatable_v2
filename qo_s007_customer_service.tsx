import React, { useState, useEffect } from 'react';
import { ChevronLeft, MessageSquare, Phone, Clock, CheckCircle, AlertTriangle, User, Bell, BellOff, Filter, Search, Star, ThumbsUp, ThumbsDown, Send, Headphones, Coffee, Utensils, Wifi, CreditCard } from 'lucide-react';

const QOCustomerService = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const content = {
    en: {
      title: "Customer Service",
      backToDashboard: "Dashboard",
      searchPlaceholder: "Search requests, tables, or customers...",
      filters: {
        all: "All Requests",
        pending: "Pending",
        inProgress: "In Progress", 
        resolved: "Resolved",
        urgent: "Urgent"
      },
      requestTypes: {
        assistance: "General Assistance",
        complaint: "Complaint",
        compliment: "Compliment",
        order: "Order Issue",
        bill: "Bill Issue",
        technical: "Technical Issue",
        reservation: "Reservation",
        feedback: "Feedback"
      },
      priority: {
        low: "Low",
        medium: "Medium",
        high: "High",
        urgent: "Urgent"
      },
      status: {
        pending: "Pending",
        inProgress: "In Progress",
        resolved: "Resolved",
        escalated: "Escalated"
      },
      actions: {
        respond: "Respond",
        resolve: "Mark Resolved",
        escalate: "Escalate",
        call: "Call Customer",
        viewOrder: "View Order",
        assign: "Assign to Me",
        sendMessage: "Send Message"
      },
      stats: {
        totalRequests: "Total Requests",
        pending: "Pending",
        avgResponseTime: "Avg Response",
        satisfaction: "Satisfaction",
        resolved: "Resolved Today"
      },
      customerInfo: {
        table: "Table",
        customer: "Customer",
        phone: "Phone",
        email: "Email",
        orderNumber: "Order #",
        requestTime: "Request Time",
        responseTime: "Response Time",
        assignedTo: "Assigned To"
      },
      chatModal: {
        title: "Customer Chat",
        placeholder: "Type your response...",
        send: "Send",
        close: "Close",
        customerSays: "Customer",
        staffSays: "You"
      },
      minutes: "min",
      ago: "ago",
      justNow: "just now",
      newRequest: "New Request",
      soundAlerts: "Sound Alerts"
    },
    ko: {
      title: "고객 서비스",
      backToDashboard: "대시보드",
      searchPlaceholder: "요청, 테이블, 고객 검색...",
      filters: {
        all: "전체 요청",
        pending: "대기 중",
        inProgress: "처리 중",
        resolved: "해결됨",
        urgent: "긴급"
      },
      requestTypes: {
        assistance: "일반 도움",
        complaint: "불만사항",
        compliment: "칭찬",
        order: "주문 문제",
        bill: "계산 문제",
        technical: "기술적 문제",
        reservation: "예약",
        feedback: "피드백"
      },
      priority: {
        low: "낮음",
        medium: "보통",
        high: "높음",
        urgent: "긴급"
      },
      status: {
        pending: "대기 중",
        inProgress: "처리 중",
        resolved: "해결됨",
        escalated: "상위 보고"
      },
      actions: {
        respond: "응답",
        resolve: "해결 완료",
        escalate: "상위 보고",
        call: "고객 통화",
        viewOrder: "주문 보기",
        assign: "내가 처리",
        sendMessage: "메시지 전송"
      },
      stats: {
        totalRequests: "총 요청",
        pending: "대기 중",
        avgResponseTime: "평균 응답",
        satisfaction: "만족도",
        resolved: "오늘 해결"
      },
      customerInfo: {
        table: "테이블",
        customer: "고객",
        phone: "전화번호",
        email: "이메일",
        orderNumber: "주문번호 #",
        requestTime: "요청 시간",
        responseTime: "응답 시간",
        assignedTo: "담당자"
      },
      chatModal: {
        title: "고객 채팅",
        placeholder: "답변을 입력하세요...",
        send: "전송",
        close: "닫기",
        customerSays: "고객",
        staffSays: "직원"
      },
      minutes: "분",
      ago: "전",
      justNow: "방금",
      newRequest: "새 요청",
      soundAlerts: "소리 알림"
    }
  };

  const [requests, setRequests] = useState([
    {
      id: 1,
      tableNumber: "12",
      customer: "John Smith",
      phone: "+61 400 123 456",
      email: "john@email.com",
      orderNumber: "2024-128",
      type: "assistance",
      priority: "medium",
      status: "pending",
      title: "Need extra napkins",
      description: "Could you please bring some extra napkins to our table? We have a toddler with us.",
      requestTime: new Date(Date.now() - 5 * 60000),
      assignedTo: null,
      messages: [
        {
          id: 1,
          sender: "customer",
          message: "Could you please bring some extra napkins to our table? We have a toddler with us.",
          timestamp: new Date(Date.now() - 5 * 60000)
        }
      ],
      rating: null
    },
    {
      id: 2,
      tableNumber: "8",
      customer: "Sarah Johnson",
      phone: "+61 400 234 567",
      email: "sarah@email.com",
      orderNumber: "2024-127",
      type: "complaint",
      priority: "high",
      status: "inProgress",
      title: "Food is taking too long",
      description: "We ordered 20 minutes ago and still haven't received our pancakes. Can you check on our order?",
      requestTime: new Date(Date.now() - 18 * 60000),
      responseTime: new Date(Date.now() - 15 * 60000),
      assignedTo: "Emma Wilson",
      messages: [
        {
          id: 1,
          sender: "customer",
          message: "We ordered 20 minutes ago and still haven't received our pancakes. Can you check on our order?",
          timestamp: new Date(Date.now() - 18 * 60000)
        },
        {
          id: 2,
          sender: "staff",
          message: "I apologize for the delay. Let me check with the kitchen and get back to you in 2 minutes.",
          timestamp: new Date(Date.now() - 15 * 60000)
        },
        {
          id: 3,
          sender: "staff",
          message: "Good news! Your pancakes are just coming out of the kitchen now. They'll be with you in 1-2 minutes.",
          timestamp: new Date(Date.now() - 3 * 60000)
        }
      ],
      rating: null
    },
    {
      id: 3,
      tableNumber: "15",
      customer: "Mike Chen",
      phone: "+61 400 345 678",
      email: "mike@email.com",
      orderNumber: "2024-126",
      type: "compliment",
      priority: "low",
      status: "resolved",
      title: "Excellent service!",
      description: "Just wanted to say the coffee is amazing and the service has been outstanding. Thank you!",
      requestTime: new Date(Date.now() - 45 * 60000),
      responseTime: new Date(Date.now() - 42 * 60000),
      resolvedTime: new Date(Date.now() - 40 * 60000),
      assignedTo: "Tom Rodriguez",
      messages: [
        {
          id: 1,
          sender: "customer",
          message: "Just wanted to say the coffee is amazing and the service has been outstanding. Thank you!",
          timestamp: new Date(Date.now() - 45 * 60000)
        },
        {
          id: 2,
          sender: "staff",
          message: "Thank you so much for the kind words! We really appreciate your feedback. I'll make sure to pass this along to our coffee team.",
          timestamp: new Date(Date.now() - 42 * 60000)
        }
      ],
      rating: 5
    },
    {
      id: 4,
      tableNumber: "3",
      customer: "Lisa Wong",
      phone: "+61 400 456 789",
      email: "lisa@email.com",
      orderNumber: "2024-129",
      type: "bill",
      priority: "urgent",
      status: "pending",
      title: "Billing error - charged twice",
      description: "I think there's been an error with my bill. I've been charged twice for the avocado toast. Can someone help me with this?",
      requestTime: new Date(Date.now() - 2 * 60000),
      assignedTo: null,
      messages: [
        {
          id: 1,
          sender: "customer",
          message: "I think there's been an error with my bill. I've been charged twice for the avocado toast. Can someone help me with this?",
          timestamp: new Date(Date.now() - 2 * 60000)
        }
      ],
      rating: null
    },
    {
      id: 5,
      tableNumber: "6",
      customer: "David Brown",
      phone: "+61 400 567 890",
      email: "david@email.com",
      orderNumber: null,
      type: "technical",
      priority: "medium",
      status: "pending",
      title: "WiFi not working",
      description: "The WiFi seems to be down at our table. Could you please check the connection?",
      requestTime: new Date(Date.now() - 12 * 60000),
      assignedTo: null,
      messages: [
        {
          id: 1,
          sender: "customer",
          message: "The WiFi seems to be down at our table. Could you please check the connection?",
          timestamp: new Date(Date.now() - 12 * 60000)
        }
      ],
      rating: null
    }
  ]);

  const currentContent = content[selectedLanguage];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate new request notifications
    const notificationTimer = setInterval(() => {
      if (soundEnabled && Math.random() < 0.1) { // 10% chance every interval
        console.log('🔔 New customer service request!');
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(notificationTimer);
  }, [soundEnabled]);

  const filteredRequests = requests.filter(request => {
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'urgent' && request.priority === 'urgent') ||
                         request.status === selectedFilter;
    
    const matchesSearch = searchQuery === '' ||
                         request.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.tableNumber.includes(searchQuery) ||
                         request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getTimeAgo = (date) => {
    const diff = currentTime.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return currentContent.justNow;
    if (minutes < 60) return `${minutes} ${currentContent.minutes} ${currentContent.ago}`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}${currentContent.minutes} ${currentContent.ago}`;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'inProgress': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'escalated': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'assistance': return <Headphones className="w-4 h-4" />;
      case 'complaint': return <ThumbsDown className="w-4 h-4" />;
      case 'compliment': return <ThumbsUp className="w-4 h-4" />;
      case 'order': return <Utensils className="w-4 h-4" />;
      case 'bill': return <CreditCard className="w-4 h-4" />;
      case 'technical': return <Wifi className="w-4 h-4" />;
      case 'reservation': return <Clock className="w-4 h-4" />;
      case 'feedback': return <Star className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const updateRequestStatus = (requestId, newStatus, assignTo = null) => {
    setRequests(requests.map(request => {
      if (request.id === requestId) {
        const updates = { 
          status: newStatus,
          ...(assignTo && { assignedTo: assignTo }),
          ...(newStatus === 'inProgress' && !request.responseTime && { responseTime: new Date() }),
          ...(newStatus === 'resolved' && { resolvedTime: new Date() })
        };
        return { ...request, ...updates };
      }
      return request;
    }));
  };

  const openChat = (request) => {
    setSelectedRequest(request);
    setShowChatModal(true);
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedRequest) return;

    const message = {
      id: selectedRequest.messages.length + 1,
      sender: 'staff',
      message: newMessage,
      timestamp: new Date()
    };

    setRequests(requests.map(request => {
      if (request.id === selectedRequest.id) {
        return {
          ...request,
          messages: [...request.messages, message],
          status: 'inProgress',
          responseTime: request.responseTime || new Date(),
          assignedTo: request.assignedTo || 'Current User'
        };
      }
      return request;
    }));

    setSelectedRequest({
      ...selectedRequest,
      messages: [...selectedRequest.messages, message]
    });

    setNewMessage('');
  };

  const getServiceStats = () => {
    const totalRequests = requests.length;
    const pending = requests.filter(r => r.status === 'pending').length;
    const resolvedToday = requests.filter(r => 
      r.status === 'resolved' && 
      r.resolvedTime && 
      new Date(r.resolvedTime).toDateString() === new Date().toDateString()
    ).length;
    
    const responseTimes = requests
      .filter(r => r.responseTime && r.requestTime)
      .map(r => (r.responseTime.getTime() - r.requestTime.getTime()) / (1000 * 60));
    
    const avgResponseTime = responseTimes.length > 0 
      ? Math.round(responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length)
      : 0;

    const ratings = requests.filter(r => r.rating).map(r => r.rating);
    const satisfaction = ratings.length > 0
      ? Math.round((ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length) * 20) // Convert to percentage
      : 0;

    return { totalRequests, pending, avgResponseTime, satisfaction, resolvedToday };
  };

  const stats = getServiceStats();

  const ChatModal = () => {
    if (!showChatModal || !selectedRequest) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl w-full max-w-md h-96 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              <h2 className="font-bold text-slate-900">{currentContent.chatModal.title}</h2>
              <p className="text-sm text-slate-600">Table {selectedRequest.tableNumber} • {selectedRequest.customer}</p>
            </div>
            <button 
              onClick={() => setShowChatModal(false)}
              className="p-2 hover:bg-slate-100 rounded-full"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {selectedRequest.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'staff' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs px-3 py-2 rounded-lg ${
                  message.sender === 'staff'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-900'
                }`}>
                  <div className="text-sm">{message.message}</div>
                  <div className={`text-xs mt-1 ${
                    message.sender === 'staff' ? 'text-blue-100' : 'text-slate-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder={currentContent.chatModal.placeholder}
                className="flex-1 px-3 py-2 bg-slate-50 rounded-lg border-0 focus:ring-2 focus:ring-blue-600"
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
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
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-full ${soundEnabled ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}
              >
                {soundEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
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
            <div className="text-sm text-slate-600">{currentContent.stats.totalRequests}</div>
            <div className="text-2xl font-bold text-slate-900">{stats.totalRequests}</div>
          </div>
          
          <div className="bg-white rounded-lg p-3">
            <div className="text-sm text-slate-600">{currentContent.stats.pending}</div>
            <div className="text-2xl font-bold text-blue-600">{stats.pending}</div>
          </div>
          
          <div className="bg-white rounded-lg p-3">
            <div className="text-sm text-slate-600">{currentContent.stats.avgResponseTime}</div>
            <div className="text-2xl font-bold text-orange-600">{stats.avgResponseTime}{currentContent.minutes}</div>
          </div>
          
          <div className="bg-white rounded-lg p-3">
            <div className="text-sm text-slate-600">{currentContent.stats.satisfaction}</div>
            <div className="text-2xl font-bold text-green-600">{stats.satisfaction}%</div>
          </div>
          
          <div className="bg-white rounded-lg p-3">
            <div className="text-sm text-slate-600">{currentContent.stats.resolved}</div>
            <div className="text-2xl font-bold text-purple-600">{stats.resolvedToday}</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-3 lg:space-y-0 mb-4">
            <div className="relative flex-1 lg:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={currentContent.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-lg border-0 focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div className="flex space-x-2 overflow-x-auto">
            {Object.entries(currentContent.filters).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedFilter(key)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedFilter === key
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

      {/* Service Requests */}
      <main className="p-4 pb-20">
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`p-2 rounded-full ${getPriorityColor(request.priority)}`}>
                      {getTypeIcon(request.type)}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-slate-900">{request.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                        {currentContent.priority[request.priority]}
                      </span>
                    </div>
                    
                    <p className="text-sm text-slate-600 mb-2 line-clamp-2">{request.description}</p>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-xs text-slate-500">
                      <div>
                        <span>{currentContent.customerInfo.table}: </span>
                        <span className="font-medium">#{request.tableNumber}</span>
                      </div>
                      <div>
                        <span>{currentContent.customerInfo.customer}: </span>
                        <span className="font-medium">{request.customer}</span>
                      </div>
                      <div>
                        <span>{currentContent.customerInfo.requestTime}: </span>
                        <span className="font-medium">{getTimeAgo(request.requestTime)}</span>
                      </div>
                      {request.assignedTo && (
                        <div>
                          <span>{currentContent.customerInfo.assignedTo}: </span>
                          <span className="font-medium">{request.assignedTo}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {currentContent.status[request.status]}
                  </span>
                  
                  {request.rating && (
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{request.rating}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  {request.orderNumber && (
                    <span>{currentContent.customerInfo.orderNumber}{request.orderNumber}</span>
                  )}
                  <span>•</span>
                  <span>{currentContent.requestTypes[request.type]}</span>
                  {request.responseTime && (
                    <>
                      <span>•</span>
                      <span>Response: {getTimeAgo(request.responseTime)}</span>
                    </>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openChat(request)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-1"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>{currentContent.actions.respond}</span>
                  </button>
                  
                  {request.status === 'pending' && (
                    <button
                      onClick={() => updateRequestStatus(request.id, 'inProgress', 'Current User')}
                      className="px-3 py-1 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
                    >
                      {currentContent.actions.assign}
                    </button>
                  )}
                  
                  {(request.status === 'inProgress' || request.status === 'pending') && (
                    <button
                      onClick={() => updateRequestStatus(request.id, 'resolved')}
                      className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center space-x-1"
                    >
                      <CheckCircle className="w-3 h-3" />
                      <span>{currentContent.actions.resolve}</span>
                    </button>
                  )}
                  
                  <button className="p-1 hover:bg-slate-100 rounded-full transition-colors">
                    <Phone className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No service requests found</h3>
              <p className="text-slate-600">No requests match your current filters</p>
            </div>
          )}
        </div>
      </main>

      <ChatModal />
    </div>
  );
};

export default QOCustomerService;