import { useState } from 'react';
import { Bell, Check, MessageSquare, Briefcase, UserCheck, Star, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

export interface Notification {
  id: string;
  type: 'message' | 'job' | 'application' | 'review' | 'system';
  title: string;
  description: string;
  read: boolean;
  createdAt: Date;
  link?: string;
}

// TODO: Supabase Integration
// 1. Create 'notifications' table: id, user_id, type, title, description, read, created_at, link
// 2. Enable Row Level Security (RLS) so users can only see their own notifications
// 3. Subscribe to real-time changes: supabase.channel('notifications').on('postgres_changes', ...)
// 4. Fetch initial notifications: supabase.from('notifications').select('*').eq('user_id', userId)
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'message',
    title: 'New Message',
    description: 'Ibrahim Kamara sent you a message about the carpentry job',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
    link: '/messages',
  },
  {
    id: '2',
    type: 'application',
    title: 'New Application',
    description: 'Fatmata Sesay applied for your Electrician position',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    link: '/dashboard/employer/jobs/1/applicants',
  },
  {
    id: '3',
    type: 'job',
    title: 'Job Match Found',
    description: 'A new plumbing job matches your skills in Freetown',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    link: '/jobs/3',
  },
  {
    id: '4',
    type: 'review',
    title: 'New Review',
    description: 'You received a 5-star review from ABC Construction',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: '5',
    type: 'system',
    title: 'Profile Incomplete',
    description: 'Complete your profile to get more visibility',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    link: '/dashboard/professional/profile',
  },
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'message':
      return <MessageSquare size={16} className="text-secondary" />;
    case 'job':
      return <Briefcase size={16} className="text-primary" />;
    case 'application':
      return <UserCheck size={16} className="text-accent" />;
    case 'review':
      return <Star size={16} className="text-accent fill-accent" />;
    default:
      return <Bell size={16} className="text-muted-foreground" />;
  }
};

export const NotificationsDropdown = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    // TODO: Supabase - Update all notifications as read
    // await supabase.from('notifications').update({ read: true }).eq('user_id', userId)
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    // TODO: Supabase - Update single notification as read
    // await supabase.from('notifications').update({ read: true }).eq('id', id)
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 hover:bg-accent/10 rounded-full transition-colors">
          <Bell size={20} />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
              variant="destructive"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-heading font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs h-7">
              <Check size={14} className="mr-1" />
              Mark all read
            </Button>
          )}
        </div>
        
        <ScrollArea className="h-80">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              <Bell size={32} className="mx-auto mb-2 opacity-50" />
              <p>No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {notifications.map((notification) => (
                <Link
                  key={notification.id}
                  to={notification.link || '#'}
                  onClick={() => markAsRead(notification.id)}
                  className={`flex gap-3 p-4 hover:bg-muted/50 transition-colors ${
                    !notification.read ? 'bg-primary/5' : ''
                  }`}
                >
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </ScrollArea>

        <DropdownMenuSeparator />
        <div className="p-2">
          <Link to="/notifications/settings">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Settings size={14} className="mr-2" />
              Notification Settings
            </Button>
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
