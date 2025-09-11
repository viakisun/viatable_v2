import React, { createContext, useContext, useState, useCallback } from 'react';
import { 
  Bell, X, CheckCircle, AlertCircle, Info, Star, 
  ShoppingCart
} from 'lucide-react';
import { 
  Card, 
  Badge, 
  Button
} from './index';
import { cn } from '../utils/cn';

// Notification Types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'order' | 'promotion';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
  duration?: number; // Auto-dismiss duration in ms
}

// Notification Context
interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Notification Provider
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false,
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Auto-dismiss if duration is specified
    if (notification.duration) {
      setTimeout(() => {
        removeNotification(newNotification.id);
      }, notification.duration);
    }
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      markAsRead,
      markAllAsRead,
      clearAll,
      unreadCount
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Hook to use notifications
const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// Notification Toast Component
interface NotificationToastProps {
  notification: Notification;
  onRemove: (id: string) => void;
  onMarkAsRead: (id: string) => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ 
  notification, 
  onRemove, 
  onMarkAsRead 
}) => {
  const getIcon = () => {
    if (notification.icon) return notification.icon;
    
    switch (notification.type) {
      case 'success': return <CheckCircle className="w-5 h-5" />;
      case 'error': return <AlertCircle className="w-5 h-5" />;
      case 'warning': return <AlertCircle className="w-5 h-5" />;
      case 'info': return <Info className="w-5 h-5" />;
      case 'order': return <ShoppingCart className="w-5 h-5" />;
      case 'promotion': return <Star className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getTypeStyles = () => {
    switch (notification.type) {
      case 'success': return 'bg-success-50 border-success-200 text-success-800';
      case 'error': return 'bg-error-50 border-error-200 text-error-800';
      case 'warning': return 'bg-warning-50 border-warning-200 text-warning-800';
      case 'info': return 'bg-primary-50 border-primary-200 text-primary-800';
      case 'order': return 'bg-secondary-50 border-secondary-200 text-secondary-800';
      case 'promotion': return 'bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200 text-primary-800';
      default: return 'bg-neutral-50 border-neutral-200 text-neutral-800';
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="mb-3">
      <Card 
        className={cn(
          'p-4 border-l-4 transition-all duration-300 hover:shadow-md',
          getTypeStyles(),
          !notification.read && 'ring-2 ring-primary-200'
        )}
      >
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-0.5">
            {getIcon()}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-sm font-semibold mb-1">
                  {notification.title}
                </h4>
                <p className="text-sm opacity-90 mb-2">
                  {notification.message}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs opacity-75">
                    {formatTime(notification.timestamp)}
                  </span>
                  
                  {notification.action && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={notification.action.onClick}
                      className="text-xs"
                    >
                      {notification.action.label}
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-1 ml-2">
                {!notification.read && (
                  <button
                    onClick={() => onMarkAsRead(notification.id)}
                    className="p-1 rounded-full hover:bg-white/20 transition-colors"
                    title="Mark as read"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => onRemove(notification.id)}
                  className="p-1 rounded-full hover:bg-white/20 transition-colors"
                  title="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Notification Center Component
interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const { notifications, removeNotification, markAsRead, markAllAsRead, clearAll } = useNotifications();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-primary-500" />
            <h3 className="text-lg font-semibold text-neutral-900">Notifications</h3>
            {notifications.filter(n => !n.read).length > 0 && (
              <Badge variant="error" size="sm">
                {notifications.filter(n => !n.read).length}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {notifications.length > 0 && (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={markAllAsRead}
                >
                  Mark all read
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={clearAll}
                >
                  Clear all
                </Button>
              </>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto max-h-[60vh] p-4">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-500">No notifications yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <NotificationToast
                  key={notification.id}
                  notification={notification}
                  onRemove={removeNotification}
                  onMarkAsRead={markAsRead}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Notification Bell Component
interface NotificationBellProps {
  onClick: () => void;
  className?: string;
}

export const NotificationBell: React.FC<NotificationBellProps> = ({ onClick, className }) => {
  const { unreadCount } = useNotifications();

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        className={cn('relative', className)}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge 
            variant="error" 
            size="sm"
            className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center animate-pulse"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </Button>
    </div>
  );
};

// Export utility functions and hooks
export { 
  createOrderNotification, 
  createPromotionNotification, 
  createSuccessNotification, 
  createErrorNotification 
} from './notificationUtils';

export { useNotifications };
