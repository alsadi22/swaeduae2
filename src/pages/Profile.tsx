import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, Mail, Phone, MapPin, Calendar, Camera, 
  Save, Edit, Shield, Bell, Settings, Key,
  CheckCircle, AlertCircle, Upload, X
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  emiratesId: string;
  address: string;
  city: string;
  emirate: string;
  postalCode: string;
  avatar: string;
  bio: string;
  interests: string[];
  skills: string[];
  languages: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
    email: string;
  };
  preferences: {
    language: string;
    timezone: string;
    emailNotifications: boolean;
    smsNotifications: boolean;
  };
  verification: {
    emailVerified: boolean;
    phoneVerified: boolean;
    emiratesIdVerified: boolean;
  };
  stats: {
    totalHours: number;
    totalEvents: number;
    certificates: number;
    joinDate: string;
  };
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile>({
    id: 1,
    firstName: 'Ahmed',
    lastName: 'Al-Mansouri',
    email: 'ahmed.almansouri@email.com',
    phone: '+971 50 123 4567',
    dateOfBirth: '1995-03-15',
    gender: 'male',
    nationality: 'UAE',
    emiratesId: '784-1995-1234567-1',
    address: 'Al Wasl Road, Villa 123',
    city: 'Dubai',
    emirate: 'Dubai',
    postalCode: '12345',
    avatar: '/api/placeholder/120/120',
    bio: 'Passionate volunteer dedicated to environmental conservation and community service. I believe in making a positive impact through collective action.',
    interests: ['Environment', 'Education', 'Community Service', 'Youth Development'],
    skills: ['Project Management', 'Leadership', 'Communication', 'Problem Solving'],
    languages: ['Arabic', 'English', 'French'],
    emergencyContact: {
      name: 'Fatima Al-Mansouri',
      relationship: 'Sister',
      phone: '+971 50 987 6543',
      email: 'fatima.almansouri@email.com'
    },
    preferences: {
      language: 'en',
      timezone: 'Asia/Dubai',
      emailNotifications: true,
      smsNotifications: false
    },
    verification: {
      emailVerified: true,
      phoneVerified: true,
      emiratesIdVerified: false
    },
    stats: {
      totalHours: 127,
      totalEvents: 15,
      certificates: 5,
      joinDate: '2023-01-15'
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('personal');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEmergencyContactChange = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [field]: value
      }
    }));
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    setAvatarFile(file);

    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setProfile(prev => ({
      ...prev,
      avatar: previewUrl
    }));
    
    setUploadingAvatar(false);
  };

  const handleSave = async () => {
    setSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsEditing(false);
    setSaving(false);
    alert('Profile updated successfully!');
  };

  const handleVerifyEmiratesId = () => {
    alert('Emirates ID verification process initiated. You will receive an SMS with verification instructions.');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getVerificationBadge = (verified: boolean, label: string) => {
    return verified ? (
      <Badge className="bg-green-100 text-green-800 border-green-200">
        <CheckCircle className="h-3 w-3 mr-1" />
        {label} Verified
      </Badge>
    ) : (
      <Badge variant="outline" className="text-orange-600 border-orange-200">
        <AlertCircle className="h-3 w-3 mr-1" />
        {label} Pending
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600">Manage your personal information and preferences</p>
          </div>
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Summary */}
          <div className="lg:col-span-1 space-y-6">
            {/* Avatar & Basic Info */}
            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={profile.avatar} alt={`${profile.firstName} ${profile.lastName}`} />
                    <AvatarFallback className="text-2xl">
                      {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <div className="absolute bottom-0 right-0">
                      <label htmlFor="avatar-upload" className="cursor-pointer">
                        <div className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2">
                          {uploadingAvatar ? (
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                          ) : (
                            <Camera className="h-4 w-4" />
                          )}
                        </div>
                      </label>
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-gray-600 mb-4">{profile.email}</p>
                
                {/* Verification Status */}
                <div className="space-y-2 mb-4">
                  {getVerificationBadge(profile.verification.emailVerified, 'Email')}
                  {getVerificationBadge(profile.verification.phoneVerified, 'Phone')}
                  {getVerificationBadge(profile.verification.emiratesIdVerified, 'Emirates ID')}
                </div>

                <p className="text-sm text-gray-700">{profile.bio}</p>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Volunteer Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Hours</span>
                  <span className="font-bold text-blue-600">{profile.stats.totalHours}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Events Attended</span>
                  <span className="font-bold text-green-600">{profile.stats.totalEvents}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Certificates</span>
                  <span className="font-bold text-purple-600">{profile.stats.certificates}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-medium">{formatDate(profile.stats.joinDate)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link to="/profile/security">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Security Settings
                  </Button>
                </Link>
                <Link to="/profile/notifications">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </Button>
                </Link>
                <Link to="/profile/preferences">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Preferences
                  </Button>
                </Link>
                <Link to="/profile/tokens">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Key className="h-4 w-4 mr-2" />
                    API Tokens
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="contact">Contact Details</TabsTrigger>
                <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
                <TabsTrigger value="interests">Interests & Skills</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Your basic personal details and identification information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={profile.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={profile.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={profile.dateOfBirth}
                          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="gender">Gender *</Label>
                        <Select 
                          value={profile.gender} 
                          onValueChange={(value) => handleInputChange('gender', value)}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nationality">Nationality *</Label>
                        <Select 
                          value={profile.nationality} 
                          onValueChange={(value) => handleInputChange('nationality', value)}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="UAE">United Arab Emirates</SelectItem>
                            <SelectItem value="SA">Saudi Arabia</SelectItem>
                            <SelectItem value="QA">Qatar</SelectItem>
                            <SelectItem value="KW">Kuwait</SelectItem>
                            <SelectItem value="BH">Bahrain</SelectItem>
                            <SelectItem value="OM">Oman</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="emiratesId">Emirates ID</Label>
                        <div className="flex space-x-2">
                          <Input
                            id="emiratesId"
                            value={profile.emiratesId}
                            onChange={(e) => handleInputChange('emiratesId', e.target.value)}
                            disabled={!isEditing}
                            placeholder="784-YYYY-XXXXXXX-X"
                          />
                          {!profile.verification.emiratesIdVerified && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={handleVerifyEmiratesId}
                            >
                              Verify
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        disabled={!isEditing}
                        rows={3}
                        placeholder="Tell us about yourself and your volunteer interests..."
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contact" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>
                      Your contact details and address information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <div className="flex space-x-2">
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            disabled={!isEditing}
                          />
                          {profile.verification.emailVerified && (
                            <CheckCircle className="h-5 w-5 text-green-600 mt-2" />
                          )}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <div className="flex space-x-2">
                          <Input
                            id="phone"
                            value={profile.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            disabled={!isEditing}
                            placeholder="+971 50 123 4567"
                          />
                          {profile.verification.phoneVerified && (
                            <CheckCircle className="h-5 w-5 text-green-600 mt-2" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={profile.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Street address, building, apartment"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={profile.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="emirate">Emirate</Label>
                        <Select 
                          value={profile.emirate} 
                          onValueChange={(value) => handleInputChange('emirate', value)}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
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
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          value={profile.postalCode}
                          onChange={(e) => handleInputChange('postalCode', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="emergency" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Contact</CardTitle>
                    <CardDescription>
                      Person to contact in case of emergency during volunteer activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="emergencyName">Full Name *</Label>
                        <Input
                          id="emergencyName"
                          value={profile.emergencyContact.name}
                          onChange={(e) => handleEmergencyContactChange('name', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="emergencyRelationship">Relationship *</Label>
                        <Select 
                          value={profile.emergencyContact.relationship} 
                          onValueChange={(value) => handleEmergencyContactChange('relationship', value)}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Parent">Parent</SelectItem>
                            <SelectItem value="Spouse">Spouse</SelectItem>
                            <SelectItem value="Sibling">Sibling</SelectItem>
                            <SelectItem value="Child">Child</SelectItem>
                            <SelectItem value="Friend">Friend</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="emergencyPhone">Phone Number *</Label>
                        <Input
                          id="emergencyPhone"
                          value={profile.emergencyContact.phone}
                          onChange={(e) => handleEmergencyContactChange('phone', e.target.value)}
                          disabled={!isEditing}
                          placeholder="+971 50 123 4567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="emergencyEmail">Email Address</Label>
                        <Input
                          id="emergencyEmail"
                          type="email"
                          value={profile.emergencyContact.email}
                          onChange={(e) => handleEmergencyContactChange('email', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <Alert className="border-blue-200 bg-blue-50">
                      <AlertCircle className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-800">
                        This information will only be used in case of emergency during volunteer activities. 
                        We recommend adding someone who can be reached quickly and is familiar with your medical history.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="interests" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Interests & Skills</CardTitle>
                    <CardDescription>
                      Your volunteer interests, skills, and languages
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>Volunteer Interests</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {profile.interests.map((interest) => (
                          <Badge key={interest} variant="secondary">
                            {interest}
                            {isEditing && (
                              <button 
                                className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                                onClick={() => {
                                  setProfile(prev => ({
                                    ...prev,
                                    interests: prev.interests.filter(i => i !== interest)
                                  }));
                                }}
                              >
                                <X className="h-3 w-3" />
                              </button>
                            )}
                          </Badge>
                        ))}
                        {isEditing && (
                          <Button variant="outline" size="sm">
                            + Add Interest
                          </Button>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label>Skills</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {profile.skills.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                            {isEditing && (
                              <button 
                                className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                                onClick={() => {
                                  setProfile(prev => ({
                                    ...prev,
                                    skills: prev.skills.filter(s => s !== skill)
                                  }));
                                }}
                              >
                                <X className="h-3 w-3" />
                              </button>
                            )}
                          </Badge>
                        ))}
                        {isEditing && (
                          <Button variant="outline" size="sm">
                            + Add Skill
                          </Button>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label>Languages</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {profile.languages.map((language) => (
                          <Badge key={language} className="bg-green-100 text-green-800">
                            {language}
                            {isEditing && (
                              <button 
                                className="ml-1 hover:bg-green-300 rounded-full p-0.5"
                                onClick={() => {
                                  setProfile(prev => ({
                                    ...prev,
                                    languages: prev.languages.filter(l => l !== language)
                                  }));
                                }}
                              >
                                <X className="h-3 w-3" />
                              </button>
                            )}
                          </Badge>
                        ))}
                        {isEditing && (
                          <Button variant="outline" size="sm">
                            + Add Language
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}