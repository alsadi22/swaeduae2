import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Calendar, Clock, MapPin, Users, ArrowLeft, Edit,
  Share2, Download, QrCode, Monitor, UserCheck,
  AlertCircle, CheckCircle, XCircle, Eye, MessageSquare,
  TrendingUp, Star, Camera, FileText, Phone, Mail
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

interface EventDetail {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  address: string;
  city: string;
  emirate: string;
  volunteersNeeded: number;
  volunteersRegistered: number;
  volunteersAttended: number;
  volunteersNoShow: number;
  status: 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  requirements: string[];
  skills: string[];
  images: string[];
  documents: string[];
  shifts: Array<{
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    volunteersNeeded: number;
    volunteersRegistered: number;
  }>;
  volunteers: Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    status: 'registered' | 'confirmed' | 'checked_in' | 'checked_out' | 'no_show' | 'cancelled';
    registeredAt: string;
    checkedInAt?: string;
    checkedOutAt?: string;
    hoursLogged?: number;
    shift?: string;
  }>;
}

export default function OrgEventDetail() {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showQRDialog, setShowQRDialog] = useState(false);

  // Mock event data - in real app, this would be fetched based on ID
  const event: EventDetail = {
    id: id || '1',
    title: 'Beach Cleanup Drive',
    description: 'Join us for a community beach cleanup to protect our marine environment. We\'ll be collecting plastic waste, debris, and other pollutants from Jumeirah Beach. This is a great opportunity to make a direct impact on environmental conservation while connecting with like-minded volunteers. All equipment will be provided, including gloves, trash bags, and collection tools. Light refreshments will be served after the cleanup.',
    category: 'Environment & Sustainability',
    priority: 'high',
    date: '2024-03-25',
    startTime: '08:00',
    endTime: '12:00',
    location: 'Jumeirah Beach',
    address: 'Jumeirah Beach Road, Jumeirah 1, Dubai, UAE',
    city: 'Dubai',
    emirate: 'Dubai',
    volunteersNeeded: 50,
    volunteersRegistered: 42,
    volunteersAttended: 38,
    volunteersNoShow: 4,
    status: 'completed',
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-20T14:30:00Z',
    createdBy: 'Ahmed Al-Mansouri',
    contactPerson: 'Sarah Ahmed',
    contactEmail: 'sarah@dubaicommunityfoundation.org',
    contactPhone: '+971 50 123 4567',
    requirements: [
      'Bring your own water bottle',
      'Wear comfortable clothing and closed shoes',
      'Apply sunscreen before arrival',
      'Bring a hat or cap for sun protection'
    ],
    skills: ['Environmental Conservation', 'Physical Activity', 'Teamwork'],
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300'],
    documents: ['Event Guidelines.pdf', 'Safety Instructions.pdf'],
    shifts: [
      {
        id: 'shift-1',
        name: 'Morning Cleanup',
        startTime: '08:00',
        endTime: '10:00',
        volunteersNeeded: 25,
        volunteersRegistered: 23
      },
      {
        id: 'shift-2',
        name: 'Extended Cleanup',
        startTime: '10:00',
        endTime: '12:00',
        volunteersNeeded: 25,
        volunteersRegistered: 19
      }
    ],
    volunteers: [
      {
        id: '1',
        name: 'Ahmed Al-Mansouri',
        email: 'ahmed@example.com',
        phone: '+971 50 111 1111',
        avatar: '/api/placeholder/40/40',
        status: 'checked_out',
        registeredAt: '2024-03-15T09:00:00Z',
        checkedInAt: '2024-03-25T07:55:00Z',
        checkedOutAt: '2024-03-25T12:10:00Z',
        hoursLogged: 4,
        shift: 'Morning Cleanup'
      },
      {
        id: '2',
        name: 'Fatima Hassan',
        email: 'fatima@example.com',
        phone: '+971 50 222 2222',
        status: 'checked_out',
        registeredAt: '2024-03-16T14:30:00Z',
        checkedInAt: '2024-03-25T08:05:00Z',
        checkedOutAt: '2024-03-25T12:05:00Z',
        hoursLogged: 4,
        shift: 'Extended Cleanup'
      },
      {
        id: '3',
        name: 'Mohammed Ali',
        email: 'mohammed@example.com',
        phone: '+971 50 333 3333',
        status: 'no_show',
        registeredAt: '2024-03-18T11:20:00Z',
        shift: 'Morning Cleanup'
      },
      {
        id: '4',
        name: 'Sarah Ahmed',
        email: 'sarah@example.com',
        phone: '+971 50 444 4444',
        status: 'checked_out',
        registeredAt: '2024-03-19T16:45:00Z',
        checkedInAt: '2024-03-25T08:00:00Z',
        checkedOutAt: '2024-03-25T11:55:00Z',
        hoursLogged: 4,
        shift: 'Extended Cleanup'
      }
    ]
  };

  const getStatusBadge = (status: EventDetail['status']) => {
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

  const getPriorityBadge = (priority: EventDetail['priority']) => {
    const priorityConfig = {
      low: { label: 'Low', className: 'bg-gray-100 text-gray-600' },
      medium: { label: 'Medium', className: 'bg-yellow-100 text-yellow-700' },
      high: { label: 'High', className: 'bg-red-100 text-red-700' }
    };
    
    const config = priorityConfig[priority];
    return <Badge variant="outline" className={config.className}>{config.label}</Badge>;
  };

  const getVolunteerStatusBadge = (status: string) => {
    const statusConfig = {
      registered: { label: 'Registered', className: 'bg-blue-100 text-blue-800' },
      confirmed: { label: 'Confirmed', className: 'bg-green-100 text-green-800' },
      checked_in: { label: 'Checked In', className: 'bg-purple-100 text-purple-800' },
      checked_out: { label: 'Checked Out', className: 'bg-green-100 text-green-800' },
      no_show: { label: 'No Show', className: 'bg-red-100 text-red-800' },
      cancelled: { label: 'Cancelled', className: 'bg-gray-100 text-gray-600' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      weekday: 'long',
      month: 'long',
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

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const registrationRate = Math.round((event.volunteersRegistered / event.volunteersNeeded) * 100);
  const attendanceRate = event.volunteersRegistered > 0 ? Math.round((event.volunteersAttended / event.volunteersRegistered) * 100) : 0;
  const noShowRate = event.volunteersRegistered > 0 ? Math.round((event.volunteersNoShow / event.volunteersRegistered) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
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
                <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
                {getStatusBadge(event.status)}
                {getPriorityBadge(event.priority)}
              </div>
              <p className="text-gray-600">{event.category}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={() => setShowQRDialog(true)}>
              <QrCode className="h-4 w-4 mr-2" />
              QR Code
            </Button>
            <Link to={`/org/events/${event.id}/kiosk`}>
              <Button variant="outline">
                <Monitor className="h-4 w-4 mr-2" />
                Kiosk Mode
              </Button>
            </Link>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Link to={`/org/events/${event.id}/edit`}>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Edit Event
              </Button>
            </Link>
          </div>
        </div>

        {/* Event Overview Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{event.volunteersRegistered}</div>
              <div className="text-sm text-gray-600">Registered</div>
              <div className="text-xs text-gray-500">of {event.volunteersNeeded} needed</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <UserCheck className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{event.volunteersAttended}</div>
              <div className="text-sm text-gray-600">Attended</div>
              <div className="text-xs text-gray-500">{attendanceRate}% attendance</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{event.volunteersNoShow}</div>
              <div className="text-sm text-gray-600">No Shows</div>
              <div className="text-xs text-gray-500">{noShowRate}% no-show rate</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{registrationRate}%</div>
              <div className="text-sm text-gray-600">Fill Rate</div>
              <div className="text-xs text-gray-500">Registration progress</div>
            </CardContent>
          </Card>
        </div>

        {/* Event Details Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteers ({event.volunteersRegistered})</TabsTrigger>
            <TabsTrigger value="shifts">Shifts ({event.shifts.length})</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Event Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>Event Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{event.description}</p>
                  </CardContent>
                </Card>

                {/* Requirements */}
                {event.requirements.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {event.requirements.map((requirement, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Skills */}
                {event.skills.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Skills Involved</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {event.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="space-y-6">
                {/* Event Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Event Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">{formatDate(event.date)}</p>
                        <p className="text-sm text-gray-600">
                          {formatTime(event.startTime)} - {formatTime(event.endTime)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium">{event.location}</p>
                        <p className="text-sm text-gray-600">{event.address}</p>
                        <p className="text-sm text-gray-600">{event.city}, {event.emirate}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">{event.volunteersNeeded} volunteers needed</p>
                        <p className="text-sm text-gray-600">
                          {event.volunteersRegistered} registered ({registrationRate}% filled)
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-medium">{event.contactPerson}</p>
                      <p className="text-sm text-gray-600">Event Coordinator</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <a href={`mailto:${event.contactEmail}`} className="text-blue-600 hover:underline text-sm">
                        {event.contactEmail}
                      </a>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <a href={`tel:${event.contactPhone}`} className="text-blue-600 hover:underline text-sm">
                        {event.contactPhone}
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Event Meta */}
                <Card>
                  <CardHeader>
                    <CardTitle>Event Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created by:</span>
                      <span className="font-medium">{event.createdBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created:</span>
                      <span>{formatDateTime(event.createdAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last updated:</span>
                      <span>{formatDateTime(event.updatedAt)}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="volunteers" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Registered Volunteers</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export List
                </Button>
                <Link to={`/org/events/${event.id}/roster`}>
                  <Button size="sm">
                    <UserCheck className="h-4 w-4 mr-2" />
                    Manage Roster
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              {event.volunteers.map((volunteer) => (
                <Card key={volunteer.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          {volunteer.avatar ? (
                            <img src={volunteer.avatar} alt={volunteer.name} className="w-12 h-12 rounded-full" />
                          ) : (
                            <span className="text-lg font-medium text-gray-600">
                              {volunteer.name.split(' ').map(n => n.charAt(0)).join('')}
                            </span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">{volunteer.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{volunteer.email}</span>
                            <span>{volunteer.phone}</span>
                            {volunteer.shift && <span>Shift: {volunteer.shift}</span>}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {getVolunteerStatusBadge(volunteer.status)}
                        {volunteer.hoursLogged && (
                          <Badge variant="outline">
                            {volunteer.hoursLogged} hours
                          </Badge>
                        )}
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {(volunteer.checkedInAt || volunteer.checkedOutAt) && (
                      <div className="mt-3 pt-3 border-t text-sm text-gray-600">
                        <div className="flex items-center space-x-6">
                          {volunteer.checkedInAt && (
                            <span>Checked in: {formatDateTime(volunteer.checkedInAt)}</span>
                          )}
                          {volunteer.checkedOutAt && (
                            <span>Checked out: {formatDateTime(volunteer.checkedOutAt)}</span>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shifts" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Event Shifts</h2>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Manage Shifts
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {event.shifts.map((shift) => (
                <Card key={shift.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{shift.name}</CardTitle>
                      <Badge variant="outline">
                        {shift.volunteersRegistered}/{shift.volunteersNeeded} volunteers
                      </Badge>
                    </div>
                    <CardDescription>
                      {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Registration Progress</span>
                        <span className="font-medium">
                          {Math.round((shift.volunteersRegistered / shift.volunteersNeeded) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ 
                            width: `${Math.min((shift.volunteersRegistered / shift.volunteersNeeded) * 100, 100)}%` 
                          }}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <Button variant="outline" size="sm">
                          <Users className="h-4 w-4 mr-2" />
                          View Volunteers
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message Group
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Event Images */}
              <Card>
                <CardHeader>
                  <CardTitle>Event Images</CardTitle>
                  <CardDescription>Photos and promotional materials</CardDescription>
                </CardHeader>
                <CardContent>
                  {event.images.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                      {event.images.map((image, index) => (
                        <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <img 
                            src={image} 
                            alt={`Event image ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Camera className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p>No images uploaded</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Event Documents */}
              <Card>
                <CardHeader>
                  <CardTitle>Event Documents</CardTitle>
                  <CardDescription>Guidelines, forms, and resources</CardDescription>
                </CardHeader>
                <CardContent>
                  {event.documents.length > 0 ? (
                    <div className="space-y-3">
                      {event.documents.map((document, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-gray-400" />
                            <span className="font-medium">{document}</span>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p>No documents uploaded</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Registration Timeline</CardTitle>
                  <CardDescription>Volunteer registration over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Registration timeline chart would be displayed here
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Attendance Breakdown</CardTitle>
                  <CardDescription>Volunteer attendance statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Attended</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{event.volunteersAttended}</span>
                        <Badge className="bg-green-100 text-green-800">{attendanceRate}%</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">No Shows</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{event.volunteersNoShow}</span>
                        <Badge className="bg-red-100 text-red-800">{noShowRate}%</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Hours Logged</span>
                      <span className="font-semibold">
                        {event.volunteers.reduce((sum, v) => sum + (v.hoursLogged || 0), 0)} hours
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Volunteer Feedback</CardTitle>
                  <CardDescription>Post-event ratings and comments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="font-semibold">4.8</span>
                      <span className="text-gray-600">(12 reviews)</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>"Great organization and meaningful impact!"</p>
                      <p>"Well-coordinated event with clear instructions."</p>
                      <p>"Would definitely participate again."</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Impact Metrics</CardTitle>
                  <CardDescription>Environmental and community impact</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Waste Collected</span>
                      <span className="font-semibold">127 kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Beach Area Cleaned</span>
                      <span className="font-semibold">2.5 km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plastic Items Removed</span>
                      <span className="font-semibold">1,847 items</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">CO₂ Impact Prevented</span>
                      <span className="font-semibold">45 kg CO₂</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* QR Code Dialog */}
        <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Event QR Code</DialogTitle>
              <DialogDescription>
                Volunteers can scan this QR code to check in/out of the event
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex flex-col items-center space-y-4">
              <div className="w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <QrCode className="h-16 w-16 text-gray-400" />
              </div>
              
              <div className="text-center">
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-gray-600">Event ID: {event.id}</p>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}