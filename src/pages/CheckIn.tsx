import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Camera, MapPin, Clock, CheckCircle, AlertCircle, 
  Smartphone, Wifi, WifiOff, Battery, Signal, 
  QrCode, ScanLine, RefreshCw, X
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Location {
  lat: number;
  lng: number;
}

interface DeviceStatus {
  battery: number;
  signal: string;
  wifi: boolean;
  camera: boolean;
}

interface CurrentEvent {
  id: number;
  title: string;
  organization: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  coordinates: Location;
  geofenceRadius: number;
  qrCode: string;
}

interface BatteryManager {
  level: number;
}

export default function CheckIn() {
  const [scannerActive, setScannerActive] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [location, setLocation] = useState<Location | null>(null);
  const [locationError, setLocationError] = useState('');
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<CurrentEvent | null>(null);
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>({
    battery: 85,
    signal: 'strong',
    wifi: true,
    camera: false
  });
  const [geofenceStatus, setGeofenceStatus] = useState<'checking' | 'inside' | 'outside' | 'error'>('checking');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mock event data
  const mockEvent: CurrentEvent = {
    id: 1,
    title: 'Beach Cleanup Drive - Dubai Marina',
    organization: 'Emirates Environmental Group',
    date: '2024-03-20',
    startTime: '08:00',
    endTime: '12:00',
    location: 'Dubai Marina Beach',
    coordinates: { lat: 25.0657, lng: 55.1413 },
    geofenceRadius: 150, // meters
    qrCode: 'EVT001-BCL-DM-20240320'
  };

  useEffect(() => {
    // Get user location
    getCurrentLocation();
    // Check device status
    checkDeviceStatus();
    // Set mock current event
    setCurrentEvent(mockEvent);
  }, []);

  useEffect(() => {
    if (location && currentEvent) {
      checkGeofence();
    }
  }, [location, currentEvent]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocationError('');
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location access denied. Please enable location permissions.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information unavailable.');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timeout.');
            break;
          default:
            setLocationError('An unknown error occurred while retrieving location.');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const checkDeviceStatus = () => {
    // Check battery (if supported)
    if ('getBattery' in navigator) {
      (navigator as Navigator & { getBattery(): Promise<BatteryManager> }).getBattery().then((battery: BatteryManager) => {
        setDeviceStatus(prev => ({
          ...prev,
          battery: Math.round(battery.level * 100)
        }));
      });
    }

    // Check network status
    setDeviceStatus(prev => ({
      ...prev,
      wifi: navigator.onLine,
      signal: navigator.onLine ? 'strong' : 'weak'
    }));
  };

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lng2-lng1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  };

  const checkGeofence = () => {
    if (!location || !currentEvent) {
      setGeofenceStatus('error');
      return;
    }

    const distance = calculateDistance(
      location.lat,
      location.lng,
      currentEvent.coordinates.lat,
      currentEvent.coordinates.lng
    );

    if (distance <= currentEvent.geofenceRadius) {
      setGeofenceStatus('inside');
    } else {
      setGeofenceStatus('outside');
    }
  };

  const startScanner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setScannerActive(true);
        setDeviceStatus(prev => ({ ...prev, camera: true }));
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions or use manual check-in.');
    }
  };

  const stopScanner = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setScannerActive(false);
    setDeviceStatus(prev => ({ ...prev, camera: false }));
  };

  const simulateQRScan = () => {
    // Simulate successful QR code scan
    setTimeout(() => {
      handleCheckIn(mockEvent.qrCode);
    }, 2000);
  };

  const handleCheckIn = async (qrCode: string) => {
    if (geofenceStatus !== 'inside') {
      alert('You must be within the event location to check in.');
      return;
    }

    // Simulate check-in process
    try {
      // Validate QR code
      if (qrCode !== currentEvent?.qrCode && qrCode !== 'DEMO-CHECKIN') {
        alert('Invalid QR code for this event.');
        return;
      }

      // Record check-in
      const checkInData = {
        eventId: currentEvent?.id,
        timestamp: new Date().toISOString(),
        location: location,
        method: qrCode === 'DEMO-CHECKIN' ? 'Manual' : 'QR Scan',
        deviceInfo: navigator.userAgent,
        geofenceStatus: geofenceStatus
      };

      // Store in localStorage (simulate API call)
      const existingCheckIns = JSON.parse(localStorage.getItem('userCheckIns') || '[]');
      existingCheckIns.push(checkInData);
      localStorage.setItem('userCheckIns', JSON.stringify(existingCheckIns));

      setIsCheckedIn(true);
      stopScanner();
      
    } catch (error) {
      alert('Check-in failed. Please try again.');
    }
  };

  const handleManualCheckIn = () => {
    if (!manualCode.trim()) {
      alert('Please enter the event code.');
      return;
    }
    handleCheckIn(manualCode);
  };

  const getGeofenceStatusBadge = () => {
    switch (geofenceStatus) {
      case 'checking':
        return <Badge variant="secondary"><RefreshCw className="h-3 w-3 mr-1 animate-spin" />Checking Location</Badge>;
      case 'inside':
        return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="h-3 w-3 mr-1" />Within Event Area</Badge>;
      case 'outside':
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" />Outside Event Area</Badge>;
      case 'error':
        return <Badge variant="secondary"><X className="h-3 w-3 mr-1" />Location Error</Badge>;
      default:
        return null;
    }
  };

  if (isCheckedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-green-200 bg-green-50">
          <CardContent className="py-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Check-in Successful!</h2>
            <p className="text-green-700 mb-4">
              You've successfully checked in to {currentEvent?.title}
            </p>
            <div className="text-sm text-green-600 mb-6">
              <p>Time: {new Date().toLocaleTimeString()}</p>
              <p>Location: Verified within event area</p>
            </div>
            <div className="space-y-2">
              <Link to="/dashboard">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Go to Dashboard
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="w-full border-green-300 text-green-700"
                onClick={() => setIsCheckedIn(false)}
              >
                Check in to Another Event
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Check-in</h1>
          <p className="text-gray-600">Scan QR code or enter event code to check in</p>
        </div>

        {/* Device Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Smartphone className="h-5 w-5" />
              <span>Device Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Battery className={`h-4 w-4 ${deviceStatus.battery > 20 ? 'text-green-600' : 'text-red-600'}`} />
                <span className="text-sm">{deviceStatus.battery}% Battery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Signal className={`h-4 w-4 ${deviceStatus.signal === 'strong' ? 'text-green-600' : 'text-yellow-600'}`} />
                <span className="text-sm">{deviceStatus.signal} Signal</span>
              </div>
              <div className="flex items-center space-x-2">
                {deviceStatus.wifi ? <Wifi className="h-4 w-4 text-green-600" /> : <WifiOff className="h-4 w-4 text-red-600" />}
                <span className="text-sm">{deviceStatus.wifi ? 'Connected' : 'Offline'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Camera className={`h-4 w-4 ${deviceStatus.camera ? 'text-green-600' : 'text-gray-400'}`} />
                <span className="text-sm">{deviceStatus.camera ? 'Camera Active' : 'Camera Off'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Location Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Event Location Verification:</span>
                {getGeofenceStatusBadge()}
              </div>
              
              {locationError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {locationError}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={getCurrentLocation}
                      className="ml-2"
                    >
                      Retry
                    </Button>
                  </AlertDescription>
                </Alert>
              )}

              {location && currentEvent && (
                <div className="text-sm text-gray-600">
                  <p>Your location: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}</p>
                  <p>Event location: {currentEvent.location}</p>
                  <p>Distance: {location ? 
                    Math.round(calculateDistance(location.lat, location.lng, currentEvent.coordinates.lat, currentEvent.coordinates.lng)) + 'm'
                    : 'Calculating...'
                  }</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Current Event */}
        {currentEvent && (
          <Card>
            <CardHeader>
              <CardTitle>Current Event</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{currentEvent.title}</h3>
                <p className="text-gray-600">{currentEvent.organization}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{currentEvent.startTime} - {currentEvent.endTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{currentEvent.location}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* QR Scanner */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <QrCode className="h-5 w-5" />
                <span>QR Code Scanner</span>
              </CardTitle>
              <CardDescription>
                Scan the QR code provided at the event location
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!scannerActive ? (
                <div className="text-center py-8">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Camera className="h-12 w-12 text-gray-400" />
                  </div>
                  <p className="text-gray-600 mb-4">Camera scanner is ready</p>
                  <Button onClick={startScanner} className="w-full">
                    <Camera className="h-4 w-4 mr-2" />
                    Start Camera Scanner
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative bg-black rounded-lg overflow-hidden">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-48 border-2 border-white rounded-lg">
                        <ScanLine className="h-full w-full text-white opacity-50" />
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={simulateQRScan} className="flex-1">
                      Simulate Scan (Demo)
                    </Button>
                    <Button variant="outline" onClick={stopScanner}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    Point your camera at the QR code provided by the event organizer
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Manual Check-in */}
          <Card>
            <CardHeader>
              <CardTitle>Manual Check-in</CardTitle>
              <CardDescription>
                Enter the event code if QR scanner is not available
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="eventCode">Event Code</Label>
                <Input
                  id="eventCode"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder="Enter event code (e.g., EVT001-BCL-DM-20240320)"
                  className="font-mono"
                />
              </div>
              
              <Button 
                onClick={handleManualCheckIn}
                disabled={geofenceStatus !== 'inside'}
                className="w-full"
              >
                Check In Manually
              </Button>

              {geofenceStatus !== 'inside' && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    You must be within the event location to check in. Please move closer to the event venue.
                  </AlertDescription>
                </Alert>
              )}

              {/* Demo codes */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Demo Codes (for testing):</h4>
                <div className="space-y-1 text-xs text-gray-600">
                  <button
                    onClick={() => setManualCode('DEMO-CHECKIN')}
                    className="block hover:underline"
                  >
                    DEMO-CHECKIN (Test code)
                  </button>
                  <button
                    onClick={() => setManualCode(mockEvent.qrCode)}
                    className="block hover:underline"
                  >
                    {mockEvent.qrCode} (Current event)
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="py-6">
            <h3 className="font-medium text-blue-900 mb-3">Check-in Instructions</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p>1. <strong>Enable Location:</strong> Allow location access for event verification</p>
              <p>2. <strong>Be On-Site:</strong> You must be within {currentEvent?.geofenceRadius || 150}m of the event location</p>
              <p>3. <strong>Scan or Enter Code:</strong> Use the QR scanner or enter the event code manually</p>
              <p>4. <strong>Confirm Check-in:</strong> Your attendance will be automatically recorded</p>
            </div>
            <Alert className="mt-4 border-blue-300 bg-blue-100">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Privacy Note:</strong> Your location is only used for event verification and is not stored permanently.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}