import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Mail, ArrowLeft, CheckCircle, AlertCircle, 
  Shield, Clock, RefreshCw
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  React.useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email address is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate different scenarios
      if (email === 'notfound@example.com') {
        setError('No account found with this email address. Please check your email or create a new account.');
      } else if (email === 'blocked@example.com') {
        setError('This account has been temporarily blocked. Please contact support for assistance.');
      } else {
        setSubmitted(true);
        setResendCooldown(60); // 60 second cooldown
        localStorage.setItem('passwordResetEmail', email);
        localStorage.setItem('lastPasswordReset', Date.now().toString());
      }
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setResendCooldown(60);
      localStorage.setItem('lastPasswordReset', Date.now().toString());
      alert('Password reset email sent again! Please check your inbox.');
    } catch (err) {
      setError('Failed to resend email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Check Your Email</h1>
            <p className="text-gray-600 mt-2">Password reset instructions sent</p>
          </div>

          {/* Success Card */}
          <Card>
            <CardContent className="py-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
              
              <CardTitle className="text-xl mb-2">Reset Link Sent!</CardTitle>
              <CardDescription className="mb-6">
                We've sent password reset instructions to your email address.
              </CardDescription>

              <div className="bg-gray-50 rounded-lg p-3 mb-6">
                <p className="text-sm text-gray-600">Email sent to:</p>
                <p className="font-medium">{email}</p>
              </div>

              <Alert className="border-blue-200 bg-blue-50 mb-6">
                <Mail className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Next Steps:</strong>
                  <ol className="list-decimal list-inside mt-2 space-y-1">
                    <li>Check your email inbox (and spam folder)</li>
                    <li>Click the reset link in the email</li>
                    <li>Create your new password</li>
                    <li>Sign in with your new password</li>
                  </ol>
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <Button 
                  onClick={handleResend}
                  disabled={loading || resendCooldown > 0}
                  variant="outline"
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : resendCooldown > 0 ? (
                    `Resend in ${resendCooldown}s`
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Resend Email
                    </>
                  )}
                </Button>

                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Help Section */}
          <Card className="border-gray-200 bg-gray-50">
            <CardContent className="p-4">
              <h3 className="font-medium text-gray-900 mb-2">Didn't receive the email?</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <Mail className="h-4 w-4 mt-0.5 text-gray-400" />
                  <div>
                    <p className="font-medium">Check your spam folder</p>
                    <p>Sometimes emails end up in spam or junk folders</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Clock className="h-4 w-4 mt-0.5 text-gray-400" />
                  <div>
                    <p className="font-medium">Wait a few minutes</p>
                    <p>Email delivery can sometimes take a few minutes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Shield className="h-4 w-4 mt-0.5 text-gray-400" />
                  <div>
                    <p className="font-medium">Add us to your contacts</p>
                    <p>Add noreply@swaeduae.ae to prevent future emails from going to spam</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Still having trouble?{' '}
                  <a href="mailto:support@swaeduae.ae" className="text-blue-600 hover:underline">
                    Contact Support
                  </a>
                </p>
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
          <h1 className="text-3xl font-bold text-gray-900">Forgot Password?</h1>
          <p className="text-gray-600 mt-2">No worries, we'll send you reset instructions</p>
        </div>

        {/* Reset Form */}
        <Card>
          <CardHeader>
            <CardTitle>Reset Your Password</CardTitle>
            <CardDescription>
              Enter your email address and we'll send you a link to reset your password
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
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Enter your email address"
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Enter the email address associated with your SwaedUAE account
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Sending Reset Link...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Reset Link
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
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-900 mb-1">Security Notice</h3>
                <p className="text-sm text-blue-800">
                  For your security, password reset links expire after 1 hour. 
                  If you don't receive an email, check your spam folder or try again.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Emails */}
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <h3 className="font-medium text-orange-900 mb-2">Demo Scenarios</h3>
            <div className="space-y-1 text-sm text-orange-800">
              <p><strong>Success:</strong> any valid email (e.g., user@example.com)</p>
              <p><strong>Not Found:</strong> notfound@example.com</p>
              <p><strong>Blocked Account:</strong> blocked@example.com</p>
            </div>
          </CardContent>
        </Card>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline font-medium">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}