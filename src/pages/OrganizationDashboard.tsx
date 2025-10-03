import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  mockEvents, 
  mockOrganizations, 
  mockRegistrations, 
  getEventsByOrganization 
} from '@/lib/mockData';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Plus, 
  Edit, 
  Eye, 
  Award, 
  Building,
  LogOut,
  BarChart3
} from 'lucide-react';

export default function OrganizationDashboard() {
  const { user, logout } = useAuth();
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    maxVolunteers: '',
    category: '',
    requirements: ''
  });

  if (!user || user.role !== 'organization') {
    return <div>Access denied. Organizations only.</div>;
  }

  const organization = mockOrganizations.find(org => org.id === user.organizationId);
  const organizationEvents = getEventsByOrganization(user.organizationId || '');
  const totalVolunteers = organizationEvents.reduce((sum, event) => sum + event.registeredVolunteers, 0);
  const activeEvents = organizationEvents.filter(event => event.status === 'published').length;

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would make an API call
    console.log('Creating event:', newEvent);
    setIsCreateEventOpen(false);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      maxVolunteers: '',
      category: '',
      requirements: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Building className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">SwaedUAE</span>
              <Badge variant="default">Organization Portal</Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4" />
                <span className="text-sm font-medium">{organization?.name}</span>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{organizationEvents.length}</div>
              <p className="text-xs text-gray-500">events created</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Active Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeEvents}</div>
              <p className="text-xs text-gray-500">currently published</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Volunteers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{totalVolunteers}</div>
              <p className="text-xs text-gray-500">registered volunteers</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Certificates Issued</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">12</div>
              <p className="text-xs text-gray-500">volunteer certificates</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="events" className="space-y-6">
          <TabsList>
            <TabsTrigger value="events">Event Management</TabsTrigger>
            <TabsTrigger value="attendance">Attendance Console</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Event Management */}
          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Event Management</CardTitle>
                    <CardDescription>Create and manage your volunteer events</CardDescription>
                  </div>
                  <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Event
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create New Event</DialogTitle>
                        <DialogDescription>
                          Create a new volunteer opportunity for your organization
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleCreateEvent} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="title">Event Title</Label>
                            <Input
                              id="title"
                              value={newEvent.title}
                              onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="category">Category</Label>
                            <Select value={newEvent.category} onValueChange={(value) => setNewEvent({...newEvent, category: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="environment">Environment</SelectItem>
                                <SelectItem value="community">Community Support</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="health">Health & Wellness</SelectItem>
                                <SelectItem value="elderly">Elderly Care</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newEvent.description}
                            onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                            rows={3}
                            required
                          />
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="date">Date</Label>
                            <Input
                              id="date"
                              type="date"
                              value={newEvent.date}
                              onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="startTime">Start Time</Label>
                            <Input
                              id="startTime"
                              type="time"
                              value={newEvent.startTime}
                              onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="endTime">End Time</Label>
                            <Input
                              id="endTime"
                              type="time"
                              value={newEvent.endTime}
                              onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              value={newEvent.location}
                              onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="maxVolunteers">Max Volunteers</Label>
                            <Input
                              id="maxVolunteers"
                              type="number"
                              value={newEvent.maxVolunteers}
                              onChange={(e) => setNewEvent({...newEvent, maxVolunteers: e.target.value})}
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="requirements">Requirements (one per line)</Label>
                          <Textarea
                            id="requirements"
                            value={newEvent.requirements}
                            onChange={(e) => setNewEvent({...newEvent, requirements: e.target.value})}
                            placeholder="Comfortable clothing&#10;Sun protection&#10;Water bottle"
                            rows={3}
                          />
                        </div>
                        
                        <div className="flex space-x-3">
                          <Button type="submit" className="flex-1">Create Event</Button>
                          <Button type="button" variant="outline" onClick={() => setIsCreateEventOpen(false)}>
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {organizationEvents.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No events created yet.</p>
                ) : (
                  <div className="space-y-4">
                    {organizationEvents.map((event) => (
                      <div key={event.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{event.title}</h3>
                            <p className="text-gray-600">{event.category}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={
                              event.status === 'published' ? 'default' :
                              event.status === 'draft' ? 'secondary' :
                              event.status === 'completed' ? 'outline' :
                              'destructive'
                            }>
                              {event.status}
                            </Badge>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            {event.location}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            {event.registeredVolunteers}/{event.maxVolunteers}
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendance Console */}
          <TabsContent value="attendance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Console</CardTitle>
                <CardDescription>Monitor volunteer check-ins and attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {organizationEvents.filter(event => event.status === 'published').map((event) => (
                    <Card key={event.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <CardDescription>
                          {new Date(event.date).toLocaleDateString()} • {event.startTime} - {event.endTime}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">8</div>
                            <p className="text-sm text-gray-500">Checked In</p>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">15</div>
                            <p className="text-sm text-gray-500">Registered</p>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-600">5</div>
                            <p className="text-sm text-gray-500">Completed</p>
                          </div>
                        </div>
                        <Button size="sm">View Attendance Details</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certificates */}
          <TabsContent value="certificates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Certificate Management</CardTitle>
                <CardDescription>Issue and manage volunteer certificates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Certificate management system</p>
                  <Button>Issue New Certificate</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reports & Analytics</CardTitle>
                <CardDescription>View detailed reports and analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Detailed analytics and reporting</p>
                  <Button>Generate Report</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}