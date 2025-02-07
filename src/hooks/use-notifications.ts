// src/hooks/use-notifications.ts
import { useContext } from 'react';
import { NotificationContext } from '@/contexts/NotificationContext';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  link?: string;
}

export const useNotifications = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }

  const { notifications, addNotification, markAsRead, clearAll } = context;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const addSuccess = (title: string, message: string, link?: string) => {
    addNotification({
      type: 'success',
      title,
      message,
      link,
    });
  };

  const addError = (title: string, message: string, link?: string) => {
    addNotification({
      type: 'error',
      title,
      message,
      link,
    });
  };

  const addWarning = (title: string, message: string, link?: string) => {
    addNotification({
      type: 'warning',
      title,
      message,
      link,
    });
  };

  const addInfo = (title: string, message: string, link?: string) => {
    addNotification({
      type: 'info',
      title,
      message,
      link,
    });
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    clearAll,
    addNotification,
    addSuccess,
    addError,
    addWarning,
    addInfo,
  };
};