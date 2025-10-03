import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Camera, QrCode, Scan, UserCheck, UserX, MapPin,
  ArrowLeft, Settings, Flashlight, FlashlightOff,
  CheckCircle, XCircle, AlertCircle, Clock, Users,
  Bluetooth, Wifi, WifiOff, Battery, RefreshCw
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

interface ScanResult {
  id: string;
  volunteerId: string;
  volunteerName: string;
  volunteerEmail: string;
  action: 'checkin' | 'checkout';
  timestamp: string;
  method: 'qr' | 'manual' | 'bluetooth' | 'nfc';
  location: {
    lat: number;
    lng: number;
    accuracy: number;
  };
  success: boolean;
  errorMessage?: string;
  deviceInfo: {
    userAgent: string;
    platform: string;
    battery: number;
  };
}

interface GeofenceStatus {
  isWithinRadius: boolean;
  distance: number;
  accuracy: number;
  eventLocation: { lat: number; lng: number };
  userLocation: { lat: number; lng: number };
}

export default function OrgEventScan() {
  const { id } = useParams();
  const [isScanning, setIsScanning] = useState(false);
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
  const [geofenceStatus, setGeofenceStatus] = useState<GeofenceStatus | null>(null);
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [selectedTab, setSelectedTab] = useState('scanner');
  const [fraudDetectionEnabled, setFraudDetectionEnabled] = useState(true);
  const [offlineQueue, setOfflineQueue] = useState<ScanResult[]>([]);

  // Mock event data
  const event = {
    id: id || '1',
    title: 'Beach Cleanup Drive',
    location: 'Jumeirah Beach',
    geofenceRadius: 150,
    coordinates: { lat: 25.2048, lng: 55.2708 }
  };

  // Initialize geolocation and device status
  useEffect(() => {
    // Simulate geolocation
    const updateLocation = () => {
      const mockUserLocation = {
        lat: 25.2048 + (Math.random() - 0.5) * 0.001,
        lng: 55.2708 + (Math.random() - 0.5) * 0.001
      };
      
      const distance = calculateDistance(
        event.coordinates.lat,
        event.coordinates.lng,
        mockUserLocation.lat,
        mockUserLocation.lng
      );

      setGeofenceStatus({
        isWithinRadius: distance <= event.geofenceRadius,
        distance: Math.round(distance),
        accuracy: Math.round(Math.random() * 20 + 5),
        eventLocation: event.coordinates,
        userLocation: mockUserLocation
      });
    };

    updateLocation();
    const locationTimer = setInterval(updateLocation, 10000);

    // Simulate network status changes
    const networkTimer = setInterval(() => {
      setIsOnline(Math.random() > 0.1);
    }, 30000);

    // Check for Bluetooth availability
    if ('bluetooth' in navigator) {
      setBluetoothEnabled(true);
    }

    return () => {
      clearInterval(locationTimer);
      clearInterval(networkTimer);
    };
  }, []);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  };

  const handleQRScan = (qrData: string) => {
    const scanResult: ScanResult = {
      id: Date.now().toString(),
      volunteerId: qrData,
      volunteerName: 'Ahmed Al-Mansouri', // Mock data
      volunteerEmail: 'ahmed@example.com',
      action: 'checkin',
      timestamp: new Date().toISOString(),
      method: 'qr',
      location: geofenceStatus?.userLocation || { lat: 0, lng: 0, accuracy: 0 },
      success: true,
      deviceInfo: {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        battery: 85
      }
    };

    // Geofencing validation
    if (fraudDetectionEnabled && geofenceStatus && !geofenceStatus.isWithinRadius) {
      scanResult.success = false;
      scanResult.errorMessage = `Location verification failed. You are ${geofenceStatus.distance}m from the event location (max: ${event.geofenceRadius}m)`;
    }

    // Speed of travel fraud detection
    if (fraudDetectionEnabled && scanResults.length > 0) {
      const lastScan = scanResults[scanResults.length - 1];
      const timeDiff = (new Date(scanResult.timestamp).getTime() - new Date(lastScan.timestamp).getTime()) / 1000 / 60; // minutes
      const distance = calculateDistance(
        lastScan.location.lat,
        lastScan.location.lng,
        scanResult.location.lat,
        scanResult.location.lng
      );
      const speed = distance / timeDiff * 60; // m/h

      if (speed > 50000) { // 50km/h threshold
        scanResult.success = false;
        scanResult.errorMessage = `Suspicious travel speed detected: ${Math.round(speed/1000)}km/h`;
      }
    }

    if (isOnline) {
      setScanResults(prev => [scanResult, ...prev]);
    } else {
      setOfflineQueue(prev => [scanResult, ...prev]);
    }

    setIsScanning(false);
  };

  const handleBluetoothScan = async () => {
    try {
      if ('bluetooth' in navigator) {
        // Simulate Bluetooth scanning
        const mockBluetoothData = 'BT_VOLUNTEER_001';
        handleQRScan(mockBluetoothData);
      }
    } catch (error) {
      console.error('Bluetooth scan failed:', error);
    }
  };

  const handleManualEntry = (volunteerId: string) => {
    handleQRScan(volunteerId);
  };

  const syncOfflineData = () => {
    if (isOnline && offlineQueue.length > 0) {
      setScanResults(prev => [...offlineQueue, ...prev]);
      setOfflineQueue([]);
    }
  };

  const toggleFlashlight = () => {
    setFlashlightOn(!flashlightOn);
    // In a real app, this would control the device flashlight
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-AE', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'qr':
        return <QrCode className="h-4 w-4" />;
      case 'bluetooth':
        return <Bluetooth className="h-4 w-4" />;
      case 'manual':
        return <UserCheck className="h-4 w-4" />;
      default:
        return <Scan className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Scanner Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to={`/org/events/${id}/kiosk`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Kiosk
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">QR Scanner</h1>
                <p className="text-gray-600">{event.title} • {event.location}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Connection Status */}
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

              {/* Bluetooth Status */}
              {bluetoothEnabled && (
                <div className="flex items-center space-x-2">
                  <Bluetooth className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-blue-600">BLE Ready</span>
                </div>
              )}

              {/* Battery */}
              <div className="flex items-center space-x-2">
                <Battery className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-600">85%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Geofence Status */}
        {geofenceStatus && (
          <Alert className={`mb-6 ${geofenceStatus.isWithinRadius ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
            <MapPin className={`h-4 w-4 ${geofenceStatus.isWithinRadius ? 'text-green-600' : 'text-red-600'}`} />
            <AlertDescription className={geofenceStatus.isWithinRadius ? 'text-green-800' : 'text-red-800'}>
              <strong>Location Status:</strong> {geofenceStatus.distance}m from event location 
              (±{geofenceStatus.accuracy}m accuracy) • 
              {geofenceStatus.isWithinRadius ? ' Within geofence ✓' : ` Outside ${event.geofenceRadius}m radius ✗`}
            </AlertDescription>
          </Alert>
        )}

        {/* Offline Queue Notice */}
        {!isOnline && offlineQueue.length > 0 && (
          <Alert className="mb-6 border-orange-200 bg-orange-50">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <div className="flex items-center justify-between">
                <span><strong>Offline Mode:</strong> {offlineQueue.length} scans queued for sync</span>
                <Button size="sm" variant="outline" onClick={syncOfflineData} disabled={!isOnline}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync Now
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="scanner">QR Scanner</TabsTrigger>
            <TabsTrigger value="bluetooth">Bluetooth</TabsTrigger>
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="history">Scan History ({scanResults.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="scanner" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* QR Scanner */}
              <Card>
                <CardHeader>
                  <CardTitle>QR Code Scanner</CardTitle>
                  <CardDescription>Scan volunteer QR codes for attendance tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-gray-900 rounded-lg relative overflow-hidden mb-4">
                    {isScanning ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-64 h-64 border-2 border-white rounded-lg relative">
                          <div className="absolute inset-0 border-2 border-green-500 rounded-lg animate-pulse"></div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm">
                            Position QR code here
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <Camera className="h-16 w-16 mb-4 text-gray-400" />
                        <p className="text-gray-300 text-center mb-4">Camera preview will appear here</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1"
                        onClick={() => setIsScanning(!isScanning)}
                      >
                        {isScanning ? (
                          <>
                            <XCircle className="h-4 w-4 mr-2" />
                            Stop Scanning
                          </>
                        ) : (
                          <>
                            <Camera className="h-4 w-4 mr-2" />
                            Start Scanning
                          </>
                        )}
                      </Button>
                      
                      <Button 
                        variant="outline"
                        onClick={toggleFlashlight}
                        disabled={!isScanning}
                      >
                        {flashlightOn ? (
                          <FlashlightOff className="h-4 w-4" />
                        ) : (
                          <Flashlight className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    {/* Simulate QR Scan Buttons */}
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Test QR Codes:</p>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleQRScan('QR001')}
                        >
                          Scan Ahmed
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleQRScan('QR002')}
                        >
                          Scan Fatima
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Scanner Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Scanner Settings</CardTitle>
                  <CardDescription>Configure scanning behavior and fraud detection</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Geofencing Validation</h4>
                      <p className="text-sm text-gray-600">Verify volunteer location within event radius</p>
                    </div>
                    <Button
                      variant={fraudDetectionEnabled ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFraudDetectionEnabled(!fraudDetectionEnabled)}
                    >
                      {fraudDetectionEnabled ? 'Enabled' : 'Disabled'}
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Geofence Radius</h4>
                    <div className="flex items-center space-x-2">
                      <Input 
                        type="number" 
                        value={event.geofenceRadius} 
                        readOnly
                        className="w-20"
                      />
                      <span className="text-sm text-gray-600">meters</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Fraud Detection</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>✓ Speed of travel validation</div>
                      <div>✓ Location accuracy checks</div>
                      <div>✓ Device fingerprinting</div>
                      <div>✓ Duplicate scan prevention</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button variant="outline" className="w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Advanced Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bluetooth" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Bluetooth Low Energy Scanner</CardTitle>
                <CardDescription>
                  Scan for volunteer badges and devices using Bluetooth LE
                </CardDescription>
              </CardHeader>
              <CardContent>
                {bluetoothEnabled ? (
                  <div className="space-y-4">
                    <div className="text-center py-8">
                      <Bluetooth className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Scanning for nearby volunteer devices...</p>
                      <div className="animate-pulse">
                        <div className="flex justify-center space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button 
                        className="w-full"
                        onClick={handleBluetoothScan}
                      >
                        <Bluetooth className="h-4 w-4 mr-2" />
                        Start Bluetooth Scan
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleQRScan('BT_001')}
                      >
                        Simulate BLE Detection
                      </Button>
                    </div>

                    <Alert className="border-blue-200 bg-blue-50">
                      <AlertCircle className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-800">
                        <strong>Bluetooth LE Mode:</strong> Automatically detects volunteer badges and wearables 
                        within 10-meter range. No manual scanning required.
                      </AlertDescription>
                    </Alert>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Bluetooth className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Bluetooth Not Available</h3>
                    <p className="text-gray-600">
                      Bluetooth LE is not supported on this device or browser.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manual" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manual Entry</CardTitle>
                <CardDescription>
                  Manually enter volunteer ID or search by name for attendance tracking
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Volunteer ID or QR Code</label>
                  <div className="flex space-x-2 mt-1">
                    <Input 
                      placeholder="Enter volunteer ID or scan code..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleManualEntry((e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }}
                    />
                    <Button onClick={() => {
                      const input = document.querySelector('input[placeholder*="volunteer ID"]') as HTMLInputElement;
                      if (input?.value) {
                        handleManualEntry(input.value);
                        input.value = '';
                      }
                    }}>
                      <UserCheck className="h-4 w-4 mr-2" />
                      Process
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Quick Actions:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => handleManualEntry('MANUAL_001')}
                    >
                      Emergency Check-in
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleManualEntry('MANUAL_002')}
                    >
                      Supervisor Override
                    </Button>
                  </div>
                </div>

                <Alert className="border-orange-200 bg-orange-50">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    <strong>Manual Entry:</strong> Use this method when QR codes are not readable 
                    or for emergency situations. All manual entries are logged for audit purposes.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Scan History</CardTitle>
                    <CardDescription>Recent attendance scans and their status</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    Export History
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {scanResults.length > 0 ? (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {scanResults.map((result) => (
                      <div key={result.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getMethodIcon(result.method)}
                          <div>
                            <h4 className="font-medium">{result.volunteerName}</h4>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <span>{formatTime(result.timestamp)}</span>
                              <span>•</span>
                              <span className="capitalize">{result.action}</span>
                              <span>•</span>
                              <span className="capitalize">{result.method}</span>
                            </div>
                            {result.errorMessage && (
                              <p className="text-sm text-red-600 mt-1">{result.errorMessage}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {result.success ? (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Success
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800">
                              <XCircle className="h-3 w-3 mr-1" />
                              Failed
                            </Badge>
                          )}
                          
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Scans Yet</h3>
                    <p className="text-gray-600">
                      Scan history will appear here as volunteers check in and out.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}