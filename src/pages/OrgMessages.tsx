import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  MessageSquare, Send, Plus, Search, Filter, Calendar,
  Users, Mail, Phone, Eye, Edit, Trash2, Copy,
  CheckCircle, Clock, AlertCircle, TrendingUp, MoreHorizontal
} from 'lucide-react';

interface Message {
  id: string;
  title: string;
  content: string;
  type: 'announcement' | 'reminder' | 'update' | 'urgent';
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  recipients: {
    type: 'all' | 'event' | 'custom';
    count: number;
    details: string;
  };
  channels: ('email' | 'sms' | 'push')[];
  scheduledAt?: string;
  sentAt?: string;
  createdAt: string;
  createdBy: string;
  openRate?: number;
  clickRate?: number;
  responseRate?: number;
  template?: string;
}

interface MessageTemplate {
  id: string;
  name: string;
  category: string;
  subject: string;
  content: string;
  variables: string[];
  usageCount: number;
  isActive: boolean;
}

export default function OrgMessages() {
  const [selectedTab, setSelectedTab] = useState('messages');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showComposeDialog, setShowComposeDialog] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);

  const [newMessage, setNewMessage] = useState({
    title: '',
    content: '',
    type: 'announcement' as const,
    recipientType: 'all' as const,
    eventId: '',
    customRecipients: '',
    channels: ['email'] as ('email' | 'sms' | 'push')[],
    scheduleType: 'now' as 'now' | 'later',
    scheduledDate: '',
    scheduledTime: '',
    template: ''
  });

  const [newTemplate, setNewTemplate] = useState({
    name: '',
    category: '',
    subject: '',
    content: ''
  });

  // Mock data
  const messages: Message[] = [
    {
      id: '1',
      title: 'Beach Cleanup Event Reminder',
      content: 'Don\'t forget about tomorrow\'s beach cleanup event at Jumeirah Beach. Please arrive by 8:00 AM with your water bottle and sun protection.',
      type: 'reminder',
      status: 'sent',
      recipients: {
        type: 'event',
        count: 42,
        details: 'Beach Cleanup Drive participants'
      },
      channels: ['email', 'sms'],
      sentAt: '2024-03-24T18:00:00Z',
      createdAt: '2024-03-24T16:30:00Z',
      createdBy: 'Sarah Ahmed',
      openRate: 85,
      clickRate: 23,
      responseRate: 12
    },
    {
      id: '2',
      title: 'New Volunteer Opportunities Available',
      content: 'We have exciting new volunteer opportunities in environmental conservation and community development. Check out the latest events and register today!',
      type: 'announcement',
      status: 'sent',
      recipients: {
        type: 'all',
        count: 156,
        details: 'All registered volunteers'
      },
      channels: ['email', 'push'],
      sentAt: '2024-03-23T10:00:00Z',
      createdAt: '2024-03-23T09:15:00Z',
      createdBy: 'Ahmed Al-Mansouri',
      openRate: 72,
      clickRate: 18,
      responseRate: 8
    },
    {
      id: '3',
      title: 'Certificate Issuance Update',
      content: 'Your volunteer certificates for the Tree Planting Initiative are now ready for download. You can access them from your volunteer dashboard.',
      type: 'update',
      status: 'scheduled',
      recipients: {
        type: 'event',
        count: 28,
        details: 'Tree Planting Initiative participants'
      },
      channels: ['email'],
      scheduledAt: '2024-03-26T09:00:00Z',
      createdAt: '2024-03-25T14:20:00Z',
      createdBy: 'Fatima Hassan'
    },
    {
      id: '4',
      title: 'Emergency: Event Cancellation',
      content: 'Due to severe weather conditions, the outdoor cleanup event scheduled for today has been cancelled. We will reschedule and notify you soon.',
      type: 'urgent',
      status: 'failed',
      recipients: {
        type: 'event',
        count: 35,
        details: 'Outdoor Cleanup participants'
      },
      channels: ['email', 'sms', 'push'],
      createdAt: '2024-03-22T07:00:00Z',
      createdBy: 'Sarah Ahmed'
    }
  ];

  const templates: MessageTemplate[] = [
    {
      id: '1',
      name: 'Event Reminder',
      category: 'Reminders',
      subject: 'Reminder: {{event_title}} - {{event_date}}',
      content: 'Hi {{volunteer_name}},\n\nThis is a friendly reminder about the upcoming {{event_title}} on {{event_date}} at {{event_time}}.\n\nLocation: {{event_location}}\n\nPlease remember to bring:\n- Water bottle\n- Comfortable clothing\n- Sun protection\n\nWe look forward to seeing you there!\n\nBest regards,\n{{organization_name}}',
      variables: ['volunteer_name', 'event_title', 'event_date', 'event_time', 'event_location', 'organization_name'],
      usageCount: 45,
      isActive: true
    },
    {
      id: '2',
      name: 'Welcome New Volunteer',
      category: 'Onboarding',
      subject: 'Welcome to {{organization_name}}!',
      content: 'Dear {{volunteer_name}},\n\nWelcome to our volunteer community! We\'re excited to have you join us in making a positive impact.\n\nYour volunteer profile has been created and you can now:\n- Browse available opportunities\n- Register for events\n- Track your volunteer hours\n- Download certificates\n\nIf you have any questions, please don\'t hesitate to contact us.\n\nThank you for choosing to volunteer with us!\n\n{{organization_name}}',
      variables: ['volunteer_name', 'organization_name'],
      usageCount: 23,
      isActive: true
    },
    {
      id: '3',
      name: 'Certificate Ready',
      category: 'Certificates',
      subject: 'Your volunteer certificate is ready!',
      content: 'Congratulations {{volunteer_name}}!\n\nYour volunteer certificate for {{event_title}} is now ready for download.\n\nEvent Details:\n- Date: {{event_date}}\n- Hours completed: {{hours_completed}}\n- Certificate ID: {{certificate_id}}\n\nYou can download your certificate from your volunteer dashboard or click the link below:\n{{download_link}}\n\nThank you for your valuable contribution!\n\n{{organization_name}}',
      variables: ['volunteer_name', 'event_title', 'event_date', 'hours_completed', 'certificate_id', 'download_link', 'organization_name'],
      usageCount: 67,
      isActive: true
    }
  ];

  const events = [
    { id: 'event-1', title: 'Beach Cleanup Drive', participants: 42 },
    { id: 'event-2', title: 'Food Distribution', participants: 35 },
    { id: 'event-3', title: 'Tree Planting Initiative', participants: 28 },
    { id: 'event-4', title: 'Senior Care Visit', participants: 15 }
  ];

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    const matchesType = typeFilter === 'all' || message.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: Message['status']) => {
    const statusConfig = {
      draft: { label: 'Draft', className: 'bg-gray-100 text-gray-600' },
      scheduled: { label: 'Scheduled', className: 'bg-blue-100 text-blue-800' },
      sent: { label: 'Sent', className: 'bg-green-100 text-green-800' },
      failed: { label: 'Failed', className: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getTypeBadge = (type: Message['type']) => {
    const typeConfig = {
      announcement: { label: 'Announcement', className: 'bg-blue-100 text-blue-800' },
      reminder: { label: 'Reminder', className: 'bg-yellow-100 text-yellow-800' },
      update: { label: 'Update', className: 'bg-green-100 text-green-800' },
      urgent: { label: 'Urgent', className: 'bg-red-100 text-red-800' }
    };
    
    const config = typeConfig[type];
    return <Badge variant="outline" className={config.className}>{config.label}</Badge>;
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'sms':
        return <Phone className="h-4 w-4" />;
      case 'push':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const handleChannelToggle = (channel: 'email' | 'sms' | 'push') => {
    setNewMessage(prev => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter(c => c !== channel)
        : [...prev.channels, channel]
    }));
  };

  const handleSendMessage = () => {
    if (!newMessage.title || !newMessage.content) {
      alert('Please fill in the title and content.');
      return;
    }

    if (newMessage.channels.length === 0) {
      alert('Please select at least one delivery channel.');
      return;
    }

    // Simulate sending message
    alert('Message sent successfully!');
    setShowComposeDialog(false);
    setNewMessage({
      title: '',
      content: '',
      type: 'announcement',
      recipientType: 'all',
      eventId: '',
      customRecipients: '',
      channels: ['email'],
      scheduleType: 'now',
      scheduledDate: '',
      scheduledTime: '',
      template: ''
    });
  };

  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.subject || !newTemplate.content) {
      alert('Please fill in all required fields.');
      return;
    }

    alert('Template created successfully!');
    setShowTemplateDialog(false);
    setNewTemplate({
      name: '',
      category: '',
      subject: '',
      content: ''
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stats = {
    total: messages.length,
    sent: messages.filter(m => m.status === 'sent').length,
    scheduled: messages.filter(m => m.status === 'scheduled').length,
    draft: messages.filter(m => m.status === 'draft').length,
    avgOpenRate: Math.round(messages.filter(m => m.openRate).reduce((sum, m) => sum + (m.openRate || 0), 0) / messages.filter(m => m.openRate).length) || 0
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Messages & Announcements</h1>
            <p className="text-gray-600">Communicate with volunteers and manage announcements</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={() => setShowTemplateDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Template
            </Button>
            <Button onClick={() => setShowComposeDialog(true)}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Compose Message
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <MessageSquare className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Messages</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.sent}</div>
              <div className="text-sm text-gray-600">Sent</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.scheduled}</div>
              <div className="text-sm text-gray-600">Scheduled</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Edit className="h-8 w-8 text-gray-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.draft}</div>
              <div className="text-sm text-gray-600">Drafts</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.avgOpenRate}%</div>
              <div className="text-sm text-gray-600">Avg Open Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Message Management */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="messages">Messages ({stats.total})</TabsTrigger>
            <TabsTrigger value="templates">Templates ({templates.length})</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex-1 min-w-64">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search messages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="sent">Sent</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="reminder">Reminder</SelectItem>
                      <SelectItem value="update">Update</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Messages List */}
            <div className="space-y-4">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((message) => (
                  <Card key={message.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{message.title}</h3>
                            {getStatusBadge(message.status)}
                            {getTypeBadge(message.type)}
                          </div>
                          
                          <p className="text-gray-600 mb-4 line-clamp-2">{message.content}</p>
                          
                          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <Users className="h-4 w-4" />
                                <span><strong>Recipients:</strong> {message.recipients.count} ({message.recipients.details})</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4" />
                                <span><strong>Created:</strong> {formatDateTime(message.createdAt)} by {message.createdBy}</span>
                              </div>
                              {message.scheduledAt && (
                                <div className="flex items-center space-x-2">
                                  <Clock className="h-4 w-4" />
                                  <span><strong>Scheduled:</strong> {formatDateTime(message.scheduledAt)}</span>
                                </div>
                              )}
                              {message.sentAt && (
                                <div className="flex items-center space-x-2">
                                  <Send className="h-4 w-4" />
                                  <span><strong>Sent:</strong> {formatDateTime(message.sentAt)}</span>
                                </div>
                              )}
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <span><strong>Channels:</strong></span>
                                <div className="flex items-center space-x-1">
                                  {message.channels.map((channel) => (
                                    <div key={channel} className="flex items-center space-x-1">
                                      {getChannelIcon(channel)}
                                      <span className="capitalize">{channel}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              {message.openRate !== undefined && (
                                <div className="space-y-1">
                                  <div><strong>Open Rate:</strong> {message.openRate}%</div>
                                  <div><strong>Click Rate:</strong> {message.clickRate}%</div>
                                  <div><strong>Response Rate:</strong> {message.responseRate}%</div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2 ml-4">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          
                          {message.status === 'draft' && (
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          )}

                          <Button variant="outline" size="sm">
                            <Copy className="h-4 w-4 mr-1" />
                            Duplicate
                          </Button>

                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
                    <p className="text-gray-600 mb-4">
                      {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                        ? 'Try adjusting your search or filters.'
                        : 'Create your first message to get started.'
                      }
                    </p>
                    <Button onClick={() => setShowComposeDialog(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Compose First Message
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card key={template.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{template.name}</h3>
                          <p className="text-sm text-gray-600">{template.category}</p>
                        </div>
                        <Badge className={template.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}>
                          {template.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      
                      <div className="text-sm">
                        <p className="font-medium mb-1">Subject:</p>
                        <p className="text-gray-600 line-clamp-1">{template.subject}</p>
                      </div>
                      
                      <div className="text-sm">
                        <p className="font-medium mb-1">Content Preview:</p>
                        <p className="text-gray-600 line-clamp-3">{template.content}</p>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Used {template.usageCount} times</span>
                        <span>{template.variables.length} variables</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Message Performance</CardTitle>
                  <CardDescription>Open rates and engagement metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Message performance chart would be displayed here
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Channel Effectiveness</CardTitle>
                  <CardDescription>Performance by delivery channel</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <span>Email</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">78%</div>
                        <div className="text-sm text-gray-600">Open rate</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-green-600" />
                        <span>SMS</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">92%</div>
                        <div className="text-sm text-gray-600">Read rate</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4 text-purple-600" />
                        <span>Push</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">65%</div>
                        <div className="text-sm text-gray-600">Open rate</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Compose Message Dialog */}
        <Dialog open={showComposeDialog} onOpenChange={setShowComposeDialog}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Compose Message</DialogTitle>
              <DialogDescription>
                Create and send a message to volunteers
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Message Title *</Label>
                  <Input
                    id="title"
                    value={newMessage.title}
                    onChange={(e) => setNewMessage(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Event reminder, announcement, etc."
                  />
                </div>

                <div>
                  <Label htmlFor="type">Message Type</Label>
                  <Select value={newMessage.type} onValueChange={(value: 'announcement' | 'reminder' | 'update' | 'urgent') => setNewMessage(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="reminder">Reminder</SelectItem>
                      <SelectItem value="update">Update</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="content">Message Content *</Label>
                <Textarea
                  id="content"
                  value={newMessage.content}
                  onChange={(e) => setNewMessage(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Write your message here..."
                  rows={6}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Recipients</Label>
                  <Select value={newMessage.recipientType} onValueChange={(value: 'all' | 'event' | 'custom') => setNewMessage(prev => ({ ...prev, recipientType: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Volunteers</SelectItem>
                      <SelectItem value="event">Event Participants</SelectItem>
                      <SelectItem value="custom">Custom List</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {newMessage.recipientType === 'event' && (
                  <div>
                    <Label>Select Event</Label>
                    <Select value={newMessage.eventId} onValueChange={(value) => setNewMessage(prev => ({ ...prev, eventId: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose event" />
                      </SelectTrigger>
                      <SelectContent>
                        {events.map((event) => (
                          <SelectItem key={event.id} value={event.id}>
                            {event.title} ({event.participants} participants)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div>
                <Label>Delivery Channels</Label>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="email"
                      checked={newMessage.channels.includes('email')}
                      onCheckedChange={() => handleChannelToggle('email')}
                    />
                    <Label htmlFor="email" className="flex items-center space-x-1">
                      <Mail className="h-4 w-4" />
                      <span>Email</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sms"
                      checked={newMessage.channels.includes('sms')}
                      onCheckedChange={() => handleChannelToggle('sms')}
                    />
                    <Label htmlFor="sms" className="flex items-center space-x-1">
                      <Phone className="h-4 w-4" />
                      <span>SMS</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="push"
                      checked={newMessage.channels.includes('push')}
                      onCheckedChange={() => handleChannelToggle('push')}
                    />
                    <Label htmlFor="push" className="flex items-center space-x-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>Push</span>
                    </Label>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label>Send Time</Label>
                  <Select value={newMessage.scheduleType} onValueChange={(value: 'now' | 'later') => setNewMessage(prev => ({ ...prev, scheduleType: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="now">Send Now</SelectItem>
                      <SelectItem value="later">Schedule Later</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {newMessage.scheduleType === 'later' && (
                  <>
                    <div>
                      <Label>Date</Label>
                      <Input
                        type="date"
                        value={newMessage.scheduledDate}
                        onChange={(e) => setNewMessage(prev => ({ ...prev, scheduledDate: e.target.value }))}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <Label>Time</Label>
                      <Input
                        type="time"
                        value={newMessage.scheduledTime}
                        onChange={(e) => setNewMessage(prev => ({ ...prev, scheduledTime: e.target.value }))}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowComposeDialog(false)}>
                  Cancel
                </Button>
                <Button variant="outline">
                  Save Draft
                </Button>
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4 mr-2" />
                  {newMessage.scheduleType === 'now' ? 'Send Now' : 'Schedule Message'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Template Dialog */}
        <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create Message Template</DialogTitle>
              <DialogDescription>
                Create a reusable message template
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="templateName">Template Name *</Label>
                <Input
                  id="templateName"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Event Reminder Template"
                />
              </div>

              <div>
                <Label htmlFor="templateCategory">Category</Label>
                <Select value={newTemplate.category} onValueChange={(value) => setNewTemplate(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Reminders">Reminders</SelectItem>
                    <SelectItem value="Announcements">Announcements</SelectItem>
                    <SelectItem value="Onboarding">Onboarding</SelectItem>
                    <SelectItem value="Certificates">Certificates</SelectItem>
                    <SelectItem value="Updates">Updates</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="templateSubject">Subject Line *</Label>
                <Input
                  id="templateSubject"
                  value={newTemplate.subject}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Reminder: {{event_title}} - {{event_date}}"
                />
              </div>

              <div>
                <Label htmlFor="templateContent">Template Content *</Label>
                <Textarea
                  id="templateContent"
                  value={newTemplate.content}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Hi {{volunteer_name}}, this is a reminder about..."
                  rows={6}
                />
              </div>

              <Alert className="border-blue-200 bg-blue-50">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  Use variables like {{volunteer_name}}, {{event_title}}, {{event_date}} to personalize messages.
                </AlertDescription>
              </Alert>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowTemplateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTemplate}>
                  Create Template
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}