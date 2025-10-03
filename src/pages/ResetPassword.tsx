import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Lock, Eye, EyeOff, CheckCircle, AlertCircle, 
  Shield, ArrowLeft, Key
} from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    const emailParam = searchParams.get('email');
    
    if (emailParam) setEmail(emailParam);
    
    if (token) {
      validateToken(token);
    } else {
      setTokenValid(false);
      setError('Invalid or missing reset token');
    }
  }, [searchParams]);

  const validateToken = async (token: string) => {
    try {
      // Simulate token validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (token === 'valid_reset_token') {
        setTokenValid(true);
      } else if (token === 'expired_token') {
        setTokenValid(false);
        setError('This password reset link has expired. Please request a new one.');
      } else {
        setTokenValid(false);
        setError('Invalid password reset link. Please request a new one.');
      }
    } catch (err) {
      setTokenValid(false);
      setError('Failed to validate reset token. Please try again.');
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

  const validateForm = () => {
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      setError('Password must contain uppercase, lowercase, and number');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful password reset
      navigate('/login', {
        state: {
          message: 'Password reset successfully! You can now sign in with your new password.',
          type: 'success'
        }
      });
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError('');
  };

  const passwordStrength = getPasswordStrength(formData.password);

  if (tokenValid === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="py-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Validating reset token...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (tokenValid === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Invalid Reset Link</h1>
            <p className="text-gray-600 mt-2">This password reset link is not valid</p>
          </div>

          {/* Error Card */}
          <Card>
            <CardContent className="py-8 text-center">
              <AlertCircle className="h-16 w-16 text-red-600 mx-auto mb-6" />
              
              <CardTitle className="text-xl mb-2">Reset Link Invalid</CardTitle>
              <CardDescription className="mb-6">
                {error}
              </CardDescription>

              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Common reasons:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>The link has expired (links expire after 1 hour)</li>
                    <li>The link has already been used</li>
                    <li>The link was copied incorrectly</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <Link to="/password/forgot">
                  <Button className="w-full">
                    <Key className="h-4 w-4 mr-2" />
                    Request New Reset Link
                  </Button>
                </Link>

                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
          <p className="text-gray-600 mt-2">Create a new secure password</p>
        </div>

        {/* Reset Form */}
        <Card>
          <CardHeader>
            <CardTitle>Create New Password</CardTitle>
            <CardDescription>
              {email ? `Resetting password for ${email}` : 'Enter your new password below'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Create a strong password"
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
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className={passwordStrength.color}>
                        Password strength: {passwordStrength.level}
                      </span>
                      <span className="text-gray-500">{Math.round(passwordStrength.percentage)}%</span>
                    </div>
                    <Progress value={passwordStrength.percentage} className="h-2 mt-1" />
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm your new password"
                    className="pl-10 pr-10"
                    required
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

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Resetting Password...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Reset Password
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/login" className="text-sm text-blue-600 hover:underline flex items-center justify-center space-x-1">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Login</span>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-green-900 mb-1">Security Notice</h3>
                <p className="text-sm text-green-800">
                  After resetting your password, you'll be signed out of all devices for security. 
                  You'll need to sign in again with your new password.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Links */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <h3 className="font-medium text-blue-900 mb-2">Demo Reset Links</h3>
            <div className="space-y-1 text-sm text-blue-800">
              <p>
                <a href="/password/reset?token=valid_reset_token&email=user@example.com" className="text-blue-600 hover:underline">
                  Valid Reset Link
                </a>
              </p>
              <p>
                <a href="/password/reset?token=expired_token&email=user@example.com" className="text-blue-600 hover:underline">
                  Expired Reset Link
                </a>
              </p>
              <p>
                <a href="/password/reset?token=invalid_token&email=user@example.com" className="text-blue-600 hover:underline">
                  Invalid Reset Link
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}