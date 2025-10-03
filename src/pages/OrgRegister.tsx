import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Heart, Building, Mail, Phone, Globe, MapPin, 
  FileText, Users, Shield, CheckCircle, ArrowLeft
} from 'lucide-react';

export default function OrgRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    organizationName: '',
    organizationType: '',
    registrationNumber: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    city: '',
    emirate: '',
    description: '',
    focusAreas: [] as string[],
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToVerification: false
  });

  const organizationTypes = [
    'Non-Profit Organization',
    'Charity',
    'Community Group',
    'Educational Institution',
    'Healthcare Organization',
    'Environmental Group',
    'Religious Organization',
    'Government Entity',
    'Corporate Foundation',
    'Other'
  ];

  const focusAreaOptions = [
    'Education',
    'Healthcare',
    'Environment',
    'Community Service',
    'Children & Youth',
    'Elderly Care',
    'Disability Support',
    'Animal Welfare',
    'Disaster Relief',
    'Poverty Alleviation',
    'Women Empowerment',
    'Cultural Preservation'
  ];

  const emirates = [
    'Abu Dhabi',
    'Dubai',
    'Sharjah',
    'Ajman',
    'Umm Al Quwain',
    'Ras Al Khaimah',
    'Fujairah'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFocusAreaChange = (area: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      focusAreas: checked 
        ? [...prev.focusAreas, area]
        : prev.focusAreas.filter(a => a !== area)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.organizationName || !formData.email || !formData.contactPerson) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    if (!formData.agreeToTerms || !formData.agreeToVerification) {
      setError('Please agree to the terms and verification process');
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Your organization registration has been submitted successfully. 
              Our team will review your application and contact you within 2-3 business days.
            </p>
            <div className="space-y-3">
              <Button className="w-full" asChild>
                <Link to="/org/login">Go to Login</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/">Return to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-red-500" />
              <div>
                <span className="text-xl font-bold text-gray-900">SwaedUAE</span>
                <div className="text-xs text-green-600 font-medium">UAE Volunteer Platform</div>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link to="/org/login">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Login
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Building className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Register Your Organization</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join the SwaedUAE platform to connect with passionate volunteers and make a greater impact in your community.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Organization Registration</CardTitle>
            <CardDescription>
              Please provide accurate information about your organization. All applications are reviewed for verification.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Organization Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Organization Information</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="organizationName">Organization Name *</Label>
                    <Input
                      id="organizationName"
                      value={formData.organizationName}
                      onChange={(e) => handleInputChange('organizationName', e.target.value)}
                      placeholder="Enter organization name"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="organizationType">Organization Type *</Label>
                    <Select value={formData.organizationType} onValueChange={(value) => handleInputChange('organizationType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select organization type" />
                      </SelectTrigger>
                      <SelectContent>
                        {organizationTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="registrationNumber">Registration Number</Label>
                  <Input
                    id="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                    placeholder="Official registration number (if applicable)"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Organization Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your organization's mission and activities"
                    rows={4}
                    required
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactPerson">Contact Person *</Label>
                    <Input
                      id="contactPerson"
                      value={formData.contactPerson}
                      onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                      placeholder="Full name of contact person"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="organization@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+971 XX XXX XXXX"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="https://www.example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Address Information</h3>
                
                <div>
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter full address"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Enter city"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="emirate">Emirate *</Label>
                    <Select value={formData.emirate} onValueChange={(value) => handleInputChange('emirate', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select emirate" />
                      </SelectTrigger>
                      <SelectContent>
                        {emirates.map(emirate => (
                          <SelectItem key={emirate} value={emirate}>{emirate}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Focus Areas */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Focus Areas</h3>
                <p className="text-sm text-gray-600">Select the areas your organization focuses on (select multiple)</p>
                
                <div className="grid md:grid-cols-3 gap-3">
                  {focusAreaOptions.map(area => (
                    <div key={area} className="flex items-center space-x-2">
                      <Checkbox
                        id={area}
                        checked={formData.focusAreas.includes(area)}
                        onCheckedChange={(checked) => handleFocusAreaChange(area, checked as boolean)}
                      />
                      <Label htmlFor={area} className="text-sm">{area}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Account Setup */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Account Setup</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Create a strong password"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))}
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm">
                    I agree to the <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and{' '}
                    <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeToVerification"
                    checked={formData.agreeToVerification}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeToVerification: checked as boolean }))}
                  />
                  <Label htmlFor="agreeToVerification" className="text-sm">
                    I understand that my organization will be verified before approval and agree to provide additional documentation if requested
                  </Label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex space-x-4">
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? 'Submitting...' : 'Register Organization'}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link to="/org/login">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Information Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">1</div>
              <p>Your application will be reviewed by our verification team</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">2</div>
              <p>We may contact you for additional documentation or clarification</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">3</div>
              <p>Once approved, you'll receive login credentials and can start posting volunteer opportunities</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">4</div>
              <p>The verification process typically takes 2-3 business days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}