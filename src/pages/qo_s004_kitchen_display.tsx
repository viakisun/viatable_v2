import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface OrderItem {
  name: string;
  qty: number;
}

interface Order {
  id: string;
  status: string;
  placedAt: Date;
  startedAt?: Date;
  items: OrderItem[];
}

const QOKitchenDisplay = () => {
  const { language, setLanguage } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());

  const content = {
    en: { title: "Kitchen Display", newOrders: "New Orders", inProgress: "In Progress", readyToServe: "Ready to Serve", orderNumber: "Order #", table: "Table", time: "Time", elapsed: "Elapsed", startCooking: "Start", markReady: "Ready" },
    ko: { title: "주방 디스플레이", newOrders: "신규 주문", inProgress: "조리 중", readyToServe: "준비 완료", orderNumber: "주문 #", table: "테이블", time: "시간", elapsed: "경과", startCooking: "시작", markReady: "완료" }
  };

  const [orders, setOrders] = useState<Order[]>([
    { id: "128", status: "new", placedAt: new Date(Date.now() - 1 * 60000), items: [{ name: 'Avocado Toast', qty: 2 }] },
    { id: "129", status: "preparing", placedAt: new Date(Date.now() - 8 * 60000), startedAt: new Date(Date.now() - 5 * 60000), items: [{ name: 'Pancake Stack', qty: 1 }] },
    { id: "130", status: "preparing", placedAt: new Date(Date.now() - 18 * 60000), startedAt: new Date(Date.now() - 15 * 60000), items: [{ name: 'Breakfast Bowl', qty: 1 }] },
  ]);

  const currentContent = content[language];
  useEffect(() => { const timer = setInterval(() => setCurrentTime(new Date()), 1000); return () => clearInterval(timer); }, []);

  const getElapsedTime = (startTime: Date) => Math.floor((currentTime.getTime() - (startTime?.getTime() || 0)) / (1000 * 60));

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => order.id === orderId ? { ...order, status: newStatus, startedAt: newStatus === 'preparing' ? new Date() : order.startedAt } : order));
  };

  const OrderColumn = ({ title, orders, status, color }: { title: string, orders: Order[], status: string, color: string }) => (
    <div className={`bg-slate-800 rounded-lg p-4`}>
      <h2 className={`text-lg font-semibold text-${color}-400 mb-4`}>{title} ({orders.length})</h2>
      <div className="space-y-3">
        {orders.map((order: Order) => (
          <div key={order.id} className={`bg-slate-700 rounded-lg p-4 border-l-4 border-${color}-500`}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-lg">#{order.id}</span>
              <span className="text-sm text-slate-400">{getElapsedTime(order.placedAt)} min ago</span>
            </div>
            {order.items.map((item: OrderItem, i: number) => <div key={i} className="font-medium">{item.name} × {item.qty}</div>)}
            <button onClick={() => updateOrderStatus(order.id, status === 'new' ? 'preparing' : 'ready')} className={`w-full mt-3 bg-${color}-600 hover:bg-${color}-700 text-white py-2 rounded font-semibold`}>
              {status === 'new' ? currentContent.startCooking : currentContent.markReady}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4">
      <header className="bg-slate-800 rounded-lg p-4 mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">{currentContent.title}</h1>
        <div className="flex items-center space-x-2">
          <div className="flex bg-slate-700 rounded-lg p-1">
            <button onClick={() => setLanguage('en')} className={`px-3 py-1 rounded text-sm ${language === 'en' ? 'bg-orange-600' : ''}`}>EN</button>
            <button onClick={() => setLanguage('ko')} className={`px-3 py-1 rounded text-sm ${language === 'ko' ? 'bg-orange-600' : ''}`}>KO</button>
          </div>
        </div>
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <OrderColumn title={currentContent.newOrders} orders={orders.filter(o => o.status === 'new')} status="new" color="blue" />
        <OrderColumn title={currentContent.inProgress} orders={orders.filter(o => o.status === 'preparing')} status="preparing" color="orange" />
        <OrderColumn title={currentContent.readyToServe} orders={orders.filter(o => o.status === 'ready')} status="ready" color="green" />
      </main>
    </div>
  );
};

export default QOKitchenDisplay;