import React, { createContext, useContext, useState } from 'react';
import { Notification } from '@/components/Notifications/types';

interface NotificationContextType {
    notifications: Notification[];
    addNotification: (notification: Omit<Notification, "id" | "timestamp" | "isRead">) => void;
    markAsRead: (id: string) => void;
    clearAll: () => void;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "isRead">) => {
        const newNotification: Notification = {
            ...notification,
            id: Date.now().toString(),
            timestamp: new Date(),
            isRead: false,
        };
        setNotifications([...notifications, newNotification]);
    };

    const markAsRead = (id: string) => {
        setNotifications(
            notifications.map((notification) =>
                notification.id === id ? { ...notification, isRead: true } : notification
            )
        );
    };

    const clearAll = () => {
        setNotifications([]);
    };

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, clearAll }}>
            {children}
        </NotificationContext.Provider>
    );
}

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
      throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
  };
  