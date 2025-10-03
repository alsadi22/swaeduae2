import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, Users, MapPin, Plus, Search, Filter,
  Eye, Edit, Copy, Trash2, MoreHorizontal,
  Clock, CheckCircle, AlertCircle, XCircle,
  TrendingUp, Download, Share2
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  address: string;
  category: string;
  volunteersNeeded: number;
  volunteersRegistered: number;
  volunteersAttended?: number;
  status: 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export default function OrgEvents() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Beach Cleanup Drive',
      description: 'Join us for a community beach cleanup to protect our marine environment.',
      date: '2024-03-25',
      startTime: '08:00',
      endTime: '12:00',
      location: 'Jumeirah Beach',
      address: 'Jumeirah Beach, Dubai, UAE',
      category: 'Environment',
      volunteersNeeded: 50,
      volunteersRegistered: 42,
      volunteersAttended: 38,
      status: 'completed',
      priority: 'high',
      createdAt: '2024-03-01T10:00:00Z',
      updatedAt: '2024-03-20T14:30:00Z',
      createdBy: 'Ahmed Al-Mansouri'
    },
    {
      id: '2',
      title: 'Food Distribution',
      description: 'Help distribute meals to families in need during Ramadan.',
      date: '2024-03-28',
      startTime: '17:00',
      endTime: '20:00',
      location: 'Al Karama Community Center',
      address: 'Al Karama, Dubai, UAE',
      category: 'Community Service',
      volunteersNeeded: 20,
      volunteersRegistered: 15,
      status: 'published',
      priority: 'medium',
      createdAt: '2024-03-05T09:00:00Z',
      updatedAt: '2024-03-15T16:45:00Z',
      createdBy: 'Fatima Hassan'
    },
    {
      id: '3',
      title: 'Tree Planting Initiative',
      description: 'Plant native trees to enhance Dubai\'s green spaces.',
      date: '2024-04-02',
      startTime: '09:00',
      endTime: '13:00',
      location: 'Dubai Miracle Garden',
      address: 'Al Barsha South, Dubai, UAE',
      category: 'Environment',
      volunteersNeeded: 30,
      volunteersRegistered: 8,
      status: 'draft',
      priority: 'medium',
      createdAt: '2024-03-10T11:30:00Z',
      updatedAt: '2024-03-18T08:15:00Z',
      createdBy: 'Mohammed Ali'
    },
    {
      id: '4',
      title: 'Senior Care Visit',
      description: 'Spend time with elderly residents and provide companionship.',
      date: '2024-04-05',
      startTime: '14:00',
      endTime: '17:00',
      location: 'Golden Years Care Home',
      address: 'Bur Dubai, Dubai, UAE',
      category: 'Healthcare',
      volunteersNeeded: 15,
      volunteersRegistered: 12,
      status: 'published',
      priority: 'low',
      createdAt: '2024-03-12T13:20:00Z',
      updatedAt: '2024-03-19T10:00:00Z',
      createdBy: 'Sarah Ahmed'
    },
    {
      id: '5',
      title: 'Educational Workshop',
      description: 'Teach digital literacy skills to underprivileged youth.',
      date: '2024-04-08',
      startTime: '10:00',
      endTime: '15:00',
      location: 'Community Learning Center',
      address: 'Deira, Dubai, UAE',
      category: 'Education',
      volunteersNeeded: 25,
      volunteersRegistered: 18,
      status: 'ongoing',
      priority: 'high',
      createdAt: '2024-03-08T15:45:00Z',
      updatedAt: '2024-03-21T12:30:00Z',
      createdBy: 'Ahmed Al-Mansouri'
    }
  ]);

  const [selectedTab, setSelectedTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const categories = [
    'Environment', 'Community Service', 'Healthcare', 'Education',
    'Youth Development', 'Senior Care', 'Animal Welfare', 'Arts & Culture'
  ];

  const getStatusBadge = (status: Event['status']) => {
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

  const getPriorityBadge = (priority: Event['priority']) => {
    const priorityConfig = {
      low: { label: 'Low', className: 'bg-gray-100 text-gray-600' },
      medium: { label: 'Medium', className: 'bg-yellow-100 text-yellow-700' },
      high: { label: 'High', className: 'bg-red-100 text-red-700' }
    };
    
    const config = priorityConfig[priority];
    return <Badge variant="outline" className={config.className}>{config.label}</Badge>;
  };

  const getStatusIcon = (status: Event['status']) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'ongoing':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-purple-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      case 'volunteers':
        return b.volunteersRegistered - a.volunteersRegistered;
      case 'created':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  const getEventsByStatus = (status: string) => {
    if (status === 'all') return events;
    return events.filter(event => event.status === status);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-AE', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleDuplicateEvent = (eventId: string) => {
    const eventToDuplicate = events.find(e => e.id === eventId);
    if (eventToDuplicate) {
      const newEvent: Event = {
        ...eventToDuplicate,
        id: Date.now().toString(),
        title: `${eventToDuplicate.title} (Copy)`,
        status: 'draft',
        volunteersRegistered: 0,
        volunteersAttended: undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setEvents(prev => [newEvent, ...prev]);
      alert('Event duplicated successfully!');
    }
  };

  const handleDeleteEvent = (eventId: string) => {
    if (confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      setEvents(prev => prev.filter(e => e.id !== eventId));
      alert('Event deleted successfully.');
    }
  };

  const handleStatusChange = (eventId: string, newStatus: Event['status']) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, status: newStatus, updatedAt: new Date().toISOString() }
        : event
    ));
    alert(`Event status updated to ${newStatus}.`);
  };

  const stats = {
    total: events.length,
    published: events.filter(e => e.status === 'published').length,
    ongoing: events.filter(e => e.status === 'ongoing').length,
    completed: events.filter(e => e.status === 'completed').length,
    draft: events.filter(e => e.status === 'draft').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Event Management</h1>
            <p className="text-gray-600">Create and manage volunteer opportunities</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Link to="/org/events/create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Events</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.published}</div>
              <div className="text-sm text-gray-600">Published</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.ongoing}</div>
              <div className="text-sm text-gray-600">Ongoing</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.completed}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <AlertCircle className="h-8 w-8 text-gray-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.draft}</div>
              <div className="text-sm text-gray-600">Drafts</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search events..."
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
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="volunteers">Volunteers</SelectItem>
                  <SelectItem value="created">Created</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Events Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="all">All Events ({events.length})</TabsTrigger>
            <TabsTrigger value="published">Published ({stats.published})</TabsTrigger>
            <TabsTrigger value="draft">Drafts ({stats.draft})</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing ({stats.ongoing})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({stats.completed})</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="mt-6">
            <div className="space-y-4">
              {sortedEvents.length > 0 ? (
                sortedEvents.map((event) => (
                  <Card key={event.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            {getStatusIcon(event.status)}
                            <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                            {getStatusBadge(event.status)}
                            {getPriorityBadge(event.priority)}
                          </div>
                          
                          <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                          
                          <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(event.date)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4" />
                              <span>{event.volunteersRegistered}/{event.volunteersNeeded} volunteers</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 mt-4 text-xs text-gray-500">
                            <span>Created by {event.createdBy}</span>
                            <span>•</span>
                            <span>Category: {event.category}</span>
                            <span>•</span>
                            <span>Updated: {new Date(event.updatedAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
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

                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDuplicateEvent(event.id)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>

                          <Select
                            value={event.status}
                            onValueChange={(value: Event['status']) => handleStatusChange(event.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="published">Published</SelectItem>
                              <SelectItem value="ongoing">Ongoing</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>

                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteEvent(event.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Progress Bar for Volunteer Registration */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">Volunteer Registration</span>
                          <span className="font-medium">
                            {Math.round((event.volunteersRegistered / event.volunteersNeeded) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ 
                              width: `${Math.min((event.volunteersRegistered / event.volunteersNeeded) * 100, 100)}%` 
                            }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
                    <p className="text-gray-600 mb-4">
                      {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
                        ? 'Try adjusting your search or filters.'
                        : 'Create your first event to get started.'
                      }
                    </p>
                    {!searchTerm && statusFilter === 'all' && categoryFilter === 'all' && (
                      <Link to="/org/events/create">
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Create Your First Event
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}