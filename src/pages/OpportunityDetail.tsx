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
  ArrowLeft, Calendar, MapPin, Users, Clock, Star, Heart, Share2,
  CheckCircle, AlertTriangle, Info, Download, Upload, Phone, Mail,
  Globe, Shield, Award, Target, Bookmark, UserPlus, MessageCircle,
  Camera, FileText, ExternalLink, QrCode, Navigation, Wifi, WifiOff
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

interface Opportunity {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  tags: string[];
  status: 'active' | 'full' | 'cancelled' | 'completed';
  startDate: string;
  endDate: string;
  location: {
    name: string;
    address: string;
    city: string;
    emirate: string;
    coordinates: { lat: number; lng: number };
    geofenceRadius: number;
  };
  organization: {
    id: string;
    name: string;
    logo: string;
    verified: boolean;
    rating: number;
    totalEvents: number;
  };
  capacity: number;
  registered: number;
  waitlist: number;
  minAge: number;
  maxAge?: number;
  skillsNeeded: string[];
  languages: string[];
  requirements: string[];
  shifts: EventShift[];
  images: string[];
  documents: string[];
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  emergencyContact: string;
  emergencyPhone: string;
  certificateOffered: boolean;
  certificateHours: number;
  impactMetrics: {
    expectedImpact: string;
    beneficiaries: number;
    environmentalImpact?: string;
  };
  accessibility: {
    wheelchairAccessible: boolean;
    publicTransport: boolean;
    parking: boolean;
    restrooms: boolean;
  };
  whatToBring: string[];
  whatProvided: string[];
  cancellationPolicy: string;
  weatherPolicy: string;
  covidGuidelines: string;
  registrationDeadline: string;
  lastUpdated: string;
}

export default function OpportunityDetail() {
  const { id } = useParams();
  const [isRegistering, setIsRegistering] = useState(false);
  const [showRSVPDialog, setShowRSVPDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [selectedShift, setSelectedShift] = useState('');
  const [registrationNotes, setRegistrationNotes] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Mock opportunity data
  const opportunity: Opportunity = {
    id: id || '1',
    title: 'Beach Cleanup Initiative - Dubai Marina',
    description: `Join us for a comprehensive beach cleanup initiative at Dubai Marina Beach. This environmental conservation effort aims to remove plastic waste, debris, and other pollutants from our beautiful shoreline while raising awareness about marine conservation.

    Our beach cleanup is part of a larger sustainability initiative that directly contributes to the UAE's environmental goals. You'll work alongside fellow volunteers, environmental experts, and marine biologists to make a tangible difference in protecting our coastal ecosystem.

    This event is perfect for individuals, families, and corporate groups looking to make a positive environmental impact while enjoying a rewarding volunteer experience. All necessary equipment will be provided, and we'll have refreshments available throughout the event.

    By participating, you'll not only help preserve our marine environment but also gain valuable knowledge about sustainability practices and marine conservation. This is an excellent opportunity to meet like-minded individuals and contribute to a cause that benefits our entire community.`,
    shortDescription: 'Help clean Dubai Marina Beach and protect marine life while learning about environmental conservation.',
    category: 'environment',
    tags: ['environment', 'cleanup', 'beach', 'sustainability', 'marine conservation', 'outdoor'],
    status: 'active',
    startDate: '2024-04-15T08:00:00Z',
    endDate: '2024-04-15T12:00:00Z',
    location: {
      name: 'Dubai Marina Beach',
      address: 'Dubai Marina Beach, near Marina Walk, Dubai Marina, Dubai, UAE',
      city: 'Dubai',
      emirate: 'Dubai',
      coordinates: { lat: 25.0657, lng: 55.1713 },
      geofenceRadius: 150
    },
    organization: {
      id: 'org1',
      name: 'Green Initiative UAE',
      logo: '/api/placeholder/100/100',
      verified: true,
      rating: 4.8,
      totalEvents: 127
    },
    capacity: 100,
    registered: 67,
    waitlist: 8,
    minAge: 16,
    skillsNeeded: ['Environmental Awareness', 'Teamwork', 'Physical Fitness'],
    languages: ['English', 'Arabic'],
    requirements: ['Ability to walk on sand for extended periods', 'Comfortable bending and lifting'],
    shifts: [
      {
        id: '1',
        name: 'Morning Cleanup',
        startTime: '08:00',
        endTime: '10:00',
        capacity: 50,
        registered: 34,
        requirements: [],
        description: 'Main cleanup activity focusing on the central beach area'
      },
      {
        id: '2',
        name: 'Late Morning Cleanup',
        startTime: '10:00',
        endTime: '12:00',
        capacity: 50,
        registered: 33,
        requirements: [],
        description: 'Cleanup and data collection for environmental impact assessment'
      }
    ],
    images: [
      '/api/placeholder/800/400',
      '/api/placeholder/800/400',
      '/api/placeholder/800/400'
    ],
    documents: [
      'Event Guidelines.pdf',
      'Safety Instructions.pdf',
      'Environmental Impact Report.pdf'
    ],
    contactPerson: 'Sarah Al-Zahra',
    contactEmail: 'sarah@greeninitiative.ae',
    contactPhone: '+971 50 123 4567',
    emergencyContact: 'Ahmed Hassan',
    emergencyPhone: '+971 50 987 6543',
    certificateOffered: true,
    certificateHours: 4,
    impactMetrics: {
      expectedImpact: 'Remove 200+ kg of waste from 2km of coastline',
      beneficiaries: 10000,
      environmentalImpact: 'Protect marine life and improve water quality'
    },
    accessibility: {
      wheelchairAccessible: false,
      publicTransport: true,
      parking: true,
      restrooms: true
    },
    whatToBring: [
      'Comfortable walking shoes',
      'Sun hat and sunscreen',
      'Water bottle',
      'Reusable gloves (optional)'
    ],
    whatProvided: [
      'Cleanup equipment and bags',
      'Safety gloves and vests',
      'Refreshments and snacks',
      'Transportation from Marina Mall'
    ],
    cancellationPolicy: 'Free cancellation up to 24 hours before the event. Late cancellations may affect your volunteer rating.',
    weatherPolicy: 'Event will be postponed in case of heavy rain or extreme weather conditions. Participants will be notified 12 hours in advance.',
    covidGuidelines: 'Please follow current UAE health guidelines. Masks recommended in crowded areas.',
    registrationDeadline: '2024-04-14T23:59:00Z',
    lastUpdated: '2024-03-20T14:30:00Z'
  };

  const handleRSVP = async () => {
    if (!selectedShift) {
      alert('Please select a shift to continue.');
      return;
    }

    setIsRegistering(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('Registration successful! You will receive a confirmation email shortly.');
    setShowRSVPDialog(false);
    setIsRegistering(false);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this volunteer opportunity: ${opportunity.title}`;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
    };

    if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In real app, this would save to user's bookmarks
  };

  const downloadDocument = (docName: string) => {
    // Simulate document download
    alert(`Downloading ${docName}...`);
  };

  const generateQRCode = () => {
    // Simulate QR code generation
    alert('QR code generated! You can use this to quickly access event details on your mobile device.');
  };

  const addToCalendar = () => {
    // Generate ICS file
    const startDate = new Date(opportunity.startDate);
    const endDate = new Date(opportunity.endDate);
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//SwaedUAE//Event//EN
BEGIN:VEVENT
UID:${opportunity.id}@swaed.ae
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${opportunity.title}
DESCRIPTION:${opportunity.shortDescription}
LOCATION:${opportunity.location.address}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${opportunity.title.replace(/\s+/g, '_')}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = () => {
    const statusConfig = {
      active: { label: 'Active', className: 'bg-green-100 text-green-800' },
      full: { label: 'Full', className: 'bg-yellow-100 text-yellow-800' },
      cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-800' },
      completed: { label: 'Completed', className: 'bg-blue-100 text-blue-800' }
    };
    
    const config = statusConfig[opportunity.status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const availableSpots = opportunity.capacity - opportunity.registered;
  const isEventFull = availableSpots <= 0;
  const registrationOpen = new Date() < new Date(opportunity.registrationDeadline);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link to="/opportunities">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Opportunities
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleBookmark}>
              <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
              {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowShareDialog(true)}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={generateQRCode}>
              <QrCode className="h-4 w-4 mr-2" />
              QR Code
            </Button>
          </div>
        </div>

        {/* Hero Section */}
        <Card>
          <CardContent className="p-0">
            <div className="relative">
              <img 
                src={opportunity.images[activeImageIndex]} 
                alt={opportunity.title}
                className="w-full h-64 md:h-96 object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-lg" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center space-x-3 mb-2">
                  {getStatusBadge()}
                  <Badge variant="outline" className="text-white border-white">
                    {opportunity.category}
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{opportunity.title}</h1>
                <p className="text-lg opacity-90 mb-4">{opportunity.shortDescription}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(opportunity.startDate)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{opportunity.location.city}, {opportunity.location.emirate}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{opportunity.registered}/{opportunity.capacity} registered</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{opportunity.certificateHours} volunteer hours</span>
                  </div>
                </div>
              </div>
              
              {/* Image Navigation */}
              {opportunity.images.length > 1 && (
                <div className="absolute bottom-4 right-4 flex space-x-1">
                  {opportunity.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`w-2 h-2 rounded-full ${
                        index === activeImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Organization Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <img 
                    src={opportunity.organization.logo} 
                    alt={opportunity.organization.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold">{opportunity.organization.name}</h3>
                      {opportunity.organization.verified && (
                        <Badge variant="outline" className="text-blue-600 border-blue-600">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{opportunity.organization.rating}</span>
                      </div>
                      <span>{opportunity.organization.totalEvents} events organized</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Event Details */}
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {opportunity.description}
                  </p>
                </div>

                {/* Impact Metrics */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Expected Impact
                  </h4>
                  <div className="space-y-2 text-sm text-green-700">
                    <div>{opportunity.impactMetrics.expectedImpact}</div>
                    <div>Benefiting approximately {opportunity.impactMetrics.beneficiaries.toLocaleString()} people</div>
                    {opportunity.impactMetrics.environmentalImpact && (
                      <div>{opportunity.impactMetrics.environmentalImpact}</div>
                    )}
                  </div>
                </div>

                {/* Skills & Requirements */}
                <div>
                  <h4 className="font-semibold mb-3">Skills & Requirements</h4>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Skills Needed</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {opportunity.skillsNeeded.map((skill, index) => (
                          <Badge key={index} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Languages</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {opportunity.languages.map((lang, index) => (
                          <Badge key={index} variant="outline">{lang}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Requirements</Label>
                      <ul className="list-disc list-inside text-sm text-gray-600 mt-1 space-y-1">
                        {opportunity.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* What to Bring & What's Provided */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-orange-600">What to Bring</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {opportunity.whatToBring.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-green-600">What's Provided</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {opportunity.whatProvided.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shifts */}
            <Card>
              <CardHeader>
                <CardTitle>Available Shifts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {opportunity.shifts.map((shift) => (
                    <div key={shift.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{shift.name}</h4>
                        <Badge variant={shift.registered >= shift.capacity ? 'destructive' : 'secondary'}>
                          {shift.registered}/{shift.capacity} registered
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{shift.startTime} - {shift.endTime}</span>
                          </span>
                          <span>{shift.capacity - shift.registered} spots available</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{shift.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Policies */}
            <Card>
              <CardHeader>
                <CardTitle>Policies & Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Cancellation Policy</h4>
                  <p className="text-sm text-gray-600">{opportunity.cancellationPolicy}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Weather Policy</h4>
                  <p className="text-sm text-gray-600">{opportunity.weatherPolicy}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Health Guidelines</h4>
                  <p className="text-sm text-gray-600">{opportunity.covidGuidelines}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Register Now</span>
                  {opportunity.certificateOffered && (
                    <Badge variant="outline" className="text-blue-600 border-blue-600">
                      <Award className="h-3 w-3 mr-1" />
                      Certificate
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{availableSpots}</div>
                  <div className="text-sm text-gray-600">spots available</div>
                  {opportunity.waitlist > 0 && (
                    <div className="text-xs text-orange-600 mt-1">
                      {opportunity.waitlist} on waitlist
                    </div>
                  )}
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(opportunity.registered / opportunity.capacity) * 100}%` }}
                  ></div>
                </div>

                <div className="text-center text-sm text-gray-600">
                  Registration closes: {formatDate(opportunity.registrationDeadline)}
                </div>

                {registrationOpen ? (
                  <Button 
                    className="w-full" 
                    onClick={() => setShowRSVPDialog(true)}
                    disabled={isEventFull && opportunity.status !== 'active'}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    {isEventFull ? 'Join Waitlist' : 'Register Now'}
                  </Button>
                ) : (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Registration for this event has closed.
                    </AlertDescription>
                  </Alert>
                )}

                <Button variant="outline" className="w-full" onClick={addToCalendar}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Add to Calendar
                </Button>
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium">{opportunity.location.name}</h4>
                  <p className="text-sm text-gray-600">{opportunity.location.address}</p>
                </div>

                <div className="space-y-2">
                  <h5 className="font-medium text-sm">Accessibility</h5>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className={`flex items-center space-x-1 ${opportunity.accessibility.wheelchairAccessible ? 'text-green-600' : 'text-gray-400'}`}>
                      <CheckCircle className="h-3 w-3" />
                      <span>Wheelchair Access</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${opportunity.accessibility.publicTransport ? 'text-green-600' : 'text-gray-400'}`}>
                      <CheckCircle className="h-3 w-3" />
                      <span>Public Transport</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${opportunity.accessibility.parking ? 'text-green-600' : 'text-gray-400'}`}>
                      <CheckCircle className="h-3 w-3" />
                      <span>Parking</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${opportunity.accessibility.restrooms ? 'text-green-600' : 'text-gray-400'}`}>
                      <CheckCircle className="h-3 w-3" />
                      <span>Restrooms</span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full" onClick={() => setShowLocationDialog(true)}>
                  <Navigation className="h-4 w-4 mr-2" />
                  View on Map
                </Button>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm">Event Coordinator</h4>
                  <p className="text-sm text-gray-600">{opportunity.contactPerson}</p>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    {opportunity.contactEmail}
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    {opportunity.contactPhone}
                  </Button>
                </div>
                <div className="pt-2 border-t">
                  <h4 className="font-medium text-sm text-red-600">Emergency Contact</h4>
                  <p className="text-sm text-gray-600">{opportunity.emergencyContact}</p>
                  <p className="text-sm text-gray-600">{opportunity.emergencyPhone}</p>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            {opportunity.documents.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {opportunity.documents.map((doc, index) => (
                      <Button 
                        key={index}
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start"
                        onClick={() => downloadDocument(doc)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        {doc}
                        <Download className="h-4 w-4 ml-auto" />
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* RSVP Dialog */}
        <Dialog open={showRSVPDialog} onOpenChange={setShowRSVPDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Register for Event</DialogTitle>
              <DialogDescription>
                Complete your registration for {opportunity.title}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="shift">Select Shift *</Label>
                <Select value={selectedShift} onValueChange={setSelectedShift}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your preferred shift" />
                  </SelectTrigger>
                  <SelectContent>
                    {opportunity.shifts.map((shift) => (
                      <SelectItem 
                        key={shift.id} 
                        value={shift.id}
                        disabled={shift.registered >= shift.capacity}
                      >
                        {shift.name} ({shift.startTime} - {shift.endTime})
                        {shift.registered >= shift.capacity && ' - Full'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                <Input
                  id="emergencyContact"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  placeholder="Full name"
                />
              </div>

              <div>
                <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                <Input
                  id="emergencyPhone"
                  type="tel"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  placeholder="+971 50 123 4567"
                />
              </div>

              <div>
                <Label htmlFor="dietaryRestrictions">Dietary Restrictions (Optional)</Label>
                <Textarea
                  id="dietaryRestrictions"
                  value={dietaryRestrictions}
                  onChange={(e) => setDietaryRestrictions(e.target.value)}
                  placeholder="Any allergies or dietary requirements"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={registrationNotes}
                  onChange={(e) => setRegistrationNotes(e.target.value)}
                  placeholder="Any questions or special requirements"
                  rows={3}
                />
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  By registering, you agree to the event policies and guidelines. 
                  You will receive a confirmation email with check-in details.
                </AlertDescription>
              </Alert>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowRSVPDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleRSVP} disabled={isRegistering}>
                  {isRegistering ? 'Registering...' : 'Complete Registration'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Share Dialog */}
        <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share This Opportunity</DialogTitle>
              <DialogDescription>
                Help spread the word about this volunteer opportunity
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => handleShare('facebook')}>
                  Facebook
                </Button>
                <Button variant="outline" onClick={() => handleShare('twitter')}>
                  Twitter
                </Button>
                <Button variant="outline" onClick={() => handleShare('linkedin')}>
                  LinkedIn
                </Button>
                <Button variant="outline" onClick={() => handleShare('whatsapp')}>
                  WhatsApp
                </Button>
              </div>
              
              <div>
                <Label>Share Link</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Input value={window.location.href} readOnly />
                  <Button size="sm" onClick={() => navigator.clipboard.writeText(window.location.href)}>
                    Copy
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Location Dialog */}
        <Dialog open={showLocationDialog} onOpenChange={setShowLocationDialog}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Event Location</DialogTitle>
              <DialogDescription>
                {opportunity.location.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-2" />
                  <p>Interactive map would be displayed here</p>
                  <p className="text-sm">Coordinates: {opportunity.location.coordinates.lat}, {opportunity.location.coordinates.lng}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Address</h4>
                <p className="text-sm text-gray-600">{opportunity.location.address}</p>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
                <Button variant="outline" className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Venue
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}