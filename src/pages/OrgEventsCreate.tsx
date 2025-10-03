import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, Clock, MapPin, Users, Plus, Minus,
  ArrowLeft, Save, Eye, AlertCircle, CheckCircle,
  Upload, X, Copy, Settings, Shield, Globe
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface EventShift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  volunteersNeeded: number;
  description: string;
}

interface EventRequirement {
  id: string;
  title: string;
  description: string;
  mandatory: boolean;
}

interface EventForm {
  // Basic Information
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  
  // Schedule
  date: string;
  startTime: string;
  endTime: string;
  timezone: string;
  
  // Location
  location: string;
  address: string;
  city: string;
  emirate: string;
  coordinates: { lat: number; lng: number } | null;
  
  // Capacity & Requirements
  volunteersNeeded: number;
  minAge: number;
  maxAge: number;
  genderPreference: 'any' | 'male' | 'female';
  skillsRequired: string[];
  
  // Shifts
  hasShifts: boolean;
  shifts: EventShift[];
  
  // Requirements
  requirements: EventRequirement[];
  
  // Settings
  allowWaitlist: boolean;
  requireApproval: boolean;
  sendReminders: boolean;
  enableGeofencing: boolean;
  geofenceRadius: number;
  
  // Media
  images: File[];
  documents: File[];
  
  // Contact
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  
  // Publishing
  publishImmediately: boolean;
  publishDate: string;
}

export default function OrgEventsCreate() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('basic');
  const [formData, setFormData] = useState<EventForm>({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    date: '',
    startTime: '',
    endTime: '',
    timezone: 'Asia/Dubai',
    location: '',
    address: '',
    city: '',
    emirate: '',
    coordinates: null,
    volunteersNeeded: 10,
    minAge: 16,
    maxAge: 65,
    genderPreference: 'any',
    skillsRequired: [],
    hasShifts: false,
    shifts: [],
    requirements: [],
    allowWaitlist: true,
    requireApproval: false,
    sendReminders: true,
    enableGeofencing: true,
    geofenceRadius: 150,
    images: [],
    documents: [],
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    publishImmediately: false,
    publishDate: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    'Environment & Sustainability',
    'Education & Literacy',
    'Healthcare & Medical',
    'Community Development',
    'Youth & Children',
    'Senior Citizens',
    'Disability Support',
    'Animal Welfare',
    'Arts & Culture',
    'Sports & Recreation',
    'Technology & Innovation',
    'Disaster Relief',
    'Food Security',
    'Human Rights',
    'Women Empowerment',
    'Mental Health'
  ];

  const availableSkills = [
    'First Aid', 'Teaching', 'Translation', 'Photography', 'Social Media',
    'Event Planning', 'Public Speaking', 'Computer Skills', 'Driving',
    'Cooking', 'Childcare', 'Medical Training', 'Construction',
    'Gardening', 'Arts & Crafts', 'Music', 'Sports Coaching'
  ];

  const handleInputChange = (field: keyof EventForm, value: string | number | boolean | string[] | File[] | EventShift[] | EventRequirement[] | { lat: number; lng: number } | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const addShift = () => {
    const newShift: EventShift = {
      id: Date.now().toString(),
      name: `Shift ${formData.shifts.length + 1}`,
      startTime: formData.startTime || '09:00',
      endTime: formData.endTime || '17:00',
      volunteersNeeded: Math.ceil(formData.volunteersNeeded / (formData.shifts.length + 1)),
      description: ''
    };
    handleInputChange('shifts', [...formData.shifts, newShift]);
  };

  const updateShift = (shiftId: string, field: keyof EventShift, value: string | number) => {
    const updatedShifts = formData.shifts.map(shift =>
      shift.id === shiftId ? { ...shift, [field]: value } : shift
    );
    handleInputChange('shifts', updatedShifts);
  };

  const removeShift = (shiftId: string) => {
    const updatedShifts = formData.shifts.filter(shift => shift.id !== shiftId);
    handleInputChange('shifts', updatedShifts);
  };

  const addRequirement = () => {
    const newRequirement: EventRequirement = {
      id: Date.now().toString(),
      title: '',
      description: '',
      mandatory: false
    };
    handleInputChange('requirements', [...formData.requirements, newRequirement]);
  };

  const updateRequirement = (reqId: string, field: keyof EventRequirement, value: string | boolean) => {
    const updatedRequirements = formData.requirements.map(req =>
      req.id === reqId ? { ...req, [field]: value } : req
    );
    handleInputChange('requirements', updatedRequirements);
  };

  const removeRequirement = (reqId: string) => {
    const updatedRequirements = formData.requirements.filter(req => req.id !== reqId);
    handleInputChange('requirements', updatedRequirements);
  };

  const handleSkillToggle = (skill: string) => {
    const currentSkills = formData.skillsRequired;
    const newSkills = currentSkills.includes(skill)
      ? currentSkills.filter(s => s !== skill)
      : [...currentSkills, skill];
    handleInputChange('skillsRequired', newSkills);
  };

  const handleFileUpload = (field: 'images' | 'documents', files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      handleInputChange(field, [...formData[field], ...fileArray]);
    }
  };

  const removeFile = (field: 'images' | 'documents', index: number) => {
    const updatedFiles = formData[field].filter((_, i) => i !== index);
    handleInputChange(field, updatedFiles);
  };

  const validateTab = (tab: string): boolean => {
    const newErrors: Record<string, string> = {};

    switch (tab) {
      case 'basic':
        if (!formData.title.trim()) newErrors.title = 'Event title is required';
        if (!formData.description.trim()) newErrors.description = 'Event description is required';
        if (formData.description.length < 50) newErrors.description = 'Description must be at least 50 characters';
        if (!formData.category) newErrors.category = 'Category is required';
        break;

      case 'schedule':
        if (!formData.date) newErrors.date = 'Event date is required';
        if (!formData.startTime) newErrors.startTime = 'Start time is required';
        if (!formData.endTime) newErrors.endTime = 'End time is required';
        if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
          newErrors.endTime = 'End time must be after start time';
        }
        break;

      case 'location':
        if (!formData.location.trim()) newErrors.location = 'Location name is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.emirate) newErrors.emirate = 'Emirate is required';
        break;

      case 'capacity':
        if (formData.volunteersNeeded < 1) newErrors.volunteersNeeded = 'At least 1 volunteer is required';
        if (formData.minAge < 16) newErrors.minAge = 'Minimum age cannot be less than 16';
        if (formData.maxAge > 100) newErrors.maxAge = 'Maximum age cannot exceed 100';
        if (formData.minAge >= formData.maxAge) newErrors.maxAge = 'Maximum age must be greater than minimum age';
        break;

      case 'contact':
        if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required';
        if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Contact email is required';
        if (!formData.contactPhone.trim()) newErrors.contactPhone = 'Contact phone is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    const tabs = ['basic', 'schedule', 'location', 'capacity', 'shifts', 'requirements', 'settings', 'media', 'contact', 'publish'];
    const currentIndex = tabs.indexOf(currentTab);
    
    if (validateTab(currentTab) && currentIndex < tabs.length - 1) {
      setCurrentTab(tabs[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const tabs = ['basic', 'schedule', 'location', 'capacity', 'shifts', 'requirements', 'settings', 'media', 'contact', 'publish'];
    const currentIndex = tabs.indexOf(currentTab);
    
    if (currentIndex > 0) {
      setCurrentTab(tabs[currentIndex - 1]);
    }
  };

  const handleSave = async (status: 'draft' | 'published') => {
    // Validate all required tabs
    const requiredTabs = ['basic', 'schedule', 'location', 'capacity', 'contact'];
    const isValid = requiredTabs.every(tab => validateTab(tab));

    if (!isValid) {
      alert('Please complete all required fields before saving.');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const eventData = {
        ...formData,
        id: Date.now().toString(),
        status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'Current User'
      };

      console.log('Event created:', eventData);

      navigate('/org/events', {
        state: {
          message: `Event ${status === 'draft' ? 'saved as draft' : 'published'} successfully!`,
          type: 'success'
        }
      });
    } catch (error) {
      alert('Failed to save event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getTabProgress = () => {
    const tabs = ['basic', 'schedule', 'location', 'capacity', 'shifts', 'requirements', 'settings', 'media', 'contact', 'publish'];
    const currentIndex = tabs.indexOf(currentTab);
    return Math.round(((currentIndex + 1) / tabs.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
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
              <p className="text-gray-600">Set up a new volunteer opportunity</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={() => handleSave('draft')} disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button onClick={() => handleSave('published')} disabled={loading}>
              {loading ? 'Publishing...' : 'Publish Event'}
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Event Creation Progress</span>
              <span className="text-sm text-gray-600">{getTabProgress()}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getTabProgress()}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Event Creation Form */}
        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="capacity">Capacity</TabsTrigger>
            <TabsTrigger value="shifts">Shifts</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="publish">Publish</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Provide the essential details about your volunteer event
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Beach Cleanup Drive"
                  />
                  {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
                </div>

                <div>
                  <Label htmlFor="description">Event Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe the event, its purpose, and what volunteers will be doing..."
                    rows={4}
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>{formData.description.length}/50 minimum characters</span>
                    <span>{formData.description.length}/1000 characters</span>
                  </div>
                  {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-sm text-red-600 mt-1">{errors.category}</p>}
                  </div>

                  <div>
                    <Label htmlFor="priority">Priority Level</Label>
                    <Select value={formData.priority} onValueChange={(value: 'low' | 'medium' | 'high') => handleInputChange('priority', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low Priority</SelectItem>
                        <SelectItem value="medium">Medium Priority</SelectItem>
                        <SelectItem value="high">High Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Schedule</CardTitle>
                <CardDescription>
                  Set the date and time for your volunteer event
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="date">Event Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.date && <p className="text-sm text-red-600 mt-1">{errors.date}</p>}
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="startTime">Start Time *</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => handleInputChange('startTime', e.target.value)}
                    />
                    {errors.startTime && <p className="text-sm text-red-600 mt-1">{errors.startTime}</p>}
                  </div>

                  <div>
                    <Label htmlFor="endTime">End Time *</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => handleInputChange('endTime', e.target.value)}
                    />
                    {errors.endTime && <p className="text-sm text-red-600 mt-1">{errors.endTime}</p>}
                  </div>

                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={formData.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Dubai">UAE Time (GMT+4)</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Alert className="border-blue-200 bg-blue-50">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Duration:</strong> {formData.startTime && formData.endTime ? 
                      `${Math.abs(new Date(`2000-01-01T${formData.endTime}`).getTime() - new Date(`2000-01-01T${formData.startTime}`).getTime()) / (1000 * 60 * 60)} hours` : 
                      'Please set start and end times'
                    }
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="location" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Location</CardTitle>
                <CardDescription>
                  Specify where the volunteer event will take place
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="location">Location Name *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Jumeirah Beach"
                  />
                  {errors.location && <p className="text-sm text-red-600 mt-1">{errors.location}</p>}
                </div>

                <div>
                  <Label htmlFor="address">Full Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Street address, building name, landmarks"
                    rows={2}
                  />
                  {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Dubai"
                    />
                    {errors.city && <p className="text-sm text-red-600 mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <Label htmlFor="emirate">Emirate *</Label>
                    <Select value={formData.emirate} onValueChange={(value) => handleInputChange('emirate', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select emirate" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Abu Dhabi">Abu Dhabi</SelectItem>
                        <SelectItem value="Dubai">Dubai</SelectItem>
                        <SelectItem value="Sharjah">Sharjah</SelectItem>
                        <SelectItem value="Ajman">Ajman</SelectItem>
                        <SelectItem value="Umm Al Quwain">Umm Al Quwain</SelectItem>
                        <SelectItem value="Ras Al Khaimah">Ras Al Khaimah</SelectItem>
                        <SelectItem value="Fujairah">Fujairah</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.emirate && <p className="text-sm text-red-600 mt-1">{errors.emirate}</p>}
                  </div>
                </div>

                <Alert className="border-green-200 bg-green-50">
                  <MapPin className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Geofencing:</strong> We'll automatically set up a 150-meter check-in radius around this location for volunteer attendance tracking.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="capacity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Volunteer Capacity & Requirements</CardTitle>
                <CardDescription>
                  Define how many volunteers you need and any specific requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="volunteersNeeded">Number of Volunteers Needed *</Label>
                  <Input
                    id="volunteersNeeded"
                    type="number"
                    value={formData.volunteersNeeded}
                    onChange={(e) => handleInputChange('volunteersNeeded', parseInt(e.target.value) || 0)}
                    min="1"
                    max="1000"
                  />
                  {errors.volunteersNeeded && <p className="text-sm text-red-600 mt-1">{errors.volunteersNeeded}</p>}
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="minAge">Minimum Age</Label>
                    <Input
                      id="minAge"
                      type="number"
                      value={formData.minAge}
                      onChange={(e) => handleInputChange('minAge', parseInt(e.target.value) || 16)}
                      min="16"
                      max="100"
                    />
                    {errors.minAge && <p className="text-sm text-red-600 mt-1">{errors.minAge}</p>}
                  </div>

                  <div>
                    <Label htmlFor="maxAge">Maximum Age</Label>
                    <Input
                      id="maxAge"
                      type="number"
                      value={formData.maxAge}
                      onChange={(e) => handleInputChange('maxAge', parseInt(e.target.value) || 65)}
                      min="16"
                      max="100"
                    />
                    {errors.maxAge && <p className="text-sm text-red-600 mt-1">{errors.maxAge}</p>}
                  </div>

                  <div>
                    <Label htmlFor="genderPreference">Gender Preference</Label>
                    <Select value={formData.genderPreference} onValueChange={(value: 'any' | 'male' | 'female') => handleInputChange('genderPreference', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Gender</SelectItem>
                        <SelectItem value="male">Male Only</SelectItem>
                        <SelectItem value="female">Female Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Required Skills (Optional)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {availableSkills.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={skill}
                          checked={formData.skillsRequired.includes(skill)}
                          onCheckedChange={() => handleSkillToggle(skill)}
                        />
                        <Label htmlFor={skill} className="text-sm">{skill}</Label>
                      </div>
                    ))}
                  </div>
                  {formData.skillsRequired.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {formData.skillsRequired.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shifts" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Event Shifts</CardTitle>
                    <CardDescription>
                      Organize your event into multiple shifts if needed
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasShifts"
                      checked={formData.hasShifts}
                      onCheckedChange={(checked) => handleInputChange('hasShifts', checked)}
                    />
                    <Label htmlFor="hasShifts">Enable Shifts</Label>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {formData.hasShifts ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Shift Configuration</h4>
                      <Button onClick={addShift} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Shift
                      </Button>
                    </div>

                    {formData.shifts.map((shift, index) => (
                      <Card key={shift.id} className="border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h5 className="font-medium">Shift {index + 1}</h5>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeShift(shift.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label>Shift Name</Label>
                              <Input
                                value={shift.name}
                                onChange={(e) => updateShift(shift.id, 'name', e.target.value)}
                                placeholder="Morning Shift"
                              />
                            </div>

                            <div>
                              <Label>Volunteers Needed</Label>
                              <Input
                                type="number"
                                value={shift.volunteersNeeded}
                                onChange={(e) => updateShift(shift.id, 'volunteersNeeded', parseInt(e.target.value) || 0)}
                                min="1"
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

                          <div className="mt-3">
                            <Label>Shift Description</Label>
                            <Textarea
                              value={shift.description}
                              onChange={(e) => updateShift(shift.id, 'description', e.target.value)}
                              placeholder="Describe what volunteers will do during this shift..."
                              rows={2}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {formData.shifts.length === 0 && (
                      <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                        <Clock className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600">No shifts created yet</p>
                        <Button onClick={addShift} className="mt-2">
                          <Plus className="h-4 w-4 mr-2" />
                          Create First Shift
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <h4 className="font-medium text-gray-900 mb-2">Single Session Event</h4>
                    <p className="text-gray-600">
                      This event will run as a single session from {formData.startTime || 'start'} to {formData.endTime || 'end'} time.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Volunteer Requirements</CardTitle>
                    <CardDescription>
                      Add specific requirements or instructions for volunteers
                    </CardDescription>
                  </div>
                  <Button onClick={addRequirement} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Requirement
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {formData.requirements.length > 0 ? (
                  <div className="space-y-4">
                    {formData.requirements.map((requirement, index) => (
                      <Card key={requirement.id} className="border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <h5 className="font-medium">Requirement {index + 1}</h5>
                              <Checkbox
                                checked={requirement.mandatory}
                                onCheckedChange={(checked) => updateRequirement(requirement.id, 'mandatory', checked as boolean)}
                              />
                              <Label className="text-sm">Mandatory</Label>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeRequirement(requirement.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <Label>Requirement Title</Label>
                              <Input
                                value={requirement.title}
                                onChange={(e) => updateRequirement(requirement.id, 'title', e.target.value)}
                                placeholder="Bring your own water bottle"
                              />
                            </div>

                            <div>
                              <Label>Description</Label>
                              <Textarea
                                value={requirement.description}
                                onChange={(e) => updateRequirement(requirement.id, 'description', e.target.value)}
                                placeholder="Explain why this requirement is important..."
                                rows={2}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No specific requirements added</p>
                    <Button onClick={addRequirement} className="mt-2">
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Requirement
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Settings</CardTitle>
                <CardDescription>
                  Configure advanced settings for your event
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Allow Waitlist</h4>
                      <p className="text-sm text-gray-600">Let volunteers join a waitlist when event is full</p>
                    </div>
                    <Checkbox
                      checked={formData.allowWaitlist}
                      onCheckedChange={(checked) => handleInputChange('allowWaitlist', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Require Approval</h4>
                      <p className="text-sm text-gray-600">Manually approve volunteer registrations</p>
                    </div>
                    <Checkbox
                      checked={formData.requireApproval}
                      onCheckedChange={(checked) => handleInputChange('requireApproval', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Send Reminders</h4>
                      <p className="text-sm text-gray-600">Automatically send event reminders to volunteers</p>
                    </div>
                    <Checkbox
                      checked={formData.sendReminders}
                      onCheckedChange={(checked) => handleInputChange('sendReminders', checked)}
                    />
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">Enable Geofencing</h4>
                        <p className="text-sm text-gray-600">Verify volunteer attendance using location</p>
                      </div>
                      <Checkbox
                        checked={formData.enableGeofencing}
                        onCheckedChange={(checked) => handleInputChange('enableGeofencing', checked)}
                      />
                    </div>
                    {formData.enableGeofencing && (
                      <div>
                        <Label htmlFor="geofenceRadius">Check-in Radius (meters)</Label>
                        <Input
                          id="geofenceRadius"
                          type="number"
                          value={formData.geofenceRadius}
                          onChange={(e) => handleInputChange('geofenceRadius', parseInt(e.target.value) || 150)}
                          min="50"
                          max="500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Volunteers must be within this radius to check in
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Media</CardTitle>
                <CardDescription>
                  Upload images and documents for your event
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Event Images</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB each</p>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleFileUpload('images', e.target.files)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      {formData.images.map((file, index) => (
                        <div key={index} className="relative">
                          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-sm text-gray-600">{file.name}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile('images', index)}
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label>Event Documents</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload additional documents</p>
                    <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB each</p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      multiple
                      onChange={(e) => handleFileUpload('documents', e.target.files)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  {formData.documents.length > 0 && (
                    <div className="space-y-2 mt-4">
                      {formData.documents.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">{file.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile('documents', index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Provide contact details for volunteer inquiries
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="contactPerson">Contact Person *</Label>
                  <Input
                    id="contactPerson"
                    value={formData.contactPerson}
                    onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                    placeholder="Ahmed Al-Mansouri"
                  />
                  {errors.contactPerson && <p className="text-sm text-red-600 mt-1">{errors.contactPerson}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactEmail">Contact Email *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      placeholder="ahmed@organization.org"
                    />
                    {errors.contactEmail && <p className="text-sm text-red-600 mt-1">{errors.contactEmail}</p>}
                  </div>

                  <div>
                    <Label htmlFor="contactPhone">Contact Phone *</Label>
                    <Input
                      id="contactPhone"
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                      placeholder="+971 50 123 4567"
                    />
                    {errors.contactPhone && <p className="text-sm text-red-600 mt-1">{errors.contactPhone}</p>}
                  </div>
                </div>

                <Alert className="border-blue-200 bg-blue-50">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    This contact information will be visible to volunteers who register for your event.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="publish" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publish Event</CardTitle>
                <CardDescription>
                  Review and publish your volunteer event
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Publish Immediately</h4>
                      <p className="text-sm text-gray-600">Make the event visible to volunteers right away</p>
                    </div>
                    <Checkbox
                      checked={formData.publishImmediately}
                      onCheckedChange={(checked) => handleInputChange('publishImmediately', checked)}
                    />
                  </div>

                  {!formData.publishImmediately && (
                    <div>
                      <Label htmlFor="publishDate">Scheduled Publish Date</Label>
                      <Input
                        id="publishDate"
                        type="datetime-local"
                        value={formData.publishDate}
                        onChange={(e) => handleInputChange('publishDate', e.target.value)}
                        min={new Date().toISOString().slice(0, 16)}
                      />
                    </div>
                  )}
                </div>

                <div className="p-4 border rounded-lg bg-gray-50">
                  <h4 className="font-medium mb-3">Event Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Title:</span>
                      <span className="font-medium">{formData.title || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{formData.date || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">
                        {formData.startTime && formData.endTime 
                          ? `${formData.startTime} - ${formData.endTime}` 
                          : 'Not set'
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{formData.location || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Volunteers:</span>
                      <span className="font-medium">{formData.volunteersNeeded}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{formData.category || 'Not set'}</span>
                    </div>
                  </div>
                </div>

                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Ready to publish!</strong> Your event meets all requirements and can be published.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation Buttons */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentTab === 'basic'}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={() => handleSave('draft')} disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                
                {currentTab === 'publish' ? (
                  <Button onClick={() => handleSave('published')} disabled={loading}>
                    {loading ? 'Publishing...' : 'Publish Event'}
                  </Button>
                ) : (
                  <Button onClick={handleNext}>
                    Next
                    <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}