import React, { useState } from 'react';
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
  ArrowLeft, Save, Plus, Trash2, MapPin, Clock, Users, Calendar,
  AlertTriangle, CheckCircle, Upload, Image, FileText, Settings,
  Copy, Eye, Globe, Shield, Star, Heart, Leaf, BookOpen, Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface EventShift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  capacity: number;
  requirements: string[];
  description: string;
}

interface EventRequirement {
  id: string;
  type: 'skill' | 'certification' | 'age' | 'experience' | 'language' | 'physical';
  title: string;
  description: string;
  required: boolean;
}

interface EventForm {
  // Basic Information
  title: string;
  description: string;
  category: string;
  tags: string[];
  
  // Schedule & Location
  startDate: string;
  endDate: string;
  timezone: string;
  location: {
    name: string;
    address: string;
    city: string;
    emirate: string;
    coordinates?: { lat: number; lng: number };
    geofenceRadius: number;
  };
  
  // Capacity & Registration
  totalCapacity: number;
  minAge: number;
  maxAge?: number;
  registrationDeadline: string;
  allowWaitlist: boolean;
  autoApprove: boolean;
  
  // Requirements & Skills
  requirements: EventRequirement[];
  skillsNeeded: string[];
  languages: string[];
  
  // Shifts & Schedule
  shifts: EventShift[];
  isMultiDay: boolean;
  
  // Media & Resources
  featuredImage?: string;
  gallery: string[];
  documents: string[];
  
  // Settings
  isPublic: boolean;
  requiresApproval: boolean;
  allowCancellation: boolean;
  sendReminders: boolean;
  certificateTemplate?: string;
  
  // Contact & Support
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  emergencyContact: string;
  emergencyPhone: string;
}

export default function OrgEventCreate() {
  const [activeTab, setActiveTab] = useState('basic');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [eventForm, setEventForm] = useState<EventForm>({
    title: '',
    description: '',
    category: '',
    tags: [],
    startDate: '',
    endDate: '',
    timezone: 'Asia/Dubai',
    location: {
      name: '',
      address: '',
      city: '',
      emirate: '',
      geofenceRadius: 150
    },
    totalCapacity: 50,
    minAge: 16,
    registrationDeadline: '',
    allowWaitlist: true,
    autoApprove: false,
    requirements: [],
    skillsNeeded: [],
    languages: ['English'],
    shifts: [],
    isMultiDay: false,
    gallery: [],
    documents: [],
    isPublic: true,
    requiresApproval: true,
    allowCancellation: true,
    sendReminders: true,
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    emergencyContact: '',
    emergencyPhone: ''
  });

  const categories = [
    { value: 'environment', label: 'Environment & Sustainability', icon: <Leaf className="h-4 w-4" /> },
    { value: 'education', label: 'Education & Youth', icon: <BookOpen className="h-4 w-4" /> },
    { value: 'healthcare', label: 'Healthcare & Wellness', icon: <Heart className="h-4 w-4" /> },
    { value: 'community', label: 'Community Development', icon: <Users className="h-4 w-4" /> },
    { value: 'culture', label: 'Arts & Culture', icon: <Star className="h-4 w-4" /> },
    { value: 'emergency', label: 'Emergency Response', icon: <Shield className="h-4 w-4" /> },
    { value: 'business', label: 'Professional Development', icon: <Briefcase className="h-4 w-4" /> }
  ];

  const emirates = [
    'Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'
  ];

  const skillOptions = [
    'First Aid', 'CPR Certified', 'Arabic Language', 'English Language', 'Event Management',
    'Photography', 'Social Media', 'Teaching', 'Cooking', 'Driving License', 'Computer Skills',
    'Public Speaking', 'Customer Service', 'Project Management', 'Leadership'
  ];

  const handleFormChange = (field: string, value: string | number | boolean | string[]) => {
    setEventForm(prev => ({
      ...prev,
      [field]: value
    }));
    setHasUnsavedChanges(true);
  };

  const handleLocationChange = (field: string, value: string | number) => {
    setEventForm(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  const addShift = () => {
    const newShift: EventShift = {
      id: Date.now().toString(),
      name: `Shift ${eventForm.shifts.length + 1}`,
      startTime: '09:00',
      endTime: '17:00',
      capacity: Math.floor(eventForm.totalCapacity / (eventForm.shifts.length + 1)),
      requirements: [],
      description: ''
    };
    
    setEventForm(prev => ({
      ...prev,
      shifts: [...prev.shifts, newShift]
    }));
    setHasUnsavedChanges(true);
  };

  const updateShift = (shiftId: string, field: string, value: string | number) => {
    setEventForm(prev => ({
      ...prev,
      shifts: prev.shifts.map(shift => 
        shift.id === shiftId ? { ...shift, [field]: value } : shift
      )
    }));
    setHasUnsavedChanges(true);
  };

  const removeShift = (shiftId: string) => {
    setEventForm(prev => ({
      ...prev,
      shifts: prev.shifts.filter(shift => shift.id !== shiftId)
    }));
    setHasUnsavedChanges(true);
  };

  const addRequirement = () => {
    const newRequirement: EventRequirement = {
      id: Date.now().toString(),
      type: 'skill',
      title: '',
      description: '',
      required: true
    };
    
    setEventForm(prev => ({
      ...prev,
      requirements: [...prev.requirements, newRequirement]
    }));
    setHasUnsavedChanges(true);
  };

  const updateRequirement = (reqId: string, field: string, value: string | boolean | EventRequirement['type']) => {
    setEventForm(prev => ({
      ...prev,
      requirements: prev.requirements.map(req => 
        req.id === reqId ? { ...req, [field]: value } : req
      )
    }));
    setHasUnsavedChanges(true);
  };

  const removeRequirement = (reqId: string) => {
    setEventForm(prev => ({
      ...prev,
      requirements: prev.requirements.filter(req => req.id !== reqId)
    }));
    setHasUnsavedChanges(true);
  };

  const handleTagsChange = (tagsString: string) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(Boolean);
    handleFormChange('tags', tags);
  };

  const handleSkillsChange = (skillsString: string) => {
    const skills = skillsString.split(',').map(skill => skill.trim()).filter(Boolean);
    handleFormChange('skillsNeeded', skills);
  };

  const handleSaveDraft = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Event saved as draft!');
    setHasUnsavedChanges(false);
    setIsSubmitting(false);
  };

  const handlePublishEvent = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert('Event published successfully!');
    setHasUnsavedChanges(false);
    setIsSubmitting(false);
  };

  const validateForm = () => {
    const errors = [];
    if (!eventForm.title) errors.push('Event title is required');
    if (!eventForm.description) errors.push('Event description is required');
    if (!eventForm.category) errors.push('Event category is required');
    if (!eventForm.startDate) errors.push('Start date is required');
    if (!eventForm.location.address) errors.push('Event location is required');
    if (!eventForm.contactEmail) errors.push('Contact email is required');
    
    return errors;
  };

  const formErrors = validateForm();
  const isFormValid = formErrors.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
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
              <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
              <p className="text-gray-600">Set up a new volunteer opportunity for your organization</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {hasUnsavedChanges && (
              <Badge variant="destructive">Unsaved Changes</Badge>
            )}
            <Button variant="outline" onClick={() => setShowPreview(true)}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button 
              variant="outline" 
              onClick={handleSaveDraft}
              disabled={isSubmitting}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button 
              onClick={handlePublishEvent}
              disabled={!isFormValid || isSubmitting}
            >
              <Globe className="h-4 w-4 mr-2" />
              Publish Event
            </Button>
          </div>
        </div>

        {/* Form Validation Errors */}
        {formErrors.length > 0 && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <div className="font-medium mb-2">Please fix the following errors:</div>
              <ul className="list-disc list-inside space-y-1">
                {formErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Event Creation Form */}
        <Card>
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="shifts">Shifts</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Basic Information Tab */}
              <TabsContent value="basic" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Basic Event Information</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Event Title *</Label>
                      <Input
                        id="title"
                        value={eventForm.title}
                        onChange={(e) => handleFormChange('title', e.target.value)}
                        placeholder="Enter a compelling event title"
                        className={!eventForm.title ? 'border-red-300' : ''}
                      />
                    </div>

                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select value={eventForm.category} onValueChange={(value) => handleFormChange('category', value)}>
                        <SelectTrigger className={!eventForm.category ? 'border-red-300' : ''}>
                          <SelectValue placeholder="Select event category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              <div className="flex items-center space-x-2">
                                {category.icon}
                                <span>{category.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="description">Event Description *</Label>
                      <Textarea
                        id="description"
                        value={eventForm.description}
                        onChange={(e) => handleFormChange('description', e.target.value)}
                        placeholder="Provide a detailed description of the event, its goals, and what volunteers will be doing"
                        rows={6}
                        className={!eventForm.description ? 'border-red-300' : ''}
                      />
                    </div>

                    <div>
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        value={eventForm.tags.join(', ')}
                        onChange={(e) => handleTagsChange(e.target.value)}
                        placeholder="environment, cleanup, beach, sustainability"
                      />
                      <p className="text-sm text-gray-600 mt-1">Separate tags with commas to help volunteers find your event</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="capacity">Total Capacity *</Label>
                        <Input
                          id="capacity"
                          type="number"
                          value={eventForm.totalCapacity}
                          onChange={(e) => handleFormChange('totalCapacity', parseInt(e.target.value))}
                          min="1"
                          max="1000"
                        />
                      </div>
                      <div>
                        <Label htmlFor="minAge">Minimum Age *</Label>
                        <Input
                          id="minAge"
                          type="number"
                          value={eventForm.minAge}
                          onChange={(e) => handleFormChange('minAge', parseInt(e.target.value))}
                          min="12"
                          max="100"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="featuredImage">Featured Image</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          Click to upload or drag and drop your event image
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Recommended: 1200x600px, JPG or PNG
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Schedule Tab */}
              <TabsContent value="schedule" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Event Schedule</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isMultiDay"
                        checked={eventForm.isMultiDay}
                        onChange={(e) => handleFormChange('isMultiDay', e.target.checked)}
                      />
                      <Label htmlFor="isMultiDay">Multi-day event</Label>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate">Start Date & Time *</Label>
                        <Input
                          id="startDate"
                          type="datetime-local"
                          value={eventForm.startDate}
                          onChange={(e) => handleFormChange('startDate', e.target.value)}
                          className={!eventForm.startDate ? 'border-red-300' : ''}
                        />
                      </div>
                      <div>
                        <Label htmlFor="endDate">End Date & Time</Label>
                        <Input
                          id="endDate"
                          type="datetime-local"
                          value={eventForm.endDate}
                          onChange={(e) => handleFormChange('endDate', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select value={eventForm.timezone} onValueChange={(value) => handleFormChange('timezone', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Asia/Dubai">Asia/Dubai (UAE)</SelectItem>
                            <SelectItem value="Asia/Riyadh">Asia/Riyadh</SelectItem>
                            <SelectItem value="UTC">UTC</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="registrationDeadline">Registration Deadline</Label>
                        <Input
                          id="registrationDeadline"
                          type="datetime-local"
                          value={eventForm.registrationDeadline}
                          onChange={(e) => handleFormChange('registrationDeadline', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="allowWaitlist"
                          checked={eventForm.allowWaitlist}
                          onChange={(e) => handleFormChange('allowWaitlist', e.target.checked)}
                        />
                        <Label htmlFor="allowWaitlist">Allow waitlist when event is full</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="autoApprove"
                          checked={eventForm.autoApprove}
                          onChange={(e) => handleFormChange('autoApprove', e.target.checked)}
                        />
                        <Label htmlFor="autoApprove">Auto-approve registrations</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Location Tab */}
              <TabsContent value="location" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Event Location</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="locationName">Location Name</Label>
                      <Input
                        id="locationName"
                        value={eventForm.location.name}
                        onChange={(e) => handleLocationChange('name', e.target.value)}
                        placeholder="e.g., Dubai Marina Beach, Community Center"
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Address *</Label>
                      <Textarea
                        id="address"
                        value={eventForm.location.address}
                        onChange={(e) => handleLocationChange('address', e.target.value)}
                        placeholder="Enter the full address where volunteers should meet"
                        rows={3}
                        className={!eventForm.location.address ? 'border-red-300' : ''}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={eventForm.location.city}
                          onChange={(e) => handleLocationChange('city', e.target.value)}
                          placeholder="e.g., Dubai, Abu Dhabi"
                        />
                      </div>
                      <div>
                        <Label htmlFor="emirate">Emirate</Label>
                        <Select value={eventForm.location.emirate} onValueChange={(value) => handleLocationChange('emirate', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select emirate" />
                          </SelectTrigger>
                          <SelectContent>
                            {emirates.map((emirate) => (
                              <SelectItem key={emirate} value={emirate}>{emirate}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="geofenceRadius">Geofence Radius (meters)</Label>
                      <Input
                        id="geofenceRadius"
                        type="number"
                        value={eventForm.location.geofenceRadius}
                        onChange={(e) => handleLocationChange('geofenceRadius', parseInt(e.target.value))}
                        min="50"
                        max="1000"
                      />
                      <p className="text-sm text-gray-600 mt-1">
                        Volunteers must be within this radius to check in/out
                      </p>
                    </div>

                    <div className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Map Integration</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Click to set precise coordinates on the map for better volunteer navigation
                      </p>
                      <Button variant="outline" size="sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        Set Location on Map
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Requirements Tab */}
              <TabsContent value="requirements" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Volunteer Requirements</h3>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="skillsNeeded">Skills Needed</Label>
                      <Input
                        id="skillsNeeded"
                        value={eventForm.skillsNeeded.join(', ')}
                        onChange={(e) => handleSkillsChange(e.target.value)}
                        placeholder="First Aid, Arabic Language, Event Management"
                      />
                      <p className="text-sm text-gray-600 mt-1">
                        Separate skills with commas. Available skills: {skillOptions.slice(0, 5).join(', ')}, etc.
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="languages">Languages</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {['English', 'Arabic', 'Hindi', 'Urdu', 'Filipino'].map((lang) => (
                          <label key={lang} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={eventForm.languages.includes(lang)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  handleFormChange('languages', [...eventForm.languages, lang]);
                                } else {
                                  handleFormChange('languages', eventForm.languages.filter(l => l !== lang));
                                }
                              }}
                            />
                            <span className="text-sm">{lang}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Label>Specific Requirements</Label>
                        <Button variant="outline" size="sm" onClick={addRequirement}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Requirement
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        {eventForm.requirements.map((req) => (
                          <Card key={req.id} className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1 grid md:grid-cols-2 gap-4">
                                <div>
                                  <Label>Requirement Type</Label>
                                  <Select value={req.type} onValueChange={(value: EventRequirement['type']) => updateRequirement(req.id, 'type', value)}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="skill">Skill</SelectItem>
                                      <SelectItem value="certification">Certification</SelectItem>
                                      <SelectItem value="age">Age Requirement</SelectItem>
                                      <SelectItem value="experience">Experience</SelectItem>
                                      <SelectItem value="language">Language</SelectItem>
                                      <SelectItem value="physical">Physical Requirement</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label>Title</Label>
                                  <Input
                                    value={req.title}
                                    onChange={(e) => updateRequirement(req.id, 'title', e.target.value)}
                                    placeholder="e.g., First Aid Certification"
                                  />
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeRequirement(req.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <Label>Description</Label>
                                <Textarea
                                  value={req.description}
                                  onChange={(e) => updateRequirement(req.id, 'description', e.target.value)}
                                  placeholder="Describe this requirement in detail"
                                  rows={2}
                                />
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={req.required}
                                  onChange={(e) => updateRequirement(req.id, 'required', e.target.checked)}
                                />
                                <Label>This is a mandatory requirement</Label>
                              </div>
                            </div>
                          </Card>
                        ))}
                        
                        {eventForm.requirements.length === 0 && (
                          <div className="text-center py-8 text-gray-500">
                            <Users className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                            <p>No specific requirements added yet.</p>
                            <p className="text-sm">Click "Add Requirement" to specify volunteer qualifications.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Shifts Tab */}
              <TabsContent value="shifts" className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Event Shifts</h3>
                      <p className="text-sm text-gray-600">Organize your event into shifts for better volunteer management</p>
                    </div>
                    <Button variant="outline" onClick={addShift}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Shift
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {eventForm.shifts.map((shift) => (
                      <Card key={shift.id} className="p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="grid md:grid-cols-3 gap-4 mb-4">
                              <div>
                                <Label>Shift Name</Label>
                                <Input
                                  value={shift.name}
                                  onChange={(e) => updateShift(shift.id, 'name', e.target.value)}
                                  placeholder="Morning Shift"
                                />
                              </div>
                              <div>
                                <Label>Start Time</Label>
                                <Input
                                  type="time"
                                  value={shift.startTime}
                                  onChange={(e) => updateShift(shift.id, 'startTime', e.target.value)}
                                />
                              </div>
                              <div>
                                <Label>End Time</Label>
                                <Input
                                  type="time"
                                  value={shift.endTime}
                                  onChange={(e) => updateShift(shift.id, 'endTime', e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <Label>Capacity</Label>
                                <Input
                                  type="number"
                                  value={shift.capacity}
                                  onChange={(e) => updateShift(shift.id, 'capacity', parseInt(e.target.value))}
                                  min="1"
                                />
                              </div>
                              <div>
                                <Label>Description</Label>
                                <Textarea
                                  value={shift.description}
                                  onChange={(e) => updateShift(shift.id, 'description', e.target.value)}
                                  placeholder="What will volunteers do during this shift?"
                                  rows={2}
                                />
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeShift(shift.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                    
                    {eventForm.shifts.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Clock className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                        <p>No shifts created yet.</p>
                        <p className="text-sm">Add shifts to organize your event timeline and volunteer capacity.</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Event Settings</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3">Visibility & Registration</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="isPublic"
                            checked={eventForm.isPublic}
                            onChange={(e) => handleFormChange('isPublic', e.target.checked)}
                          />
                          <Label htmlFor="isPublic">Make event public (visible to all volunteers)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="requiresApproval"
                            checked={eventForm.requiresApproval}
                            onChange={(e) => handleFormChange('requiresApproval', e.target.checked)}
                          />
                          <Label htmlFor="requiresApproval">Require manual approval for registrations</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="allowCancellation"
                            checked={eventForm.allowCancellation}
                            onChange={(e) => handleFormChange('allowCancellation', e.target.checked)}
                          />
                          <Label htmlFor="allowCancellation">Allow volunteers to cancel their registration</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="sendReminders"
                            checked={eventForm.sendReminders}
                            onChange={(e) => handleFormChange('sendReminders', e.target.checked)}
                          />
                          <Label htmlFor="sendReminders">Send automatic reminders to registered volunteers</Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Contact Information</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="contactPerson">Contact Person</Label>
                          <Input
                            id="contactPerson"
                            value={eventForm.contactPerson}
                            onChange={(e) => handleFormChange('contactPerson', e.target.value)}
                            placeholder="Event coordinator name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="contactEmail">Contact Email *</Label>
                          <Input
                            id="contactEmail"
                            type="email"
                            value={eventForm.contactEmail}
                            onChange={(e) => handleFormChange('contactEmail', e.target.value)}
                            placeholder="coordinator@organization.ae"
                            className={!eventForm.contactEmail ? 'border-red-300' : ''}
                          />
                        </div>
                        <div>
                          <Label htmlFor="contactPhone">Contact Phone</Label>
                          <Input
                            id="contactPhone"
                            type="tel"
                            value={eventForm.contactPhone}
                            onChange={(e) => handleFormChange('contactPhone', e.target.value)}
                            placeholder="+971 50 123 4567"
                          />
                        </div>
                        <div>
                          <Label htmlFor="emergencyContact">Emergency Contact</Label>
                          <Input
                            id="emergencyContact"
                            value={eventForm.emergencyContact}
                            onChange={(e) => handleFormChange('emergencyContact', e.target.value)}
                            placeholder="Emergency coordinator name"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <Label htmlFor="emergencyPhone">Emergency Phone</Label>
                        <Input
                          id="emergencyPhone"
                          type="tel"
                          value={eventForm.emergencyPhone}
                          onChange={(e) => handleFormChange('emergencyPhone', e.target.value)}
                          placeholder="+971 50 987 6543"
                        />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Additional Resources</h4>
                      <div className="space-y-4">
                        <div>
                          <Label>Event Documents</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                            <FileText className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">
                              Upload guidelines, forms, or other documents volunteers might need
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <Label>Certificate Template</Label>
                          <Select value={eventForm.certificateTemplate} onValueChange={(value) => handleFormChange('certificateTemplate', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select certificate template" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="default">Default Template</SelectItem>
                              <SelectItem value="environment">Environment Theme</SelectItem>
                              <SelectItem value="community">Community Service</SelectItem>
                              <SelectItem value="education">Education Focus</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Preview Dialog */}
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Event Preview</DialogTitle>
              <DialogDescription>
                This is how your event will appear to volunteers
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Event Header */}
              <div className="border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {eventForm.title || 'Event Title'}
                    </h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{eventForm.startDate ? new Date(eventForm.startDate).toLocaleDateString() : 'Date TBD'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{eventForm.location.city || 'Location TBD'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{eventForm.totalCapacity} volunteers needed</span>
                      </div>
                    </div>
                    {eventForm.category && (
                      <Badge variant="outline" className="mb-3">
                        {categories.find(c => c.value === eventForm.category)?.label}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="prose max-w-none">
                  <p className="text-gray-700">
                    {eventForm.description || 'Event description will appear here...'}
                  </p>
                </div>

                {eventForm.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-4">
                    {eventForm.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Event Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Event Details</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Start:</strong> {eventForm.startDate ? new Date(eventForm.startDate).toLocaleString() : 'TBD'}</div>
                    <div><strong>End:</strong> {eventForm.endDate ? new Date(eventForm.endDate).toLocaleString() : 'TBD'}</div>
                    <div><strong>Capacity:</strong> {eventForm.totalCapacity} volunteers</div>
                    <div><strong>Age Requirement:</strong> {eventForm.minAge}+ years</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Location</h3>
                  <div className="text-sm">
                    {eventForm.location.name && <div><strong>{eventForm.location.name}</strong></div>}
                    <div>{eventForm.location.address || 'Address TBD'}</div>
                    <div>{eventForm.location.city} {eventForm.location.emirate}</div>
                  </div>
                </div>
              </div>

              {eventForm.shifts.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Available Shifts</h3>
                  <div className="space-y-2">
                    {eventForm.shifts.map((shift) => (
                      <div key={shift.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <div className="font-medium">{shift.name}</div>
                          <div className="text-sm text-gray-600">{shift.startTime} - {shift.endTime}</div>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">{shift.capacity}</span> spots
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowPreview(false)}>
                  Close Preview
                </Button>
                <Button>
                  Register for Event
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}