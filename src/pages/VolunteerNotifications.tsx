import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Bell, Mail, MessageSquare, Calendar, Award, Users, Settings,
  Check, X, Eye, Archive, Filter, Search, Volume2, VolumeX,
  Smartphone, Monitor, Clock, Star, AlertTriangle, Info
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'event' | 'reminder' | 'achievement' | 'message' | 'system' | 'opportunity';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  actionUrl?: string;
  sender?: {
    name: string;
    organization: string;
    avatar: string;
  };
  metadata?: {
    eventId?: string;
    certificateId?: string;
    messageId?: string;
  };
}

interface NotificationSettings {
  email: {
    newOpportunities: boolean;
    eventReminders: boolean;
    eventUpdates: boolean;
    achievements: boolean;
    messages: boolean;
    systemUpdates: boolean;
    weeklyDigest: boolean;
  };
  push: {
    newOpportunities: boolean;
    eventReminders: boolean;
    eventUpdates: boolean;
    achievements: boolean;
    messages: boolean;
    systemUpdates: boolean;
    urgentOnly: boolean;
  };
  sms: {
    eventReminders: boolean;
    urgentUpdates: boolean;
    emergencyAlerts: boolean;
  };
  inApp: {
    all: boolean;
    sound: boolean;
    desktop: boolean;
  };
}

export default function VolunteerNotifications() {
  const [activeTab, setActiveTab] = useState<'notifications' | 'settings'>('notifications');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  // Mock notifications data
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'event',
      title: 'Event Reminder: Beach Cleanup Tomorrow',
      message: 'Don\'t forget about the Dubai Marina Beach Cleanup starting at 8:00 AM tomorrow. Please bring sun protection and water.',
      timestamp: '2024-03-24T18:00:00Z',
      read: false,
      priority: 'high',
      sender: {
        name: 'Green Initiative UAE',
        organization: 'Green Initiative UAE',
        avatar: '/api/placeholder/40/40'
      },
      metadata: {
        eventId: 'event-1'
      }
    },
    {
      id: '2',
      type: 'achievement',
      title: 'New Badge Earned: Environmental Champion',
      message: 'Congratulations! You\'ve earned the Environmental Champion badge for completing 10 environmental volunteer events.',
      timestamp: '2024-03-24T15:30:00Z',
      read: false,
      priority: 'medium',
      metadata: {
        certificateId: 'badge-env-champion'
      }
    },
    {
      id: '3',
      type: 'opportunity',
      title: 'New Volunteer Opportunity: Food Distribution',
      message: 'Emirates Food Bank has posted a new volunteer opportunity for Ramadan food distribution. 20 volunteers needed.',
      timestamp: '2024-03-24T12:15:00Z',
      read: true,
      priority: 'medium',
      sender: {
        name: 'Emirates Food Bank',
        organization: 'Emirates Food Bank',
        avatar: '/api/placeholder/40/40'
      }
    },
    {
      id: '4',
      type: 'message',
      title: 'Message from Sarah Al-Zahra',
      message: 'Thank you for your excellent work during yesterday\'s beach cleanup. Your leadership made a real difference!',
      timestamp: '2024-03-23T20:45:00Z',
      read: true,
      priority: 'low',
      sender: {
        name: 'Sarah Al-Zahra',
        organization: 'Green Initiative UAE',
        avatar: '/api/placeholder/40/40'
      },
      metadata: {
        messageId: 'msg-123'
      }
    },
    {
      id: '5',
      type: 'reminder',
      title: 'Certificate Submission Deadline',
      message: 'Reminder: Submit your volunteer hours for the Children Education Workshop by March 26th to receive your certificate.',
      timestamp: '2024-03-23T16:00:00Z',
      read: true,
      priority: 'high'
    },
    {
      id: '6',
      type: 'system',
      title: 'Platform Maintenance Scheduled',
      message: 'SwaedUAE will undergo scheduled maintenance on March 27th from 2:00-4:00 AM. Some features may be temporarily unavailable.',
      timestamp: '2024-03-23T10:00:00Z',
      read: true,
      priority: 'low'
    }
  ];

  // Mock notification settings
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    email: {
      newOpportunities: true,
      eventReminders: true,
      eventUpdates: true,
      achievements: true,
      messages: true,
      systemUpdates: false,
      weeklyDigest: true
    },
    push: {
      newOpportunities: true,
      eventReminders: true,
      eventUpdates: true,
      achievements: true,
      messages: true,
      systemUpdates: false,
      urgentOnly: false
    },
    sms: {
      eventReminders: true,
      urgentUpdates: true,
      emergencyAlerts: true
    },
    inApp: {
      all: true,
      sound: true,
      desktop: true
    }
  });

  const notificationTypes = [
    { id: 'all', name: 'All Notifications', icon: <Bell className="h-4 w-4" /> },
    { id: 'event', name: 'Events', icon: <Calendar className="h-4 w-4" /> },
    { id: 'opportunity', name: 'Opportunities', icon: <Users className="h-4 w-4" /> },
    { id: 'achievement', name: 'Achievements', icon: <Award className="h-4 w-4" /> },
    { id: 'message', name: 'Messages', icon: <MessageSquare className="h-4 w-4" /> },
    { id: 'reminder', name: 'Reminders', icon: <Clock className="h-4 w-4" /> },
    { id: 'system', name: 'System', icon: <Settings className="h-4 w-4" /> }
  ];

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = selectedFilter === 'all' || notification.type === selectedFilter;
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesReadStatus = !showUnreadOnly || !notification.read;
    
    return matchesFilter && matchesSearch && matchesReadStatus;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getPriorityIcon = (priority: Notification['priority']) => {
    switch (priority) {
      case 'urgent':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'medium':
        return <Info className="h-4 w-4 text-blue-600" />;
      default:
        return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTypeIcon = (type: Notification['type']) => {
    const icons = {
      event: <Calendar className="h-4 w-4" />,
      opportunity: <Users className="h-4 w-4" />,
      achievement: <Award className="h-4 w-4" />,
      message: <MessageSquare className="h-4 w-4" />,
      reminder: <Clock className="h-4 w-4" />,
      system: <Settings className="h-4 w-4" />
    };
    return icons[type];
  };

  const handleMarkAsRead = (notificationId: string) => {
    alert(`Notification ${notificationId} marked as read`);
  };

  const handleMarkAllAsRead = () => {
    alert('All notifications marked as read');
  };

  const handleDeleteNotification = (notificationId: string) => {
    alert(`Notification ${notificationId} deleted`);
  };

  const handleArchiveNotification = (notificationId: string) => {
    alert(`Notification ${notificationId} archived`);
  };

  const testNotification = () => {
    alert('Test notification sent!');
  };

  const updateNotificationSetting = (category: keyof NotificationSettings, setting: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600">Manage your notifications and communication preferences</p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className="flex items-center space-x-1">
              <Bell className="h-4 w-4" />
              <span>{unreadCount} unread</span>
            </Badge>
            <Button variant="outline" onClick={handleMarkAllAsRead}>
              <Check className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <Button
            variant={activeTab === 'notifications' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('notifications')}
            className="flex-1"
          >
            <Bell className="h-4 w-4 mr-2" />
            Notifications ({notifications.length})
          </Button>
          <Button
            variant={activeTab === 'settings' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('settings')}
            className="flex-1"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            {/* Filters and Search */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search notifications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {notificationTypes.map(type => (
                        <Button
                          key={type.id}
                          variant={selectedFilter === type.id ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedFilter(type.id)}
                          className="flex items-center space-x-2"
                        >
                          {type.icon}
                          <span>{type.name}</span>
                        </Button>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={showUnreadOnly}
                        onCheckedChange={setShowUnreadOnly}
                      />
                      <span className="text-sm text-gray-600">Unread only</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications List */}
            <div className="space-y-3">
              {filteredNotifications.map(notification => (
                <Card key={notification.id} className={`hover:shadow-md transition-shadow ${
                  !notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      {notification.sender ? (
                        <img 
                          src={notification.sender.avatar} 
                          alt={notification.sender.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          {getTypeIcon(notification.type)}
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-2">
                            <h4 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            {getPriorityIcon(notification.priority)}
                            <span className="text-xs text-gray-500">
                              {new Date(notification.timestamp).toLocaleDateString()} {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                        
                        {notification.sender && (
                          <div className="text-sm text-gray-600 mb-2">
                            From: {notification.sender.name} • {notification.sender.organization}
                          </div>
                        )}
                        
                        <p className={`text-sm mb-3 ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="flex items-center space-x-1">
                            {getTypeIcon(notification.type)}
                            <span className="capitalize">{notification.type}</span>
                          </Badge>
                          
                          <div className="flex items-center space-x-2">
                            {!notification.read && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleMarkAsRead(notification.id)}
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Mark Read
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleArchiveNotification(notification.id)}
                            >
                              <Archive className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeleteNotification(notification.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredNotifications.length === 0 && (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
                <p className="text-gray-600">
                  {showUnreadOnly ? 'No unread notifications' : 'No notifications match your current filters'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Email Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>Email Notifications</span>
                </CardTitle>
                <CardDescription>Configure which notifications you receive via email</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(notificationSettings.email).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {key === 'newOpportunities' && 'Get notified about new volunteer opportunities'}
                        {key === 'eventReminders' && 'Receive reminders before your registered events'}
                        {key === 'eventUpdates' && 'Get updates about changes to your events'}
                        {key === 'achievements' && 'Celebrate your volunteer achievements and milestones'}
                        {key === 'messages' && 'Receive messages from organizations and other volunteers'}
                        {key === 'systemUpdates' && 'Important platform updates and maintenance notices'}
                        {key === 'weeklyDigest' && 'Weekly summary of your volunteer activity'}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => updateNotificationSetting('email', key, checked)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Push Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Smartphone className="h-5 w-5" />
                  <span>Push Notifications</span>
                </CardTitle>
                <CardDescription>Manage push notifications for mobile and desktop</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(notificationSettings.push).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {key === 'newOpportunities' && 'Instant notifications for new opportunities'}
                        {key === 'eventReminders' && 'Push reminders before events'}
                        {key === 'eventUpdates' && 'Real-time event updates'}
                        {key === 'achievements' && 'Celebrate achievements instantly'}
                        {key === 'messages' && 'New message notifications'}
                        {key === 'systemUpdates' && 'Critical system notifications'}
                        {key === 'urgentOnly' && 'Only receive urgent/high priority notifications'}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => updateNotificationSetting('push', key, checked)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* SMS Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>SMS Notifications</span>
                </CardTitle>
                <CardDescription>Configure SMS notifications for critical updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(notificationSettings.sms).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {key === 'eventReminders' && 'SMS reminders for upcoming events'}
                        {key === 'urgentUpdates' && 'Critical event changes and cancellations'}
                        {key === 'emergencyAlerts' && 'Emergency notifications and safety alerts'}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => updateNotificationSetting('sms', key, checked)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* In-App Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Monitor className="h-5 w-5" />
                  <span>In-App Settings</span>
                </CardTitle>
                <CardDescription>Configure in-app notification behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(notificationSettings.inApp).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {key === 'all' && 'Show all in-app notifications'}
                        {key === 'sound' && 'Play notification sounds'}
                        {key === 'desktop' && 'Show desktop notifications when browser is open'}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => updateNotificationSetting('inApp', key, checked)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Test Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>Test Notifications</CardTitle>
                <CardDescription>Test your notification settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Button onClick={testNotification}>
                    <Bell className="h-4 w-4 mr-2" />
                    Send Test Notification
                  </Button>
                  <p className="text-sm text-gray-600">
                    This will send a test notification using your current settings
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}