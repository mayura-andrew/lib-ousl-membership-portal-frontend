import { Bell, Check, X, AlertCircle, Info, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useNotifications } from '@/hooks/use-notifications';

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'success':
      return <Check className="w-4 h-4 text-green-500" />;
    case 'error':
      return <X className="w-4 h-4 text-red-500" />;
    case 'warning':
      return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    case 'info':
      return <Info className="w-4 h-4 text-blue-500" />;
    default:
      return null;
  }
};

const getNotificationStyle = (type: string) => {
  switch (type) {
    case 'success':
      return 'bg-green-100 text-green-600';
    case 'error':
      return 'bg-red-100 text-red-600';
    case 'warning':
      return 'bg-yellow-100 text-yellow-600';
    case 'info':
      return 'bg-blue-100 text-blue-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export const NotificationDropdown = () => {
  const { notifications, markAsRead, clearAll } = useNotifications();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative group p-2 hover:bg-gray-100 rounded-full"
        >
          <Bell className="w-5 h-5 text-gray-600 group-hover:text-orange-500 transition-colors" />
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white rounded-full text-xs flex items-center justify-center font-medium shadow-sm"
              >
                {unreadCount}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-96 bg-white rounded-xl shadow-lg border border-gray-200"
      >
        <DropdownMenuLabel className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <span className="px-2 py-1 text-xs font-medium text-orange-600 bg-orange-50 rounded-full">
                {unreadCount} unread
              </span>
            )}
          </div>
          {notifications.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearAll}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-50 text-xs"
            >
              Clear all
            </Button>
          )}
        </DropdownMenuLabel>
        <div className="max-h-[32rem] overflow-y-auto bg-white">
          <AnimatePresence>
            {notifications.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="p-8 text-center flex flex-col items-center gap-3"
              >
                <div className="p-3 bg-gray-50 rounded-full">
                  <Clock className="w-6 h-6 text-gray-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-gray-600 font-medium">No notifications</p>
                  <p className="text-sm text-gray-500">We'll notify you when something arrives</p>
                </div>
              </motion.div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map(notification => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`relative transition-colors ${
                      !notification.isRead 
                        ? 'bg-orange-50 hover:bg-orange-100' 
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <DropdownMenuItem
                      className="p-4 cursor-default focus:bg-transparent"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="space-y-2">
                        <div className="flex items-start gap-3">
                          <div className={`mt-0.5 p-1.5 rounded-full ${getNotificationStyle(notification.type)}`}>
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-medium text-gray-900 truncate">
                                {notification.title}
                              </p>
                              <span className="text-xs text-gray-500 whitespace-nowrap font-medium">
                                {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            {notification.link && (
                              <Link 
                                to={notification.link}
                                className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-orange-600 hover:text-orange-700"
                              >
                                View details
                                <span aria-hidden="true">→</span>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
