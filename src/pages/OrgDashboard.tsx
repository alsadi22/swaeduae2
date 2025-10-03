import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, Users, Clock, Award, TrendingUp, 
  AlertCircle, CheckCircle, Bell, MessageSquare,
  Plus, Eye, Edit, MoreHorizontal, MapPin,
  UserCheck, UserX, Star, Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  volunteersNeeded: number;
  volunteersRegistered: number;
  status: 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
}

interface Approval {
  id: string;
  volunteerName: string;
  eventTitle: string;
  hours: number;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  evidence?: string;
}

interface Message {
  id: string;
  type: 'system' | 'volunteer' | 'admin';
  title: string;
  content: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

export default function OrgDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock data
  const stats = {
    totalEvents: 24,
    activeEvents: 8,
    totalVolunteers: 156,
    pendingApprovals: 12,
    totalHours: 2847,
    certificatesIssued: 89
  };

  const upcomingEvents: Event[] = [
    {
      id: '1',
      title: 'Beach Cleanup Drive',
      date: '2024-03-25',
      time: '08:00',
      location: 'Jumeirah Beach, Dubai',
      volunteersNeeded: 50,
      volunteersRegistered: 42,
      status: 'published',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Food Distribution',
      date: '2024-03-28',
      time: '17:00',
      location: 'Al Karama Community Center',
      volunteersNeeded: 20,
      volunteersRegistered: 15,
      status: 'published',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Tree Planting Initiative',
      date: '2024-04-02',
      time: '09:00',
      location: 'Dubai Miracle Garden',
      volunteersNeeded: 30,
      volunteersRegistered: 8,
      status: 'draft',
      priority: 'medium'
    }
  ];

  const pendingApprovals: Approval[] = [
    {
      id: '1',
      volunteerName: 'Ahmed Al-Mansouri',
      eventTitle: 'Community Garden Project',
      hours: 4,
      date: '2024-03-20',
      status: 'pending',
      evidence: 'Photo evidence attached'
    },
    {
      id: '2',
      volunteerName: 'Fatima Hassan',
      eventTitle: 'Senior Care Visit',
      hours: 3,
      date: '2024-03-19',
      status: 'pending'
    },
    {
      id: '3',
      volunteerName: 'Mohammed Ali',
      eventTitle: 'Beach Cleanup Drive',
      hours: 5,
      date: '2024-03-18',
      status: 'pending',
      evidence: 'GPS location verified'
    }
  ];

  const recentMessages: Message[] = [
    {
      id: '1',
      type: 'system',
      title: 'New Volunteer Registration',
      content: '5 new volunteers have registered for your upcoming Beach Cleanup event.',
      timestamp: '2024-03-21T10:30:00Z',
      read: false,
      priority: 'medium'
    },
    {
      id: '2',
      type: 'volunteer',
      title: 'Event Inquiry',
      content: 'A volunteer has asked about transportation options for the Food Distribution event.',
      timestamp: '2024-03-21T09:15:00Z',
      read: false,
      priority: 'low'
    },
    {
      id: '3',
      type: 'admin',
      title: 'Document Verification Required',
      content: 'Please update your organization insurance certificate before March 30th.',
      timestamp: '2024-03-20T14:45:00Z',
      read: true,
      priority: 'high'
    }
  ];

  const getEventStatusBadge = (status: Event['status']) => {
    const statusConfig = {
      draft: { label: 'Draft', className: 'bg-gray-100 text-gray-800' },
      published: { label: 'Published', className: 'bg-green-100 text-green-800' },
      ongoing: { label: 'Ongoing', className: 'bg-blue-100 text-blue-800' },
      completed: { label: 'Completed', className: 'bg-purple-100 text-purple-800' },
      cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority: 'low' | 'medium' | 'high') => {
    const priorityConfig = {
      low: { label: 'Low', className: 'bg-gray-100 text-gray-600' },
      medium: { label: 'Medium', className: 'bg-yellow-100 text-yellow-700' },
      high: { label: 'High', className: 'bg-red-100 text-red-700' }
    };
    
    const config = priorityConfig[priority];
    return <Badge variant="outline" className={config.className}>{config.label}</Badge>;
  };

  const getMessageIcon = (type: Message['type']) => {
    switch (type) {
      case 'system':
        return <Bell className="h-4 w-4 text-blue-600" />;
      case 'volunteer':
        return <Users className="h-4 w-4 text-green-600" />;
      case 'admin':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Organization Dashboard</h1>
            <p className="text-gray-600">Dubai Community Foundation</p>
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/org/events/create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </Link>
            <Button variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.totalEvents}</div>
              <div className="text-sm text-gray-600">Total Events</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.activeEvents}</div>
              <div className="text-sm text-gray-600">Active Events</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.totalVolunteers}</div>
              <div className="text-sm text-gray-600">Total Volunteers</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.pendingApprovals}</div>
              <div className="text-sm text-gray-600">Pending Approvals</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.totalHours.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Hours</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.certificatesIssued}</div>
              <div className="text-sm text-gray-600">Certificates</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="approvals">Approvals</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Upcoming Events</CardTitle>
                    <Link to="/org/events">
                      <Button variant="outline" size="sm">View All</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-start justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium">{event.title}</h4>
                            {getEventStatusBadge(event.status)}
                            {getPriorityBadge(event.priority)}
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(event.date)} at {event.time}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="h-3 w-3" />
                              <span>{event.volunteersRegistered}/{event.volunteersNeeded} volunteers</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Link to={`/org/events/${event.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link to={`/org/events/${event.id}/edit`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-2 border-l-4 border-green-500 bg-green-50">
                      <UserCheck className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">New volunteer registered</p>
                        <p className="text-xs text-gray-600">Sarah Ahmed joined Beach Cleanup Drive</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-2 border-l-4 border-blue-500 bg-blue-50">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Hours approved</p>
                        <p className="text-xs text-gray-600">Approved 4 hours for Ahmed Al-Mansouri</p>
                        <p className="text-xs text-gray-500">5 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-2 border-l-4 border-purple-500 bg-purple-50">
                      <Award className="h-5 w-5 text-purple-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Certificate issued</p>
                        <p className="text-xs text-gray-600">Completion certificate for Food Distribution</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-2 border-l-4 border-orange-500 bg-orange-50">
                      <Calendar className="h-5 w-5 text-orange-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Event published</p>
                        <p className="text-xs text-gray-600">Tree Planting Initiative is now live</p>
                        <p className="text-xs text-gray-500">2 days ago</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-2 border-l-4 border-red-500 bg-red-50">
                      <UserX className="h-5 w-5 text-red-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Volunteer cancelled</p>
                        <p className="text-xs text-gray-600">Mohammed Ali cancelled Food Distribution</p>
                        <p className="text-xs text-gray-500">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Alert className="border-orange-200 bg-orange-50">
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                    <AlertDescription className="text-orange-800">
                      <strong>Document Update Required:</strong> Your organization insurance certificate expires on March 30th. 
                      Please upload a renewed certificate to maintain active status.
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-blue-200 bg-blue-50">
                    <Bell className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      <strong>New Feature:</strong> QR code kiosk mode is now available for event check-ins. 
                      Enable it in your event settings for easier volunteer management.
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      <strong>Monthly Report Ready:</strong> Your February volunteer impact report is ready for download. 
                      It includes 89 total hours and 15 certificates issued.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Event Management</CardTitle>
                  <Link to="/org/events/create">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Event
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium">{event.title}</h4>
                          {getEventStatusBadge(event.status)}
                          {getPriorityBadge(event.priority)}
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(event.date)} at {event.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{event.volunteersRegistered}/{event.volunteersNeeded} volunteers</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link to={`/org/events/${event.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </Link>
                        <Link to={`/org/events/${event.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approvals" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Pending Hours Approvals</CardTitle>
                  <Badge className="bg-orange-100 text-orange-800">
                    {pendingApprovals.length} Pending
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApprovals.map((approval) => (
                    <div key={approval.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium">{approval.volunteerName}</h4>
                          <Badge variant="outline" className="text-xs">
                            {approval.hours} hours
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p><strong>Event:</strong> {approval.eventTitle}</p>
                          <p><strong>Date:</strong> {formatDate(approval.date)}</p>
                          {approval.evidence && (
                            <p><strong>Evidence:</strong> {approval.evidence}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                          Reject
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMessages.map((message) => (
                    <div key={message.id} className={`p-4 border rounded-lg ${!message.read ? 'bg-blue-50 border-blue-200' : ''}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getMessageIcon(message.type)}
                          <h4 className="font-medium">{message.title}</h4>
                          {getPriorityBadge(message.priority)}
                          {!message.read && (
                            <Badge className="bg-blue-600 text-white text-xs">New</Badge>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">{formatDateTime(message.timestamp)}</span>
                      </div>
                      <p className="text-sm text-gray-700">{message.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}