import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, Save, Plus, Trash2, MapPin, Clock, Users, Calendar,
  AlertTriangle, CheckCircle, Upload, Eye, Globe, Settings, Copy,
  Star, Heart, Leaf, BookOpen, Briefcase, Shield, FileText, Edit,
  MoreHorizontal, Ban, RefreshCw, Archive, Send, UserCheck
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

interface EventShift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  capacity: number;
  registered: number;
  requirements: string[];
  description: string;
}

interface EventRequirement {
  id: string;
  type: 'skill' | 'certification' | 'age' | 'experience' | 'language' | 'physical';
  title: string;
  description: string;
  required: boolean;
}

interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'registered' | 'confirmed' | 'checked_in' | 'completed' | 'cancelled' | 'no_show';
  registrationDate: string;
  shiftId?: string;
  hours?: number;
  rating?: number;
  notes?: string;
}

interface EventForm {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  startDate: string;
  endDate: string;
  timezone: string;
  location: {
    name: string;
    address: string;
    city: string;
    emirate: string;
    coordinates?: { lat: number; lng: number };
    geofenceRadius: number;
  };
  totalCapacity: number;
  registeredCount: number;
  confirmedCount: number;
  completedCount: number;
  minAge: number;
  maxAge?: number;
  registrationDeadline: string;
  allowWaitlist: boolean;
  autoApprove: boolean;
  requirements: EventRequirement[];
  skillsNeeded: string[];
  languages: string[];
  shifts: EventShift[];
  isMultiDay: boolean;
  featuredImage?: string;
  gallery: string[];
  documents: string[];
  isPublic: boolean;
  requiresApproval: boolean;
  allowCancellation: boolean;
  sendReminders: boolean;
  certificateTemplate?: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  emergencyContact: string;
  emergencyPhone: string;
  createdAt: string;
  updatedAt: string;
  volunteers: Volunteer[];
}

export default function OrgEventEdit() {
  const { eventId } = useParams();
  const [activeTab, setActiveTab] = useState('basic');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showVolunteersDialog, setShowVolunteersDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock event data - in real app, this would be fetched from API
  const [eventForm, setEventForm] = useState<EventForm>({
    id: eventId || '1',
    title: 'Beach Cleanup Initiative - Dubai Marina',
    description: 'Join us for a comprehensive beach cleanup initiative at Dubai Marina. We\'ll be working together to remove plastic waste, debris, and other pollutants from the shoreline while raising awareness about marine conservation. This event is perfect for individuals, families, and corporate groups looking to make a positive environmental impact.',
    category: 'environment',
    tags: ['environment', 'cleanup', 'beach', 'sustainability', 'marine conservation'],
    status: 'published',
    startDate: '2024-04-15T08:00',
    endDate: '2024-04-15T12:00',
    timezone: 'Asia/Dubai',
    location: {
      name: 'Dubai Marina Beach',
      address: 'Dubai Marina Beach, near Marina Walk, Dubai Marina',
      city: 'Dubai',
      emirate: 'Dubai',
      coordinates: { lat: 25.0657, lng: 55.1713 },
      geofenceRadius: 150
    },
    totalCapacity: 100,
    registeredCount: 67,
    confirmedCount: 58,
    completedCount: 0,
    minAge: 16,
    registrationDeadline: '2024-04-14T23:59',
    allowWaitlist: true,
    autoApprove: false,
    requirements: [
      {
        id: '1',
        type: 'physical',
        title: 'Physical Fitness',
        description: 'Ability to walk on sand and bend down for extended periods',
        required: true
      }
    ],
    skillsNeeded: ['Environmental Awareness', 'Teamwork'],
    languages: ['English', 'Arabic'],
    shifts: [
      {
        id: '1',
        name: 'Morning Shift',
        startTime: '08:00',
        endTime: '10:00',
        capacity: 50,
        registered: 34,
        requirements: [],
        description: 'Main cleanup activity focusing on the central beach area'
      },
      {
        id: '2',
        name: 'Late Morning Shift',
        startTime: '10:00',
        endTime: '12:00',
        capacity: 50,
        registered: 33,
        requirements: [],
        description: 'Cleanup and data collection for environmental impact assessment'
      }
    ],
    isMultiDay: false,
    featuredImage: '/api/placeholder/1200/600',
    gallery: [],
    documents: [],
    isPublic: true,
    requiresApproval: true,
    allowCancellation: true,
    sendReminders: true,
    certificateTemplate: 'environment',
    contactPerson: 'Sarah Al-Zahra',
    contactEmail: 'sarah@greeninitiative.ae',
    contactPhone: '+971 50 123 4567',
    emergencyContact: 'Ahmed Hassan',
    emergencyPhone: '+971 50 987 6543',
    createdAt: '2024-03-15T10:30:00Z',
    updatedAt: '2024-03-20T14:45:00Z',
    volunteers: [
      {
        id: '1',
        name: 'Ahmed Al-Mansouri',
        email: 'ahmed@example.com',
        phone: '+971 50 111 2222',
        status: 'confirmed',
        registrationDate: '2024-03-16T09:15:00Z',
        shiftId: '1'
      },
      {
        id: '2',
        name: 'Fatima Hassan',
        email: 'fatima@example.com',
        phone: '+971 50 333 4444',
        status: 'registered',
        registrationDate: '2024-03-17T11:30:00Z',
        shiftId: '2'
      },
      {
        id: '3',
        name: 'Mohammed Ali',
        email: 'mohammed@example.com',
        phone: '+971 50 555 6666',
        status: 'confirmed',
        registrationDate: '2024-03-18T16:20:00Z',
        shiftId: '1'
      }
    ]
  });

  const categories = [
    { value: 'environment', label: 'Environment & Sustainability', icon: <Leaf className="h-4 w-4" /> },
    { value: 'education', label: 'Education & Youth', icon: <BookOpen className="h-4 w-4" /> },
    { value: 'healthcare', label: 'Healthcare & Wellness', icon: <Heart className="h-4 w-4" /> },
    { value: 'community', label: 'Community Development', icon: <Users className="h-4 w-4" /> },
    { value: 'culture', label: 'Arts & Culture', icon: <Star className="h-4 w-4" /> },
    { value: 'emergency', label: 'Emergency Response', icon: <Shield className="h-4 w-4" /> },
    { value: 'business', label: 'Professional Development', icon: <Briefcase className="h-4 w-4" /> }
  ];

  const emirates = [
    'Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'
  ];

  useEffect(() => {
    // Simulate loading event data
    const loadEvent = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    };
    
    loadEvent();
  }, [eventId]);

  const handleFormChange = (field: string, value: string | number | boolean | string[]) => {
    setEventForm(prev => ({
      ...prev,
      [field]: value
    }));
    setHasUnsavedChanges(true);
  };

  const handleLocationChange = (field: string, value: string | number) => {
    setEventForm(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  const updateShift = (shiftId: string, field: string, value: string | number) => {
    setEventForm(prev => ({
      ...prev,
      shifts: prev.shifts.map(shift => 
        shift.id === shiftId ? { ...shift, [field]: value } : shift
      )
    }));
    setHasUnsavedChanges(true);
  };

  const handleSaveChanges = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Event updated successfully!');
    setHasUnsavedChanges(false);
    setIsSubmitting(false);
  };

  const handlePublishEvent = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setEventForm(prev => ({ ...prev, status: 'published' }));
    alert('Event published successfully!');
    setHasUnsavedChanges(false);
    setIsSubmitting(false);
  };

  const handleCancelEvent = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setEventForm(prev => ({ ...prev, status: 'cancelled' }));
    alert('Event cancelled. Registered volunteers will be notified.');
    setIsSubmitting(false);
  };

  const handleDeleteEvent = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Event deleted successfully!');
    setShowDeleteDialog(false);
    setIsSubmitting(false);
    // In real app, redirect to events list
  };

  const getStatusBadge = (status: EventForm['status']) => {
    const statusConfig = {
      draft: { label: 'Draft', className: 'bg-gray-100 text-gray-800' },
      published: { label: 'Published', className: 'bg-green-100 text-green-800' },
      cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-800' },
      completed: { label: 'Completed', className: 'bg-blue-100 text-blue-800' }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getVolunteerStatusBadge = (status: Volunteer['status']) => {
    const statusConfig = {
      registered: { label: 'Registered', className: 'bg-blue-100 text-blue-800' },
      confirmed: { label: 'Confirmed', className: 'bg-green-100 text-green-800' },
      checked_in: { label: 'Checked In', className: 'bg-purple-100 text-purple-800' },
      completed: { label: 'Completed', className: 'bg-green-100 text-green-800' },
      cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-800' },
      no_show: { label: 'No Show', className: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-gray-600">Loading event details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/org/events">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Events
              </Button>
            </Link>
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <h1 className="text-3xl font-bold text-gray-900">Edit Event</h1>
                {getStatusBadge(eventForm.status)}
              </div>
              <p className="text-gray-600">{eventForm.title}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {hasUnsavedChanges && (
              <Badge variant="destructive">Unsaved Changes</Badge>
            )}
            <Button variant="outline" onClick={() => setShowVolunteersDialog(true)}>
              <Users className="h-4 w-4 mr-2" />
              Volunteers ({eventForm.registeredCount})
            </Button>
            <Button variant="outline" onClick={() => setShowPreview(true)}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button 
              variant="outline" 
              onClick={handleSaveChanges}
              disabled={isSubmitting}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Event Statistics */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{eventForm.registeredCount}</div>
              <div className="text-sm text-gray-600">Registered</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <UserCheck className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{eventForm.confirmedCount}</div>
              <div className="text-sm text-gray-600">Confirmed</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{eventForm.completedCount}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {Math.max(0, eventForm.totalCapacity - eventForm.registeredCount)}
              </div>
              <div className="text-sm text-gray-600">Available Spots</div>
            </CardContent>
          </Card>
        </div>

        {/* Event Status Actions */}
        {eventForm.status === 'draft' && (
          <Alert className="border-blue-200 bg-blue-50">
            <AlertTriangle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <div className="flex items-center justify-between">
                <span>This event is currently in draft mode and not visible to volunteers.</span>
                <Button size="sm" onClick={handlePublishEvent} disabled={isSubmitting}>
                  <Globe className="h-4 w-4 mr-2" />
                  Publish Event
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {eventForm.status === 'published' && (
          <div className="flex items-center space-x-3">
            <Alert className="border-green-200 bg-green-50 flex-1">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Event is live and accepting registrations.
              </AlertDescription>
            </Alert>
            <Button variant="outline" onClick={handleCancelEvent} disabled={isSubmitting}>
              <Ban className="h-4 w-4 mr-2" />
              Cancel Event
            </Button>
          </div>
        )}

        {eventForm.status === 'cancelled' && (
          <Alert className="border-red-200 bg-red-50">
            <Ban className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              This event has been cancelled. Registered volunteers have been notified.
            </AlertDescription>
          </Alert>
        )}

        {/* Event Edit Form */}
        <Card>
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="shifts">Shifts</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Basic Information Tab */}
              <TabsContent value="basic" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Basic Event Information</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Event Title *</Label>
                      <Input
                        id="title"
                        value={eventForm.title}
                        onChange={(e) => handleFormChange('title', e.target.value)}
                        placeholder="Enter a compelling event title"
                      />
                    </div>

                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select value={eventForm.category} onValueChange={(value) => handleFormChange('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select event category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              <div className="flex items-center space-x-2">
                                {category.icon}
                                <span>{category.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="description">Event Description *</Label>
                      <Textarea
                        id="description"
                        value={eventForm.description}
                        onChange={(e) => handleFormChange('description', e.target.value)}
                        placeholder="Provide a detailed description of the event"
                        rows={6}
                      />
                    </div>

                    <div>
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        value={eventForm.tags.join(', ')}
                        onChange={(e) => {
                          const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
                          handleFormChange('tags', tags);
                        }}
                        placeholder="environment, cleanup, beach, sustainability"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="capacity">Total Capacity *</Label>
                        <Input
                          id="capacity"
                          type="number"
                          value={eventForm.totalCapacity}
                          onChange={(e) => handleFormChange('totalCapacity', parseInt(e.target.value))}
                          min="1"
                          max="1000"
                        />
                        <p className="text-sm text-gray-600 mt-1">
                          Currently {eventForm.registeredCount} registered
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="minAge">Minimum Age *</Label>
                        <Input
                          id="minAge"
                          type="number"
                          value={eventForm.minAge}
                          onChange={(e) => handleFormChange('minAge', parseInt(e.target.value))}
                          min="12"
                          max="100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Schedule Tab */}
              <TabsContent value="schedule" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Event Schedule</h3>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate">Start Date & Time *</Label>
                        <Input
                          id="startDate"
                          type="datetime-local"
                          value={eventForm.startDate}
                          onChange={(e) => handleFormChange('startDate', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="endDate">End Date & Time</Label>
                        <Input
                          id="endDate"
                          type="datetime-local"
                          value={eventForm.endDate}
                          onChange={(e) => handleFormChange('endDate', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select value={eventForm.timezone} onValueChange={(value) => handleFormChange('timezone', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Asia/Dubai">Asia/Dubai (UAE)</SelectItem>
                            <SelectItem value="Asia/Riyadh">Asia/Riyadh</SelectItem>
                            <SelectItem value="UTC">UTC</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="registrationDeadline">Registration Deadline</Label>
                        <Input
                          id="registrationDeadline"
                          type="datetime-local"
                          value={eventForm.registrationDeadline}
                          onChange={(e) => handleFormChange('registrationDeadline', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Location Tab */}
              <TabsContent value="location" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Event Location</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="locationName">Location Name</Label>
                      <Input
                        id="locationName"
                        value={eventForm.location.name}
                        onChange={(e) => handleLocationChange('name', e.target.value)}
                        placeholder="e.g., Dubai Marina Beach"
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Address *</Label>
                      <Textarea
                        id="address"
                        value={eventForm.location.address}
                        onChange={(e) => handleLocationChange('address', e.target.value)}
                        placeholder="Enter the full address"
                        rows={3}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={eventForm.location.city}
                          onChange={(e) => handleLocationChange('city', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="emirate">Emirate</Label>
                        <Select value={eventForm.location.emirate} onValueChange={(value) => handleLocationChange('emirate', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {emirates.map((emirate) => (
                              <SelectItem key={emirate} value={emirate}>{emirate}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="geofenceRadius">Geofence Radius (meters)</Label>
                      <Input
                        id="geofenceRadius"
                        type="number"
                        value={eventForm.location.geofenceRadius}
                        onChange={(e) => handleLocationChange('geofenceRadius', parseInt(e.target.value))}
                        min="50"
                        max="1000"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Requirements Tab */}
              <TabsContent value="requirements" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Volunteer Requirements</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="skillsNeeded">Skills Needed</Label>
                      <Input
                        id="skillsNeeded"
                        value={eventForm.skillsNeeded.join(', ')}
                        onChange={(e) => {
                          const skills = e.target.value.split(',').map(skill => skill.trim()).filter(Boolean);
                          handleFormChange('skillsNeeded', skills);
                        }}
                        placeholder="Environmental Awareness, Teamwork"
                      />
                    </div>

                    <div>
                      <Label>Languages</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {['English', 'Arabic', 'Hindi', 'Urdu', 'Filipino'].map((lang) => (
                          <label key={lang} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={eventForm.languages.includes(lang)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  handleFormChange('languages', [...eventForm.languages, lang]);
                                } else {
                                  handleFormChange('languages', eventForm.languages.filter(l => l !== lang));
                                }
                              }}
                            />
                            <span className="text-sm">{lang}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Shifts Tab */}
              <TabsContent value="shifts" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Event Shifts</h3>
                  <div className="space-y-4">
                    {eventForm.shifts.map((shift) => (
                      <Card key={shift.id} className="p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="grid md:grid-cols-3 gap-4 mb-4">
                              <div>
                                <Label>Shift Name</Label>
                                <Input
                                  value={shift.name}
                                  onChange={(e) => updateShift(shift.id, 'name', e.target.value)}
                                />
                              </div>
                              <div>
                                <Label>Start Time</Label>
                                <Input
                                  type="time"
                                  value={shift.startTime}
                                  onChange={(e) => updateShift(shift.id, 'startTime', e.target.value)}
                                />
                              </div>
                              <div>
                                <Label>End Time</Label>
                                <Input
                                  type="time"
                                  value={shift.endTime}
                                  onChange={(e) => updateShift(shift.id, 'endTime', e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <Label>Capacity</Label>
                                <Input
                                  type="number"
                                  value={shift.capacity}
                                  onChange={(e) => updateShift(shift.id, 'capacity', parseInt(e.target.value))}
                                  min="1"
                                />
                                <p className="text-sm text-gray-600 mt-1">
                                  {shift.registered} registered / {shift.capacity} capacity
                                </p>
                              </div>
                              <div>
                                <Label>Description</Label>
                                <Textarea
                                  value={shift.description}
                                  onChange={(e) => updateShift(shift.id, 'description', e.target.value)}
                                  rows={2}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Event Settings</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3">Contact Information</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="contactPerson">Contact Person</Label>
                          <Input
                            id="contactPerson"
                            value={eventForm.contactPerson}
                            onChange={(e) => handleFormChange('contactPerson', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="contactEmail">Contact Email *</Label>
                          <Input
                            id="contactEmail"
                            type="email"
                            value={eventForm.contactEmail}
                            onChange={(e) => handleFormChange('contactEmail', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="contactPhone">Contact Phone</Label>
                          <Input
                            id="contactPhone"
                            type="tel"
                            value={eventForm.contactPhone}
                            onChange={(e) => handleFormChange('contactPhone', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="emergencyContact">Emergency Contact</Label>
                          <Input
                            id="emergencyContact"
                            value={eventForm.emergencyContact}
                            onChange={(e) => handleFormChange('emergencyContact', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Event Options</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="isPublic"
                            checked={eventForm.isPublic}
                            onChange={(e) => handleFormChange('isPublic', e.target.checked)}
                          />
                          <Label htmlFor="isPublic">Make event public</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="requiresApproval"
                            checked={eventForm.requiresApproval}
                            onChange={(e) => handleFormChange('requiresApproval', e.target.checked)}
                          />
                          <Label htmlFor="requiresApproval">Require manual approval</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="allowCancellation"
                            checked={eventForm.allowCancellation}
                            onChange={(e) => handleFormChange('allowCancellation', e.target.checked)}
                          />
                          <Label htmlFor="allowCancellation">Allow volunteer cancellation</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="sendReminders"
                            checked={eventForm.sendReminders}
                            onChange={(e) => handleFormChange('sendReminders', e.target.checked)}
                          />
                          <Label htmlFor="sendReminders">Send automatic reminders</Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3 text-red-600">Danger Zone</h4>
                      <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium text-red-800">Delete Event</h5>
                            <p className="text-sm text-red-600">
                              Permanently delete this event and all associated data. This action cannot be undone.
                            </p>
                          </div>
                          <Button 
                            variant="destructive" 
                            onClick={() => setShowDeleteDialog(true)}
                            disabled={eventForm.registeredCount > 0}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Event
                          </Button>
                        </div>
                        {eventForm.registeredCount > 0 && (
                          <p className="text-xs text-red-600 mt-2">
                            Cannot delete event with registered volunteers. Cancel the event first.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Volunteers Dialog */}
        <Dialog open={showVolunteersDialog} onOpenChange={setShowVolunteersDialog}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Event Volunteers</DialogTitle>
              <DialogDescription>
                Manage volunteers registered for this event
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {eventForm.registeredCount} registered, {eventForm.confirmedCount} confirmed
                </div>
                <Button size="sm">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message to All
                </Button>
              </div>

              <div className="space-y-3">
                {eventForm.volunteers.map((volunteer) => (
                  <div key={volunteer.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium">{volunteer.name}</h4>
                        {getVolunteerStatusBadge(volunteer.status)}
                      </div>
                      <div className="text-sm text-gray-600">
                        <div>{volunteer.email} • {volunteer.phone}</div>
                        <div>
                          Registered: {new Date(volunteer.registrationDate).toLocaleDateString()}
                          {volunteer.shiftId && (
                            <span> • Shift: {eventForm.shifts.find(s => s.id === volunteer.shiftId)?.name}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {volunteer.status === 'registered' && (
                        <Button size="sm" variant="outline">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Confirm
                        </Button>
                      )}
                      <Button size="sm" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Event</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this event? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteEvent} disabled={isSubmitting}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}