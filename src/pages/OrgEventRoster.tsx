import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, UserCheck, UserX, Clock, Search, Filter,
  ArrowLeft, Download, MessageSquare, Phone, Mail,
  CheckCircle, XCircle, AlertCircle, MoreHorizontal,
  Calendar, MapPin, Star, Award, RefreshCw, Send
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

interface RosterVolunteer {
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
  shiftId?: string;
  notes?: string;
  rating?: number;
  skills: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  isMinor: boolean;
  guardianConsent?: boolean;
  previousEvents: number;
  reliability: number;
}

interface EventShift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  volunteersNeeded: number;
  volunteersRegistered: number;
  volunteersPresent: number;
}

export default function OrgEventRoster() {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [shiftFilter, setShiftFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedVolunteers, setSelectedVolunteers] = useState<string[]>([]);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [showNotesDialog, setShowNotesDialog] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState<RosterVolunteer | null>(null);
  const [volunteerNotes, setVolunteerNotes] = useState('');

  // Mock event data
  const event = {
    id: id || '1',
    title: 'Beach Cleanup Drive',
    date: '2024-03-25',
    startTime: '08:00',
    endTime: '12:00',
    location: 'Jumeirah Beach'
  };

  const shifts: EventShift[] = [
    {
      id: 'shift-1',
      name: 'Morning Cleanup',
      startTime: '08:00',
      endTime: '10:00',
      volunteersNeeded: 25,
      volunteersRegistered: 23,
      volunteersPresent: 20
    },
    {
      id: 'shift-2',
      name: 'Extended Cleanup',
      startTime: '10:00',
      endTime: '12:00',
      volunteersNeeded: 25,
      volunteersRegistered: 19,
      volunteersPresent: 18
    }
  ];

  const [volunteers, setVolunteers] = useState<RosterVolunteer[]>([
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
      shift: 'Morning Cleanup',
      shiftId: 'shift-1',
      rating: 5,
      skills: ['Environmental Conservation', 'Leadership'],
      emergencyContact: {
        name: 'Fatima Al-Mansouri',
        phone: '+971 50 111 2222',
        relationship: 'Spouse'
      },
      isMinor: false,
      previousEvents: 12,
      reliability: 95
    },
    {
      id: '2',
      name: 'Fatima Hassan',
      email: 'fatima@example.com',
      phone: '+971 50 222 2222',
      status: 'checked_in',
      registeredAt: '2024-03-16T14:30:00Z',
      checkedInAt: '2024-03-25T08:05:00Z',
      shift: 'Extended Cleanup',
      shiftId: 'shift-2',
      skills: ['Community Service', 'First Aid'],
      emergencyContact: {
        name: 'Omar Hassan',
        phone: '+971 50 222 3333',
        relationship: 'Brother'
      },
      isMinor: false,
      previousEvents: 8,
      reliability: 88
    },
    {
      id: '3',
      name: 'Mohammed Ali',
      email: 'mohammed@example.com',
      phone: '+971 50 333 3333',
      status: 'no_show',
      registeredAt: '2024-03-18T11:20:00Z',
      shift: 'Morning Cleanup',
      shiftId: 'shift-1',
      notes: 'Called in sick on event day',
      skills: ['Gardening', 'Physical Activity'],
      emergencyContact: {
        name: 'Aisha Ali',
        phone: '+971 50 333 4444',
        relationship: 'Mother'
      },
      isMinor: false,
      previousEvents: 3,
      reliability: 67
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
      shift: 'Extended Cleanup',
      shiftId: 'shift-2',
      rating: 5,
      skills: ['Photography', 'Social Media'],
      emergencyContact: {
        name: 'Khalid Ahmed',
        phone: '+971 50 444 5555',
        relationship: 'Father'
      },
      isMinor: false,
      previousEvents: 15,
      reliability: 93
    },
    {
      id: '5',
      name: 'Layla Al-Zahra',
      email: 'layla@example.com',
      phone: '+971 50 555 5555',
      status: 'confirmed',
      registeredAt: '2024-03-20T10:15:00Z',
      shift: 'Morning Cleanup',
      shiftId: 'shift-1',
      skills: ['Youth Engagement'],
      emergencyContact: {
        name: 'Mariam Al-Zahra',
        phone: '+971 50 555 6666',
        relationship: 'Guardian'
      },
      isMinor: true,
      guardianConsent: true,
      previousEvents: 2,
      reliability: 100
    }
  ]);

  const filteredVolunteers = volunteers.filter(volunteer => {
    const matchesSearch = volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         volunteer.phone.includes(searchTerm);
    
    const matchesShift = shiftFilter === 'all' || volunteer.shiftId === shiftFilter;
    const matchesStatus = statusFilter === 'all' || volunteer.status === statusFilter;
    const matchesTab = selectedTab === 'all' || volunteer.status === selectedTab;
    
    return matchesSearch && matchesShift && matchesStatus && matchesTab;
  });

  const getStatusBadge = (status: RosterVolunteer['status']) => {
    const statusConfig = {
      registered: { label: 'Registered', className: 'bg-blue-100 text-blue-800' },
      confirmed: { label: 'Confirmed', className: 'bg-green-100 text-green-800' },
      checked_in: { label: 'Checked In', className: 'bg-purple-100 text-purple-800' },
      checked_out: { label: 'Checked Out', className: 'bg-green-100 text-green-800' },
      no_show: { label: 'No Show', className: 'bg-red-100 text-red-800' },
      cancelled: { label: 'Cancelled', className: 'bg-gray-100 text-gray-600' }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getReliabilityBadge = (reliability: number) => {
    if (reliability >= 90) return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
    if (reliability >= 75) return <Badge className="bg-yellow-100 text-yellow-800">Good</Badge>;
    if (reliability >= 60) return <Badge className="bg-orange-100 text-orange-800">Fair</Badge>;
    return <Badge className="bg-red-100 text-red-800">Poor</Badge>;
  };

  const handleVolunteerToggle = (volunteerId: string) => {
    setSelectedVolunteers(prev => 
      prev.includes(volunteerId)
        ? prev.filter(id => id !== volunteerId)
        : [...prev, volunteerId]
    );
  };

  const handleStatusChange = (volunteerId: string, newStatus: RosterVolunteer['status']) => {
    setVolunteers(prev => prev.map(volunteer => 
      volunteer.id === volunteerId 
        ? { ...volunteer, status: newStatus }
        : volunteer
    ));
  };

  const handleBulkMessage = () => {
    if (selectedVolunteers.length === 0) {
      alert('Please select volunteers to message.');
      return;
    }
    setShowMessageDialog(true);
  };

  const sendMessage = () => {
    if (!messageContent.trim()) {
      alert('Please enter a message.');
      return;
    }

    // Simulate sending message
    alert(`Message sent to ${selectedVolunteers.length} volunteers.`);
    setShowMessageDialog(false);
    setMessageContent('');
    setSelectedVolunteers([]);
  };

  const handleAddNotes = (volunteer: RosterVolunteer) => {
    setSelectedVolunteer(volunteer);
    setVolunteerNotes(volunteer.notes || '');
    setShowNotesDialog(true);
  };

  const saveNotes = () => {
    if (selectedVolunteer) {
      setVolunteers(prev => prev.map(volunteer => 
        volunteer.id === selectedVolunteer.id 
          ? { ...volunteer, notes: volunteerNotes }
          : volunteer
      ));
    }
    setShowNotesDialog(false);
    setSelectedVolunteer(null);
    setVolunteerNotes('');
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

  const stats = {
    total: volunteers.length,
    confirmed: volunteers.filter(v => v.status === 'confirmed').length,
    checkedIn: volunteers.filter(v => v.status === 'checked_in').length,
    checkedOut: volunteers.filter(v => v.status === 'checked_out').length,
    noShow: volunteers.filter(v => v.status === 'no_show').length,
    cancelled: volunteers.filter(v => v.status === 'cancelled').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to={`/org/events/${id}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Event
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Event Roster</h1>
              <p className="text-gray-600">{event.title} • {event.location}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {selectedVolunteers.length > 0 && (
              <>
                <Button variant="outline" onClick={handleBulkMessage}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message Selected ({selectedVolunteers.length})
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Selected
                </Button>
              </>
            )}
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Link to={`/org/events/${id}/kiosk`}>
              <Button>
                <UserCheck className="h-4 w-4 mr-2" />
                Open Kiosk
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.confirmed}</div>
              <div className="text-sm text-gray-600">Confirmed</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <UserCheck className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.checkedIn}</div>
              <div className="text-sm text-gray-600">Checked In</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.checkedOut}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.noShow}</div>
              <div className="text-sm text-gray-600">No Shows</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-gray-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.cancelled}</div>
              <div className="text-sm text-gray-600">Cancelled</div>
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
                    placeholder="Search volunteers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={shiftFilter} onValueChange={setShiftFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by shift" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Shifts</SelectItem>
                  {shifts.map((shift) => (
                    <SelectItem key={shift.id} value={shift.id}>
                      {shift.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="checked_in">Checked In</SelectItem>
                  <SelectItem value="checked_out">Checked Out</SelectItem>
                  <SelectItem value="no_show">No Show</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Roster Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed ({stats.confirmed})</TabsTrigger>
            <TabsTrigger value="checked_in">Present ({stats.checkedIn})</TabsTrigger>
            <TabsTrigger value="checked_out">Completed ({stats.checkedOut})</TabsTrigger>
            <TabsTrigger value="no_show">No Shows ({stats.noShow})</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="mt-6">
            <div className="space-y-4">
              {filteredVolunteers.length > 0 ? (
                filteredVolunteers.map((volunteer) => (
                  <Card key={volunteer.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <input
                            type="checkbox"
                            checked={selectedVolunteers.includes(volunteer.id)}
                            onChange={() => handleVolunteerToggle(volunteer.id)}
                            className="mt-1"
                          />
                          
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            {volunteer.avatar ? (
                              <img src={volunteer.avatar} alt={volunteer.name} className="w-12 h-12 rounded-full" />
                            ) : (
                              <span className="text-lg font-medium text-gray-600">
                                {volunteer.name.split(' ').map(n => n.charAt(0)).join('')}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{volunteer.name}</h3>
                              {getStatusBadge(volunteer.status)}
                              {volunteer.isMinor && (
                                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                                  Minor
                                </Badge>
                              )}
                              {getReliabilityBadge(volunteer.reliability)}
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <Mail className="h-4 w-4" />
                                  <span>{volunteer.email}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Phone className="h-4 w-4" />
                                  <span>{volunteer.phone}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Clock className="h-4 w-4" />
                                  <span>Shift: {volunteer.shift}</span>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <Calendar className="h-4 w-4" />
                                  <span>Registered: {formatDateTime(volunteer.registeredAt)}</span>
                                </div>
                                {volunteer.checkedInAt && (
                                  <div className="flex items-center space-x-2">
                                    <UserCheck className="h-4 w-4" />
                                    <span>Checked in: {formatDateTime(volunteer.checkedInAt)}</span>
                                  </div>
                                )}
                                {volunteer.hoursLogged && (
                                  <div className="flex items-center space-x-2">
                                    <Award className="h-4 w-4" />
                                    <span>Hours logged: {volunteer.hoursLogged}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Skills */}
                            {volunteer.skills.length > 0 && (
                              <div className="mb-3">
                                <span className="text-sm font-medium text-gray-700 mr-2">Skills:</span>
                                <div className="inline-flex flex-wrap gap-1">
                                  {volunteer.skills.map((skill, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Experience */}
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>Previous events: {volunteer.previousEvents}</span>
                              <span>Reliability: {volunteer.reliability}%</span>
                              {volunteer.rating && (
                                <div className="flex items-center space-x-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span>{volunteer.rating}/5</span>
                                </div>
                              )}
                            </div>

                            {/* Notes */}
                            {volunteer.notes && (
                              <div className="mt-3 p-2 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                                <p className="text-sm text-yellow-800">{volunteer.notes}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2 ml-4">
                          <Select
                            value={volunteer.status}
                            onValueChange={(value: RosterVolunteer['status']) => 
                              handleStatusChange(volunteer.id, value)
                            }
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="registered">Registered</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="checked_in">Checked In</SelectItem>
                              <SelectItem value="checked_out">Checked Out</SelectItem>
                              <SelectItem value="no_show">No Show</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>

                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleAddNotes(volunteer)}
                          >
                            Notes
                          </Button>

                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4" />
                          </Button>

                          <Button variant="outline" size="sm">
                            <Mail className="h-4 w-4" />
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
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No volunteers found</h3>
                    <p className="text-gray-600">
                      {searchTerm || shiftFilter !== 'all' || statusFilter !== 'all'
                        ? 'Try adjusting your search or filters.'
                        : 'No volunteers have registered for this event yet.'
                      }
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Message Dialog */}
        <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Send Message to Volunteers</DialogTitle>
              <DialogDescription>
                Send a message to {selectedVolunteers.length} selected volunteers
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  placeholder="Enter your message..."
                  rows={4}
                />
              </div>

              <Alert className="border-blue-200 bg-blue-50">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  Message will be sent via email and SMS to all selected volunteers.
                </AlertDescription>
              </Alert>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowMessageDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={sendMessage}>
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Notes Dialog */}
        <Dialog open={showNotesDialog} onOpenChange={setShowNotesDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Volunteer Notes</DialogTitle>
              <DialogDescription>
                {selectedVolunteer && `Add notes for ${selectedVolunteer.name}`}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Notes</label>
                <Textarea
                  value={volunteerNotes}
                  onChange={(e) => setVolunteerNotes(e.target.value)}
                  placeholder="Add notes about this volunteer..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowNotesDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={saveNotes}>
                  Save Notes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}