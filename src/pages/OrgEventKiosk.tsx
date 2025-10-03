import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  QrCode, Camera, UserCheck, UserX, Clock, 
  CheckCircle, XCircle, AlertCircle, Users,
  ArrowLeft, Settings, Wifi, WifiOff, Battery,
  Search, Scan, MapPin, Calendar
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

interface KioskVolunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  status: 'registered' | 'checked_in' | 'checked_out' | 'no_show';
  checkInTime?: string;
  checkOutTime?: string;
  shift?: string;
  qrCode: string;
}

interface KioskEvent {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  volunteersNeeded: number;
  volunteersRegistered: number;
  volunteersCheckedIn: number;
  volunteersCheckedOut: number;
}

export default function OrgEventKiosk() {
  const { id } = useParams();
  const [isOnline, setIsOnline] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [scanMode, setScanMode] = useState<'checkin' | 'checkout'>('checkin');
  const [searchTerm, setSearchTerm] = useState('');
  const [lastScanResult, setLastScanResult] = useState<{
    volunteer: KioskVolunteer;
    action: 'checkin' | 'checkout';
    timestamp: string;
    success: boolean;
  } | null>(null);

  // Mock event data
  const event: KioskEvent = {
    id: id || '1',
    title: 'Beach Cleanup Drive',
    date: '2024-03-25',
    startTime: '08:00',
    endTime: '12:00',
    location: 'Jumeirah Beach',
    volunteersNeeded: 50,
    volunteersRegistered: 42,
    volunteersCheckedIn: 28,
    volunteersCheckedOut: 15
  };

  const [volunteers, setVolunteers] = useState<KioskVolunteer[]>([
    {
      id: '1',
      name: 'Ahmed Al-Mansouri',
      email: 'ahmed@example.com',
      phone: '+971 50 111 1111',
      avatar: '/api/placeholder/60/60',
      status: 'checked_out',
      checkInTime: '07:55',
      checkOutTime: '12:10',
      shift: 'Morning Cleanup',
      qrCode: 'QR001'
    },
    {
      id: '2',
      name: 'Fatima Hassan',
      email: 'fatima@example.com',
      phone: '+971 50 222 2222',
      status: 'checked_in',
      checkInTime: '08:05',
      shift: 'Extended Cleanup',
      qrCode: 'QR002'
    },
    {
      id: '3',
      name: 'Mohammed Ali',
      email: 'mohammed@example.com',
      phone: '+971 50 333 3333',
      status: 'registered',
      shift: 'Morning Cleanup',
      qrCode: 'QR003'
    },
    {
      id: '4',
      name: 'Sarah Ahmed',
      email: 'sarah@example.com',
      phone: '+971 50 444 4444',
      status: 'checked_in',
      checkInTime: '08:00',
      shift: 'Extended Cleanup',
      qrCode: 'QR004'
    }
  ]);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate network status
  useEffect(() => {
    const networkTimer = setInterval(() => {
      setIsOnline(Math.random() > 0.1); // 90% uptime simulation
    }, 30000);

    return () => clearInterval(networkTimer);
  }, []);

  const handleQRScan = (qrCode: string) => {
    const volunteer = volunteers.find(v => v.qrCode === qrCode);
    
    if (!volunteer) {
      setLastScanResult({
        volunteer: {
          id: 'unknown',
          name: 'Unknown Volunteer',
          email: '',
          phone: '',
          status: 'registered',
          qrCode
        },
        action: scanMode,
        timestamp: new Date().toISOString(),
        success: false
      });
      return;
    }

    const now = new Date();
    const currentTimeString = now.toTimeString().slice(0, 5);

    if (scanMode === 'checkin') {
      if (volunteer.status === 'registered') {
        setVolunteers(prev => prev.map(v => 
          v.id === volunteer.id 
            ? { ...v, status: 'checked_in', checkInTime: currentTimeString }
            : v
        ));
        setLastScanResult({
          volunteer,
          action: 'checkin',
          timestamp: now.toISOString(),
          success: true
        });
      } else if (volunteer.status === 'checked_in') {
        setLastScanResult({
          volunteer,
          action: 'checkin',
          timestamp: now.toISOString(),
          success: false
        });
      }
    } else if (scanMode === 'checkout') {
      if (volunteer.status === 'checked_in') {
        setVolunteers(prev => prev.map(v => 
          v.id === volunteer.id 
            ? { ...v, status: 'checked_out', checkOutTime: currentTimeString }
            : v
        ));
        setLastScanResult({
          volunteer,
          action: 'checkout',
          timestamp: now.toISOString(),
          success: true
        });
      } else if (volunteer.status === 'checked_out') {
        setLastScanResult({
          volunteer,
          action: 'checkout',
          timestamp: now.toISOString(),
          success: false
        });
      }
    }
  };

  const handleManualCheckIn = (volunteerId: string) => {
    const now = new Date();
    const currentTimeString = now.toTimeString().slice(0, 5);

    setVolunteers(prev => prev.map(v => 
      v.id === volunteerId 
        ? { 
            ...v, 
            status: scanMode === 'checkin' ? 'checked_in' : 'checked_out',
            [scanMode === 'checkin' ? 'checkInTime' : 'checkOutTime']: currentTimeString
          }
        : v
    ));

    const volunteer = volunteers.find(v => v.id === volunteerId);
    if (volunteer) {
      setLastScanResult({
        volunteer,
        action: scanMode,
        timestamp: now.toISOString(),
        success: true
      });
    }
  };

  const getStatusBadge = (status: KioskVolunteer['status']) => {
    const statusConfig = {
      registered: { label: 'Registered', className: 'bg-blue-100 text-blue-800' },
      checked_in: { label: 'Checked In', className: 'bg-green-100 text-green-800' },
      checked_out: { label: 'Checked Out', className: 'bg-purple-100 text-purple-800' },
      no_show: { label: 'No Show', className: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const filteredVolunteers = volunteers.filter(volunteer =>
    volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    volunteer.phone.includes(searchTerm)
  );

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-AE', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Kiosk Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to={`/org/events/${id}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Exit Kiosk
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
                <p className="text-gray-600">{formatDate(event.date)} • {event.location}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Network Status */}
              <div className="flex items-center space-x-2">
                {isOnline ? (
                  <Wifi className="h-5 w-5 text-green-600" />
                ) : (
                  <WifiOff className="h-5 w-5 text-red-600" />
                )}
                <span className={`text-sm ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
              
              {/* Battery Status */}
              <div className="flex items-center space-x-2">
                <Battery className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-600">85%</span>
              </div>
              
              {/* Current Time */}
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">
                  {currentTime.toLocaleTimeString('en-AE', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true 
                  })}
                </div>
                <div className="text-sm text-gray-600">
                  {currentTime.toLocaleDateString('en-AE', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Event Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{event.volunteersRegistered}</div>
              <div className="text-sm text-gray-600">Registered</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <UserCheck className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{volunteers.filter(v => v.status === 'checked_in').length}</div>
              <div className="text-sm text-gray-600">Checked In</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{volunteers.filter(v => v.status === 'checked_out').length}</div>
              <div className="text-sm text-gray-600">Checked Out</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {formatTime(event.startTime)} - {formatTime(event.endTime)}
              </div>
              <div className="text-sm text-gray-600">Event Hours</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* QR Scanner Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Scan Mode Toggle */}
            <Card>
              <CardHeader>
                <CardTitle>Scan Mode</CardTitle>
                <CardDescription>Select check-in or check-out mode</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={scanMode === 'checkin' ? 'default' : 'outline'}
                    onClick={() => setScanMode('checkin')}
                    className="w-full"
                  >
                    <UserCheck className="h-4 w-4 mr-2" />
                    Check In
                  </Button>
                  <Button
                    variant={scanMode === 'checkout' ? 'default' : 'outline'}
                    onClick={() => setScanMode('checkout')}
                    className="w-full"
                  >
                    <UserX className="h-4 w-4 mr-2" />
                    Check Out
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* QR Scanner */}
            <Card>
              <CardHeader>
                <CardTitle>QR Code Scanner</CardTitle>
                <CardDescription>
                  Scan volunteer QR codes for {scanMode === 'checkin' ? 'check-in' : 'check-out'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6">
                  <Camera className="h-16 w-16 text-gray-400 mb-4" />
                  <p className="text-gray-600 text-center mb-4">
                    Position QR code within the frame
                  </p>
                  <div className="space-y-2 w-full">
                    <Button 
                      className="w-full"
                      onClick={() => handleQRScan('QR001')}
                    >
                      <QrCode className="h-4 w-4 mr-2" />
                      Simulate Scan (Ahmed)
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleQRScan('QR002')}
                    >
                      <QrCode className="h-4 w-4 mr-2" />
                      Simulate Scan (Fatima)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Last Scan Result */}
            {lastScanResult && (
              <Card>
                <CardHeader>
                  <CardTitle>Last Scan Result</CardTitle>
                </CardHeader>
                <CardContent>
                  <Alert className={lastScanResult.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
                    {lastScanResult.success ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <AlertDescription className={lastScanResult.success ? 'text-green-800' : 'text-red-800'}>
                      <div className="space-y-1">
                        <p className="font-medium">{lastScanResult.volunteer.name}</p>
                        <p className="text-sm">
                          {lastScanResult.success 
                            ? `Successfully ${lastScanResult.action === 'checkin' ? 'checked in' : 'checked out'}`
                            : `Failed to ${lastScanResult.action === 'checkin' ? 'check in' : 'check out'} - ${
                                lastScanResult.volunteer.id === 'unknown' 
                                  ? 'Unknown QR code'
                                  : `Already ${lastScanResult.volunteer.status.replace('_', ' ')}`
                              }`
                          }
                        </p>
                        <p className="text-xs">
                          {new Date(lastScanResult.timestamp).toLocaleTimeString('en-AE')}
                        </p>
                      </div>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Volunteer List Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Manual Check-in Search */}
            <Card>
              <CardHeader>
                <CardTitle>Manual {scanMode === 'checkin' ? 'Check-in' : 'Check-out'}</CardTitle>
                <CardDescription>Search and manually process volunteers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredVolunteers.map((volunteer) => (
                    <div key={volunteer.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          {volunteer.avatar ? (
                            <img src={volunteer.avatar} alt={volunteer.name} className="w-12 h-12 rounded-full" />
                          ) : (
                            <span className="text-sm font-medium text-gray-600">
                              {volunteer.name.split(' ').map(n => n.charAt(0)).join('')}
                            </span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{volunteer.name}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>{volunteer.email}</span>
                            {volunteer.shift && <span>• {volunteer.shift}</span>}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            {getStatusBadge(volunteer.status)}
                            {volunteer.checkInTime && (
                              <span className="text-xs text-gray-500">
                                In: {volunteer.checkInTime}
                              </span>
                            )}
                            {volunteer.checkOutTime && (
                              <span className="text-xs text-gray-500">
                                Out: {volunteer.checkOutTime}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {scanMode === 'checkin' && volunteer.status === 'registered' && (
                          <Button 
                            size="sm"
                            onClick={() => handleManualCheckIn(volunteer.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <UserCheck className="h-4 w-4 mr-1" />
                            Check In
                          </Button>
                        )}
                        
                        {scanMode === 'checkout' && volunteer.status === 'checked_in' && (
                          <Button 
                            size="sm"
                            onClick={() => handleManualCheckIn(volunteer.id)}
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            <UserX className="h-4 w-4 mr-1" />
                            Check Out
                          </Button>
                        )}
                        
                        {((scanMode === 'checkin' && volunteer.status !== 'registered') ||
                          (scanMode === 'checkout' && volunteer.status !== 'checked_in')) && (
                          <Badge variant="outline" className="text-xs">
                            {volunteer.status === 'checked_in' && scanMode === 'checkin' ? 'Already checked in' :
                             volunteer.status === 'checked_out' && scanMode === 'checkout' ? 'Already checked out' :
                             volunteer.status === 'checked_out' && scanMode === 'checkin' ? 'Event completed' :
                             'Not available'}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Offline Mode Notice */}
            {!isOnline && (
              <Alert className="border-orange-200 bg-orange-50">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800">
                  <strong>Offline Mode:</strong> Check-ins and check-outs are being stored locally. 
                  Data will sync automatically when connection is restored.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <Link to={`/org/events/${id}/scan`}>
                <Button variant="outline" className="w-full">
                  <Scan className="h-4 w-4 mr-2" />
                  Advanced Scanner
                </Button>
              </Link>
              
              <Link to={`/org/events/${id}/roster`}>
                <Button variant="outline" className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  View Full Roster
                </Button>
              </Link>
              
              <Button variant="outline" className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Kiosk Settings
              </Button>
              
              <Button variant="outline" className="w-full">
                <MapPin className="h-4 w-4 mr-2" />
                Location Check
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}