import React from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Notification } from './NotificationSystem';

// Predefined notification creators
export const createOrderNotification = (orderId: string, status: string): Notification => ({
  id: `order-${orderId}-${Date.now()}`,
  type: 'order' as const,
  title: 'Order Update',
  message: `Your order #${orderId} is now ${status}`,
  icon: React.createElement(ShoppingCart, { className: "w-5 h-5" }),
  action: {
    label: 'View Order',
    onClick: () => console.log('View order', orderId)
  },
  timestamp: new Date(),
  read: false
});

export const createPromotionNotification = (title: string, message: string): Notification => ({
  id: `promotion-${Date.now()}`,
  type: 'promotion' as const,
  title,
  message,
  duration: 10000,
  timestamp: new Date(),
  read: false
});

export const createSuccessNotification = (title: string, message: string): Notification => ({
  id: `success-${Date.now()}`,
  type: 'success' as const,
  title,
  message,
  duration: 5000,
  timestamp: new Date(),
  read: false
});

export const createErrorNotification = (title: string, message: string): Notification => ({
  id: `error-${Date.now()}`,
  type: 'error' as const,
  title,
  message,
  duration: 8000,
  timestamp: new Date(),
  read: false
});
