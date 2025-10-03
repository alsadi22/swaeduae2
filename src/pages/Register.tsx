import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Eye, EyeOff, Mail, Lock, User, Phone, MapPin,
  AlertCircle, CheckCircle, ArrowRight, ArrowLeft,
  Shield, Globe, Calendar, Smartphone
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface RegistrationData {
  // Step 1: Basic Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  
  // Step 2: Location & Identity
  emirate: string;
  city: string;
  nationality: string;
  emiratesId: string;
  
  // Step 3: Account Security
  password: string;
  confirmPassword: string;
  
  // Step 4: Preferences & Consent
  interests: string[];
  language: string;
  marketingConsent: boolean;
  termsAccepted: boolean;
  privacyAccepted: boolean;
  parentalConsent?: boolean; // For minors
}

export default function Register() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    emirate: '',
    city: '',
    nationality: '',
    emiratesId: '',
    password: '',
    confirmPassword: '',
    interests: [],
    language: 'en',
    marketingConsent: false,
    termsAccepted: false,
    privacyAccepted: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 4;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const availableInterests = [
    'Environment', 'Education', 'Healthcare', 'Community Service',
    'Youth Development', 'Senior Care', 'Animal Welfare', 'Arts & Culture',
    'Sports & Recreation', 'Technology', 'Disaster Relief', 'Food Security'
  ];

  const handleInputChange = (field: keyof RegistrationData, value: string | boolean | string[]) => {
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

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!formData.email.includes('@')) newErrors.email = 'Invalid email format';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        else {
          const age = new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear();
          if (age < 13) newErrors.dateOfBirth = 'Must be at least 13 years old';
          if (age < 18) formData.parentalConsent = false; // Will require parental consent
        }
        if (!formData.gender) newErrors.gender = 'Gender is required';
        break;

      case 2:
        if (!formData.emirate) newErrors.emirate = 'Emirate is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.nationality) newErrors.nationality = 'Nationality is required';
        if (formData.emiratesId && !/^\d{3}-\d{4}-\d{7}-\d{1}$/.test(formData.emiratesId)) {
          newErrors.emiratesId = 'Invalid Emirates ID format (XXX-YYYY-XXXXXXX-X)';
        }
        break;

      case 3:
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
          newErrors.password = 'Password must contain uppercase, lowercase, and number';
        }
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        break;

      case 4:
        if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms of service';
        if (!formData.privacyAccepted) newErrors.privacyAccepted = 'You must accept the privacy policy';
        if (formData.parentalConsent === false) {
          newErrors.parentalConsent = 'Parental consent is required for users under 18';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleInterestToggle = (interest: string) => {
    const currentInterests = formData.interests;
    const newInterests = currentInterests.includes(interest)
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest];
    handleInputChange('interests', newInterests);
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Simulate successful registration
      navigate('/email/verify', { 
        state: { 
          email: formData.email,
          message: 'Registration successful! Please check your email to verify your account.'
        }
      });
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['text-red-600', 'text-orange-600', 'text-yellow-600', 'text-blue-600', 'text-green-600'];
    
    return {
      level: levels[strength] || 'Very Weak',
      color: colors[strength] || 'text-red-600',
      percentage: (strength / 5) * 100
    };
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const isMinor = formData.dateOfBirth && (new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear()) < 18;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Ahmed"
                    className="pl-10"
                  />
                </div>
                {errors.firstName && <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Al-Mansouri"
                    className="pl-10"
                  />
                </div>
                {errors.lastName && <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="ahmed.almansouri@email.com"
                  className="pl-10"
                />
              </div>
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+971 50 123 4567"
                  className="pl-10"
                />
              </div>
              {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="pl-10"
                  />
                </div>
                {errors.dateOfBirth && <p className="text-sm text-red-600 mt-1">{errors.dateOfBirth}</p>}
              </div>

              <div>
                <Label htmlFor="gender">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && <p className="text-sm text-red-600 mt-1">{errors.gender}</p>}
              </div>
            </div>

            {isMinor && (
              <Alert className="border-orange-200 bg-orange-50">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800">
                  <strong>Parental Consent Required:</strong> As you are under 18, parental consent will be required to complete registration.
                </AlertDescription>
              </Alert>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
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

              <div>
                <Label htmlFor="city">City *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Dubai"
                    className="pl-10"
                  />
                </div>
                {errors.city && <p className="text-sm text-red-600 mt-1">{errors.city}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="nationality">Nationality *</Label>
              <Select value={formData.nationality} onValueChange={(value) => handleInputChange('nationality', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select nationality" />
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
              {errors.nationality && <p className="text-sm text-red-600 mt-1">{errors.nationality}</p>}
            </div>

            <div>
              <Label htmlFor="emiratesId">Emirates ID (Optional)</Label>
              <Input
                id="emiratesId"
                value={formData.emiratesId}
                onChange={(e) => handleInputChange('emiratesId', e.target.value)}
                placeholder="784-1995-1234567-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Format: XXX-YYYY-XXXXXXX-X (Optional but recommended for faster verification)
              </p>
              {errors.emiratesId && <p className="text-sm text-red-600 mt-1">{errors.emiratesId}</p>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Create a strong password"
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className={passwordStrength.color}>
                      Password strength: {passwordStrength.level}
                    </span>
                    <span className="text-gray-500">{Math.round(passwordStrength.percentage)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        passwordStrength.percentage < 40 ? 'bg-red-500' :
                        passwordStrength.percentage < 70 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${passwordStrength.percentage}%` }}
                    />
                  </div>
                </div>
              )}
              {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirm your password"
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-sm text-red-600 mt-1">Passwords do not match</p>
              )}
              {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>}
            </div>

            <Alert className="border-blue-200 bg-blue-50">
              <Shield className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Password Requirements:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>At least 8 characters long</li>
                  <li>Contains uppercase and lowercase letters</li>
                  <li>Contains at least one number</li>
                  <li>Contains at least one special character (recommended)</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label>Volunteer Interests</Label>
              <p className="text-sm text-gray-600 mb-3">Select areas you're interested in volunteering for (optional)</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {availableInterests.map((interest) => (
                  <div
                    key={interest}
                    className={`p-2 border rounded-lg cursor-pointer transition-colors ${
                      formData.interests.includes(interest)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleInterestToggle(interest)}
                  >
                    <span className="text-sm">{interest}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="language">Preferred Language</Label>
              <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ar">العربية (Arabic)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium">Consent & Agreements</h3>
              
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="termsAccepted"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => handleInputChange('termsAccepted', checked as boolean)}
                />
                <div className="flex-1">
                  <Label htmlFor="termsAccepted" className="text-sm">
                    I agree to the{' '}
                    <Link to="/terms" className="text-blue-600 hover:underline">
                      Terms of Service
                    </Link>{' '}
                    *
                  </Label>
                  {errors.termsAccepted && <p className="text-sm text-red-600 mt-1">{errors.termsAccepted}</p>}
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="privacyAccepted"
                  checked={formData.privacyAccepted}
                  onCheckedChange={(checked) => handleInputChange('privacyAccepted', checked as boolean)}
                />
                <div className="flex-1">
                  <Label htmlFor="privacyAccepted" className="text-sm">
                    I agree to the{' '}
                    <Link to="/privacy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </Link>{' '}
                    *
                  </Label>
                  {errors.privacyAccepted && <p className="text-sm text-red-600 mt-1">{errors.privacyAccepted}</p>}
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="marketingConsent"
                  checked={formData.marketingConsent}
                  onCheckedChange={(checked) => handleInputChange('marketingConsent', checked as boolean)}
                />
                <Label htmlFor="marketingConsent" className="text-sm">
                  I would like to receive newsletters and updates about volunteer opportunities (optional)
                </Label>
              </div>

              {isMinor && (
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="parentalConsent"
                    checked={formData.parentalConsent}
                    onCheckedChange={(checked) => handleInputChange('parentalConsent', checked as boolean)}
                  />
                  <div className="flex-1">
                    <Label htmlFor="parentalConsent" className="text-sm">
                      I confirm that I have parental/guardian consent to register and volunteer *
                    </Label>
                    {errors.parentalConsent && <p className="text-sm text-red-600 mt-1">{errors.parentalConsent}</p>}
                  </div>
                </div>
              )}
            </div>

            {errors.submit && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.submit}</AlertDescription>
              </Alert>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Join SwaedUAE</h1>
          <p className="text-gray-600 mt-2">Create your volunteer account and start making a difference</p>
        </div>

        {/* Progress Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-gray-600">{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Basic Info</span>
              <span>Location</span>
              <span>Security</span>
              <span>Preferences</span>
            </div>
          </CardContent>
        </Card>

        {/* Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && 'Basic Information'}
              {currentStep === 2 && 'Location & Identity'}
              {currentStep === 3 && 'Account Security'}
              {currentStep === 4 && 'Preferences & Consent'}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && 'Tell us about yourself'}
              {currentStep === 2 && 'Where are you located?'}
              {currentStep === 3 && 'Secure your account'}
              {currentStep === 4 && 'Final steps to complete registration'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStep()}

            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <div>
                {currentStep > 1 && (
                  <Button variant="outline" onClick={handlePrevious}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                )}
              </div>
              <div>
                {currentStep < totalSteps ? (
                  <Button onClick={handleNext}>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>

        {/* Language Toggle */}
        <div className="text-center">
          <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center justify-center space-x-1 mx-auto">
            <Globe className="h-4 w-4" />
            <span>العربية | English</span>
          </button>
        </div>
      </div>
    </div>
  );
}