import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowLeft, Users, Award, Search, Filter, Download,
  CheckCircle, AlertCircle, Calendar, Clock, FileText,
  Send, Eye, MoreHorizontal, Star, Upload
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface VolunteerForCertificate {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  eventTitle: string;
  eventId: string;
  eventDate: string;
  hoursCompleted: number;
  status: 'eligible' | 'issued' | 'pending' | 'ineligible';
  lastCertificateDate?: string;
  totalCertificates: number;
  skills: string[];
  achievements: string[];
  rating?: number;
}

interface CertificateTemplate {
  id: string;
  name: string;
  category: string;
  preview: string;
  usageCount: number;
  isActive: boolean;
}

export default function OrgCertificateIssue() {
  const [selectedTab, setSelectedTab] = useState('volunteers');
  const [searchTerm, setSearchTerm] = useState('');
  const [eventFilter, setEventFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('eligible');
  const [selectedVolunteers, setSelectedVolunteers] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [issuanceSettings, setIssuanceSettings] = useState({
    sendEmail: true,
    sendSMS: false,
    addToPortfolio: true,
    generateSerial: true,
    includeQR: true,
    language: 'en'
  });

  // Mock data
  const volunteers: VolunteerForCertificate[] = [
    {
      id: '1',
      name: 'Ahmed Al-Mansouri',
      email: 'ahmed@example.com',
      phone: '+971 50 111 1111',
      avatar: '/api/placeholder/40/40',
      eventTitle: 'Beach Cleanup Drive',
      eventId: 'event-1',
      eventDate: '2024-03-25',
      hoursCompleted: 4,
      status: 'eligible',
      totalCertificates: 12,
      skills: ['Environmental Conservation', 'Leadership'],
      achievements: ['Beach Cleanup Champion', 'Eco Warrior'],
      rating: 5
    },
    {
      id: '2',
      name: 'Fatima Hassan',
      email: 'fatima@example.com',
      phone: '+971 50 222 2222',
      eventTitle: 'Food Distribution',
      eventId: 'event-2',
      eventDate: '2024-03-24',
      hoursCompleted: 3,
      status: 'eligible',
      totalCertificates: 8,
      skills: ['Community Service', 'First Aid'],
      achievements: ['Hunger Relief Supporter'],
      rating: 4
    },
    {
      id: '3',
      name: 'Mohammed Ali',
      email: 'mohammed@example.com',
      phone: '+971 50 333 3333',
      eventTitle: 'Tree Planting Initiative',
      eventId: 'event-3',
      eventDate: '2024-03-23',
      hoursCompleted: 5,
      status: 'issued',
      lastCertificateDate: '2024-03-24',
      totalCertificates: 3,
      skills: ['Gardening', 'Environmental Conservation'],
      achievements: ['Green Warrior', 'Tree Planting Expert']
    },
    {
      id: '4',
      name: 'Sarah Ahmed',
      email: 'sarah@example.com',
      phone: '+971 50 444 4444',
      eventTitle: 'Senior Care Visit',
      eventId: 'event-4',
      eventDate: '2024-03-22',
      hoursCompleted: 3,
      status: 'eligible',
      totalCertificates: 15,
      skills: ['Elder Care', 'Communication'],
      achievements: ['Senior Care Champion', 'Compassionate Volunteer'],
      rating: 5
    },
    {
      id: '5',
      name: 'Omar Hassan',
      email: 'omar@example.com',
      phone: '+971 50 555 5555',
      eventTitle: 'Youth Mentoring',
      eventId: 'event-5',
      eventDate: '2024-03-21',
      hoursCompleted: 2,
      status: 'ineligible',
      totalCertificates: 1,
      skills: ['Mentoring', 'Youth Development'],
      achievements: []
    }
  ];

  const templates: CertificateTemplate[] = [
    {
      id: '1',
      name: 'Environmental Impact Certificate',
      category: 'Environment',
      preview: '/api/placeholder/300/200',
      usageCount: 45,
      isActive: true
    },
    {
      id: '2',
      name: 'Community Service Certificate',
      category: 'Community',
      preview: '/api/placeholder/300/200',
      usageCount: 78,
      isActive: true
    },
    {
      id: '3',
      name: 'Youth Development Certificate',
      category: 'Education',
      preview: '/api/placeholder/300/200',
      usageCount: 23,
      isActive: true
    }
  ];

  const events = [
    { id: 'event-1', title: 'Beach Cleanup Drive' },
    { id: 'event-2', title: 'Food Distribution' },
    { id: 'event-3', title: 'Tree Planting Initiative' },
    { id: 'event-4', title: 'Senior Care Visit' },
    { id: 'event-5', title: 'Youth Mentoring' }
  ];

  const filteredVolunteers = volunteers.filter(volunteer => {
    const matchesSearch = volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         volunteer.eventTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEvent = eventFilter === 'all' || volunteer.eventId === eventFilter;
    const matchesStatus = statusFilter === 'all' || volunteer.status === statusFilter;
    
    return matchesSearch && matchesEvent && matchesStatus;
  });

  const getStatusBadge = (status: VolunteerForCertificate['status']) => {
    const statusConfig = {
      eligible: { label: 'Eligible', className: 'bg-green-100 text-green-800' },
      issued: { label: 'Already Issued', className: 'bg-blue-100 text-blue-800' },
      pending: { label: 'Pending Review', className: 'bg-yellow-100 text-yellow-800' },
      ineligible: { label: 'Ineligible', className: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const handleVolunteerToggle = (volunteerId: string) => {
    setSelectedVolunteers(prev => 
      prev.includes(volunteerId)
        ? prev.filter(id => id !== volunteerId)
        : [...prev, volunteerId]
    );
  };

  const handleSelectAll = () => {
    const eligibleVolunteers = filteredVolunteers
      .filter(v => v.status === 'eligible')
      .map(v => v.id);
    
    if (selectedVolunteers.length === eligibleVolunteers.length) {
      setSelectedVolunteers([]);
    } else {
      setSelectedVolunteers(eligibleVolunteers);
    }
  };

  const handleIssueCertificates = () => {
    if (selectedVolunteers.length === 0) {
      alert('Please select volunteers to issue certificates.');
      return;
    }

    if (!selectedTemplate) {
      alert('Please select a certificate template.');
      return;
    }

    // Simulate certificate issuance
    const issuedCount = selectedVolunteers.length;
    alert(`${issuedCount} certificates issued successfully!`);
    
    // Reset selections
    setSelectedVolunteers([]);
    setSelectedTemplate('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const stats = {
    eligible: volunteers.filter(v => v.status === 'eligible').length,
    issued: volunteers.filter(v => v.status === 'issued').length,
    pending: volunteers.filter(v => v.status === 'pending').length,
    ineligible: volunteers.filter(v => v.status === 'ineligible').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/org/certificates">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Certificates
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Issue Certificates</h1>
              <p className="text-gray-600">Bulk issue certificates to eligible volunteers</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {selectedVolunteers.length > 0 && (
              <Button onClick={handleIssueCertificates} className="bg-green-600 hover:bg-green-700">
                <Award className="h-4 w-4 mr-2" />
                Issue {selectedVolunteers.length} Certificates
              </Button>
            )}
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import List
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.eligible}</div>
              <div className="text-sm text-gray-600">Eligible</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.issued}</div>
              <div className="text-sm text-gray-600">Already Issued</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
              <div className="text-sm text-gray-600">Pending Review</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.ineligible}</div>
              <div className="text-sm text-gray-600">Ineligible</div>
            </CardContent>
          </Card>
        </div>

        {/* Certificate Issuance Interface */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="volunteers">Select Volunteers</TabsTrigger>
            <TabsTrigger value="template">Choose Template</TabsTrigger>
            <TabsTrigger value="settings">Issuance Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="volunteers" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex-1 min-w-64">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search volunteers or events..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <Select value={eventFilter} onValueChange={setEventFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by event" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Events</SelectItem>
                      {events.map((event) => (
                        <SelectItem key={event.id} value={event.id}>
                          {event.title}
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
                      <SelectItem value="eligible">Eligible</SelectItem>
                      <SelectItem value="issued">Issued</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="ineligible">Ineligible</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" onClick={handleSelectAll}>
                    {selectedVolunteers.length === filteredVolunteers.filter(v => v.status === 'eligible').length 
                      ? 'Deselect All' 
                      : 'Select All Eligible'
                    }
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Selection Summary */}
            {selectedVolunteers.length > 0 && (
              <Alert className="border-blue-200 bg-blue-50">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>{selectedVolunteers.length} volunteers selected</strong> for certificate issuance.
                  Proceed to template selection to continue.
                </AlertDescription>
              </Alert>
            )}

            {/* Volunteers List */}
            <div className="space-y-4">
              {filteredVolunteers.length > 0 ? (
                filteredVolunteers.map((volunteer) => (
                  <Card key={volunteer.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <Checkbox
                            checked={selectedVolunteers.includes(volunteer.id)}
                            onCheckedChange={() => handleVolunteerToggle(volunteer.id)}
                            disabled={volunteer.status !== 'eligible'}
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
                              {volunteer.rating && (
                                <div className="flex items-center space-x-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm text-gray-600">{volunteer.rating}</span>
                                </div>
                              )}
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <FileText className="h-4 w-4" />
                                  <span><strong>Event:</strong> {volunteer.eventTitle}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Calendar className="h-4 w-4" />
                                  <span><strong>Date:</strong> {formatDate(volunteer.eventDate)}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Clock className="h-4 w-4" />
                                  <span><strong>Hours:</strong> {volunteer.hoursCompleted}</span>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <Award className="h-4 w-4" />
                                  <span><strong>Total Certificates:</strong> {volunteer.totalCertificates}</span>
                                </div>
                                {volunteer.lastCertificateDate && (
                                  <div className="flex items-center space-x-2">
                                    <Calendar className="h-4 w-4" />
                                    <span><strong>Last Certificate:</strong> {formatDate(volunteer.lastCertificateDate)}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Skills */}
                            {volunteer.skills.length > 0 && (
                              <div className="mb-2">
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

                            {/* Achievements */}
                            {volunteer.achievements.length > 0 && (
                              <div>
                                <span className="text-sm font-medium text-gray-700 mr-2">Achievements:</span>
                                <div className="inline-flex flex-wrap gap-1">
                                  {volunteer.achievements.map((achievement, index) => (
                                    <Badge key={index} variant="outline" className="text-xs text-yellow-700 border-yellow-300">
                                      <Star className="h-3 w-3 mr-1" />
                                      {achievement}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2 ml-4">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
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
                      {searchTerm || eventFilter !== 'all' || statusFilter !== 'all'
                        ? 'Try adjusting your search or filters.'
                        : 'No eligible volunteers for certificate issuance.'
                      }
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="template" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Certificate Template</CardTitle>
                <CardDescription>
                  Choose a template for the certificates you want to issue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.map((template) => (
                    <Card 
                      key={template.id} 
                      className={`cursor-pointer transition-all ${
                        selectedTemplate === template.id 
                          ? 'ring-2 ring-blue-500 bg-blue-50' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <CardContent className="p-4">
                        <div className="aspect-[3/2] bg-gray-100 rounded-lg mb-4 overflow-hidden">
                          <img 
                            src={template.preview} 
                            alt={template.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="font-semibold">{template.name}</h3>
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>{template.category}</span>
                            <span>Used {template.usageCount} times</span>
                          </div>
                          
                          {selectedTemplate === template.id && (
                            <div className="flex items-center space-x-2 text-blue-600">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-sm font-medium">Selected</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {selectedTemplate && (
                  <Alert className="mt-6 border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      <strong>Template selected:</strong> {templates.find(t => t.id === selectedTemplate)?.name}
                      <br />
                      This template will be used for all {selectedVolunteers.length} selected certificates.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Settings</CardTitle>
                  <CardDescription>Configure how certificates are delivered to volunteers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="sendEmail"
                      checked={issuanceSettings.sendEmail}
                      onCheckedChange={(checked) => 
                        setIssuanceSettings(prev => ({ ...prev, sendEmail: checked as boolean }))
                      }
                    />
                    <Label htmlFor="sendEmail">Send via Email</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="sendSMS"
                      checked={issuanceSettings.sendSMS}
                      onCheckedChange={(checked) => 
                        setIssuanceSettings(prev => ({ ...prev, sendSMS: checked as boolean }))
                      }
                    />
                    <Label htmlFor="sendSMS">Send SMS Notification</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="addToPortfolio"
                      checked={issuanceSettings.addToPortfolio}
                      onCheckedChange={(checked) => 
                        setIssuanceSettings(prev => ({ ...prev, addToPortfolio: checked as boolean }))
                      }
                    />
                    <Label htmlFor="addToPortfolio">Add to Volunteer Portfolio</Label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Certificate Settings</CardTitle>
                  <CardDescription>Configure certificate features and security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="generateSerial"
                      checked={issuanceSettings.generateSerial}
                      onCheckedChange={(checked) => 
                        setIssuanceSettings(prev => ({ ...prev, generateSerial: checked as boolean }))
                      }
                    />
                    <Label htmlFor="generateSerial">Generate Serial Numbers</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="includeQR"
                      checked={issuanceSettings.includeQR}
                      onCheckedChange={(checked) => 
                        setIssuanceSettings(prev => ({ ...prev, includeQR: checked as boolean }))
                      }
                    />
                    <Label htmlFor="includeQR">Include QR Code for Verification</Label>
                  </div>

                  <div>
                    <Label htmlFor="language">Certificate Language</Label>
                    <Select 
                      value={issuanceSettings.language} 
                      onValueChange={(value) => 
                        setIssuanceSettings(prev => ({ ...prev, language: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ar">Arabic</SelectItem>
                        <SelectItem value="both">Bilingual (EN/AR)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Issuance Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Issuance Summary</CardTitle>
                <CardDescription>Review your certificate issuance configuration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Recipients</h4>
                    <div className="text-2xl font-bold text-blue-600">{selectedVolunteers.length}</div>
                    <div className="text-sm text-gray-600">volunteers selected</div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Template</h4>
                    <div className="text-sm">
                      {selectedTemplate 
                        ? templates.find(t => t.id === selectedTemplate)?.name 
                        : 'No template selected'
                      }
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Delivery</h4>
                    <div className="text-sm space-y-1">
                      {issuanceSettings.sendEmail && <div>✓ Email delivery</div>}
                      {issuanceSettings.sendSMS && <div>✓ SMS notification</div>}
                      {issuanceSettings.addToPortfolio && <div>✓ Portfolio integration</div>}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <Button 
                    onClick={handleIssueCertificates}
                    disabled={selectedVolunteers.length === 0 || !selectedTemplate}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Issue {selectedVolunteers.length} Certificates
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}