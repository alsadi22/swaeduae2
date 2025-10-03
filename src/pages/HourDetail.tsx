import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  Clock, Calendar, MapPin, ArrowLeft, CheckCircle, XCircle, 
  AlertCircle, FileText, Edit, MessageSquare, MapPin as LocationIcon,
  Camera, Smartphone, Wifi, Download
} from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';

interface AttendanceEvidence {
  type: string;
  timestamp: string;
  description: string;
}

interface CorrectionHistory {
  id: number;
  requestedDate: string;
  reason: string;
  requestedBy: string;
  status: string;
  resolution?: string;
  resolvedBy?: string;
  resolvedDate?: string;
}

interface HourEntry {
  id: number;
  eventId: number;
  eventTitle: string;
  organization: string;
  organizationLogo: string;
  organizationContact: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  status: string;
  location: string;
  coordinates: { lat: number; lng: number };
  checkInTime: string;
  checkOutTime: string;
  actualDuration: number;
  notes: string;
  approvedBy?: string;
  approvedDate?: string;
  approvedNotes?: string;
  category: string;
  skills: string[];
  checkInMethod: string;
  checkOutMethod: string;
  deviceInfo: string;
  locationAccuracy: string;
  geofenceStatus: string;
  attendanceEvidence: AttendanceEvidence[];
  correctionHistory?: CorrectionHistory[];
}

export default function HourDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hourEntry, setHourEntry] = useState<HourEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCorrectionForm, setShowCorrectionForm] = useState(false);
  const [correctionNote, setCorrectionNote] = useState('');
  const [submittingCorrection, setSubmittingCorrection] = useState(false);

  // Mock data - in real app, this would come from API
  const mockHourEntry: HourEntry = {
    id: parseInt(id || '1'),
    eventId: 1,
    eventTitle: 'Beach Cleanup Drive - Dubai Marina',
    organization: 'Emirates Environmental Group',
    organizationLogo: '/api/placeholder/60/60',
    organizationContact: 'sarah.almansouri@eeg.ae',
    date: '2024-03-15',
    startTime: '08:00',
    endTime: '12:00',
    duration: 4,
    status: 'approved',
    location: 'Dubai Marina Beach, Dubai',
    coordinates: { lat: 25.0657, lng: 55.1413 },
    checkInTime: '08:05',
    checkOutTime: '11:58',
    actualDuration: 3.88,
    notes: 'Excellent participation in coastal conservation efforts. Helped collect over 50kg of waste.',
    approvedBy: 'Sarah Al-Mansouri',
    approvedDate: '2024-03-16',
    approvedNotes: 'Outstanding dedication to environmental protection. Thank you for your commitment!',
    category: 'Environment',
    skills: ['Teamwork', 'Environmental Awareness', 'Physical Activity'],
    
    // Attendance tracking details
    checkInMethod: 'QR Code Scan',
    checkOutMethod: 'QR Code Scan',
    deviceInfo: 'iPhone 14 Pro - iOS 17.2',
    locationAccuracy: '5 meters',
    geofenceStatus: 'Within bounds',
    attendanceEvidence: [
      {
        type: 'location',
        timestamp: '08:05',
        description: 'Check-in location verified within event geofence'
      },
      {
        type: 'photo',
        timestamp: '10:30',
        description: 'Activity photo submitted during event'
      },
      {
        type: 'location',
        timestamp: '11:58',
        description: 'Check-out location verified within event geofence'
      }
    ],
    
    // Correction history
    correctionHistory: [
      {
        id: 1,
        requestedDate: '2024-03-15',
        reason: 'Check-out time discrepancy',
        requestedBy: 'Ahmed Hassan (Volunteer)',
        status: 'resolved',
        resolution: 'Time adjusted to reflect actual departure',
        resolvedBy: 'Sarah Al-Mansouri',
        resolvedDate: '2024-03-16'
      }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setHourEntry(mockHourEntry);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleSubmitCorrection = async () => {
    if (!correctionNote.trim()) return;
    
    setSubmittingCorrection(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Correction request submitted successfully! The organization will review your request.');
    setShowCorrectionForm(false);
    setCorrectionNote('');
    setSubmittingCorrection(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2024-01-01T${timeString}`).toLocaleTimeString('en-AE', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200"><AlertCircle className="h-3 w-3 mr-1" />Pending Review</Badge>;
      case 'correction_requested':
        return <Badge className="bg-red-100 text-red-800 border-red-200"><XCircle className="h-3 w-3 mr-1" />Correction Needed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const downloadCertificate = () => {
    alert('Downloading hour verification certificate...');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading hour details...</p>
        </div>
      </div>
    );
  }

  if (!hourEntry) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="py-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Hour Entry Not Found</h2>
            <p className="text-gray-600 mb-4">The hour entry you're looking for doesn't exist.</p>
            <Link to="/hours">
              <Button>Back to Hours</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/hours">
              <Button variant="ghost" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Hours</span>
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={downloadCertificate}>
                <Download className="h-4 w-4 mr-2" />
                Download Certificate
              </Button>
              {hourEntry.status === 'approved' && (
                <Button 
                  variant="outline" 
                  onClick={() => setShowCorrectionForm(true)}
                  disabled={showCorrectionForm}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Request Correction
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={hourEntry.organizationLogo} alt={hourEntry.organization} />
                      <AvatarFallback>{hourEntry.organization.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-1">{hourEntry.eventTitle}</h1>
                      <p className="text-lg text-gray-600 mb-2">{hourEntry.organization}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(hourEntry.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{hourEntry.duration} hours</span>
                        </div>
                        <Badge variant="outline">{hourEntry.category}</Badge>
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(hourEntry.status)}
                </div>

                {hourEntry.status === 'approved' && hourEntry.approvedNotes && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      <strong>Approved by {hourEntry.approvedBy}:</strong> {hourEntry.approvedNotes}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Time & Location Details */}
            <Card>
              <CardHeader>
                <CardTitle>Time & Location Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Scheduled Time</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Start Time:</span>
                        <span className="font-medium">{formatTime(hourEntry.startTime)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">End Time:</span>
                        <span className="font-medium">{formatTime(hourEntry.endTime)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Scheduled Duration:</span>
                        <span className="font-medium">{hourEntry.duration} hours</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Actual Attendance</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-in:</span>
                        <span className="font-medium text-green-600">{formatTime(hourEntry.checkInTime)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-out:</span>
                        <span className="font-medium text-green-600">{formatTime(hourEntry.checkOutTime)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Actual Duration:</span>
                        <span className="font-medium">{hourEntry.actualDuration} hours</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Location Information</h4>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium">{hourEntry.location}</p>
                      <p className="text-sm text-gray-600">
                        GPS Coordinates: {hourEntry.coordinates.lat}, {hourEntry.coordinates.lng}
                      </p>
                      <p className="text-sm text-gray-600">
                        Location Accuracy: {hourEntry.locationAccuracy} • {hourEntry.geofenceStatus}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attendance Evidence */}
            <Card>
              <CardHeader>
                <CardTitle>Attendance Evidence</CardTitle>
                <CardDescription>
                  Automated tracking and verification details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Check-in Method</h4>
                    <div className="flex items-center space-x-2">
                      <Camera className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{hourEntry.checkInMethod}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Check-out Method</h4>
                    <div className="flex items-center space-x-2">
                      <Camera className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{hourEntry.checkOutMethod}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Device Information</h4>
                    <div className="flex items-center space-x-2">
                      <Smartphone className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{hourEntry.deviceInfo}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Connection Status</h4>
                    <div className="flex items-center space-x-2">
                      <Wifi className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Online verification</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Verification Timeline</h4>
                  <div className="space-y-3">
                    {hourEntry.attendanceEvidence.map((evidence: AttendanceEvidence, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{evidence.timestamp}</span>
                            <Badge variant="outline" className="text-xs">
                              {evidence.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{evidence.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Correction Request Form */}
            {showCorrectionForm && (
              <Card className="border-yellow-200 bg-yellow-50">
                <CardHeader>
                  <CardTitle className="text-yellow-800">Request Hour Correction</CardTitle>
                  <CardDescription className="text-yellow-700">
                    Explain what needs to be corrected and provide any supporting evidence.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-yellow-800 mb-2">
                      Correction Details *
                    </label>
                    <Textarea
                      value={correctionNote}
                      onChange={(e) => setCorrectionNote(e.target.value)}
                      placeholder="Please describe what needs to be corrected (e.g., incorrect check-in/out time, duration discrepancy, location error, etc.) and provide any relevant details..."
                      rows={4}
                      className="border-yellow-300 focus:border-yellow-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Button 
                      variant="ghost" 
                      onClick={() => setShowCorrectionForm(false)}
                      className="text-yellow-700 hover:text-yellow-800"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSubmitCorrection}
                      disabled={!correctionNote.trim() || submittingCorrection}
                      className="bg-yellow-600 hover:bg-yellow-700"
                    >
                      {submittingCorrection ? 'Submitting...' : 'Submit Correction Request'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Correction History */}
            {hourEntry.correctionHistory && hourEntry.correctionHistory.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Correction History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {hourEntry.correctionHistory.map((correction: CorrectionHistory) => (
                      <div key={correction.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Correction Request #{correction.id}</h4>
                          <Badge variant={correction.status === 'resolved' ? 'default' : 'secondary'}>
                            {correction.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Reason:</strong> {correction.reason}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Requested by:</strong> {correction.requestedBy} on {formatDate(correction.requestedDate)}
                        </p>
                        {correction.status === 'resolved' && (
                          <>
                            <p className="text-sm text-gray-600 mb-1">
                              <strong>Resolution:</strong> {correction.resolution}
                            </p>
                            <p className="text-sm text-gray-600">
                              <strong>Resolved by:</strong> {correction.resolvedBy} on {formatDate(correction.resolvedDate!)}
                            </p>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Hour Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Status</span>
                  {getStatusBadge(hourEntry.status)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Duration</span>
                  <span className="font-medium">{hourEntry.duration} hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Category</span>
                  <Badge variant="outline">{hourEntry.category}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Date</span>
                  <span className="font-medium">{formatDate(hourEntry.date)}</span>
                </div>
                {hourEntry.status === 'approved' && hourEntry.approvedDate && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Approved</span>
                    <span className="font-medium text-green-600">{formatDate(hourEntry.approvedDate)}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Skills Gained */}
            <Card>
              <CardHeader>
                <CardTitle>Skills Demonstrated</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {hourEntry.skills.map((skill: string) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Organization Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Organization Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={hourEntry.organizationLogo} alt={hourEntry.organization} />
                    <AvatarFallback>{hourEntry.organization.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{hourEntry.organization}</h4>
                    <p className="text-sm text-gray-600">{hourEntry.organizationContact}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Organization
                </Button>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full" onClick={downloadCertificate}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Certificate
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  View Event Details
                </Button>
                <Link to="/opportunities">
                  <Button variant="outline" size="sm" className="w-full">
                    Find Similar Events
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}