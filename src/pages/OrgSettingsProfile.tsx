import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Building, Upload, Save, ArrowLeft, Globe, 
  Mail, Phone, MapPin, FileText, Palette,
  CheckCircle, AlertCircle, Camera, X
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface OrganizationProfile {
  // Basic Information
  name: string;
  type: string;
  description: string;
  website: string;
  establishedYear: string;
  registrationNumber: string;
  
  // Contact Information
  primaryEmail: string;
  secondaryEmail: string;
  primaryPhone: string;
  secondaryPhone: string;
  address: string;
  city: string;
  emirate: string;
  postalCode: string;
  
  // Branding
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  
  // Legal Information
  tradeLicense: string;
  taxNumber: string;
  insuranceProvider: string;
  insurancePolicy: string;
  
  // Social Media
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
}

export default function OrgSettingsProfile() {
  const [profile, setProfile] = useState<OrganizationProfile>({
    name: 'Dubai Community Foundation',
    type: 'Non-Profit Organization',
    description: 'Dedicated to improving the lives of people in Dubai through community service, education, and environmental initiatives. We believe in the power of volunteers to create positive change.',
    website: 'https://www.dubaicommunityfoundation.org',
    establishedYear: '2020',
    registrationNumber: 'NPO-2020-001',
    primaryEmail: 'info@dubaicommunityfoundation.org',
    secondaryEmail: 'contact@dubaicommunityfoundation.org',
    primaryPhone: '+971 4 123 4567',
    secondaryPhone: '+971 50 123 4567',
    address: 'Sheikh Zayed Road, Trade Centre District',
    city: 'Dubai',
    emirate: 'Dubai',
    postalCode: '12345',
    logo: '/api/placeholder/150/150',
    primaryColor: '#2563eb',
    secondaryColor: '#16a34a',
    tradeLicense: 'TL-2020-001-DXB',
    taxNumber: 'TRN-123456789',
    insuranceProvider: 'Emirates Insurance Company',
    insurancePolicy: 'POL-2024-001',
    facebook: 'https://facebook.com/dubaicommunityfoundation',
    twitter: 'https://twitter.com/dcf_dubai',
    instagram: 'https://instagram.com/dubaicommunityfoundation',
    linkedin: 'https://linkedin.com/company/dubai-community-foundation'
  });

  const [selectedTab, setSelectedTab] = useState('basic');
  const [loading, setSaving] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const organizationTypes = [
    'Non-Profit Organization',
    'Charity',
    'Foundation',
    'Community Group',
    'Educational Institution',
    'Healthcare Organization',
    'Environmental Organization',
    'Religious Organization',
    'Government Entity',
    'Corporate Social Responsibility',
    'Other'
  ];

  const handleInputChange = (field: keyof OrganizationProfile, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogoPreview(result);
        handleInputChange('logo', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Organization profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const validateUrl = (url: string) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/org/settings">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Settings
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Organization Profile</h1>
              <p className="text-gray-600">Manage your organization information and branding</p>
            </div>
          </div>
          <Button onClick={handleSave} disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        {/* Profile Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="legal">Legal</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Update your organization's basic details and description
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Organization Name *</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Your Organization Name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="type">Organization Type *</Label>
                    <Select value={profile.type} onValueChange={(value) => handleInputChange('type', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {organizationTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={profile.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your organization's mission, vision, and activities..."
                    rows={4}
                  />
                  <div className="text-sm text-gray-500 mt-1">
                    {profile.description.length}/500 characters
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="website"
                        value={profile.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        placeholder="https://www.example.org"
                        className="pl-10"
                      />
                    </div>
                    {profile.website && !validateUrl(profile.website) && (
                      <p className="text-sm text-red-600 mt-1">Please enter a valid URL</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="establishedYear">Established Year *</Label>
                    <Input
                      id="establishedYear"
                      type="number"
                      value={profile.establishedYear}
                      onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                      placeholder="2020"
                      min="1900"
                      max={new Date().getFullYear()}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="registrationNumber">Registration Number *</Label>
                  <Input
                    id="registrationNumber"
                    value={profile.registrationNumber}
                    onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                    placeholder="NPO-2020-001"
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
                  Manage your organization's contact details and address
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="primaryEmail">Primary Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="primaryEmail"
                        type="email"
                        value={profile.primaryEmail}
                        onChange={(e) => handleInputChange('primaryEmail', e.target.value)}
                        placeholder="info@organization.org"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="secondaryEmail">Secondary Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="secondaryEmail"
                        type="email"
                        value={profile.secondaryEmail}
                        onChange={(e) => handleInputChange('secondaryEmail', e.target.value)}
                        placeholder="contact@organization.org"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="primaryPhone">Primary Phone *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="primaryPhone"
                        value={profile.primaryPhone}
                        onChange={(e) => handleInputChange('primaryPhone', e.target.value)}
                        placeholder="+971 4 123 4567"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="secondaryPhone">Secondary Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="secondaryPhone"
                        value={profile.secondaryPhone}
                        onChange={(e) => handleInputChange('secondaryPhone', e.target.value)}
                        placeholder="+971 50 123 4567"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                    <Textarea
                      id="address"
                      value={profile.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Street address, building, floor"
                      className="pl-10"
                      rows={2}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={profile.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Dubai"
                    />
                  </div>

                  <div>
                    <Label htmlFor="emirate">Emirate *</Label>
                    <Select value={profile.emirate} onValueChange={(value) => handleInputChange('emirate', value)}>
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
                      placeholder="12345"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Social Media Links</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input
                        id="facebook"
                        value={profile.facebook}
                        onChange={(e) => handleInputChange('facebook', e.target.value)}
                        placeholder="https://facebook.com/yourorganization"
                      />
                    </div>

                    <div>
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        value={profile.twitter}
                        onChange={(e) => handleInputChange('twitter', e.target.value)}
                        placeholder="https://twitter.com/yourorg"
                      />
                    </div>

                    <div>
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        value={profile.instagram}
                        onChange={(e) => handleInputChange('instagram', e.target.value)}
                        placeholder="https://instagram.com/yourorganization"
                      />
                    </div>

                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={profile.linkedin}
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        placeholder="https://linkedin.com/company/yourorg"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="branding" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Logo & Branding</CardTitle>
                <CardDescription>
                  Customize your organization's visual identity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Organization Logo</Label>
                  <div className="flex items-start space-x-6 mt-2">
                    <div className="flex flex-col items-center space-y-2">
                      <Avatar className="w-32 h-32">
                        <AvatarImage src={logoPreview || profile.logo} alt="Organization Logo" />
                        <AvatarFallback className="text-2xl">
                          {profile.name.split(' ').map(n => n.charAt(0)).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <label htmlFor="logo-upload" className="cursor-pointer">
                            <Camera className="h-4 w-4 mr-2" />
                            Upload
                          </label>
                        </Button>
                        {logoPreview && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setLogoPreview(null);
                              handleInputChange('logo', '');
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </div>
                    <div className="flex-1">
                      <Alert className="border-blue-200 bg-blue-50">
                        <Upload className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-blue-800">
                          <strong>Logo Guidelines:</strong>
                          <ul className="list-disc list-inside mt-2 space-y-1">
                            <li>Recommended size: 512x512 pixels</li>
                            <li>Supported formats: PNG, JPG, SVG</li>
                            <li>Maximum file size: 2MB</li>
                            <li>Square format works best</li>
                          </ul>
                        </AlertDescription>
                      </Alert>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex items-center space-x-3 mt-2">
                      <input
                        type="color"
                        id="primaryColor"
                        value={profile.primaryColor}
                        onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                        className="w-12 h-10 rounded border border-gray-300"
                      />
                      <Input
                        value={profile.primaryColor}
                        onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                        placeholder="#2563eb"
                        className="flex-1"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Used for buttons, links, and primary elements</p>
                  </div>

                  <div>
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex items-center space-x-3 mt-2">
                      <input
                        type="color"
                        id="secondaryColor"
                        value={profile.secondaryColor}
                        onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                        className="w-12 h-10 rounded border border-gray-300"
                      />
                      <Input
                        value={profile.secondaryColor}
                        onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                        placeholder="#16a34a"
                        className="flex-1"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Used for accents and secondary elements</p>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3">Brand Preview</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={logoPreview || profile.logo} alt="Logo" />
                        <AvatarFallback>
                          {profile.name.split(' ').map(n => n.charAt(0)).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h5 className="font-medium">{profile.name}</h5>
                        <p className="text-sm text-gray-600">{profile.type}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button style={{ backgroundColor: profile.primaryColor }} size="sm">
                        Primary Button
                      </Button>
                      <Button variant="outline" size="sm" style={{ borderColor: profile.secondaryColor, color: profile.secondaryColor }}>
                        Secondary Button
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="legal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Legal Information</CardTitle>
                <CardDescription>
                  Manage your organization's legal documents and compliance information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tradeLicense">Trade License Number</Label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="tradeLicense"
                        value={profile.tradeLicense}
                        onChange={(e) => handleInputChange('tradeLicense', e.target.value)}
                        placeholder="TL-2020-001-DXB"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="taxNumber">Tax Registration Number</Label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="taxNumber"
                        value={profile.taxNumber}
                        onChange={(e) => handleInputChange('taxNumber', e.target.value)}
                        placeholder="TRN-123456789"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                    <Input
                      id="insuranceProvider"
                      value={profile.insuranceProvider}
                      onChange={(e) => handleInputChange('insuranceProvider', e.target.value)}
                      placeholder="Emirates Insurance Company"
                    />
                  </div>

                  <div>
                    <Label htmlFor="insurancePolicy">Insurance Policy Number</Label>
                    <Input
                      id="insurancePolicy"
                      value={profile.insurancePolicy}
                      onChange={(e) => handleInputChange('insurancePolicy', e.target.value)}
                      placeholder="POL-2024-001"
                    />
                  </div>
                </div>

                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Compliance Status:</strong> Your organization documents are up to date and verified. 
                    Next review scheduled for March 2025.
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <h4 className="font-medium">Document Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium">Trade License</p>
                          <p className="text-sm text-gray-600">Valid until December 2024</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium">Insurance Certificate</p>
                          <p className="text-sm text-gray-600">Valid until June 2024</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <AlertCircle className="h-5 w-5 text-orange-600" />
                        <div>
                          <p className="font-medium">Board Resolution</p>
                          <p className="text-sm text-gray-600">Expires in 30 days</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Update</Button>
                    </div>
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