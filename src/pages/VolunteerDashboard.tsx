import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  mockEvents, 
  mockRegistrations, 
  mockCertificates, 
  getRegistrationsByVolunteer, 
  getCertificatesByVolunteer,
  isWithinGeofence 
} from '@/lib/mockData';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Award, 
  QrCode, 
  CheckCircle, 
  XCircle, 
  User,
  Heart,
  LogOut
} from 'lucide-react';

export default function VolunteerDashboard() {
  const { user, logout } = useAuth();
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const [checkInStatus, setCheckInStatus] = useState<{[eventId: string]: 'checked_in' | 'checked_out' | null}>({});

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied');
          // Use Dubai Marina as default for demo
          setCurrentLocation({ lat: 25.0657, lng: 55.1713 });
        }
      );
    }
  }, []);

  if (!user || user.role !== 'volunteer') {
    return <div>Access denied. Volunteers only.</div>;
  }

  const userRegistrations = getRegistrationsByVolunteer(user.id);
  const userCertificates = getCertificatesByVolunteer(user.id);
  const registeredEvents = mockEvents.filter(event => 
    userRegistrations.some(reg => reg.eventId === event.id)
  );

  const totalHours = userCertificates.reduce((sum, cert) => sum + cert.hoursCompleted, 0);
  const completedEvents = userRegistrations.filter(reg => reg.status === 'completed').length;

  const handleCheckIn = (eventId: string) => {
    const event = mockEvents.find(e => e.id === eventId);
    if (!event || !currentLocation) return;

    const withinGeofence = isWithinGeofence(event.coordinates, currentLocation);
    
    if (withinGeofence) {
      setCheckInStatus(prev => ({ ...prev, [eventId]: 'checked_in' }));
      // In real app, this would make an API call
    }
  };

  const handleCheckOut = (eventId: string) => {
    const event = mockEvents.find(e => e.id === eventId);
    if (!event || !currentLocation) return;

    const withinGeofence = isWithinGeofence(event.coordinates, currentLocation);
    
    if (withinGeofence) {
      setCheckInStatus(prev => ({ ...prev, [eventId]: 'checked_out' }));
      // In real app, this would make an API call
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Heart className="h-8 w-8 text-red-600" />
              <span className="text-2xl font-bold text-gray-900">SwaedUAE</span>
              <Badge variant="secondary">Volunteer Portal</Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">{user.name}</span>
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
              <CardTitle className="text-sm font-medium text-gray-500">Total Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{totalHours}</div>
              <p className="text-xs text-gray-500">volunteer hours</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Events Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completedEvents}</div>
              <p className="text-xs text-gray-500">successful events</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Certificates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{userCertificates.length}</div>
              <p className="text-xs text-gray-500">earned certificates</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Active Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {userRegistrations.filter(reg => reg.status === 'registered').length}
              </div>
              <p className="text-xs text-gray-500">upcoming events</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="events" className="space-y-6">
          <TabsList>
            <TabsTrigger value="events">My Events</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* My Events */}
          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Registered Events</CardTitle>
                <CardDescription>Events you've signed up for</CardDescription>
              </CardHeader>
              <CardContent>
                {registeredEvents.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No events registered yet.</p>
                ) : (
                  <div className="space-y-4">
                    {registeredEvents.map((event) => {
                      const registration = userRegistrations.find(reg => reg.eventId === event.id);
                      return (
                        <div key={event.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-semibold text-lg">{event.title}</h3>
                              <p className="text-gray-600">{event.organizationName}</p>
                            </div>
                            <Badge variant={
                              registration?.status === 'completed' ? 'default' :
                              registration?.status === 'checked_in' ? 'secondary' :
                              'outline'
                            }>
                              {registration?.status || 'registered'}
                            </Badge>
                          </div>
                          
                          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2" />
                              {new Date(event.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              {event.startTime} - {event.endTime}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2" />
                              {event.location}
                            </div>
                          </div>

                          {registration?.status === 'registered' && (
                            <Button size="sm" onClick={() => handleCheckIn(event.id)}>
                              Check In with QR
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendance */}
          <TabsContent value="attendance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>QR Code Check-in/out</CardTitle>
                <CardDescription>Track your attendance at volunteer events</CardDescription>
              </CardHeader>
              <CardContent>
                {registeredEvents.filter(event => {
                  const registration = userRegistrations.find(reg => reg.eventId === event.id);
                  return registration?.status === 'registered' || checkInStatus[event.id];
                }).map((event) => {
                  const status = checkInStatus[event.id];
                  const withinGeofence = currentLocation ? 
                    isWithinGeofence(event.coordinates, currentLocation) : false;

                  return (
                    <div key={event.id} className="border rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold">{event.title}</h3>
                          <p className="text-gray-600 text-sm">{event.location}</p>
                        </div>
                        <Badge variant={status === 'checked_in' ? 'default' : status === 'checked_out' ? 'secondary' : 'outline'}>
                          {status || 'Not checked in'}
                        </Badge>
                      </div>

                      {!withinGeofence && (
                        <Alert className="mb-4">
                          <XCircle className="h-4 w-4" />
                          <AlertDescription>
                            You must be within 150m of the event location to check in/out.
                          </AlertDescription>
                        </Alert>
                      )}

                      {withinGeofence && (
                        <Alert className="mb-4 border-green-200 bg-green-50">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <AlertDescription className="text-green-800">
                            You are within the event geofence area.
                          </AlertDescription>
                        </Alert>
                      )}

                      <div className="flex space-x-3">
                        <Button 
                          size="sm" 
                          disabled={!withinGeofence || status === 'checked_in'}
                          onClick={() => handleCheckIn(event.id)}
                        >
                          <QrCode className="h-4 w-4 mr-2" />
                          Check In
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          disabled={!withinGeofence || status !== 'checked_in'}
                          onClick={() => handleCheckOut(event.id)}
                        >
                          <QrCode className="h-4 w-4 mr-2" />
                          Check Out
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certificates */}
          <TabsContent value="certificates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Certificates</CardTitle>
                <CardDescription>Digital certificates for completed volunteer work</CardDescription>
              </CardHeader>
              <CardContent>
                {userCertificates.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No certificates earned yet.</p>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {userCertificates.map((certificate) => (
                      <Card key={certificate.id} className="border-yellow-200">
                        <CardHeader>
                          <div className="flex items-center space-x-2">
                            <Award className="h-6 w-6 text-yellow-500" />
                            <CardTitle className="text-lg">Volunteer Certificate</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="font-medium">Event:</span> {certificate.eventTitle}
                            </div>
                            <div>
                              <span className="font-medium">Organization:</span> {certificate.organizationName}
                            </div>
                            <div>
                              <span className="font-medium">Hours:</span> {certificate.hoursCompleted}
                            </div>
                            <div>
                              <span className="font-medium">Issued:</span> {new Date(certificate.issuedAt).toLocaleDateString()}
                            </div>
                            <div>
                              <span className="font-medium">QR Code:</span> 
                              <code className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">
                                {certificate.qrCode}
                              </code>
                            </div>
                          </div>
                          <div className="flex space-x-2 mt-4">
                            <Button size="sm" variant="outline">Download</Button>
                            <Button size="sm" variant="outline">Share</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Your volunteer profile details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Name</label>
                    <p className="text-lg">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p>{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p>{user.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Emirates ID</label>
                    <p>{user.emiratesId || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Member Since</label>
                    <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}