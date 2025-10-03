import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Calendar, Search, Filter, MoreHorizontal, Eye, Edit, Ban,
  CheckCircle, XCircle, AlertTriangle, Clock, MapPin,
  Users, Award, Activity, ArrowLeft, Star, Download,
  FileText, MessageSquare, Play, Pause, Trash2, Flag
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Event {
  id: string;
  title: string;
  description: string;
  organizationId: string;
  organizationName: string;
  category: string;
  status: 'draft' | 'published' | 'active' | 'completed' | 'cancelled' | 'suspended';
  moderationStatus: 'approved' | 'pending' | 'flagged' | 'rejected';
  startDate: string;
  endDate: string;
  location: {
    emirate: string;
    city: string;
    address: string;
    coordinates?: { lat: number; lng: number };
  };
  capacity: number;
  registeredVolunteers: number;
  attendedVolunteers: number;
  requiredSkills: string[];
  ageRestriction: {
    min: number;
    max?: number;
  };
  requirements: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  completedAt?: string;
  rating?: number;
  reviewCount: number;
  flags: string[];
  adminNotes: string;
  moderationNotes: string;
  riskScore: number;
  impactMetrics?: {
    metric: string;
    target: number;
    achieved?: number;
    unit: string;
  }[];
}

export default function AdminEvents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [moderationFilter, setModerationFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [emirateFilter, setEmirateFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [showModerationDialog, setShowModerationDialog] = useState(false);
  const [moderationAction, setModerationAction] = useState<'approve' | 'flag' | 'reject' | ''>('');
  const [moderationNotes, setModerationNotes] = useState('');

  // Mock data
  const events: Event[] = [
    {
      id: '1',
      title: 'Beach Cleanup Drive - Jumeirah',
      description: 'Join us for a comprehensive beach cleanup initiative at Jumeirah Beach. We will focus on removing plastic waste, cigarette butts, and other debris to protect marine life.',
      organizationId: '1',
      organizationName: 'Dubai Environmental Foundation',
      category: 'Environment & Sustainability',
      status: 'active',
      moderationStatus: 'approved',
      startDate: '2024-03-30T08:00:00Z',
      endDate: '2024-03-30T12:00:00Z',
      location: {
        emirate: 'Dubai',
        city: 'Dubai',
        address: 'Jumeirah Beach, Dubai Marina',
        coordinates: { lat: 25.2048, lng: 55.2708 }
      },
      capacity: 50,
      registeredVolunteers: 42,
      attendedVolunteers: 38,
      requiredSkills: ['Environmental Conservation', 'Physical Activity'],
      ageRestriction: { min: 16 },
      requirements: ['Comfortable clothing', 'Sun protection', 'Water bottle'],
      createdAt: '2024-03-15T10:00:00Z',
      updatedAt: '2024-03-25T14:30:00Z',
      publishedAt: '2024-03-16T09:00:00Z',
      rating: 4.8,
      reviewCount: 35,
      flags: [],
      adminNotes: 'Excellent event with high volunteer satisfaction.',
      moderationNotes: 'Approved - meets all safety and environmental guidelines.',
      riskScore: 2,
      impactMetrics: [
        { metric: 'Waste Collected', target: 100, achieved: 127, unit: 'kg' },
        { metric: 'Beach Area Cleaned', target: 2, achieved: 2.5, unit: 'km' }
      ]
    },
    {
      id: '2',
      title: 'Community Food Distribution',
      description: 'Help distribute meals to families in need across Al Karama community. Volunteers will assist with food preparation, packaging, and distribution.',
      organizationId: '2',
      organizationName: 'UAE Community Support',
      category: 'Community Development',
      status: 'published',
      moderationStatus: 'pending',
      startDate: '2024-04-05T16:00:00Z',
      endDate: '2024-04-05T20:00:00Z',
      location: {
        emirate: 'Dubai',
        city: 'Al Karama',
        address: 'Al Karama Community Center, Dubai'
      },
      capacity: 30,
      registeredVolunteers: 18,
      attendedVolunteers: 0,
      requiredSkills: ['Food Handling', 'Community Service'],
      ageRestriction: { min: 18 },
      requirements: ['Food handling certificate preferred', 'Comfortable shoes', 'Apron will be provided'],
      createdAt: '2024-03-20T11:30:00Z',
      updatedAt: '2024-03-24T16:45:00Z',
      publishedAt: '2024-03-21T10:00:00Z',
      rating: 0,
      reviewCount: 0,
      flags: ['New Organization'],
      adminNotes: 'New organization - requires verification of food safety protocols.',
      moderationNotes: 'Pending review of food safety documentation.',
      riskScore: 4
    },
    {
      id: '3',
      title: 'Youth Coding Workshop',
      description: 'Teaching basic programming skills to underprivileged youth aged 12-18. Volunteers will assist with instruction and mentoring.',
      organizationId: '3',
      organizationName: 'Tech for Good UAE',
      category: 'Education & Literacy',
      status: 'suspended',
      moderationStatus: 'flagged',
      startDate: '2024-04-10T14:00:00Z',
      endDate: '2024-04-10T18:00:00Z',
      location: {
        emirate: 'Abu Dhabi',
        city: 'Al Reem Island',
        address: 'Community Learning Center, Al Reem Island'
      },
      capacity: 20,
      registeredVolunteers: 25,
      attendedVolunteers: 0,
      requiredSkills: ['Programming', 'Teaching', 'Youth Mentoring'],
      ageRestriction: { min: 21 },
      requirements: ['Programming experience required', 'Background check mandatory', 'Teaching materials provided'],
      createdAt: '2024-03-18T09:15:00Z',
      updatedAt: '2024-03-22T13:20:00Z',
      publishedAt: '2024-03-19T11:00:00Z',
      rating: 0,
      reviewCount: 0,
      flags: ['Overbooked', 'Missing Background Checks', 'Inadequate Supervision'],
      adminNotes: 'Suspended due to safety concerns and overbooked capacity.',
      moderationNotes: 'Flagged for inadequate child protection measures.',
      riskScore: 8
    },
    {
      id: '4',
      title: 'Senior Citizens Health Checkup',
      description: 'Free health screening and wellness checkup for senior citizens in Sharjah. Medical volunteers and general assistants needed.',
      organizationId: '4',
      organizationName: 'Sharjah Health Initiative',
      category: 'Healthcare & Medical',
      status: 'completed',
      moderationStatus: 'approved',
      startDate: '2024-03-20T09:00:00Z',
      endDate: '2024-03-20T15:00:00Z',
      location: {
        emirate: 'Sharjah',
        city: 'Al Majaz',
        address: 'Al Majaz Community Health Center'
      },
      capacity: 15,
      registeredVolunteers: 15,
      attendedVolunteers: 14,
      requiredSkills: ['Healthcare', 'Senior Care', 'First Aid'],
      ageRestriction: { min: 25 },
      requirements: ['Medical certification required', 'Professional attire', 'Valid health insurance'],
      createdAt: '2024-03-05T14:00:00Z',
      updatedAt: '2024-03-21T10:30:00Z',
      publishedAt: '2024-03-06T08:00:00Z',
      completedAt: '2024-03-20T15:00:00Z',
      rating: 4.6,
      reviewCount: 12,
      flags: [],
      adminNotes: 'Successfully completed with excellent feedback.',
      moderationNotes: 'Approved - all medical certifications verified.',
      riskScore: 1,
      impactMetrics: [
        { metric: 'Seniors Screened', target: 80, achieved: 92, unit: 'people' },
        { metric: 'Health Issues Identified', target: 0, achieved: 15, unit: 'cases' }
      ]
    },
    {
      id: '5',
      title: 'Unauthorized Fundraising Event',
      description: 'Charity fundraising event for disaster relief. Volunteers needed for event management and donation collection.',
      organizationId: '5',
      organizationName: 'Questionable Charity Group',
      category: 'Community Development',
      status: 'cancelled',
      moderationStatus: 'rejected',
      startDate: '2024-04-15T18:00:00Z',
      endDate: '2024-04-15T22:00:00Z',
      location: {
        emirate: 'Dubai',
        city: 'DIFC',
        address: 'DIFC Event Hall'
      },
      capacity: 100,
      registeredVolunteers: 5,
      attendedVolunteers: 0,
      requiredSkills: ['Event Management', 'Fundraising'],
      ageRestriction: { min: 18 },
      requirements: ['Professional attire', 'Cash handling experience'],
      createdAt: '2024-03-25T16:00:00Z',
      updatedAt: '2024-03-26T09:30:00Z',
      rating: 0,
      reviewCount: 0,
      flags: ['Unauthorized Fundraising', 'Suspicious Organization', 'Missing Permits'],
      adminNotes: 'Rejected and cancelled due to unauthorized fundraising activities.',
      moderationNotes: 'Rejected - organization lacks proper fundraising permits and authorization.',
      riskScore: 10
    }
  ];

  const categories = [
    'Environment & Sustainability',
    'Education & Literacy',
    'Healthcare & Medical',
    'Community Development',
    'Youth & Children',
    'Senior Citizens',
    'Disability Support',
    'Animal Welfare',
    'Arts & Culture',
    'Sports & Recreation'
  ];

  const emirates = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    const matchesModeration = moderationFilter === 'all' || event.moderationStatus === moderationFilter;
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
    const matchesEmirate = emirateFilter === 'all' || event.location.emirate === emirateFilter;
    
    return matchesSearch && matchesStatus && matchesModeration && matchesCategory && matchesEmirate;
  });

  const getStatusBadge = (status: Event['status']) => {
    const statusConfig = {
      draft: { label: 'Draft', className: 'bg-gray-100 text-gray-800' },
      published: { label: 'Published', className: 'bg-blue-100 text-blue-800' },
      active: { label: 'Active', className: 'bg-green-100 text-green-800' },
      completed: { label: 'Completed', className: 'bg-purple-100 text-purple-800' },
      cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-800' },
      suspended: { label: 'Suspended', className: 'bg-yellow-100 text-yellow-800' }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getModerationBadge = (status: Event['moderationStatus']) => {
    const statusConfig = {
      approved: { label: 'Approved', className: 'bg-green-100 text-green-800', icon: <CheckCircle className="h-3 w-3" /> },
      pending: { label: 'Pending', className: 'bg-gray-100 text-gray-800', icon: <Clock className="h-3 w-3" /> },
      flagged: { label: 'Flagged', className: 'bg-yellow-100 text-yellow-800', icon: <Flag className="h-3 w-3" /> },
      rejected: { label: 'Rejected', className: 'bg-red-100 text-red-800', icon: <XCircle className="h-3 w-3" /> }
    };
    
    const config = statusConfig[status];
    return (
      <Badge variant="outline" className={config.className}>
        {config.icon}
        <span className="ml-1">{config.label}</span>
      </Badge>
    );
  };

  const getRiskLevel = (score: number) => {
    if (score <= 3) return { label: 'Low', color: 'text-green-600' };
    if (score <= 6) return { label: 'Medium', color: 'text-yellow-600' };
    return { label: 'High', color: 'text-red-600' };
  };

  const handleViewEvent = (event: Event) => {
    setSelectedEvent(event);
    setShowEventDialog(true);
  };

  const handleModerationReview = (event: Event) => {
    setSelectedEvent(event);
    setShowModerationDialog(true);
  };

  const handleModerationDecision = () => {
    if (selectedEvent && moderationAction && moderationNotes) {
      // Simulate moderation decision
      alert(`Event "${selectedEvent.title}" has been ${moderationAction}d. Notes: ${moderationNotes}`);
      setShowModerationDialog(false);
      setModerationAction('');
      setModerationNotes('');
      setSelectedEvent(null);
    }
  };

  const handleForcePublish = (event: Event) => {
    if (confirm(`Force publish "${event.title}"? This will override moderation status.`)) {
      alert(`Event "${event.title}" has been force published.`);
    }
  };

  const handleSuspendEvent = (event: Event) => {
    if (confirm(`Suspend "${event.title}"? This will prevent further registrations.`)) {
      alert(`Event "${event.title}" has been suspended.`);
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stats = {
    total: events.length,
    published: events.filter(e => e.status === 'published').length,
    active: events.filter(e => e.status === 'active').length,
    completed: events.filter(e => e.status === 'completed').length,
    suspended: events.filter(e => e.status === 'suspended').length,
    pending: events.filter(e => e.moderationStatus === 'pending').length,
    flagged: events.filter(e => e.moderationStatus === 'flagged').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Admin
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Event Moderation</h1>
              <p className="text-gray-600">Monitor and moderate platform events</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Events
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Moderation Report
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 lg:grid-cols-7 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Events</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Play className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.published}</div>
              <div className="text-sm text-gray-600">Published</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.active}</div>
              <div className="text-sm text-gray-600">Active</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.completed}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Pause className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.suspended}</div>
              <div className="text-sm text-gray-600">Suspended</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-gray-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
              <div className="text-sm text-gray-600">Pending Review</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Flag className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.flagged}</div>
              <div className="text-sm text-gray-600">Flagged</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search events, organizations, descriptions..."
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
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={moderationFilter} onValueChange={setModerationFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Moderation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Moderation</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
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

              <Select value={emirateFilter} onValueChange={setEmirateFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Emirate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Emirates</SelectItem>
                  {emirates.map((emirate) => (
                    <SelectItem key={emirate} value={emirate}>{emirate}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Events List */}
        <div className="space-y-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                        {getStatusBadge(event.status)}
                        {getModerationBadge(event.moderationStatus)}
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span><strong>Date:</strong> {formatDateTime(event.startDate)}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span><strong>Location:</strong> {event.location.city}, {event.location.emirate}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span><strong>Capacity:</strong> {event.registeredVolunteers}/{event.capacity}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Activity className="h-4 w-4" />
                            <span><strong>Organization:</strong> {event.organizationName}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">{event.category}</Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-700">Risk Score:</span>
                            <span className={`text-sm font-bold ${getRiskLevel(event.riskScore).color}`}>
                              {event.riskScore}/10 ({getRiskLevel(event.riskScore).label})
                            </span>
                          </div>
                          {event.rating && (
                            <div className="flex items-center space-x-2">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{event.rating} ({event.reviewCount} reviews)</span>
                            </div>
                          )}
                          {event.attendedVolunteers > 0 && (
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span><strong>Attended:</strong> {event.attendedVolunteers}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Flags */}
                      {event.flags.length > 0 && (
                        <div className="mb-3">
                          <div className="flex items-center space-x-2 mb-1">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <span className="text-sm font-medium text-red-600">{event.flags.length} flags</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {event.flags.map((flag, index) => (
                              <Badge key={index} variant="destructive" className="text-xs">
                                {flag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{event.description}</p>

                      {/* Impact Metrics */}
                      {event.impactMetrics && event.impactMetrics.length > 0 && (
                        <div className="grid grid-cols-2 gap-4 p-3 bg-green-50 rounded-lg">
                          {event.impactMetrics.map((metric, index) => (
                            <div key={index} className="text-center">
                              <div className="text-sm font-medium text-green-800">{metric.metric}</div>
                              <div className="text-lg font-bold text-green-600">
                                {metric.achieved || metric.target} {metric.unit}
                              </div>
                              {metric.achieved && (
                                <div className="text-xs text-green-600">
                                  Target: {metric.target} {metric.unit}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="outline" size="sm" onClick={() => handleViewEvent(event)}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      
                      {(event.moderationStatus === 'pending' || event.moderationStatus === 'flagged') && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleModerationReview(event)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                      )}

                      {event.status === 'published' && event.moderationStatus === 'approved' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSuspendEvent(event)}
                          className="text-yellow-600 hover:text-yellow-700"
                        >
                          <Pause className="h-4 w-4 mr-1" />
                          Suspend
                        </Button>
                      )}

                      {(event.status === 'draft' || event.moderationStatus === 'pending') && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleForcePublish(event)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Play className="h-4 w-4 mr-1" />
                          Force Publish
                        </Button>
                      )}

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
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
                <p className="text-gray-600">
                  {searchTerm || statusFilter !== 'all' || moderationFilter !== 'all' || categoryFilter !== 'all' || emirateFilter !== 'all'
                    ? 'Try adjusting your search or filters.'
                    : 'No events have been created yet.'
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Event Detail Dialog */}
        <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Event Details</DialogTitle>
              <DialogDescription>
                {selectedEvent && `Detailed information for ${selectedEvent.title}`}
              </DialogDescription>
            </DialogHeader>
            
            {selectedEvent && (
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Event Title</Label>
                      <div className="text-lg font-medium">{selectedEvent.title}</div>
                    </div>
                    <div>
                      <Label>Organization</Label>
                      <div>{selectedEvent.organizationName}</div>
                    </div>
                    <div>
                      <Label>Category</Label>
                      <div>{selectedEvent.category}</div>
                    </div>
                    <div>
                      <Label>Event Dates</Label>
                      <div>{formatDateTime(selectedEvent.startDate)} - {formatDateTime(selectedEvent.endDate)}</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Location</Label>
                      <div>{selectedEvent.location.address}</div>
                      <div className="text-sm text-gray-600">{selectedEvent.location.city}, {selectedEvent.location.emirate}</div>
                    </div>
                    <div>
                      <Label>Capacity & Registration</Label>
                      <div>{selectedEvent.registeredVolunteers} / {selectedEvent.capacity} volunteers</div>
                      {selectedEvent.attendedVolunteers > 0 && (
                        <div className="text-sm text-gray-600">{selectedEvent.attendedVolunteers} attended</div>
                      )}
                    </div>
                    <div>
                      <Label>Age Restriction</Label>
                      <div>
                        {selectedEvent.ageRestriction.min}+ years
                        {selectedEvent.ageRestriction.max && ` (max ${selectedEvent.ageRestriction.max})`}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Info */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label>Event Status</Label>
                    <div className="mt-1">{getStatusBadge(selectedEvent.status)}</div>
                  </div>
                  <div>
                    <Label>Moderation Status</Label>
                    <div className="mt-1">{getModerationBadge(selectedEvent.moderationStatus)}</div>
                  </div>
                  <div>
                    <Label>Risk Score</Label>
                    <div className="mt-1">
                      <span className={`text-lg font-bold ${getRiskLevel(selectedEvent.riskScore).color}`}>
                        {selectedEvent.riskScore}/10 ({getRiskLevel(selectedEvent.riskScore).label})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label>Description</Label>
                  <div className="mt-2 p-3 bg-gray-50 rounded border text-sm">
                    {selectedEvent.description}
                  </div>
                </div>

                {/* Requirements */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>Required Skills</Label>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedEvent.requiredSkills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Requirements</Label>
                    <ul className="mt-2 text-sm text-gray-600 space-y-1">
                      {selectedEvent.requirements.map((req, index) => (
                        <li key={index}>• {req}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Impact Metrics */}
                {selectedEvent.impactMetrics && selectedEvent.impactMetrics.length > 0 && (
                  <div>
                    <Label>Impact Metrics</Label>
                    <div className="grid md:grid-cols-2 gap-4 mt-2">
                      {selectedEvent.impactMetrics.map((metric, index) => (
                        <div key={index} className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-sm font-medium text-green-800">{metric.metric}</div>
                          <div className="text-xl font-bold text-green-600">
                            {metric.achieved || metric.target} {metric.unit}
                          </div>
                          {metric.achieved && (
                            <div className="text-xs text-green-600">
                              Target: {metric.target} {metric.unit}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Flags and Risk Assessment */}
                {selectedEvent.flags.length > 0 && (
                  <div>
                    <Label>Flags and Issues</Label>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedEvent.flags.map((flag, index) => (
                        <Badge key={index} variant="destructive" className="text-xs">
                          {flag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Admin Notes */}
                <div>
                  <Label>Admin Notes</Label>
                  <div className="mt-2 p-3 bg-gray-50 rounded border text-sm">
                    {selectedEvent.adminNotes || 'No admin notes available.'}
                  </div>
                </div>

                {/* Moderation Notes */}
                {selectedEvent.moderationNotes && (
                  <div>
                    <Label>Moderation Notes</Label>
                    <div className="mt-2 p-3 bg-blue-50 rounded border text-sm">
                      {selectedEvent.moderationNotes}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowEventDialog(false)}>
                    Close
                  </Button>
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Event
                  </Button>
                  <Button variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Organizer
                  </Button>
                  {(selectedEvent.moderationStatus === 'pending' || selectedEvent.moderationStatus === 'flagged') && (
                    <Button 
                      onClick={() => {
                        setShowEventDialog(false);
                        handleModerationReview(selectedEvent);
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Review Moderation
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Moderation Review Dialog */}
        <Dialog open={showModerationDialog} onOpenChange={setShowModerationDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Moderation Review</DialogTitle>
              <DialogDescription>
                {selectedEvent && `Review moderation for ${selectedEvent.title}`}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label>Moderation Decision</Label>
                <Select value={moderationAction} onValueChange={(value: 'approve' | 'flag' | 'reject') => setModerationAction(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select decision" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approve">Approve Event</SelectItem>
                    <SelectItem value="flag">Flag for Review</SelectItem>
                    <SelectItem value="reject">Reject Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="moderationNotes">Moderation Notes *</Label>
                <Textarea
                  id="moderationNotes"
                  value={moderationNotes}
                  onChange={(e) => setModerationNotes(e.target.value)}
                  placeholder="Enter detailed notes about the moderation decision..."
                  rows={4}
                />
              </div>

              {moderationAction === 'approve' && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    This event will be approved and can proceed with volunteer registration.
                  </AlertDescription>
                </Alert>
              )}

              {moderationAction === 'flag' && (
                <Alert className="border-yellow-200 bg-yellow-50">
                  <Flag className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    This event will be flagged for further review and monitoring.
                  </AlertDescription>
                </Alert>
              )}

              {moderationAction === 'reject' && (
                <Alert className="border-red-200 bg-red-50">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    This event will be rejected and the organization will be notified.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowModerationDialog(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleModerationDecision}
                  disabled={!moderationAction || !moderationNotes}
                  className={
                    moderationAction === 'approve' ? 'bg-green-600 hover:bg-green-700' :
                    moderationAction === 'flag' ? 'bg-yellow-600 hover:bg-yellow-700' :
                    'bg-red-600 hover:bg-red-700'
                  }
                >
                  {moderationAction === 'approve' && (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve Event
                    </>
                  )}
                  {moderationAction === 'flag' && (
                    <>
                      <Flag className="h-4 w-4 mr-2" />
                      Flag Event
                    </>
                  )}
                  {moderationAction === 'reject' && (
                    <>
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject Event
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}