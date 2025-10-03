import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, EyeOff, Mail, Lock, AlertCircle, 
  CheckCircle, Building, Shield, Globe,
  FileText, Upload, Users
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function OrgLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('Organization email is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password.trim()) {
      setError('Password is required');
      return false;
    }
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate different login scenarios
      if (formData.email === 'pending@org.com') {
        setError('Your organization account is pending verification. Please check your email for verification instructions or contact support.');
      } else if (formData.email === 'rejected@org.com') {
        setError('Your organization application was not approved. Please contact support for more information.');
      } else if (formData.email === 'suspended@org.com') {
        setError('Your organization account has been suspended. Please contact support for assistance.');
      } else if (formData.password === 'wrongpassword') {
        setError('Invalid email or password. Please try again.');
      } else {
        // Successful organization login
        login({
          id: 2,
          email: formData.email,
          name: 'Dubai Community Foundation',
          role: 'org_admin'
        });
        navigate('/org');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUAEPassLogin = () => {
    alert('UAE Pass integration for organizations would be implemented here. This would redirect to UAE Pass business authentication.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Organization Portal</h1>
          <p className="text-gray-600 mt-2">Sign in to manage your volunteer programs</p>
        </div>

        {/* Organization Features */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <h3 className="font-medium text-blue-900 mb-3">Organization Features</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-blue-800">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Event Management</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Volunteer Hours</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Certificates</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Team Management</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>Organization Sign In</CardTitle>
            <CardDescription>
              Access your organization dashboard and volunteer management tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor="email">Organization Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="organization@example.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => handleInputChange('rememberMe', checked as boolean)}
                  />
                  <Label htmlFor="rememberMe" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <Link to="/org/password/forgot" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In to Organization Portal'}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleUAEPassLogin}
                >
                  <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-green-500 rounded mr-2"></div>
                  UAE Pass Business
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                New organization?{' '}
                <Link to="/org/register" className="text-blue-600 hover:underline font-medium">
                  Apply to join SwaedUAE
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Verification Status */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <h3 className="font-medium text-green-900 mb-2">Organization Verification</h3>
            <p className="text-sm text-green-800 mb-3">
              All organizations must be verified before accessing the platform. The verification process includes:
            </p>
            <div className="space-y-2 text-sm text-green-700">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Legal documentation review</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Background verification</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Compliance assessment</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <h3 className="font-medium text-blue-900 mb-2">Demo Organization Accounts</h3>
            <div className="space-y-1 text-sm text-blue-800">
              <p><strong>Active Org:</strong> org@example.com / password</p>
              <p><strong>Pending Verification:</strong> pending@org.com / password</p>
              <p><strong>Rejected Application:</strong> rejected@org.com / password</p>
              <p><strong>Suspended Account:</strong> suspended@org.com / password</p>
            </div>
          </CardContent>
        </Card>

        {/* Support Links */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
            <Link to="/org/help" className="hover:underline">Help Center</Link>
            <span>•</span>
            <Link to="/org/support" className="hover:underline">Contact Support</Link>
            <span>•</span>
            <Link to="/org/docs" className="hover:underline">Documentation</Link>
          </div>
          <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center justify-center space-x-1 mx-auto">
            <Globe className="h-4 w-4" />
            <span>العربية | English</span>
          </button>
        </div>
      </div>
    </div>
  );
}